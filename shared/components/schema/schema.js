import ComponentTree from './component-tree';
import {cloneDeep} from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DefaultComponentIndex from './default-component-index';

/**
 * @description Renders provided schema into specified components
 * @prop component {string} Component to render
 * @prop componentChildren {array} Children components to render
 * @prop data {array} Additional props for component
 * @prop initialValues {array} initial values object that can be shared across schemas
 * @prop modifiedValues {array} modified values object that can be shared across schemas
 */

export default class Schema extends Component {

	static propTypes = {
		writeMode: PropTypes.bool,
		data: PropTypes.object,
		customComponentIndex: PropTypes.object,
		className: PropTypes.string,
		referenceData: PropTypes.object,
		initialValues: PropTypes.object,
		modifiedValues: PropTypes.object,
		onChange: PropTypes.func,
		onReady: PropTypes.func,
		updateonPropsChange: PropTypes.bool,
		l : PropTypes.func,
		country : PropTypes.string
	};

	static contextTypes = {
		awsImagePath : PropTypes.string
	};

	static defaultProps = {
		writeMode: false,
		customComponentIndex: {},
		className: 'schema',
		referenceData: {
			options: {}
		},
		updateonPropsChange: false,
		l : (text='')=>{
			return text;
		},
		country : 'US',
		assetsPath : ''
	};

	constructor(props) {
		super(props);

		this.state = {
			componentIndex: {...DefaultComponentIndex, ...props.customComponentIndex},
			modifiedValues: (this.state && this.state.modifiedValues) || {},
			valuesWithErrors: (this.state && this.state.valuesWithErrors) || [],
			forceValidation: false
		};


		this.componentTree = new ComponentTree(
			props.data,
			this.props.referenceData,
			this.props.initialValues,
			this.props.modifiedValues
		);
		this.componentTree.onChange = this.onTreeChange.bind(this);

		this.cachedComponentData = {};
		this.cachedComponentStrings = {};

		if (this.props.onReady) {
			this.props.onReady(this.componentTree);
		}
	}

	componentWillMount() {
		this.componentTree.writeMode = this.props.writeMode;
		this.rebuild();
	}

	componentWillReceiveProps(props) {
		this.setState({
			componentIndex: {...DefaultComponentIndex, ...props.customComponentIndex},
			modifiedValues: props.modifiedValues,
			forceValidation : props.updateonPropsChange ? false : this.state.forceValidation
		});

		this.componentTree.writeMode = props.writeMode;
		if(props.updateonPropsChange) {
			this.componentTree.modifiedValues = props.modifiedValues;
			this.componentTree.componentTreeObject = cloneDeep(props.data)
		}

		this.rebuild();
	}

	onTreeChange() {
		this.rebuild();
		this.props.onChange(this.componentTree);
	}

	renderComponents(treeId, componentDataList, parentData, override) {
		let keyCounter = 0;
		return componentDataList.map((componentObject) => {
			return this.renderComponent(treeId, componentObject, parentData, keyCounter++, override);
		});
	}

	renderComponent(treeId, componentObject, parentData, keyCounter, override) {
		keyCounter = keyCounter || 0;
		let componentData = componentObject,
			Component = this.state.componentIndex[componentData.subtype] || this.state.componentIndex[componentData.type];

		if (!Component) {
			return null;
		}

		override = true;

		let componentDataString = JSON.stringify(componentData);
		treeId += '.' + (componentData.id || '') + keyCounter;
		if (componentDataString !== this.cachedComponentStrings[treeId] || override) {
			this.cachedComponentStrings[treeId] = componentDataString;
			if (componentData.children && Array.isArray(componentData.children)) {
				componentData.children = this.renderComponents(treeId, componentData.children, componentData, override);
			}

			let component = (<Component {...componentData}
				l={this.props.l}
				assetsPath = {this.props.assetsPath}
				user={this.props.user}
				dispatch={this.props.dispatch}
				country={this.props.country}
				key={treeId}
				awsImagePath={this.context.awsImagePath}
				storeValue={this.componentTree.changeValue.bind(this.componentTree)}/>);
			this.cachedComponentData[componentData.id] = component;
		}
		return this.cachedComponentData[componentData.id];
	}

	render() {
		if (typeof this.props.data !== 'object') {
			return null;
		}
		let componentData = cloneDeep(this.state.componentTree);

		return (
			<div className={this.props.className}>
				{this.renderComponent('basecomponent', componentData, null)}
			</div>
		);
	}

	rebuild() {
		this.setState({
			componentTree: this.componentTree.build(this.state.forceValidation)
		});
	}

	checkSubmissionValid() {
		this.setState({
			forceValidation: true
		});
		let componentTree = this.componentTree.build(true, 'submit');
		return !componentTree.error;
	}

}

