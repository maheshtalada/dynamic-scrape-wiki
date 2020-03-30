import React from 'react';
import PropTypes from 'prop-types';
import DefaultComponent from '../default-component/default-component';
import { chunk } from 'lodash';

/**
 * @description Example component used to show how to use reference values for coupled components
 * @prop classNames {array} Additional classnames to be added to the component
 */

export default class ContentList extends DefaultComponent {

	static propTypes = {
		classNames: PropTypes.array,
		data: PropTypes.object
	};

	static defaultProps = {
		classNames: ['schema__content', 'schema__content-list']
	};

	constructor(props) {
		super(props);
	}

	renderLabel() {
		const { l, label ='' } = this.props;
		return label &&
			<span className={this.getLabelClassNames()} data-automation-selector={this.getDataId('label')}>
				<h1>{l(label)}</h1>
				{this.renderLabelInfo()}
				{this.renderTooltip()}
			</span>
	}

	renderValue() {
		let className = this.getValueClassNames(),
			contentList = this.props.data.value,
			//splitCountryList = this.splitList(contentList),
			columnCount = this.columnCount();

		return (
			<div className={className}>
				<ul className={`schema__content-list-${columnCount}`} key={`contentlist`}>
					{contentList.map((list, index) => <li key={`content_${index}`}>{list}</li>)}
				</ul>
			</div>
		);
	}

	/*splitList(countriesList) {
		return this.props.data.rowCount ? chunk(countriesList, this.props.data.rowCount) : [countriesList];
	}*/

	columnCount() {
		let defaultCount = 1;
		if (this.props.data.columnCount) {
			let count = parseInt(this.props.data.columnCount, 10);
			if (count > 0 && count < 3) {
				defaultCount = this.props.data.columnCount;
			}
		}
		return defaultCount;
	}
}


