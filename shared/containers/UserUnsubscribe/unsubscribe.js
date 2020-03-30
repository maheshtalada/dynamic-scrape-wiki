import React, { Component, Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import { pickBy as _pickBy } from 'lodash';
import UserService from '../../services/user';
import Checkbox from 'components/common/checkbox/checkbox';
import Spinner from 'components/common/spinner/spinner';


const UnsubscribeOption = memo(({label, name, onChange, checked, description}) => {
    return (
        <div className="unsubscribe-option">
            <Checkbox label={label} name={name} id={name} onChange={(evt)=>{onChange(evt,name)}} checked={checked}/>
            <div className="unsubscribe-option__description">
                {description}
            </div>
        </div>
    );
});

const UNSUBSCRIBE_OPTIONS_CONFIG = [
	{
		"label" : 'MARKETING_UNSUBSCRIBE',
		"name" : 'marketing',
		"description" : 'MARKETING_UNSUBSCRIBE_DESCRIPTION'
	},
	{
		"label" : 'LEADGENERATION_UNSUBSCRIBE',
		"name" : 'leadGeneration',
		"description" : 'LEADGENERATION_UNSUBSCRIBE_DESCRIPTION'
	}
]

const UNSUBSCRIBE_CONFIG =  {
	'user' : {
		"endpoint" : "userunsubscribe",
		"options" : UNSUBSCRIBE_OPTIONS_CONFIG,
		"tokenKey" : "uidtoken"
	},
	"brokerage-firm" : {
		"endpoint" : "brokarageunsubscribe",
		"options" : [UNSUBSCRIBE_OPTIONS_CONFIG[0]],
		"tokenKey" : "bidtoken"
	}
};

export default class Unsubscribe extends Component {

    static contextTypes = {
        i18n : PropTypes.object,
        router : PropTypes.object
    }

    constructor(props) {
        super(props);
        this.state = {
            marketing : true
        };
        this.onChangeOption = this.onChangeOption.bind(this);
        this.onClickUnsubscribe = this.onClickUnsubscribe.bind(this);
        this.unsubscribe = props.params && UNSUBSCRIBE_CONFIG[props.params.type] || UNSUBSCRIBE_CONFIG['user']
	}

    onChangeOption(evt,optionName) {
        this.setState({
            [optionName] : evt.currentTarget.checked
        });
    }

    async onClickUnsubscribe() {
        const { location } = this.props;
        let payload = {
            [this.unsubscribe.tokenKey] : location.query[this.unsubscribe.tokenKey],
            'unsubcribemarketingemail' : this.state.marketing || null,
            'unsubcribeleadgenerationemail' : this.state.leadGeneration || null
        };

        this.setState({
            isLoading : true,
            success : false,
            error: ''
        });
        try {
            const response = await UserService.callPOST(_pickBy(payload),this.unsubscribe.endpoint);
            if(response.data.status === 'success') {
                this.setState({
                    error: '',
                    success : true,
                    isLoading: false,
                });    
            } else {
                this.setState({
                    error: {
                        error : {
                            error_description : 'UNSUBSCRIBEERROR'
                        }
                    },
                    isLoading: false,
                });
            }
        } catch (e) {
            this.setState({
                error: e,
                isLoading: false
            });
        }
    }

    renderUnSubscribeOptions(l) {
		return this.unsubscribe.options.map(option => <UnsubscribeOption label={l(option.label)} name={option.name} description={l(option.description)} checked={this.state[option.name]} onChange={this.onChangeOption}/>)
	}

    render() {
        const { isLoading, error, success } = this.state;
        const { l } = this.context.i18n;
        return (
            <div className="unsubscribe-page">
                <div className="flex flex-column flex-align-start unsubscribe-page__container">
                    <h1 style={{textAlign: 'center', 'marginBottom': '40px', 'width': '100%'}}>{l('UNSUBSCRIBE')}</h1>
                    <div className="flex flex-column flex-align-start">
						{ this.renderUnSubscribeOptions(l) }
					</div>
                    <div className="unsubscribe-btn-wrap">
                        {error && <div className="alert alert-warning">
				            <div>{l(error.error.error_description)}</div>
                        </div>}
                        {success && <div className="alert alert-success">
				            <div>{l('UNSUBSCRIBE_SUCCESSFULL')}</div>
			            </div>}
                        {<button className="btn btn-primary btn-l" onClick={this.onClickUnsubscribe}>{l('CONFIRM')}</button>}
                        {isLoading && <Spinner />}
                    </div>
                </div>
            </div>
        );
    }
}
