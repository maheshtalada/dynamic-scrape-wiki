#!/usr/bin/env node
exports.ids = [5];
exports.modules = Array(161).concat([
/* 161 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Schema; });
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(58);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(96);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(18);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(94);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _component_tree__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(162);
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(60);
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _default_component_index__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(166);











function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }






/**
 * @description Renders provided schema into specified components
 * @prop component {string} Component to render
 * @prop componentChildren {array} Children components to render
 * @prop data {array} Additional props for component
 * @prop initialValues {array} initial values object that can be shared across schemas
 * @prop modifiedValues {array} modified values object that can be shared across schemas
 */

var Schema =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_9___default()(Schema, _Component);

  function Schema(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4___default()(this, Schema);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(Schema).call(this, props));
    _this.state = {
      componentIndex: _objectSpread({}, _default_component_index__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"], {}, props.customComponentIndex),
      modifiedValues: _this.state && _this.state.modifiedValues || {},
      valuesWithErrors: _this.state && _this.state.valuesWithErrors || [],
      forceValidation: false
    };
    _this.componentTree = new _component_tree__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"](props.data, _this.props.referenceData, _this.props.initialValues, _this.props.modifiedValues);
    _this.componentTree.onChange = _this.onTreeChange.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8___default()(_this));
    _this.cachedComponentData = {};
    _this.cachedComponentStrings = {};

    if (_this.props.onReady) {
      _this.props.onReady(_this.componentTree);
    }

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5___default()(Schema, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.componentTree.writeMode = this.props.writeMode;
      this.rebuild();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(props) {
      this.setState({
        componentIndex: _objectSpread({}, _default_component_index__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"], {}, props.customComponentIndex),
        modifiedValues: props.modifiedValues,
        forceValidation: props.updateonPropsChange ? false : this.state.forceValidation
      });
      this.componentTree.writeMode = props.writeMode;

      if (props.updateonPropsChange) {
        this.componentTree.modifiedValues = props.modifiedValues;
        this.componentTree.componentTreeObject = lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_11___default()(props.data);
      }

      this.rebuild();
    }
  }, {
    key: "onTreeChange",
    value: function onTreeChange() {
      this.rebuild();
      this.props.onChange(this.componentTree);
    }
  }, {
    key: "renderComponents",
    value: function renderComponents(treeId, componentDataList, parentData, override) {
      var _this2 = this;

      var keyCounter = 0;
      return componentDataList.map(function (componentObject) {
        return _this2.renderComponent(treeId, componentObject, parentData, keyCounter++, override);
      });
    }
  }, {
    key: "renderComponent",
    value: function renderComponent(treeId, componentObject, parentData, keyCounter, override) {
      keyCounter = keyCounter || 0;
      var componentData = componentObject,
          Component = this.state.componentIndex[componentData.subtype] || this.state.componentIndex[componentData.type];

      if (!Component) {
        return null;
      }

      override = true;
      var componentDataString = JSON.stringify(componentData);
      treeId += '.' + (componentData.id || '') + keyCounter;

      if (componentDataString !== this.cachedComponentStrings[treeId] || override) {
        this.cachedComponentStrings[treeId] = componentDataString;

        if (componentData.children && Array.isArray(componentData.children)) {
          componentData.children = this.renderComponents(treeId, componentData.children, componentData, override);
        }

        var component = react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(Component, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2___default()({}, componentData, {
          l: this.props.l,
          assetsPath: this.props.assetsPath,
          user: this.props.user,
          dispatch: this.props.dispatch,
          country: this.props.country,
          key: treeId,
          awsImagePath: this.context.awsImagePath,
          storeValue: this.componentTree.changeValue.bind(this.componentTree)
        }));
        this.cachedComponentData[componentData.id] = component;
      }

      return this.cachedComponentData[componentData.id];
    }
  }, {
    key: "render",
    value: function render() {
      if (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1___default()(this.props.data) !== 'object') {
        return null;
      }

      var componentData = lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_11___default()(this.state.componentTree);
      return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: this.props.className
      }, void 0, this.renderComponent('basecomponent', componentData, null));
    }
  }, {
    key: "rebuild",
    value: function rebuild() {
      this.setState({
        componentTree: this.componentTree.build(this.state.forceValidation)
      });
    }
  }, {
    key: "checkSubmissionValid",
    value: function checkSubmissionValid() {
      this.setState({
        forceValidation: true
      });
      var componentTree = this.componentTree.build(true, 'submit');
      return !componentTree.error;
    }
  }]);

  return Schema;
}(react__WEBPACK_IMPORTED_MODULE_12__["Component"]);

Schema.propTypes = {
  writeMode: prop_types__WEBPACK_IMPORTED_MODULE_13___default.a.bool,
  data: prop_types__WEBPACK_IMPORTED_MODULE_13___default.a.object,
  customComponentIndex: prop_types__WEBPACK_IMPORTED_MODULE_13___default.a.object,
  className: prop_types__WEBPACK_IMPORTED_MODULE_13___default.a.string,
  referenceData: prop_types__WEBPACK_IMPORTED_MODULE_13___default.a.object,
  initialValues: prop_types__WEBPACK_IMPORTED_MODULE_13___default.a.object,
  modifiedValues: prop_types__WEBPACK_IMPORTED_MODULE_13___default.a.object,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_13___default.a.func,
  onReady: prop_types__WEBPACK_IMPORTED_MODULE_13___default.a.func,
  updateonPropsChange: prop_types__WEBPACK_IMPORTED_MODULE_13___default.a.bool,
  l: prop_types__WEBPACK_IMPORTED_MODULE_13___default.a.func,
  country: prop_types__WEBPACK_IMPORTED_MODULE_13___default.a.string
};
Schema.contextTypes = {
  awsImagePath: prop_types__WEBPACK_IMPORTED_MODULE_13___default.a.string
};
Schema.defaultProps = {
  writeMode: false,
  customComponentIndex: {},
  className: 'schema',
  referenceData: {
    options: {}
  },
  updateonPropsChange: false,
  l: function l() {
    var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return text;
  },
  country: 'US',
  assetsPath: ''
};


/***/ }),
/* 162 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentTree; });
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(58);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(163);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _validation_validation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(164);
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(60);
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var lodash_uniq__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(104);
/* harmony import */ var lodash_uniq__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash_uniq__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var lodash_extend__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(103);
/* harmony import */ var lodash_extend__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(lodash_extend__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var lodash_find__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(59);
/* harmony import */ var lodash_find__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(lodash_find__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var lodash_findIndex__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(85);
/* harmony import */ var lodash_findIndex__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(lodash_findIndex__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _utils_deep_freeze__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(165);











/**
 * @description creates an independent JSON tree with all
 *              relevant functions to add/remove components
 *              and validation state for all components
 */

var DEFAULT_HANDLER = "keytype";

var ComponentTree =
/*#__PURE__*/
function () {
  function ComponentTree(tree, referenceData, initialValuesObject, modifiedValuesObject) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, ComponentTree);

    this.componentTreeObject = lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_5___default()(tree);
    this.initialValues = initialValuesObject || {};
    this.modifiedValues = modifiedValuesObject || {};
    this.maskPristineState = {};
    this.listeners = {};
    this.writeMode = false;
    this.forceValidation = false;
    this.referenceData = Object(_utils_deep_freeze__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"])(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_5___default()(referenceData));
    this.storeInitialValues(this.componentTreeObject);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(ComponentTree, [{
    key: "addListener",
    value: function addListener(eventName, listenFunc) {
      var _this = this;

      if (!this.listeners[eventName]) {
        this.listeners[eventName] = [];
      }

      this.listeners[eventName].push(listenFunc);
      return function () {
        var listenIndex = _this.listeners[eventName].indexOf(listenFunc);

        if (listenIndex > -1) {
          _this.listeners[eventName].splice(listenIndex, 1);

          return true;
        }

        return false;
      };
    }
  }, {
    key: "fireEvent",
    value: function fireEvent(eventName, args) {
      if (!this.listeners[eventName]) {
        return false;
      }

      this.listeners[eventName].forEach(function (listener) {
        listener.apply(null, args);
      });
    }
  }, {
    key: "getValues",
    value: function getValues() {
      return lodash_extend__WEBPACK_IMPORTED_MODULE_7___default()(this.initialValues, this.modifiedValues);
    }
  }, {
    key: "storeInitialValues",
    value: function storeInitialValues(component) {
      var _this2 = this;

      if (component) {
        if (component.data && typeof component.data.value !== 'undefined' && component.data.value !== null && component.id) {
          this.initialValues[component.id] = component.data.value;
        }

        if (component.children && component.children.length) {
          component.children.forEach(function (childComponent) {
            _this2.storeInitialValues(childComponent);
          });
        }

        if (component.tabs && component.tabs.length) {
          component.tabs.forEach(function (tabComponent) {
            _this2.storeInitialValues(tabComponent);
          });
        }
      }
    }
  }, {
    key: "changeValue",
    value: function changeValue(id, value) {
      var updateArray = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      var index = arguments.length > 3 ? arguments[3] : undefined;

      if (typeof id === 'undefined') {
        return;
      }

      this.modifiedValues[id] = value;
      this.maskPristineState[id] = false;

      if (typeof this.onChange === 'function') {
        (!updateArray.length || updateArray.length - 1 === index) && this.onChange();
      }
    }
  }, {
    key: "removeComponentValues",
    value: function removeComponentValues(components) {
      var _this3 = this;

      components.forEach(function (component) {
        delete _this3.modifiedValues[component.id];

        if (typeof _this3.initialValues[component.id] !== 'undefined' && !component.retainInitialValue) {
          delete _this3.initialValues[component.id];
        }

        if (component.children) {
          _this3.removeComponentValues(component.children);
        }
      });
    }
  }, {
    key: "replaceLookUp",
    value: function replaceLookUp(componentID, key, parentKey) {
      var occureLength = (componentID.match(/\*/g) || []).length;

      if (occureLength === 1) {
        return componentID.replace(/\*/, key);
      }

      return componentID.replace(/\*/, parentKey).replace(/\*/, key);
    }
    /*
    	updating key for dynamic children for clone
    	ie. id's for - clone inside clone
     */

  }, {
    key: "updateChildKeys",
    value: function updateChildKeys(componentID, key, parentID, parentKey) {
      if (componentID.indexOf('(*)') < 0) {
        return componentID;
      }

      if (parentID === null || typeof parentID === 'undefined') {
        return componentID.replace(/\*/, key) || '';
      }

      return this.replaceLookUp(componentID, key, parentKey);
    }
  }, {
    key: "updateKeys",
    value: function updateKeys(components, key, parentID, parentKey) {
      var _this4 = this;

      components.forEach(function (componentData) {
        componentData.cloneKey = key;
        componentData.id = componentData.id && _this4.updateChildKeys(componentData.id, key, parentID, parentKey);

        if (componentData.type !== 'clone' && componentData.children) {
          _this4.updateKeys(componentData.children, key, parentID, parentKey);
        }
      });
    }
  }, {
    key: "injectComponents",
    value: function injectComponents(components, parent, index, key) {
      if (parent.children) {
        var _parent$children;

        var clonedComponets = lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_5___default()(components);
        this.updateKeys(clonedComponets, key, parent.id, parent.cloneKey); // add cloned elements at index

        (_parent$children = parent.children).splice.apply(_parent$children, [index, 0].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(clonedComponets)));
      }
    }
  }, {
    key: "removeComponent",
    value: function removeComponent(component, parent) {
      if (parent.children) {
        this.removeComponentValues([component]);
        var componentIndex = parent.children.indexOf(component); // Check to see if there is an equal object as in the case of multiple clone removes

        if (componentIndex === -1) {
          parent.children.forEach(function (childComponent, index) {
            if (component.id && childComponent.id && component.id === childComponent.id || JSON.stringify(component) === JSON.stringify(childComponent)) {
              componentIndex = index;
            }
          });
        }

        if (componentIndex > -1) {
          parent.children.splice(componentIndex, 1);
        }
      }
    }
  }, {
    key: "bindModifiers",
    value: function bindModifiers(componentData, parentData) {
      var _this5 = this;

      componentData.inject = function (children, index, key) {
        _this5.storeInitialValues(componentData);

        _this5.injectComponents(children, componentData, index, typeof key === 'number' ? key : componentData.cloneKey);

        if (typeof _this5.onChange === 'function') {
          _this5.onChange();
        }
      };

      componentData.fireEvent = function (eventName, args) {
        _this5.fireEvent(eventName, args);
      }; // bind get functions so deepClone doesn't create a circular link


      componentData.root = function () {
        return componentData;
      };

      componentData.getDataByID = function (referenceId) {
        return typeof _this5.modifiedValues[referenceId] === 'undefined' && (_this5.initialValues[referenceId] || '') || _this5.modifiedValues[referenceId];
      };

      componentData.removeDataByID = function (referenceId) {
        if (_this5.modifiedValues[referenceId]) {
          delete _this5.modifiedValues[referenceId];

          if (typeof _this5.onChange === 'function') {
            _this5.onChange();
          }
        }
      };

      if (parentData) {
        componentData.parent = function () {
          return parentData;
        };

        componentData.remove = function () {
          _this5.removeComponent(componentData, parentData);

          if (typeof _this5.onChange === 'function') {
            _this5.onChange();
          }
        };
      }

      return componentData;
    }
  }, {
    key: "validateComponentData",
    value: function validateComponentData(componentData) {
      var validationResults = _validation_validation__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].validateValue(componentData.data.value || '', componentData.validation, componentData.dependableFields || '', componentData.dependableFields && componentData.getDataByID(this.updateChildKeys(componentData.dependableFields.id, componentData.cloneKey || '')) || '', this.handler || DEFAULT_HANDLER, componentData.conditionalId && this.modifiedValues[componentData.conditionalId] || '');

      if (validationResults === true) {
        componentData.error = null;
      } else {
        componentData.error = validationResults;
      }

      return componentData;
    }
  }, {
    key: "setDefaultValues",
    value: function setDefaultValues(componentData) {
      componentData.data = componentData.data || {};
      componentData.children = componentData.children || [];
      return componentData;
    }
  }, {
    key: "getWriteMode",
    value: function getWriteMode(componentData, parentData) {
      componentData.writeMode = this.writeMode && componentData.editable !== false;

      if (componentData.writeMode && parentData && !parentData.writeMode) {
        componentData.writeMode = false;
      }

      return componentData;
    }
  }, {
    key: "getChildren",
    value: function getChildren(componentData) {
      var _this6 = this;

      // "clone" type children aren't rendered so they shouldn't be built out
      if (componentData.children && componentData.type !== 'clone') {
        componentData.children = componentData.children.map(function (child) {
          return _this6.buildComponentTree(child, componentData);
        });
      }

      return componentData;
    }
  }, {
    key: "getOptionsFromReference",
    value: function getOptionsFromReference(componentData) {
      var referenceId = componentData.data.optionReference;
      var referenceData = this.referenceData.children;
      var referenceIndex = lodash_findIndex__WEBPACK_IMPORTED_MODULE_9___default()(referenceData, {
        'id': referenceId
      });

      if (referenceId && referenceIndex > -1) {
        componentData.data.options = referenceData[referenceIndex].option;
      } else if (componentData.data.option) {
        componentData.data.options = componentData.data.option;
      }

      return componentData;
    }
  }, {
    key: "getReferenceData",
    value: function getReferenceData(componentData) {
      var _this7 = this;

      if (componentData.referenceIds) {
        componentData.referenceValues = componentData.referenceIds.map(function (referenceId) {
          if (referenceId.id.indexOf('*') !== -1) {
            return _this7.getReferenceDataFromWildCard(referenceId.id);
          }

          return _this7.modifiedValues[referenceId.id] || _this7.initialValues[referenceId.id] || null;
        });
      }

      return componentData;
    }
  }, {
    key: "getReferenceDataFromWildCard",
    value: function getReferenceDataFromWildCard(referenceId) {
      var _this8 = this;

      var regexString = referenceId.replace(/(\.|\^|\$|\+|\?|\(|\)|\[|\]|\{|\\|\|)/g, '\\$1').replace(/\*(\\?.)/g, '[^$1]*$1'),
          regexTest = new RegExp(regexString),
          allKeys = lodash_uniq__WEBPACK_IMPORTED_MODULE_6___default()(Object.keys(this.modifiedValues).concat(Object.keys(this.initialValues))),
          matchingKeys = allKeys.filter(regexTest.test.bind(regexTest)),
          matchValues = matchingKeys.map(function (matchId) {
        return _this8.modifiedValues[matchId] || _this8.initialValues[matchId];
      });
      return matchValues;
    }
  }, {
    key: "getModifiedValue",
    value: function getModifiedValue(componentData) {
      if (componentData.id && this.modifiedValues[componentData.id] || this.modifiedValues[componentData.id] === '') {
        componentData.data.value = this.modifiedValues[componentData.id];
      }

      return componentData;
    }
  }, {
    key: "checkForDefaultValue",
    value: function checkForDefaultValue(componentData) {
      var componentRequiresDefault = componentData.id && !componentData.data.value && typeof componentData.data.defaultValue !== 'undefined';

      if (componentRequiresDefault && !this.modifiedValues[componentData.id] && this.modifiedValues[componentData.id] !== '') {
        componentData.data.value = componentData.data.defaultValue;
        this.modifiedValues[componentData.id] = componentData.data.defaultValue;
        this.maskPristineState[componentData.id] = true;
      }

      return componentData;
    }
  }, {
    key: "getPristineState",
    value: function getPristineState(componentData) {
      componentData.pristine = true;

      if (componentData.id && !this.maskPristineState[componentData.id] && typeof this.modifiedValues[componentData.id] !== 'undefined') {
        componentData.pristine = false;
      }

      return componentData;
    }
  }, {
    key: "getErrorState",
    value: function getErrorState(componentData) {
      componentData.validationForced = !!this.forceValidation;
      componentData.error = null;

      if (this.forceValidation || !componentData.pristine) {
        componentData = this.validateComponentData(componentData);
      }

      return componentData;
    }
  }, {
    key: "getValidState",
    value: function getValidState(componentData) {
      if (componentData) {
        if (!componentData.error && (!componentData.pristine || this.forceValidation) && componentData.data.value) {
          componentData.valid = true;
        } else {
          componentData.valid = false;
        }
      }

      return componentData;
    }
  }, {
    key: "getStateFromChildren",
    value: function getStateFromChildren(componentData) {
      if (componentData.children && componentData.children.length) {
        var childrenHaveErrors = false;
        componentData.valid = true;
        componentData.pristine = true;
        componentData.children.forEach(function (child) {
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
  }, {
    key: "buildComponentTree",
    value: function buildComponentTree(componentData, parentData) {
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
  }, {
    key: "build",
    value: function build(forceValidation) {
      var handler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      if (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(this.componentTreeObject) !== 'object') {
        return false;
      }

      this.forceValidation = forceValidation;
      this.handler = handler || this.handler;
      return this.buildComponentTree(this.componentTreeObject);
    }
  }]);

  return ComponentTree;
}();



/***/ }),
/* 163 */,
/* 164 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_uniq__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(104);
/* harmony import */ var lodash_uniq__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_uniq__WEBPACK_IMPORTED_MODULE_2__);




var Validation =
/*#__PURE__*/
function () {
  function Validation() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Validation);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Validation, [{
    key: "validateRequired",
    value: function validateRequired(isRequired, value, message) {
      message = message || 'This field is required';

      if (!this._required(isRequired, value)) {
        return message;
      }

      return true;
    }
  }, {
    key: "validateMinValue",
    value: function validateMinValue(min, value, message) {
      message = message || 'Please enter a minimum of ### value';

      if (!this._minValue(min, value)) {
        return "".concat(message, "###").concat(min);
      }

      return true;
    }
  }, {
    key: "validateGreaterValue",
    value: function validateGreaterValue(min, value, message, currentValue) {
      if (!(parseFloat(currentValue.value) >= parseFloat(currentValue.dependableValue))) {
        return "".concat(message, "###").concat(currentValue.dependableValue);
      }

      return true;
    }
  }, {
    key: "validateLessValue",
    value: function validateLessValue(min, value, message, currentValue) {
      if (!(parseFloat(currentValue.value) <= parseFloat(currentValue.dependableValue))) {
        return "".concat(message, "###").concat(currentValue.dependableValue);
      }

      return true;
    }
  }, {
    key: "validateMaxValue",
    value: function validateMaxValue(max, value, message) {
      message = message || 'Please enter a maximum value of ###';

      if (!this._maxValue(max, value)) {
        return "".concat(message, "###").concat(max);
      }

      return true;
    }
  }, {
    key: "validateMinLength",
    value: function validateMinLength(length, value, message) {
      message = message || 'Please enter a minimum of ### characters';

      if (!this._minLength(length, value)) {
        return "".concat(message, "###").concat(length);
      }

      return true;
    }
  }, {
    key: "validateMaxLength",
    value: function validateMaxLength(length, value, message) {
      message = message || 'Please enter the maximum characters of ###';

      if (!this._maxLength(length, value)) {
        return "".concat(message, "###").concat(length);
      }

      return true;
    }
  }, {
    key: "validateMinDate",
    value: function validateMinDate(mdate, value, message) {
      message = message || 'Please enter the minimum date of ###';

      if (!this._minDate(mdate, value)) {
        return "".concat(message, "###").concat(mdate);
      }

      return true;
    }
  }, {
    key: "validateMaxDate",
    value: function validateMaxDate(mdate, value, message) {
      message = message || 'Please enter the maximum date of ###';

      if (!this._maxDate(mdate, value)) {
        return "".concat(message, "###").concat(mdate);
      }

      return true;
    }
  }, {
    key: "validateMinMonthYear",
    value: function validateMinMonthYear(mdate, value, message) {
      message = message || 'Please enter the minimum month & year of ###';

      if (!this._minMonthYear(mdate, value)) {
        return "".concat(message, "###").concat(mdate);
      }

      return true;
    }
  }, {
    key: "validateMaxMonthYear",
    value: function validateMaxMonthYear(mdate, value, message) {
      message = message || 'Please enter the maximum month & year of ###';

      if (!this._maxMonthYear(mdate, value)) {
        return "".concat(message, "###").concat(mdate);
      }

      return true;
    }
  }, {
    key: "validateInvalidCharacter",
    value: function validateInvalidCharacter(pattern, value, message) {
      message = message || 'Please remove the following invalid characters:###';

      if (!this._invalidCharacter(pattern, value)) {
        var regex = this._buildRegex(pattern);

        return "".concat(message, "###").concat(lodash_uniq__WEBPACK_IMPORTED_MODULE_2___default()(value.match(regex)).join(','));
      }

      return true;
    }
  }, {
    key: "validatePattern",
    value: function validatePattern(pattern, value, message) {
      message = message || 'Please use the correct pattern';

      if (!this._testPattern(pattern, value)) {
        return message;
      }

      return true;
    }
  }, {
    key: "checkForSubmit",
    value: function checkForSubmit(dependableValue, value, handler) {
      if (handler === 'submit') {
        return value;
      }

      return dependableValue;
    }
  }, {
    key: "checkAllowValidation",
    value: function checkAllowValidation(handler, dependableValue) {
      if (handler !== 'submit') {
        return true;
      }

      if (dependableValue) {
        return true;
      }

      return false;
    }
  }, {
    key: "validateValue",
    value: function validateValue(value, validationRules) {
      var dependableValidations = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var dependableValue = arguments.length > 3 ? arguments[3] : undefined;
      var handler = arguments.length > 4 ? arguments[4] : undefined;
      var conditionalValue = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : '';

      if (conditionalValue) {
        value = conditionalValue;
      }

      if (validationRules && Array.isArray(validationRules)) {
        for (var i = 0; i < validationRules.length; ++i) {
          var rule = this._parseRule(validationRules[i]);

          if (this[rule.name]) {
            var results = this[rule.name](rule.value, value, rule.message);

            if (results !== true) {
              return results || 'Invalid Field Data';
            }
          }
        }
      }

      if (dependableValidations && Array.isArray(dependableValidations.validation)) {
        var rules = dependableValidations.validation;

        for (var _i = 0; _i < rules.length; ++_i) {
          var _rule = this._parseRule(rules[_i]);

          if (this[_rule.name] && handler === rules[_i].handler && this.checkAllowValidation(rules[_i].handler, dependableValue)) {
            var results = this[_rule.name](_rule.value, this.checkForSubmit(dependableValue, value, rules[_i].handler), _rule.message, {
              value: value || 0,
              dependableValue: dependableValue || 0
            });

            if (results !== true) {
              return results || 'Invalid Field Data';
            }
          }
        }
      }

      return true;
    }
  }, {
    key: "_buildRegex",
    value: function _buildRegex(pattern) {
      var flags = '';

      if (pattern.indexOf('/') === 0) {
        var lastSlash = pattern.lastIndexOf('/');
        flags = pattern.substr(lastSlash + 1);
        pattern = pattern.substr(1, lastSlash - 1);
      }

      return new RegExp(pattern, flags);
    }
  }, {
    key: "_toCamelCase",
    value: function _toCamelCase(arr) {
      return arr.join('-').replace(/-\w/g, function (m) {
        return m[1].toUpperCase();
      });
    }
  }, {
    key: "_required",
    value: function _required(isRequired, value) {
      value = String(value);

      if (isRequired && !value.trim().length) {
        return false;
      }

      return true;
    }
  }, {
    key: "_minLength",
    value: function _minLength(length, value) {
      value = String(value);

      if (value.trim().length && value.trim().length < length) {
        return false;
      }

      return true;
    }
  }, {
    key: "_minValue",
    value: function _minValue(min, value) {
      min = min || 0;
      value = value || 0;

      if (value && parseFloat(value) < parseFloat(min)) {
        return false;
      }

      return true;
    }
  }, {
    key: "_maxValue",
    value: function _maxValue(max, value) {
      max = max || 0;
      value = value || 0;
      return !(parseFloat(value) > parseFloat(max));
    }
  }, {
    key: "_maxLength",
    value: function _maxLength(length, value) {
      value = String(value);

      if (value.trim().length > length) {
        return false;
      }

      return true;
    }
  }, {
    key: "_stringToDate",
    value: function _stringToDate(value) {
      var date = value.split(/[\/\-\.]/, 3);

      if (date.length !== 3) {
        return false;
      }

      var month = parseInt(date[1]),
          day = parseInt(date[0]),
          year = parseInt(date[2]);
      return new Date(year, month - 1, day);
    }
  }, {
    key: "_maxDate",
    value: function _maxDate(date, value) {
      if (value.replace('//', '') === '') {
        return true;
      }

      var mDate = this._stringToDate(date),
          currentValue = this._stringToDate(value);

      return currentValue <= mDate;
    }
  }, {
    key: "_maxMonthYear",
    value: function _maxMonthYear(date, value) {
      var cDate = new Date().getDate(),
          mDate = cDate + '/' + date,
          vDate = cDate + '/' + value;
      return this._maxDate(mDate, vDate);
    }
  }, {
    key: "_minMonthYear",
    value: function _minMonthYear(date, value) {
      var cDate = new Date().getDate(),
          mDate = cDate + '/' + date,
          vDate = cDate + '/' + value;
      return this._minDate(mDate, vDate);
    }
  }, {
    key: "_minDate",
    value: function _minDate(date, value) {
      if (value.replace('//', '') === '') {
        return true;
      }

      var mDate = this._stringToDate(date),
          currentValue = this._stringToDate(value);

      return currentValue >= mDate;
    }
  }, {
    key: "_invalidCharacter",
    value: function _invalidCharacter(pattern, value) {
      return !this._testPattern(pattern, value);
    }
  }, {
    key: "_testPattern",
    value: function _testPattern(pattern, value) {
      if (value === '') {
        return true;
      }

      var regex = this._buildRegex(pattern);

      return regex.test(value);
    }
  }, {
    key: "_parseRule",
    value: function _parseRule(validationRule) {
      return {
        name: this._toCamelCase(['validate', validationRule.type]),
        value: validationRule.value || true,
        message: validationRule.message || ''
      };
    }
  }]);

  return Validation;
}();

/* harmony default export */ __webpack_exports__["a"] = (new Validation());

/***/ }),
/* 165 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return deepFreeze; });
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(58);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__);

function deepFreeze(o) {
  Object.freeze(o);
  Object.getOwnPropertyNames(o).forEach(function (prop) {
    if (o[prop] !== null && (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(o[prop]) === 'object' || typeof o[prop] === 'function') && !Object.isFrozen(o[prop])) {
      deepFreeze(o[prop]);
    }
  });
  return o;
}

/***/ }),
/* 166 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _components_text_text__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(138);
/* harmony import */ var _components_text_text_masked__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(167);
/* harmony import */ var _components_text_text_date_new__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(169);
/* harmony import */ var _components_text_textarea__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(140);
/* harmony import */ var _components_text_text_hidden__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(171);
/* harmony import */ var _components_text_text_readonly__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(172);
/* harmony import */ var _components_text_text_password__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(173);
/* harmony import */ var _components_text_text_ajax_populate__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(174);
/* harmony import */ var _components_text_text_time__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(175);
/* harmony import */ var _components_text_text_suggestion__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(177);
/* harmony import */ var _components_text_text_calculate_suggestion__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(182);
/* harmony import */ var _components_header_header__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(142);
/* harmony import */ var _components_header_header_subheader__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(183);
/* harmony import */ var _components_header_header_subheader_appendix__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(184);
/* harmony import */ var _components_header_header_icon__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(185);
/* harmony import */ var _components_default_component_default_list__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(143);
/* harmony import */ var _components_list_list_inline__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(186);
/* harmony import */ var _components_list_list_columns__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(187);
/* harmony import */ var _components_list_list_columns_no_gutter__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(188);
/* harmony import */ var _components_list_list_removable__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(189);
/* harmony import */ var _components_list_list_removable_single__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(190);
/* harmony import */ var _components_list_list_tabs__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(191);
/* harmony import */ var _components_list_list_tabs_small__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(193);
/* harmony import */ var _components_list_list_tabs_dropdown__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(195);
/* harmony import */ var _components_list_list_tabs_slider__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(196);
/* harmony import */ var _components_list_list_tabs_icon_radio__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(199);
/* harmony import */ var _components_list_list_tabs_collapse__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(201);
/* harmony import */ var _components_list_list_tabs_multi_select__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(204);
/* harmony import */ var _components_list_list_tabs_read_content__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(205);
/* harmony import */ var _components_list_list_collapsible__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(206);
/* harmony import */ var _components_list_list_collapsible_item__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(207);
/* harmony import */ var _components_data_data_grid__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(208);
/* harmony import */ var _components_options_dropdown__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(131);
/* harmony import */ var _components_options_switcher__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(217);
/* harmony import */ var _components_options_slider__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(197);
/* harmony import */ var _components_options_radio__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(141);
/* harmony import */ var _components_options_icon_radio__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(200);
/* harmony import */ var _components_options_radio_short__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(192);
/* harmony import */ var _components_options_radio_tiny__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(194);
/* harmony import */ var _components_options_checkbox__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(203);
/* harmony import */ var _components_options_icon_checkbox__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(219);
/* harmony import */ var _components_options_icon_checkbox_values__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(220);
/* harmony import */ var _components_options_icon_checkbox_short__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(221);
/* harmony import */ var _components_options_toggle_checkbox__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(202);
/* harmony import */ var _components_options_select_pills__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(222);
/* harmony import */ var _components_options_pill__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(226);
/* harmony import */ var _components_options_multi_options_pills__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(228);
/* harmony import */ var _components_clone_clone__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(229);
/* harmony import */ var _components_content_content__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(146);
/* harmony import */ var _components_content_content_text__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(230);
/* harmony import */ var _components_content_content_text_list__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(231);
/* harmony import */ var _components_content_content_grid__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(145);
/* harmony import */ var _components_content_content_markdown__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(232);
/* harmony import */ var _components_content_content_calculator__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(233);
/* harmony import */ var _components_content_content_list__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(234);
/* harmony import */ var _components_content_content_link__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(236);
/* harmony import */ var _components_content_content_iframe__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(237);
/* harmony import */ var _components_cards_cards_wrapper__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(238);
/* harmony import */ var _components_cards_card__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(239);
/* harmony import */ var _components_cards_card_large__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(240);
/* harmony import */ var _components_cards_card_footer__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(241);
/* harmony import */ var _components_custom_custom_group_elements__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(242);
/* harmony import */ var _components_custom_custom_multi_group_elements__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(243);
/* harmony import */ var _components_custom_custom_formula_calculator__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(179);
/* harmony import */ var _components_custom_custom_formula_calculator_text__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(178);
/* harmony import */ var _components_custom_custom_ratio_bar__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(244);
/* harmony import */ var _components_custom_custom_external_links__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(245);
/* harmony import */ var _components_custom_custom_calculator_animate__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(246);
/* harmony import */ var _components_custom_custom_state_suggestion__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(247);
/* harmony import */ var _components_custom_custom_country_suggestion__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(250);
/* harmony import */ var _components_popup_popup__WEBPACK_IMPORTED_MODULE_70__ = __webpack_require__(252);
/* harmony import */ var _components_table_table__WEBPACK_IMPORTED_MODULE_71__ = __webpack_require__(147);
/* harmony import */ var _components_table_table_header__WEBPACK_IMPORTED_MODULE_72__ = __webpack_require__(149);
/* harmony import */ var _components_table_table_body__WEBPACK_IMPORTED_MODULE_73__ = __webpack_require__(148);
/* harmony import */ var _components_table_table_footer__WEBPACK_IMPORTED_MODULE_74__ = __webpack_require__(254);
/* harmony import */ var _components_table_table_row__WEBPACK_IMPORTED_MODULE_75__ = __webpack_require__(150);
// this is to dynamically load all big components as needed

/*import loadable from '@loadable/component';
import Loader from 'components/common/page-loader/loader';*/
// start components here

 //import TextDateComponent from './components/text/text-date';

 //import TextDateMaskedComponent from './components/text/text-date-masked';




 //import TextGooglePlaceComponent from './components/text/text-google-place';


 //import TextEditorComponent from './components/text/text-editor';

























































 //import CustomCarouselWrapper from './components/custom/custom-carousel-wrapper';





/*import CustomSearchSelect from './components/custom/custom-search-select';*/






 //import ProfilePicComponent from './components/profile-pic/profile-pic';
//import ChartComponent from './components/charts/chart';
// Lazy loaded super heavy components
// add here

var DefaultComponentIndex = {
  'text': _components_text_text__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"],
  'text-mask': _components_text_text_masked__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"],
  //'date': TextDateMaskedComponent,
  'text-date': _components_text_text_date_new__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"],
  'text-area': _components_text_textarea__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"],
  'text-hidden': _components_text_text_hidden__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"],
  'text-read': _components_text_text_readonly__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"],
  'text-password': _components_text_text_password__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"],
  //'text-google-place' : TextGooglePlaceComponent,
  'text-ajax-populate': _components_text_text_ajax_populate__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"],
  'text-time': _components_text_text_time__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"],
  'text-suggestion': _components_text_text_suggestion__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"],
  'text-calculate-suggestion': _components_text_text_calculate_suggestion__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"],
  //'text-editor' : TextEditorComponent,
  'options': _components_text_text__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"],
  'radio': _components_options_radio__WEBPACK_IMPORTED_MODULE_35__[/* default */ "a"],
  'radio-icon': _components_options_icon_radio__WEBPACK_IMPORTED_MODULE_36__[/* default */ "a"],
  'checkbox': _components_options_checkbox__WEBPACK_IMPORTED_MODULE_39__[/* default */ "a"],
  'checkbox-icon': _components_options_icon_checkbox__WEBPACK_IMPORTED_MODULE_40__[/* default */ "a"],
  'checkbox-icon-values': _components_options_icon_checkbox_values__WEBPACK_IMPORTED_MODULE_41__[/* default */ "a"],
  'checkbox-icon-short': _components_options_icon_checkbox_short__WEBPACK_IMPORTED_MODULE_42__[/* default */ "a"],
  'toggle': _components_options_toggle_checkbox__WEBPACK_IMPORTED_MODULE_43__[/* default */ "a"],
  'radio-short': _components_options_radio_short__WEBPACK_IMPORTED_MODULE_37__[/* default */ "a"],
  'radio-tiny': _components_options_radio_tiny__WEBPACK_IMPORTED_MODULE_38__[/* default */ "a"],
  'dropdown': _components_options_dropdown__WEBPACK_IMPORTED_MODULE_32__[/* default */ "a"],
  'slider': _components_options_slider__WEBPACK_IMPORTED_MODULE_34__[/* default */ "a"],
  'switcher': _components_options_switcher__WEBPACK_IMPORTED_MODULE_33__[/* default */ "a"],
  'select-pills': _components_options_select_pills__WEBPACK_IMPORTED_MODULE_44__[/* default */ "a"],
  'pill': _components_options_pill__WEBPACK_IMPORTED_MODULE_45__[/* default */ "a"],
  'multi-select-pills': _components_options_multi_options_pills__WEBPACK_IMPORTED_MODULE_46__[/* default */ "a"],
  'header': _components_header_header__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"],
  'header-icon': _components_header_header_icon__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"],
  'header-subheader': _components_header_header_subheader__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"],
  'header-subheader-appendix': _components_header_header_subheader_appendix__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"],
  'card': _components_cards_card__WEBPACK_IMPORTED_MODULE_58__[/* default */ "a"],
  'card-large': _components_cards_card_large__WEBPACK_IMPORTED_MODULE_59__[/* default */ "a"],
  'card-wrapper': _components_cards_cards_wrapper__WEBPACK_IMPORTED_MODULE_57__[/* default */ "a"],
  'card-footer': _components_cards_card_footer__WEBPACK_IMPORTED_MODULE_60__[/* default */ "a"],
  'list': _components_default_component_default_list__WEBPACK_IMPORTED_MODULE_15__[/* default */ "a"],
  'list-inline': _components_list_list_inline__WEBPACK_IMPORTED_MODULE_16__[/* default */ "a"],
  'list-columns': _components_list_list_columns__WEBPACK_IMPORTED_MODULE_17__[/* default */ "a"],
  'list-columns-no-gutter': _components_list_list_columns_no_gutter__WEBPACK_IMPORTED_MODULE_18__[/* default */ "a"],
  'list-removable': _components_list_list_removable__WEBPACK_IMPORTED_MODULE_19__[/* default */ "a"],
  'list-removable-single': _components_list_list_removable_single__WEBPACK_IMPORTED_MODULE_20__[/* default */ "a"],
  'list-tabs': _components_list_list_tabs__WEBPACK_IMPORTED_MODULE_21__[/* default */ "a"],
  'list-tabs-small': _components_list_list_tabs_small__WEBPACK_IMPORTED_MODULE_22__[/* default */ "a"],
  'list-tabs-dropdown': _components_list_list_tabs_dropdown__WEBPACK_IMPORTED_MODULE_23__[/* default */ "a"],
  'list-tabs-radio-icon': _components_list_list_tabs_icon_radio__WEBPACK_IMPORTED_MODULE_25__[/* default */ "a"],
  'list-tabs-slider': _components_list_list_tabs_slider__WEBPACK_IMPORTED_MODULE_24__[/* default */ "a"],
  'list-tabs-collapse': _components_list_list_tabs_collapse__WEBPACK_IMPORTED_MODULE_26__[/* default */ "a"],
  'list-tabs-multi-select': _components_list_list_tabs_multi_select__WEBPACK_IMPORTED_MODULE_27__[/* default */ "a"],
  'list-tabs-read-content': _components_list_list_tabs_read_content__WEBPACK_IMPORTED_MODULE_28__[/* default */ "a"],
  'list-collapsible': _components_list_list_collapsible__WEBPACK_IMPORTED_MODULE_29__[/* default */ "a"],
  'collapsible-item': _components_list_list_collapsible_item__WEBPACK_IMPORTED_MODULE_30__[/* default */ "a"],
  'data-grid': _components_data_data_grid__WEBPACK_IMPORTED_MODULE_31__[/* default */ "a"],
  //'chart' : ChartComponent,
  'clone': _components_clone_clone__WEBPACK_IMPORTED_MODULE_47__[/* default */ "a"],
  'content': _components_content_content__WEBPACK_IMPORTED_MODULE_48__[/* default */ "a"],
  'content-text': _components_content_content_text__WEBPACK_IMPORTED_MODULE_49__[/* default */ "a"],
  'content-text-list': _components_content_content_text_list__WEBPACK_IMPORTED_MODULE_50__[/* default */ "a"],
  'content-markdown': _components_content_content_markdown__WEBPACK_IMPORTED_MODULE_52__[/* default */ "a"],
  'content-list': _components_content_content_list__WEBPACK_IMPORTED_MODULE_54__[/* default */ "a"],
  'content-tooltip': _components_content_content__WEBPACK_IMPORTED_MODULE_48__[/* default */ "a"],
  'content-calculator': _components_content_content_calculator__WEBPACK_IMPORTED_MODULE_53__[/* default */ "a"],
  'content-grid': _components_content_content_grid__WEBPACK_IMPORTED_MODULE_51__[/* default */ "a"],
  'link': _components_content_content_link__WEBPACK_IMPORTED_MODULE_55__[/* default */ "a"],
  'content-iframe': _components_content_content_iframe__WEBPACK_IMPORTED_MODULE_56__[/* default */ "a"],
  'custom-group': _components_custom_custom_group_elements__WEBPACK_IMPORTED_MODULE_61__[/* default */ "a"],
  'custom-multi-group': _components_custom_custom_multi_group_elements__WEBPACK_IMPORTED_MODULE_62__[/* default */ "a"],
  'custom-formula-calculator': _components_custom_custom_formula_calculator__WEBPACK_IMPORTED_MODULE_63__[/* default */ "a"],
  'custom-calculator-animate': _components_custom_custom_calculator_animate__WEBPACK_IMPORTED_MODULE_67__[/* default */ "a"],
  'text-calculator': _components_custom_custom_formula_calculator_text__WEBPACK_IMPORTED_MODULE_64__[/* default */ "a"],
  'custom-ratio-bar': _components_custom_custom_ratio_bar__WEBPACK_IMPORTED_MODULE_65__[/* default */ "a"],

  /*'custom-search-select' : CustomSearchSelect,*/

  /*'custom-carousel' : CustomCarouselWrapper,*/
  'custom-external-links': _components_custom_custom_external_links__WEBPACK_IMPORTED_MODULE_66__[/* default */ "a"],
  'custom-state-suggestion': _components_custom_custom_state_suggestion__WEBPACK_IMPORTED_MODULE_68__[/* default */ "a"],
  'custom-country-suggestion': _components_custom_custom_country_suggestion__WEBPACK_IMPORTED_MODULE_69__[/* default */ "a"],
  'popup': _components_popup_popup__WEBPACK_IMPORTED_MODULE_70__[/* default */ "a"],
  'table': _components_table_table__WEBPACK_IMPORTED_MODULE_71__[/* default */ "a"],
  'table-header': _components_table_table_header__WEBPACK_IMPORTED_MODULE_72__[/* default */ "a"],
  'table-body': _components_table_table_body__WEBPACK_IMPORTED_MODULE_73__[/* default */ "a"],
  'table-footer': _components_table_table_footer__WEBPACK_IMPORTED_MODULE_74__[/* default */ "a"],
  'table-row': _components_table_table_row__WEBPACK_IMPORTED_MODULE_75__[/* default */ "a"] //'profile-pic' : ProfilePicComponent

};
/* harmony default export */ __webpack_exports__["a"] = (DefaultComponentIndex);

/***/ }),
/* 167 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TextMaskedComponent; });
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _text__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(138);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(115);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react_text_mask__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(168);
/* harmony import */ var react_text_mask__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_text_mask__WEBPACK_IMPORTED_MODULE_10__);











var MASKS = {
  'ssn': [/\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  'phone-number': [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
};
/**
 * @description Renders a masked version of the text component
 */

var TextMaskedComponent =
/*#__PURE__*/
function (_TextComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(TextMaskedComponent, _TextComponent);

  function TextMaskedComponent(props) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, TextMaskedComponent);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(TextMaskedComponent).call(this, props));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(TextMaskedComponent, [{
    key: "getMaskValue",
    value: function getMaskValue(maskType) {
      return MASKS[maskType] || false;
    }
  }, {
    key: "renderWriteValue",
    value: function renderWriteValue(value) {
      var mask = this.getMaskValue(this.props.maskType);
      var componentArray = [_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: classnames__WEBPACK_IMPORTED_MODULE_9___default()("schema__text__input__container ", this.props.data.className)
      }, "inputTextContainer", react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react_text_mask__WEBPACK_IMPORTED_MODULE_10___default.a, {
        id: this.state.uniqueId,
        keepCharPositions: true,
        mask: mask,
        ref: "input",
        placeholder: this.getPlaceHolder(),
        name: this.props.id,
        value: value,
        key: "input",
        "data-tealium-narrative": this.props.label,
        onChange: this.onChange.bind(this)
      }), this.renderTooltip())];

      if (this.props.error) {
        componentArray.push(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
          className: "schema__error"
        }, "error", this.renderErrorMessage(this.props.error)));
      }

      return componentArray;
    }
  }, {
    key: "onChange",
    value: function onChange(e) {
      var formattedValue = e.currentTarget.value && e.currentTarget.value.replace(/\D+/g, "");
      this.props.storeValue(this.props.id, formattedValue);
    }
  }]);

  return TextMaskedComponent;
}(_text__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"]);

TextMaskedComponent.propTypes = {
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.array
};
TextMaskedComponent.defaultProps = {
  classNames: ['schema__text']
};


/***/ }),
/* 168 */,
/* 169 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TextDateCustomeComponent; });
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(94);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(137);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _text__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(138);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(45);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_11__);












/**
 * @description Renders a set of text inputs to display a date
 */

var TextDateCustomeComponent =
/*#__PURE__*/
function (_TextComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default()(TextDateCustomeComponent, _TextComponent);

  function TextDateCustomeComponent(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, TextDateCustomeComponent);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(TextDateCustomeComponent).call(this, props));

    _this.handleChange = function (newDate) {
      var date = moment__WEBPACK_IMPORTED_MODULE_11___default()(newDate).format('MM/DD/YYYY');

      _this.props.storeValue(_this.props.id, _this.updateStore(date));
    };

    _this.onChange = _this.onChange.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this));

    if (process.env.BROWSER) {
      _this.DatePicker = __webpack_require__(170).default;
    }

    return _this;
  }
  /*componentWillMount() {
  	this.setState({
  		uniqueId: uniqueFormId()
  	});
  	this.props.data.value && this.updateStore(this.props.data.value);
  }
  	onChange(ref, len='', nextRef='') {
  	if( len && (ReactDOM.findDOMNode(this.refs[ref]).value).length === len) {
  		this.refs[nextRef].focus();
  	}
  		let dateValue = [
  		ReactDOM.findDOMNode(this.refs.inputDay).value,
  		ReactDOM.findDOMNode(this.refs.inputMonth).value,
  		ReactDOM.findDOMNode(this.refs.inputYear).value
  	].join('/');
  	this.props.storeValue(this.props.id, dateValue.replace('//',''));
  }*/


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(TextDateCustomeComponent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      console.log(document.querySelector('.react-date-picker__inputGroup__day'));
      document.querySelector('.react-date-picker__inputGroup__day').placeholder = 'dd';
      document.querySelector('.react-date-picker__inputGroup__month').placeholder = 'mm';
      document.querySelector('.react-date-picker__inputGroup__year').placeholder = 'yyyy';
    }
  }, {
    key: "renderLabel",
    value: function renderLabel(label) {
      var l = this.props.l;
      var className = this.getLabelClassNames();
      return this.props.writeMode ? _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("label", {
        className: className,
        htmlFor: this.state.uniqueId
      }, void 0, l(label), this.renderLabelInfo()) : _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("span", {
        className: className
      }, void 0, l(label), this.renderLabelInfo());
    }
  }, {
    key: "updateStore",
    value: function updateStore(date) {
      date = date.split(/[\/\-\.]/, 3);
      var month = parseInt(date[0]),
          day = parseInt(date[1]),
          year = parseInt(date[2]);
      var dateValue = [day, month, year].join('/');
      return dateValue;
    }
  }, {
    key: "renderWriteValue",
    value: function renderWriteValue(value) {
      value = value && this.updateStore(value);
      var l = this.props.l;
      var format = this.props.data.format;
      var DatePicker = this.DatePicker || '';
      var componentArray = [_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: "schema__text__input__container"
      }, "inputContainer", DatePicker && _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()(DatePicker, {
        onChange: this.handleChange.bind(this),
        value: value ? new Date(value) : '',
        clearIcon: ""
      }), this.renderTooltip())];

      if (this.props.error) {
        var error = this.props.error;

        if (format === this.props.format) {
          var dateArr = this.props.error.split('###');

          if (dateArr[1]) {
            var date = dateArr[1].split(/[\/\-\.]/, 3),
                month = parseInt(date[1]),
                day = parseInt(date[0]),
                year = parseInt(date[2]);
            error = [dateArr[0], [month, day, year].join('/')].join('###');
          }
        }

        componentArray.push(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
          className: "schema__error"
        }, "error", this.renderErrorMessage(error)));
      }

      return componentArray;
    }
  }]);

  return TextDateCustomeComponent;
}(_text__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"]);

TextDateCustomeComponent.propTypes = {
  label: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.string,
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.array,
  format: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.string
};
TextDateCustomeComponent.defaultProps = {
  label: '',
  classNames: ['schema__text-date'],
  format: 'MM/DD/YYYY'
};


/***/ }),
/* 170 */,
/* 171 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TextHiddenComponent; });
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(137);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _text__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(138);










/**
 * @description Renders a currency version of the text component
 */

var TextHiddenComponent =
/*#__PURE__*/
function (_TextComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(TextHiddenComponent, _TextComponent);

  function TextHiddenComponent(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, TextHiddenComponent);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(TextHiddenComponent).call(this, props));
    _this.state = {
      hasFocus: false
    };
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(TextHiddenComponent, [{
    key: "renderWriteValue",
    value: function renderWriteValue(value) {
      var componentArray = [_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: "schema__text__hidden__container"
      }, "inputHiddenContainer", react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("input", {
        id: this.state.uniqueId,
        type: "hidden",
        ref: "inputhidden",
        name: this.props.id,
        value: value,
        key: "input",
        onChange: this.onChange.bind(this)
      }))];
      return componentArray;
    }
  }, {
    key: "onChange",
    value: function onChange() {
      this.props.storeValue(this.props.id, react_dom__WEBPACK_IMPORTED_MODULE_8___default.a.findDOMNode(this.refs.inputhidden).value);
    }
  }]);

  return TextHiddenComponent;
}(_text__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"]);

TextHiddenComponent.propTypes = {
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.array
};
TextHiddenComponent.defaultProps = {
  classNames: ['schema__options', 'schema__text', 'schema__text__currency']
};


/***/ }),
/* 172 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TextReadComponent; });
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _text__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(138);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(115);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_9__);










/**
 * @description Renders a currency version of the text component
 */

var TextReadComponent =
/*#__PURE__*/
function (_TextComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(TextReadComponent, _TextComponent);

  function TextReadComponent(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, TextReadComponent);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(TextReadComponent).call(this, props));
    _this.state = {
      hasFocus: false
    };
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(TextReadComponent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.storeValue(this.props.id, this.props.data.value);
    }
  }, {
    key: "renderWriteValue",
    value: function renderWriteValue(value) {
      value = this.props.typePostfix || this.props.typePrefix ? "".concat(this.props.typePrefix || '', " ").concat(value, " ").concat(this.props.typePostfix || '') : value;
      var componentArray = [_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: classnames__WEBPACK_IMPORTED_MODULE_9___default()("schema__text__input__container", this.props.data.className)
      }, "inputReadContainer", react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("input", {
        id: this.state.uniqueId,
        ref: "input",
        name: this.props.id,
        placeholder: this.getPlaceHolder(),
        value: value,
        key: "input",
        readOnly: true
      }), this.renderTooltip())];
      return componentArray;
    }
  }]);

  return TextReadComponent;
}(_text__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"]);

TextReadComponent.propTypes = {
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.array
};
TextReadComponent.defaultProps = {
  classNames: ['schema__text'],
  isDisplayTopLabel: true
};


/***/ }),
/* 173 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TextPasswordComponent; });
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(137);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _text__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(138);










/**
 * @description Renders a currency version of the text component
 */

var TextPasswordComponent =
/*#__PURE__*/
function (_TextComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(TextPasswordComponent, _TextComponent);

  function TextPasswordComponent(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, TextPasswordComponent);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(TextPasswordComponent).call(this, props));
    _this.state = {
      hasFocus: false,
      type: 'password'
    };
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(TextPasswordComponent, [{
    key: "renderWriteValue",
    value: function renderWriteValue(value) {
      var _this2 = this;

      var type = this.state.type;
      var textShow = type === 'password' ? 'show' : 'hide';
      var componentArray = [_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: "schema__text__password__container"
      }, "inputPasswordContainer", react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("input", {
        id: this.state.uniqueId,
        type: type,
        ref: "inputpassword",
        placeholder: this.getPlaceHolder(),
        name: this.props.id,
        value: value,
        key: "input",
        autoComplete: "new-password",
        onChange: this.onChange.bind(this)
      }), value.length > 0 && _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("span", {
        className: "show-hide-control",
        onClick: function onClick() {
          _this2.setState({
            type: type === 'password' ? 'text' : 'password'
          });
        }
      }, void 0, textShow))];

      if (this.props.error) {
        componentArray.push(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
          className: "schema__error"
        }, "error", this.renderErrorMessage(this.props.error)));
      }

      return componentArray;
    }
  }, {
    key: "onChange",
    value: function onChange() {
      this.props.storeValue(this.props.id, react_dom__WEBPACK_IMPORTED_MODULE_8___default.a.findDOMNode(this.refs.inputpassword).value);
    }
  }]);

  return TextPasswordComponent;
}(_text__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"]);

TextPasswordComponent.propTypes = {
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.array
};
TextPasswordComponent.defaultProps = {
  classNames: ['schema__options', 'schema__text', 'schema__text__password']
};


/***/ }),
/* 174 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TextAjaxPopulateComponent; });
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(94);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _text__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(138);










/**
 * @description Renders a currency version of the text component
 */

var TextAjaxPopulateComponent =
/*#__PURE__*/
function (_TextComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default()(TextAjaxPopulateComponent, _TextComponent);

  function TextAjaxPopulateComponent(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, TextAjaxPopulateComponent);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(TextAjaxPopulateComponent).call(this, props));
    _this.state = {
      hasFocus: false,
      value: props.data.name,
      xhr: '',
      ajaxData: [],
      showDropDown: false
    };
    _this.onInputChange = _this.onInputChange.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this));
    _this.fetchData = _this.fetchData.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this));
    _this.hideDropDown = _this.hideDropDown.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this));
    _this.interval = '';
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(TextAjaxPopulateComponent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({
        xhr: new XMLHttpRequest()
      });
    }
  }, {
    key: "hideDropDown",
    value: function hideDropDown() {
      this.setState({
        showDropDown: false
      });
    }
  }, {
    key: "onInputChange",
    value: function onInputChange(value) {
      var _this2 = this;

      this.interval && window.clearInterval(this.interval);
      this.setState({
        value: value
      }, function () {
        _this2.props.storeValue(_this2.props.id, value);

        _this2.interval = value.length > 2 && setTimeout(_this2.fetchData, 300);
      });
    }
  }, {
    key: "fetchData",
    value: function fetchData() {
      var _this$state = this.state,
          xhr = _this$state.xhr,
          value = _this$state.value;
      var data = this.props.data;

      var _self = this;

      xhr.open('GET', "".concat(data.url, "?").concat(data.param, "=").concat(value), true);
      xhr.send();

      xhr.onerror = function onErrordata() {
        console.log(data);
      };

      xhr.onload = function onSuccessdata() {
        var data = this.responseText ? JSON.parse(this.responseText) : [];

        _self.setState({
          ajaxData: data,
          showDropDown: true
        });
      };
    }
  }, {
    key: "onOptionSelect",
    value: function onOptionSelect(option) {
      this.setState({
        value: option.name,
        showDropDown: false
      });
      this.props.storeValue(this.props.id, option.id);
    }
  }, {
    key: "renderCustomData",
    value: function renderCustomData() {
      var _this3 = this;

      var ajaxData = this.state.ajaxData;
      return ajaxData.map(function (option) {
        return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("li", {
          className: "pac-item",
          onClick: function onClick() {
            return _this3.onOptionSelect(option);
          }
        }, void 0, option.name);
      });
    }
  }, {
    key: "renderWriteValue",
    value: function renderWriteValue(value) {
      var _this4 = this;

      var showDropDown = this.state.showDropDown;
      var inputValue = '';

      if (this.state.value) {
        inputValue = this.state.value;
      }

      var componentArray = [_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: "schema__text__ajaxpopulate__container"
      }, "inputAjaxPopulateContainer", react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("input", {
        id: this.state.uniqueId,
        type: "text",
        ref: "inputgoogleplace",
        placeholder: this.getPlaceHolder(),
        name: this.props.id,
        value: inputValue,
        onChange: function onChange(evt) {
          return _this4.onInputChange(evt.target.value);
        }
      }), showDropDown && _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: "custom-auto-complete pac-container"
      }, void 0, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("ul", {}, void 0, this.renderCustomData())))];
      return componentArray;
    }
  }]);

  return TextAjaxPopulateComponent;
}(_text__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"]);

TextAjaxPopulateComponent.propTypes = {
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.array
};
TextAjaxPopulateComponent.defaultProps = {
  classNames: ['schema__options', 'schema__text', 'schema__text__ajax-populate']
};


/***/ }),
/* 175 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TextTimeComponent; });
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _text__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(138);
/* harmony import */ var react_datetime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(176);
/* harmony import */ var react_datetime__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_datetime__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(45);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_10__);











/**
 * @description Renders a set of text inputs to display a short date like MM/YYYY
 */

var TextTimeComponent =
/*#__PURE__*/
function (_TextComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(TextTimeComponent, _TextComponent);

  function TextTimeComponent(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, TextTimeComponent);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(TextTimeComponent).call(this, props));

    _this.handleChange = function (newDate) {
      _this.props.storeValue(_this.props.id, moment__WEBPACK_IMPORTED_MODULE_10___default()(newDate).format('h:mm a'));
    };

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(TextTimeComponent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.data.value) {
        this.props.storeValue(this.props.id, this.props.data.value);
      }
    }
  }, {
    key: "renderLabel",
    value: function renderLabel(label) {
      var l = this.props.l;
      var className = this.getLabelClassNames();
      return this.props.writeMode ? _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("label", {
        className: "schema__label schema__label--edit schema__label--valid",
        htmlFor: this.state.uniqueId
      }, void 0, l(label), this.renderLabelInfo()) : _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("span", {
        className: className
      }, void 0, l(label), this.renderLabelInfo());
    }
  }, {
    key: "renderWriteValue",
    value: function renderWriteValue(value) {
      var _this2 = this;

      var componentArray = [_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: "schema__text__input__container"
      }, "inputContainer", _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()(react_datetime__WEBPACK_IMPORTED_MODULE_9___default.a, {
        viewMode: "time",
        defaultValue: value,
        dateFormat: false,
        inputProps: {
          'placeholder': 'HH:MM',
          id: this.state.uniqueId,
          readOnly: true
        },
        closeOnSelect: true,
        onChange: function onChange(newData) {
          return _this2.handleChange(newData);
        }
      }))];

      if (this.props.error) {
        componentArray.push(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
          className: "schema__error"
        }, "error", this.renderErrorMessage(this.props.error)));
      }

      return componentArray;
    }
  }]);

  return TextTimeComponent;
}(_text__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"]);

TextTimeComponent.propTypes = {
  label: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.string,
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.array
};
TextTimeComponent.defaultProps = {
  label: '',
  classNames: ['schema__text-time']
};


/***/ }),
/* 176 */,
/* 177 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TextSuggestionComponent; });
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(94);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(115);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _custom_custom_formula_calculator_text__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(178);
/* harmony import */ var react_custom_scrollbars__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(181);
/* harmony import */ var react_custom_scrollbars__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_custom_scrollbars__WEBPACK_IMPORTED_MODULE_11__);












/**
 * @description Renders a currency version of the text component
 */

var TextSuggestionComponent =
/*#__PURE__*/
function (_CustomFormulaCalcula) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default()(TextSuggestionComponent, _CustomFormulaCalcula);

  function TextSuggestionComponent(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, TextSuggestionComponent);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(TextSuggestionComponent).call(this, props));
    console.log(props.data);
    _this.state = {
      hasFocus: false,
      value: props.data.value,
      //suggestions : props.data.options,
      showDropDown: false
    };
    _this._ignoreBlur = false;
    _this.onInputChange = _this.onInputChange.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this));
    _this.hideDropDown = _this.hideDropDown.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this));
    _this.showDropdown = _this.showDropdown.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this));
    _this.onInputBlur = _this.onInputBlur.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this));
    _this.toggleDropdown = _this.toggleDropdown.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this));
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(TextSuggestionComponent, [{
    key: "hideDropDown",
    value: function hideDropDown() {
      this.setState({
        showDropDown: false
      });
    }
  }, {
    key: "toggleDropdown",
    value: function toggleDropdown() {
      this.setState({
        showDropDown: !this.state.showDropDown
      });
    }
  }, {
    key: "showDropdown",
    value: function showDropdown() {
      this.setState({
        showDropDown: true
      });
    }
  }, {
    key: "onInputChange",
    value: function onInputChange(value) {
      var _this2 = this;

      this.canAutoUpdate = false;
      this.pristainValue = false;
      this.setState({
        showDropDown: value === ''
      }, function () {
        if (_this2.props.data.changeableFields) {
          _this2.props.data.changeableFields && _this2.props.data.changeableFields.map(function (field, key) {
            _this2.props.storeValue("changeableFields.".concat(field), true);
          }); //this.props.storeValue(`trackFieldUpdate.${this.props.id}`, true);
        }

        _this2.props.storeValue(_this2.props.id, value);
      });
    }
  }, {
    key: "setIgnoreBlur",
    value: function setIgnoreBlur(flag) {
      this._ignoreBlur = flag;
    }
  }, {
    key: "onInputBlur",
    value: function onInputBlur() {
      this.canAutoUpdate = true;

      if (this._ignoreBlur) {
        return;
      }

      this.hideDropDown();
    }
  }, {
    key: "onOptionSelect",
    value: function onOptionSelect(option) {
      var _this3 = this;

      this.canAutoUpdate = true;
      this.suggestionSelected = true;
      this.setState({
        value: option.value,
        showDropDown: false
      });
      this.props.storeValue(this.props.id, option.value);

      if (this.props.data.changeableFields) {
        this.props.data.changeableFields && this.props.data.changeableFields.map(function (field, key) {
          _this3.props.storeValue("changeableFields.".concat(field), true);
        });
      }

      if (this.props.dependentId) {
        this.props.storeValue(this.props.dependentId, option.dependentValue);
      }
    }
  }, {
    key: "renderCustomData",
    value: function renderCustomData() {
      var _this4 = this;

      var _this$props = this.props,
          l = _this$props.l,
          data = _this$props.data; //const { suggestions } = this.state;

      if (!data.options) {
        return null;
      }

      return data.options.map(function (option) {
        return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("li", {
          className: "pac-item",
          onMouseEnter: function onMouseEnter() {
            _this4.setIgnoreBlur(true);
          },
          onMouseLeave: function onMouseLeave() {
            _this4.setIgnoreBlur(false);
          },
          onClick: function onClick() {
            return _this4.onOptionSelect(option);
          }
        }, void 0, l(option.label));
      });
    }
  }, {
    key: "renderWriteValue",
    value: function renderWriteValue(value) {
      var _this5 = this;

      var showDropDown = this.state.showDropDown;
      var componentArray = [_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: classnames__WEBPACK_IMPORTED_MODULE_9___default()("schema__text__ajaxpopulate__container", this.props.data.className)
      }, "inputAjaxPopulateContainer", this.props.typePostfix && _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("span", {
        className: "type-postfix"
      }, void 0, this.props.typePostfix), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("input", {
        id: this.state.uniqueId,
        type: "text",
        ref: "inputcalculatesuggestion",
        placeholder: this.getPlaceHolder(),
        name: this.props.id,
        value: value,
        onFocus: this.showDropdown,
        onBlur: this.onInputBlur,
        onChange: function onChange(evt) {
          return _this5.onInputChange(evt.target.value);
        }
      }), _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("i", {
        onClick: this.toggleDropdown,
        className: classnames__WEBPACK_IMPORTED_MODULE_9___default()("schema__text__suggestion__dropdown-icon", showDropDown ? "pe-7s-angle-up" : "pe-7s-angle-down")
      }), showDropDown && _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: "custom-auto-complete pac-container"
      }, void 0, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()(react_custom_scrollbars__WEBPACK_IMPORTED_MODULE_11__["Scrollbars"], {
        className: "scrollbars",
        autoHeight: true,
        autoHeightMax: 200
      }, void 0, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("ul", {}, void 0, this.renderCustomData()))))];

      if (this.props.error) {
        componentArray.push(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
          className: "schema__error"
        }, "error", this.renderErrorMessage(this.props.error)));
      }

      return componentArray;
    }
  }]);

  return TextSuggestionComponent;
}(_custom_custom_formula_calculator_text__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"]);

TextSuggestionComponent.propTypes = {
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.array
};
TextSuggestionComponent.defaultProps = {
  classNames: ['schema__options', 'schema__text', 'schema__text__suggestion'],
  isDisplayTopLabel: true
};


/***/ }),
/* 178 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomFormulaCalculatorText; });
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(94);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _custom_formula_calculator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(179);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(115);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _utils_analyze_returns_formulae__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(180);












var CustomFormulaCalculatorText =
/*#__PURE__*/
function (_CustomFormulaCalcula) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default()(CustomFormulaCalculatorText, _CustomFormulaCalcula);

  function CustomFormulaCalculatorText(props, context) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, CustomFormulaCalculatorText);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(CustomFormulaCalculatorText).call(this, props, context));
    _this.canAutoUpdate = true;
    _this.pristainValue = true;
    _this.cherrySum = _this.getCherrySum();
    _this.onInputBlur = _this.onInputBlur.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this));

    if (props.data.value) {
      _this.pristainState = true;
    }

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(CustomFormulaCalculatorText, [{
    key: "getCherrySum",
    value: function getCherrySum() {
      var _this2 = this;

      var _this$props = this.props,
          _this$props$cherrypic = _this$props.cherrypickids,
          cherrypickids = _this$props$cherrypic === void 0 ? undefined : _this$props$cherrypic,
          cloneKey = _this$props.cloneKey;

      if (cherrypickids) {
        var cherryValue = Object.values(cherrypickids).map(function (key) {
          return parseFloat(_this2.props.getDataByID(key.replace(/\*/, cloneKey)) || 0);
        }).reduce(function (total, current) {
          return total + current;
        });
        return cherryValue;
      }

      return 0;
    }
  }, {
    key: "updatePristainState",
    value: function updatePristainState() {
      if (!this.pristainValue) {
        return false;
      }

      if (this.pristainValue && this.cherrySum !== this.getCherrySum()) {
        this.pristainValue = false;
        return false;
      }

      return true;
    }
  }, {
    key: "isUpdateObservableField",
    value: function isUpdateObservableField(props) {
      var _props$data = props.data,
          data = _props$data === void 0 ? undefined : _props$data;

      if (String(props.getDataByID("changeableFields.".concat(props.id))) === 'true') {
        return true;
      }

      if (!data.changeableFields) {
        return true;
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(props) {
      var calculatedValue = props.data.value; //check of the obeservables

      if (!this.isUpdateObservableField(props)) {
        return;
      }

      if (props.data && props.data.formulaType) {
        var formulaType = props.getDataByID("changeableFields.".concat(props.id, ".formulaType")) || props.data.formulaType;
        calculatedValue = _utils_analyze_returns_formulae__WEBPACK_IMPORTED_MODULE_10__[/* formulas */ "a"][formulaType](props);
      } //make sure value doesnt get number 0
      //prevent from infinite loop


      if (calculatedValue === 0) {
        calculatedValue = '0';
      }

      if ((calculatedValue || props.data.value) && props.data.value !== calculatedValue && this.canAutoUpdate) {
        this.pristainState = this.updatePristainState();
        !this.pristainState && props.storeValue(props.id, calculatedValue);

        if (props.getDataByID("changeableFields.".concat(props.id)) === true) {
          props.storeValue("changeableFields.".concat(props.id), false);
        }
      }

      if (this.suggestionSelected) {
        this.canAutoUpdate = true;
        this.suggestionSelected = false;
      }
    }
  }, {
    key: "renderWriteValue",
    value: function renderWriteValue(value) {
      var componentArray = [_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: classnames__WEBPACK_IMPORTED_MODULE_9___default()("schema__text__input__container", this.props.data.className)
      }, "inputTextContainer", this.props.typePostfix && _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("span", {
        className: "type-postfix"
      }, void 0, this.props.typePostfix), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("input", {
        id: this.state.uniqueId,
        ref: "input",
        placeholder: this.getPlaceHolder(),
        name: this.props.id,
        value: value,
        key: "input",
        type: "number",
        onBlur: this.onInputBlur,
        "data-tealium-narrative": this.props.label,
        onChange: this.onChange.bind(this)
      }), this.renderTooltip())];

      if (this.props.error) {
        componentArray.push(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
          className: "schema__error"
        }, "error", this.renderErrorMessage(this.props.error)));
      }

      return componentArray;
    }
  }, {
    key: "onChange",
    value: function onChange() {
      var _this3 = this;

      this.canAutoUpdate = false;
      this.pristainValue = false;

      if (this.props.data.changeableFields) {
        this.props.data.changeableFields && this.props.data.changeableFields.map(function (field, key) {
          var value = field.fieldValue || field;
          var formulaType = field.formulaType || '';

          _this3.props.storeValue("changeableFields.".concat(value), true);

          if (formulaType) {
            _this3.props.storeValue("changeableFields.".concat(value, ".formulaType"), formulaType);
          }
        });
      }

      this.props.storeValue(this.props.id, this.refs.input.value);
    }
  }, {
    key: "onInputBlur",
    value: function onInputBlur() {
      this.canAutoUpdate = true;
    }
  }]);

  return CustomFormulaCalculatorText;
}(_custom_formula_calculator__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"]);

CustomFormulaCalculatorText.defaultProps = {
  classNames: ['schema__text'],
  isDisplayTopLabel: true
};


/***/ }),
/* 179 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomFormulaCalculator; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _text_text_readonly__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(172);
/* harmony import */ var _utils_analyze_returns_formulae__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(180);









var CustomFormulaCalculator =
/*#__PURE__*/
function (_TextReadComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(CustomFormulaCalculator, _TextReadComponent);

  function CustomFormulaCalculator(props) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, CustomFormulaCalculator);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(CustomFormulaCalculator).call(this, props));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(CustomFormulaCalculator, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(props) {
      if (!_utils_analyze_returns_formulae__WEBPACK_IMPORTED_MODULE_7__[/* formulas */ "a"][props.data.formulaType]) {
        return;
      }

      var calculatedValue = _utils_analyze_returns_formulae__WEBPACK_IMPORTED_MODULE_7__[/* formulas */ "a"][props.data.formulaType](props); //make sure value doesnt get number 0
      //prevent from infinite loop

      if (calculatedValue === 0) {
        calculatedValue = '0';
      }

      if ((calculatedValue || props.data.value) && props.data.value !== calculatedValue) {
        props.storeValue(props.id, calculatedValue);
      }
    }
  }]);

  return CustomFormulaCalculator;
}(_text_text_readonly__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"]);



/***/ }),
/* 180 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return formulas; });
/* unused harmony export cherryPickIdGenerator */
/* unused harmony export conditionalDecimalConvert */
//the YEARS_TO_CLOSE will change in future to a dynamic value depending on the number of years we calculate the IRR for.
var YEARS_TO_CLOSE = 10; //Data used for IRR calculation

var MAX_ITER = 20;
var EXCEL_EPSILON = 0.0000001;
var PROPERTY_MANAGEMENT_COST_PERCENTAGE = 8;
var DEFAULT_RENT_INCREMENT = 1;
var DEFAULT_APPRECIATION = 2;
var DEFAULT_LOAN_DURATION = 30;
var DEFAULT_LOAN_INTEREST_RATE = 5;
var EXPENSE_RENT_RATIO_THRESHOLD = 0.3;
var EXPENSE_RENT_RATIO_DECREMENT_FACTOR = 0.0033;
var MAINTAINENCE_RENT_FACTOR = 0.10;
var formulas = {
  caprate: function caprate(_ref) {
    var cherrypickids = _ref.cherrypickids,
        getDataByID = _ref.getDataByID,
        _ref$cloneKey = _ref.cloneKey,
        cloneKey = _ref$cloneKey === void 0 ? '' : _ref$cloneKey;
    var netOperatingIncome = Number(cherrypickids['netOperatingIncome'] && getDataByID(cherryPickIdGenerator(cherrypickids['netOperatingIncome'], cloneKey)) || ''),
        salePrice = Number(cherrypickids['salePrice'] && getDataByID(cherryPickIdGenerator(cherrypickids['salePrice'], cloneKey)) || ''),
        improvementCost = Number(cherrypickids['initialImprovementCost'] && getDataByID(cherryPickIdGenerator(cherrypickids['initialImprovementCost'], cloneKey)) || ''),
        closingCost = Number(cherrypickids['closingCost'] && getDataByID(cherryPickIdGenerator(cherrypickids['closingCost'], cloneKey)) || ''),
        annualFreeCashFlow = Number(cherrypickids['annualFreeCashFlow'] && getDataByID(cherryPickIdGenerator(cherrypickids['annualFreeCashFlow'], cloneKey)) || ''),
        downPaymentPercentage = Number(cherrypickids['downPaymentPercentage'] && getDataByID(cherryPickIdGenerator(cherrypickids['downPaymentPercentage'], cloneKey)) || ''),
        loanInterestRate = Number(cherrypickids['loanInterestRate'] && getDataByID(cherryPickIdGenerator(cherrypickids['loanInterestRate'], cloneKey)) || ''),
        loanDuration = Number(cherrypickids['loanDuration'] && getDataByID(cherryPickIdGenerator(cherrypickids['loanDuration'], cloneKey)) || ''),
        initialImprovementCost = improvementCost + closingCost,
        initialInvestmentWithoutMortgage = salePrice + initialImprovementCost; // downPaymentPercentage is  100%
    // then calculate for caprate without mortgage
    // downPaymentPercentage < 100
    // then calculate for caprate with mortgage

    if (downPaymentPercentage === 100) {
      if (netOperatingIncome && initialInvestmentWithoutMortgage) {
        return conditionalDecimalConvert(netOperatingIncome * 100 / initialInvestmentWithoutMortgage);
      }
    }

    if (downPaymentPercentage && downPaymentPercentage < 100) {
      if (!loanInterestRate || !loanDuration) {
        return '';
      }

      var downPaymentCost = salePrice * (downPaymentPercentage / 100);

      if (annualFreeCashFlow && (downPaymentCost || initialImprovementCost)) {
        return conditionalDecimalConvert(annualFreeCashFlow / (downPaymentCost + initialImprovementCost) * 100);
      }
    }

    return '';
  },
  cashOnCashReturnPercentage: function cashOnCashReturnPercentage(_ref2) {
    var cherrypickids = _ref2.cherrypickids,
        getDataByID = _ref2.getDataByID,
        _ref2$cloneKey = _ref2.cloneKey,
        cloneKey = _ref2$cloneKey === void 0 ? '' : _ref2$cloneKey;
    var annualFreeCashFlow = Number(cherrypickids['annualFreeCashFlow'] && getDataByID(cherryPickIdGenerator(cherrypickids['annualFreeCashFlow'], cloneKey)) || ''),
        downPaymentPercentage = Number(cherrypickids['downPaymentPercentage'] && getDataByID(cherryPickIdGenerator(cherrypickids['downPaymentPercentage'], cloneKey)) || ''),
        salePrice = Number(cherrypickids['salePrice'] && getDataByID(cherryPickIdGenerator(cherrypickids['salePrice'], cloneKey)) || ''),
        improvementCost = Number(cherrypickids['initialImprovementCost'] && getDataByID(cherryPickIdGenerator(cherrypickids['initialImprovementCost'], cloneKey)) || ''),
        closingCost = Number(cherrypickids['closingCost'] && getDataByID(cherryPickIdGenerator(cherrypickids['closingCost'], cloneKey)) || ''),
        initialImprovementCost = improvementCost + closingCost,
        downPaymentCost = salePrice * (downPaymentPercentage / 100);

    if (annualFreeCashFlow && (downPaymentCost || initialImprovementCost)) {
      return conditionalDecimalConvert(annualFreeCashFlow / (downPaymentCost + initialImprovementCost) * 100);
    }

    return '';
  },
  netOperatingIncome: function netOperatingIncome(_ref3) {
    var cherrypickids = _ref3.cherrypickids,
        getDataByID = _ref3.getDataByID,
        _ref3$cloneKey = _ref3.cloneKey,
        cloneKey = _ref3$cloneKey === void 0 ? '' : _ref3$cloneKey;
    var grossRentRevenue = Number(cherrypickids['grossRentRevenue'] && getDataByID(cherryPickIdGenerator(cherrypickids['grossRentRevenue'], cloneKey)) || ''),
        totalExpenses = Number(cherrypickids['totalExpenses'] && getDataByID(cherryPickIdGenerator(cherrypickids['totalExpenses'], cloneKey)) || '');

    if (grossRentRevenue) {
      return conditionalDecimalConvert(grossRentRevenue - totalExpenses, 0);
    }

    return 0;
  },
  allExpensesNetOperatingIncome: function allExpensesNetOperatingIncome(_ref4) {
    var cherrypickids = _ref4.cherrypickids,
        getDataByID = _ref4.getDataByID,
        _ref4$cloneKey = _ref4.cloneKey,
        cloneKey = _ref4$cloneKey === void 0 ? '' : _ref4$cloneKey;
    var grossRentRevenue = Number(cherrypickids['grossRentRevenue'] && getDataByID(cherryPickIdGenerator(cherrypickids['grossRentRevenue'], cloneKey)) || ''),
        totalExpenses = this.totalExpenses({
      cherrypickids: cherrypickids,
      getDataByID: getDataByID,
      cloneKey: cloneKey
    });

    if (grossRentRevenue) {
      return conditionalDecimalConvert(grossRentRevenue - totalExpenses, 0);
    }

    return 0;
  },
  totalExpenses: function totalExpenses(_ref5) {
    var cherrypickids = _ref5.cherrypickids,
        getDataByID = _ref5.getDataByID,
        _ref5$cloneKey = _ref5.cloneKey,
        cloneKey = _ref5$cloneKey === void 0 ? '' : _ref5$cloneKey;
    var propertyInsurance = Number(cherrypickids['propertyInsurance'] && getDataByID(cherryPickIdGenerator(cherrypickids['propertyInsurance'], cloneKey)) || ''),
        propertyTaxes = Number(cherrypickids['propertyTaxes'] && getDataByID(cherryPickIdGenerator(cherrypickids['propertyTaxes'], cloneKey)) || ''),
        ownerAssociationFee = Number(cherrypickids['ownerAssociationFee'] && getDataByID(cherryPickIdGenerator(cherrypickids['ownerAssociationFee'], cloneKey)) || ''),
        vacancyLosses = Number(cherrypickids['vacancyLosses'] && getDataByID(cherryPickIdGenerator(cherrypickids['vacancyLosses'], cloneKey)) || ''),
        managementFees = Number(cherrypickids['managementFees'] && getDataByID(cherryPickIdGenerator(cherrypickids['managementFees'], cloneKey)) || ''),
        leasingFees = Number(cherrypickids['leasingFees'] && getDataByID(cherryPickIdGenerator(cherrypickids['leasingFees'], cloneKey)) || ''),
        propertyMaintenance = Number(cherrypickids['propertyMaintenance'] && getDataByID(cherryPickIdGenerator(cherrypickids['propertyMaintenance'], cloneKey)) || '');
    return propertyInsurance + propertyTaxes + ownerAssociationFee + vacancyLosses + managementFees + leasingFees + propertyMaintenance;
  },
  initialInvestment: function initialInvestment(_ref6) {
    var cherrypickids = _ref6.cherrypickids,
        getDataByID = _ref6.getDataByID,
        _ref6$cloneKey = _ref6.cloneKey,
        cloneKey = _ref6$cloneKey === void 0 ? '' : _ref6$cloneKey;
    var downPaymentPercentage = Number(cherrypickids['downPaymentPercentage'] && getDataByID(cherryPickIdGenerator(cherrypickids['downPaymentPercentage'], cloneKey)) || ''),
        salePrice = Number(cherrypickids['salePrice'] && getDataByID(cherryPickIdGenerator(cherrypickids['salePrice'], cloneKey)) || ''),
        improvementCost = Number(cherrypickids['initialImprovementCost'] && getDataByID(cherryPickIdGenerator(cherrypickids['initialImprovementCost'], cloneKey)) || ''),
        closingCost = Number(cherrypickids['closingCost'] && getDataByID(cherryPickIdGenerator(cherrypickids['closingCost'], cloneKey)) || ''),
        initialImprovementCost = improvementCost + closingCost;
    return conditionalDecimalConvert(salePrice * (downPaymentPercentage / 100) + initialImprovementCost);
  },
  initialInvestmentWithoutMortgage: function initialInvestmentWithoutMortgage(_ref7) {
    var cherrypickids = _ref7.cherrypickids,
        getDataByID = _ref7.getDataByID,
        _ref7$cloneKey = _ref7.cloneKey,
        cloneKey = _ref7$cloneKey === void 0 ? '' : _ref7$cloneKey;
    var salePrice = Number(cherrypickids['salePrice'] && getDataByID(cherryPickIdGenerator(cherrypickids['salePrice'], cloneKey)) || ''),
        improvementCost = Number(cherrypickids['initialImprovementCost'] && getDataByID(cherryPickIdGenerator(cherrypickids['initialImprovementCost'], cloneKey)) || ''),
        closingCost = Number(cherrypickids['closingCost'] && getDataByID(cherryPickIdGenerator(cherrypickids['closingCost'], cloneKey)) || ''),
        initialImprovementCost = improvementCost + closingCost;
    return conditionalDecimalConvert(salePrice + initialImprovementCost);
  },
  annualFreeCashFlow: function annualFreeCashFlow(_ref8) {
    var cherrypickids = _ref8.cherrypickids,
        getDataByID = _ref8.getDataByID,
        _ref8$cloneKey = _ref8.cloneKey,
        cloneKey = _ref8$cloneKey === void 0 ? '' : _ref8$cloneKey;
    var netOperatingIncome = Number(cherrypickids['netOperatingIncome'] && getDataByID(cherryPickIdGenerator(cherrypickids['netOperatingIncome'], cloneKey)) || ''),
        emiCost = Number(cherrypickids['emiCost'] && getDataByID(cherryPickIdGenerator(cherrypickids['emiCost'], cloneKey)) || '');
    return conditionalDecimalConvert(netOperatingIncome - emiCost, 0);
  },
  initialInvestmentWithMortgage: function initialInvestmentWithMortgage(_ref9) {
    var cherrypickids = _ref9.cherrypickids,
        getDataByID = _ref9.getDataByID,
        _ref9$cloneKey = _ref9.cloneKey,
        cloneKey = _ref9$cloneKey === void 0 ? '' : _ref9$cloneKey;
    var downPaymentPercentage = Number(cherrypickids['downPaymentPercentage'] && getDataByID(cherryPickIdGenerator(cherrypickids['downPaymentPercentage'], cloneKey)) || ''),
        salePrice = Number(cherrypickids['salePrice'] && getDataByID(cherryPickIdGenerator(cherrypickids['salePrice'], cloneKey)) || ''),
        improvementCost = Number(cherrypickids['initialImprovementCost'] && getDataByID(cherryPickIdGenerator(cherrypickids['initialImprovementCost'], cloneKey)) || ''),
        closingCost = Number(cherrypickids['closingCost'] && getDataByID(cherryPickIdGenerator(cherrypickids['closingCost'], cloneKey)) || ''),
        initialImprovementCost = improvementCost + closingCost;
    return conditionalDecimalConvert(salePrice * (downPaymentPercentage / 100) + initialImprovementCost);
  },
  downPaymentPercentage: function downPaymentPercentage(_ref10) {
    var cherrypickids = _ref10.cherrypickids,
        getDataByID = _ref10.getDataByID,
        _ref10$cloneKey = _ref10.cloneKey,
        cloneKey = _ref10$cloneKey === void 0 ? '' : _ref10$cloneKey,
        data = _ref10.data,
        storeValue = _ref10.storeValue;
    var downPaymentCost = Number(cherrypickids['downPaymentCost'] && getDataByID(cherryPickIdGenerator(cherrypickids['downPaymentCost'], cloneKey)) || ''),
        salePrice = Number(cherrypickids['salePrice'] && getDataByID(cherryPickIdGenerator(cherrypickids['salePrice'], cloneKey)) || '');
    var percentage = '';

    if (downPaymentCost && salePrice) {
      percentage = conditionalDecimalConvert(downPaymentCost / salePrice * 100);

      if (percentage >= 100) {
        percentage = 100;
      }
    } else if (salePrice) {
      percentage = 100;
    }

    return percentage;
  },
  downPaymentCost: function downPaymentCost(_ref11) {
    var cherrypickids = _ref11.cherrypickids,
        getDataByID = _ref11.getDataByID,
        _ref11$cloneKey = _ref11.cloneKey,
        cloneKey = _ref11$cloneKey === void 0 ? '' : _ref11$cloneKey;
    var salePrice = Number(cherrypickids['salePrice'] && getDataByID(cherryPickIdGenerator(cherrypickids['salePrice'], cloneKey)) || ''),
        downPaymentPercentage = Number(cherrypickids['downPaymentPercentage'] && getDataByID(cherryPickIdGenerator(cherrypickids['downPaymentPercentage'], cloneKey)) || '');
    var calculatedDownPayment = '';

    if (salePrice && downPaymentPercentage) {
      if (downPaymentPercentage === 100) {
        return salePrice;
      } else {
        calculatedDownPayment = conditionalDecimalConvert(salePrice * (downPaymentPercentage / 100));
      }
    }

    if (Number(calculatedDownPayment) >= salePrice) {
      return salePrice;
    } else {
      return calculatedDownPayment;
    }
  },
  emiCost: function emiCost(_ref12) {
    var cherrypickids = _ref12.cherrypickids,
        getDataByID = _ref12.getDataByID,
        _ref12$cloneKey = _ref12.cloneKey,
        cloneKey = _ref12$cloneKey === void 0 ? '' : _ref12$cloneKey;
    var salePrice = Number(cherrypickids['salePrice'] && getDataByID(cherryPickIdGenerator(cherrypickids['salePrice'], cloneKey)) || ''),
        loanInterestRate = Number(cherrypickids['loanInterestRate'] && getDataByID(cherryPickIdGenerator(cherrypickids['loanInterestRate'], cloneKey)) || ''),
        purchaseType = cherrypickids['purchaseType'] && getDataByID(cherryPickIdGenerator(cherrypickids['purchaseType'], cloneKey)) || '',
        loanDuration = cherrypickids['loanDuration'] && getDataByID(cherryPickIdGenerator(cherrypickids['loanDuration'], cloneKey)) || '',
        downPaymentPercentage = Number(cherrypickids['downPaymentPercentage'] && getDataByID(cherryPickIdGenerator(cherrypickids['downPaymentPercentage'], cloneKey)) || '');

    if (downPaymentPercentage === 100 || !loanDuration || !loanInterestRate) {
      return 0;
    }

    var principalAmount = salePrice - salePrice * (downPaymentPercentage / 100);
    var interestRatePerMonth = loanInterestRate / (12 * 100);
    var emi = principalAmount ? principalAmount * interestRatePerMonth * Math.pow(1 + interestRatePerMonth, loanDuration * 12) / (Math.pow(1 + interestRatePerMonth, loanDuration * 12) - 1) : 0;
    return conditionalDecimalConvert(emi * 12, 0);
  },
  calculateIRR: function calculateIRR(_ref13) {
    var cherrypickids = _ref13.cherrypickids,
        getDataByID = _ref13.getDataByID,
        _ref13$cloneKey = _ref13.cloneKey,
        cloneKey = _ref13$cloneKey === void 0 ? '' : _ref13$cloneKey;
    var yearsToClose = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
    var salePrice = Number(cherrypickids['salePrice'] && getDataByID(cherryPickIdGenerator(cherrypickids['salePrice'], cloneKey)) || ''),
        propertyAnnualAppreciationPercentage = Number(cherrypickids['propertyAnnualAppreciationPercentage'] && getDataByID(cherryPickIdGenerator(cherrypickids['propertyAnnualAppreciationPercentage'], cloneKey)) || ''),
        rentIncrementPercentage = Number(cherrypickids['rentIncrementPercentage'] && getDataByID(cherryPickIdGenerator(cherrypickids['rentIncrementPercentage'], cloneKey)) || ''),
        netOperatingIncome = Number(cherrypickids['netOperatingIncome'] && getDataByID(cherryPickIdGenerator(cherrypickids['netOperatingIncome'], cloneKey)) || ''),
        annualFreeCashFlow = Number(cherrypickids['annualFreeCashFlow'] && getDataByID(cherryPickIdGenerator(cherrypickids['annualFreeCashFlow'], cloneKey)) || ''),
        downPaymentPercentage = Number(cherrypickids['downPaymentPercentage'] && getDataByID(cherryPickIdGenerator(cherrypickids['downPaymentPercentage'], cloneKey)) || ''),
        emiCost = Number(cherrypickids['emiCost'] && getDataByID(cherryPickIdGenerator(cherrypickids['emiCost'], cloneKey)) || ''),
        loanInterestRate = Number(cherrypickids['loanInterestRate'] && getDataByID(cherryPickIdGenerator(cherrypickids['loanInterestRate'], cloneKey)) || ''),
        grossRentRevenue = Number(cherrypickids['grossRentRevenue'] && getDataByID(cherryPickIdGenerator(cherrypickids['grossRentRevenue'], cloneKey)) || ''),
        initialInvestment = this.initialInvestment({
      cherrypickids: cherrypickids,
      getDataByID: getDataByID
    }),
        cashFlowByDownPayment = downPaymentPercentage === 100 ? netOperatingIncome : annualFreeCashFlow,
        netProceedsFromSale = getNetProceedsFromSale(salePrice, emiCost, yearsToClose, propertyAnnualAppreciationPercentage, downPaymentPercentage, loanInterestRate),
        //cumulativeAppreciation = getCumulativeAppreciation(salePrice,emiCost,yearsToClose,propertyAnnualAppreciationPercentage,downPaymentPercentage,loanInterestRate),
    cashFlows = getCashFlows(yearsToClose, initialInvestment, cashFlowByDownPayment, netProceedsFromSale, rentIncrementPercentage, grossRentRevenue, emiCost, cherrypickids, getDataByID, cloneKey);
    return conditionalDecimalConvert(calculateIRRPercent(cashFlows));
  },
  internalRateOfReturn: function internalRateOfReturn(props) {
    var yearsToClose = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : YEARS_TO_CLOSE;
    return this.calculateIRR(props, yearsToClose);
  },
  internalRateOfReturnSplitted: function internalRateOfReturnSplitted(_ref14) {
    var cherrypickids = _ref14.cherrypickids,
        getDataByID = _ref14.getDataByID,
        _ref14$cloneKey = _ref14.cloneKey,
        cloneKey = _ref14$cloneKey === void 0 ? '' : _ref14$cloneKey;
    var yearsToClose = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : YEARS_TO_CLOSE;
    var salePrice = Number(cherrypickids['salePrice'] && getDataByID(cherryPickIdGenerator(cherrypickids['salePrice'], cloneKey)) || ''),
        propertyAnnualAppreciationPercentage = Number(cherrypickids['propertyAnnualAppreciationPercentage'] && getDataByID(cherryPickIdGenerator(cherrypickids['propertyAnnualAppreciationPercentage'], cloneKey)) || DEFAULT_APPRECIATION),
        rentIncrementPercentage = Number(cherrypickids['rentIncrementPercentage'] && getDataByID(cherryPickIdGenerator(cherrypickids['rentIncrementPercentage'], cloneKey)) || DEFAULT_RENT_INCREMENT),
        netOperatingIncome = Number(cherrypickids['netOperatingIncome'] && getDataByID(cherryPickIdGenerator(cherrypickids['netOperatingIncome'], cloneKey)) || ''),
        annualFreeCashFlow = Number(cherrypickids['annualFreeCashFlow'] && getDataByID(cherryPickIdGenerator(cherrypickids['annualFreeCashFlow'], cloneKey)) || ''),
        downPaymentPercentage = Number(cherrypickids['downPaymentPercentage'] && getDataByID(cherryPickIdGenerator(cherrypickids['downPaymentPercentage'], cloneKey)) || ''),
        emiCost = Number(cherrypickids['emiCost'] && getDataByID(cherryPickIdGenerator(cherrypickids['emiCost'], cloneKey)) || '') / 12,
        loanInterestRate = Number(cherrypickids['loanInterestRate'] && getDataByID(cherryPickIdGenerator(cherrypickids['loanInterestRate'], cloneKey)) || ''),
        grossRentRevenue = Number(cherrypickids['grossRentRevenue'] && getDataByID(cherryPickIdGenerator(cherrypickids['grossRentRevenue'], cloneKey)) || ''),
        principalAmount = salePrice - salePrice * (downPaymentPercentage / 100),
        cashFlowByDownPayment = downPaymentPercentage === 100 ? netOperatingIncome : annualFreeCashFlow,
        cumulativeAppreciation = getCumulativeAppreciation(salePrice, yearsToClose, propertyAnnualAppreciationPercentage),
        cumulativeCashFlow = getCumulativeCashFlow(grossRentRevenue, yearsToClose, cashFlowByDownPayment, rentIncrementPercentage, emiCost * 12, cherrypickids, getDataByID, cloneKey),
        principalPaidAmount = getPaidPrincipalAmount(principalAmount, emiCost, loanInterestRate, yearsToClose),
        rentIncrement = getCumulativeRent(grossRentRevenue, rentIncrementPercentage, yearsToClose),
        cashFlowGrowth = getCashFlowGrowth(grossRentRevenue, yearsToClose, cashFlowByDownPayment, rentIncrementPercentage, emiCost * 12, cherrypickids, getDataByID, cloneKey);
    return {
      cumulativeAppreciation: cumulativeAppreciation,
      cumulativeCashFlow: cumulativeCashFlow,
      principalPaidAmount: principalPaidAmount,
      rentIncrement: rentIncrement,
      cashFlowGrowth: cashFlowGrowth
    };
  },
  vacancyLosses: function vacancyLosses(_ref15) {
    var cherrypickids = _ref15.cherrypickids,
        getDataByID = _ref15.getDataByID,
        _ref15$cloneKey = _ref15.cloneKey,
        cloneKey = _ref15$cloneKey === void 0 ? '' : _ref15$cloneKey;
    var grossRentRevenue = Number(cherrypickids['grossRentRevenue'] && getDataByID(cherryPickIdGenerator(cherrypickids['grossRentRevenue'], cloneKey)) || '');

    if (grossRentRevenue) {
      return conditionalDecimalConvert(grossRentRevenue / 24, 0);
    }

    return '';
  },
  vacancyLossesPercentage: function vacancyLossesPercentage(_ref16) {
    var cherrypickids = _ref16.cherrypickids,
        getDataByID = _ref16.getDataByID,
        _ref16$cloneKey = _ref16.cloneKey,
        cloneKey = _ref16$cloneKey === void 0 ? '' : _ref16$cloneKey;
    var grossRentRevenue = Number(cherrypickids['grossRentRevenue'] && getDataByID(cherryPickIdGenerator(cherrypickids['grossRentRevenue'], cloneKey)) || '');
    var vacancyLosses = this.vacancyLosses({
      cherrypickids: cherrypickids,
      getDataByID: getDataByID,
      cloneKey: cloneKey
    });
    var percentage = 0;

    if (vacancyLosses && grossRentRevenue) {
      percentage = conditionalDecimalConvert(vacancyLosses / grossRentRevenue * 100, 1);
    }

    if (percentage < 0) {
      return '';
    }

    return percentage;
  },
  propertyTaxes: function propertyTaxes(_ref17) {
    var cherrypickids = _ref17.cherrypickids,
        getDataByID = _ref17.getDataByID,
        _ref17$cloneKey = _ref17.cloneKey,
        cloneKey = _ref17$cloneKey === void 0 ? '' : _ref17$cloneKey;
    var salePrice = Number(cherrypickids['salePrice'] && getDataByID(cherryPickIdGenerator(cherrypickids['salePrice'], cloneKey)) || ''),
        propertyTaxRate = Number(cherrypickids['propertyTaxRate'] && getDataByID(cherryPickIdGenerator(cherrypickids['propertyTaxRate'], cloneKey)) || '');

    if (salePrice && propertyTaxRate) {
      return conditionalDecimalConvert(salePrice * (propertyTaxRate / 100), 0);
    }

    return '';
  },
  managementAndLeasingFees: function managementAndLeasingFees(_ref18) {
    var cherrypickids = _ref18.cherrypickids,
        getDataByID = _ref18.getDataByID,
        _ref18$cloneKey = _ref18.cloneKey,
        cloneKey = _ref18$cloneKey === void 0 ? '' : _ref18$cloneKey;
    var grossRentRevenue = Number(cherrypickids['grossRentRevenue'] && getDataByID(cherryPickIdGenerator(cherrypickids['grossRentRevenue'], cloneKey)) || ''),
        propertyManagementCost = grossRentRevenue * (PROPERTY_MANAGEMENT_COST_PERCENTAGE / 100),
        leasingFees = grossRentRevenue / 48;
    return conditionalDecimalConvert(propertyManagementCost + leasingFees, 1);
  },
  managementFee: function managementFee(_ref19) {
    var cherrypickids = _ref19.cherrypickids,
        getDataByID = _ref19.getDataByID,
        _ref19$cloneKey = _ref19.cloneKey,
        cloneKey = _ref19$cloneKey === void 0 ? '' : _ref19$cloneKey;
    var grossRentRevenue = Number(cherrypickids['grossRentRevenue'] && getDataByID(cherryPickIdGenerator(cherrypickids['grossRentRevenue'], cloneKey)) || ''),
        propertyManagementCost = grossRentRevenue * 11.5 / 12 * (PROPERTY_MANAGEMENT_COST_PERCENTAGE / 100);
    return conditionalDecimalConvert(propertyManagementCost, 0);
  },
  managementFeePercentage: function managementFeePercentage(_ref20) {
    var cherrypickids = _ref20.cherrypickids,
        getDataByID = _ref20.getDataByID,
        _ref20$cloneKey = _ref20.cloneKey,
        cloneKey = _ref20$cloneKey === void 0 ? '' : _ref20$cloneKey;
    var grossRentRevenue = Number(cherrypickids['grossRentRevenue'] && getDataByID(cherryPickIdGenerator(cherrypickids['grossRentRevenue'], cloneKey)) || '');
    var managementFee = this.managementFee({
      cherrypickids: cherrypickids,
      getDataByID: getDataByID,
      cloneKey: cloneKey
    });
    var percentage = 0;

    if (managementFee && grossRentRevenue) {
      percentage = conditionalDecimalConvert(managementFee / grossRentRevenue * 100, 1);
    }

    if (percentage < 0) {
      return '';
    }

    return percentage;
  },
  leasingFee: function leasingFee(_ref21) {
    var cherrypickids = _ref21.cherrypickids,
        getDataByID = _ref21.getDataByID,
        _ref21$cloneKey = _ref21.cloneKey,
        cloneKey = _ref21$cloneKey === void 0 ? '' : _ref21$cloneKey;
    var grossRentRevenue = Number(cherrypickids['grossRentRevenue'] && getDataByID(cherryPickIdGenerator(cherrypickids['grossRentRevenue'], cloneKey)) || ''),
        leasingFees = grossRentRevenue / (12 * 2 * 100 / 50);
    return conditionalDecimalConvert(leasingFees, 0);
  },
  leasingFeePercentage: function leasingFeePercentage(_ref22) {
    var cherrypickids = _ref22.cherrypickids,
        getDataByID = _ref22.getDataByID,
        _ref22$cloneKey = _ref22.cloneKey,
        cloneKey = _ref22$cloneKey === void 0 ? '' : _ref22$cloneKey;
    var grossRentRevenue = Number(cherrypickids['grossRentRevenue'] && getDataByID(cherryPickIdGenerator(cherrypickids['grossRentRevenue'], cloneKey)) || '');
    var leasingFee = this.leasingFee({
      cherrypickids: cherrypickids,
      getDataByID: getDataByID,
      cloneKey: cloneKey
    });
    var percentage = 0;

    if (leasingFee && grossRentRevenue) {
      percentage = conditionalDecimalConvert(leasingFee / grossRentRevenue * 100, 1);
    }

    if (percentage < 0) {
      return '';
    }

    return percentage;
  },
  maintenanceFee: function maintenanceFee(_ref23) {
    var cherrypickids = _ref23.cherrypickids,
        getDataByID = _ref23.getDataByID,
        _ref23$cloneKey = _ref23.cloneKey,
        cloneKey = _ref23$cloneKey === void 0 ? '' : _ref23$cloneKey;
    var grossRentRevenue = Number(cherrypickids['grossRentRevenue'] && getDataByID(cherryPickIdGenerator(cherrypickids['grossRentRevenue'], cloneKey)) || ''),
        maintenanceFee = grossRentRevenue * MAINTAINENCE_RENT_FACTOR;
    return conditionalDecimalConvert(maintenanceFee, 0);
  },
  maintenanceFeePercentage: function maintenanceFeePercentage(_ref24) {
    var cherrypickids = _ref24.cherrypickids,
        getDataByID = _ref24.getDataByID,
        _ref24$cloneKey = _ref24.cloneKey,
        cloneKey = _ref24$cloneKey === void 0 ? '' : _ref24$cloneKey;
    var grossRentRevenue = Number(cherrypickids['grossRentRevenue'] && getDataByID(cherryPickIdGenerator(cherrypickids['grossRentRevenue'], cloneKey)) || '');
    var maintenanceFee = this.maintenanceFee({
      cherrypickids: cherrypickids,
      getDataByID: getDataByID,
      cloneKey: cloneKey
    });
    var percentage = 0;

    if (maintenanceFee && grossRentRevenue) {
      percentage = conditionalDecimalConvert(maintenanceFee / grossRentRevenue * 100, 1);
    }

    if (percentage < 0) {
      return '';
    }

    return percentage;
  },
  expenseCost: function expenseCost(_ref25) {
    var cherrypickids = _ref25.cherrypickids,
        getDataByID = _ref25.getDataByID,
        _ref25$cloneKey = _ref25.cloneKey,
        cloneKey = _ref25$cloneKey === void 0 ? '' : _ref25$cloneKey;
    var expenseFactor = Number(cherrypickids['expenseFactor'] && getDataByID(cherryPickIdGenerator(cherrypickids['expenseFactor'], cloneKey)) || '');
    var expensePercentage = Number(cherrypickids['expensePercentage'] && getDataByID(cherryPickIdGenerator(cherrypickids['expensePercentage'], cloneKey)) || '');
    var salePrice = Number(cherrypickids['salePrice'] && getDataByID(cherryPickIdGenerator(cherrypickids['salePrice'], cloneKey)) || ''),
        downPaymentPercentage = Number(cherrypickids['downPaymentPercentage'] && getDataByID(cherryPickIdGenerator(cherrypickids['downPaymentPercentage'], cloneKey)) || '');
    var calculatedExpense = '';

    if (expenseFactor && expensePercentage) {
      calculatedExpense = conditionalDecimalConvert(expenseFactor * (expensePercentage / 100), 0);
    }

    return calculatedExpense;
  },
  expensePercentage: function expensePercentage(_ref26) {
    var cherrypickids = _ref26.cherrypickids,
        getDataByID = _ref26.getDataByID,
        _ref26$cloneKey = _ref26.cloneKey,
        cloneKey = _ref26$cloneKey === void 0 ? '' : _ref26$cloneKey;
    var expenseFactor = Number(cherrypickids['expenseFactor'] && getDataByID(cherryPickIdGenerator(cherrypickids['expenseFactor'], cloneKey)) || '');
    var expenseCost = Number(cherrypickids['expenseCost'] && getDataByID(cherryPickIdGenerator(cherrypickids['expenseCost'], cloneKey)) || '');
    var percentage = 0;

    if (expenseCost && expenseFactor) {
      percentage = conditionalDecimalConvert(expenseCost / expenseFactor * 100, 1);
    }

    if (percentage < 0) {
      return '';
    }

    return percentage;
  },
  capRateGrowth: function capRateGrowth(_ref27, yearsToClose) {
    var cherrypickids = _ref27.cherrypickids,
        getDataByID = _ref27.getDataByID,
        _ref27$cloneKey = _ref27.cloneKey,
        cloneKey = _ref27$cloneKey === void 0 ? '' : _ref27$cloneKey;
    var grossRentRevenue = Number(cherrypickids['grossRentRevenue'] && getDataByID(cherryPickIdGenerator(cherrypickids['grossRentRevenue'], cloneKey)) || ''),
        rentIncrementPercentage = Number(cherrypickids['rentIncrementPercentage'] && getDataByID(cherryPickIdGenerator(cherrypickids['rentIncrementPercentage'], cloneKey)) || ''),
        salePrice = Number(cherrypickids['salePrice'] && getDataByID(cherryPickIdGenerator(cherrypickids['salePrice'], cloneKey)) || ''),
        propertyAnnualAppreciationPercentage = Number(cherrypickids['propertyAnnualAppreciationPercentage'] && getDataByID(cherryPickIdGenerator(cherrypickids['propertyAnnualAppreciationPercentage'], cloneKey)) || ''),
        netOperatingIncome = Number(cherrypickids['netOperatingIncome'] && getDataByID(cherryPickIdGenerator(cherrypickids['netOperatingIncome'], cloneKey)) || ''),
        emiCost = Number(cherrypickids['emiCost'] && getDataByID(cherryPickIdGenerator(cherrypickids['emiCost'], cloneKey)) || '') / 12,
        annualFreeCashFlow = Number(cherrypickids['annualFreeCashFlow'] && getDataByID(cherryPickIdGenerator(cherrypickids['annualFreeCashFlow'], cloneKey)) || ''),
        downPaymentPercentage = Number(cherrypickids['downPaymentPercentage'] && getDataByID(cherryPickIdGenerator(cherrypickids['downPaymentPercentage'], cloneKey)) || ''),
        improvementCost = Number(cherrypickids['initialImprovementCost'] && getDataByID(cherryPickIdGenerator(cherrypickids['initialImprovementCost'], cloneKey)) || ''),
        closingCost = Number(cherrypickids['closingCost'] && getDataByID(cherryPickIdGenerator(cherrypickids['closingCost'], cloneKey)) || ''),
        initialImprovementCost = improvementCost + closingCost,
        downPaymentCost = salePrice * (downPaymentPercentage / 100),
        projectedCashFlow = getCashFlowGrowth(grossRentRevenue, yearsToClose, annualFreeCashFlow, rentIncrementPercentage, emiCost * 12, cherrypickids, getDataByID, cloneKey),
        totalInvestment = downPaymentCost + initialImprovementCost;

    if (projectedCashFlow && totalInvestment) {
      // console.log(projectedCashFlow,totalInvestment);
      return conditionalDecimalConvert(projectedCashFlow / totalInvestment * 100, 2);
    }

    return '';
  },
  cashOnCashReturnGrowth: function cashOnCashReturnGrowth(_ref28, yearsToClose) {
    var cherrypickids = _ref28.cherrypickids,
        getDataByID = _ref28.getDataByID,
        _ref28$cloneKey = _ref28.cloneKey,
        cloneKey = _ref28$cloneKey === void 0 ? '' : _ref28$cloneKey;
    var grossRentRevenue = Number(cherrypickids['grossRentRevenue'] && getDataByID(cherryPickIdGenerator(cherrypickids['grossRentRevenue'], cloneKey)) || ''),
        rentIncrementPercentage = Number(cherrypickids['rentIncrementPercentage'] && getDataByID(cherryPickIdGenerator(cherrypickids['rentIncrementPercentage'], cloneKey)) || ''),
        salePrice = Number(cherrypickids['salePrice'] && getDataByID(cherryPickIdGenerator(cherrypickids['salePrice'], cloneKey)) || ''),
        propertyAnnualAppreciationPercentage = Number(cherrypickids['propertyAnnualAppreciationPercentage'] && getDataByID(cherryPickIdGenerator(cherrypickids['propertyAnnualAppreciationPercentage'], cloneKey)) || ''),
        improvementCost = Number(cherrypickids['initialImprovementCost'] && getDataByID(cherryPickIdGenerator(cherrypickids['initialImprovementCost'], cloneKey)) || ''),
        closingCost = Number(cherrypickids['closingCost'] && getDataByID(cherryPickIdGenerator(cherrypickids['closingCost'], cloneKey)) || ''),
        initialImprovementCost = improvementCost + closingCost,
        annualFreeCashFlow = Number(cherrypickids['annualFreeCashFlow'] && getDataByID(cherryPickIdGenerator(cherrypickids['annualFreeCashFlow'], cloneKey)) || ''),
        downPaymentPercentage = Number(cherrypickids['downPaymentPercentage'] && getDataByID(cherryPickIdGenerator(cherrypickids['downPaymentPercentage'], cloneKey)) || ''),
        emiCost = Number(cherrypickids['emiCost'] && getDataByID(cherryPickIdGenerator(cherrypickids['emiCost'], cloneKey)) || '') / 12,
        downPaymentCost = salePrice * (downPaymentPercentage / 100),
        projectedCashFlow = getCashFlowGrowth(grossRentRevenue, yearsToClose, annualFreeCashFlow, rentIncrementPercentage, emiCost * 12, cherrypickids, getDataByID, cloneKey),
        totalInvestment = downPaymentCost + initialImprovementCost;

    if (projectedCashFlow && totalInvestment) {
      return conditionalDecimalConvert(projectedCashFlow / totalInvestment * 100, 2);
    }

    return '';
  },
  grossRentRevenue: function grossRentRevenue(_ref29) {
    var cherrypickids = _ref29.cherrypickids,
        getDataByID = _ref29.getDataByID,
        _ref29$cloneKey = _ref29.cloneKey,
        cloneKey = _ref29$cloneKey === void 0 ? '' : _ref29$cloneKey;
    var monthlyRent = Number(cherrypickids['monthlyRent'] && getDataByID(cherryPickIdGenerator(cherrypickids['monthlyRent'], cloneKey)) || '');

    if (monthlyRent) {
      return conditionalDecimalConvert(monthlyRent * 12, 0);
    }

    return '';
  },
  monthlyRent: function monthlyRent(_ref30) {
    var cherrypickids = _ref30.cherrypickids,
        getDataByID = _ref30.getDataByID,
        _ref30$cloneKey = _ref30.cloneKey,
        cloneKey = _ref30$cloneKey === void 0 ? '' : _ref30$cloneKey;
    var grossRentRevenue = Number(cherrypickids['grossRentRevenue'] && getDataByID(cherryPickIdGenerator(cherrypickids['grossRentRevenue'], cloneKey)) || '');

    if (grossRentRevenue) {
      return conditionalDecimalConvert(grossRentRevenue / 12, 0);
    }

    return '';
  },
  updateLoanTenure: function updateLoanTenure(_ref31) {
    var cherrypickids = _ref31.cherrypickids,
        getDataByID = _ref31.getDataByID,
        _ref31$cloneKey = _ref31.cloneKey,
        cloneKey = _ref31$cloneKey === void 0 ? '' : _ref31$cloneKey,
        data = _ref31.data;
    var downPaymentPercentage = Number(cherrypickids['downPaymentPercentage'] && getDataByID(cherryPickIdGenerator(cherrypickids['downPaymentPercentage'], cloneKey)) || '');

    if (Number(downPaymentPercentage) < 100) {
      return data.value || DEFAULT_LOAN_DURATION;
    }

    return '';
  },
  updateLoanInterestRate: function updateLoanInterestRate(_ref32) {
    var cherrypickids = _ref32.cherrypickids,
        getDataByID = _ref32.getDataByID,
        _ref32$cloneKey = _ref32.cloneKey,
        cloneKey = _ref32$cloneKey === void 0 ? '' : _ref32$cloneKey,
        data = _ref32.data;
    var downPaymentPercentage = Number(cherrypickids['downPaymentPercentage'] && getDataByID(cherryPickIdGenerator(cherrypickids['downPaymentPercentage'], cloneKey)) || '');

    if (Number(downPaymentPercentage) < 100) {
      return data.value || DEFAULT_LOAN_INTEREST_RATE;
    }

    return '';
  }
};

function calculateIRRPercent(cashFlows) {
  var x = 0.1;
  var iter = 0;

  while (iter++ < MAX_ITER) {
    var x1 = 1.0 + x;
    var fx = 0.0;
    var dfx = 0.0;

    for (var i = 0; i < cashFlows.length; i++) {
      var v = cashFlows[i];
      var x1_i = Math.pow(x1, i);
      fx += v / x1_i;
      var x1_i1 = x1_i * x1;
      dfx += -i * v / x1_i1;
    }

    var new_x = x - fx / dfx;
    var epsilon = Math.abs(new_x - x);

    if (epsilon <= EXCEL_EPSILON) {
      if (x == 0.0 && Math.abs(new_x) <= EXCEL_EPSILON) {
        return 0.0;
      } else {
        return new_x * 100;
      }
    }

    x = new_x;
  }

  return x;
}

function getCumulativeAppreciation(salePrice, yearsToClose, propertyAnnualAppreciationPercentage) {
  var appreciation = 0;
  var cumAppreciation = 0;
  var futureSalePrice = salePrice;

  for (var i = 1; i <= yearsToClose; i++) {
    appreciation = futureSalePrice * (propertyAnnualAppreciationPercentage / 100);
    futureSalePrice += appreciation;
    cumAppreciation += appreciation;
  }

  return cumAppreciation;
}

function getCumulativeRent(grossRentRevenue, rentIncrementPercentage, yearsToClose) {
  return grossRentRevenue * Math.pow(1 + rentIncrementPercentage / 100, yearsToClose - 1);
}

function getCashFlowGrowth(grossRentRevenue, yearsToClose, cashFlow, rentIncrementPercentage, debtService, cherrypickids, getDataByID, cloneKey) {
  var projectedCashFlow = cashFlow,
      incrementedTotalExpenses = getTotalExpenses(cherrypickids, getDataByID, cloneKey);
  var expenseRentRatio = getExpenseRentRatio(cherrypickids, getDataByID, cloneKey);

  for (var i = 2; i <= yearsToClose; i++) {
    grossRentRevenue = grossRentRevenue * (1 + rentIncrementPercentage / 100);

    if (expenseRentRatio > EXPENSE_RENT_RATIO_THRESHOLD) {
      expenseRentRatio = expenseRentRatio - EXPENSE_RENT_RATIO_DECREMENT_FACTOR;
    }

    incrementedTotalExpenses = grossRentRevenue * expenseRentRatio;
    projectedCashFlow = grossRentRevenue - incrementedTotalExpenses - debtService;
  }

  return projectedCashFlow;
}

function getCumulativeCashFlow(grossRentRevenue, yearsToClose, cashFlow, rentIncrementPercentage, debtService, cherrypickids, getDataByID, cloneKey) {
  var projectedCashFlow = cashFlow,
      incrementedTotalExpenses = getTotalExpenses(cherrypickids, getDataByID, cloneKey);
  var expenseRentRatio = getExpenseRentRatio(cherrypickids, getDataByID, cloneKey);

  for (var i = 2; i <= yearsToClose; i++) {
    grossRentRevenue = grossRentRevenue * (1 + rentIncrementPercentage / 100);

    if (expenseRentRatio > EXPENSE_RENT_RATIO_THRESHOLD) {
      expenseRentRatio = expenseRentRatio - EXPENSE_RENT_RATIO_DECREMENT_FACTOR;
    }

    incrementedTotalExpenses = grossRentRevenue * expenseRentRatio;
    projectedCashFlow += grossRentRevenue - incrementedTotalExpenses - debtService;
  }

  return projectedCashFlow;
}

function getExpenseRentRatio(cherrypickids, getDataByID, cloneKey) {
  var grossRentRevenue = Number(cherrypickids['grossRentRevenue'] && getDataByID(cherryPickIdGenerator(cherrypickids['grossRentRevenue'], cloneKey)) || ''),
      totalExpenses = getTotalExpenses(cherrypickids, getDataByID, cloneKey);

  if (grossRentRevenue) {
    return totalExpenses / grossRentRevenue;
  }

  return 0;
}

function getTotalExpenses(cherrypickids, getDataByID, cloneKey) {
  var totalExpenses = Number(cherrypickids['totalExpenses'] && getDataByID(cherryPickIdGenerator(cherrypickids['totalExpenses'], cloneKey)) || '');
  return totalExpenses;
}

function getProjectedNOI(grossRentRevenue, yearsToClose, noi, rentIncrementPercentage) {
  var projectedNOI = noi;

  for (var i = 1; i <= yearsToClose; i++) {
    projectedNOI = projectedNOI + grossRentRevenue * (rentIncrementPercentage / 100);
    grossRentRevenue = grossRentRevenue * (1 + rentIncrementPercentage / 100);
  }

  return projectedNOI;
}

function getCashFlows(yearsToClose, totalInvestmentCost, netOperatingIncome, netProceedsFromSale, rentIncrementPercentage, grossRentRevenue, debtService, cherrypickids, getDataByID) {
  var cloneKey = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : '';
  var cashFlows = [-totalInvestmentCost];
  var incrementedTotalExpenses = getTotalExpenses(cherrypickids, getDataByID, cloneKey);
  var expenseRentRatio = getExpenseRentRatio(cherrypickids, getDataByID, cloneKey);
  var prev = netOperatingIncome;

  for (var i = 2; i <= yearsToClose; i++) {
    grossRentRevenue = grossRentRevenue * (1 + rentIncrementPercentage / 100);

    if (expenseRentRatio > EXPENSE_RENT_RATIO_THRESHOLD) {
      expenseRentRatio = expenseRentRatio - EXPENSE_RENT_RATIO_DECREMENT_FACTOR;
    }

    incrementedTotalExpenses = grossRentRevenue * expenseRentRatio;
    cashFlows.push(prev);
    prev = grossRentRevenue - incrementedTotalExpenses - debtService;
  }

  cashFlows.push(netProceedsFromSale + prev);
  return cashFlows;
}

function getNetProceedsFromSale(salePrice, emiCost, yearsToClose, propertyAnnualAppreciationPercentage, downPaymentPercentage, loanInterestRate) {
  var remainingPrincipalAmount = getRemainingPrincipalAmount(salePrice, emiCost / 12, yearsToClose, downPaymentPercentage, loanInterestRate);
  var futureSalePrice = salePrice * Math.pow(1 + propertyAnnualAppreciationPercentage / 100, yearsToClose);
  return futureSalePrice - remainingPrincipalAmount - 0.06 * futureSalePrice;
}

function getRemainingPrincipalAmount(salePrice, emi, yearsToClose, downPaymentPercentage, loanInterestRate) {
  var principalAmount = salePrice * ((100 - downPaymentPercentage) / 100);

  if (principalAmount < 0.1 || emi < 0.1) {
    return 0;
  }

  var principalPaid = 0.0;
  var interestRatePerMonth = loanInterestRate / (12 * 100);

  for (var i = 0; i <= yearsToClose * 12; i++) {
    principalPaid = emi - principalAmount * interestRatePerMonth;
    principalAmount -= principalPaid;
  }

  return principalAmount;
}

function getPaidPrincipalAmount(principalAmount, emiCost, loanInterestRate) {
  var yearsToClose = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
  var interestRatePerMonth = loanInterestRate / (12 * 100);
  var monthlyPrincipal = 0;
  var principalPaid = 0;

  for (var i = yearsToClose * 12; i >= 0; i--) {
    monthlyPrincipal = emiCost - principalAmount * interestRatePerMonth;
    principalAmount -= monthlyPrincipal;
    principalPaid += monthlyPrincipal;
  }

  return principalPaid;
}

function cherryPickIdGenerator(cherrypickid, keyId) {
  if (!keyId) {
    return cherrypickid;
  }

  return cherrypickid.replace(/\*/, keyId);
}
function conditionalDecimalConvert(value) {
  var decimals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  value = Number(value);
  return value % 1 === 0 ? value : value.toFixed(decimals);
}

/***/ }),
/* 181 */,
/* 182 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TextCalculatorSuggestionComponent; });
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(94);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _custom_custom_formula_calculator_text__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(178);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(115);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_10__);











var DISABLE = 'disable';

var TextCalculatorSuggestionComponent =
/*#__PURE__*/
function (_CustomFormulaCalcula) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default()(TextCalculatorSuggestionComponent, _CustomFormulaCalcula);

  function TextCalculatorSuggestionComponent(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, TextCalculatorSuggestionComponent);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(TextCalculatorSuggestionComponent).call(this, props));
    _this.canAutoUpdate = true;
    _this.pristainValue = true;
    _this.cherrySum = _this.getCherrySum();

    if (props.data.value) {
      _this.pristainState = true;
    }

    _this.state = {
      hasFocus: false,
      value: props.data.value,
      suggestions: props.data.options,
      showDropDown: false
    };
    _this._ignoreBlur = false;
    _this.onInputChange = _this.onInputChange.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this));
    _this.hideDropDown = _this.hideDropDown.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this));
    _this.showDropdown = _this.showDropdown.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this));
    _this.onInputBlur = _this.onInputBlur.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this));
    _this.toggleDropdown = _this.toggleDropdown.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this));
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(TextCalculatorSuggestionComponent, [{
    key: "onInputChange",
    value: function onInputChange(value) {
      var _this2 = this;

      this.canAutoUpdate = false;
      this.pristainValue = false;
      this.setState({
        showDropDown: value === ''
      }, function () {
        _this2.props.storeValue(_this2.props.id, value);
      });
    }
  }, {
    key: "setIgnoreBlur",
    value: function setIgnoreBlur(flag) {
      this._ignoreBlur = flag;
    }
  }, {
    key: "onInputBlur",
    value: function onInputBlur() {
      this.canAutoUpdate = true;

      if (this._ignoreBlur) {
        return;
      }

      this.hideDropDown();
    }
  }, {
    key: "onOptionSelect",
    value: function onOptionSelect(option) {
      var _this3 = this;

      this.canAutoUpdate = false;
      this.suggestionSelected = true;
      this.setState({
        showDropDown: false
      }, function () {
        _this3.props.storeValue(_this3.props.id, option.value);
      });
    }
  }, {
    key: "renderCustomData",
    value: function renderCustomData() {
      var _this4 = this;

      var suggestions = this.state.suggestions;
      var l = this.props.l;
      return suggestions.map(function (option) {
        return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("li", {
          className: "pac-item",
          onMouseEnter: function onMouseEnter() {
            _this4.setIgnoreBlur(true);
          },
          onMouseLeave: function onMouseLeave() {
            _this4.setIgnoreBlur(false);
          },
          onClick: function onClick() {
            return _this4.onOptionSelect(option);
          }
        }, void 0, l(option.label));
      });
    }
  }, {
    key: "showDropdown",
    value: function showDropdown() {
      this.setState({
        showDropDown: true
      });
    }
  }, {
    key: "hideDropDown",
    value: function hideDropDown() {
      this.setState({
        showDropDown: false
      });
    }
  }, {
    key: "toggleDropdown",
    value: function toggleDropdown() {
      this.setState({
        showDropDown: !this.state.showDropDown
      });
    }
  }, {
    key: "renderWriteValue",
    value: function renderWriteValue(value) {
      var _this5 = this;

      var showDropDown = this.state.showDropDown;
      var isDisableRequired = this.props.isDisableRequired;
      var componentArray = [_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: classnames__WEBPACK_IMPORTED_MODULE_10___default()("schema__text__ajaxpopulate__container", this.props.data.className)
      }, "inputSuggestionContainer", react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("input", {
        id: this.state.uniqueId,
        type: "text",
        ref: "inputcalculatesuggestion",
        placeholder: this.getPlaceHolder(),
        name: this.props.id,
        value: value,
        onFocus: !isDisableRequired && this.showDropdown || isDisableRequired && value && this.showDropdown,
        onBlur: this.onInputBlur,
        onChange: function onChange(evt) {
          return _this5.onInputChange(evt.target.value);
        },
        disabled: isDisableRequired && !value && 'disabled' || ''
      }), _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("i", {
        onClick: !isDisableRequired && this.toggleDropdown || isDisableRequired && value && this.toggleDropdown,
        className: classnames__WEBPACK_IMPORTED_MODULE_10___default()("schema__text__suggestion__dropdown-icon", showDropDown ? "pe-7s-angle-up" : "pe-7s-angle-down")
      }), showDropDown && _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: "custom-auto-complete pac-container"
      }, void 0, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("ul", {}, void 0, this.renderCustomData())))];

      if (this.props.error) {
        componentArray.push(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
          className: "schema__error"
        }, "error", this.renderErrorMessage(this.props.error)));
      }

      return componentArray;
    }
  }]);

  return TextCalculatorSuggestionComponent;
}(_custom_custom_formula_calculator_text__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"]);

TextCalculatorSuggestionComponent.propTypes = {
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.array
};
TextCalculatorSuggestionComponent.defaultProps = {
  classNames: ['schema__options', 'schema__text', 'schema__text__suggestion'],
  isDisableRequired: false,
  isDisplayTopLabel: true
};


/***/ }),
/* 183 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeaderSubheaderComponent; });
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(142);









/**
 * @description Renders a smaller width version of the radio component
 */

var HeaderSubheaderComponent =
/*#__PURE__*/
function (_HeaderComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(HeaderSubheaderComponent, _HeaderComponent);

  function HeaderSubheaderComponent() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, HeaderSubheaderComponent);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(HeaderSubheaderComponent).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(HeaderSubheaderComponent, [{
    key: "renderLabel",
    value: function renderLabel() {
      var _this$props = this.props,
          l = _this$props.l,
          label = _this$props.label,
          data = _this$props.data;
      return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: this.getLabelClassNames(),
        "data-automation-selector": this.getDataId('label')
      }, void 0, label && _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("h1", {}, void 0, l(label), this.renderLabelInfo(), this.renderTooltip()), data.value && _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("h2", {}, void 0, l(data.value)));
    }
  }]);

  return HeaderSubheaderComponent;
}(_header__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"]);

HeaderSubheaderComponent.propTypes = {
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.array
};
HeaderSubheaderComponent.defaultProps = {
  classNames: ['schema__header', 'schema__header__subheader']
};


/***/ }),
/* 184 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeaderSubheaderAppendixComponent; });
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(142);









/**
 * @description Renders a smaller width version of the radio component
 */

var HeaderSubheaderAppendixComponent =
/*#__PURE__*/
function (_HeaderComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(HeaderSubheaderAppendixComponent, _HeaderComponent);

  function HeaderSubheaderAppendixComponent() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, HeaderSubheaderAppendixComponent);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(HeaderSubheaderAppendixComponent).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(HeaderSubheaderAppendixComponent, [{
    key: "toggleAppendix",
    value: function toggleAppendix() {
      var componentList = this.props.tabs,
          firstChild = this.props.root().children[0];

      if (firstChild && (firstChild.type === 'list-removable' || firstChild.subtype === 'list-removable')) {
        firstChild.remove();
      } else {
        this.props.root().inject(componentList, 0, '');
      }
    }
  }, {
    key: "renderLabel",
    value: function renderLabel() {
      var _this$props = this.props,
          l = _this$props.l,
          label = _this$props.label,
          data = _this$props.data;
      return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: this.getLabelClassNames(),
        "data-automation-selector": this.getDataId('label')
      }, void 0, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("h1", {}, void 0, l(label), this.renderLabelInfo(), this.renderTooltip()), _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("a", {
        tabIndex: "0",
        onClick: this.toggleAppendix.bind(this)
      }, void 0, l(data.value)));
    }
  }]);

  return HeaderSubheaderAppendixComponent;
}(_header__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"]);

HeaderSubheaderAppendixComponent.propTypes = {
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.array
};
HeaderSubheaderAppendixComponent.defaultProps = {
  classNames: ['schema__header', 'schema__header__subheader__appendix']
};


/***/ }),
/* 185 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeaderIconComponent; });
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(142);









/**
 * @description Renders a component with a header and children
 * @prop classNames {array} Additional classnames to be added to the component
 */

var HeaderIconComponent =
/*#__PURE__*/
function (_HeaderComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(HeaderIconComponent, _HeaderComponent);

  function HeaderIconComponent() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, HeaderIconComponent);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(HeaderIconComponent).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(HeaderIconComponent, [{
    key: "renderLabel",
    value: function renderLabel() {
      var _this$props = this.props,
          l = _this$props.l,
          _this$props$label = _this$props.label,
          label = _this$props$label === void 0 ? '' : _this$props$label,
          data = _this$props.data;
      return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("span", {
        className: this.getLabelClassNames(),
        "data-automation-selector": this.getDataId('label')
      }, void 0, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("span", {}, void 0, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("i", {
        className: "icon-cob icon-".concat(data.icon)
      })), _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("h1", {}, void 0, l(label)));
    }
  }]);

  return HeaderIconComponent;
}(_header__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"]);

HeaderIconComponent.propTypes = {
  data: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.object
};
HeaderIconComponent.defaultProps = {
  classNames: ['schema__header', 'schema__header-icon']
};


/***/ }),
/* 186 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListRowComponent; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _default_component_default_list__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(143);







/**
 * @description Renders a small dropwdown list based of off a specific tab value
 * @prop classNames {array} Additional classnames to be added to the component
 */

var ListRowComponent =
/*#__PURE__*/
function (_ListComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(ListRowComponent, _ListComponent);

  function ListRowComponent() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, ListRowComponent);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(ListRowComponent).apply(this, arguments));
  }

  return ListRowComponent;
}(_default_component_default_list__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"]);

ListRowComponent.propTypes = {
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.array
};
ListRowComponent.defaultProps = {
  classNames: ['schema__list', 'schema__list-inline']
};


/***/ }),
/* 187 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListColumnsComponent; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(132);
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _default_component_default_list__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(143);









/**
 * @description Renders a horizontal list using column values
 * @prop classNames {array} Additional classnames to be added to the component
 */

var ListColumnsComponent =
/*#__PURE__*/
function (_DefaultListComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(ListColumnsComponent, _DefaultListComponent);

  function ListColumnsComponent() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, ListColumnsComponent);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(ListColumnsComponent).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(ListColumnsComponent, [{
    key: "getChildProps",
    value: function getChildProps(child, index) {
      var props = _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(ListColumnsComponent.prototype), "getChildProps", this).call(this, child, index);

      if (this.props.data && this.props.data.columns) {
        props.classNames = child.props.classNames.concat(['schema--width-' + this.props.data.columns]);
      }

      return props;
    }
  }]);

  return ListColumnsComponent;
}(_default_component_default_list__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"]);

ListColumnsComponent.propTypes = {
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.array
};
ListColumnsComponent.defaultProps = {
  classNames: ['schema__list', 'schema__list-columns']
};


/***/ }),
/* 188 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListColumnsNoGutterComponent; });
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _list_columns__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(187);
/* harmony import */ var lodash_filter__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(98);
/* harmony import */ var lodash_filter__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(lodash_filter__WEBPACK_IMPORTED_MODULE_9__);










/**
 * @description Renders a horizontal list using column values
 * @prop classNames {array} Additional classnames to be added to the component
 */

var ListColumnsNoGutterComponent =
/*#__PURE__*/
function (_ListColumnsComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(ListColumnsNoGutterComponent, _ListColumnsComponent);

  function ListColumnsNoGutterComponent() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, ListColumnsNoGutterComponent);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(ListColumnsNoGutterComponent).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(ListColumnsNoGutterComponent, [{
    key: "renderValue",
    value: function renderValue() {
      var classNames = this.getValueClassNames();
      var componentArray = [_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: classNames
      }, void 0, this.referenceChildren())];

      if (this.props.error) {
        componentArray.push(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
          className: "schema__error"
        }, "error", this.renderErrorMessage(this.props.error)));
      }

      return componentArray;
    }
  }]);

  return ListColumnsNoGutterComponent;
}(_list_columns__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"]);

ListColumnsNoGutterComponent.propTypes = {
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.array
};
ListColumnsNoGutterComponent.defaultProps = {
  classNames: ['schema__list', 'schema__list-columns', 'schema__list-columns__no-gutter']
};


/***/ }),
/* 189 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListRemovable; });
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _default_component_default_list__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(143);









/**
 * @description Renders a list that has a link label that removes itself on click
 * @prop classNames {array} Additional classnames to be added to the component
 * @prop remove {function} function generated by component tree class that removes the component from it's parent
 */

var _ref =
/*#__PURE__*/
_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("span", {
  className: "internal-tooltip-content"
});

var ListRemovable =
/*#__PURE__*/
function (_DefaultListComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(ListRemovable, _DefaultListComponent);

  function ListRemovable() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, ListRemovable);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(ListRemovable).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(ListRemovable, [{
    key: "renderLabel",
    value: function renderLabel() {
      return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: "clearfix schema__list__removable__link__container"
      }, void 0, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("button", {
        className: "schema__list__removable__link button--text",
        onClick: this.props.remove,
        "aria-label": "Remove",
        "data-tealium-narrative": "Remove",
        "data-automation-selector": this.getDataId('list-remover')
      }, void 0, _ref));
    }
  }]);

  return ListRemovable;
}(_default_component_default_list__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"]);

ListRemovable.defaultProps = {
  classNames: ['schema__list', 'schema__list__removable']
};
ListRemovable.propTypes = {
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.array,
  remove: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.func
};


/***/ }),
/* 190 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListRemovableSingle; });
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _default_component_default_list__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(143);









/**
 * @description Renders a list that has a link label that removes itself on click
 * @prop classNames {array} Additional classnames to be added to the component
 * @prop remove {function} function generated by component tree class that removes the component from it's parent
 */

var _ref =
/*#__PURE__*/
_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("i", {
  className: "schema__icon pe-7s-close"
});

var _ref2 =
/*#__PURE__*/
_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("span", {
  className: "internal-tooltip-content"
});

var ListRemovableSingle =
/*#__PURE__*/
function (_DefaultListComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(ListRemovableSingle, _DefaultListComponent);

  function ListRemovableSingle() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, ListRemovableSingle);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(ListRemovableSingle).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(ListRemovableSingle, [{
    key: "renderLabel",
    value: function renderLabel() {
      return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: "clearfix schema__list__removable__link__container"
      }, void 0, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("button", {
        className: "schema__list__removable__link button--text",
        "aria-label": "Remove",
        onClick: this.props.remove,
        "data-tealium-narrative": "Remove"
      }, void 0, this.props.isButton ? 'Delete' : _ref, _ref2));
    }
  }]);

  return ListRemovableSingle;
}(_default_component_default_list__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"]);

ListRemovableSingle.defaultProps = {
  classNames: ['schema__list', 'schema__list__removable-single'],
  isButton: false
};
ListRemovableSingle.propTypes = {
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.array,
  remove: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.func
};


/***/ }),
/* 191 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListTabs; });
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(96);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(124);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _options_radio_short__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(192);
/* harmony import */ var _default_component_default_list__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(143);












/**
 * @description Renders a list based of off a specific tab value
 * @prop classNames {array} Additional classnames to be added to the component
 */

var ListTabs =
/*#__PURE__*/
function (_DefaultListComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default()(ListTabs, _DefaultListComponent);

  function ListTabs() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default()(this, ListTabs);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(ListTabs).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default()(ListTabs, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.rebuildTabs(this.props.data.value);
    }
  }, {
    key: "onTabChange",
    value: function onTabChange(id, value) {
      this.rebuildTabs(value);
      this.props.storeValue(id, value);
    }
  }, {
    key: "renderLabel",
    value: function renderLabel() {
      var className = this.getLabelClassNames();

      var _this$props = this.props,
          classNames = _this$props.classNames,
          props = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2___default()(_this$props, ["classNames"]);

      if (this.props.data.value) {
        props.error = null;
      }

      return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("span", {
        className: className
      }, void 0, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_options_radio_short__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, props, {
        storeValue: this.onTabChange.bind(this)
      })));
    }
  }, {
    key: "rebuildTabs",
    value: function rebuildTabs(tabValue) {
      var tabs = this.props.root().tabs,
          tabList = [],
          tabIds = [];

      if (!tabs) {
        return;
      }

      tabs.forEach(function (tabChild) {
        if (tabChild.tabValue === tabValue) {
          tabList.push(tabChild);
          tabIds.push(tabChild.id);
        }
      });
      this.props.root().children.forEach(function (child) {
        var tabIndex = tabIds.indexOf(child.id);

        if (tabIndex === -1) {
          child.remove();
        } else {
          tabList.splice(tabIndex, 1);
          tabIds.splice(tabIndex, 1);
        }
      });

      if (tabList.length) {
        this.props.root().inject(tabList, 0, tabValue);
      }
    }
  }]);

  return ListTabs;
}(_default_component_default_list__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"]);

ListTabs.propTypes = {
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.array
};
ListTabs.defaultProps = {
  classNames: ['schema__list', 'schema__list-tabs']
};


/***/ }),
/* 192 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RadioSmallComponent; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _radio__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(141);







/**
 * @description Renders a smaller width version of the radio component
 */

var RadioSmallComponent =
/*#__PURE__*/
function (_RadioComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(RadioSmallComponent, _RadioComponent);

  function RadioSmallComponent() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, RadioSmallComponent);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(RadioSmallComponent).apply(this, arguments));
  }

  return RadioSmallComponent;
}(_radio__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"]);

RadioSmallComponent.propTypes = {
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.array
};
RadioSmallComponent.defaultProps = {
  classNames: ['schema__options', 'schema__radio', 'schema__radio__short']
};


/***/ }),
/* 193 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListTabsSmallComponent; });
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(96);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(124);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _list_tabs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(191);
/* harmony import */ var _options_radio_tiny__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(194);












/**
 * @description Renders a small dropwdown list based of off a specific tab value
 * @prop classNames {array} Additional classnames to be added to the component
 */

var ListTabsSmallComponent =
/*#__PURE__*/
function (_ListTabsComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default()(ListTabsSmallComponent, _ListTabsComponent);

  function ListTabsSmallComponent() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default()(this, ListTabsSmallComponent);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(ListTabsSmallComponent).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default()(ListTabsSmallComponent, [{
    key: "renderLabel",
    value: function renderLabel() {
      var className = this.getLabelClassNames();

      var _this$props = this.props,
          classNames = _this$props.classNames,
          props = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2___default()(_this$props, ["classNames"]);

      if (this.props.data.value) {
        props.error = null;
      }

      return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("span", {
        className: className
      }, void 0, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_options_radio_tiny__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, props, {
        storeValue: this.onTabChange.bind(this)
      })));
    }
  }]);

  return ListTabsSmallComponent;
}(_list_tabs__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"]);

ListTabsSmallComponent.propTypes = {
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.array
};
ListTabsSmallComponent.defaultProps = {
  classNames: ['schema__list', 'schema__list-tabs', 'schema__list-tabs-small']
};


/***/ }),
/* 194 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RadioTinyComponent; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _radio__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(141);







/**
 * @description Renders an even smaller width version of the radio component
 */

var RadioTinyComponent =
/*#__PURE__*/
function (_RadioComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(RadioTinyComponent, _RadioComponent);

  function RadioTinyComponent() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, RadioTinyComponent);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(RadioTinyComponent).apply(this, arguments));
  }

  return RadioTinyComponent;
}(_radio__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"]);

RadioTinyComponent.propTypes = {
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.array
};
RadioTinyComponent.defaultProps = {
  classNames: ['schema__options', 'schema__radio', 'schema__radio__tiny']
};


/***/ }),
/* 195 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListTabsDropdown; });
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(96);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(124);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _list_tabs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(191);
/* harmony import */ var _options_dropdown__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(131);












/**
 * @description Renders a dropwdown list based of off a specific tab value
 * @prop classNames {array} Additional classnames to be added to the component
 */

var ListTabsDropdown =
/*#__PURE__*/
function (_ListTabsComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default()(ListTabsDropdown, _ListTabsComponent);

  function ListTabsDropdown() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default()(this, ListTabsDropdown);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(ListTabsDropdown).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default()(ListTabsDropdown, [{
    key: "renderLabel",
    value: function renderLabel() {
      var className = this.getLabelClassNames();

      var _this$props = this.props,
          classNames = _this$props.classNames,
          props = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2___default()(_this$props, ["classNames"]);

      if (this.props.data.value) {
        props.error = null;
      }

      return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("span", {
        className: className
      }, void 0, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_options_dropdown__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, props, {
        storeValue: this.onTabChange.bind(this)
      })));
    }
  }]);

  return ListTabsDropdown;
}(_list_tabs__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"]);

ListTabsDropdown.propTypes = {
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.array
};
ListTabsDropdown.defaultProps = {
  classNames: ['schema__list', 'schema__list-tabs', 'schema__list-tabs-dropdown']
};


/***/ }),
/* 196 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListTabsSliderComponent; });
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(96);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(124);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _list_tabs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(191);
/* harmony import */ var _options_slider__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(197);












/**
 * @description Renders a dropwdown list based of off a specific tab value
 * @prop classNames {array} Additional classnames to be added to the component
 */

var ListTabsSliderComponent =
/*#__PURE__*/
function (_ListTabsComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default()(ListTabsSliderComponent, _ListTabsComponent);

  function ListTabsSliderComponent() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default()(this, ListTabsSliderComponent);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(ListTabsSliderComponent).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default()(ListTabsSliderComponent, [{
    key: "onTabChange",
    value: function onTabChange(id, value) {
      this.rebuildTabs(value.replace('£', '').replace('>', ''));
      this.props.storeValue(id, value);
    }
  }, {
    key: "renderLabel",
    value: function renderLabel() {
      var className = this.getLabelClassNames();

      var _this$props = this.props,
          classNames = _this$props.classNames,
          props = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2___default()(_this$props, ["classNames"]);

      if (this.props.data.value) {
        props.error = null;
      }

      return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("span", {
        className: className
      }, void 0, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_options_slider__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, props, {
        storeValue: this.onTabChange.bind(this)
      })));
    }
  }]);

  return ListTabsSliderComponent;
}(_list_tabs__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"]);

ListTabsSliderComponent.propTypes = {
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.array
};
ListTabsSliderComponent.defaultProps = {
  classNames: ['schema__list', 'schema__list-tabs', 'schema__list-tabs-slider']
};


/***/ }),
/* 197 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SliderComponent; });
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _default_component_default_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(133);
/* harmony import */ var _common_range_slider__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(198);










/**
 * @description Renders a slider component with a set of children
 * @prop data {array} Additional props for component
 */

var SliderComponent =
/*#__PURE__*/
function (_DefaultComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(SliderComponent, _DefaultComponent);

  function SliderComponent(props) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, SliderComponent);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(SliderComponent).call(this, props));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(SliderComponent, [{
    key: "onSliderChange",
    value: function onSliderChange(value) {
      this.props.storeValue(this.props.id, value);
    }
  }, {
    key: "renderSlider",
    value: function renderSlider(value) {
      var className = this.getValueClassNames();
      return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("span", {
        className: className,
        "data-automation-selector": this.getDataId('slider')
      }, void 0, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()(_common_range_slider__WEBPACK_IMPORTED_MODULE_9__[/* RangeSlider */ "a"], {
        title: this.props.label,
        min: 0,
        max: this.props.data.maxValue,
        step: this.props.data.step || '',
        defaultValue: this.getSliderValue(this.props.data.maxValue, value),
        className: "slider-wrapper",
        uom: this.props.data.uom || '',
        onAfterChange: this.onSliderChange.bind(this)
      }, this.state.uniqueId), this.props.error && _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: "schema__error"
      }, "error", this.props.error));
    }
  }, {
    key: "renderReadValue",
    value: function renderReadValue(value) {
      // return super.renderValue(label);
      return null;
    }
  }, {
    key: "renderValue",
    value: function renderValue(value) {
      return this.props.writeMode ? this.renderSlider(value) : this.renderReadValue(value);
    }
  }]);

  return SliderComponent;
}(_default_component_default_component__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"]);

SliderComponent.propTypes = {
  label: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.string,
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.array
};
SliderComponent.defaultProps = {
  label: '',
  classNames: ['schema__options', 'schema__slider']
};


/***/ }),
/* 198 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RangeSlider; });
/* harmony import */ var _loadable_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(130);
/* harmony import */ var _loadable_component__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_loadable_component__WEBPACK_IMPORTED_MODULE_0__);

var RangeSlider = _loadable_component__WEBPACK_IMPORTED_MODULE_0___default()(function () {
  return __webpack_require__.e(/* import() | RangeSlider */ 6).then(__webpack_require__.bind(null, 255));
});

/***/ }),
/* 199 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListTabsRadioIcon; });
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(96);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(124);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _list_tabs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(191);
/* harmony import */ var _options_icon_radio__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(200);












/**
 * @description Renders radio icons list based of off a specific tab value
 * @prop classNames {array} Additional classnames to be added to the component
 */

var ListTabsRadioIcon =
/*#__PURE__*/
function (_ListTabsComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default()(ListTabsRadioIcon, _ListTabsComponent);

  function ListTabsRadioIcon() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default()(this, ListTabsRadioIcon);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(ListTabsRadioIcon).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default()(ListTabsRadioIcon, [{
    key: "renderLabel",
    value: function renderLabel() {
      var className = this.getLabelClassNames();

      var _this$props = this.props,
          classNames = _this$props.classNames,
          props = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2___default()(_this$props, ["classNames"]);

      if (this.props.data.value) {
        props.error = null;
      }

      return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("span", {
        className: className
      }, void 0, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_options_icon_radio__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, props, {
        storeValue: this.onTabChange.bind(this)
      })));
    }
  }]);

  return ListTabsRadioIcon;
}(_list_tabs__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"]);

ListTabsRadioIcon.propTypes = {
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.array
};
ListTabsRadioIcon.defaultProps = {
  classNames: ['schema__list', 'schema__list-tabs', 'schema__list-tabs-radio-icon']
};


/***/ }),
/* 200 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IconRadioComponent; });
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _radio__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(141);









/**
 * @description Renders a smallwer width version of the radio component
 */

var IconRadioComponent =
/*#__PURE__*/
function (_RadioComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(IconRadioComponent, _RadioComponent);

  function IconRadioComponent() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, IconRadioComponent);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(IconRadioComponent).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(IconRadioComponent, [{
    key: "renderRadioLabel",
    value: function renderRadioLabel(identifier) {
      var optionObject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var l = this.props.l;
      return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("label", {
        htmlFor: identifier
      }, optionObject.value, optionObject.icon && _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("i", {
        className: "icon-propshub pe-7s-".concat(optionObject.icon)
      }), l(optionObject.label), this.renderLabelInfo(false, false));
    }
  }]);

  return IconRadioComponent;
}(_radio__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"]);

IconRadioComponent.propTypes = {
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.array
};
IconRadioComponent.defaultProps = {
  classNames: ['schema__options', 'schema__radio', 'schema__radio__icon']
};


/***/ }),
/* 201 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListTabsCollapse; });
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(96);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _list_tabs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(191);
/* harmony import */ var _options_toggle_checkbox__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(202);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(115);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_11__);












/**
 * @description Renders a list that has a link label that removes itself on click
 * @prop classNames {array} Additional classnames to be added to the component
 * @prop remove {function} function generated by component tree class that removes the component from it's parent
 */

var ListTabsCollapse =
/*#__PURE__*/
function (_ListTabs) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default()(ListTabsCollapse, _ListTabs);

  function ListTabsCollapse(props) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, ListTabsCollapse);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(ListTabsCollapse).call(this, props));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(ListTabsCollapse, [{
    key: "renderLabel",
    value: function renderLabel() {
      return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: "clearfix schema__list__collapse__link__container"
      }, void 0, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_options_toggle_checkbox__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, this.props, {
        storeValue: this.onTabChange.bind(this)
      })), _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("span", {}, void 0, this.renderTooltip(), this.renderLabelInfo()));
    }
  }, {
    key: "renderValue",
    value: function renderValue() {
      var classNames = this.props.data.value === 'true' ? this.getValueClassNames() : classnames__WEBPACK_IMPORTED_MODULE_11___default()('hidden', this.getValueClassNames());
      return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: classNames
      }, void 0, this.referenceChildren());
    }
  }, {
    key: "referenceChildren",
    value: function referenceChildren() {
      var _this = this;

      var data = this.props.data;
      var index = 0,
          children = react__WEBPACK_IMPORTED_MODULE_7___default.a.Children.map(this.props.children, function (child, index) {
        child.props.classNames.length = 0;

        if (child === null) {
          return null;
        }

        if (!data.value && index !== 0 || data.value && data.value !== child.props.tabValue) {
          return react__WEBPACK_IMPORTED_MODULE_7___default.a.cloneElement(child, _this.getChildProps(child, index++, 'hidden'));
        } else {
          return react__WEBPACK_IMPORTED_MODULE_7___default.a.cloneElement(child, _this.getChildProps(child, index++));
        }
      });
      return children;
    }
  }, {
    key: "getChildProps",
    value: function getChildProps(child, index) {
      var classes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      return {
        ref: 'child-' + index++,
        'classNames': classes
      };
    }
  }, {
    key: "rebuildTabs",
    value: function rebuildTabs(tabValue) {
      var tabs = this.props.root().tabs,
          tabList = [],
          tabIds = [];
      tabs.forEach(function (tabChild) {
        // if (tabChild.tabValue === tabValue) {
        tabList.push(tabChild);
        tabIds.push(tabChild.id); // }
      }); // console.log(tabList);

      this.props.root().children.forEach(function (child) {
        var tabIndex = tabIds.indexOf(child.id);

        if (tabIndex === -1) {
          child.remove();
        } else {
          tabList.splice(tabIndex, 1);
          tabIds.splice(tabIndex, 1);
        }
      });

      if (tabList.length) {
        this.props.root().inject(tabList, 0, tabValue);
      }
    }
  }]);

  return ListTabsCollapse;
}(_list_tabs__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"]);

ListTabsCollapse.defaultProps = {
  classNames: ['schema__list', 'schema__list-tabs', 'schema__list-tabs-collapse']
};
ListTabsCollapse.propTypes = {
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.array
};


/***/ }),
/* 202 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToggleCheckboxComponent; });
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _checkbox__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(203);









/**
 * @description Renders a icon version of the checkbox component
 */

var ToggleCheckboxComponent =
/*#__PURE__*/
function (_CheckboxComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(ToggleCheckboxComponent, _CheckboxComponent);

  function ToggleCheckboxComponent() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, ToggleCheckboxComponent);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(ToggleCheckboxComponent).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(ToggleCheckboxComponent, [{
    key: "renderClasses",
    value: function renderClasses(data) {
      var value = data.value,
          openIcon = data.openIcon,
          closeIcon = data.closeIcon;
      return value && value === 'true' ? closeIcon : openIcon;
    }
  }, {
    key: "renderCheckboxLabel",
    value: function renderCheckboxLabel(identifier) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var l = this.props.l;
      return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("label", {
        htmlFor: identifier
      }, "".concat(identifier, "_label"), _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("i", {
        className: "icon-propshub ".concat(this.renderClasses(options))
      }), l(options.label));
    }
  }]);

  return ToggleCheckboxComponent;
}(_checkbox__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"]);

ToggleCheckboxComponent.propTypes = {
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.array
};
ToggleCheckboxComponent.defaultProps = {
  classNames: ['schema__options', 'schema__checkbox', 'schema__checkbox__icon']
};


/***/ }),
/* 203 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CheckboxComponent; });
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _default_component_default_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(133);









/**
 * @description renders an input checkbox.
 */

var CheckboxComponent =
/*#__PURE__*/
function (_DefaultComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(CheckboxComponent, _DefaultComponent);

  function CheckboxComponent(props) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, CheckboxComponent);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(CheckboxComponent).call(this, props));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(CheckboxComponent, [{
    key: "renderLabel",
    value: function renderLabel(label) {
      var l = this.props.l;

      if (!label) {
        return null;
      }

      var className = this.getLabelClassNames();
      return this.props.writeMode ? _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("label", {
        className: className,
        id: "".concat(this.state.uniqueId, "__label")
      }, void 0, l(label), this.renderLabelInfo()) : _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("span", {
        className: className
      }, void 0, l(label), this.renderLabelInfo());
    }
  }, {
    key: "renderCheckboxLabel",
    value: function renderCheckboxLabel(identifier) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var l = this.props.l;
      return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("label", {
        htmlFor: identifier
      }, "".concat(identifier, "_label"), l(options.label));
    }
  }, {
    key: "renderCheckbox",
    value: function renderCheckbox(value, options) {
      var identifier = "".concat(this.state.uniqueId, "-").concat(options.value),
          checkValue = this.getBoolean(value),
          className = this.getValueClassNames();
      return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: className,
        "aria-labelledby": "".concat(this.state.uniqueId, "__label")
      }, void 0, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: "schema__checkbox__item"
      }, void 0, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("input", {
        ref: "input",
        type: "checkbox",
        id: identifier,
        name: identifier,
        "data-automation-selector": this.getDataId("option_".concat(options.value)),
        key: "".concat(this.state.uniqueId, "_input"),
        value: checkValue,
        checked: checkValue,
        "data-tealium-narrative": options.label,
        onChange: this.onChange.bind(this)
      }), this.renderCheckboxLabel(identifier, options)));
    }
  }, {
    key: "renderReadValue",
    value: function renderReadValue(value) {
      return this.props.data[value] || null;
    }
  }, {
    key: "renderValue",
    value: function renderValue(value) {
      var stringValue = value;
      var options = this.props.data;
      return this.props.writeMode ? this.renderCheckbox(stringValue, options) : this.renderReadValue(stringValue);
    }
  }, {
    key: "onChange",
    value: function onChange(e) {
      this.props.storeValue(this.props.id, String(e.currentTarget.checked));
    }
  }]);

  return CheckboxComponent;
}(_default_component_default_component__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"]);

CheckboxComponent.propTypes = {
  label: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.string,
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.array
};
CheckboxComponent.defaultProps = {
  label: '',
  classNames: ['schema__options', 'schema__checkbox']
};


/***/ }),
/* 204 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListMultiTabs; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _list_tabs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(191);








/**
 * @description Renders radio icons list based of off a specific tab value
 * @prop classNames {array} Additional classnames to be added to the component
 */

var ListMultiTabs =
/*#__PURE__*/
function (_ListTabs) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(ListMultiTabs, _ListTabs);

  function ListMultiTabs() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, ListMultiTabs);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(ListMultiTabs).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(ListMultiTabs, [{
    key: "referenceChildren",
    value: function referenceChildren() {
      var _this = this;

      var data = this.props.data;
      var index = 0,
          children = react__WEBPACK_IMPORTED_MODULE_5___default.a.Children.map(this.props.children, function (child, index) {
        child.props.classNames.length = 0;

        if (child === null) {
          return null;
        }

        if (!data.value || data.value && data.value !== child.props.tabValue) {
          return react__WEBPACK_IMPORTED_MODULE_5___default.a.cloneElement(child, _this.getChildProps(child, index++, 'hidden'));
        } else {
          return react__WEBPACK_IMPORTED_MODULE_5___default.a.cloneElement(child, _this.getChildProps(child, index++));
        }
      });
      return children;
    }
  }, {
    key: "getChildProps",
    value: function getChildProps(child, index) {
      var classes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      return {
        ref: 'child-' + index++,
        'classNames': classes
      };
    }
  }, {
    key: "rebuildTabs",
    value: function rebuildTabs(tabValue) {
      var tabs = this.props.root().tabs,
          tabList = [],
          tabIds = [];
      tabs.forEach(function (tabChild) {
        tabList.push(tabChild);
        tabIds.push(tabChild.id);
      });
      this.props.root().children.forEach(function (child) {
        var tabIndex = tabIds.indexOf(child.id);

        if (tabIndex === -1) {
          child.remove();
        } else {
          tabList.splice(tabIndex, 1);
          tabIds.splice(tabIndex, 1);
        }
      });

      if (tabList.length) {
        this.props.root().inject(tabList, 0, tabValue);
      }
    }
  }]);

  return ListMultiTabs;
}(_list_tabs__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"]);

ListMultiTabs.propTypes = {
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.array
};
ListMultiTabs.defaultProps = {
  classNames: ['schema__list', 'schema__list-tabs', 'schema__list-tabs-multi-select', 'schema__list-tabs-multi-select-radio-icon']
};


/***/ }),
/* 205 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListTabsReadContent; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _list_tabs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(191);







/**
 * @description Renders radio icons list based of off a specific tab value
 * @prop classNames {array} Additional classnames to be added to the component
 */

var ListTabsReadContent =
/*#__PURE__*/
function (_ListTabs) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(ListTabsReadContent, _ListTabs);

  function ListTabsReadContent() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, ListTabsReadContent);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(ListTabsReadContent).apply(this, arguments));
  }

  return ListTabsReadContent;
}(_list_tabs__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"]);

ListTabsReadContent.propTypes = {
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.array
};
ListTabsReadContent.defaultProps = {
  classNames: ['schema__list', 'schema__list-tabs', 'schema__list-tabs__read-content']
};


/***/ }),
/* 206 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListCollapsibleItem; });
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _default_component_default_list__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(143);









/**
 * @description Renders a list based of off a specific tab value
 * @prop classNames {array} Additional classnames to be added to the component
 */

var ListCollapsibleItem =
/*#__PURE__*/
function (_DefaultListComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(ListCollapsibleItem, _DefaultListComponent);

  function ListCollapsibleItem() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, ListCollapsibleItem);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(ListCollapsibleItem).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(ListCollapsibleItem, [{
    key: "renderValue",
    value: function renderValue() {
      var classNames = this.getValueClassNames();
      return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: classNames
      }, void 0, this.props.children);
    }
  }]);

  return ListCollapsibleItem;
}(_default_component_default_list__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"]);

ListCollapsibleItem.propTypes = {
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.array
};
ListCollapsibleItem.defaultProps = {
  classNames: ['schema__list', 'schema__list-collapsible']
};


/***/ }),
/* 207 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListCollapsibleItem; });
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _list_collapsible__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(206);
/* harmony import */ var _common_collapsible_collapsible__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(126);
/* harmony import */ var _default_component_markdown_wrapper__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(134);











/**
 * @description Renders a list based of off a specific tab value
 * @prop classNames {array} Additional classnames to be added to the component
 */

var ListCollapsibleItem =
/*#__PURE__*/
function (_ListCollapsibleCompo) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(ListCollapsibleItem, _ListCollapsibleCompo);

  function ListCollapsibleItem() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, ListCollapsibleItem);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(ListCollapsibleItem).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(ListCollapsibleItem, [{
    key: "renderLabel",
    value: function renderLabel() {
      return null;
    }
  }, {
    key: "renderValue",
    value: function renderValue() {
      var _this$props = this.props,
          l = _this$props.l,
          label = _this$props.label,
          data = _this$props.data; //console.log(children);

      return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()(_common_collapsible_collapsible__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], {
        transitionTime: 250,
        trigger: l(label),
        open: data.isOpen,
        extraProps: {
          id: data.htmlId
        },
        className: "property-details__section-wrapper"
      }, this.state.uniqueId, this.props.children.length ? this.props.children : _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()(_default_component_markdown_wrapper__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], {
        value: data.value
      }));
    }
  }]);

  return ListCollapsibleItem;
}(_list_collapsible__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"]);

ListCollapsibleItem.propTypes = {
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.array
};
ListCollapsibleItem.defaultProps = {
  classNames: ['schema__list', 'schema__list-collapsible-item']
};


/***/ }),
/* 208 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataGridComponent; });
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _default_component_default_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(133);
/* harmony import */ var _common_data_grid_column_data_grid__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(209);










/**
 * @description renders data grid component
 * @prop classNames {array} Additional classnames to be added to the component
 */

var DataGridComponent =
/*#__PURE__*/
function (_DefaultComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(DataGridComponent, _DefaultComponent);

  function DataGridComponent() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, DataGridComponent);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(DataGridComponent).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(DataGridComponent, [{
    key: "renderValue",
    value: function renderValue() {
      var dataset = this.props.data.dataset;
      var componentArray = [_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: "schema__data-grid__container"
      }, "dataGridContainer", _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()(_common_data_grid_column_data_grid__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], {
        data: dataset.datasets,
        headers: DataGridComponent.generateGridHeaders(dataset.labels),
        renderCustomDataItem: DataGridComponent.renderDataItem
      }))];
      return componentArray;
    }
  }], [{
    key: "generateGridHeaders",
    value: function generateGridHeaders(labels) {
      var labelObject = {};
      labels.forEach(function (label) {
        labelObject[label] = {
          "label": label
        };
      });
      return labelObject;
    }
  }, {
    key: "renderDataItem",
    value: function renderDataItem(dataItem, key) {
      if (key && key.toLowerCase() === 'website') {
        return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("li", {
          className: "data-grid__data-rows__row__data-list__item data-grid__data-item-block"
        }, void 0, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("a", {
          target: "_blank",
          rel: "noopener noreferrer",
          href: "//".concat(dataItem[key])
        }, void 0, dataItem[key]));
      }

      return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("li", {
        dangerouslySetInnerHTML: {
          __html: dataItem[key]
        },
        className: "data-grid__data-rows__row__data-list__item data-grid__data-item-block"
      });
    }
  }]);

  return DataGridComponent;
}(_default_component_default_component__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"]);

DataGridComponent.propTypes = {
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.array
};
DataGridComponent.defaultProps = {
  classNames: ['schema__data-grid']
};


/***/ }),
/* 209 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _data_grid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(210);








var ColumnDataGrid =
/*#__PURE__*/
function (_DataGrid) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(ColumnDataGrid, _DataGrid);

  function ColumnDataGrid(props) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, ColumnDataGrid);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(ColumnDataGrid).call(this, props));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(ColumnDataGrid, [{
    key: "renderRowHeaders",
    value: function renderRowHeaders() {
      return null;
    }
  }, {
    key: "renderRowGridData",
    value: function renderRowGridData() {
      return null;
    }
  }]);

  return ColumnDataGrid;
}(_data_grid__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"]);

/* harmony default export */ __webpack_exports__["a"] = (ColumnDataGrid);

/***/ }),
/* 210 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var lodash_values__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(127);
/* harmony import */ var lodash_values__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(lodash_values__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var lodash_sortBy__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(211);
/* harmony import */ var lodash_sortBy__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(lodash_sortBy__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(123);
/* harmony import */ var _pagination__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(212);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(115);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_12__);














var _ref =
/*#__PURE__*/
_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("a", {
  href: ""
}, void 0, "...");

var DataGrid =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(DataGrid, _Component);

  function DataGrid(props) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, DataGrid);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(DataGrid).call(this, props));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(DataGrid, [{
    key: "renderColumnHeaders",
    value: function renderColumnHeaders(headers) {
      var l = this.context.i18n.l;
      var headerKeys = Object.keys(headers);

      if (headerKeys.length > 0) {
        return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("ul", {
          className: "data-grid__column-headers"
        }, void 0, headerKeys.map(function (key) {
          return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("li", {
            className: "data-grid__column-headers__header data-grid__data-item-block ".concat(headers[key].class)
          }, void 0, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {}, void 0, l(DataGrid.getHeaderName(key, headers[key]))), headers[key] && headers[key].labelPostfix && _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("span", {
            className: "data-grid__row-headers__header__postfix"
          }, void 0, " - ".concat(l(headers[key].labelPostfix))));
        }));
      }
    }
  }, {
    key: "renderRowHeaders",
    value: function renderRowHeaders(rowHeaders) {
      var headers = [];
      headers = this.sortHeaders(rowHeaders);
      var l = this.context.i18n.l;
      return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("ul", {
        className: "data-grid__row-headers"
      }, void 0, headers.map(function (header) {
        return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("li", {
          className: "data-grid__row-headers__header data-grid__data-item-block"
        }, void 0, l(header.label), header.labelPostfix && _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("span", {
          className: "data-grid__row-headers__header__postfix"
        }, void 0, l(header.labelPostfix)));
      }));
    }
  }, {
    key: "sortHeaders",
    value: function sortHeaders(headers) {
      return lodash_sortBy__WEBPACK_IMPORTED_MODULE_9___default()(headers, function (header) {
        return header.order;
      });
    }
  }, {
    key: "onClickAction",
    value: function onClickAction(dataItemId, cb) {
      this.props.handleDataGridAction(dataItemId, cb);
    }
  }, {
    key: "renderDataItem",
    value: function renderDataItem(dataItem, header) {
      var _this = this;

      var actionsConfig = this.props.actionsConfig;
      var l = this.context.i18n.l;
      /*
      	rendering dataItem content as dangerouslySetInnerHTML to handle HTML entities like '&#2716;'
       	https://titobouzout.github.io/react/docs/jsx-gotchas.html#html-entities
      * */

      return header !== 'actions' ? _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("li", {
        dangerouslySetInnerHTML: {
          __html: dataItem[header]
        },
        className: "data-grid__data-rows__row__data-list__item data-grid__data-item-block"
      }) : _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("li", {
        className: "data-grid__data-rows__row__data-list__item data-grid__data-item-block"
      }, void 0, dataItem.actions.map(function (action) {
        var actionName = action.name.toLowerCase();
        return action.flag && _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("span", {
          className: "data-grid__data-rows__row__data-list__item data-grid__data-item-block__action-item"
        }, void 0, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()(_button__WEBPACK_IMPORTED_MODULE_10__[/* Button */ "a"], {
          onClick: function onClick() {
            _this.handleDataGridAction({
              id: dataItem.id,
              uri: action.uri
            }, actionsConfig[actionName].callback);
          },
          btnClassName: "btn btn-outline"
        }, void 0, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("i", {
          title: l(actionsConfig[actionName].label),
          className: "pe-7s-".concat(actionsConfig[actionName].icon)
        })));
      }));
    }
  }, {
    key: "renderDataGridRow",
    value: function renderDataGridRow(dataItem, headers) {
      var _this2 = this;

      var renderCustomDataItem = this.props.renderCustomDataItem;
      var headerKeys = Object.keys(headers);
      var _this$context = this.context,
          screenSize = _this$context.screenSize,
          l = _this$context.i18n.l;
      return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("ul", {
        className: "data-grid__data-rows__row__data-list"
      }, void 0, screenSize > 2 ? headerKeys.map(function (key) {
        return typeof renderCustomDataItem === 'function' ? renderCustomDataItem(dataItem, key) : _this2.renderDataItem(dataItem, key);
      }) : headerKeys.map(function (key) {
        return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("li", {
          className: "data-grid__data-rows__row__data-list__data-item-with-header"
        }, void 0, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
          className: "data-grid__data-rows__row__data-list__data-item-with-header__header"
        }, void 0, l(DataGrid.getHeaderName(key, headers[key]))), _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
          className: "data-grid__data-rows__row__data-list__data-item-with-header__value"
        }, void 0, typeof renderCustomDataItem === 'function' ? renderCustomDataItem(dataItem, key) : _this2.renderDataItem(dataItem, key)));
      }));
    }
  }, {
    key: "renderRowGridData",
    value: function renderRowGridData(data, rowHeaders) {
      if (rowHeaders.length > 0) {
        return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("ul", {
          className: "data-grid__data-rows"
        }, void 0, rowHeaders.map(function (header) {
          return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("li", {
            className: "data-grid__data-rows__row"
          }, void 0, data[header.key]);
        }));
      }
    }
  }, {
    key: "renderColumnGridData",
    value: function renderColumnGridData(data, headers) {
      var _this3 = this;

      var renderCustomDataGridRow = this.props.renderCustomDataGridRow;
      return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("ul", {
        className: "data-grid__data-rows"
      }, void 0, data.map(function (dataItem, index) {
        return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("li", {
          className: "data-grid__data-rows__row"
        }, void 0, typeof renderCustomDataGridRow === 'function' ? renderCustomDataGridRow(dataItem, index, headers) : _this3.renderDataGridRow(dataItem, headers));
      }));
    }
  }, {
    key: "renderPagination",
    value: function renderPagination() {
      var _this$props = this.props,
          handlePageClick = _this$props.handlePageClick,
          pageCount = _this$props.pageCount,
          currentPage = _this$props.currentPage;
      var screenSize = this.context.screenSize;
      return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: "data-grid__pagination-wrapper"
      }, void 0, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()(_pagination__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], {
        previousLabel: 'previous',
        forcePage: currentPage - 1,
        nextLabel: 'next',
        breakLabel: _ref,
        breakClassName: 'break-me',
        pageCount: pageCount,
        marginPagesDisplayed: 2,
        pageRangeDisplayed: 5,
        onPageChange: handlePageClick,
        containerClassName: 'pagination',
        hidePageNumbers: screenSize === 1,
        subContainerClassName: 'pages pagination',
        activeClassName: 'active'
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          data = _this$props2.data,
          isPaginationRequired = _this$props2.isPaginationRequired,
          headers = _this$props2.headers,
          renderCustomHeaders = _this$props2.renderCustomHeaders,
          className = _this$props2.className;
      var screenSize = this.context.screenSize;
      return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: classnames__WEBPACK_IMPORTED_MODULE_12___default()("data-grid", className)
      }, void 0, screenSize > 2 && (typeof renderCustomHeaders === 'function' ? renderCustomHeaders() : this.renderColumnHeaders(headers)), this.renderRowHeaders(headers), this.renderRowGridData(data, headers), this.renderColumnGridData(data, headers), isPaginationRequired && !frameworkGlobals.isServer && this.renderPagination());
    }
  }], [{
    key: "getHeaderName",
    value: function getHeaderName(header, config) {
      return config.label || header;
    }
  }]);

  return DataGrid;
}(react__WEBPACK_IMPORTED_MODULE_6__["Component"]);

DataGrid.propTypes = {
  headers: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.object,
  actionsConfig: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.object,
  handleDataGridAction: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.func,
  pageCount: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.number,
  currentPage: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.number,
  handlePageClick: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.func,
  isPaginationRequired: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.bool,
  renderCustomColumnHeaders: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.func,
  renderCustomDataItem: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.func,
  renderCustomDataGridRow: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.func
};
DataGrid.defaultProps = {
  headers: {},
  actionsConfig: {},
  handleDataGridAction: function handleDataGridAction() {},
  isPaginationRequired: false
};
DataGrid.contextTypes = {
  i18n: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.object,
  screenSize: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.number
};
/* harmony default export */ __webpack_exports__["a"] = (DataGrid);

/***/ }),
/* 211 */,
/* 212 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _pagination__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(213);

/* harmony default export */ __webpack_exports__["a"] = (_pagination__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);

/***/ }),
/* 213 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Pagination; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(115);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react_addons_create_fragment__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(214);
/* harmony import */ var react_addons_create_fragment__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_addons_create_fragment__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _PageView__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(215);
/* harmony import */ var _BreakView__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(216);














var Pagination =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default()(Pagination, _Component);

  function Pagination(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, Pagination);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Pagination).call(this, props));

    _this.handlePreviousPage = function (evt) {
      evt.preventDefault ? evt.preventDefault() : evt.returnValue = false;

      if (_this.state.selected > 0) {
        _this.handlePageSelected(_this.state.selected - 1, evt);
      }
    };

    _this.handleNextPage = function (evt) {
      evt.preventDefault ? evt.preventDefault() : evt.returnValue = false;

      if (_this.state.selected < _this.props.pageCount - 1) {
        _this.handlePageSelected(_this.state.selected + 1, evt);
      }
    };

    _this.handlePageSelected = function (selected, evt) {
      evt.preventDefault ? evt.preventDefault() : evt.returnValue = false;

      if (_this.state.selected === selected) {
        return;
      }

      _this.setState({
        selected: selected
      }); // Call the callback with the new selected item:
      // add +1 , since 0 based index


      _this.callCallback(selected + 1);
    };

    _this.callCallback = function (selectedItem) {
      if (typeof _this.props.onPageChange !== 'undefined' && typeof _this.props.onPageChange === 'function') {
        _this.props.onPageChange({
          selected: selectedItem
        });
      }
    };

    _this.pagination = function () {
      var items = {};

      if (_this.props.pageCount <= _this.props.pageRangeDisplayed) {
        for (var index = 0; index < _this.props.pageCount; index++) {
          items['key' + index] = _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_1___default()(_PageView__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], {
            onClick: _this.handlePageSelected.bind(null, index),
            selected: _this.state.selected === index,
            pageClassName: _this.props.pageClassName,
            pageLinkClassName: _this.props.pageLinkClassName,
            activeClassName: _this.props.activeClassName,
            page: index + 1
          });
        }
      } else {
        var leftSide = _this.props.pageRangeDisplayed / 2;
        var rightSide = _this.props.pageRangeDisplayed - leftSide;

        if (_this.state.selected > _this.props.pageCount - _this.props.pageRangeDisplayed / 2) {
          rightSide = _this.props.pageCount - _this.state.selected;
          leftSide = _this.props.pageRangeDisplayed - rightSide;
        } else if (_this.state.selected < _this.props.pageRangeDisplayed / 2) {
          leftSide = _this.state.selected;
          rightSide = _this.props.pageRangeDisplayed - leftSide;
        }

        var _index;

        var page;
        var breakView;

        for (_index = 0; _index < _this.props.pageCount; _index++) {
          page = _index + 1;

          var pageView = _this.getPageElement(_index);

          if (page <= _this.props.marginPagesDisplayed) {
            items['key' + _index] = pageView;
            continue;
          }

          if (page > _this.props.pageCount - _this.props.marginPagesDisplayed) {
            items['key' + _index] = pageView;
            continue;
          }

          if (_index >= _this.state.selected - leftSide && _index <= _this.state.selected + rightSide) {
            items['key' + _index] = pageView;
            continue;
          }

          var keys = Object.keys(items);
          var breakLabelKey = keys[keys.length - 1];
          var breakLabelValue = items[breakLabelKey];

          if (_this.props.breakLabel && breakLabelValue !== breakView) {
            breakView = _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_1___default()(_BreakView__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"], {
              breakLabel: _this.props.breakLabel,
              breakClassName: _this.props.breakClassName
            });
            items['key' + _index] = breakView;
          }
        }
      }

      return items;
    };

    _this.state = {
      selected: props.initialPage ? props.initialPage : props.forcePage ? props.forcePage : 0
    };
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(Pagination, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // Call the callback with the initialPage item:
      if (typeof this.props.initialPage !== 'undefined' && !this.props.disableInitialCallback) {
        this.callCallback(this.props.initialPage);
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (typeof nextProps.forcePage !== 'undefined' && this.props.forcePage !== nextProps.forcePage) {
        this.setState({
          selected: nextProps.forcePage
        });
      }
    }
  }, {
    key: "hrefBuilder",
    value: function hrefBuilder(pageIndex) {
      if (this.props.hrefBuilder && pageIndex !== this.state.selected && pageIndex >= 0 && pageIndex < this.props.pageCount) {
        return this.props.hrefBuilder(pageIndex + 1);
      }
    }
  }, {
    key: "getPageElement",
    value: function getPageElement(index) {
      return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_1___default()(_PageView__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], {
        onClick: this.handlePageSelected.bind(null, index),
        selected: this.state.selected === index,
        pageClassName: this.props.pageClassName,
        pageLinkClassName: this.props.pageLinkClassName,
        activeClassName: this.props.activeClassName,
        href: this.hrefBuilder(index),
        page: index + 1
      });
    }
  }, {
    key: "render",
    value: function render() {
      var l = this.context.i18n.l;
      var disabled = this.props.disabledClassName;
      var hidePageNumbers = this.props.hidePageNumbers;
      var previousClasses = classnames__WEBPACK_IMPORTED_MODULE_9___default()(this.props.previousClassName, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({}, disabled, this.state.selected === 0));
      var nextClasses = classnames__WEBPACK_IMPORTED_MODULE_9___default()(this.props.nextClassName, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({}, disabled, this.state.selected === this.props.pageCount - 1));
      return this.props.pageCount > 1 ? _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_1___default()("ul", {
        className: this.props.containerClassName
      }, void 0, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_1___default()("li", {
        className: previousClasses
      }, void 0, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_1___default()("a", {
        onClick: this.handlePreviousPage,
        className: this.props.previousLinkClassName,
        href: this.hrefBuilder(this.state.selected - 1),
        tabIndex: "0",
        onKeyPress: this.handlePreviousPage
      }, void 0, l(this.props.previousLabel.toUpperCase()))), !hidePageNumbers && react_addons_create_fragment__WEBPACK_IMPORTED_MODULE_10___default()(this.pagination()), _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_1___default()("li", {
        className: nextClasses
      }, void 0, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_1___default()("a", {
        onClick: this.handleNextPage,
        className: this.props.nextLinkClassName,
        href: this.hrefBuilder(this.state.selected + 1),
        tabIndex: "0",
        onKeyPress: this.handleNextPage
      }, void 0, l(this.props.nextLabel.toUpperCase())))) : null;
    }
  }]);

  return Pagination;
}(react__WEBPACK_IMPORTED_MODULE_7__["Component"]);

Pagination.propTypes = {
  pageCount: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.number.isRequired,
  pageRangeDisplayed: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.number.isRequired,
  marginPagesDisplayed: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.number.isRequired,
  previousLabel: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.node,
  nextLabel: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.node,
  breakLabel: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.node,
  hrefBuilder: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.func,
  onPageChange: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.func,
  initialPage: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.number,
  forcePage: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.number,
  disableInitialCallback: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.bool,
  containerClassName: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.string,
  pageClassName: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.string,
  pageLinkClassName: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.string,
  activeClassName: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.string,
  previousClassName: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.string,
  nextClassName: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.string,
  previousLinkClassName: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.string,
  nextLinkClassName: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.string,
  disabledClassName: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.string,
  breakClassName: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.string,
  hidePageNumbers: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.bool
};
Pagination.defaultProps = {
  pageCount: 10,
  pageRangeDisplayed: 2,
  marginPagesDisplayed: 3,
  activeClassName: 'selected',
  previousClassName: 'previous',
  nextClassName: 'next',
  previousLabel: 'Previous',
  nextLabel: 'Next',
  breakLabel: '...',
  disabledClassName: 'disabled',
  disableInitialCallback: false,
  hidePageNumbers: false
};
Pagination.contextTypes = {
  i18n: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.object
};


/***/ }),
/* 214 */,
/* 215 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageView; });
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);








var PageView =
/*#__PURE__*/
function (_React$Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(PageView, _React$Component);

  function PageView() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, PageView);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(PageView).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(PageView, [{
    key: "render",
    value: function render() {
      var cssClassName = this.props.pageClassName;
      var linkClassName = this.props.pageLinkClassName;
      var onClick = this.props.onClick;
      var href = this.props.href;

      if (this.props.selected) {
        if (typeof cssClassName !== 'undefined') {
          cssClassName = cssClassName + ' ' + this.props.activeClassName;
        } else {
          cssClassName = this.props.activeClassName;
        }
      }

      return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("li", {
        className: cssClassName
      }, void 0, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("a", {
        onClick: onClick,
        className: linkClassName,
        href: href,
        tabIndex: "0",
        onKeyPress: onClick
      }, void 0, this.props.page));
    }
  }]);

  return PageView;
}(react__WEBPACK_IMPORTED_MODULE_6___default.a.Component);



/***/ }),
/* 216 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BreakView; });
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);








var BreakView =
/*#__PURE__*/
function (_React$Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(BreakView, _React$Component);

  function BreakView() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, BreakView);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(BreakView).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(BreakView, [{
    key: "render",
    value: function render() {
      var label = this.props.breakLabel;
      var className = this.props.breakClassName || 'break';
      return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("li", {
        className: className
      }, void 0, label);
    }
  }]);

  return BreakView;
}(react__WEBPACK_IMPORTED_MODULE_6___default.a.Component);



/***/ }),
/* 217 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SwitcherComponent; });
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _default_component_default_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(133);
/* harmony import */ var _common_switch_switch__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(218);










var SwitcherComponent =
/*#__PURE__*/
function (_DefaultComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(SwitcherComponent, _DefaultComponent);

  function SwitcherComponent(props) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, SwitcherComponent);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(SwitcherComponent).call(this, props));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(SwitcherComponent, [{
    key: "onChange",
    value: function onChange(evt) {
      var _this$props$data = this.props.data,
          data = _this$props$data === void 0 ? {} : _this$props$data;
      var storeValue = data.isReverse ? String(!evt.currentTarget.checked) : String(evt.currentTarget.checked);
      this.props.storeValue(this.props.id, storeValue);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          l = _this$props.l,
          _this$props$data2 = _this$props.data,
          data = _this$props$data2 === void 0 ? '' : _this$props$data2,
          label = _this$props.label;
      var value = data && data.value || 'false';
      var boolValue = data.isReverse ? !this.getBoolean(value) : this.getBoolean(value);
      return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
        ref: "bar",
        className: "simple-switcher__wrapper"
      }, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("span", {}, void 0, l(label)), _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()(_common_switch_switch__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], {
        onChange: this.onChange.bind(this),
        id: "switch".concat(this.state.uniqueId),
        l: l,
        checked: boolValue
      }, this.state.uniqueId));
    }
  }]);

  return SwitcherComponent;
}(_default_component_default_component__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"]);



/***/ }),
/* 218 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(115);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);



/* harmony default export */ __webpack_exports__["a"] = (function (_ref) {
  var _ref$id = _ref.id,
      id = _ref$id === void 0 ? '' : _ref$id,
      _ref$name = _ref.name,
      name = _ref$name === void 0 ? '' : _ref$name,
      checked = _ref.checked,
      _ref$label = _ref.label,
      label = _ref$label === void 0 ? '' : _ref$label,
      className = _ref.className,
      onChange = _ref.onChange,
      l = _ref.l;
  return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {}, void 0, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("input", {
    type: "checkbox",
    onChange: onChange,
    id: id,
    name: name,
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()("switch-input", className),
    checked: checked
  }), _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("label", {
    htmlFor: id,
    className: "switch-label"
  }, void 0, label, " ", _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("span", {
    className: "toggle--on"
  }, void 0, l('YES')), _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("span", {
    className: "toggle--off"
  }, void 0, l('NO'))));
});

/***/ }),
/* 219 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IconCheckboxComponent; });
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _checkbox__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(203);









/**
 * @description Renders a icon version of the checkbox component
 */

var IconCheckboxComponent =
/*#__PURE__*/
function (_CheckboxComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(IconCheckboxComponent, _CheckboxComponent);

  function IconCheckboxComponent() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, IconCheckboxComponent);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(IconCheckboxComponent).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(IconCheckboxComponent, [{
    key: "renderCheckboxLabel",
    value: function renderCheckboxLabel(identifier) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var l = this.props.l;
      return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("label", {
        htmlFor: identifier
      }, "".concat(identifier, "_label"), options.icon && _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("i", {
        className: "icon-propshub pe-7s-".concat(options.icon)
      }), l(options.label), this.renderLabelInfo());
    }
  }]);

  return IconCheckboxComponent;
}(_checkbox__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"]);

IconCheckboxComponent.propTypes = {
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.array
};
IconCheckboxComponent.defaultProps = {
  classNames: ['schema__options', 'schema__checkbox', 'schema__checkbox__icon']
};


/***/ }),
/* 220 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IconCheckboxValuesComponent; });
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _checkbox__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(203);









/**
 * @description Renders a icon version of the checkbox component
 */

var IconCheckboxValuesComponent =
/*#__PURE__*/
function (_CheckboxComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(IconCheckboxValuesComponent, _CheckboxComponent);

  function IconCheckboxValuesComponent(props) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, IconCheckboxValuesComponent);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(IconCheckboxValuesComponent).call(this, props));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(IconCheckboxValuesComponent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var cid = this.props.parent().conditionalId || '',
          _this$props$data$valu = this.props.data.value,
          value = _this$props$data$valu === void 0 ? '' : _this$props$data$valu;

      if (cid && value) {
        this.generateConditionalValues(cid, value, 'add');
      }
    }
  }, {
    key: "generateConditionalValues",
    value: function generateConditionalValues(cid, value, action) {
      var values = this.props.getDataByID(cid) && this.props.getDataByID(cid).split(',') || [];
      var conditionalData = IconCheckboxValuesComponent.actionHandlers[action](values, value);
      this.props.storeValue(cid, conditionalData);
    }
  }, {
    key: "renderCheckboxLabel",
    value: function renderCheckboxLabel(identifier) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var l = this.props.l;
      return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("label", {
        htmlFor: identifier
      }, "".concat(identifier, "_label"), options.icon && _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("i", {
        className: "icon-propshub pe-7s-".concat(options.icon)
      }), l(options.label), this.renderLabelInfo());
    }
  }, {
    key: "renderCheckbox",
    value: function renderCheckbox(value, options) {
      var _this = this;

      var identifier = "".concat(this.state.uniqueId, "-").concat(options.value),
          checkValue = this.getBoolean(value),
          className = this.getValueClassNames();
      return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: className,
        "aria-labelledby": "".concat(this.state.uniqueId, "__label")
      }, void 0, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: "schema__checkbox__values__item"
      }, void 0, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("input", {
        ref: "input",
        type: "checkbox",
        id: identifier,
        name: identifier,
        "data-automation-selector": this.getDataId("option_".concat(options.value)),
        key: "".concat(this.state.uniqueId, "_input"),
        value: options.optionValue,
        checked: value === options.optionValue ? true : false,
        "data-tealium-narrative": options.label,
        onChange: function onChange(e) {
          _this.onChange(e, options.optionValue);
        }
      }), this.renderCheckboxLabel(identifier, options)));
    }
  }, {
    key: "onChange",
    value: function onChange(e, value) {
      var checkValue = '',
          action = '';
      var cid = this.props.parent().conditionalId || '';

      if (e.currentTarget.checked) {
        checkValue = value;
        action = 'add';
      } else {
        checkValue = '';
        action = 'delete';
      }

      cid && this.generateConditionalValues(cid, value, action);
      this.props.storeValue(this.props.id, String(checkValue));
    }
  }]);

  return IconCheckboxValuesComponent;
}(_checkbox__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"]);

IconCheckboxValuesComponent.propTypes = {
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.array
};
IconCheckboxValuesComponent.defaultProps = {
  classNames: ['schema__options', 'schema__checkbox', 'schema__checkbox__icon']
};
IconCheckboxValuesComponent.actionHandlers = {
  add: function add(list, value) {
    list.push(value);
    return list.join(",");
  },
  delete: function _delete(list, value) {
    return list.filter(function (e) {
      return e !== value;
    }).join(",");
  }
};


/***/ }),
/* 221 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IconCheckboxShortComponent; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _icon_checkbox__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(219);







/**
 * @description Renders a icon version of the checkbox component
 */

var IconCheckboxShortComponent =
/*#__PURE__*/
function (_IconCheckboxComponen) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(IconCheckboxShortComponent, _IconCheckboxComponen);

  function IconCheckboxShortComponent() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, IconCheckboxShortComponent);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(IconCheckboxShortComponent).apply(this, arguments));
  }

  return IconCheckboxShortComponent;
}(_icon_checkbox__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"]);

IconCheckboxShortComponent.propTypes = {
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.array
};
IconCheckboxShortComponent.defaultProps = {
  classNames: ['schema__options', 'schema__checkbox', 'schema__checkbox__icon', 'schema__checkbox__icon__short']
};


/***/ }),
/* 222 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MultiOptionsPillsComponent; });
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(94);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(132);
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _default_component_default_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(133);
/* harmony import */ var _common_pills_suggestions_pills_suggestions__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(223);













var MultiOptionsPillsComponent =
/*#__PURE__*/
function (_DefaultComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default()(MultiOptionsPillsComponent, _DefaultComponent);

  function MultiOptionsPillsComponent(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, MultiOptionsPillsComponent);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(MultiOptionsPillsComponent).call(this, props));
    _this.handleAddition = _this.handleAddition.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this));
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(MultiOptionsPillsComponent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // if length of children
      // update conditional id with null
      if (this.props.conditionalId && this.props.children.length && !this.props.getDataByID(this.props.conditionalId)) {
        this.props.storeValue(this.props.conditionalId, 'haveValue');
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      // if length of children
      // update conditional id with null
      if (this.props.conditionalId && !this.props.children.length && this.props.getDataByID(this.props.conditionalId)) {
        this.props.storeValue(this.props.conditionalId, '');
      }
    }
  }, {
    key: "renderLabel",
    value: function renderLabel(label) {
      var l = this.props.l;
      return this.props.writeMode ? null : _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(MultiOptionsPillsComponent.prototype), "renderLabel", this).call(this, l(label));
    }
  }, {
    key: "handleAddition",
    value: function handleAddition(pill, index) {
      var _this$props$data$opti = this.props.data.options,
          options = _this$props$data$opti === void 0 ? '' : _this$props$data$opti;
      var selfIndex = this.props.root().children.length;
      var key = this.props.root().data.key++;
      this.props.root().inject([this.props.root().pillCloneChild], selfIndex, key);
      var storeId = this.props.root().pillCloneChild.id.replace(/\*/, key);
      var pillValue = options && typeof index === 'number' && options[index].value || pill;
      this.props.storeValue(storeId, pillValue);

      if (this.props.conditionalId && !this.props.getDataByID(this.props.conditionalId)) {
        this.props.storeValue(this.props.conditionalId, 'haveValue');
      }
    }
  }, {
    key: "renderMultiPillsSuggestions",
    value: function renderMultiPillsSuggestions(value, options) {
      var l = this.props.l;
      var labelClassName = this.getLabelClassNames(),
          className = this.getValueClassNames(),
          suggestions = options && options.map(function (optionsObject) {
        return l(optionsObject.label);
      });
      return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("span", {
        className: className
      }, void 0, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: "schema__dropdown__wrapper"
      }, void 0, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("label", {
        className: labelClassName,
        htmlFor: this.state.uniqueId,
        "data-automation-selector": this.getDataId('label')
      }, void 0, l(this.props.label), this.renderLabelInfo(), this.renderTooltip()), _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: "schema__pills__wrapper ".concat(this.props.data.isFullPill ? 'full-pills' : '')
      }, void 0, this.props.children), _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()(_common_pills_suggestions_pills_suggestions__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], {
        pills: [],
        errorClass: this.props.error,
        isAddNewPill: this.props.data.isAddNewPill,
        isFullPill: this.props.data.isFullPill,
        suggestions: suggestions,
        renderPill: function renderPill() {},
        renderPills: function renderPills() {},
        handleAddition: this.handleAddition,
        minQueryLength: 1,
        placeholder: l(this.props.placeHolder) || l(this.props.label),
        translator: l
      })), this.props.error && _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: "schema__error"
      }, "error", this.renderErrorMessage(this.props.error)));
    }
  }, {
    key: "renderReadValue",
    value: function renderReadValue(value) {
      var label = (this.props.data.options.filter(function (option) {
        return option.value === value;
      })[0] || {}).label;

      if (typeof label === 'undefined') {
        console.error('VALUE NOT FOUND', this.props);
      }

      return _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(MultiOptionsPillsComponent.prototype), "renderValue", this).call(this, label);
    }
  }, {
    key: "renderValue",
    value: function renderValue(value) {
      var options = this.props.data.options;
      return this.props.writeMode ? this.renderMultiPillsSuggestions(value, options) : this.renderReadValue(value);
    }
  }]);

  return MultiOptionsPillsComponent;
}(_default_component_default_component__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"]);

MultiOptionsPillsComponent.propTypes = {
  label: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.string,
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.array,
  disabled: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.bool
};
MultiOptionsPillsComponent.defaultProps = {
  label: '',
  disabled: false,
  classNames: ['schema__options', 'schema__multi__dropdown']
};


/***/ }),
/* 223 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PillsSuggestions; });
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(94);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _suggestions__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(224);









function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }




/*import Tag from "./pills";*/
// Constants

var Keys = {
  ENTER: 13,
  TAB: 9,
  BACKSPACE: 8,
  UP_ARROW: 38,
  DOWN_ARROW: 40,
  ESCAPE: 27
};
var DEFAULT_PLACEHOLDER = "Add new tag";
var DefaultClassNames = {
  tags: "pills-suggestions__tags",
  tagInput: "pills-suggestions__tagInput",
  tagInputField: "pills-suggestions__pill-input-field",
  selected: "ReactTags__selected",
  tag: "ReactTags__tag",
  remove: "ReactTags__remove",
  suggestions: "ReactTags__suggestions",
  activeSuggestion: "ReactTags__activeSuggestion"
};

var _ref =
/*#__PURE__*/
_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("i", {
  className: "pe-7s-plus"
});

var PillsSuggestions =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default()(PillsSuggestions, _Component);

  function PillsSuggestions(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, PillsSuggestions);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(PillsSuggestions).call(this, props));
    _this.state = {
      suggestions: _this.props.suggestions,
      query: "",
      selectedIndex: -1,
      selectionMode: false,
      showDefaultSuggestions: false
    };
    _this.handleBlur = _this.handleBlur.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this));
    _this.handleFocus = _this.handleFocus.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this));
    _this.handleKeyDown = _this.handleKeyDown.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this));
    _this.handleChange = _this.handleChange.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this));
    _this.handlePaste = _this.handlePaste.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this));
    _this.resetAndFocusInput = _this.resetAndFocusInput.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this));
    _this.handleSuggestionHover = _this.handleSuggestionHover.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this));
    _this.handleSuggestionClick = _this.handleSuggestionClick.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this));
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(PillsSuggestions, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.setState({
        classNames: _objectSpread({}, DefaultClassNames, {}, this.props.classNames)
      });
    }
  }, {
    key: "resetAndFocusInput",
    value: function resetAndFocusInput() {
      this.textInput.value = "";
      this.textInput.focus();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          autofocus = _this$props.autofocus,
          updateInputValue = _this$props.updateInputValue,
          defaultInputValue = _this$props.defaultInputValue;

      if (autofocus && !updateInputValue) {
        this.resetAndFocusInput();
      }

      if (updateInputValue) {
        this.textInput.value = defaultInputValue;
      }
    }
  }, {
    key: "filteredSuggestions",
    value: function filteredSuggestions(query, suggestions) {
      if (this.props.handleFilterSuggestions) {
        return this.props.handleFilterSuggestions(query, suggestions);
      }

      return suggestions.filter(function (item) {
        return item.toLowerCase().indexOf(query.toLowerCase()) === 0;
      });
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(props) {
      var suggestions = this.filteredSuggestions(this.state.query, props.suggestions);
      this.setState({
        showDefaultSuggestions: false,
        suggestions: suggestions,
        classNames: _objectSpread({}, DefaultClassNames, {}, props.classNames)
      });
    }
  }, {
    key: "handleDelete",
    value: function handleDelete(i, e) {
      this.props.handleDelete && this.props.handleDelete(i);
      this.setState({
        query: ""
      });
      this.resetAndFocusInput();
    }
  }, {
    key: "handleChange",
    value: function handleChange(e) {
      if (this.props.handleInputChange) {
        this.props.handleInputChange(e.target.value.trim());
      }

      var query = e.target.value.trim();
      var suggestions = this.filteredSuggestions(query, this.props.suggestions);
      this.setState({
        query: query,
        suggestions: suggestions,
        showAddPill: query.length > 0,
        selectedIndex: 0 // always default to first on changes

      });
    }
  }, {
    key: "handleBlur",
    value: function handleBlur(e) {
      var value = e.target.value.trim();

      if (this.props.handleInputBlur) {
        this.props.handleInputBlur(value);
        this.textInput.value = "";
      }

      this.setState({
        query: '',
        suggestions: [],
        selectedIndex: -1
      });
    }
  }, {
    key: "handleFocus",
    value: function handleFocus(e) {
      if (!this.props.showOnFocus) {
        return;
      }

      var query = e.target.value.trim();
      var suggestions = this.props.suggestions;
      var selectedIndex = 0; // if(query) {
      // 	suggestions = this.filteredSuggestions(query, suggestions);
      // }

      this.setState({
        query: query,
        suggestions: suggestions,
        selectedIndex: selectedIndex,
        selectionMode: true,
        showDefaultSuggestions: this.props.showOnFocus
      });
    }
  }, {
    key: "handleKeyDown",
    value: function handleKeyDown(e) {
      var _this$state = this.state,
          query = _this$state.query,
          selectedIndex = _this$state.selectedIndex,
          suggestions = _this$state.suggestions; // hide suggestions menu on escape

      if (e.keyCode === Keys.ESCAPE) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
          selectedIndex: -1,
          selectionMode: false,
          suggestions: []
        });
      } // When one of the terminating keys is pressed, add current query to the tags.
      // If no text is typed in so far, ignore the action - so we don't end up with a terminating
      // character typed in.


      if (this.props.delimiters.indexOf(e.keyCode) !== -1 && !e.shiftKey) {
        if (e.keyCode !== Keys.TAB || !this.props.showOnFocus && query !== "") {
          e.preventDefault();
        }

        if (this.props.showOnFocus || query !== "") {
          if (this.state.selectionMode && this.state.selectedIndex != -1) {
            query = this.state.suggestions[this.state.selectedIndex];
          }

          this.addPill(query);
        }
      } // when backspace key is pressed and query is blank, delete tag


      if (e.keyCode === Keys.BACKSPACE && query == "" && this.props.allowDeleteFromEmptyInput) {
        this.handleDelete(this.props.pills.length - 1);
      } // up arrow


      if (e.keyCode === Keys.UP_ARROW) {
        e.preventDefault();
        var _this$state2 = this.state,
            _selectedIndex = _this$state2.selectedIndex,
            _suggestions = _this$state2.suggestions;
        _selectedIndex = _selectedIndex <= 0 ? 0 : _selectedIndex - 1;
        this.setState({
          selectedIndex: _selectedIndex,
          selectionMode: true
        });
      } // down arrow


      if (e.keyCode === Keys.DOWN_ARROW) {
        console.log('down');
        e.preventDefault();
        this.setState({
          selectedIndex: (this.state.selectedIndex + 1) % suggestions.length,
          selectionMode: true
        });
      }
    }
  }, {
    key: "handlePaste",
    value: function handlePaste(e) {
      var _this2 = this;

      e.preventDefault(); // See: http://stackoverflow.com/a/6969486/1463681

      var escapeRegex = function escapeRegex(str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
      }; // Used to determine how the pasted content is split.


      var delimiterChars = escapeRegex(this.props.delimiters.map(function (delimiter) {
        // See: http://stackoverflow.com/a/34711175/1463681
        var chrCode = delimiter - 48 * Math.floor(delimiter / 48);
        return String.fromCharCode(96 <= delimiter ? chrCode : delimiter);
      }).join(""));
      var clipboardData = e.clipboardData || window.clipboardData;
      var string = clipboardData.getData("text");
      var regExp = new RegExp("[".concat(delimiterChars, "]+"));
      string.split(regExp).forEach(function (tag) {
        return _this2.props.handleAddition(tag);
      });
    }
  }, {
    key: "addPill",
    value: function addPill(tag, i) {
      if (this.props.autocomplete) {
        var possibleMatches = this.filteredSuggestions(tag, this.props.suggestions);

        if (this.props.autocomplete === 1 && possibleMatches.length === 1 || this.props.autocomplete === true && possibleMatches.length) {
          tag = possibleMatches[0];
        }
      } // call method to add


      this.props.handleAddition(tag, i); // reset the state

      this.setState({
        query: "",
        selectionMode: false,
        selectedIndex: -1,
        showAddPill: false
      });

      if (this.props.updateInputValue) {
        this.textInput.value = tag;
      } else {
        this.resetAndFocusInput();
      }
    }
  }, {
    key: "handleSuggestionClick",
    value: function handleSuggestionClick(e, i) {
      this.addPill(this.state.suggestions[i], i);
    }
  }, {
    key: "handleSuggestionHover",
    value: function handleSuggestionHover(i, e) {
      this.setState({
        selectedIndex: i,
        selectionMode: true
      });
    }
  }, {
    key: "renderPills",
    value: function renderPills() {
      var _this3 = this;

      var _this$props2 = this.props,
          pills = _this$props2.pills,
          isFullPill = _this$props2.isFullPill;
      var pillElements = pills.map(function (pill, index) {
        return _this3.props.renderPill(index, pill, isFullPill);
      });
      return pillElements;
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$state3 = this.state,
          query = _this$state3.query,
          selectedIndex = _this$state3.selectedIndex,
          suggestions = _this$state3.suggestions,
          showAddPill = _this$state3.showAddPill;
      var _this$props3 = this.props,
          placeholder = _this$props3.placeholder,
          maxLength = _this$props3.maxLength,
          isAddNewPill = _this$props3.isAddNewPill,
          errorClass = _this$props3.errorClass,
          translator = _this$props3.translator;
      return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: "pills-suggestions".concat(errorClass ? ' error' : '')
      }, void 0, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: "pills-suggestions__suggestions-wrapper"
      }, void 0, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: "pills-suggestions__input-wrapper"
      }, void 0, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("input", {
        ref: function ref(input) {
          _this4.textInput = input;
        },
        className: this.state.classNames.tagInputField,
        type: "text",
        placeholder: placeholder,
        "aria-label": placeholder,
        onBlur: this.handleBlur,
        onChange: this.handleChange,
        onKeyDown: this.handleKeyDown,
        onPaste: isAddNewPill && this.handlePaste,
        onFocus: this.handleFocus,
        name: this.props.name,
        id: this.props.id,
        maxLength: maxLength
      }), isAddNewPill && showAddPill && _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("button", {
        className: "btn btn-default pill-add-btn",
        onClick: function onClick() {
          _this4.addPill(_this4.textInput.value);
        }
      }, void 0, _ref, translator('ADD'))), _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: "pills-suggestions__pills-wrapper"
      }, void 0, this.renderPills()), _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()(_suggestions__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], {
        query: query.trim(),
        suggestions: suggestions,
        selectedIndex: selectedIndex,
        handleClick: this.handleSuggestionClick,
        handleHover: this.handleSuggestionHover,
        minQueryLength: this.props.minQueryLength,
        defaultShowSuggestions: this.state.showDefaultSuggestions,
        shouldRenderSuggestions: this.props.shouldRenderSuggestions,
        classNames: this.state.classNames
      })));
    }
  }]);

  return PillsSuggestions;
}(react__WEBPACK_IMPORTED_MODULE_8__["Component"]);

PillsSuggestions.PropTypes = {
  isAddNewPill: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.bool,
  isFullPill: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.bool,
  errorClass: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.string,
  placeholder: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.string,
  suggestions: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.array,
  delimiters: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.array,
  autofocus: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.bool,
  handleDelete: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.func.isRequired,
  handleAddition: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.func.isRequired,
  handleFilterSuggestions: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.func,
  allowDeleteFromEmptyInput: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.bool,
  handleInputChange: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.func,
  handleInputBlur: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.func,
  minQueryLength: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.number,
  shouldRenderSuggestions: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.func,
  removeComponent: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.func,
  autocomplete: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.bool, prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.number]),
  name: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.string,
  id: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.string,
  maxLength: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.string,
  showOnFocus: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.bool,
  pills: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.object.isRequired,
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.object,
  renderPill: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.func.isRequired,
  renderPills: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.func.isRequired,
  updateInputValue: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.bool
};
PillsSuggestions.defaultProps = {
  isAddNewPill: true,
  isFullPill: false,
  errorClass: null,
  placeholder: DEFAULT_PLACEHOLDER,
  pills: [],
  suggestions: [],
  delimiters: [Keys.ENTER, Keys.TAB],
  autofocus: false,
  showOnFocus: true,
  inline: true,
  allowDeleteFromEmptyInput: true,
  minQueryLength: 2,
  autocomplete: false,
  labelField: "text",
  renderPill: function renderPill() {},
  renderPills: function renderPills() {},
  updateInputValue: false
};


/***/ }),
/* 224 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Suggestions; });
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var lodash_isEqual__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(225);
/* harmony import */ var lodash_isEqual__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(lodash_isEqual__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_custom_scrollbars__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(181);
/* harmony import */ var react_custom_scrollbars__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_custom_scrollbars__WEBPACK_IMPORTED_MODULE_9__);










var MINQUESRYLENGTH = 2;

var maybeScrollSuggestionIntoView = function maybeScrollSuggestionIntoView(suggestionEl, suggestionsContainer) {
  var containerHeight = suggestionsContainer.offsetHeight;
  var suggestionHeight = suggestionEl.offsetHeight;
  var relativeSuggestionTop = suggestionEl.offsetTop - suggestionsContainer.scrollTop;

  if (relativeSuggestionTop + suggestionHeight >= containerHeight) {
    suggestionsContainer.scrollTop += relativeSuggestionTop - containerHeight + suggestionHeight;
  } else if (relativeSuggestionTop < 0) {
    suggestionsContainer.scrollTop += relativeSuggestionTop;
  }
};

var Suggestions =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(Suggestions, _Component);

  function Suggestions() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, Suggestions);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Suggestions).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(Suggestions, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      var props = this.props;
      var shouldRenderSuggestions = props.shouldRenderSuggestions || this.shouldRenderSuggestions;
      return !lodash_isEqual__WEBPACK_IMPORTED_MODULE_8___default()(props.suggestions, nextProps.suggestions, nextProps.defaultShowSuggestions) || shouldRenderSuggestions(nextProps.query, nextProps.minQueryLength, nextProps.defaultShowSuggestions) || shouldRenderSuggestions(nextProps.query, nextProps.minQueryLength, nextProps.defaultShowSuggestions) != shouldRenderSuggestions(props.query, props.minQueryLength, props.defaultShowSuggestions);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var suggestionsContainer = this.refs.suggestionsContainer;
      var _this$props = this.props,
          selectedIndex = _this$props.selectedIndex,
          classNames = _this$props.classNames;

      if (suggestionsContainer && prevProps.selectedIndex !== selectedIndex) {
        var activeSuggestion = suggestionsContainer.querySelector('pills-suggestions__suggestions__activeSuggestion');

        if (activeSuggestion) {
          maybeScrollSuggestionIntoView(activeSuggestion, suggestionsContainer);
        }
      }
    }
  }, {
    key: "markIt",
    value: function markIt(input, query) {
      var escapedRegex = query.trim().replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
      return {
        __html: input.replace(RegExp(escapedRegex, "gi"), "<mark>$&</mark>")
      };
    }
  }, {
    key: "shouldRenderSuggestions",
    value: function shouldRenderSuggestions(query, minQueryLength, defaultShowSuggestions) {
      return query.length >= minQueryLength || defaultShowSuggestions;
    }
  }, {
    key: "renderSuggestions",
    value: function renderSuggestions() {
      var _this = this;

      var _this$props2 = this.props,
          suggestions = _this$props2.suggestions,
          handleClick = _this$props2.handleClick,
          handleHover = _this$props2.handleHover,
          selectedIndex = _this$props2.selectedIndex,
          classNames = _this$props2.classNames,
          query = _this$props2.query;
      return suggestions.map(function (item, i) {
        return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("li", {
          onMouseDown: function onMouseDown(e) {
            return handleClick(e, i);
          },
          onMouseOver: function onMouseOver(e) {
            return handleHover(e, i);
          },
          className: i == selectedIndex ? 'pills-suggestions__suggestions__activeSuggestion' : ""
        }, i, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("span", {
          dangerouslySetInnerHTML: _this.markIt(item, query)
        }));
      });
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.shouldRenderSuggestions(this.props.query, this.props.minQueryLength, this.props.defaultShowSuggestions)) {
        return null;
      }

      return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
        ref: "suggestionsContainer",
        className: "pills-suggestions__suggestions"
      }, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("ul", {}, void 0, " ", this.renderSuggestions(), " "));
    }
  }]);

  return Suggestions;
}(react__WEBPACK_IMPORTED_MODULE_6__["Component"]);

Suggestions.propTypes = {
  query: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.string.isRequired,
  selectedIndex: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.number.isRequired,
  suggestions: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.array.isRequired,
  handleClick: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.func.isRequired,
  handleHover: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.func.isRequired,
  minQueryLength: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.number,
  shouldRenderSuggestions: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.func,
  defaultShowSuggestions: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.bool,
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.object
};
Suggestions.defaultProps = {
  minQueryLength: MINQUESRYLENGTH,
  defaultShowSuggestions: false
};


/***/ }),
/* 225 */,
/* 226 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PillComponent; });
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(94);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _common_chip_chip__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(227);
/* harmony import */ var _default_component_default_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(133);











var PillComponent =
/*#__PURE__*/
function (_DefaultComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default()(PillComponent, _DefaultComponent);

  function PillComponent(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, PillComponent);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(PillComponent).call(this, props));
    _this.handleDelete = _this.handleDelete.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this));
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(PillComponent, [{
    key: "renderLabel",
    value: function renderLabel() {
      return null;
    }
  }, {
    key: "handleDelete",
    value: function handleDelete() {
      this.props.remove();
    }
  }, {
    key: "renderValue",
    value: function renderValue(value) {
      var _this2 = this;

      var l = this.props.l;
      return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()(_common_chip_chip__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], {
        className: this.props.data.className,
        onClose: function onClose(e) {
          _this2.handleDelete();
        }
      }, void 0, l(value));
    }
  }]);

  return PillComponent;
}(_default_component_default_component__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"]);

PillComponent.defaultProps = {
  classNames: ['schema__pill']
};


/***/ }),
/* 227 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Chip; });
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(115);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);




var _ref =
/*#__PURE__*/
_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("i", {
  className: "pe-7s-close-circle"
});

function Chip(props) {
  return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()("chip ", props.className)
  }, void 0, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("span", {
    className: "chip__text"
  }, void 0, props.children), props.onClose && _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("button", {
    type: "button",
    className: "chip__action",
    onClick: props.onClose
  }, void 0, _ref));
}

/***/ }),
/* 228 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MultiOptionsPillsComponent; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(94);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(132);
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _default_component_default_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(133);
/* harmony import */ var _common_chip_chip__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(227);
/* harmony import */ var _common_pills_suggestions_pills_suggestions__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(223);
/* harmony import */ var lodash_findIndex__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(85);
/* harmony import */ var lodash_findIndex__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(lodash_findIndex__WEBPACK_IMPORTED_MODULE_14__);










function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }








var MultiOptionsPillsComponent =
/*#__PURE__*/
function (_DefaultComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_8___default()(MultiOptionsPillsComponent, _DefaultComponent);

  function MultiOptionsPillsComponent(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, MultiOptionsPillsComponent);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(MultiOptionsPillsComponent).call(this, props));
    _this.state = {
      pills: function () {
        var pills = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

        if (options.length === 0) {
          return pills.map(function (pill) {
            return pill;
          });
        }

        return pills.map(function (pill) {
          return props.l(options[lodash_findIndex__WEBPACK_IMPORTED_MODULE_14___default()(options, {
            "value": pill
          })].label);
        });
      }(props.data.value, props.data.options)
    };
    _this.handleDelete = _this.handleDelete.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this));
    _this.handleAddition = _this.handleAddition.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this));
    _this.renderPills = _this.renderPills.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this));
    _this.indexId = undefined;
    _this.storedPills = [];
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(MultiOptionsPillsComponent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var _this$state$pills = this.state.pills,
          pills = _this$state$pills === void 0 ? [] : _this$state$pills;
      pills.forEach(function (pill, index) {
        return _this2.onChange(pill, _this2.props.data.value[index]);
      });
    }
  }, {
    key: "renderLabel",
    value: function renderLabel(label) {
      var l = this.props.l;
      return this.props.writeMode ? null : _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(MultiOptionsPillsComponent.prototype), "renderLabel", this).call(this, l(label));
    }
  }, {
    key: "renderPills",
    value: function renderPills(pills) {
      return pills.map(function (pill) {
        return pill;
      });
    }
  }, {
    key: "handleDelete",
    value: function handleDelete(i) {
      var _this3 = this;

      var pills = this.state.pills;

      var strIndex = lodash_findIndex__WEBPACK_IMPORTED_MODULE_14___default()(this.storedPills, {
        "label": pills[i]
      });

      var id = "".concat(this.props.id, "(").concat(this.storedPills[strIndex].id, ")");
      pills.splice(i, 1);
      this.storedPills.splice(strIndex, 1);

      if (this.props.conditionalId && this.storedPills.length === 0) {
        this.props.storeValue(this.props.conditionalId, '');
      }

      this.setState({
        pills: pills
      }, function () {
        return _this3.props.removeDataByID(id);
      });
    }
  }, {
    key: "handleAddition",
    value: function handleAddition(pill, pillIndex) {
      var _this4 = this;

      var pills = this.state.pills; // don't add if already added

      if (pills.indexOf(pill) < 0 && pill !== '') {
        pills.push(pill);
        this.setState({
          pills: pills
        }, function () {
          return _this4.onChange(pill, pillIndex);
        });
      }
    }
  }, {
    key: "getSelectedIndex",
    value: function getSelectedIndex() {
      this.indexId = typeof this.indexId === 'undefined' ? 0 : Number(this.indexId) + 1;
      return this.indexId;
    }
  }, {
    key: "renderMultiPillsSuggestions",
    value: function renderMultiPillsSuggestions(value, options) {
      var _this5 = this;

      var l = this.props.l;
      var stringValue = this.convertValueToString(value),
          labelClassName = this.getLabelClassNames(),
          className = this.getValueClassNames(),
          selectDefaultOptionText = this.props.label === '' ? l('SELECTOPTION') : l(this.props.label),
          suggestions = options && options.map(function (optionsObject) {
        return l(optionsObject.label);
      });
      return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_1___default()("span", {
        className: className
      }, void 0, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_1___default()("div", {
        className: "schema__dropdown__wrapper"
      }, void 0, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_1___default()("label", {
        className: labelClassName,
        htmlFor: this.state.uniqueId,
        "data-automation-selector": this.getDataId('label')
      }, void 0, l(this.props.label), this.renderLabelInfo(), this.renderTooltip()), _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_1___default()(_common_pills_suggestions_pills_suggestions__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"], {
        pills: this.state.pills,
        errorClass: this.props.error,
        isAddNewPill: this.props.data.isAddNewPill,
        isFullPill: this.props.data.isFullPill,
        suggestions: suggestions,
        renderPill: function renderPill(index, pill, isFullPill) {
          return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_1___default()(_common_chip_chip__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"], {
            className: isFullPill ? "full-pill" : '',
            onClose: function onClose(e) {
              _this5.handleDelete(index);
            }
          }, void 0, l(pill)); //return <PillComponent pillLabel={l(pill)} className={isFullPill ? "full-pill" :''} />
        },
        renderPills: this.renderPills,
        handleAddition: this.handleAddition,
        minQueryLength: 1,
        placeholder: l(this.props.placeHolder) || l(this.props.label),
        translator: l
      })), this.props.error && _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_1___default()("div", {
        className: "schema__error"
      }, "error", this.renderErrorMessage(this.props.error)));
    }
  }, {
    key: "renderReadValue",
    value: function renderReadValue(value) {
      var label = (this.props.data.options.filter(function (option) {
        return option.value === value;
      })[0] || {}).label;

      if (typeof label === 'undefined') {
        console.error('VALUE NOT FOUND', this.props);
      }

      return _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(MultiOptionsPillsComponent.prototype), "renderValue", this).call(this, label);
    }
  }, {
    key: "renderValue",
    value: function renderValue(value) {
      var options = this.props.data.options;
      return this.props.writeMode ? this.renderMultiPillsSuggestions(value, options) : this.renderReadValue(value);
    }
  }, {
    key: "onChange",
    value: function onChange(value, pillIndex) {
      var pillOption = {};

      if (typeof pillIndex === 'number') {
        pillOption = this.props.data.options[Number(pillIndex)];
        pillOption.label = this.props.l(pillOption.label);
      } else {
        pillOption.value = pillIndex ? pillIndex : value;
        pillOption.label = value;
      }

      var selectedIndex = this.getSelectedIndex();
      this.storedPills.push(_objectSpread({
        id: selectedIndex
      }, pillOption));

      if (this.props.conditionalId && this.storedPills.length < 2) {
        this.props.storeValue(this.props.conditionalId, pillOption.value);
      }

      this.props.storeValue("".concat(this.props.id, "(").concat(selectedIndex, ")"), pillOption.value);
    }
  }]);

  return MultiOptionsPillsComponent;
}(_default_component_default_component__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"]);

MultiOptionsPillsComponent.propTypes = {
  label: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.string,
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.array,
  disabled: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.bool
};
MultiOptionsPillsComponent.defaultProps = {
  label: '',
  disabled: false,
  classNames: ['schema__options', 'schema__multi__dropdown']
};


/***/ }),
/* 229 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CloneComponent; });
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _default_component_default_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(133);









/**
 * @description component that copies the children to it's parent components
 * @prop classNames {array} Additional classnames to be added to the component
 */

var _ref =
/*#__PURE__*/
_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("i", {
  className: "pe-7s-plus2"
});

var CloneComponent =
/*#__PURE__*/
function (_DefaultComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(CloneComponent, _DefaultComponent);

  function CloneComponent(props) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, CloneComponent);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(CloneComponent).call(this, props));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(CloneComponent, [{
    key: "onCloneClick",
    value: function onCloneClick(e) {
      e.preventDefault();
      var selfIndex = this.props.parent().children.indexOf(this.props.root());
      var key = this.props.root().data.key++;
      this.props.parent().inject(this.props.root().children, selfIndex, key);
    }
  }, {
    key: "renderLabel",
    value: function renderLabel(label) {
      var l = this.props.l;
      return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("button", {
        className: "schema__clone__link button--text btn btn-default",
        onClick: this.onCloneClick.bind(this),
        "data-tealium-narrative": label
      }, void 0, _ref, l(label), this.renderLabelInfo());
    }
  }, {
    key: "renderValue",
    value: function renderValue() {
      return null;
    }
  }]);

  return CloneComponent;
}(_default_component_default_component__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"]);

CloneComponent.defaultProps = {
  classNames: ['schema__clone']
};
CloneComponent.propTypes = {
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.array,
  parent: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.func,
  root: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.func,
  inject: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.func
};


/***/ }),
/* 230 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContentTextComponent; });
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _content__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(146);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(115);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_9__);










/**
 * @description Creates a labelless text display component
 * @prop classNames {array} Additional classnames to be added to the component
 */

var ContentTextComponent =
/*#__PURE__*/
function (_ContentComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(ContentTextComponent, _ContentComponent);

  function ContentTextComponent() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, ContentTextComponent);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(ContentTextComponent).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(ContentTextComponent, [{
    key: "renderValue",
    value: function renderValue(value) {
      var _this$props = this.props,
          label = _this$props.label,
          l = _this$props.l;
      var valueTooltip = this.renderTooltip();
      valueTooltip.unshift(value);
      return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("span", {
        className: classnames__WEBPACK_IMPORTED_MODULE_9___default()(this.getLabelToClass(label)),
        "data-automation-selector": this.getDataId('value')
      }, void 0, l(value));
    }
  }]);

  return ContentTextComponent;
}(_content__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"]);

ContentTextComponent.propTypes = {
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.array
};
ContentTextComponent.defaultProps = {
  classNames: ['schema__content--text']
};


/***/ }),
/* 231 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContentTextListComponent; });
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _content_text__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(230);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(115);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_9__);










/**
 * @description Creates a labelless text display component
 * @prop classNames {array} Additional classnames to be added to the component
 */

var ContentTextListComponent =
/*#__PURE__*/
function (_ContentTextComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(ContentTextListComponent, _ContentTextComponent);

  function ContentTextListComponent() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, ContentTextListComponent);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(ContentTextListComponent).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(ContentTextListComponent, [{
    key: "renderValue",
    value: function renderValue(value) {
      var _this = this;

      var _this$props = this.props,
          label = _this$props.label,
          l = _this$props.l;
      var valueTooltip = this.renderTooltip();
      valueTooltip.unshift(value);
      return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("ul", {}, void 0, value.map(function (v) {
        return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("li", {}, void 0, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("span", {
          className: classnames__WEBPACK_IMPORTED_MODULE_9___default()(_this.getLabelToClass(label)),
          "data-automation-selector": _this.getDataId('value')
        }, void 0, l(v)));
      }));
    }
  }]);

  return ContentTextListComponent;
}(_content_text__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"]);

ContentTextListComponent.propTypes = {
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.array
};
ContentTextListComponent.defaultProps = {
  classNames: ['schema__content--text--list']
};


/***/ }),
/* 232 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContentMarkdownComponent; });
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _content__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(146);
/* harmony import */ var _default_component_markdown_wrapper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(134);









/**
 * @description Creates a labelless rich text  display component
 * @prop classNames {array} Additional classnames to be added to the component
 */

var ContentMarkdownComponent =
/*#__PURE__*/
function (_ContentComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(ContentMarkdownComponent, _ContentComponent);

  function ContentMarkdownComponent() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, ContentMarkdownComponent);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(ContentMarkdownComponent).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(ContentMarkdownComponent, [{
    key: "renderValue",
    value: function renderValue(value) {
      // return super.renderValue (
      // 	<MarkdownWrapper value={value}/>
      // );
      return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()(_default_component_markdown_wrapper__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], {
        value: value
      });
    }
  }]);

  return ContentMarkdownComponent;
}(_content__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"]);

ContentMarkdownComponent.defaultProps = {
  classNames: ['schema__content', 'schema__content-markdown']
};


/***/ }),
/* 233 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContentCalculatorComponent; });
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _custom_custom_formula_calculator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(179);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(115);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_9__);











var ContentCalculatorComponent =
/*#__PURE__*/
function (_CustomFormulaCalcula) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(ContentCalculatorComponent, _CustomFormulaCalcula);

  function ContentCalculatorComponent() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, ContentCalculatorComponent);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(ContentCalculatorComponent).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(ContentCalculatorComponent, [{
    key: "renderLabel",
    value: function renderLabel() {
      return null;
    }
  }, {
    key: "renderWriteValue",
    value: function renderWriteValue(value) {
      if (value === undefined || value === '' || value === '0' || value === 0) {
        value = '-';
      } else {
        value = this.props.typePostfix || this.props.typePrefix ? "".concat(this.props.typePrefix || '').concat(value, " ").concat(this.props.typePostfix || '') : value;
      }

      var componentArray = [_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: classnames__WEBPACK_IMPORTED_MODULE_9___default()("schema__text__input__container", this.props.data.className)
      }, "inputReadContainer", react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("input", {
        id: this.state.uniqueId,
        ref: "input",
        name: this.props.id,
        placeholder: this.getPlaceHolder(),
        value: value,
        key: "input",
        readOnly: true
      }), this.renderTooltip())];
      return componentArray;
    }
  }]);

  return ContentCalculatorComponent;
}(_custom_custom_formula_calculator__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"]);

ContentCalculatorComponent.propTypes = {
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.array
};
ContentCalculatorComponent.defaultProps = {
  classNames: ['schema__content-calculator']
};


/***/ }),
/* 234 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContentList; });
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _default_component_default_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(133);
/* harmony import */ var lodash_chunk__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(235);
/* harmony import */ var lodash_chunk__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(lodash_chunk__WEBPACK_IMPORTED_MODULE_9__);










/**
 * @description Example component used to show how to use reference values for coupled components
 * @prop classNames {array} Additional classnames to be added to the component
 */

var ContentList =
/*#__PURE__*/
function (_DefaultComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(ContentList, _DefaultComponent);

  function ContentList(props) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, ContentList);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(ContentList).call(this, props));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(ContentList, [{
    key: "renderLabel",
    value: function renderLabel() {
      var _this$props = this.props,
          l = _this$props.l,
          _this$props$label = _this$props.label,
          label = _this$props$label === void 0 ? '' : _this$props$label;
      return label && _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("span", {
        className: this.getLabelClassNames(),
        "data-automation-selector": this.getDataId('label')
      }, void 0, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("h1", {}, void 0, l(label)), this.renderLabelInfo(), this.renderTooltip());
    }
  }, {
    key: "renderValue",
    value: function renderValue() {
      var className = this.getValueClassNames(),
          contentList = this.props.data.value,
          //splitCountryList = this.splitList(contentList),
      columnCount = this.columnCount();
      return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: className
      }, void 0, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("ul", {
        className: "schema__content-list-".concat(columnCount)
      }, "contentlist", contentList.map(function (list, index) {
        return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("li", {}, "content_".concat(index), list);
      })));
    }
    /*splitList(countriesList) {
    	return this.props.data.rowCount ? chunk(countriesList, this.props.data.rowCount) : [countriesList];
    }*/

  }, {
    key: "columnCount",
    value: function columnCount() {
      var defaultCount = 1;

      if (this.props.data.columnCount) {
        var count = parseInt(this.props.data.columnCount, 10);

        if (count > 0 && count < 3) {
          defaultCount = this.props.data.columnCount;
        }
      }

      return defaultCount;
    }
  }]);

  return ContentList;
}(_default_component_default_component__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"]);

ContentList.propTypes = {
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.array,
  data: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.object
};
ContentList.defaultProps = {
  classNames: ['schema__content', 'schema__content-list']
};


/***/ }),
/* 235 */,
/* 236 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContentLinkComponent; });
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(132);
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _content__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(146);










/**
 * @description Creates a labelless text display component
 * @prop classNames {array} Additional classnames to be added to the component
 */

var ContentLinkComponent =
/*#__PURE__*/
function (_ContentComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default()(ContentLinkComponent, _ContentComponent);

  function ContentLinkComponent() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, ContentLinkComponent);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(ContentLinkComponent).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(ContentLinkComponent, [{
    key: "onClick",
    value: function onClick(e) {
      if (this.props.data.listenerType) {
        e.preventDefault();
        this.props.fireEvent(this.props.data.listenerType, this.props.data.listenerValues);
      }
    }
  }, {
    key: "renderValue",
    value: function renderValue(value) {
      var valueTooltip = this.renderTooltip();
      valueTooltip.unshift(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("a", {
        href: this.props.data.link || '',
        onClick: this.onClick.bind(this),
        target: this.props.data.target || '',
        title: this.props.data.title || ''
      }, void 0, value));
      return _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(ContentLinkComponent.prototype), "renderValue", this).call(this, valueTooltip);
    }
  }]);

  return ContentLinkComponent;
}(_content__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"]);

ContentLinkComponent.propTypes = {
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.array
};
ContentLinkComponent.defaultProps = {
  classNames: ['schema__content', 'schema__content__link']
};


/***/ }),
/* 237 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContentIframe; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _default_component_default_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(133);








/**
 * @description Creates a labelless iframe component
 * @prop classNames {array} Additional classnames to be added to the component
 */

var ContentIframe =
/*#__PURE__*/
function (_DefaultComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(ContentIframe, _DefaultComponent);

  function ContentIframe() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, ContentIframe);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(ContentIframe).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(ContentIframe, [{
    key: "renderLabel",
    value: function renderLabel(label) {
      return null;
    }
  }, {
    key: "renderValue",
    value: function renderValue(value) {
      var _this$props = this.props,
          label = _this$props.label,
          data = _this$props.data;
      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("iframe", data.attr);
    }
  }]);

  return ContentIframe;
}(_default_component_default_component__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"]);

ContentIframe.propTypes = {
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.array
};
ContentIframe.defaultProps = {
  classNames: ['schema__content__iframe']
};


/***/ }),
/* 238 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CardWrapperComponent; });
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _default_component_default_list__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(143);








function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }




/**
 * @description Renders a component with a list of children
 * @prop classNames {array} Additional classnames to be added to the component
 */

var CardWrapperComponent =
/*#__PURE__*/
function (_DefaultListComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default()(CardWrapperComponent, _DefaultListComponent);

  function CardWrapperComponent() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, CardWrapperComponent);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(CardWrapperComponent).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(CardWrapperComponent, [{
    key: "renderLabel",
    value: function renderLabel() {
      return null;
    }
  }, {
    key: "renderChildren",
    value: function renderChildren() {
      var _this = this;

      var childrenWithProps = react__WEBPACK_IMPORTED_MODULE_7___default.a.Children.map(this.props.children, function (child) {
        return react__WEBPACK_IMPORTED_MODULE_7___default.a.cloneElement(child, _objectSpread({}, _this.props));
      });
      return childrenWithProps;
    }
  }, {
    key: "renderValue",
    value: function renderValue() {
      var className = this.getValueClassNames();
      return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: className
      }, void 0, this.props.children);
    }
  }]);

  return CardWrapperComponent;
}(_default_component_default_list__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"]);

CardWrapperComponent.propTypes = {
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.array
};
CardWrapperComponent.defaultProps = {
  classNames: ['schema__card-wrapper']
};


/***/ }),
/* 239 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CardComponent; });
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _default_component_default_list__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(143);









/**
 * @description Renders a component with a list of children
 * @prop classNames {array} Additional classnames to be added to the component
 */

var CardComponent =
/*#__PURE__*/
function (_DefaultListComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(CardComponent, _DefaultListComponent);

  function CardComponent() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, CardComponent);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(CardComponent).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(CardComponent, [{
    key: "renderLabel",
    value: function renderLabel(label) {
      var l = this.props.l;
      return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("span", {
        className: this.getLabelClassNames(),
        "data-automation-selector": this.getDataId('label')
      }, void 0, l(label), this.renderLabelInfo());
    }
  }, {
    key: "checkChildren",
    value: function checkChildren(props) {
      if (props.children && props.children.length) {
        this.addClassName('schema__card--children');
      } else {
        this.removeClassName('schema__card--children');
      }
    }
  }]);

  return CardComponent;
}(_default_component_default_list__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"]);

CardComponent.propTypes = {
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.array
};
CardComponent.defaultProps = {
  classNames: ['schema__card']
};


/***/ }),
/* 240 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CardLargeComponent; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _card__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(239);







/**
 * @description Renders a component with a list of children
 * @prop classNames {array} Additional classnames to be added to the component
 */

var CardLargeComponent =
/*#__PURE__*/
function (_CardComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(CardLargeComponent, _CardComponent);

  function CardLargeComponent() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, CardLargeComponent);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(CardLargeComponent).apply(this, arguments));
  }

  return CardLargeComponent;
}(_card__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"]);

CardLargeComponent.propTypes = {
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.array
};
CardLargeComponent.defaultProps = {
  classNames: ['schema__card__large']
};


/***/ }),
/* 241 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CardFooterComponent; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _content_content__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(146);







/**
 * @description Renders a footer for card
 * @prop classNames {array} Additional classnames to be added to the component
 */

var CardFooterComponent =
/*#__PURE__*/
function (_ContentComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(CardFooterComponent, _ContentComponent);

  function CardFooterComponent() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, CardFooterComponent);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(CardFooterComponent).apply(this, arguments));
  }

  return CardFooterComponent;
}(_content_content__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"]);

CardFooterComponent.propTypes = {
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.array
};
CardFooterComponent.defaultProps = {
  classNames: ['schema__card__footer']
};


/***/ }),
/* 242 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomGroupElementsComponent; });
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(132);
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _default_component_default_list__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(143);










/**
 * @description Renders a component with a header and children
 * @prop classNames {array} Additional classnames to be added to the component
 */

var CustomGroupElementsComponent =
/*#__PURE__*/
function (_DefaultListComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default()(CustomGroupElementsComponent, _DefaultListComponent);

  function CustomGroupElementsComponent() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, CustomGroupElementsComponent);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(CustomGroupElementsComponent).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(CustomGroupElementsComponent, [{
    key: "renderLabel",
    value: function renderLabel() {
      var _this$props = this.props,
          l = _this$props.l,
          _this$props$label = _this$props.label,
          label = _this$props$label === void 0 ? '' : _this$props$label;
      return label && _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(CustomGroupElementsComponent.prototype), "renderLabel", this).call(this, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("span", {}, void 0, l(label)));
    }
  }, {
    key: "renderValue",
    value: function renderValue() {
      var className = this.getValueClassNames();
      return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: className
      }, void 0, this.props.children);
    }
  }]);

  return CustomGroupElementsComponent;
}(_default_component_default_list__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"]);

CustomGroupElementsComponent.propTypes = {
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.array
};
CustomGroupElementsComponent.defaultProps = {
  classNames: ['schema__group', 'schema__group-elements']
};


/***/ }),
/* 243 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomMultiGroupElementsComponent; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _custom_group_elements__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(242);







/**
 * @description Renders a component with a header and children
 * @prop classNames {array} Additional classnames to be added to the component
 */

var CustomMultiGroupElementsComponent =
/*#__PURE__*/
function (_CustomGroupElementsC) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(CustomMultiGroupElementsComponent, _CustomGroupElementsC);

  function CustomMultiGroupElementsComponent() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, CustomMultiGroupElementsComponent);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(CustomMultiGroupElementsComponent).apply(this, arguments));
  }

  return CustomMultiGroupElementsComponent;
}(_custom_group_elements__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"]);

CustomMultiGroupElementsComponent.propTypes = {
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.array
};
CustomMultiGroupElementsComponent.defaultProps = {
  classNames: ['schema__group', 'schema__multi__group-elements']
};


/***/ }),
/* 244 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomRatioBarComponent; });
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _default_component_default_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(133);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(115);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_8__);









/**
 * @description Example component used to show mean ratio values
 * @prop classNames {array} Additional classnames to be added to the component
 */

var CustomRatioBarComponent =
/*#__PURE__*/
function (_DefaultComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(CustomRatioBarComponent, _DefaultComponent);

  function CustomRatioBarComponent(props) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, CustomRatioBarComponent);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(CustomRatioBarComponent).call(this, props));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(CustomRatioBarComponent, [{
    key: "renderLabel",
    value: function renderLabel(label) {
      return null;
    }
  }, {
    key: "renderValue",
    value: function renderValue(value) {
      var _this$props = this.props,
          label = _this$props.label,
          data = _this$props.data,
          l = _this$props.l;
      var valueTooltip = this.renderTooltip();
      valueTooltip.unshift(value);
      return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: classnames__WEBPACK_IMPORTED_MODULE_8___default()(this.getLabelToClass(label))
      }, void 0, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("span", {
        className: this.getLabelClassNames(),
        style: {
          display: 'inline-block'
        },
        "data-automation-selector": this.getDataId('label')
      }, void 0, "".concat(l(label), " ").concat(String(data.separator) === 'false' ? '' : ':')), _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("span", {
        className: classnames__WEBPACK_IMPORTED_MODULE_8___default()('schema__custom-ratio-bar__wrapper'),
        "data-automation-selector": this.getDataId('value')
      }, void 0, this.renderRatioBar(data)));
    }
  }, {
    key: "renderRatioBar",
    value: function renderRatioBar(_ref) {
      var value = _ref.value,
          backgroundColor = _ref.backgroundColor;
      return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: "schema__custom-ratio-bar__bars"
      }, void 0, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("span", {
        className: "schema__custom-ratio-bar__bar",
        style: {
          width: "".concat(value[0], "%"),
          backgroundColor: backgroundColor[0]
        }
      }, void 0, "".concat(value[0], "%")), _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("span", {
        className: "schema__custom-ratio-bar__bar",
        style: {
          width: "".concat(value[1], "%"),
          backgroundColor: backgroundColor[1]
        }
      }, void 0, "".concat(value[1], "%")));
    }
  }]);

  return CustomRatioBarComponent;
}(_default_component_default_component__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"]);

CustomRatioBarComponent.defaultProps = {
  classNames: ['schema__custom-ratio-bar'],
  backgroundColors: ['#000', '#ccc']
};


/***/ }),
/* 245 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomExternalLinks; });
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _content_content_link__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(236);










var CustomExternalLinks =
/*#__PURE__*/
function (_ContentLinkComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(CustomExternalLinks, _ContentLinkComponent);

  function CustomExternalLinks() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, CustomExternalLinks);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(CustomExternalLinks).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(CustomExternalLinks, [{
    key: "renderValue",
    value: function renderValue(value) {
      var dataSet = this.props.data.medias;
      return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: "property-details__external-links"
      }, void 0, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("ul", {
        className: "links"
      }, void 0, dataSet.map(function (link) {
        return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("li", {}, void 0, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("a", {
          href: link.uri,
          target: "_blank",
          rel: "noopener noreferrer"
        }, void 0, link.title || link.uri));
      })));
    }
  }]);

  return CustomExternalLinks;
}(_content_content_link__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"]);

CustomExternalLinks.propTypes = {
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.array
};
CustomExternalLinks.defaultProps = {
  classNames: ['schema__content', 'schema__external__link']
};


/***/ }),
/* 246 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomCalculatorAnimate; });
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _custom_custom_formula_calculator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(179);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(115);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _utils_localeUtil__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(99);












var CustomCalculatorAnimate =
/*#__PURE__*/
function (_CustomFormulaCalcula) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(CustomCalculatorAnimate, _CustomFormulaCalcula);

  function CustomCalculatorAnimate() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, CustomCalculatorAnimate);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(CustomCalculatorAnimate).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(CustomCalculatorAnimate, [{
    key: "formatCurrency",
    value: function formatCurrency(value) {
      var country = this.props.country;
      var currencyFormat = Object(_utils_localeUtil__WEBPACK_IMPORTED_MODULE_10__[/* getValueByLocale */ "d"])(country, 'currencyFormat');
      var currencySymbol = Object(_utils_localeUtil__WEBPACK_IMPORTED_MODULE_10__[/* getValueByLocale */ "d"])(country, 'currencySymbol');
      return "".concat(currencySymbol).concat(Object(_utils_localeUtil__WEBPACK_IMPORTED_MODULE_10__[/* formatCurrency */ "b"])(value, 1, currencyFormat));
    }
  }, {
    key: "updateCaprateLabel",
    value: function updateCaprateLabel() {
      var _this$props = this.props,
          labelConfig = _this$props.data.labelConfig,
          getDataByID = _this$props.getDataByID;
      var value = getDataByID(labelConfig.dependentId);

      if (value < 100) {
        return labelConfig.options['CASHONCASH'];
      } else {
        return labelConfig.options['CAPRATE'];
      }
    }
  }, {
    key: "renderLabel",
    value: function renderLabel() {
      return null;
    }
  }, {
    key: "renderWriteValue",
    value: function renderWriteValue(value) {
      var _this$props2 = this.props,
          label = _this$props2.label,
          labelInfo = _this$props2.labelInfo,
          typePrefix = _this$props2.typePrefix,
          l = _this$props2.l,
          id = _this$props2.id,
          data = _this$props2.data,
          labelPostfix = _this$props2.labelPostfix;
      var labelConf;

      if (data.configOptions && value !== '0') {
        value = this[data.configOptions.handler](value);
      }

      if (data.labelConfig) {
        labelConf = this[data.labelConfig.updateHandler]();
      } else {
        labelConf = {
          label: label,
          tooltip: data.tooltip
        };
      }

      var displayVal = value === 'NaN' || value === '' || value === 0 || value === '0' ? '-' : "".concat(typePrefix ? l(typePrefix) : '').concat(value).concat(labelInfo ? l(labelInfo) : '');
      var componentArray = [_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        id: id,
        className: classnames__WEBPACK_IMPORTED_MODULE_9___default()(this.props.data.className)
      }, "", label && _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: "schema__calculator-animate__label"
      }, void 0, l(labelConf.label), labelPostfix && _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("span", {
        className: "schema__calculator-animate__label-postfix"
      }, void 0, l(labelPostfix)), this.renderTooltip(labelConf.tooltip)), data.formulaType && _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: "schema__calculator-animate__value"
      }, void 0, displayVal))];
      return componentArray;
    }
  }]);

  return CustomCalculatorAnimate;
}(_custom_custom_formula_calculator__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"]);

CustomCalculatorAnimate.propTypes = {
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.array
};
CustomCalculatorAnimate.defaultProps = {
  classNames: ['schema__calculator-animate']
};


/***/ }),
/* 247 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomStateSuggestionComponent; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _text_text_auto_suggestion__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(248);
/* harmony import */ var assets_static_us_states_json__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(249);
var assets_static_us_states_json__WEBPACK_IMPORTED_MODULE_6___namespace = /*#__PURE__*/__webpack_require__.t(249, 1);







/**
 * @description Renders a custom state suggestion component
 */

var CustomStateSuggestionComponent =
/*#__PURE__*/
function (_TextAutoSuggestion) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(CustomStateSuggestionComponent, _TextAutoSuggestion);

  function CustomStateSuggestionComponent(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, CustomStateSuggestionComponent);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(CustomStateSuggestionComponent).call(this, props));
    _this.suggestions = Object.values(assets_static_us_states_json__WEBPACK_IMPORTED_MODULE_6__);
    return _this;
  }

  return CustomStateSuggestionComponent;
}(_text_text_auto_suggestion__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"]);



/***/ }),
/* 248 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TextAutoSuggestionComponent; });
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(94);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _text__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(138);
/* harmony import */ var components_common_pills_suggestions_pills_suggestions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(223);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(115);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_10__);











/**
 * @description Renders a text suggestion component with auto fill suggestions component
 */

var TextAutoSuggestionComponent =
/*#__PURE__*/
function (_TextComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default()(TextAutoSuggestionComponent, _TextComponent);

  function TextAutoSuggestionComponent(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, TextAutoSuggestionComponent);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(TextAutoSuggestionComponent).call(this, props));
    _this.onChange = _this.onChange.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this));
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(TextAutoSuggestionComponent, [{
    key: "renderWriteValue",
    value: function renderWriteValue(value) {
      var l = this.props.l;
      var componentArray = [_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: classnames__WEBPACK_IMPORTED_MODULE_10___default()("schema__text__input__container ", this.props.data.className)
      }, "inputTextContainer", _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()(components_common_pills_suggestions_pills_suggestions__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], {
        id: this.state.uniqueId,
        minQueryLength: 1,
        isFullPill: false,
        translator: l,
        isAddNewPill: false,
        suggestions: this.suggestions,
        handleAddition: this.onChange,
        handleInputChange: this.onChange,
        updateInputValue: true,
        defaultInputValue: value,
        placeholder: this.getPlaceHolder()
      }), this.renderTooltip())];

      if (this.props.error) {
        componentArray.push(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
          className: "schema__error"
        }, "error", this.renderErrorMessage(this.props.error)));
      }

      return componentArray;
    }
  }, {
    key: "onChange",
    value: function onChange(value) {
      this.props.storeValue(this.props.id, value);
    }
  }]);

  return TextAutoSuggestionComponent;
}(_text__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"]);

TextAutoSuggestionComponent.defaultProps = {
  label: '',
  classNames: ['schema__text', 'schema__text__auto-suggestion']
};


/***/ }),
/* 249 */
/***/ (function(module) {

module.exports = JSON.parse("{\"AL\":\"Alabama\",\"AK\":\"Alaska\",\"AS\":\"American Samoa\",\"AZ\":\"Arizona\",\"AR\":\"Arkansas\",\"CA\":\"California\",\"CO\":\"Colorado\",\"CT\":\"Connecticut\",\"DE\":\"Delaware\",\"DC\":\"District Of Columbia\",\"FM\":\"Federated States Of Micronesia\",\"FL\":\"Florida\",\"GA\":\"Georgia\",\"GU\":\"Guam\",\"HI\":\"Hawaii\",\"ID\":\"Idaho\",\"IL\":\"Illinois\",\"IN\":\"Indiana\",\"IA\":\"Iowa\",\"KS\":\"Kansas\",\"KY\":\"Kentucky\",\"LA\":\"Louisiana\",\"ME\":\"Maine\",\"MH\":\"Marshall Islands\",\"MD\":\"Maryland\",\"MA\":\"Massachusetts\",\"MI\":\"Michigan\",\"MN\":\"Minnesota\",\"MS\":\"Mississippi\",\"MO\":\"Missouri\",\"MT\":\"Montana\",\"NE\":\"Nebraska\",\"NV\":\"Nevada\",\"NH\":\"New Hampshire\",\"NJ\":\"New Jersey\",\"NM\":\"New Mexico\",\"NY\":\"New York\",\"NC\":\"North Carolina\",\"ND\":\"North Dakota\",\"MP\":\"Northern Mariana Islands\",\"OH\":\"Ohio\",\"OK\":\"Oklahoma\",\"OR\":\"Oregon\",\"PW\":\"Palau\",\"PA\":\"Pennsylvania\",\"PR\":\"Puerto Rico\",\"RI\":\"Rhode Island\",\"SC\":\"South Carolina\",\"SD\":\"South Dakota\",\"TN\":\"Tennessee\",\"TX\":\"Texas\",\"UT\":\"Utah\",\"VT\":\"Vermont\",\"VI\":\"Virgin Islands\",\"VA\":\"Virginia\",\"WA\":\"Washington\",\"WV\":\"West Virginia\",\"WI\":\"Wisconsin\",\"WY\":\"Wyoming\"}");

/***/ }),
/* 250 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomCountrySuggestionComponent; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _text_text_auto_suggestion__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(248);
/* harmony import */ var assets_static_countries_json__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(251);
var assets_static_countries_json__WEBPACK_IMPORTED_MODULE_6___namespace = /*#__PURE__*/__webpack_require__.t(251, 1);







/**
 * @description Renders a custom country suggestion component
 */

var CustomCountrySuggestionComponent =
/*#__PURE__*/
function (_TextAutoSuggestion) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(CustomCountrySuggestionComponent, _TextAutoSuggestion);

  function CustomCountrySuggestionComponent(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, CustomCountrySuggestionComponent);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(CustomCountrySuggestionComponent).call(this, props));
    _this.suggestions = Object.values(assets_static_countries_json__WEBPACK_IMPORTED_MODULE_6__);
    return _this;
  }

  return CustomCountrySuggestionComponent;
}(_text_text_auto_suggestion__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"]);



/***/ }),
/* 251 */
/***/ (function(module) {

module.exports = JSON.parse("{\"BD\":\"Bangladesh\",\"BE\":\"Belgium\",\"BF\":\"Burkina Faso\",\"BG\":\"Bulgaria\",\"BA\":\"Bosnia and Herzegovina\",\"BB\":\"Barbados\",\"WF\":\"Wallis and Futuna\",\"BL\":\"Saint Barthelemy\",\"BM\":\"Bermuda\",\"BN\":\"Brunei\",\"BO\":\"Bolivia\",\"BH\":\"Bahrain\",\"BI\":\"Burundi\",\"BJ\":\"Benin\",\"BT\":\"Bhutan\",\"JM\":\"Jamaica\",\"BV\":\"Bouvet Island\",\"BW\":\"Botswana\",\"WS\":\"Samoa\",\"BQ\":\"Bonaire, Saint Eustatius and Saba \",\"BR\":\"Brazil\",\"BS\":\"Bahamas\",\"JE\":\"Jersey\",\"BY\":\"Belarus\",\"BZ\":\"Belize\",\"RU\":\"Russia\",\"RW\":\"Rwanda\",\"RS\":\"Serbia\",\"TL\":\"East Timor\",\"RE\":\"Reunion\",\"TM\":\"Turkmenistan\",\"TJ\":\"Tajikistan\",\"RO\":\"Romania\",\"TK\":\"Tokelau\",\"GW\":\"Guinea-Bissau\",\"GU\":\"Guam\",\"GT\":\"Guatemala\",\"GS\":\"South Georgia and the South Sandwich Islands\",\"GR\":\"Greece\",\"GQ\":\"Equatorial Guinea\",\"GP\":\"Guadeloupe\",\"JP\":\"Japan\",\"GY\":\"Guyana\",\"GG\":\"Guernsey\",\"GF\":\"French Guiana\",\"GE\":\"Georgia\",\"GD\":\"Grenada\",\"GB\":\"United Kingdom\",\"GA\":\"Gabon\",\"SV\":\"El Salvador\",\"GN\":\"Guinea\",\"GM\":\"Gambia\",\"GL\":\"Greenland\",\"GI\":\"Gibraltar\",\"GH\":\"Ghana\",\"OM\":\"Oman\",\"TN\":\"Tunisia\",\"JO\":\"Jordan\",\"HR\":\"Croatia\",\"HT\":\"Haiti\",\"HU\":\"Hungary\",\"HK\":\"Hong Kong\",\"HN\":\"Honduras\",\"HM\":\"Heard Island and McDonald Islands\",\"VE\":\"Venezuela\",\"PR\":\"Puerto Rico\",\"PS\":\"Palestinian Territory\",\"PW\":\"Palau\",\"PT\":\"Portugal\",\"SJ\":\"Svalbard and Jan Mayen\",\"PY\":\"Paraguay\",\"IQ\":\"Iraq\",\"PA\":\"Panama\",\"PF\":\"French Polynesia\",\"PG\":\"Papua New Guinea\",\"PE\":\"Peru\",\"PK\":\"Pakistan\",\"PH\":\"Philippines\",\"PN\":\"Pitcairn\",\"PL\":\"Poland\",\"PM\":\"Saint Pierre and Miquelon\",\"ZM\":\"Zambia\",\"EH\":\"Western Sahara\",\"EE\":\"Estonia\",\"EG\":\"Egypt\",\"ZA\":\"South Africa\",\"EC\":\"Ecuador\",\"IT\":\"Italy\",\"VN\":\"Vietnam\",\"SB\":\"Solomon Islands\",\"ET\":\"Ethiopia\",\"SO\":\"Somalia\",\"ZW\":\"Zimbabwe\",\"SA\":\"Saudi Arabia\",\"ES\":\"Spain\",\"ER\":\"Eritrea\",\"ME\":\"Montenegro\",\"MD\":\"Moldova\",\"MG\":\"Madagascar\",\"MF\":\"Saint Martin\",\"MA\":\"Morocco\",\"MC\":\"Monaco\",\"UZ\":\"Uzbekistan\",\"MM\":\"Myanmar\",\"ML\":\"Mali\",\"MO\":\"Macao\",\"MN\":\"Mongolia\",\"MH\":\"Marshall Islands\",\"MK\":\"Macedonia\",\"MU\":\"Mauritius\",\"MT\":\"Malta\",\"MW\":\"Malawi\",\"MV\":\"Maldives\",\"MQ\":\"Martinique\",\"MP\":\"Northern Mariana Islands\",\"MS\":\"Montserrat\",\"MR\":\"Mauritania\",\"IM\":\"Isle of Man\",\"UG\":\"Uganda\",\"TZ\":\"Tanzania\",\"MY\":\"Malaysia\",\"MX\":\"Mexico\",\"IL\":\"Israel\",\"FR\":\"France\",\"IO\":\"British Indian Ocean Territory\",\"SH\":\"Saint Helena\",\"FI\":\"Finland\",\"FJ\":\"Fiji\",\"FK\":\"Falkland Islands\",\"FM\":\"Micronesia\",\"FO\":\"Faroe Islands\",\"NI\":\"Nicaragua\",\"NL\":\"Netherlands\",\"NO\":\"Norway\",\"NA\":\"Namibia\",\"VU\":\"Vanuatu\",\"NC\":\"New Caledonia\",\"NE\":\"Niger\",\"NF\":\"Norfolk Island\",\"NG\":\"Nigeria\",\"NZ\":\"New Zealand\",\"NP\":\"Nepal\",\"NR\":\"Nauru\",\"NU\":\"Niue\",\"CK\":\"Cook Islands\",\"XK\":\"Kosovo\",\"CI\":\"Ivory Coast\",\"CH\":\"Switzerland\",\"CO\":\"Colombia\",\"CN\":\"China\",\"CM\":\"Cameroon\",\"CL\":\"Chile\",\"CC\":\"Cocos Islands\",\"CA\":\"Canada\",\"CG\":\"Republic of the Congo\",\"CF\":\"Central African Republic\",\"CD\":\"Democratic Republic of the Congo\",\"CZ\":\"Czech Republic\",\"CY\":\"Cyprus\",\"CX\":\"Christmas Island\",\"CR\":\"Costa Rica\",\"CW\":\"Curacao\",\"CV\":\"Cape Verde\",\"CU\":\"Cuba\",\"SZ\":\"Swaziland\",\"SY\":\"Syria\",\"SX\":\"Sint Maarten\",\"KG\":\"Kyrgyzstan\",\"KE\":\"Kenya\",\"SS\":\"South Sudan\",\"SR\":\"Suriname\",\"KI\":\"Kiribati\",\"KH\":\"Cambodia\",\"KN\":\"Saint Kitts and Nevis\",\"KM\":\"Comoros\",\"ST\":\"Sao Tome and Principe\",\"SK\":\"Slovakia\",\"KR\":\"South Korea\",\"SI\":\"Slovenia\",\"KP\":\"North Korea\",\"KW\":\"Kuwait\",\"SN\":\"Senegal\",\"SM\":\"San Marino\",\"SL\":\"Sierra Leone\",\"SC\":\"Seychelles\",\"KZ\":\"Kazakhstan\",\"KY\":\"Cayman Islands\",\"SG\":\"Singapore\",\"SE\":\"Sweden\",\"SD\":\"Sudan\",\"DO\":\"Dominican Republic\",\"DM\":\"Dominica\",\"DJ\":\"Djibouti\",\"DK\":\"Denmark\",\"VG\":\"British Virgin Islands\",\"DE\":\"Germany\",\"YE\":\"Yemen\",\"DZ\":\"Algeria\",\"US\":\"United States\",\"UY\":\"Uruguay\",\"YT\":\"Mayotte\",\"UM\":\"United States Minor Outlying Islands\",\"LB\":\"Lebanon\",\"LC\":\"Saint Lucia\",\"LA\":\"Laos\",\"TV\":\"Tuvalu\",\"TW\":\"Taiwan\",\"TT\":\"Trinidad and Tobago\",\"TR\":\"Turkey\",\"LK\":\"Sri Lanka\",\"LI\":\"Liechtenstein\",\"LV\":\"Latvia\",\"TO\":\"Tonga\",\"LT\":\"Lithuania\",\"LU\":\"Luxembourg\",\"LR\":\"Liberia\",\"LS\":\"Lesotho\",\"TH\":\"Thailand\",\"TF\":\"French Southern Territories\",\"TG\":\"Togo\",\"TD\":\"Chad\",\"TC\":\"Turks and Caicos Islands\",\"LY\":\"Libya\",\"VA\":\"Vatican\",\"VC\":\"Saint Vincent and the Grenadines\",\"AE\":\"United Arab Emirates\",\"AD\":\"Andorra\",\"AG\":\"Antigua and Barbuda\",\"AF\":\"Afghanistan\",\"AI\":\"Anguilla\",\"VI\":\"U.S. Virgin Islands\",\"IS\":\"Iceland\",\"IR\":\"Iran\",\"AM\":\"Armenia\",\"AL\":\"Albania\",\"AO\":\"Angola\",\"AQ\":\"Antarctica\",\"AS\":\"American Samoa\",\"AR\":\"Argentina\",\"AU\":\"Australia\",\"AT\":\"Austria\",\"AW\":\"Aruba\",\"IN\":\"India\",\"AX\":\"Aland Islands\",\"AZ\":\"Azerbaijan\",\"IE\":\"Ireland\",\"ID\":\"Indonesia\",\"UA\":\"Ukraine\",\"QA\":\"Qatar\",\"MZ\":\"Mozambique\"}");

/***/ }),
/* 252 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopupComponent; });
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(94);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(132);
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _default_component_default_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(133);
/* harmony import */ var _base_popup_popup__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(253);
/* harmony import */ var _common_button__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(123);













/**
 * @description Creates a popup component with link
 * @prop classNames {array} Additional classnames to be added to the component
 * @prop data {array} Additional props for component
 */

var _ref =
/*#__PURE__*/
_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("span", {
  className: "popup-content-wrapper__logo-icon"
}, void 0, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("i", {
  className: "icon-cob icon-info popup-content-wrapper__icon"
}));

var PopupComponent =
/*#__PURE__*/
function (_DefaultComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default()(PopupComponent, _DefaultComponent);

  function PopupComponent(props, context) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, PopupComponent);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(PopupComponent).call(this, props, context));
    _this.toggleOpenState = _this.toggleOpenState.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this));
    _this.state = {
      isOpen: props.data && props.data.isOpen || false
    };
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(PopupComponent, [{
    key: "toggleOpenState",
    value: function toggleOpenState(event) {
      if (event) {
        event.preventDefault();
      }

      this.setState({
        isOpen: !this.state.isOpen
      });
    }
  }, {
    key: "renderLabel",
    value: function renderLabel() {
      return null;
    }
  }, {
    key: "renderPopup",
    value: function renderPopup() {
      var _this2 = this;

      var l = this.context.i18n.l;
      var _this$props = this.props,
          data = _this$props.data,
          children = _this$props.children;
      return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()(_base_popup_popup__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], {
        onClose: this.toggleOpenState,
        cancelText: data.cancelText || '',
        onAction: function onAction(event) {
          return PopupComponent.actionHandlers[data.eventName].call(_this2, event);
        }
      }, void 0, _ref, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: "popup-content-wrapper__content"
      }, void 0, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("h3", {
        className: "popup-content-wrapper__heading"
      }, void 0, data && l(data.title) || ''), _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: "popup-content-wrapper__message"
      }, void 0, children)));
    }
  }, {
    key: "renderLink",
    value: function renderLink(value) {
      var _this$props2 = this.props,
          l = _this$props2.l,
          _this$props2$data = _this$props2.data,
          data = _this$props2$data === void 0 ? '' : _this$props2$data;

      if (data.linkType && data.linkType === 'link') {
        return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("a", {
          href: "#",
          className: "schema__popup__link",
          onClick: this.toggleOpenState
        }, void 0, l(value));
      }

      return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()(_common_button__WEBPACK_IMPORTED_MODULE_12__[/* Button */ "a"], {
        btnClassName: "btn btn-primary",
        onClick: this.toggleOpenState
      }, void 0, l(value));
    }
  }, {
    key: "renderValue",
    value: function renderValue(value) {
      var markup = [this.renderLink(value)];

      if (this.state.isOpen) {
        markup.push(this.renderPopup());
      }

      return _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(PopupComponent.prototype), "renderValue", this).call(this, markup);
    }
  }]);

  return PopupComponent;
}(_default_component_default_component__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"]);

PopupComponent.propTypes = {
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.array,
  data: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.object
};
PopupComponent.defaultProps = {
  classNames: ['schema__popup']
};
PopupComponent.actionHandlers = {
  updatedNetIncome: function updatedNetIncome(evt) {
    var _this$props3 = this.props,
        data = _this$props3.data,
        cloneKey = _this$props3.cloneKey,
        eventData = data.eventData,
        valueId = eventData.valueId.replace(/\*/, cloneKey),
        replaceId = eventData.replaceId.replace(/\*/, cloneKey);
    this.toggleOpenState(evt);
    this.props.storeValue(replaceId, this.props.getDataByID(valueId));
  }
};


/***/ }),
/* 253 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Popup; });
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(94);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(137);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _common_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(123);












var _ref =
/*#__PURE__*/
_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("i", {
  className: "pe-7s-close-circle"
});

var _ref2 =
/*#__PURE__*/
_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
  className: "popup-modal__container__shadow"
});

var Popup =
/*#__PURE__*/
function (_React$Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default()(Popup, _React$Component);

  function Popup(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, Popup);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Popup).call(this, props));
    _this.closeOnClickedOutside = _this.closeOnClickedOutside.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this));
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(Popup, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          l = _this$props.l,
          _this$props$wrapperCl = _this$props.wrapperClassName,
          wrapperClassName = _this$props$wrapperCl === void 0 ? '' : _this$props$wrapperCl,
          _this$props$isCloseBt = _this$props.isCloseBtnRequired,
          isCloseBtnRequired = _this$props$isCloseBt === void 0 ? '' : _this$props$isCloseBt,
          _this$props$onClose = _this$props.onClose,
          onClose = _this$props$onClose === void 0 ? '' : _this$props$onClose,
          _this$props$onAction = _this$props.onAction,
          onAction = _this$props$onAction === void 0 ? '' : _this$props$onAction,
          _this$props$cancelTex = _this$props.cancelText,
          cancelText = _this$props$cancelTex === void 0 ? '' : _this$props$cancelTex,
          children = _this$props.children;
      return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: "popup-modal",
        onClick: this.closeOnClickedOutside
      }, void 0, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: "popup-modal__container"
      }, void 0, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: "popup-modal__container__body",
        ref: "modalBackground"
      }, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: wrapperClassName,
        "data-automation-selector": "popup"
      }, void 0, isCloseBtnRequired && _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("span", {
        className: "popup-modal__close-btn",
        onClick: onClose,
        "data-automation-selector": "popup-close"
      }, void 0, _ref), children, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()(_common_button__WEBPACK_IMPORTED_MODULE_10__[/* Button */ "a"], {
        className: " popup-modal__cancel-btn",
        btnClassName: "btn btn-primary",
        onClick: onAction
      }, void 0, l(cancelText)))), _ref2));
    }
  }, {
    key: "closeOnClickedOutside",
    value: function closeOnClickedOutside(e) {
      var modalBackground = react_dom__WEBPACK_IMPORTED_MODULE_9___default.a.findDOMNode(this.refs.modalBackground);

      if (e.target === modalBackground) {
        this.props.onClose(e);
      }
    }
  }]);

  return Popup;
}(react__WEBPACK_IMPORTED_MODULE_7___default.a.Component);

Popup.propTypes = {
  onClose: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.func.isRequired,
  isCloseBtnRequired: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.bool,
  htmlContent: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.string,
  wrapperClassName: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.string,
  children: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.node,
  cancelText: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.string,
  onAction: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.func
};
Popup.defaultProps = {
  onClose: function onClose() {},
  isCloseBtnRequired: true,
  htmlContent: '',
  wrapperClassName: 'popup-content-wrapper',
  children: [],
  cancelText: 'CANCEL'
};


/***/ }),
/* 254 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TableFooterComponent; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _table__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(147);







/**
 * @description Renders a horizontal list using column values
 * @prop classNames {array} Additional classnames to be added to the component
 */

var TableFooterComponent =
/*#__PURE__*/
function (_TableComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(TableFooterComponent, _TableComponent);

  function TableFooterComponent() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, TableFooterComponent);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(TableFooterComponent).apply(this, arguments));
  }

  return TableFooterComponent;
}(_table__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"]);

TableFooterComponent.propTypes = {
  classNames: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.array
};
TableFooterComponent.defaultProps = {
  classNames: ['schema__table__footer']
};


/***/ })
]);;