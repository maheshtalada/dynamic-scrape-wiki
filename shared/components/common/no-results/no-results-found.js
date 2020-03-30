import React,  { memo } from 'react';
import SiteConfig from '../../../config';

const  { assetsPath } = SiteConfig;

const NoResults = memo(({ l,title,message, goBackPrevRoute=undefined}) => {
	return (
		<div className="no-results">
			<div className="no-results__icon-wrapper">
				<img src={`${assetsPath}/images/noResultsFound/icon-no-result.png`} alt="no-results-found"/>
			</div>
			{title && <p className="no-results__title">
				{l(title)}
			</p>}
			{message && <p className="no-results__content">
				{l(message)}
			</p>}
			{goBackPrevRoute &&
				<button className="btn btn-primary" onClick={goBackPrevRoute}>{l('BACK')}</button>
			}
		</div>
	);
});

NoResults.displaName = 'NoResults';

export default NoResults;
