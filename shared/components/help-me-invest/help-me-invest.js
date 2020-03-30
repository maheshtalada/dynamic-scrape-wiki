import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import {steps} from 'containers/InvestorWizard/steps/steps-config.json';
import { Link } from 'react-router';
import { HELP_ME_INVEST_LINK } from 'utils/app-constants';
import Input from 'components/common/input/input';

export default class HelpMeInvest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            investment : ''
        };
        this.onInvestmentChange = this.onInvestmentChange.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.routeGuidedSearch = this.routeGuidedSearch.bind(this);
    }

    static contextTypes = {
        router : PropTypes.object
    }
    
    onKeyUp(event) {
		if(event.keyCode === 13) {
			this.routeGuidedSearch();
		}
    }
    
    routeGuidedSearch() {
        const { investment } = this.state;
        this.context.router.push({
			pathname : `/guided-search/${Number(investment) > 0 ? 'type' : 'investment'}`,
			query: Number(investment) > 0 ? { amount : investment} : {}
		});   
    }

    onInvestmentChange(value) {
        this.setState({
            investment : value
        });
    }

    render() {
        const { l,screenSize } = this.props;
        const { investment } = this.state;
        return (
            <div className="help-me-invest">
                <div className="help-me-invest__content-wrap">
                    <div key="inputCurrencyContainer" className="wizard__answer-options-container schema__text__currency__container">
                        <span className="input-prefix">$</span>
                        <Input
                            placeholder={'How much would you like to invest ?'}
                            autoFocus={true}
                            type="number"
                            value={investment}
                            onKeyUp={this.onKeyUp}
                            onChange={this.onInvestmentChange}
                            classes="no-border quick-search-input">
                        </Input>
                    </div>
                </div>
                <div className="flex flex-justify-start help-me-invest__start-link-wrap">
                    <button className="help-me-invest__start-link btn btn-primary flex flex-align-center flex-justify-between" data-tag-category="Guided Search" data-tag-action="Click" data-tag-label="Start" onClick={this.routeGuidedSearch}>
                        {l('GETSTARTED')}
                    </button>
                </div>
            </div>
        )
    }
}