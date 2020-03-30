import React , { Component } from 'react';
import PropTypes from 'prop-types';
import connectDataFetchers from 'lib/connectDataFetchers.jsx';
import { connect } from 'react-redux';
import AnalyzeReturns from 'containers/AnalyzeReturns/analyze-returns';
import ErrorBoundary from 'components/common/error-boundary/error-boundary';
import { REQUEST_ANALYZE_RETURNS_DATA } from '../redux/actions/properties';

class AnalyzeReturnsPage extends Component {

	constructor(props) {
		super(props);
		this.state = {};
		this.onClickCloseMsg = this.onClickCloseMsg.bind(this);
	}

	componentWillUnmount() {
		window.localStorage.setItem('analyzereturnsinfopopup', true);
	}

	onClickCloseMsg() {
		this.setState({
			hideInfoPopup : true
		});
		window.localStorage.setItem('analyzereturnsinfopopup', true);
	}

	static contextTypes = { i18n: PropTypes.object };

	render() {
		const { hideInfoPopup } = this.state;
		const showInfoPopup = window.localStorage && window.localStorage.getItem('analyzereturnsinfopopup') !== 'true' && !hideInfoPopup;
		const { l } = this.context.i18n;
		return (
            <div className="analyze-returns-page">
               <ErrorBoundary>
                <AnalyzeReturns {...this.props}/>
				{ showInfoPopup && <div className="outside-vistor-message print-hide">
					<p className="title">{l('DIDYOUKNOW')}</p>
					<p className="msg">
						You can modify the estimates shown on this screen and save the changes by clicking on <strong>Save Returns</strong> button above. You can access the saved version under your profile.
					</p>
					<div className="flex flex-justify-end"><a onClick={this.onClickCloseMsg} href="javascript:void(0)">{l('GOTIT')}</a></div>
					{/* <button className="close" onClick={this.onClickCloseMsg}><i className="pe-7s-close-3"/></button> */}
				</div>}
			   </ErrorBoundary>
            </div>
		);
	}

}

const mapStateToProps = ({properties}) => {
	const { analyze_returns_data } = properties;
	return { ...analyze_returns_data };
};

export default connect(mapStateToProps)(
    connectDataFetchers(AnalyzeReturnsPage, [
		REQUEST_ANALYZE_RETURNS_DATA
	], true)
);
