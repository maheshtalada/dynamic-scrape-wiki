#!/usr/bin/env node
exports.ids = [1];
exports.modules = {

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SingleSelectBoxes; });
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
/* harmony import */ var _select_boxes_masked_radio__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(112);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(115);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_9__);











var SingleSelectBoxes =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(SingleSelectBoxes, _Component);

  function SingleSelectBoxes(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, SingleSelectBoxes);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(SingleSelectBoxes).call(this, props));
    _this.state = {
      selectedBox: props.selectedBox,
      boxOptions: props.boxOptions
    };
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(SingleSelectBoxes, [{
    key: "getOptionValue",
    value: function getOptionValue(option) {
      return typeof option.value !== 'string' ? option.name : option.value;
    }
  }, {
    key: "renderMaskedBox",
    value: function renderMaskedBox() {
      var _this2 = this;

      var _this$props = this.props,
          name = _this$props.name,
          min = _this$props.min,
          max = _this$props.max,
          analyticsData = _this$props.analyticsData;
      var _this$state = this.state,
          selectedBox = _this$state.selectedBox,
          boxOptions = _this$state.boxOptions;
      var l = this.context.i18n.l;
      return boxOptions.map(function (option, index) {
        return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()(_select_boxes_masked_radio__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], {
          analyticsData: analyticsData,
          onChange: function onChange(evt, val) {
            return _this2.onChange(evt, val);
          },
          name: option.label ? l(option.label) : option.name,
          value: _this2.getOptionValue(option),
          l: l,
          disable: option.isDisabled,
          selectedValue: selectedBox === _this2.getOptionValue(option),
          labelPostfix: l(option.labelPostfix),
          label: option.label ? l(option.label) : option.name
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props2 = this.props,
          name = _this$props2.name,
          emptyLabel = _this$props2.emptyLabel,
          analyticsData = _this$props2.analyticsData,
          title = _this$props2.title,
          isAnyRequired = _this$props2.isAnyRequired,
          className = _this$props2.className;
      var _this$state2 = this.state,
          boxOptions = _this$state2.boxOptions,
          selectedBox = _this$state2.selectedBox;
      var l = this.context.i18n.l;
      return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: classnames__WEBPACK_IMPORTED_MODULE_9___default()("single-select-boxes", className)
      }, void 0, title && _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: "title"
      }, void 0, title), _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: "select-boxes masked__radio"
      }, void 0, isAnyRequired && _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()(_select_boxes_masked_radio__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], {
        analyticsData: analyticsData,
        onChange: function onChange(evt, val) {
          return _this3.onChange(evt, val);
        },
        name: name,
        value: '',
        disable: false,
        selectedValue: selectedBox === '',
        label: l(emptyLabel)
      }), this.renderMaskedBox()));
    }
  }, {
    key: "onChange",
    value: function onChange(evt, val) {
      this.setState({
        selectedBox: val
      }, this.props.onChange(val));
    }
  }]);

  return SingleSelectBoxes;
}(react__WEBPACK_IMPORTED_MODULE_6__["Component"]);

SingleSelectBoxes.propTypes = {};
SingleSelectBoxes.defaultProps = {
  onChange: function onChange() {},
  name: undefined,
  emptyLabel: 'ANY',
  selectedBox: '',
  analyticsData: {},
  isAnyRequired: true
};
SingleSelectBoxes.contextTypes = {
  i18n: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.object
};


/***/ }),

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_uniqueFormId__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(113);
/* harmony import */ var react_tooltip__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(114);
/* harmony import */ var react_tooltip__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_tooltip__WEBPACK_IMPORTED_MODULE_3__);




/**
 * @description renders an input radio group items with mask.
 */

var MaskedRadio = function MaskedRadio(_ref) {
  var name = _ref.name,
      value = _ref.value,
      selectedValue = _ref.selectedValue,
      _onChange = _ref.onChange,
      label = _ref.label,
      labelPostfix = _ref.labelPostfix,
      disable = _ref.disable,
      l = _ref.l,
      _ref$analyticsData = _ref.analyticsData,
      analyticsData = _ref$analyticsData === void 0 ? {} : _ref$analyticsData,
      tooltip = _ref.tooltip;
  var id = "".concat(Object(_utils_uniqueFormId__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(), "-").concat(value);
  return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
    className: "masked__radio__item hvr-rectangle-out ".concat(disable ? 'mask__disable' : '')
  }, "radio_item_".concat(value), _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("input", {
    type: "checkbox",
    name: name,
    disabled: disable,
    id: id,
    value: value,
    checked: selectedValue,
    "data-tag-category": analyticsData.category,
    "data-tag-action": analyticsData.action,
    "data-tag-label": "".concat(analyticsData.label, " ").concat(label),
    onChange: function onChange(evt) {
      return _onChange(evt, value);
    }
  }, "".concat(value, "_input")), _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("label", {
    htmlFor: id,
    title: disable ? l('NA') : ''
  }, value, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("span", {
    className: "hvr-grow"
  }, void 0, label), labelPostfix && _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("span", {
    className: "label-postfix"
  }, void 0, l(labelPostfix)), tooltip && _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("i", {
    className: "tooltip pe-7s-help1",
    "data-tip": tooltip,
    "data-for": "masked-radio-tooltip-".concat(id)
  }), _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()(react_tooltip__WEBPACK_IMPORTED_MODULE_3___default.a, {
    id: "masked-radio-tooltip-".concat(id)
  })));
};

/* harmony default export */ __webpack_exports__["a"] = (MaskedRadio);

/***/ }),

/***/ 92:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
/* harmony import */ var _containers_Companies_ListCompanies__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(93);










var _ref =
/*#__PURE__*/
_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("header", {
  className: "depot-page__header"
});

var CompanyListPage =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(CompanyListPage, _Component);

  function CompanyListPage(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, CompanyListPage);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(CompanyListPage).call(this, props));
    console.log(props);
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(CompanyListPage, [{
    key: "render",
    value: function render() {
      var l = this.context.i18n.l;
      return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: "company-list-page"
      }, void 0, _ref, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_containers_Companies_ListCompanies__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], this.props));
    }
  }]);

  return CompanyListPage;
}(react__WEBPACK_IMPORTED_MODULE_6__["Component"]);

CompanyListPage.contextTypes = {
  i18n: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.object
};
/* harmony default export */ __webpack_exports__["default"] = (CompanyListPage);

/***/ }),

/***/ 93:
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
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(94);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(14);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var lib_connectDataFetchers_jsx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(95);
/* harmony import */ var _redux_actions_application__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(71);
/* harmony import */ var _components_profile_mypages_base_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(97);
/* harmony import */ var utils_urlUtil__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(100);
/* harmony import */ var utils_propertyUtil__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(101);
/* harmony import */ var react_data_table_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(110);
/* harmony import */ var react_data_table_component__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(react_data_table_component__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var components_common_single_select_boxes__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(111);

















var Columns = [{
  name: 'COMPANYNAME',
  selector: 'CompanyName',
  cell: function cell(val) {
    return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_6___default()("a", {
      href: "/company/".concat(val.EntityID),
      target: "_blank"
    }, void 0, val.CompanyName);
  }
}, {
  name: 'ADDRESS1',
  selector: 'Address1'
}, {
  name: 'ADDRESS2',
  selector: 'Address2'
}, {
  name: 'City',
  selector: 'City'
}, {
  name: 'State',
  selector: 'State'
}];

var _ref =
/*#__PURE__*/
_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_6___default()("div", {
  className: "profile-page__layout__profile-section__listings-wrapper__header"
});

var ListCompanies =
/*#__PURE__*/
function (_MyPagesBaseComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(ListCompanies, _MyPagesBaseComponent);

  function ListCompanies(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, ListCompanies);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(ListCompanies).call(this, props)); //this.renderCustomDataGridRow = this.renderCustomDataGridRow.bind(this);

    _this.onViewChange = _this.onViewChange.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this));
    _this.state = {
      type: props.location.query && props.location.query.type || 'unprocessed'
    };
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(ListCompanies, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(props) {
      console.log(props);
    }
  }, {
    key: "render",
    value: function render() {
      var l = this.context.i18n.l;
      var type = this.props.location.query.type;
      return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_6___default()("div", {
        className: "profile-page__layout listings"
      }, void 0, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_6___default()("div", {
        className: "profile-page__section-wrap"
      }, void 0, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_6___default()("div", {
        className: "profile-page__layout__profile-section"
      }, void 0, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_6___default()("div", {
        className: "profile-page__layout__profile-section__listings-wrapper company-report__people"
      }, void 0, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_6___default()("div", {
        className: "flex "
      }, void 0, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_6___default()(components_common_single_select_boxes__WEBPACK_IMPORTED_MODULE_16__[/* default */ "a"], {
        className: "search-results__control",
        boxOptions: [{
          "label": "UNPROCESSED",
          'value': "unprocessed"
        }, {
          "label": "PROCESSED",
          'value': "processed"
        }],
        selectedBox: type,
        isAnyRequired: false,
        l: function l(txt) {
          return txt;
        },
        analyticsData: {},
        onChange: this.onViewChange
      })), _ref, this.props.response_companies && _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_6___default()(react_data_table_component__WEBPACK_IMPORTED_MODULE_15___default.a, {
        data: this.props.response_companies,
        columns: Columns,
        paginationTotalRows: this.props.response_companies.length,
        pagination: true,
        paginationPerPage: 15
      })))));
    }
  }, {
    key: "onViewChange",
    value: function onViewChange(type) {
      this.context.router.push({
        pathname: "/",
        query: {
          type: type
        }
      });
      /*this.setState({type})*/
    }
  }]);

  return ListCompanies;
}(_components_profile_mypages_base_component__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"]);

ListCompanies.contextTypes = {
  i18n: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.object,
  router: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.object
};

var mapStateToProps = function mapStateToProps(_ref2) {
  var application = _ref2.application;
  var response_companies = application.response_companies;
  return {
    response_companies: response_companies
  };
};

/* harmony default export */ __webpack_exports__["a"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_9__["connect"])(mapStateToProps)(Object(lib_connectDataFetchers_jsx__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"])(ListCompanies, [_redux_actions_application__WEBPACK_IMPORTED_MODULE_11__[/* REQUEST_GET_COMPANIES */ "a"]], true)));

/***/ }),

/***/ 97:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(94);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var lodash_find__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(59);
/* harmony import */ var lodash_find__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(lodash_find__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var lodash_filter__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(98);
/* harmony import */ var lodash_filter__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(lodash_filter__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var lodash_findIndex__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(85);
/* harmony import */ var lodash_findIndex__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(lodash_findIndex__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _utils_localeUtil__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(99);













var MyPagesBaseComponent =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(MyPagesBaseComponent, _Component);

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default()(MyPagesBaseComponent, null, [{
    key: "getPriceInfo",
    value: function getPriceInfo(item, country, l) {
      return item.price ? Object(_utils_localeUtil__WEBPACK_IMPORTED_MODULE_11__[/* localeCurrency */ "f"])(item.price.toFixed(2), '', '', country) : item.rpsf ? "".concat(Object(_utils_localeUtil__WEBPACK_IMPORTED_MODULE_11__[/* localeCurrency */ "f"])(item.rpsf.toFixed(2), '', '', country), " ").concat(l('PERSQUAREFEET')) : '';
    }
  }]);

  function MyPagesBaseComponent(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, MyPagesBaseComponent);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(MyPagesBaseComponent).call(this, props));
    var screenSize = props.screenSize;
    _this.handleDataGridAction = _this.handleDataGridAction.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this));
    _this.handlePageClick = _this.handlePageClick.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this));
    _this.itemClasses = screenSize > 2 ? 'data-grid__data-rows__row__data-list__item data-grid__data-item-block' : 'data-grid__data-rows__row__data-list__data-item-with-header';
    _this.showHeader = screenSize <= 2;
    _this.itemValueClass = _this.showHeader ? 'data-grid__data-rows__row__data-list__data-item-with-header__value' : '';
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default()(MyPagesBaseComponent, [{
    key: "handleDataGridAction",
    value: function handleDataGridAction(info, actionCallback) {
      if (typeof this[actionCallback] === 'function') {
        this[actionCallback](info);
      } else {
        return;
      }
    }
  }, {
    key: "handlePageClick",
    value: function handlePageClick(_ref) {
      var selected = _ref.selected;
      this.setState({
        currentPage: selected,
        isFetching: true
      });
      this.context.router.push({
        pathname: this.PAGINATE_PATH_LINK,
        query: {
          'page': selected
        }
      });
    }
  }, {
    key: "getViewUri",
    value: function getViewUri(actions, name) {
      var viewAction = lodash_find__WEBPACK_IMPORTED_MODULE_8___default()(actions, function (action) {
        return action.name === name;
      });

      return viewAction ? viewAction.uri : '';
    }
  }, {
    key: "getActions",
    value: function getActions(actions, actionsConfig) {
      var filteredActions = lodash_filter__WEBPACK_IMPORTED_MODULE_9___default()(actions, function (action) {
        return !!action.flag;
      });

      return lodash_filter__WEBPACK_IMPORTED_MODULE_9___default()(filteredActions, function (action) {
        return actionsConfig.indexOf(action.name) >= 0;
      });
    }
  }, {
    key: "deleteItem",
    value: function deleteItem(info) {
      this.props.dispatch(this.DELETE_ITEM_ACTION({
        id: info.id,
        page: this.props.location.query.page || 1
      }));
    }
  }, {
    key: "checkIfActionValid",
    value: function checkIfActionValid(actions, actionName) {
      if (lodash_findIndex__WEBPACK_IMPORTED_MODULE_10___default()(actions, {
        flag: true,
        name: actionName
      }) >= 0) {
        return true;
      }

      return false;
    }
  }]);

  return MyPagesBaseComponent;
}(react__WEBPACK_IMPORTED_MODULE_6__["Component"]);

MyPagesBaseComponent.propTypes = {
  dispatch: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.func
};
MyPagesBaseComponent.contextTypes = {
  i18n: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.object,
  router: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.object,
  awsImagePath: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.string,
  country: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.string,
  screenSize: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.number
};
/* harmony default export */ __webpack_exports__["a"] = (MyPagesBaseComponent);

/***/ }),

/***/ 99:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return handleLargeNumbers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return formatCurrency; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return localeCurrency; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return addlocaleCurrencyCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return localeNumberFormat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return getValueByLocale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return formatDateUtil; });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(45);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);


var localeSettings = __webpack_require__(47).default.localeSettings; // currency scale


var GRAND_START = 1000,
    LOWER_GRAND_END = 9999,
    UPPER_GRAND_START = 10000,
    UPPER_GRAND_END = 999999,
    LAC_START = 100000,
    LAC_END = 9999999,
    MN_START = 1000000,
    MN_END = 999999999,
    CR_START = 10000000,
    BN_START = 1000000000,
    BN_END = 999999999999,
    TRILLION = 1000000000000,
    INITIAL_VALUE = 1,
    LOWER_K_TO_FIX = 2,
    K_TO_FIX = 0,
    MN_TO_FIX = 2,
    BN_TO_FIX = 3;
var CURRENCY_SCALE = {
  'IN': {
    'LAC': {
      'short_form': 'L',
      'long_form': 'Lac'
    },
    'CRORE': {
      'short_form': 'Cr',
      'long_form': 'Lacs'
    }
  },
  'US': {
    'GRAND': {
      'short_form': 'K',
      'long_form': 'K'
    },
    'MILLION': {
      'short_form': 'Mn',
      'long_form': 'Mn'
    },
    'BILLION': {
      'short_form': 'Bn',
      'long_form': 'Bn'
    }
  }
};

function formateNumber(n, unit, tofix, configFix) {
  var val = n / unit;
  val = Number(configFix !== undefined ? val.toFixed(configFix) : tofix !== undefined ? val.toFixed(tofix) : Math.floor(val));

  if (val % 1 === 0) {
    return parseInt(val);
  }

  return val;
}

function numDifferentiation(val, tofix) {
  if (val >= 10000000) {
    val = (val / 10000000).toFixed(tofix) + 'Cr';
  } else if (val >= 100000) {
    val = (val / 100000).toFixed(tofix) + 'Lac';
  } else if (val >= 1000) {
    val = (val / 1000).toFixed(tofix) + 'K';
  }

  return val;
}

function handleLargeNumbers(value) {
  var tofix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

  if (value >= GRAND_START && value <= LOWER_GRAND_END) {
    return "".concat(formateNumber(value, GRAND_START, LOWER_K_TO_FIX, tofix), "K");
  } else if (value >= UPPER_GRAND_START && value <= UPPER_GRAND_END) {
    return "".concat(formateNumber(value, GRAND_START, K_TO_FIX, tofix), "K");
  } else if (value >= MN_START && value <= MN_END) {
    return "".concat(formateNumber(value, MN_START, MN_TO_FIX, tofix), "M");
  } else if (value >= BN_START && value <= BN_END) {
    return "".concat(formateNumber(value, BN_START, BN_TO_FIX, tofix), "B");
  } else if (value >= TRILLION) {
    return "".concat(formateNumber(value, TRILLION, BN_TO_FIX, tofix), "T");
  } else {
    return formateNumber(value, INITIAL_VALUE, K_TO_FIX, tofix);
  }
}
function formatCurrency(value) {
  var tofix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  if (!type) {
    return value;
  }

  if (type === 'INR') {
    return numDifferentiation(value, tofix);
  }

  if (value >= 0) {
    return handleLargeNumbers(value, tofix);
  }

  return "-".concat(handleLargeNumbers(Math.abs(value), tofix));
}
function localeCurrency(val, prefix, code) {
  var country = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'US';
  prefix = localeSettings[country].currencySymbol;
  code = localeSettings[country].localeString;
  return "".concat(prefix).concat(Number(val).toLocaleString(code));
}
function addlocaleCurrencyCode(val) {
  var country = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'US';
  var prefix = localeSettings[country].currencySymbol;
  return "".concat(prefix).concat(val);
}
function localeNumberFormat(val) {
  var country = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'US';
  var code = localeSettings[country].localeString;
  return val === 0 || !!val ? Number(val).toLocaleString(code) : '';
}
function getValueByLocale(country, localeKey) {
  return localeSettings && localeSettings[country] && localeSettings[country].hasOwnProperty(localeKey) && localeSettings[country][localeKey];
}
function formatDateUtil(date) {
  var country = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'US';
  var knownFormat = arguments.length > 2 ? arguments[2] : undefined;
  var format = getValueByLocale(country, 'dateFormat');

  if (knownFormat) {
    return moment__WEBPACK_IMPORTED_MODULE_0___default()(date, knownFormat).format(format);
  }

  return moment__WEBPACK_IMPORTED_MODULE_0___default()(date).format(format);
}
/*module.exports = {
	formatCurrency,
	localeCurrency,
	getValueByLocale,
	localeNumberFormat,
	formatDateUtil,
	handleLargeNumbers,
	addlocaleCurrencyCode
};*/

/***/ })

};;