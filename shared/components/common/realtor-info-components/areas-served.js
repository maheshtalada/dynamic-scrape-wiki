import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Cx from 'classnames';
import { isEmpty as _isEmpty } from 'lodash';
const MAX_AREAS_TO_SHOW = 15;

export default class AreasServed extends Component {
	static contextTypes = {
		i18n: PropTypes.object
	};

	constructor(props) {
		super(props);
		this.onClickShowMore = this.onClickShowMore.bind(this);
		this.state = {
			modifiedAreas : props.areas.slice(0,MAX_AREAS_TO_SHOW)
		};
	}

	onClickShowMore() {
		this.setState({
			modifiedAreas : this.props.areas
		});
	}

	render() {
		const { modifiedAreas } = this.state;
		const { className, areas } = this.props;
		const { l } = this.context.i18n;
		return (
			<div className={Cx("areas-served",className)}>
				{modifiedAreas.map(option => {
					if(_isEmpty(option)) {
						return;
					}
					const areaServed = option.locality || option.cityName || option.region || '';
					return (
						<span className="areas-served__locality-wrap">
							<i className="pe-7s-map-marker"/>
							<span className="areas-served__locality-wrap__locality">{areaServed.toLowerCase()}</span>
						</span>
					)
				})}
				{(areas.length > modifiedAreas.length) && <div className="show-more-wrap flex flex-justify-end">
					<button onClick={this.onClickShowMore}>{l('SHOWMORE')}</button>
				</div>}
			</div>
		)
	}
}