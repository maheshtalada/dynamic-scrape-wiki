import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../button';
import Spinner from '../spinner/spinner';
import Cx from 'classnames';

const NEXT = 'next',
	BACK = 'back',
	SAVEEXIT = 'saveexit';
export default class LinearNavigation extends React.Component {

	static propTypes = {
		nextCaret : PropTypes.bool,
		backCaret : PropTypes.bool,
		nextText: PropTypes.string.isRequired,
		backText: PropTypes.string,
		saveExitText: PropTypes.string,
		onNext: PropTypes.func.isRequired,
		onBack: PropTypes.func,
		onConfirm: PropTypes.func,
		onSaveExit: PropTypes.func.isRequired,
		isBackRequired: PropTypes.bool,
		isSaveExitRequired: PropTypes.bool,
		useChevrons: PropTypes.bool,
		nextButtonType: PropTypes.string,
		backButtonType: PropTypes.string,
		className: PropTypes.string,
		isNextDisabled: PropTypes.bool,
		isBackDisabled: PropTypes.bool,
		currentActiveLoader : PropTypes.string,
		isNavigatingSaveExitRequired: PropTypes.bool,
		navigatingSaveExitText: PropTypes.string,
		onNavigateSaveExit: PropTypes.func,
		isNextRequired : PropTypes.bool,
		nextBtnGATags : PropTypes.object
	};

	static defaultProps = {
		nextCaret: true,
		backCaret: true,
		nextText: 'Next',
		backText: 'Back',
		saveExitText: 'Save for later',
		isBackRequired: true,
		isSaveExitRequired: false,
		useChevrons: true,
		nextButtonType: 'button',
		backButtonType: 'button',
		currentActiveLoader: '',
		onNext: ()=> {
		},
		onBack: ()=> {
		},
		onConfirm: ()=> {
		},
		onShowPopup: ()=> {
		},
		className: '',
		isNextDisabled: false,
		isBackDisabled: false,
		navigatingSaveExit: false,
		navigatingSaveExitText: 'Save and Exit',
		isNavigatingSaveExitRequired: false,
		isNextRequired: true,
		nextBtnGATags : {}
	};

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object
	};

	constructor(props) {
		super(props);
		this.state = {};
	}

	onClickBack() {
		this.props.onBack();
	}

	onClickNext() {
		this.props.onNext();
	}

	onClickConfirm() {
		this.props.onConfirm();
	}

	onClickNavigateSaveExit() {
		this.props.onNavigateSaveExit();
	}

	render() {

		const { l } = this.context.i18n;
		const { nextText, backText, className, saveExitText, isNextDisabled, isBackRequired, nextCaret, backCaret, currentActiveLoader, isNavigatingSaveExitRequired, navigatingSaveExitText, nextBtnGATags	} = this.props;
		const backButtonClassName = 'linear-navigation__button-wrapper__back ' + ( isBackRequired? '' : ' hide ');

		return (
			<div className={`linear-navigation ${className}`}>
				<div className="linear-navigation__button-wrapper">

					<Button className={Cx('toolbar-group',backButtonClassName)}
							onClick={() => this.onClickBack()}>
						{ currentActiveLoader === BACK ? <Spinner /> : '' }
						{ backCaret && <i className="pe-7s-angle-left"/>}
						{l(backText)}
					</Button>
					{
						this.props.isSaveExitRequired &&
						<Button className="linear-navigation__button-wrapper__save-and-exit"
							btnClassName="btn-default"
							onClick={() => this.onClickConfirm()} >
							{ currentActiveLoader === SAVEEXIT ? <Spinner /> : '' }
								{l(saveExitText)}
						</Button>
					}
					{
						isNavigatingSaveExitRequired &&
							<Button className="linear-navigation__button-wrapper__save-and-exit"
									btnClassName="btn-default"
									onClick={() => this.onClickNavigateSaveExit()}>
								{l(navigatingSaveExitText)}
								</Button>
					}
					{this.props.isNextRequired && <Button {...nextBtnGATags} className="toolbar-group linear-navigation__button-wrapper__next"
							onClick={() => this.onClickNext()} disabled={isNextDisabled}>
						{ currentActiveLoader === NEXT ? <Spinner singleColor="#fff"/> : '' }
						{l(nextText)}
						{ nextCaret && <i className="pe-7s-angle-right"/> }
					</Button>}

				</div>

			</div>
		);
	}
}


