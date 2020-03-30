'use strict';

var _jsx2 = require('babel-runtime/helpers/jsx');

var _jsx3 = _interopRequireDefault(_jsx2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _jasmineReact = require('../../../tests/unit/_jasmine-react.js');

var _jasmineReact2 = _interopRequireDefault(_jasmineReact);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var TestUtils = _react2.default.addons.TestUtils; // eslint-disable-line no-unused-vars

var _ref = (0, _jsx3.default)('div', {
	className: 'test-child'
}, void 0, 'Test');

describe('Scroll Fixed Component', function() {

	var container = null,
	    testComponent = null,
	    props = void 0;

	// require script in function so it doesn't get cached
	var ScrollFixed = require('./scroll-fixed.jsx');

	frameworkGlobals.isClient = true;
	frameworkGlobals.isServer = false;

	function buildComponent() {
		testComponent = _jasmineReact2.default.render(_react2.default.createElement(ScrollFixed, props), container);
	}

	beforeAll(function(done) {
		_jasmineReact2.default.createContainer(function(newContainer) {
			container = newContainer;
			done();
		});
		props = {
			scrollPosition: 100,
			top: 100,
			minWidth: 100,
			maxWidth: Infinity,
			children: [_ref]
		};
	});

	function fireScrollEvent(scrollTop, width) {
		width = width || 1200;
		var event = {
			target: {
				body: (0, _extends3.default)({}, document.body)
			}
		};
		event.target.body.scrollTop = scrollTop;
		event.target.body.offsetWidth = width;
		testComponent.handleScroll(event);
	}

	it('should contain children', function() {
		buildComponent();
		var testChild = TestUtils.findRenderedDOMComponentWithClass(testComponent, 'test-child');
		expect(testChild).not.toBe(null);
		expect(testChild.props.children).toBe('Test');
	});

	it('should change state to fixed if the window scroll position is greater than the param value', function() {
		buildComponent();
		fireScrollEvent(101);
		expect(testComponent.state.isActive).toBe(true);
	});

	it('should change state back to relative if the position is less than param value', function() {
		buildComponent();
		fireScrollEvent(101);
		expect(testComponent.state.isActive).toBe(true);
		fireScrollEvent(99);
		expect(testComponent.state.isActive).toBe(false);
	});

	it('should change state back to relative if the position is equal to the param value', function() {
		buildComponent();
		fireScrollEvent(100);
		expect(testComponent.state.isActive).toBe(false);
	});

	it('should stop being fixed if outside of the width range', function() {
		props.maxWidth = 1000;
		buildComponent();
		fireScrollEvent(101);
		expect(testComponent.state.isActive).toBe(false);
	});
});

// # sourceMappingURL=scroll-fixed.spec.js.map
