import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from 'components/common/page-loader/loader';
import Advertisement from 'components/advertisement/advertisement';
import ExternalAdvertisement from 'components/advertisement/external-advertisement';
import ScrollFixed from 'components/common/scroll-fixed/scroll-fixed';
import { adbackground, adlogo } from 'assets/static/ads-component-config.json';
import NoResults from 'components/common/no-results/no-results-found';
import { Panel, PanelBody } from 'components/common/panel';
import ListingGridTile from 'components/common/listing-tile-components/listing-grid-tile';
import HeaderSearch from 'components/header-search/header-search';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import ReactTooltip from 'react-tooltip';


class Recommendations extends Component {

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object,
		awsImagePath: PropTypes.string,
		country : PropTypes.string
	};

	constructor(props) {
		super(props);
		this.state = {
			recommendations : props.investment_recommendations || {}
		}
	}

	componentWillReceiveProps(props) {
		this.setState({
			recommendations : props.investment_recommendations || {}
		})
	}

	render() {
		const { recommendations } = this.state;
		const { i18n : {l}, country, awsImagePath } = this.context;
		return (
			<div className="recommendations__wrap">
				<HeaderSearch {...this.props} children={null} className="no-search-bar-actions"/>
				{recommendations.isFetching && <Loader />}
				<div className="flex-layout flex">
				<div className="recommendations">
				<ReactTooltip/>
				{recommendations.data && recommendations.data.length ?
					recommendations.data.map(item => {
						return (
							<div className="recommendation">
							<Panel className="">
								<PanelBody>
									<LazyLoadComponent>
										<ListingGridTile
											listing={item}
											isCityStateOnly={true}
											screenSize={this.props.screenSize}
											location={this.props.location}
											user={this.props.user}
											dispatch={this.props.dispatch}
											country={country} l={l}
											awsImagePath={awsImagePath}/>
									</LazyLoadComponent>
								</PanelBody>
							</Panel>
							</div>
						)
					}) : recommendations.isFetching === false && <NoResults
					l={l}
					title={l('PROPERTYNULLRESULTSTITLE')}
					message={l('PROPERTYNULLRESULTSMESSAGE')}
				/>
				}
				</div>
				<div className="ad-slots hidden-xs hidden-sm">
					<ScrollFixed scrollPosition={0} top={111}>
						<Advertisement
							adBg={adbackground}
							logo={adlogo}
							l={l}
						/>
						<ExternalAdvertisement dispatch={this.props.dispatch}/>
					</ScrollFixed>
				</div>
				</div>
			</div>
		)
	}

}

export default Recommendations;
