import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '../checkbox/checkbox';
import Cx from 'classnames';
import { find as _find } from 'lodash';
import { replaceHyphenWithSpace} from '../../../utils/searchUtil';

class CheckboxList extends Component {
	static propTypes = {
		classNames : PropTypes.string,
		title : PropTypes.string,
		items : PropTypes.object,
		selectedValues : PropTypes.object,
		onChange : PropTypes.func,
		onToggleAll : PropTypes.func,
		itemCountToShow : PropTypes.number,
		isShowMoreRequired : PropTypes.bool,
		isTranslationRequired : PropTypes.bool
	};

	static defaultProps = {
		selectedValues : {},
		itemCountToShow : 10,
		isShowMoreRequired : true,
		isTranslationRequired : true,
		analyticsData : {}
	};

	static contextTypes = {
		i18n : PropTypes.object
	};

	static getItemsToShow(items,count,isShowMoreRequired=true) {
		if(!isShowMoreRequired || items.length <= count) {
			return items;
		}
		return items.slice(0,count);
	}

	constructor(props) {
		super(props);
		const itemsToShow = CheckboxList.getItemsToShow(props.items.buckets,props.itemCountToShow,props.isShowMoreRequired);
		this.state = {
			itemsToShow : itemsToShow,
			isShowMore : props.isShowMoreRequired && itemsToShow.length !== props.items.buckets.length ? true : undefined
		};
		this.onToggleAll = this.onToggleAll.bind(this);
		this.onToggleShowMore = this.onToggleShowMore.bind(this);
	}

	componentWillReceiveProps(props) {
		const itemsToShow = CheckboxList.getItemsToShow(props.items.buckets,props.itemCountToShow,props.isShowMoreRequired);
		this.setState ({
			itemsToShow : itemsToShow,
			isShowMore : props.isShowMoreRequired && itemsToShow.length !== props.items.buckets.length ? true : undefined
		});
	}

	cityNameFormatter(value) {
		return replaceHyphenWithSpace(value);
	}

	renderItem(item,index,flag,itemType) {
		const { selectedValues, onChange, onToggleAll, isTranslationRequired, displayFormatter, analyticsData } = this.props;
		const { l } = this.context.i18n;
		let nestedValues,nestedFacet;
		let subList = [];
		if(item.children) {
			nestedValues = [];
			nestedFacet = item.children[0].name;
			item.children[0].buckets.map(bucket => nestedValues.push(bucket.key));
			subList = selectedValues[nestedFacet].split(',');
		}
		const value = (item.value ? item.value : item.key);
		const itemLabel = item.label || value.toLowerCase();
		let label = isTranslationRequired ? l(itemLabel.toUpperCase()) : itemLabel;
		label = displayFormatter ? this[displayFormatter](value) : label;

		return <li className="item">
			<Checkbox analyticsData={analyticsData} label={`${label} ${item.count ? `(${item.count})` : ''}`} name={item.key} id={`${itemType}${item.key}`} onChange={(evt)=>{onChange(evt,itemType,nestedFacet,nestedValues)}} checked={flag}/>
			{item.children &&
				<ul className={`item__sub-list ${flag ? '': 'hide'}`}>
					{onToggleAll && item.children[0].buckets.length > 1 && this.renderActions(item.children[0].buckets,item.children[0].name)}
					{
						this.renderItems(item.children[0].buckets,subList,item.children[0].name)
					}
				</ul>
			}
		</li>
	};

	renderItems(items,list,itemType) {
		return items.map((item,index)=>{
			const flag = list.indexOf(item.key) > -1;
			return this.renderItem(item,index,flag,itemType,items);
		});
	};

	renderActions(buckets,itemName) {
		const { l } = this.context.i18n;
		const { selectedValues, analyticsData } = this.props;
		const showSelectAll = (!selectedValues[itemName] || buckets.length !== selectedValues[itemName].split(',').length);
		const showClearAll = selectedValues[itemName].replace(/,/g,'');
		return (
			<div className="checkbox-list-wrapper__items__actions">
				{showSelectAll && <button className={Cx("btn",{'separate' : showSelectAll && showClearAll})} data-tag-category={analyticsData.category} data-tag-action={analyticsData.action} data-tag-label={`${analyticsData.label} ${l('SELECTALL')}`} onClick={()=>{this.onToggleAll(true,buckets,itemName)}}>{l('SELECTALL')}</button>}
				{showClearAll && <button className="btn" data-tag-category={analyticsData.category} data-tag-action={analyticsData.action} data-tag-label={`${analyticsData.label} ${l('CLEARALL')}`} onClick={()=>{this.onToggleAll(false,buckets,itemName)}}>{l('CLEARALL')}</button>}
			</div>
		)
	}

	onToggleAll(checked,buckets,itemName) {
		let nestedItemName = '',itemValues = [],nestedItemValues = [];
		buckets.map(bucket => {
			itemValues.push(bucket.key);
			if(bucket.children) {
				nestedItemName = bucket.children[0].name;
				bucket.children[0].buckets.map(child => nestedItemValues.push(child.key));
			}
		});
		this.props.onToggleAll(checked,itemName,itemValues,nestedItemName,nestedItemValues);
	}

	onToggleShowMore() {
		const { isShowMore } = this.state;
		const { items, itemCountToShow } = this.props;
		this.setState({
			itemsToShow : isShowMore ? items.buckets : CheckboxList.getItemsToShow(items.buckets,itemCountToShow),
			isShowMore : !isShowMore
		})
	}

	render() {
		const { classNames , items, title, selectedValues, onToggleAll } = this.props;
		const list = selectedValues[items.name].split(',');
		const { l } = this.context.i18n;
		const { itemsToShow, isShowMore } = this.state;
		return(
			<div className={Cx('checkbox-list-wrapper',classNames)}>
				{title && <span className="title">{l(title.toUpperCase())}</span>}
				{onToggleAll && itemsToShow.length > 1 && this.renderActions(itemsToShow,items.name)}
				<ul className="checkbox-list-wrapper__items">
					{
						this.renderItems(itemsToShow,list,items.name)
					}
				</ul>
				{isShowMore !== undefined &&
					<button className="btn show-more" onClick={this.onToggleShowMore}>
						{isShowMore ?
							<span><i className="pe-7s-plus2"/> {l('MORE')}</span> :
							<span><i className="pe-7s-minus"/> {l('LESS')}</span>
						}
					</button>
				}
			</div>
		);
	}
}

export default CheckboxList;
