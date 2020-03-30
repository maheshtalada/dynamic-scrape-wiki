import React, {Component } from 'react';
import PropTypes from 'prop-types';
import Radio from './radio';
import Cx from 'classnames';

export default class RadioList extends Component {
	constructor(props) {
		super(props);
		const {selectedVal, isOptionALLRequired, items} = props;
		this.onChange = this.onChange.bind(this);
		this.state = {
			selectedVal : selectedVal || (isOptionALLRequired ? 'all' : items[0].key)
		}
	}

	componentWillReceiveProps(props) {
		this.setState({
			selectedVal : props.selectedVal
		})
	}

	static propTypes = {
		isOptionALLRequired : PropTypes.bool
	};

	static defaultProps = {
		isOptionALLRequired : true
	};

	static contextTypes = {
		i18n : PropTypes.object
	};

	onChange(evt) {
		this.setState({
			selectedVal : evt.currentTarget.value
		});
		this.props.onChange(evt);
	}

	render() {
		const { facet, classNames , items, title, isOptionALLRequired, labelAppendValue } = this.props;
		const { selectedVal } = this.state;
		const { l } = this.context.i18n;
		return(
			<div className={Cx('radio-list-wrapper',classNames)}>
				{title && <span className="title">{l(title.toUpperCase())}</span>}
				<div className="radio-list-wrapper__items">
					{isOptionALLRequired ? <Radio className="item" key={'all'} value="all" name={facet} id="all" checked={selectedVal === 'all' ? 'checked' : ''} onChange={this.onChange}>{l('ALL')}</Radio> : <div></div>}
					{
						items.map((item,index)=>{
							const displayValue = labelAppendValue ? `${l(item.key.toUpperCase())}${labelAppendValue}` : l(item.key.toUpperCase());
							return <Radio className="item" key={`${item.key}${index}`} value={item.key} name={facet} id={item.key} checked={selectedVal === item.key ? 'checked' : ''} onChange={this.onChange}>
								{displayValue}
								{item.count && <span className="item-count">{` (${item.count})`}</span>}
							</Radio>;
						})
					}
				</div>
			</div>
		);
	}
}
