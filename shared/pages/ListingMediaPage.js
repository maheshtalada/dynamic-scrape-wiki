import React , { Component } from 'react';
import PropTypes from 'prop-types';
import MediaDropZone from '../containers/Listing/media-drop-zone';
import NavigationBar from '../components/navigation-bar';
import { listingMap } from '../assets/static/navigation-map.json';
import { cloneDeep } from 'lodash';
import ListingMediaDropZoneTabs from '../components/listing/media-drop-zone-tabs';
import { connect } from 'react-redux';
import connectDataFetchers from '../lib/connectDataFetchers.jsx';
import { REQUEST_GET_LISTING_MEDIA } from '../redux/actions/documents';

class ListingMediaPage extends Component {

	static contextTypes = {
		i18n: PropTypes.object
	};

	constructor(props) {
		super(props);
		let navigationMap = cloneDeep(listingMap);
		navigationMap[5].activeStep = true;
		this.onChange = this.onChange.bind(this);
		this.state = {
			navigationMap,
			activeTab: 0,
			mediaMenu:props.listingMedia && props.listingMedia.mediaMenu || []
		};
	}

	componentWillReceiveProps(props) {
		const { listingMedia } = props;
		if(listingMedia.mediaMenu && listingMedia.mediaMenu.length > 0) {
			this.setState({
				mediaMenu: listingMedia.mediaMenu
			});
		}
	}

	onChange(id) {
		this.setState({
			activeTab: id
		});
	}

	render() {
		const { l } = this.context.i18n;
		const { navigationMap, activeTab, mediaMenu } = this.state;
		return (
			<div className="profile-page__layout__profile-section">
				<div className="schema-listing-page listing-media-page flex-layout">
					<div className="row">
						<div className="col-xs-12">
							<NavigationBar steps={navigationMap} currentStep={navigationMap[5]} keyName="{listingid}" keyValue={this.props.params.id || ''} title="Listing & Property set-up"/>
						</div>

					</div>
					{
						mediaMenu.length > 0 &&
						<div>
							{/* <div data-automation-selector="ssj-section-header-content">
								<h2 className="subheader-heading" data-automation-selector="ssj-section-title">{l('MEDIATITLE')}</h2>
							</div>*/}
							{ mediaMenu.length > 1 && <div className="sub-menu-tabs">
								<ListingMediaDropZoneTabs activeTab={activeTab} onChange={this.onChange} tabsData={mediaMenu}/>
							</div>}
							<div className="col-xs-12 col-md-12 col-lg-12">
								<MediaDropZone key={activeTab} {...this.props} currentTabIndex={activeTab} />
							</div>
						</div>
					}

				</div>
			</div>
		);
	}

}

const mapStateToProps = ({documents}) => {
	const { listing_media } = documents;
	return { 'listingMedia' : listing_media };
};

export default connect(mapStateToProps)(
	connectDataFetchers(ListingMediaPage, [
		REQUEST_GET_LISTING_MEDIA
	],true)
);







