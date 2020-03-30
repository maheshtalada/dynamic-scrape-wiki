import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import schema from 'assets/static/schema/analyze-returns-tool-schema.json';
import AnalyzeReturnsTool from 'containers/AnalyzeReturns/analyze-returns-tool';
import ErrorBoundary from 'components/common/error-boundary/error-boundary';
import Loader from 'components/common/page-loader/loader';

class AnalyzeReturnsToolPage extends Component {

	constructor(props) {
		super(props);
	}

	static contextTypes = { i18n: PropTypes.object };

	render() {
        const { analyze_returns_zestimate } = this.props;
		return (
            <div className="analyze-returns-page analyze-returns-tool-page">
                {analyze_returns_zestimate.isFetching && <Loader />}
               <ErrorBoundary>
                    <AnalyzeReturnsTool schemaAnalyzeReturn={analyze_returns_zestimate.schemaAnalyzeReturn || schema} schemaKey={analyze_returns_zestimate.schemaAnalyzeReturn ? 'zestimateSchema' : 'blankSchema'} {...this.props}/>
			   </ErrorBoundary>
            </div>
		);
	}

}

const mapStateToProps = ({properties}) => {
	const { analyze_returns_zestimate = {} } = properties;
	return { analyze_returns_zestimate };
};

export default connect(mapStateToProps)(AnalyzeReturnsToolPage);
