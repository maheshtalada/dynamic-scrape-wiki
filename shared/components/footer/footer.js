import React, {Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { REQUEST_OPEN_SITE_FEEDBACK } from '../../redux/actions/application';
const { FACEBOOK_URL, TWITTER_URL, YOUTUBE_URL, PINTEREST_URL, INSTAGRAM_URL, LINKEDIN_URL, MEDIUM_URL } =require('../../utils/app-constants').default;

export default class Footer extends Component {

	static propTypes = {

	};

	static defaultProps = {

	};

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object
	};

	constructor(props) {
		super(props);
		this.onClickContactUs = this.onClickContactUs.bind(this);
	}

	onClickContactUs(e) {
		e.preventDefault();
		this.props.dispatch(REQUEST_OPEN_SITE_FEEDBACK({
			open : true,
			subject : "PROVIDEFEEDBACK"
		}));
	}


	render() {
		const { l } = this.context.i18n;
		return (
			<footer className="footer-main">
				<div className="footer-main__links">
					<div className="footer-main__links__copyright-info">
						{/* <span className="footer-main__links__copyright-info__text">&#169; {l('PROPSHUBREGISTRATION')}</span> */}
						<span className="footer-main__links__copyright-info__text">
							&copy; Copyright 2019 PropsHub
						</span>
					</div>
					<div className="footer-main__links__about-us">
						<Link className="footer-main__links__link-item" to="/frequently-asked-questions" target="_blank">{l('FAQ')}</Link>
						<Link className="footer-main__links__link-item" to="/about-us" target="_blank">{l('ABOUTUS')}</Link>
						<Link className="footer-main__links__link-item" to="" onClick={this.onClickContactUs}>{l('SENDSITEFEEDBACK')}</Link>
					</div>
					<div className="footer-main__links__social-media">
						<Link to={FACEBOOK_URL} title="Facebook" rel="noopener noreferrer" target="_blank" className="icon footer-main__links__link-item">
							<i className="pe-7s-facebook-logo" />
						</Link>
						<Link to={TWITTER_URL} title="Twitter" rel="noopener noreferrer" target="_blank" className="icon footer-main__links__link-item">
							<i className="pe-7s-twitter-logo" />
						</Link>
						<Link to={YOUTUBE_URL} title="Youtube" rel="noopener noreferrer" target="_blank" className="icon footer-main__links__link-item">
							<i className="pe-7s-youtube" />
						</Link>
						<Link to={PINTEREST_URL} title="Pinterest" rel="noopener noreferrer" target="_blank" className="icon footer-main__links__link-item">
							<i className="pe-7s-pinterest-logo" />
						</Link>
						<Link to={INSTAGRAM_URL} title="Instagram" rel="noopener noreferrer" target="_blank" className="icon footer-main__links__link-item">
							<i className="pe-7s-instagram-logo" />
						</Link>
						<Link to={LINKEDIN_URL} title="Linkedin" rel="noopener noreferrer" target="_blank" className="icon footer-main__links__link-item">
							<i className="pe-7s-linkedin-2" />
						</Link>
					</div>
				</div>
			</footer>
		);
	}

}
