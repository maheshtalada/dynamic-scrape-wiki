import React , { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import LinearNavigation from 'components/common/linear-navigation/linear-navigation';
import SingleSelectBoxes from 'components/common/single-select-boxes';

class PurchaseType extends Component {

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object,
		country: PropTypes.string,
		screenSize: PropTypes.number
	};

	static getPurchaseType(price, investment) {
		if(investment > price) {
			return 'cash';
		}
		return 'leveraged';
	}

	constructor(props) {
		super(props);
		this.state = {
			value : ( props.investor_wizard && props.investor_wizard.purchasetype) || props.location.query.purchasetype || PurchaseType.getPurchaseType(props.stepConfig.condition, props.location.query.amount)
		};
		this.onPurchaseTypeChange = this.onPurchaseTypeChange.bind(this);
	}

	render() {
		const { i18n : {l}} = this.context;
		const { value} = this.state;
		const { stepConfig } = this.props;
		return (
			<div className="purchase-type-step wizard__step-container">
				<h3 className="wizard__question">{stepConfig.question}</h3>
				<div className="wizard__answer-options-container">
					<SingleSelectBoxes
						className="wizard-radio-type-options"
						boxOptions={stepConfig.boxoptions}
						selectedBox = {value}
						isAnyRequired={false}
						l={l}
						analyticsData={{}}
						onChange={(value)=>{this.onPurchaseTypeChange(value)}}/>
				</div>
				<LinearNavigation
					nextText={l('NEXT')}
					backText={l('PREVIOUS')}
					className="linear-navigation--light-theme"
					isSaveExitRequired={false}
					isNavigatingSaveExitRequired={false}
					onNext={this.onNextClick.bind(this)}
					onBack={this.onBackClick.bind(this)}
				/>
			</div>
		);
	}

	onPurchaseTypeChange(value) {
		this.setState({value});
	}

	onNextClick() {
		const { value } = this.state;
		this.props.navigateNext({ purchasetype : value}, {
			step : 'market',
			query : Object.assign({...this.props.location.query},{purchasetype : this.state.value})
		});
	}

	onBackClick() {
		this.props.navigatePrevious({
			step : 'investment',
			query : this.props.location.query
		});
	}
}

export default PurchaseType;
