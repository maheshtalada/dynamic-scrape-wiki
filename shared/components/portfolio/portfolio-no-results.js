import React, { memo } from 'react';
import SiteConfig from '../../config';

const { assetsPath } = SiteConfig;
const CREATE_PROPERTY_ROUTE = '/profile/create-property/details';
const PortfolioNoResults = memo(({l, onClickImport, user}) => {

	return (
		<div className="portfolio-no-results">
			<div className="portfolio-no-results__left-rail">
                <div className="portfolio-no-results__title">Our tool lets you import your rental operating data and answer these questions</div>
                {/*<div className="portfolio-no-results__questions">
                    <div className="portfolio-no-results__questions__question">Did my net operating income go up over time ?</div>
                    <div className="portfolio-no-results__questions__question">What is the ratio of income to expense ?</div>
                    <div className="portfolio-no-results__questions__question">What percentage of rent is spent on Property Taxes ?</div>
                </div>*/}
                {/* <div className="portfolio-no-results__title sub-title">Our tool lets you import your rental operating data, visualize your portfolio performance and answer these questions in just a few steps.</div>
                <div className="text-center portfolio-no-results__sample-text">See below a sample visualization that you will get once your data is imported</div> */}
                <div className="portfolio-no-results__img-container flex">
                    <div className="portfolio-no-results__img">
                        <div className="portfolio-no-results__questions__question">Did my net operating income go up over time ?</div>
                        <div className="portfolio-no-results__img__img-wrap">
                            <img src={`${assetsPath}/images/my-portfolio-viz/income.png`} />
                        </div>
                        <div className="portfolio-no-results__img__caption text-center">{l('INCOME')}</div>
                    </div>
                   
                    <div className="portfolio-no-results__img">
                        <div className="portfolio-no-results__questions__question">What percentage of my rent is spent on Property Taxes ?</div>
                        <div className="portfolio-no-results__img__img-wrap">
                            <img src={`${assetsPath}/images/my-portfolio-viz/expense-breakup.png`} />
                        </div>
                        <div className="portfolio-no-results__img__caption text-center">{l('EXPENSEBREAKDOWN')}</div>
                    </div>
                    <div className="portfolio-no-results__img">
                        <div className="portfolio-no-results__questions__question">What is the ratio of my income to expense ?</div>
                        <div className="portfolio-no-results__img__img-wrap">
                            <img src={`${assetsPath}/images/my-portfolio-viz/expense-ratio.png`} />
                        </div>
                        <div className="portfolio-no-results__img__caption text-center">{l('EXPENSERATIOGRAPH')}</div>
                    </div>
                </div>

			</div>
		</div>
	)
});

export default PortfolioNoResults;
