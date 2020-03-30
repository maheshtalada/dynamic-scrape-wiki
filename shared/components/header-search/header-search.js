import React from 'react';
import Cx from 'classnames';
import QuickSearch from '../quicksearch/quicksearch';

export default function HeaderSearch(props) {
	return (
		<div className={Cx("container-quicksearch print-hide",props.className)}>
			<QuickSearch {...props}/>
			{props.children}
		</div>
	)
}
