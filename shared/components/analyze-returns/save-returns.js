import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from 'components/common/page-loader/loader';
import Snackbar from 'components/common/snackbar/snackbar';
import { simulateClick } from 'utils/domUtils';
import PageActions from 'components/page-actions/page-actions';
import { connect } from 'react-redux';
import { REQUEST_SAVE_ANALYZE_RETURNS } from '../../redux/actions/properties';
import { extend as _extend } from 'lodash';

const STEP_AFTER_LOGIN = "saveReturns";
const SUCCESS_STATUS = 'success';

class SaveReturns extends PageActions {
    
    static contextTypes = {
        i18n : PropTypes.object
    }

    static propTypes = {
        saveResponse : PropTypes.object
    }

    static defaultProps = {
        saveResponse : {}
    }

    constructor(props) {
        super(props);
        this.state = {
            forceHideSnackbar : true
        };
        this.hideSnackbar = this.hideSnackbar.bind(this);
    }

    componentWillReceiveProps(props) {
		const { user, saveAnalyzeReturns } = props;
		if(this.isSubmitAction && user.user.isLogIn) {
			this.isSubmitAction = false;
			this.submitAction();
		}

		if(saveAnalyzeReturns && saveAnalyzeReturns.status === SUCCESS_STATUS && this.contactAddNotified === false){
			this.contactAddNotified = true;
			this.setState({
				isShowSnackbar : props.saveAnalyzeReturns.isSaving === false,
				snackbarMsg : props.saveAnalyzeReturns.error ? 'ERRORSAVING' : props.saveAnalyzeReturns.status === 'success' ? 'RETURNSSAVED' : ''
			})
		}

    }
    
    saveReturns() {
		this.contactAddNotified = false;
		this.setState({
            stepAfterLogin: null,
            forceHideSnackbar: false
        },()=>this.props.onSaveReturns());
    }

    hideSnackbar() {
        this.setState({
            forceHideSnackbar : true,
            isShowSnackbar : false
        }, ()=>{
			simulateClick('.page-actions .select-wrapper .select-wrapper__select-btn');
		});
    }

    render() {
        const { l } = this.context.i18n;
        const { saveAnalyzeReturns } = this.props;
        const { isShowSnackbar, forceHideSnackbar, snackbarMsg } = this.state;
        return (
            <div>
                {saveAnalyzeReturns && saveAnalyzeReturns.isSaving && <Loader/>}
                <Snackbar active={forceHideSnackbar ? false : isShowSnackbar} action={<i className="pe-7s-close-3"/>} timeout={3000} onActionClick={this.hideSnackbar} onTimeout={this.hideSnackbar}>
					{l(snackbarMsg)}
				</Snackbar>
                <button className="btn btn-sm btn-default save-analyze-returns__btn" onClick={()=>this.onActionClick(
				'addcontactform',
							{
								isLoginRequired : true,
								name : 'SAVERETURNS',
								isPostLoginSubmit : this.saveReturns.bind(this)
							}
						)}>
                    <i className="pe-7s-diskette"/>
                    <span>{l('SAVE')}</span>
                </button>
            </div>
        )
    }
}


const mapStateToProps = ({ properties, user , application}) => {
	return {
		saveAnalyzeReturns: properties.save_analyze_returns,
		user : user,
		actionSubmit : application.actionSubmit || '',
	};
};

export default connect(mapStateToProps)(SaveReturns);
