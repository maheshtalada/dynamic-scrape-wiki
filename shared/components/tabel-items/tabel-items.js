import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM,{ findDOMNode } from 'react-dom';
import { Link } from 'react-router';
import Cx from 'classnames';

export default class TableItems extends Component {

	static propTypes = {
		children        : PropTypes.object,
		classes : PropTypes.string,
		tableData :  PropTypes.object,
		noColumns : PropTypes.number,
		handleClick : PropTypes.func
	};

	static PropTypes = {
		children: '',
		classes:'',
		tableData :  [],
		noColumns : 1,
		handleClick: ()=>{}
	};

	constructor(props) {
		super(props);
		this.state = {
			isOpenMenu : false
		};
	}

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object
	};

	renderChildren(options) {
		const { l } = this.context.i18n;
		const { isOpenMenu } = this.state;
		const updateClasses = isOpenMenu ? 'show' : 'hide';
		return (
			<ul className={Cx("table-item-link__children-wrapper", updateClasses)}>
				{
					options.children.map((child)=>{
						return (
							<li onClick={()=>{
								this.clickHandler(child.link,child.route);
							}}>{l(child.name)}</li>
						);
					})
				}
			</ul>
		);
	}

	renderColumn(option) {
		const { l } = this.context.i18n;
		const { isOpenMenu } = this.state;
		const iconClasses = isOpenMenu ? 'up' : 'down';
		return(
			<td>
				{
					option.route && <Link to={option.route} onClick={()=>{
						this.clickHandler(option.link,option.route);
					}} className="table-item-link">
						{option.name && <span className="table-item-link__name">{option.icon && <i className={Cx('table-icon',option.icon)} />}{l(option.name)}</span> }
					</Link>
				}
				{
					!option.route && <a onClick={()=>{
						if(option.children) {
							return;
						}this.clickHandler(option.link);
					}} className="table-item-link">
						{option.name && option.children && <span className="table-item-link__name" onClick={()=>this.toggleSubMenu(option.name)}>{l(option.name)}{ option.children && <i className={Cx('table-icon',`pe-7s-angle-${iconClasses}`)} /> }</span> }
						{option.name && !option.children && <span className="table-item-link__name">{ option.icon && <i className={Cx('table-icon',option.icon)} /> }{l(option.name)}</span> }
						{ option.children && this.renderChildren(option) }
					</a>
				}
			</td>
		);
	}

	renderTableData() {
		const { tableData, noColumns, userData } = this.props;
		let role_id ='';
		 role_id = userData && userData.role_id || '';
		const options = tableData.filter((option)=>{
			if(option.visibility) {
				return role_id > option.visibility && option ;
			}
			return option;
		});

		let items = options.chunk(noColumns);
		return items.map((item) => {
			return (
				<tr>
					{
						item.map((option) => {
							return this.renderColumn(option);
						})
					}
				</tr>
			);
		});
	}

	render() {
		return (
			<div className="table-items">
				{ this.props.children}
				<table className="table-items-table">
					<tbody>
					{this.renderTableData()}
					</tbody>
				</table>
			</div>

		);
	}

	toggleSubMenu(name) {
		const {isOpenMenu = undefined } = this.state;
		this.setState({
			menu : name,
			isOpenMenu : !isOpenMenu
		})
	}

	clickHandler(link,route) {
		this.props.handleClick && this.props.handleClick(link,route);
	}

}
