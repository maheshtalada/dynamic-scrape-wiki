import React, {Component } from 'react';
import PropTypes from 'prop-types';
import TooglePanel from '../toogle-panel/toggle-panel';
import Cx from 'classnames';

export default class SearchFilterWrapper extends Component {

	static propTypes = {
		facetSize: PropTypes.number
	};

	static contextTypes = {
		i18n: PropTypes.object
	};

	static defaultProps = {
		facetSize : 0
	};

	constructor(props) {
		super(props);

		this.state = {
			showAll: false
		};

		this.toggleFilter = this.toggleFilter.bind(this, false);
	}

	render() {
		const { children,clearAllFilters } = this.props;
		const { l } = this.context.i18n;

		return (
			<div className="search-filter-wrapper">
				{
					this.props.facetSize > 0 &&
					<button onClick={this.toggleFilter.bind(this, true)} name="list" className="show-all-filters btn btn-sm btn-default">
						<span><i className="pe-7s-filter"/>{`${l('APPLIEDFILTERS')}`}</span>
					</button>
				}
				{
					this.state.showAll &&
					<TooglePanel>
						<div className="flex flex-justify-end flex-align-center clear-filter-wrap">
							<button onClick = {clearAllFilters} className="btn btn-default clear-all-filters">
								<span>{`${l('CLEARALL')}`}</span>
							</button>
							<button className="close-filters" onClick={this.toggleFilter.bind(this, false)}>
								<i className="pe-7s-close-circle" />
							</button>
						</div>
						{children}
					</TooglePanel>
				}
			</div>
		);
	}

	toggleFilter(elem, value) {
		this.setState({
			showAll : value
		});
	}

}
