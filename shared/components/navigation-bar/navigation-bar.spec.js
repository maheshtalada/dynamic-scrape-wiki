'use strict';

var React = require('react');
var jasmineReact = require('../../../tests/unit/_jasmine-react');
var NavigationBar = require('./navigation-bar.jsx');

describe('Navigation Bar', function() {
	var testComponent = void 0,
	    props = void 0;

	function buildShallowComponent(_props, exposeRenderer) {
		return jasmineReact.shallowRender(React.createElement(NavigationBar, _props), exposeRenderer);
	}

	beforeEach(function() {
		props = {
			title: 'Test Title',
			steps: [{
				label: 'Set-up application',
				steps: 1
			}, {
				label: 'Your products',
				steps: 2
			}, {
				label: 'Your business',
				steps: 3,
				activeStep: 3
			}, {
				label: 'Your people',
				steps: 3
			}, {
				label: 'Review agreement',
				steps: 2
			}]
		};
	});

	it('should create a unordered list of steps', function() {
		testComponent = buildShallowComponent(props);
		expect(testComponent.props.children[1].type).toEqual('ul');
		expect(testComponent.props.children[1].props.children.length).toEqual(5);
	});

	it('should add a active class to the active step title', function() {
		testComponent = buildShallowComponent(props);
		var activeStep = testComponent.props.children[1].props.children[2];
		expect(activeStep.props.className.indexOf('navigation-bar__step--active')).not.toEqual(-1);
	});

	it('should add titles for each section', function() {
		expect(testComponent.props.children[0].props.children).toBe('Test Title');
	});

	it('should create subset uls in the li', function() {
		testComponent = buildShallowComponent(props);
		var subUl = testComponent.props.children[1].props.children[1].props.children[1];
		expect(subUl.type).toEqual('ul');
		expect(subUl.props.children.length).toBe(2);
	});

	it('should add navigation-bar__step--complete for the completed sections', function() {
		testComponent = buildShallowComponent(props);
		var completeStep = testComponent.props.children[1].props.children[1];
		expect(completeStep.props.className.indexOf('navigation-bar__step--complete')).not.toEqual(-1);
	});

	it('shouldn\'t add navigation-bar__step--complete for the incomplete sections', function() {
		testComponent = buildShallowComponent(props);
		var incompleteStep = testComponent.props.children[1].props.children[3];
		expect(incompleteStep.props.className.indexOf('navigation-bar__step--complete')).toEqual(-1);
	});

	it('shouldn\'t render steps as complete if their parent has the incomplete flag set to true', function() {
		props.steps[0].incomplete = true;
		testComponent = buildShallowComponent(props);
		var incompleteStep = testComponent.props.children[1].props.children[0];
		var completeStep = testComponent.props.children[1].props.children[1];
		expect(incompleteStep.props.className.indexOf('navigation-bar__step--complete')).toEqual(-1);
		expect(completeStep.props.className.indexOf('navigation-bar__step--complete')).not.toEqual(-1);
	});

	it('should add the number for non complete steps', function() {
		testComponent = buildShallowComponent(props);
		expect(testComponent.props.children[1].props.children[2].props.children[0].props.children[0].props.children[0]).toEqual(3);
		expect(testComponent.props.children[1].props.children[3].props.children[0].props.children[0].props.children[0]).toEqual(4);
		expect(testComponent.props.children[1].props.children[4].props.children[0].props.children[0].props.children[0]).toEqual(5);
	});

	it('should\'t add the number for complete steps', function() {
		testComponent = buildShallowComponent(props);
		expect(testComponent.props.children[1].props.children[0].props.children[0].props.children[0].props.children[0]).toEqual('');
		expect(testComponent.props.children[1].props.children[1].props.children[0].props.children[0].props.children[0]).toEqual('');
	});

	it('shouldn\'t render steps if steps not defined', function() {
		props.steps = null;
		testComponent = buildShallowComponent(props);
		expect(testComponent.props.children[0].props.children).toBe('Test Title');
		expect(testComponent.props.children[1]).toBe(null);
	});
});

// # sourceMappingURL=navigation-bar.spec.js.map
