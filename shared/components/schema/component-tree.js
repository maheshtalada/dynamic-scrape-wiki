import validation from './validation/validation';
import {cloneDeep, uniq, extend, find, findIndex} from 'lodash';
import deepFreeze from '../../utils/deep-freeze';

/**
 * @description creates an independent JSON tree with all
 *              relevant functions to add/remove components
 *              and validation state for all components
 */
const DEFAULT_HANDLER = "keytype";
export default class ComponentTree {
	constructor(tree, referenceData, initialValuesObject, modifiedValuesObject) {
		this.componentTreeObject = cloneDeep(tree);
		this.initialValues = initialValuesObject || {};
		this.modifiedValues = modifiedValuesObject || {};
		this.maskPristineState = {};
		this.listeners = {};
		this.writeMode = false;
		this.forceValidation = false;
		this.referenceData = deepFreeze(cloneDeep(referenceData));
		this.storeInitialValues(this.componentTreeObject);
	}

	addListener(eventName, listenFunc) {
		if (!this.listeners[eventName]) {
			this.listeners[eventName] = [];
		}

		this.listeners[eventName].push(listenFunc);

		return (() => {
			var listenIndex = this.listeners[eventName].indexOf(listenFunc);

			if (listenIndex > -1) {
				this.listeners[eventName].splice(listenIndex, 1);
				return true;
			}

			return false;
		});
	}

	fireEvent(eventName, args) {
		if (!this.listeners[eventName]) {
			return false;
		}

		this.listeners[eventName].forEach((listener) => {
			listener.apply(null, args);
		});
	}

	getValues() {
		return extend(this.initialValues, this.modifiedValues);
	}

	storeInitialValues(component) {
		if (component) {

			if (component.data &&
				typeof component.data.value !== 'undefined' &&
				component.data.value !== null &&
				component.id) {

				this.initialValues[component.id] = component.data.value;
			}
			if (component.children && component.children.length) {
				component.children.forEach((childComponent) => {
					this.storeInitialValues(childComponent);
				});
			}
			if (component.tabs && component.tabs.length) {
				component.tabs.forEach((tabComponent) => {
					this.storeInitialValues(tabComponent);
				});
			}
		}
	}

	changeValue(id, value, updateArray = [] , index) {
		if (typeof id === 'undefined') {
			return;
		}

		this.modifiedValues[id] = value;
		this.maskPristineState[id] = false;
		if (typeof this.onChange === 'function') {
			(!updateArray.length || updateArray.length-1 === index) && this.onChange();
		}
	}

	removeComponentValues(components) {
		components.forEach((component) => {
			delete this.modifiedValues[component.id];

			if (typeof this.initialValues[component.id] !== 'undefined' && !component.retainInitialValue) {
				delete this.initialValues[component.id];
			}

			if (component.children) {
				this.removeComponentValues(component.children);
			}
		});
	}

	replaceLookUp(componentID, key, parentKey) {
		const occureLength = (componentID.match(/\*/g) || []).length;
		if(occureLength === 1) {
			return componentID.replace(/\*/, key);
		}
		return componentID.replace(/\*/, parentKey).replace(/\*/, key);
	}

	/*
		updating key for dynamic children for clone
		ie. id's for - clone inside clone
	 */
	updateChildKeys(componentID, key, parentID, parentKey) {
		if(componentID.indexOf('(*)') < 0 ) {
			return componentID;
		}
		if(parentID === null || typeof parentID === 'undefined') {
			return componentID.replace(/\*/, key) || '';
		}
		return this.replaceLookUp(componentID, key,parentKey);
	}

	updateKeys(components, key, parentID, parentKey) {
		components.forEach((componentData) => {
			componentData.cloneKey = key;
			componentData.id = componentData.id && this.updateChildKeys(componentData.id, key, parentID, parentKey);
			if (componentData.type !== 'clone' && componentData.children) {
				this.updateKeys(componentData.children, key, parentID, parentKey);
			}
		});
	}

	injectComponents(components, parent, index, key) {
		if (parent.children) {
			let clonedComponets = cloneDeep(components);
			this.updateKeys(clonedComponets, key,parent.id, parent.cloneKey);
			// add cloned elements at index
			parent.children.splice(index, 0, ...clonedComponets);
		}
	}

	removeComponent(component, parent) {
		if (parent.children) {
			this.removeComponentValues([component]);
			let componentIndex = parent.children.indexOf(component);
			// Check to see if there is an equal object as in the case of multiple clone removes
			if (componentIndex === -1) {
				parent.children.forEach((childComponent, index) => {
					if((component.id && childComponent.id && component.id === childComponent.id)
						|| JSON.stringify(component) === JSON.stringify(childComponent)) {
						componentIndex = index;
					}
				});
			}
			if (componentIndex > -1) {
				parent.children.splice(componentIndex, 1);
			}
		}
	}

	bindModifiers(componentData, parentData) {
		componentData.inject = (children, index, key) => {
			this.storeInitialValues(componentData);
			this.injectComponents(children, componentData, index, typeof key === 'number' ? key : componentData.cloneKey );
			if (typeof this.onChange === 'function') {
				this.onChange();
			}
		};

		componentData.fireEvent = (eventName, args) => {
			this.fireEvent(eventName, args);
		};

		// bind get functions so deepClone doesn't create a circular link
		componentData.root = () => {
			return componentData;
		};

		componentData.getDataByID = (referenceId)=> {
			return typeof this.modifiedValues[referenceId] === 'undefined' && (this.initialValues[referenceId] || '') || this.modifiedValues[referenceId];
		};

		componentData.removeDataByID = (referenceId)=> {
			if (this.modifiedValues[referenceId]) {
				delete this.modifiedValues[referenceId];
				if (typeof this.onChange === 'function') {
					this.onChange();
				}
			}
		};

		if (parentData) {
			componentData.parent = () => {
				return parentData;
			};

			componentData.remove = () => {
				this.removeComponent(componentData, parentData);
				if (typeof this.onChange === 'function') {
					this.onChange();
				}
			};
		}

		return componentData;
	}

	validateComponentData(componentData) {
		let validationResults = validation.validateValue(
			componentData.data.value || '',
			componentData.validation,
			componentData.dependableFields || '',
			componentData.dependableFields && componentData.getDataByID(this.updateChildKeys(componentData.dependableFields.id,componentData.cloneKey||'')) || '',
			this.handler || DEFAULT_HANDLER,
			componentData.conditionalId && this.modifiedValues[componentData.conditionalId] || ''
		);

		if (validationResults === true) {
			componentData.error = null;
		} else {
			componentData.error = validationResults;
		}

		return componentData;
	}

	setDefaultValues(componentData) {
		componentData.data = componentData.data || {};
		componentData.children = componentData.children || [];
		return componentData;
	}

	getWriteMode(componentData, parentData) {
		componentData.writeMode = this.writeMode && componentData.editable !== false;

		if (componentData.writeMode && parentData && !parentData.writeMode) {
			componentData.writeMode = false;
		}
		return componentData;
	}

	getChildren(componentData) {
		// "clone" type children aren't rendered so they shouldn't be built out
		if (componentData.children && componentData.type !== 'clone') {
			componentData.children = componentData.children.map((child) => {
				return this.buildComponentTree(child, componentData);
			});
		}

		return componentData;
	}

	getOptionsFromReference(componentData) {
		let referenceId = componentData.data.optionReference;
		let referenceData = this.referenceData.children;
		let referenceIndex = findIndex(referenceData,{ 'id' : referenceId});
		if (referenceId && referenceIndex > -1 ) {
			componentData.data.options = referenceData[referenceIndex].option;
		} else if (componentData.data.option) {
			componentData.data.options = componentData.data.option;
		}
		return componentData;
	}

	getReferenceData(componentData) {
		if (componentData.referenceIds) {
			componentData.referenceValues = componentData.referenceIds.map((referenceId) => {

				if (referenceId.id.indexOf('*') !== -1) {
					return this.getReferenceDataFromWildCard(referenceId.id);
				}
				return this.modifiedValues[referenceId.id] || this.initialValues[referenceId.id] || null;
			});

		}
		return componentData;
	}

	getReferenceDataFromWildCard(referenceId) {
		let regexString = referenceId.replace(/(\.|\^|\$|\+|\?|\(|\)|\[|\]|\{|\\|\|)/g, '\\$1').replace(/\*(\\?.)/g, '[^$1]*$1'),
			regexTest = new RegExp(regexString),
			allKeys = uniq(Object.keys(this.modifiedValues).concat(Object.keys(this.initialValues))),
			matchingKeys = allKeys.filter(regexTest.test.bind(regexTest)),
			matchValues = matchingKeys.map((matchId) => {
				return this.modifiedValues[matchId] || this.initialValues[matchId];
			});

		return matchValues;
	}

	getModifiedValue(componentData) {
		if (componentData.id &&
			this.modifiedValues[componentData.id] ||
			this.modifiedValues[componentData.id] === '') {
			componentData.data.value = this.modifiedValues[componentData.id];
		}

		return componentData;
	}

	checkForDefaultValue(componentData) {
		let componentRequiresDefault = componentData.id && !componentData.data.value &&
			typeof componentData.data.defaultValue !== 'undefined';

		if (componentRequiresDefault && !this.modifiedValues[componentData.id] &&
			this.modifiedValues[componentData.id] !== '') {
			componentData.data.value = componentData.data.defaultValue;
			this.modifiedValues[componentData.id] = componentData.data.defaultValue;
			this.maskPristineState[componentData.id] = true;
		}

		return componentData;
	}

	getPristineState(componentData) {
		componentData.pristine = true;

		if (componentData.id && !this.maskPristineState[componentData.id]
			&& typeof this.modifiedValues[componentData.id] !== 'undefined') {
			componentData.pristine = false;
		}
		return componentData;
	}

	getErrorState(componentData) {

		componentData.validationForced = !!this.forceValidation;
		componentData.error = null;
		if (this.forceValidation || !componentData.pristine) {
			componentData = this.validateComponentData(componentData);
		}
		return componentData;
	}

	getValidState(componentData) {
		if (componentData) {
			if (!componentData.error &&
				(!componentData.pristine || this.forceValidation)
				&& componentData.data.value) {
				componentData.valid = true;
			} else {
				componentData.valid = false;
			}
		}
		return componentData;
	}

	getStateFromChildren(componentData) {
		if (componentData.children && componentData.children.length) {
			let childrenHaveErrors = false;
			componentData.valid = true;
			componentData.pristine = true;
			componentData.children.forEach((child) => {
				if (!child.valid) {
					componentData.valid = false;
				}
				if (child.error) {
					childrenHaveErrors = true;
					if (!componentData.error) {
						componentData.error = true;
					}
				}
				if (!child.pristine) {
					componentData.pristine = false;
				}
			});
			if (!childrenHaveErrors && !componentData.validation) {
				componentData.error = false;
			}
		}
		return componentData;
	}

	buildComponentTree(componentData, parentData) {
		componentData = this.setDefaultValues(componentData);
		componentData = this.bindModifiers(componentData, parentData);
		componentData = this.getWriteMode(componentData, parentData);
		componentData = this.getChildren(componentData);
		componentData = this.getOptionsFromReference(componentData);
		componentData = this.getReferenceData(componentData);
		componentData = this.getModifiedValue(componentData);
		componentData = this.checkForDefaultValue(componentData);
		componentData = this.getPristineState(componentData);
		componentData = this.getErrorState(componentData);
		componentData = this.getValidState(componentData);
		componentData = this.getStateFromChildren(componentData);
		return componentData;
	}

	build(forceValidation, handler='') {

		if (typeof this.componentTreeObject !== 'object') {
			return false;
		}
		this.forceValidation = forceValidation;
		this.handler = handler || this.handler;
		return this.buildComponentTree(this.componentTreeObject);
	}
}


