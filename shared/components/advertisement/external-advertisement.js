import React, { Component } from 'react';
import { REQUEST_OPEN_SITE_FEEDBACK } from '../../redux/actions/application';
import PropTypes from 'prop-types';

export default class ExternalAdvertisement extends Component {
    
    static contextTypes = {
        i18n : PropTypes.object
	}
	
	static defaultProps = {
		vendorLinkText : "BECOMEPREFERREDREALTOR"
	}

    constructor(props) {
		super(props);
        this.onClickAdvertise = this.onClickAdvertise.bind(this);
        this.onClickBecomeVendor = this.onClickBecomeVendor.bind(this);
    }

	// shouldComponentUpdate() {
	// 	return false;
	// }

	onClickAdvertise() {
		this.props.dispatch(REQUEST_OPEN_SITE_FEEDBACK({
			open : true,
			subject : "ADVERTISEWITHUS",
			title : "ADVERTISEWITHUS"
		}));
    }
    
    onClickBecomeVendor() {
        this.props.dispatch(REQUEST_OPEN_SITE_FEEDBACK({
			open : true,
			subject : this.props.vendorLinkText,
			title : this.props.vendorLinkText
		}));
    }

	render() {
        const { metroServedLabel, isVendorLinkRequired, vendorLinkText } = this.props;
        const { l } = this.context.i18n;
		return (
				<div className="advertisment-wrapper external-ad">
					<div className="flex flex-column flex-justify-between" style={{'height': '100%'}}>
						<div>
							<p className="external-ad__title">{l('YOURAD')}</p>
							{metroServedLabel && <p className="flex flex-justify-center metro-served">{metroServedLabel}</p>}
						</div>
						<div>
							{!isVendorLinkRequired && <button onClick={this.onClickAdvertise} className="btn btn-default">{l('ADVERTISEWITHUS')}</button>}
							{isVendorLinkRequired && <button onClick={this.onClickBecomeVendor} className="btn btn-default">{l(vendorLinkText)}</button>}
						</div>
					</div>
				</div>
		);
	}
};
