import React, {Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Cx from 'classnames';
import { Scrollbars } from 'react-custom-scrollbars';
import ReactTooltip from 'react-tooltip';
import MobileOverlay from '../mobile-overlay/mobile-overlay';
import SelectOptionsGroup from './select-options-group';
import { findIndex as _findIndex } from 'lodash';

class Select extends Component {
	static propTypes = {
		label: PropTypes.string,
		name: PropTypes.string,
		options: PropTypes.array,
		selected: PropTypes.number,
		placeholder: PropTypes.string,
		onChange: PropTypes.func,
		wrapperCls : PropTypes.string,
		displayValue : PropTypes.string,
		isTranslationRequired : PropTypes.boolean
	};

	static defaultProps = {
		selected : '',
		onChange : () => {},
		label: '',
		name: 'select',
		placeholder: '',
		wrapperCls:'',
		displayValue: '',
		isTranslationRequired: true,
		isButton : false
	};

	static contextTypes = {
		i18n : PropTypes.object
	};

	static getOptionName(name,l, isTranslationRequired) {
		if(typeof name === 'string' && isTranslationRequired) {
			return l(name.toUpperCase());
		}
		return name;
	}

	static getFlatOptions(options) {
		let flatOptions = [];
		options.map(option => {
			if(option.group) {
				flatOptions = flatOptions.concat(option.group.options)
			} else {
				flatOptions.push(option);
			}
		});
		return flatOptions;
	}

	constructor(props) {
		super(props);
		this.selectClick = this.selectClick.bind(this);
		this.openOptions = this.openOptions.bind(this);
		this.keyPress = this.keyPress.bind(this);
		this.containerClick = this.containerClick.bind(this);
		this.state = {
			selected : props.selected,
			active: props.selected,
			showOptions: props.showOptionsByDefault || false,
			flatOptions: Select.getFlatOptions(props.options)
		};
	}

	componentDidMount() {
		if(this.props.showOptionsByDefault) {
			this.addEventListeners();
		}
	}

	componentWillReceiveProps(newProps) {
		this.setState({
			selected : newProps.selected,
			active: newProps.selected,
			showOptions: newProps.showOptions
		})
	}

	componentDidUpdate() {
		ReactTooltip.rebuild();
		if((this.state.showOptions || this.state.forceOpen) && !this.props.showOptionsInOverlay) {
			this.addEventListeners();
		}
	}

	selectClick(index,value,name) {
		const {selected, flatOptions} = this.state;
		const option = name ? _findIndex(flatOptions,{ name : name}) : index;
		if(option !== selected) {
			this.setState({selected: option, active: option, showOptions: false, forceOpen : false});
			this.props.onChange(value, flatOptions[index]);
		} else {
			this.setState({active: selected, showOptions: false, forceOpen : false});
		}
		document.removeEventListener('keydown', this.keyPress);
		document.removeEventListener('click', this.containerClick);
		//document.removeEventListener('touchstart', this.containerClick);
	}

	openOptions() {
		this.setState({forceOpen: !this.state.forceOpen});
	}

	addEventListeners() {
		document.addEventListener('keydown', this.keyPress);
		document.addEventListener('click', this.containerClick);
		//document.addEventListener('touchstart', this.containerClick);
	}

	containerClick(event) {
		const isModalOpen = document.querySelector(".rrm-holder .login-modal");
		if (!(this.refs.dropdown && ReactDOM.findDOMNode(this.refs.dropdown).contains(event.target)) && !isModalOpen) {
			this.selectClick(this.state.selected);
		}
	}

	keyPress(event) {
		const {active, selected, flatOptions} = this.state;
		const length = flatOptions.length;
		switch(event.keyCode) {
			case 13:
				// enter
				this.selectClick(active);
				return;
			case 27:
				// escape
				this.selectClick(selected);
				return;
			case 38:
				// up arrow
				event.preventDefault();
				const sudoActive = active - 1 >= 0 ? active - 1 : length - 1;
				this.setState({active: (sudoActive) % length});
				return;
			case 40:
				// down arrow
				event.preventDefault();
				this.setState({active: (active + 1) % length});
				return;
		}
	}

	renderOption(option,index) {
		const { isTranslationRequired, name } = this.props;
		const {selected = '', active = '', flatOptions} = this.state;
		const { l } = this.context.i18n;

		if(option.component) {
			return (
				<li key={option.name} onClick={()=>{ option.isOnSelectClose && this.setState({showOptions: false, forceOpen : false}) || false}} className={option.class +' '+ (option.disabled ? 'disabled ' : '') + (flatOptions[selected] && option.name === flatOptions[selected].name ? 'selected ' : '') + (flatOptions[active] && option.name === flatOptions[active].name ? 'active ': '')}>
					<div className="option">
						{option.icon && <i className={Cx('option__icon',option.icon)} />}
						{option.component}
					</div>
				</li>
			)
		}

		return(
			<li onClick={(e) => {
				if(e.target.classList.contains('tooltip')) {
					return;
				};
				e.stopPropagation(); this.selectClick(index,option.value,option.name);
			}}title={Select.getOptionName(option.name,l,isTranslationRequired)} key={option.name} className={option.class +' '+ (option.disabled ? 'disabled ' : '') + (flatOptions[selected] && option.name === flatOptions[selected].name ? 'selected ' : '') + (flatOptions[active] && option.name === flatOptions[active].name ? 'active ': '')}>
				<div className="option">
					{option.icon && <i className={Cx('option__icon',option.icon)} />}
					{Select.getOptionName(option.name,l,isTranslationRequired)}
				</div>
				{option.tooltip && <i className="tooltip pe-7s-help1"  data-for={`select-options-tooltip-${name}`} data-tip={l(option.tooltip)} />}
			</li>
		)

	}

	renderOptions() {
		const {options = [], openSubOptions} = this.props;
		return (
			<ul className="dropdown-content select-dropdown animated slideInDown" ref="dropdown" style={{display: ((this.state.showOptions || this.state.forceOpen)? 'block' : 'none')}}>
				<Scrollbars className="scrollbars" autoHeight={true} autoHeightMax={400}>
					{options.map((option, index) => {
						if(option.group) {
							return (
								<SelectOptionsGroup openSubOptions={openSubOptions} title={option.group.title} tooltip={option.group.tooltip}>
									{option.group.options.map((option,gIndex) => {
										return this.renderOption(option,gIndex);
									})}
								</SelectOptionsGroup>
							)
						} else {
							return this.renderOption(option,index);
						}
					})}
				</Scrollbars>
			</ul>
		)
	}

	render() {
		const {options = [], label = '', wrapperCls, displayValue, btnClassName, isTranslationRequired, iconClass, showOptionsInOverlay, btnLabel, name, isButton} = this.props;
		const {selected , showOptions, active , flatOptions, forceOpen} = this.state;
		const { l } = this.context.i18n;
		const selectedOption = typeof selected === 'number' ? Select.getOptionName(flatOptions[selected].name,l,isTranslationRequired) : displayValue;
		return (
			<div className={Cx("select-wrapper",wrapperCls)}>
				<button title={selectedOption} className={Cx('select-wrapper__select-btn',btnClassName)} onClick={this.openOptions}>
						{iconClass && <i className={Cx("select-wrapper__select-btn__icon",iconClass)}/>}
						<span className="select-wrapper__select-btn__value">{btnLabel ? l(btnLabel) : selectedOption}</span>
					{ !isButton && <i className="select-wrapper__select-btn__arrow-icon pe-7s-angle-down" /> }
				</button>
				{(forceOpen || showOptions) && (showOptionsInOverlay ?
					<MobileOverlay className="sort-options-overlay" onCloseOverlay={()=>{
						this.setState({
							showOptions : false,
							forceOpen : false
						});
					}}>
						{this.renderOptions()}
					</MobileOverlay> :
					this.renderOptions())
				}
				<ReactTooltip place="bottom" id={`select-options-tooltip-${name}`}/>
			</div>
    	);
	}
}

export default (Select);
