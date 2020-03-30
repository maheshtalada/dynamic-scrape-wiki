import React , { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Input from 'components/common/input/input';
import LinearNavigation from 'components/common/linear-navigation/linear-navigation';

class InitialInvestment extends Component {

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object,
		country: PropTypes.string,
		screenSize: PropTypes.number
	};

	constructor(props) {
		super(props);
		this.state = {
			value : ( props.investor_wizard && props.investor_wizard.amount) || (props.location.query && props.location.query.amount) || ''
		};
		this.keyPress = this.keyPress.bind(this);
		this.onInvestmentChange = this.onInvestmentChange.bind(this);
	}

	componentDidMount() {
		document.addEventListener('keyup', this.keyPress);
	}

	componentWillUnmount() {
		document.removeEventListener('keyup', this.keyPress);
	}

	keyPress(event) {
		const { value = '' } = this.state;
		if(event.keyCode === 13 && Number(value) > 0) {
			this.onNextClick();
		}
	}

	render() {
		const { i18n : {l}} = this.context;
		const { value = '' } = this.state;
		const { stepConfig } = this.props;
		return (
			<div className="initial-investment wizard__step-container">
				<h3 className="wizard__question">{stepConfig.question}</h3>
				<div key="inputCurrencyContainer" className="wizard__answer-options-container schema__text__currency__container">
					<span className="input-prefix">$</span>
					<Input
						ref="placeInput"
						placeholder={''}
						onChange={this.onInvestmentChange}
						value={value}
						autoFocus={true}
						type="number"
						classes="no-border quick-search-input">
					</Input>
				</div>
				<LinearNavigation
					nextText={l('NEXT')}
					isNextDisabled={Number(value) > 0 ? false : true}
					className="linear-navigation--light-theme"
					isSaveExitRequired={false}
					isBackRequired={false}
					isNavigatingSaveExitRequired={false}
					onNext={this.onNextClick.bind(this)}
				/>
			</div>
		);
	}

	onInvestmentChange(value) {
		this.setState({value});
	}

	onNextClick() {
		const { value } = this.state;
		this.props.navigateNext({ amount : value } , {
			step : 'type',
			query : Object.assign({...this.props.location.query},{amount : value})
		});
	}

}

export default InitialInvestment;
