#!/usr/bin/env node
exports.ids = [4];
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

/***/ 159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PeoplePage; });
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
/* harmony import */ var _containers_People_ListPeople__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(160);










var _ref =
/*#__PURE__*/
_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("header", {
  className: "depot-page__header"
});

var PeoplePage =
/*#__PURE__*/
function (_PureComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(PeoplePage, _PureComponent);

  function PeoplePage() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, PeoplePage);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(PeoplePage).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(PeoplePage, [{
    key: "render",
    value: function render() {
      var l = this.context.i18n.l;
      return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: "company-list-page"
      }, void 0, _ref, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_containers_People_ListPeople__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], this.props));
    }
  }]);

  return PeoplePage;
}(react__WEBPACK_IMPORTED_MODULE_6__["PureComponent"]);

PeoplePage.contextTypes = {
  i18n: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.object
};


/***/ }),

/***/ 160:
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
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(14);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var lib_connectDataFetchers_jsx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(95);
/* harmony import */ var _redux_actions_application__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(71);
/* harmony import */ var utils_urlUtil__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(100);
/* harmony import */ var utils_propertyUtil__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(101);
/* harmony import */ var react_data_table_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(110);
/* harmony import */ var react_data_table_component__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(react_data_table_component__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var components_common_single_select_boxes__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(111);















var Columns = [{
  name: 'Name',
  selector: 'person_name',
  cell: function cell(val) {
    return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_5___default()("a", {
      href: "/company/".concat(val.company_people_id),
      target: "_blank"
    }, void 0, val.person_name);
  }
}, {
  name: 'Phone',
  selector: 'person_phone'
}, {
  name: 'Email',
  selector: 'person_email'
}, {
  name: 'Address',
  selector: 'person_address'
}, {
  name: 'Roles',
  selector: 'person_roles',
  cell: function cell(val) {
    return val.person_roles && val.person_roles.replace('||', ', ');
  }
}];

var _ref =
/*#__PURE__*/
_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_5___default()("div", {
  className: "profile-page__layout__profile-section__listings-wrapper__header"
});

var ListPeople =
/*#__PURE__*/
function (_PureComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(ListPeople, _PureComponent);

  function ListPeople() {
    var _getPrototypeOf2;

    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, ListPeople);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, (_getPrototypeOf2 = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(ListPeople)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      type: _this.props.location.query && _this.props.location.query.type || 'unprocessed'
    };

    _this.onViewChange = function (type) {
      _this.context.router.push({
        pathname: "/",
        query: {
          type: type
        }
      });
      /*this.setState({type})*/

    };

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(ListPeople, [{
    key: "render",
    value: function render() {
      var l = this.context.i18n.l;
      var _this$props = this.props,
          response_people = _this$props.response_people,
          location = _this$props.location;
      var type = this.state.type;
      return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_5___default()("div", {
        className: "profile-page__layout listings"
      }, void 0, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_5___default()("div", {
        className: "profile-page__section-wrap"
      }, void 0, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_5___default()("div", {
        className: "profile-page__layout__profile-section"
      }, void 0, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_5___default()("div", {
        className: "profile-page__layout__profile-section__listings-wrapper company-report__people"
      }, void 0, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_5___default()("div", {
        className: "flex "
      }, void 0, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_5___default()(components_common_single_select_boxes__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"], {
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
      })), _ref, response_people && _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_5___default()(react_data_table_component__WEBPACK_IMPORTED_MODULE_13___default.a, {
        data: response_people,
        columns: Columns,
        paginationTotalRows: response_people.length,
        pagination: true,
        paginationPerPage: 15
      })))));
    }
  }]);

  return ListPeople;
}(react__WEBPACK_IMPORTED_MODULE_6__["PureComponent"]);

ListPeople.contextTypes = {
  i18n: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.object,
  router: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.object
};

var mapStateToProps = function mapStateToProps(_ref2) {
  var application = _ref2.application;
  var response_people = application.response_people;
  return {
    response_people: response_people
  };
};

/* harmony default export */ __webpack_exports__["a"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_8__["connect"])(mapStateToProps)(Object(lib_connectDataFetchers_jsx__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"])(ListPeople, [_redux_actions_application__WEBPACK_IMPORTED_MODULE_10__[/* REQUEST_GET_PEOPLE */ "d"]], true)));

/***/ })

};;