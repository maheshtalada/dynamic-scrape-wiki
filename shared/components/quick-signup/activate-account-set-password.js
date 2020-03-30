import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../common/button';
import { isDisable, isTermsAndCondtionsRequired, } from './util';
import TermsConditions from '../common/terms-conditions/terms-conditions';
import Spinner from '../common/spinner/spinner';
import { isEmpty, values, extend } from 'lodash';
import { schema } from './activate-account-schema.json';
import { Schema } from '../schema';
import Checkbox from '../common/checkbox/checkbox';
import Slider from 'react-slick';
import SlickArrow from 'components/common/slick-arrows/slick-arrow-next';

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    lazyLoad: false,
    nextArrow: <SlickArrow type="next" />,
    prevArrow: <SlickArrow type="prev" />
};

const VIDEOS = [
    {
        title : 'FLYER_VIDEO_TITLE',
        videoSrc : 'https://www.youtube.com/embed/6b0Y96ae1Z0?rel=0'
    },
    {
        title : 'ROI_CALCULATOR_VIDEO_TITLE',
        videoSrc : 'https://www.youtube.com/embed/HhnkVOWzyLA?rel=0'
    },
    {
        title : 'SEARCH_VIDEO_TITLE',
        videoSrc : 'https://www.youtube.com/embed/FkI0GsRHKqY?rel=0'
    },
    {
        title : 'ANALYZE_PORTFOLIO_VIDEO_TITLE',
        videoSrc : 'https://www.youtube.com/embed/IryOOnjaV70?rel=0'
    },
    {
        title : 'ANALYZE_MARKETS_VIDEO_TITLE',
        videoSrc : 'https://www.youtube.com/embed/DVPBe6oBDSo?rel=0'
    }
];

const RealtorWelcomeNote = ({l}) => (
    <div className="activate-account-info__description">
        <div style={{ marginBottom : '10px'}} >PropsHub is a FREE online real-estate portal focused on helping Realtors, Property Managers and Investors in the real estate investment community.</div>
        <div>Below are some tools we have built to help you: </div>
        <ul>
            <li>Generate <b>Free Flyers</b> for your listings. <a className="link-color" href='/frequently-asked-questions#flyerGeneration' target="_blank">{l('LEARNMORE')}</a></li>
            <li>Use our <b>Guided Search</b> feature to search for cash flowing properties in your market. <a className="link-color" href='/frequently-asked-questions#search' target="_blank">{l('LEARNMORE')}</a></li>
            <li>Use our <b>Calculate ROI</b> feature to quickly determine ROI for investment properties. <a className="link-color" href='/frequently-asked-questions#calculateReturnOnInvestment' target="_blank">{l('LEARNMORE')}</a></li>
            <li>Visualize and share income expense data for your <b>Portfolio</b> in a few clicks. <a className="link-color" href='/frequently-asked-questions#analyzeMyPortfolio' target="_blank">{l('LEARNMORE')}</a></li>
        </ul>
    </div>
);

const UserWelcomeNote = ({l}) => (
    <div className="activate-account-info__description">
        {l('ACTIVATEUSERWELCOMENOTE')} <a className="link-color" href='/frequently-asked-questions#flyerGeneration' target="_blank">{l('LEARNMORE')}</a>
    </div>
);

export default class ActivateAccountSetPassword extends Component {

    static contextTypes = {
        i18n : PropTypes.object,
        country : PropTypes.string
    }
    
    constructor(props) {
        super(props);
        this.state = {
            isFetching : props.isFetching,
            password : props.password,
            user : props.user,
            modifiedValues : {
                'user.emailId' : props.username
            },
            initialValues: {},
            rememberFlg : true
        };
        this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this);
        this.onClickConfirm = this.onClickConfirm.bind(this);
        this.onSchemaChange = this.onSchemaChange.bind(this);
        this.onChangeRememberMe = this.onChangeRememberMe.bind(this);
        this.onBeforeSlideChange = this.onBeforeSlideChange.bind(this);
    }

    componentWillReceiveProps(props) {
        if(props) {
            this.setState({
                isFetching : props.isFetching,
                password : props.password,
                user : props.user
            });
        }
    }

    onSchemaChange(changeObject, hasErrors) {
        let isSchemaValid = false;
        if(this.refs.schema && this.refs.schema.checkSubmissionValid()) {
            isSchemaValid = true;
        }
        this.setState({
			changeObject,
            hasErrors,
            isSchemaValid
		});

		if (!isEmpty(this.refs)) {
            this.refs.schema && this.refs.schema.rebuild();		
		}
    }

    onBeforeSlideChange(oldIndex,newIndex) {
        VIDEOS.forEach((video,index) => {
            if(newIndex !== index) {
            	let ifrObj = document.getElementById(`iframe-${index}`);
				ifrObj.src = video.videoSrc;
               // this.refs[`iframe-${index}`].src = video.videoSrc;
            }
        });
    }

    onConfirmPasswordChange(value) {
        this.setState({
            confirmPassword : value
        });
    }

    onClickConfirm() {
        const schemaData = extend({},this.state.initialValues,this.state.modifiedValues);
        if(schemaData['user.confirmPassword'] !== schemaData['user.password']) {
            this.setState({
                passwordMatchError : true
            });
        } else {
            this.props.onSubmit('',{
                username : schemaData['user.emailId'],
                password : schemaData['user.password'],
                name : schemaData['user.name'],
                rememberFlg : this.state.rememberFlg
            });
        }
    }

    onChangeRememberMe(evt) {
        this.setState({
            rememberFlg : evt.target.checked
        });
    }

    renderSchema() {
        const { i18n, country } = this.context;
        return (
            <Schema
                l={i18n.l}
                country = {country}
                ref={'schema'}
                data={schema.schemas[0]}
                writeMode={true}
                updateonPropsChange={true}
                onChange={this.onSchemaChange}
                modifiedValues={this.state.modifiedValues}
                initialValues={this.state.initialValues}
            />
        );
    }

    render() {
        const { isFetching, password, user, confirmPassword, passwordMatchError, isSchemaValid, rememberFlg } = this.state;
        const { loginContext, l , onChange, onSubmit, screenTitle, onAgreeTerms, isAgreeTerms=false, isBackRequired = true, roleType, name, location } = this.props;
        // const disable = isDisable(isFetching,[password, confirmPassword, (!isAgreeTerms) ? '' : String(isAgreeTerms)]) ? 'disabled' : '';
        const disable = isDisable(isFetching,[isSchemaValid, (!isAgreeTerms) ? '' : String(isAgreeTerms)]) ? 'disabled' : '';
        const campaignType = location.query.campaign_type;
        settings.initialSlide = 1;
        return (
            <div className={`login-reset activate-account-screen email-step col-md-12 col-sm-12  col-xs-12 ${campaignType === 'flyer' ? 'flyer-campaign' : ''}`}>
                { user.status === 'error' && user.error &&
                <div className="alert alert-warning">
                    <div>{l(user.error.error_description || user.error.errorDescription)}</div>
                </div>
                }
                <div className="login-wrapper__inputs-wrap">
                    <div className="lock-icon-wrapper">
                        {/*<p className="login-icon">
                            <i className="pe-7s-unlock" />
                        </p>*/}
						<div className="text-center login-wrapper__screen-title">{l(this.props.heading)}</div>

                    </div>
                    {this.renderSchema()}
                    <Checkbox label={l('REMEMBERME')} name="Remember" id="Remember" checked={rememberFlg} onChange={this.onChangeRememberMe}/>
                    <TermsConditions
                        link = "/terms-conditions"
                        linkText="TERMSCONDITIONS"
                        termsTitle="TERMSCONDITIONSTITLE"
                        onTermsSelect={(checked)=>onAgreeTerms(checked)}
                        isAgreeTerms = {isAgreeTerms}
                    />
                    {passwordMatchError && <div className="alert alert-warning">
                        <div>{l('CONFIRMPASSWORDERROR')}</div>
                    </div>}
                    <div className="action-btn-wrap col-md-12 col-sm-12 col-xs-12">
                        <Button className="toolbar-group save-search" disabled={disable} onClick={this.onClickConfirm} data-tag-category="Auto registered account activation actions" data-tag-action="Click" data-tag-label="Auto registration confirmation">
                            {l('CONFIRM')}
                        </Button>
                        { isFetching ? <Spinner /> : '' }
                    </div>
                </div>
				{ campaignType  !== 'flyer' && <div className="activate-account-welcome-note">
					<Slider {...settings} beforeChange={this.onBeforeSlideChange}>
						{VIDEOS.map((video,index) => (
							<div>
								<h2 className="activate-account-welcome-note__flyer-header">{l(video.title)}</h2>
								{/* <div className="">{l('EMAIL_CAMPAIGN_FLYER_VIDEO_SUBTITLE')}</div> */}
								<iframe id={`iframe-${index}`} allowFullScreen={true} frameBorder="1" src={video.videoSrc}/>
							</div>
						))}
					</Slider>
                </div>}
            </div>
        );
    }
}
