import React from 'react';
import PropTypes from 'prop-types';
import DefaultComponent from '../default-component/default-component';
import PillsSuggestions from '../../../common/pills-suggestions/pills-suggestions';

export default class MultiOptionsPillsComponent extends DefaultComponent {

	static propTypes = {
		label: PropTypes.string,
		classNames: PropTypes.array,
		disabled: PropTypes.bool
	};

	static defaultProps = {
		label: '',
		disabled: false,
		classNames: ['schema__options', 'schema__multi__dropdown']
	};

	constructor(props) {
		super(props);
		this.handleAddition = this.handleAddition.bind(this);
	}


	componentDidMount() {
		// if length of children
		// update conditional id with null
		if(this.props.conditionalId && this.props.children.length && !this.props.getDataByID(this.props.conditionalId)) {
			this.props.storeValue(this.props.conditionalId, 'haveValue');
		}

	}

	componentDidUpdate() {
		// if length of children
		// update conditional id with null
		if(this.props.conditionalId && !this.props.children.length && this.props.getDataByID(this.props.conditionalId)) {
			this.props.storeValue(this.props.conditionalId, '');
		}
	}

	renderLabel(label) {
		const { l } = this.props;
		return this.props.writeMode ?
			(null)
			: super.renderLabel(l(label));
	}


	handleAddition(pill, index) {
		const { options = ''} = this.props.data;
		let selfIndex = this.props.root().children.length;
		let key = this.props.root().data.key++;
		this.props.root().inject([this.props.root().pillCloneChild], selfIndex, key );
		let storeId = this.props.root().pillCloneChild.id.replace(/\*/, key)
		const pillValue = options && typeof index === 'number' && options[index].value || pill;
		this.props.storeValue(storeId, pillValue);
		if(this.props.conditionalId && !this.props.getDataByID(this.props.conditionalId)) {
			this.props.storeValue(this.props.conditionalId, 'haveValue');
		}
	}

	renderMultiPillsSuggestions(value, options) {
		const { l } = this.props;
		let labelClassName = this.getLabelClassNames(),
			className = this.getValueClassNames(),
			suggestions = options && options.map(optionsObject=>l(optionsObject.label));
		return (
			<span className={className}>
				<div className="schema__dropdown__wrapper">
					<label className={labelClassName} htmlFor={this.state.uniqueId} data-automation-selector={this.getDataId('label')}>{l(this.props.label)}{this.renderLabelInfo()}{this.renderTooltip()}</label>
					<div className={`schema__pills__wrapper ${this.props.data.isFullPill ? 'full-pills': ''}`}>
						{this.props.children}
					</div>
					<PillsSuggestions
						pills={[]}
						errorClass={this.props.error}
						isAddNewPill = {this.props.data.isAddNewPill}
						isFullPill = {this.props.data.isFullPill}
						suggestions={suggestions}
						renderPill={()=>{}}
						renderPills={()=>{}}
						handleAddition={this.handleAddition}
						minQueryLength={1}
						placeholder={l(this.props.placeHolder) || l(this.props.label)}
						translator = {l}
					/>
				</div>
				{this.props.error &&
				<div className="schema__error" key="error">{this.renderErrorMessage(this.props.error)}</div>
				}
			</span>
		);
	}

	renderReadValue(value) {
		let label = (this.props.data.options.filter((option) =>{
			return option.value === value;
		})[0] || {}).label;

		if (typeof label === 'undefined') {
			console.error('VALUE NOT FOUND', this.props);
		}

		return super.renderValue(label);
	}

	renderValue(value) {
		let options = this.props.data.options;
		return this.props.writeMode? this.renderMultiPillsSuggestions(value, options) : this.renderReadValue(value);
	}

}


