import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from '../components/common/error-boundary/error-boundary';


if (process.env.BROWSER) {
	require('../assets/styles');
}

const DEFAULT_SIZE = 'infinity', // desktop & larger
	SCREEN_TYPES = {
		extraSmall : 1,
		small : 2,
		medium : 3,
		large : 4,
		infinity : 5
	};

class App extends Component {

	static propTypes = {
		location : PropTypes.object,
		routes   : PropTypes.array,
		children : PropTypes.object,
		history  : PropTypes.object
	};

	static contextTypes = {
		i18n : PropTypes.object,
		screenSize : PropTypes.number,
		country : PropTypes.string
	};



	static childContextTypes = {
		i18n : PropTypes.object,
		screenSize : PropTypes.number,
		country : PropTypes.string
	};

	getChildContext() {
		return {
			screenSize : this.getScreenSize(),
			country : 'US',
		};
	}

	constructor(props) {

		super(props);
		this.initialPageLoad = true;
		this.state = {};

	}

	renderChildren() {
		const childrenWithProps = React.Children.map(this.props.children,
			(child) => React.cloneElement(child, {...this.props})
		);
		return childrenWithProps;
	}

	render() {
		return (
			<div id="app-view" style={{'height':'100%'}}>
				<ErrorBoundary>
					<div className={`layout-container`} id="main-wrap">
						{this.renderChildren()}
					</div>
				</ErrorBoundary>
			</div>
		);
	}

	getScreenSize() {
		return 4;
	}
}

export default App;
