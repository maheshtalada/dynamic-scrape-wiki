import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DepotContent from '../../assets/static/depot-categories.json';

class DepotDetails extends Component {
	constructor(props) {
		super(props);
	}

	static contextTypes = {
		i18n : PropTypes.object
	};

	render() {
		const { l } = this.context.i18n;
		return (
			<div className="depot-page__depot-categories ">
				{
					DepotContent.categories && DepotContent.categories.map((cat,index)=>{
						return (
							<div data-index = {index} className="depot-page__depot-categories__category-wrap cursor">
								<div className="depot-page__depot-categories__category-wrap__info ">
									<div className="depot-page__depot-categories__category-wrap__info__name ">
										<span>{l(cat.name)}</span>
									</div>
									<div className="depot-page__depot-categories__category-wrap__info__icon ">
										<i className={`pe-7s-${cat.icon || 'box2'}`}/>
									</div>
								</div>
								<ul className="depot-page__depot-categories__category-wrap__sub-categories ">
									{
										cat['sub-categories'].map(subCat=>{
											return <li>{l(subCat.name)}</li>;
										})
									}
								</ul>
							</div>
						);
					})
				}
			</div>
		);
	}
}

export default DepotDetails;
