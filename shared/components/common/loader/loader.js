import React, {
	Component
} from 'react';
import PropTypes from 'prop-types';
import { LOADER_IMAGE } from '../../../utils/app-constants';


export default class Loader extends Component {

	static propTypes = {
		loadingText: PropTypes.string
	};

	static defaultProps = {
		loadingText: 'Rendering...',
		loaderImg: LOADER_IMAGE
	};

	render() {

		return (
			<div>
				<div className="splash-title">
					<p>{this.props.loadingText}</p>
					{/* <div className="spinner">
						<div className="rect1"></div>
						<div className="rect2"></div>
						<div className="rect3"></div>
						<div className="rect4"></div>
						<div className="rect5"></div>
					</div>*/}
					<img src="static/images/loader/gears.gif"/>
				</div>
			</div>
		);
	}
}
