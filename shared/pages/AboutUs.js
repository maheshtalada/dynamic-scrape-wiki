import React, { Component } from 'react';
import Card from '../components/common/card/card';
import PropTypes from 'prop-types';
import { getAbsoluteUrl } from 'utils/urlUtil';
import Footer from '../components/footer/footer';
const { areasServed } =  require('assets/static/metros-served-config').default;

const PROPSHUB_HOME = getAbsoluteUrl('/');

const TEAM_MEMBERS = {
	lineOne : [
		{
			"name": "Siva Kolappa",
			"role": "CEO",
			"imgPath": "/images/sketch/siva.png",
			"linkedInUrl": "https://www.linkedin.com/in/sivakolappa/"
		},
		{
			"name": "Kalyan Shiva",
			"role": "CTO",
			"imgPath": "/images/sketch/shiva.png",
			"linkedInUrl": "https://www.linkedin.com/in/shiva-kalyan/"
		},
		{
			"name": "Kristopher Franks",
			"role": "Product Advisor",
			"imgPath": "/images/sketch/kris.png",
			"linkedInUrl": "https://www.linkedin.com/in/kristopher-franks-048b057/"
		}
	],
	lineTwo : [
		{
			"name": "Mahesh Talada",
			"role": "Engineering",
			"imgPath": "/images/sketch/mahesh.png",
			"linkedInUrl": "https://www.linkedin.com/in/mahesh-talada/"
		},
		{
			"name": "Umang Kedia",
			"role": "Engineering",
			"imgPath": "/images/sketch/umang.png",
			"linkedInUrl": "https://www.linkedin.com/in/umang-kedia-53494b46/"
		}

	]
};

const TeamCard = ({member, assetsPath}) => {
	return (
		<Card className="team-member-card">
			<div className="team-avatar-wrap">
				<img src={`${assetsPath}${member.imgPath}`} alt={member.role}/>
			</div>
			<div className="flex flex-column flex-align-center">
				<div className="team-member-name">{member.name}</div>
				<div className="team-member-role">{member.role}</div>
			</div>
			{member.linkedInUrl && <a className="team-member-linkedin" href={member.linkedInUrl} target="_blank"> <i className="pe-7s-linkedin-2" /> </a>}
		</Card>
	)
}


export default class AboutUs extends Component {
	constructor(props) {
		super(props);
	}

	static contextTypes = {
		assetsPath : PropTypes.string
	};

	render() {
		const { assetsPath } = this.context;
		return (
			<div className="about-us-page">
				<div className="about-us-page__main-section">
				<h1 className="page-title">About Us</h1>
				<Card className="big-card flex">
					<section className="flex flex-column big-card-section">
						<h1><span>Mission</span></h1>
						<p>Empower real estate investors with technology, data and local expertise.</p>
					</section>
				</Card>
				<Card className="big-card flex">
					<section className="flex flex-column big-card-section">
						<h1><span>Story of PropsHub</span></h1>
						<p><a href={PROPSHUB_HOME}>PropsHub</a> CEO Siva Kolappa is a data geek and an avid real estate investor. He purchased his first investment property in 2003 and continued to grow his portfolio over the years. During this time, Siva mentored some of his friends and acquaintances that wanted to get started in real estate investing. When his mentees were ready to buy their first real estate property, he would connect them to his network of qualified professionals to help with purchase and management of the property. While one on one mentorship was working well, Siva saw an opportunity to help more people get into real estate investing. When Siva met his engineering schoolmate and tech geek Kalyan Shiva at a reunion, things clicked in place. Together, they decided to build <a href={PROPSHUB_HOME}>PropsHub</a>. </p>
					</section>
				</Card>
				<Card className="big-card flex">
					<section className="flex flex-column big-card-section">
						<h1><span>How does PropsHub help real estate investors?</span></h1>
						<p>At <a href={PROPSHUB_HOME}>PropsHub</a>, we think that investors typically need help in two areas.
						First, they need help in understanding a specific real estate market or a property from an investment angle.
						Second, once they are ready to invest in a market or a property, they need qualified professionals to help them with purchase and management of the property.
						<a href={PROPSHUB_HOME}>PropsHub</a> strives to address both these needs.</p>
				</section>
				</Card>
				<Card className="big-card">
					<section className="flex flex-column big-card-section">
						<h1><span>Is there a fee to use PropsHub?</span></h1>
						<p><a href={PROPSHUB_HOME}>PropsHub</a> product is free to use for everybody.</p>
					</section>
				</Card>
				<Card className="big-card">
					<section className="flex flex-column big-card-section">
						<h1><span>Where is PropsHub serving?</span></h1>
						<div className='metros-served-note'>
							<p>We are currently serving in the following markets:</p>
								<ul>
									{areasServed.map(metro => {
										return (
											<li><a target="_blank" href={getAbsoluteUrl(metro.marketIndexLink)}>{metro.aboutUsInfo.label}</a></li>        
										);
									})}
								</ul>
							<p className="expand-other-metros">We will expand to other metros soon.</p>
						</div>
					</section>
				</Card>
				<Card className="big-card">
					<section className="flex flex-column big-card-section">
						<h1><span>What type of properties does PropsHub focus on?</span></h1>
						<p>For now, <a href={PROPSHUB_HOME}>PropsHub</a> is exclusively focused on Single Family Home and 2-4 unit multi family investments.</p>
					</section>
				</Card>
				<Card className="big-card">
					<section className="flex flex-column big-card-section">
						<h1><span>How to reach out to us?</span></h1>
						<p>You can contact us by sending an Email to <a className="email-link" href="mailto:help@propshub.com"><span>help@propshub.com</span></a> or <a className="email-link" href="mailto:skolappa@propshub.com"><span>skolappa@propshub.com</span></a>.</p>
					</section>
				</Card>
				<h1 className="page-title team-title">Our Team</h1>
				<div className="flex flex-justify-center team-members-wrap flex-wrap">
					{TEAM_MEMBERS.lineOne.map(member => <TeamCard member={member} assetsPath={assetsPath} />)}
				</div>
				<div className="flex flex-justify-center team-members-wrap flex-wrap">
					{TEAM_MEMBERS.lineTwo.map(member => <TeamCard member={member} assetsPath={assetsPath} />)}
				</div>
				</div>
				<Footer dispatch={this.props.dispatch}/>
			</div>
		)
	}
}
