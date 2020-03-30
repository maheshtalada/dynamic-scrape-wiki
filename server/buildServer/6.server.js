#!/usr/bin/env node
exports.ids = [6];
exports.modules = {

/***/ 255:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(163);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);
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
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(137);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(115);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _Track__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(256);
/* harmony import */ var _Handle__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(257);
/* harmony import */ var _Steps__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(258);
/* harmony import */ var _Marks__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(259);
/* harmony import */ var add_dom_event_listener__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(260);
/* harmony import */ var add_dom_event_listener__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(add_dom_event_listener__WEBPACK_IMPORTED_MODULE_16__);









function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }











function noop() {}

function addEventListener(target, eventType, cb) {
  /* eslint camelcase: 2 */
  var callback = react_dom__WEBPACK_IMPORTED_MODULE_8___default.a.unstable_batchedUpdates ? function run(e) {
    react_dom__WEBPACK_IMPORTED_MODULE_8___default.a.unstable_batchedUpdates(cb, e);
  } : cb;
  return add_dom_event_listener__WEBPACK_IMPORTED_MODULE_16___default()(target, eventType, callback);
}

function isNotTouchEvent(e) {
  return e.touches.length > 1 || e.type.toLowerCase() === 'touchend' && e.touches.length > 0;
}

function getTouchPosition(vertical, e) {
  return vertical ? e.touches[0].clientY : e.touches[0].pageX;
}

function getElementPostion(ele) {
  return ele.getBoundingClientRect();
}

function getMousePosition(vertical, e) {
  return vertical ? e.clientY : e.pageX;
}

function getHandleCenterPosition(vertical, handle) {
  var coords = handle.getBoundingClientRect();
  return vertical ? coords.top + coords.height * 0.5 : coords.left + coords.width * 0.5;
}

function pauseEvent(e) {
  e.stopPropagation();
  e.preventDefault();
}

var RangeSlider =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default()(RangeSlider, _Component);

  function RangeSlider(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default()(this, RangeSlider);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(RangeSlider).call(this, props));
    var range = props.range,
        min = props.min,
        max = props.max,
        step = props.step;
    var initialValue = range ? Array.apply(null, Array(range + 1)).map(function () {
      return min;
    }) : min;
    var defaultValue = 'defaultValue' in props ? props.defaultValue : initialValue;
    var value = props.value !== undefined ? props.value : defaultValue;
    var bounds = (range ? value : [min, value]).map(function (v) {
      return _this.trimAlignValue(v);
    });
    var recent;

    if (range && bounds[0] === bounds[bounds.length - 1] && bounds[0] === max) {
      recent = 0;
    } else {
      recent = bounds.length - 1;
    }

    _this.state = {
      handle: null,
      recent: recent,
      bounds: bounds,
      tooltipsOffset: [] //

    };
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default()(RangeSlider, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      if (!('value' in nextProps || 'min' in nextProps || 'max' in nextProps)) {
        return;
      }

      var bounds = this.state.bounds;

      if (nextProps.range) {
        var value = nextProps.value || bounds;
        var nextBounds = value.map(function (v) {
          return _this2.trimAlignValue(v, nextProps);
        });

        if (nextBounds.every(function (v, i) {
          return v === bounds[i];
        })) {
          return;
        }

        this.setState({
          bounds: nextBounds
        });

        if (bounds.some(function (v) {
          return _this2.isValueOutOfBounds(v, nextProps);
        })) {
          this.props.onChange(nextBounds);
        }
      } else {
        var _value = nextProps.value !== undefined ? nextProps.value : bounds[1];

        var nextValue = this.trimAlignValue(_value, nextProps);

        if (nextValue === bounds[1] && bounds[0] === nextProps.min) {
          return;
        }

        this.setState({
          bounds: [nextProps.min, nextValue]
        });

        if (this.isValueOutOfBounds(bounds[1], nextProps)) {
          this.props.onChange(nextValue);
        }
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var tip1 = this.refs['handle-0'] && this.refs['handle-0'].refs['tooltip-0'].clientWidth || 0,
          tip2 = this.refs['handle-1'] && this.refs['handle-1'].refs['tooltip-1'].clientWidth || 0;
      this.setState({
        tooltipsOffset: ["-".concat(tip1 / 2, "px"), "-".concat(tip2 / 2, "px")]
      });
    }
  }, {
    key: "onChange",
    value: function onChange(state) {
      var props = this.props;
      var isNotControlled = !('value' in props);
      var tip1 = this.refs['handle-0'] && this.refs['handle-0'].refs['tooltip-0'].clientWidth || 0,
          tip2 = this.refs['handle-1'] && this.refs['handle-1'].refs['tooltip-1'].clientWidth || 0;
      this.setState({
        tooltipsOffset: ["-".concat(tip1 / 2, "px"), "-".concat(tip2 / 2, "px")]
      });

      if (isNotControlled) {
        this.setState(Object.assign({}, state, {
          tooltipsOffset: ["-".concat(tip1 / 2, "px"), "-".concat(tip2 / 2, "px")]
        }));
      } else if (state.handle !== undefined) {
        this.setState({
          handle: state.handle,
          tooltipsOffset: ["-".concat(tip1 / 2, "px"), "-".concat(tip2 / 2, "px")]
        });
      }

      var data = _objectSpread({}, this.state, {}, state);

      var changedValue = props.range ? data.bounds : data.bounds[1];
      props.onChange(changedValue);
    }
  }, {
    key: "onMouseDown",
    value: function onMouseDown(e) {
      if (e.button !== 0) {
        return;
      }

      var position = getMousePosition(this.props.vertical, e);

      if (!this.isEventFromHandle(e)) {
        this.dragOffset = 0;
      } else {
        var handlePosition = getHandleCenterPosition(this.props.vertical, e.target);
        this.dragOffset = position - handlePosition;
        position = handlePosition;
      }

      this.onStart(position);
      this.addDocumentEvents('mouse');
      pauseEvent(e);
    }
  }, {
    key: "onMouseMove",
    value: function onMouseMove(e) {
      var position = getMousePosition(this.props.vertical, e);
      this.onMove(e, position - this.dragOffset);
    }
  }, {
    key: "onMove",
    value: function onMove(e, position) {
      pauseEvent(e);
      var props = this.props;
      var state = this.state;
      var diffPosition = position - this.startPosition;
      diffPosition = this.props.vertical ? -diffPosition : diffPosition;
      var diffValue = diffPosition / this.getSliderLength() * (props.max - props.min);
      var value = this.trimAlignValue(this.startValue + diffValue);
      var oldValue = state.bounds[state.handle];

      if (value === oldValue) {
        return;
      }

      var nextBounds = _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(state.bounds);

      nextBounds[state.handle] = value;
      var nextHandle = state.handle;

      if (props.pushable !== false) {
        var originalValue = state.bounds[nextHandle];
        this.pushSurroundingHandles(nextBounds, nextHandle, originalValue);
      } else if (props.allowCross) {
        nextBounds.sort(function (a, b) {
          return a - b;
        });
        nextHandle = nextBounds.indexOf(value);
      }

      this.onChange({
        handle: nextHandle,
        bounds: nextBounds
      });
    }
  }, {
    key: "onStart",
    value: function onStart(position) {
      var props = this.props;
      props.onBeforeChange(this.getValue());
      var value = this.calcValueByPos(position);
      this.startValue = value;
      this.startPosition = position;
      var state = this.state;
      var bounds = state.bounds;
      var valueNeedChanging = 1;

      if (this.props.range) {
        var closestBound = 0;

        for (var i = 1; i < bounds.length - 1; ++i) {
          if (value > bounds[i]) {
            closestBound = i;
          }
        }

        if (Math.abs(bounds[closestBound + 1] - value) < Math.abs(bounds[closestBound] - value)) {
          closestBound = closestBound + 1;
        }

        valueNeedChanging = closestBound;
        var isAtTheSamePoint = bounds[closestBound + 1] === bounds[closestBound];

        if (isAtTheSamePoint) {
          valueNeedChanging = state.recent;
        }

        if (isAtTheSamePoint && value !== bounds[closestBound + 1]) {
          valueNeedChanging = value < bounds[closestBound + 1] ? closestBound : closestBound + 1;
        }
      }

      this.setState({
        handle: valueNeedChanging,
        recent: valueNeedChanging
      });
      var oldValue = state.bounds[valueNeedChanging];

      if (value === oldValue) {
        return;
      }

      var nextBounds = _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(state.bounds);

      nextBounds[valueNeedChanging] = value;
      this.onChange({
        bounds: nextBounds
      });
    }
  }, {
    key: "onTouchMove",
    value: function onTouchMove(e) {
      if (isNotTouchEvent(e)) {
        this.end('touch');
        return;
      }

      var position = getTouchPosition(this.props.vertical, e);
      this.onMove(e, position - this.dragOffset);
    }
  }, {
    key: "onTouchStart",
    value: function onTouchStart(e) {
      if (isNotTouchEvent(e)) {
        return;
      }

      var position = getTouchPosition(this.props.vertical, e);

      if (!this.isEventFromHandle(e)) {
        this.dragOffset = 0;
      } else {
        var handlePosition = getHandleCenterPosition(this.props.vertical, e.target);
        this.dragOffset = position - handlePosition;
        position = handlePosition;
      }

      this.onStart(position);
      this.addDocumentEvents('touch');
      pauseEvent(e);
    }
    /**
     * Returns an array of possible slider points, taking into account both
     * `marks` and `step`. The result is cached.
     */

  }, {
    key: "getPoints",
    value: function getPoints() {
      var _this$props = this.props,
          marks = _this$props.marks,
          step = _this$props.step,
          min = _this$props.min,
          max = _this$props.max;
      var cache = this._getPointsCache;

      if (!cache || cache.marks !== marks || cache.step !== step) {
        var pointsObject = _objectSpread({}, marks);

        if (step !== null) {
          for (var point = min; point <= max; point += step) {
            pointsObject[point] = point;
          }
        }

        var points = Object.keys(pointsObject).map(parseFloat);
        points.sort(function (a, b) {
          return a - b;
        });
        this._getPointsCache = {
          marks: marks,
          step: step,
          points: points
        };
      }

      return this._getPointsCache.points;
    }
  }, {
    key: "getPrecision",
    value: function getPrecision(step) {
      var stepString = step.toString();
      var precision = 0;

      if (stepString.indexOf('.') >= 0) {
        precision = stepString.length - stepString.indexOf('.') - 1;
      }

      return precision;
    }
  }, {
    key: "getSliderLength",
    value: function getSliderLength() {
      var slider = this.refs.slider;

      if (!slider) {
        return 0;
      }

      return this.props.vertical ? slider.clientHeight : slider.clientWidth;
    }
  }, {
    key: "getSliderStart",
    value: function getSliderStart() {
      var slider = this.refs.slider;
      var rect = slider.getBoundingClientRect();
      return this.props.vertical ? rect.top : rect.left;
    }
  }, {
    key: "getValue",
    value: function getValue() {
      var bounds = this.state.bounds;
      return this.props.range ? bounds : bounds[1];
    }
  }, {
    key: "addDocumentEvents",
    value: function addDocumentEvents(type) {
      if (type === 'touch') {
        // just work for chrome iOS Safari and Android Browser
        this.onTouchMoveListener = addEventListener(document, 'touchmove', this.onTouchMove.bind(this));
        this.onTouchUpListener = addEventListener(document, 'touchend', this.end.bind(this, 'touch'));
      } else if (type === 'mouse') {
        this.onMouseMoveListener = addEventListener(document, 'mousemove', this.onMouseMove.bind(this));
        this.onMouseUpListener = addEventListener(document, 'mouseup', this.end.bind(this, 'mouse'));
      }
    }
  }, {
    key: "calcOffset",
    value: function calcOffset(value) {
      var _this$props2 = this.props,
          min = _this$props2.min,
          max = _this$props2.max;
      var ratio = (value - min) / (max - min);
      return ratio * 100;
    }
  }, {
    key: "calcValue",
    value: function calcValue(offset) {
      var _this$props3 = this.props,
          vertical = _this$props3.vertical,
          min = _this$props3.min,
          max = _this$props3.max;
      var ratio = Math.abs(offset / this.getSliderLength());
      var value = vertical ? (1 - ratio) * (max - min) + min : ratio * (max - min) + min;
      return value;
    }
  }, {
    key: "calcValueByPos",
    value: function calcValueByPos(position) {
      var pixelOffset = position - this.getSliderStart();
      var nextValue = this.trimAlignValue(this.calcValue(pixelOffset));
      return nextValue;
    }
  }, {
    key: "end",
    value: function end(type) {
      this.removeEvents(type);
      this.props.onAfterChange(this.getValue());
      this.setState({
        handle: null
      });
    }
  }, {
    key: "isEventFromHandle",
    value: function isEventFromHandle(e) {
      var _this3 = this;

      return this.state.bounds.some(function (x, i) {
        return _this3.refs["handle-".concat(i)] && e.target === Object(react_dom__WEBPACK_IMPORTED_MODULE_8__["findDOMNode"])(_this3.refs["handle-".concat(i)]);
      });
    }
  }, {
    key: "isValueOutOfBounds",
    value: function isValueOutOfBounds(value, props) {
      return value < props.min || value > props.max;
    }
  }, {
    key: "pushHandle",
    value: function pushHandle(bounds, handle, direction, amount) {
      var originalValue = bounds[handle];
      var currentValue = bounds[handle];

      while (direction * (currentValue - originalValue) < amount) {
        if (!this.pushHandleOnePoint(bounds, handle, direction)) {
          // can't push handle enough to create the needed `amount` gap, so we
          // revert its position to the original value
          bounds[handle] = originalValue;
          return false;
        }

        currentValue = bounds[handle];
      } // the handle was pushed enough to create the needed `amount` gap


      return true;
    }
  }, {
    key: "pushHandleOnePoint",
    value: function pushHandleOnePoint(bounds, handle, direction) {
      var points = this.getPoints();
      var pointIndex = points.indexOf(bounds[handle]);
      var nextPointIndex = pointIndex + direction;

      if (nextPointIndex >= points.length || nextPointIndex < 0) {
        // reached the minimum or maximum available point, can't push anymore
        return false;
      }

      var nextHandle = handle + direction;
      var nextValue = points[nextPointIndex];
      var threshold = this.props.pushable;
      var diffToNext = direction * (bounds[nextHandle] - nextValue);

      if (!this.pushHandle(bounds, nextHandle, direction, threshold - diffToNext)) {
        // couldn't push next handle, so we won't push this one either
        return false;
      } // push the handle


      bounds[handle] = nextValue;
      return true;
    }
  }, {
    key: "pushSurroundingHandles",
    value: function pushSurroundingHandles(bounds, handle, originalValue) {
      var threshold = this.props.pushable;
      var value = bounds[handle];
      var direction = 0;

      if (bounds[handle + 1] - value < threshold) {
        direction = +1;
      } else if (value - bounds[handle - 1] < threshold) {
        direction = -1;
      }

      if (direction === 0) {
        return;
      }

      var nextHandle = handle + direction;
      var diffToNext = direction * (bounds[nextHandle] - value);

      if (!this.pushHandle(bounds, nextHandle, direction, threshold - diffToNext)) {
        // revert to original value if pushing is impossible
        bounds[handle] = originalValue;
      }
    }
  }, {
    key: "removeEvents",
    value: function removeEvents(type) {
      if (type === 'touch') {
        this.onTouchMoveListener.remove();
        this.onTouchUpListener.remove();
      } else if (type === 'mouse') {
        this.onMouseMoveListener.remove();
        this.onMouseUpListener.remove();
      }
    }
  }, {
    key: "trimAlignValue",
    value: function trimAlignValue(v, nextProps) {
      var state = this.state || {};
      var handle = state.handle,
          bounds = state.bounds;

      var _this$props4 = _objectSpread({}, this.props, {}, nextProps || {}),
          marks = _this$props4.marks,
          step = _this$props4.step,
          min = _this$props4.min,
          max = _this$props4.max,
          allowCross = _this$props4.allowCross;

      var val = v;

      if (val <= min) {
        val = min;
      }

      if (val >= max) {
        val = max;
      }
      /* eslint-disable eqeqeq */


      if (!allowCross && handle != null && handle > 0 && val <= bounds[handle - 1]) {
        val = bounds[handle - 1];
      }

      if (!allowCross && handle != null && handle < bounds.length - 1 && val >= bounds[handle + 1]) {
        val = bounds[handle + 1];
      }
      /* eslint-enable eqeqeq */


      var points = Object.keys(marks).map(parseFloat);

      if (step !== null) {
        var closestStep = (val - min) / step * step + min;
        points.push(closestStep);
      }

      var diffs = points.map(function (point) {
        return Math.abs(val - point);
      });
      var closestPoint = points[diffs.indexOf(Math.min.apply(Math, diffs))];
      return step !== null ? parseFloat(closestPoint.toFixed(this.getPrecision(step))) : closestPoint;
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this,
          _classNames3;

      var _this$state = this.state,
          handle = _this$state.handle,
          bounds = _this$state.bounds,
          tooltipsOffset = _this$state.tooltipsOffset;
      var _this$props5 = this.props,
          className = _this$props5.className,
          title = _this$props5.title,
          prefixCls = _this$props5.prefixCls,
          tooltipPrefixCls = _this$props5.tooltipPrefixCls,
          disabled = _this$props5.disabled,
          vertical = _this$props5.vertical,
          dots = _this$props5.dots,
          included = _this$props5.included,
          range = _this$props5.range,
          step = _this$props5.step,
          marks = _this$props5.marks,
          max = _this$props5.max,
          min = _this$props5.min,
          tipTransitionName = _this$props5.tipTransitionName,
          tipFormatter = _this$props5.tipFormatter,
          children = _this$props5.children,
          type = _this$props5.type,
          uom = _this$props5.uom;
      var customHandle = this.props.handle;
      var offsets = bounds.map(function (v) {
        return _this4.calcOffset(v);
      });
      var handleClassName = "".concat(prefixCls, "-handle");
      var handlesClassNames = bounds.map(function (v, i) {
        var _classNames;

        return classnames__WEBPACK_IMPORTED_MODULE_11___default()((_classNames = {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_classNames, handleClassName, true), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_classNames, "".concat(handleClassName, "-").concat(i + 1), true), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_classNames, "".concat(handleClassName, "-lower"), i === 0), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_classNames, "".concat(handleClassName, "-upper"), i === bounds.length - 1), _classNames));
      });
      var isNoTip = step === null || tipFormatter === null;
      var commonHandleProps = {
        prefixCls: prefixCls,
        tooltipPrefixCls: tooltipPrefixCls,
        noTip: isNoTip,
        tipTransitionName: tipTransitionName,
        tipFormatter: tipFormatter,
        vertical: vertical
      };
      var handles = bounds.map(function (v, i) {
        return Object(react__WEBPACK_IMPORTED_MODULE_9__["cloneElement"])(customHandle, _objectSpread({}, commonHandleProps, {
          className: handlesClassNames[i],
          value: v,
          offset: offsets[i],
          dragging: handle === i,
          key: i,
          toolTipOffset: tooltipsOffset[i],
          handleKey: i,
          ref: "handle-".concat(i),
          type: type,
          uom: uom
        }));
      });

      if (!range) {
        handles.shift();
      }

      var isIncluded = included || range;
      var tracks = [];

      for (var i = 1; i < bounds.length; ++i) {
        var _classNames2;

        var trackClassName = classnames__WEBPACK_IMPORTED_MODULE_11___default()((_classNames2 = {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_classNames2, "".concat(prefixCls, "-track"), true), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_classNames2, "".concat(prefixCls, "-track-").concat(i), true), _classNames2));
        tracks.push(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()(_Track__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"], {
          className: trackClassName,
          vertical: vertical,
          included: isIncluded,
          offset: offsets[i - 1],
          length: offsets[i] - offsets[i - 1]
        }, i));
      }

      var sliderClassName = classnames__WEBPACK_IMPORTED_MODULE_11___default()((_classNames3 = {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_classNames3, prefixCls, true), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_classNames3, "".concat(prefixCls, "-with-marks"), Object.keys(marks).length), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_classNames3, "".concat(prefixCls, "-disabled"), disabled), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_classNames3, "".concat(prefixCls, "-vertical"), this.props.vertical), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_classNames3, className, !!className), _classNames3));
      var l = this.context.i18n.l;
      var uomLabel = uom ? "(".concat(l(uom), ")") : '';
      return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {}, void 0, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("span", {
        className: "".concat(prefixCls, "-title")
      }, void 0, l(title.toUpperCase()), " ", uomLabel), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        ref: "slider",
        className: sliderClassName,
        onTouchStart: disabled ? noop : this.onTouchStart.bind(this),
        onMouseDown: disabled ? noop : this.onMouseDown.bind(this)
      }, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: "".concat(prefixCls, "-rail")
      }), tracks, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()(_Steps__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"], {
        prefixCls: prefixCls,
        vertical: vertical,
        marks: marks,
        dots: dots,
        step: step,
        included: isIncluded,
        lowerBound: bounds[0],
        upperBound: bounds[bounds.length - 1],
        max: max,
        min: min
      }), handles, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()(_Marks__WEBPACK_IMPORTED_MODULE_15__[/* default */ "a"], {
        className: "".concat(prefixCls, "-mark"),
        vertical: vertical,
        marks: marks,
        included: isIncluded,
        lowerBound: bounds[0],
        upperBound: bounds[bounds.length - 1],
        max: max,
        min: min
      }), children));
    }
  }]);

  return RangeSlider;
}(react__WEBPACK_IMPORTED_MODULE_9__["Component"]);

RangeSlider.contextTypes = {
  router: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.object,
  i18n: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.object
};
RangeSlider.propTypes = {
  title: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.string,
  min: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.number,
  max: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.number,
  step: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.number,
  defaultValue: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.number)]),
  value: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.number)]),
  marks: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.object,
  included: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.bool,
  className: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.string,
  prefixCls: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.string,
  tooltipPrefixCls: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.string,
  disabled: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.bool,
  children: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.any,
  onBeforeChange: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.func,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.func,
  onAfterChange: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.func,
  handle: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.element,
  tipTransitionName: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.string,
  tipFormatter: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.func,
  dots: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.bool,
  range: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.bool, prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.number]),
  vertical: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.bool,
  allowCross: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.bool,
  pushable: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.bool, prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.number])
};
RangeSlider.defaultProps = {
  prefixCls: 'rc-slider',
  className: '',
  tipTransitionName: '',
  min: 0,
  max: 100,
  step: 1,
  marks: {},
  handle: _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()(_Handle__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"], {}),
  onBeforeChange: noop,
  onChange: noop,
  onAfterChange: noop,
  tipFormatter: function tipFormatter(value) {
    return value;
  },
  included: true,
  disabled: false,
  dots: false,
  range: false,
  vertical: false,
  allowCross: true,
  pushable: false,
  title: ''
};
/* harmony default export */ __webpack_exports__["default"] = (RangeSlider);

/***/ }),

/***/ 256:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);



var Track = function Track(_ref) {
  var className = _ref.className,
      included = _ref.included,
      vertical = _ref.vertical,
      offset = _ref.offset,
      length = _ref.length;
  var style = {
    visibility: included ? 'visible' : 'hidden'
  };

  if (vertical) {
    style.bottom = "".concat(offset, "%");
    style.height = "".concat(length, "%");
  } else {
    style.left = "".concat(offset, "%");
    style.width = "".concat(length, "%");
  }

  return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
    className: className,
    style: style
  });
};

/* harmony default export */ __webpack_exports__["a"] = (Track);

/***/ }),

/***/ 257:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Handle; });
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
/* harmony import */ var _utils_localeUtil__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(99);










var _ref =
/*#__PURE__*/
_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
  className: "rc-slider-tooltip-arrow"
});

var Handle =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(Handle, _Component);

  function Handle(props, ref) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, Handle);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Handle).call(this, props, ref));
    _this.state = {
      isTooltipVisible: true
    };
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(Handle, [{
    key: "renderHandleValue",
    value: function renderHandleValue() {
      var _this$props = this.props,
          uom = _this$props.uom,
          type = _this$props.type,
          value = _this$props.value;

      if (type === 'price') {
        return Object(_utils_localeUtil__WEBPACK_IMPORTED_MODULE_8__[/* formatCurrency */ "b"])(value, 1, uom);
      }

      if (type === 'area') {
        return Object(_utils_localeUtil__WEBPACK_IMPORTED_MODULE_8__[/* handleLargeNumbers */ "e"])(value, 1);
      }

      return value && value % 1 !== 0 ? value.toFixed(2) : value;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          prefixCls = _this$props2.prefixCls,
          tooltipPrefixCls = _this$props2.tooltipPrefixCls,
          className = _this$props2.className,
          tipTransitionName = _this$props2.tipTransitionName,
          tipFormatter = _this$props2.tipFormatter,
          vertical = _this$props2.vertical,
          offset = _this$props2.offset,
          value = _this$props2.value,
          dragging = _this$props2.dragging,
          noTip = _this$props2.noTip,
          toolTipOffset = _this$props2.toolTipOffset,
          handleKey = _this$props2.handleKey,
          type = _this$props2.type;
      var style = vertical ? {
        bottom: "".concat(offset, "%")
      } : {
        left: "".concat(offset, "%")
      };

      var handle = _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: className,
        style: style
      });

      if (noTip) {
        return handle;
      }

      var isTooltipVisible = dragging || this.state.isTooltipVisible;
      var toolTipStyle = Object.assign({}, style, {
        'marginLeft': toolTipOffset
      });
      return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: "rc-slider-ctr",
        style: {
          'position': 'relative'
        }
      }, void 0, handle, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
        className: "rc-slider-tooltip  rc-slider-tooltip-placement-top",
        style: toolTipStyle,
        ref: "tooltip-".concat(handleKey)
      }, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: "rc-slider-tooltip-content"
      }, void 0, _ref, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: "rc-slider-tooltip-inner"
      }, void 0, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("span", {}, void 0, this.renderHandleValue())))));
    }
  }]);

  return Handle;
}(react__WEBPACK_IMPORTED_MODULE_6__["Component"]);


Handle.propTypes = {
  prefixCls: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.string,
  tooltipPrefixCls: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.string,
  className: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.string,
  vertical: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.bool,
  offset: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.number,
  tipTransitionName: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.string,
  tipFormatter: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.func,
  value: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.number]),
  dragging: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.bool,
  noTip: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.bool
};

/***/ }),

/***/ 258:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(115);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);





function calcPoints(vertical, marks, dots, step, min, max) {
  var points = Object.keys(marks).map(parseFloat);

  if (dots) {
    for (var i = min; i <= max; i = i + step) {
      if (points.indexOf(i) >= 0) {
        continue;
      }

      points.push(i);
    }
  }

  return points;
}

var Steps = function Steps(_ref) {
  var prefixCls = _ref.prefixCls,
      vertical = _ref.vertical,
      marks = _ref.marks,
      dots = _ref.dots,
      step = _ref.step,
      included = _ref.included,
      lowerBound = _ref.lowerBound,
      upperBound = _ref.upperBound,
      max = _ref.max,
      min = _ref.min;
  var range = max - min;
  var elements = calcPoints(vertical, marks, dots, step, min, max).map(function (point) {
    var _classNames;

    var offset = "".concat(Math.abs(point - min) / range * 100, "%");
    var style = vertical ? {
      bottom: offset
    } : {
      left: offset
    };
    var isActived = !included && point === upperBound || included && point <= upperBound && point >= lowerBound;
    var pointClassName = classnames__WEBPACK_IMPORTED_MODULE_3___default()((_classNames = {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_classNames, "".concat(prefixCls, "-dot"), true), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_classNames, "".concat(prefixCls, "-dot-active"), isActived), _classNames));
    return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("span", {
      className: pointClassName,
      style: style
    }, point);
  });
  return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
    className: "".concat(prefixCls, "-step")
  }, void 0, elements);
};

/* harmony default export */ __webpack_exports__["a"] = (Steps);

/***/ }),

/***/ 259:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(58);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(115);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);




function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }




var Marks = function Marks(_ref) {
  var className = _ref.className,
      vertical = _ref.vertical,
      marks = _ref.marks,
      included = _ref.included,
      upperBound = _ref.upperBound,
      lowerBound = _ref.lowerBound,
      max = _ref.max,
      min = _ref.min;
  var marksKeys = Object.keys(marks);
  var marksCount = marksKeys.length;
  var unit = 100 / (marksCount - 1);
  var markWidth = unit * 0.9;
  var range = max - min;
  var elements = marksKeys.map(parseFloat).sort(function (a, b) {
    return a - b;
  }).map(function (point) {
    var _classNames;

    var isActived = !included && point === upperBound || included && point <= upperBound && point >= lowerBound;
    var markClassName = classnames__WEBPACK_IMPORTED_MODULE_4___default()((_classNames = {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_classNames, "".concat(className, "-text"), true), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_classNames, "".concat(className, "-text-active"), isActived), _classNames));
    var bottomStyle = {
      // height: markWidth + '%',
      marginBottom: '-50%',
      bottom: "".concat((point - min) / range * 100, "%")
    };
    var leftStyle = {
      width: "".concat(markWidth, "%"),
      marginLeft: "".concat(-markWidth / 2, "%"),
      left: "".concat((point - min) / range * 100, "%")
    };
    var style = vertical ? bottomStyle : leftStyle;
    var markPoint = marks[point];
    var markPointIsObject = _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1___default()(markPoint) === 'object' && !react__WEBPACK_IMPORTED_MODULE_3___default.a.isValidElement(markPoint);
    var markLabel = markPointIsObject ? markPoint.label : markPoint;
    var markStyle = markPointIsObject ? _objectSpread({}, style, {}, markPoint.style) : style;
    return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("span", {
      className: markClassName,
      style: markStyle
    }, point, markLabel);
  });
  return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
    className: className
  }, void 0, elements);
};

/* harmony default export */ __webpack_exports__["a"] = (Marks);

/***/ })

};;