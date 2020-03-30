import React from 'react';
import PropTypes from 'prop-types';
import DefaultComponent from '../default-component/default-component';
import Chip from '../../../common/chip/chip';
import PillsSuggestions from '../../../common/pills-suggestions/pills-suggestions';
import { findIndex as _findIndex } from 'lodash';

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
		this.state = {
			pills: ((pills=[], options=[])=> {
				if(options.length === 0) {
					return pills.map(pill=>pill);
				}
				return pills.map(pill=>props.l(options[_findIndex(options,{ "value" : pill})].label))
				})(props.data.value ,props.data.options)
		};
		this.handleDelete = this.handleDelete.bind(this);
		this.handleAddition = this.handleAddition.bind(this);
		this.renderPills = this.renderPills.bind(this);
		this.indexId = undefined
		this.storedPills = [];
	}



	componentDidMount() {
		const { pills =[] } = this.state;
		pills.forEach((pill,index) => this.onChange(pill, this.props.data.value[index]))
	}

	renderLabel(label) {
		const { l } = this.props;
		return this.props.writeMode ?
			(null)
			: super.renderLabel(l(label));
	}

	renderPills(pills) {
		return pills.map(pill=>pill);
	}

	handleDelete(i) {
		let pills = this.state.pills;
		const strIndex = _findIndex(this.storedPills,{ "label" : pills[i]});
		const id = `${this.props.id}(${this.storedPills[strIndex].id})`;
		pills.splice(i, 1);
		this.storedPills.splice(strIndex, 1);
		if(this.props.conditionalId && this.storedPills.length === 0 ) {
			this.props.storeValue(this.props.conditionalId, '');
		}
		this.setState({pills}, ()=>this.props.removeDataByID(id));
	}

	handleAddition(pill , pillIndex) {
		let pills = this.state.pills;
			// don't add if already added
		if(pills.indexOf(pill) < 0 && pill !== '') {
			pills.push(pill);
			this.setState({pills},()=>this.onChange(pill,pillIndex));
		}
	}

	getSelectedIndex() {
		this.indexId = typeof this.indexId  === 'undefined' ? 0 : (Number(this.indexId)+1);
		return this.indexId
	}

	renderMultiPillsSuggestions(value, options) {
		const { l } = this.props;
		let stringValue = this.convertValueToString(value),
			labelClassName = this.getLabelClassNames(),
			className = this.getValueClassNames(),
			selectDefaultOptionText = this.props.label === '' ? l('SELECTOPTION') : l(this.props.label),
			suggestions = options && options.map(optionsObject=>l(optionsObject.label));
		return (
			<span className={className}>
				<div className="schema__dropdown__wrapper">
					<label className={labelClassName} htmlFor={this.state.uniqueId} data-automation-selector={this.getDataId('label')}>{l(this.props.label)}{this.renderLabelInfo()}{this.renderTooltip()}</label>
					<PillsSuggestions
						pills={this.state.pills}
						errorClass={this.props.error}
						isAddNewPill = {this.props.data.isAddNewPill}
						isFullPill = {this.props.data.isFullPill}
						suggestions={suggestions}
						renderPill={(index, pill, isFullPill)=>{
							return <Chip className={isFullPill ? "full-pill" :''} onClose={e => {
								this.handleDelete(index);
							}}>{l(pill)}</Chip>
							//return <PillComponent pillLabel={l(pill)} className={isFullPill ? "full-pill" :''} />
						}}
						renderPills={this.renderPills}
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

	onChange(value, pillIndex) {
		let pillOption = {};
		if(typeof pillIndex === 'number') {
			pillOption = this.props.data.options[Number(pillIndex)];
			pillOption.label = this.props.l(pillOption.label);
		} else {
			pillOption.value = pillIndex ? pillIndex : value ;
			pillOption.label = value;
		}
		const selectedIndex = this.getSelectedIndex();
		this.storedPills.push({id:selectedIndex, ...pillOption});
		if(this.props.conditionalId && this.storedPills.length < 2) {
			this.props.storeValue(this.props.conditionalId, pillOption.value);
		}
		this.props.storeValue(`${this.props.id}(${selectedIndex})`,  pillOption.value);
	}
}


