import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Panel, PanelBody } from '../common/panel';
import { flattenAreasServed, flattenUtilities } from '../../utils/propertyUtil';
import Slider from 'react-slick';
import AreasServed from '../common/realtor-info-components/areas-served';
import SlickArrow from '../common/slick-arrows/slick-arrow-next';
import { getAbsoluteUrl } from 'utils/urlUtil';

const settings = {
	dots: false,
	infinite: false,
	speed: 500,
	slidesToShow: 3,
	slidesToScroll: 3,
	adaptiveHeight: true,
	initialSlide: 0,
	lazyLoad: false,
	nextArrow: <SlickArrow type="next" />,
	prevArrow: <SlickArrow type="prev" />,
	responsive: [{
		breakpoint: 1024,
		settings: {
			slidesToShow: 3,
			slidesToScroll: 3,
			infinite: true,
			dots: true
		}
	}, {
		breakpoint: 600,
		settings: {
			slidesToShow: 2,
			slidesToScroll: 2,
			initialSlide: 2
		}
	}, {
		breakpoint: 480,
		settings: {
			slidesToShow: 1,
			slidesToScroll: 1
		}
	}]
};

export default class Agents extends Component {

	static propTypes = {
		details : PropTypes.object.isRequired
	};

	static contextTypes = {
		i18n : PropTypes.object,
		awsImagePath: PropTypes.string,
		assetsPath : PropTypes.string
	};

	constructor(props) {
		super(props);
	}

	render() {
		const {details, realtors} = this.props;
		const { awsImagePath, i18n: {l}, assetsPath } = this.context;
		return (
			<div className="row firm-agents">
				{realtors.map(agent=>{
					return(
						<a href={getAbsoluteUrl(agent.profileURL)} target="_blank" key={agent.id} className="firm-agents__agent">
							<Panel className='col-lg-4 col-md-4 col-sm-12 col-xs-12'>
								<PanelBody>
									<div className="firm-agents__agent__avatar">
										<div className="firm-agents__agent__avatar__wrap">
											<img src={agent.photo ? `${awsImagePath}/${agent.photo.uri}` : `${assetsPath}/images/noimages/noavatar.png`} alt={agent.name}/>
										</div>
									</div>
									<div className="firm-agents__agent__agent-details">
										<div className="firm-agents__agent__agent-details__name">{agent.name}</div>
										{/*{agent.areasServed && agent.areasServed.length > 0 && <div><i className="pe-7s-map-marker" /><div className="firm-agents__agent__agent-details__areas-served">{flattenAreasServed(agent.areasServed,l)}</div></div>}*/}
										<AreasServed areas={agent.areasServed} className="firm-agents__agent__agent-details__areas-served"/>
										{agent.specialties && agent.specialties.length > 0 &&
										<div className="flex flex-align-center">
											<i className="pe-7s-ribbon" />
											<div className="firm-agents__agent__agent-details__specialties">{flattenUtilities(agent.specialties,l)}
											</div>
										</div>}
									</div>
								</PanelBody>
							</Panel>
						</a>
					);
				})}
			</div>
		);
	}
}
