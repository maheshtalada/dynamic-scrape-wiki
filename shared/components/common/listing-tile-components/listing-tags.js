import React from 'react';
import Cx from 'classnames';
import { getInvestmentCategories } from '../../../utils/propertyUtil';

export default function({listing, l, className, selectedTags=''}) {
	const investmentCategories = getInvestmentCategories(listing.investmentcategories,selectedTags);
	const rentalCategories = listing.rentalcategory && getInvestmentCategories([listing.rentalcategory],selectedTags);
	if(!rentalCategories && !investmentCategories) {
		return null;
	}
	return (
		<div className={Cx("flex flex-align-center",className)}>
			{rentalCategories ?
				rentalCategories.map(category => {
					return (
						<div className="investment-category-tag">
							{l(category.toUpperCase())}
						</div>
					)
				}) :
				investmentCategories.map(category => {
					return (
						<div className="investment-category-tag">
							{l(category.toUpperCase())}
						</div>
					)
				})
			}
		</div>
	)
}
