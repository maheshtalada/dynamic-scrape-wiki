import React, { memo } from 'react';
import { Link } from 'react-router';
import { getSearchPageViewType } from '../../utils/searchUtil';

const BreadCrumb = memo(({item, screenSize}) => {
	return (
		<li className="breadcrumbs__item">
			{
				item.url ?
					<Link to={`${item.url}?investmentcategories=all&${getSearchPageViewType(screenSize, 'list', false)}`}>{item.name} </Link>
					: <span>{item.name}</span>
			}
			 <i className="pe-7s-angle-right" />
		</li>
	)
});

const BreadCrumbs = memo(({breadCrumbList, screenSize}) => {
	return (
		<div className="breadcrumbs">
			<ul className="breadcrumbs__list">
				{breadCrumbList.map(breadcrumb => <BreadCrumb item ={breadcrumb} screenSize={screenSize}/>)}
			</ul>
		</div>
	)
});

export default BreadCrumbs;

