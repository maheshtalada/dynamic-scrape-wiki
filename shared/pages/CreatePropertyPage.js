import React , { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import CreateProperty from '../containers/CreateProperty/CreateProperty';
import Footer from '../components/footer/footer';

class CreatePropertyPage extends Component {

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object,
		country: PropTypes.string,
		screenSize: PropTypes.number
	};

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { l } = this.context.i18n;
		const { screenSize } = this.context;
		return (
			<Fragment>
				<div className="create-property-page">
					<CreateProperty {...this.props} />
				</div>
				<Footer dispatch={this.props.dispatch}/>
			</Fragment>
		);
	}
}

export default CreatePropertyPage;
