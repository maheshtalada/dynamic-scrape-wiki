import React from 'react';
import PropTypes from 'prop-types';
import uniqueFormId from '../../../../utils/uniqueFormId.js';
import MarkdownWrapper from './markdown-wrapper';
import { findIndex, compact} from 'lodash';
import classnames from 'classnames';
import ReactTooltip from 'react-tooltip';
import Cx from 'classnames';

/**
 * @description Renders a default component that outputs the value and label into a readable format
 * @prop data {object} Object containing the value string for the component
 * @prop label {string} Label to show the user what the component is
 * @prop classNames {array} Additional classnames to be added to the component
 * @prop writeMode {boolean} state used to determine if the value is editable
 * @prop pristine {boolean} state whether value has changed on the component
 * @prop error {boolean} state whether component has an error
 * @prop valid {boolean} state whether component value is valid
 */


function getClassNamesFor(type) {
	let classNames = [`schema__${type}`];
	if (this.props.writeMode) {
		classNames.push(`schema__${type}--edit`);
	}
	if (!this.hasValue()) {
		classNames.push(`schema__${type}--empty`);
	}
	if (this.props.error) {
		classNames.push(`schema__${type}--error`);
	} else if (this.props.pristine) {
		classNames.push(`schema__${type}--pristine`);
	}
	if (this.props.valid) {
		classNames.push(`schema__${type}--valid`);
	}
	if (!this.props.label) {
		classNames.push(`schema__${type}--no-label`);
	}
	return classnames(classNames);
}

export default class DefaultComponent extends React.Component {

	static propTypes = {
		id: PropTypes.string,
		data: PropTypes.object,
		label: PropTypes.string,
		tooltip:PropTypes.tooltip,
		classNames: PropTypes.array,
		writeMode: PropTypes.bool,
		pristine: PropTypes.bool,
		error: PropTypes.bool,
		valid: PropTypes.bool
	};

	static defaultProps = {
		data: {},
		label: '',
		classNames: [],
		writeMode: false,
		error: false,
		pristine: false,
		valid: false
	};


	constructor(props) {
		super(props);

		this.state = {
			uniqueId: null,
			classNames: [],
			tooltipOpen: false
		};
	}

	componentWillMount() {
		this.setState({
			uniqueId: uniqueFormId()
		});
	}

	renderTooltip(tooltipText='') {
		const { l } = this.props;
		tooltipText = tooltipText || this.props.tooltip || (this.props.data || {}).tooltip;
		let valueTooltip = [];
		if (tooltipText) {
			valueTooltip.push(
				<i key="icon"
				   data-tooltipstate={this.state.tooltipOpen}
					className="schema--tooltip__tooltip-icon pe-7s-help1 print-hide"
				   data-tip={l(tooltipText)}
				   data-for={tooltipText}
					data-automation-selector={this.getDataId('tooltip-icon')}
				/>,<ReactTooltip delayShow={100} id={tooltipText}/>
			);

			if (this.state.tooltipOpen) {
				valueTooltip.push(
					<div className="schema--tooltip__tooltip-content"
						 key="tooltip" data-automation-selector={this.getDataId('tooltip')}>
						 <MarkdownWrapper value={l(tooltipText)} />
					</div>
				);
			}
		}
		return valueTooltip;
	}

	renderLabelInfo(isRenderText=false,isRequired=true) {
		const mandatory = (isRequired && this.props.validation &&
							this.props.validation.length > 0 &&
							findIndex(this.props.validation, { type : 'required'}) > -1 && (isRenderText ? ' *' : <span className="schema__field-required-sign">*</span>)) || '';
		if(!this.props.labelInfo) {
			return mandatory;
		}

		const { l } = this.props;
		return isRenderText ? ` (${l(this.props.labelInfo)})${mandatory} ` : <span>{` (${l(this.props.labelInfo)})`}{mandatory}</span>;

	}

	getPlaceHolder() {
		const { l } = this.props;
		return `${l(this.props.label)}${this.renderLabelInfo(true)}`;
	}

	renderErrorMessage(message) {
		const { l } = this.props;
		if(message.indexOf('###') < 0) {
			return l(message);
		}
		const messageSplit = message.split('###');
		return `${l(messageSplit[0])} ${messageSplit[1]}`;
	}

	renderLabel(label) {
		const { l, data={} } = this.props;
		return (
			<span className={Cx(this.getLabelClassNames(),data.htmlId ? "anchor-label": "")} id={data.htmlId} data-automation-selector={this.getDataId('label')}>
				{label}
				{this.renderLabelInfo()}
				{this.renderTooltip()}
			</span>
		);
	}

	renderValue(value) {
		return (
			<span className={this.getValueClassNames()} data-automation-selector={this.getDataId('value')}>
				{value}
			</span>
		);
	}

	renderExtraLabel(value) {
		const { l } = this.props;
		if(this.props.headerRequired) {
			return (
				<span className="schema__label" data-automation-selector={this.getDataId('extra-label')}>
					{l(value)}{this.renderLabelInfo()}
				</span>
			);
		}
		return null;
	}

	render() {
		return (
			<div className={classnames([this.props.classNames, 'schema__component', this.state.classNames])}>
				{this.renderLabel(this.props.label)}
				{this.renderValue(this.props.data && this.props.data.value || '')}
			</div>
		);
	}

	getValueClassNames() {
		return getClassNamesFor.call(this, 'value');
	}

	getLabelClassNames() {
		return getClassNamesFor.call(this, 'label');
	}

	getClassNames() {
		return classnames([this.props.classNames, 'schema__component', this.state.classNames]);
	}

	hasValue() {
		return !!(this.convertValueToString(this.props.data && this.props.data.value || ''));
	}

	addClassName(className) {
		if (this.state.classNames.indexOf(className) === -1) {
			let classNames = this.state.classNames;
			classNames.push(className);
			this.setState({
				classNames
			});
		}
	}

	toggleTooltip() {
		this.setState({
			tooltipOpen: !this.state.tooltipOpen
		});
	}

	getBoolean(val) {
		return val === 'true';
	}

	removeClassName(className) {
		let classIndex = this.state.classNames.indexOf(className);
		if (classIndex !== -1) {
			let classNames = this.state.classNames;
			classNames.splice(classIndex, 1);
			this.setState({
				classNames
			});
		}
	}

	convertValueToString(value) {
		let stringValue = value;

		if (typeof value === 'object') {
			stringValue = '';
			if (value.value) {
				stringValue = value.value;
			}
			if (Array.isArray(stringValue)) {
				value = stringValue;
			}
		}

		if (Array.isArray(value)) {
			stringValue = compact(value).join(' ');
		} else if (typeof value === 'number') {
			stringValue = value.toString(10);
		} else if (typeof value === 'undefined' || value === null) {
			stringValue = '';
		}

		return stringValue;
	}

	getLabelToClass(label) {
		return label && label.trim().toLowerCase().replace(/ /g,'-');
	}

	getDataId(suffix) {
		return `${this.props.id || this.state.uniqueId}.${suffix || ''}`;
	}

	getSliderRanges(range, min, max) {
		if(range !== '') {
			const list = range.split('-');
			return [list[0], list[1]];
		}
		return [min, max];
	}

	getSliderValue(value, max) {
		if(value !== '') {
			return value;
		}
		return max;
	}

}
