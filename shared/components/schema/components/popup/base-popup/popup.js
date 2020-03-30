import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM, { findDOMNode } from 'react-dom';
import { Button } from '../../../../common/button';

export default class Popup extends React.Component {

	static propTypes = {
		onClose: PropTypes.func.isRequired,
		isCloseBtnRequired: PropTypes.bool,
		htmlContent: PropTypes.string,
		wrapperClassName: PropTypes.string,
		children: PropTypes.node,
		cancelText : PropTypes.string,
		onAction : PropTypes.func
	};

	static defaultProps = {
		onClose: () => {
		},
		isCloseBtnRequired: true,
		htmlContent: '',
		wrapperClassName:'popup-content-wrapper',
		children: [],
		cancelText : 'CANCEL'
	};

	constructor(props) {
		super(props);

		this.closeOnClickedOutside = this.closeOnClickedOutside.bind(this);
	}

	render() {
		const  { l, wrapperClassName='',isCloseBtnRequired='', onClose='', onAction='', cancelText='', children} = this.props;
		return (
			<div className="popup-modal" onClick={this.closeOnClickedOutside}>
				<div className="popup-modal__container">
					<div className="popup-modal__container__body" ref="modalBackground">
						<div className={wrapperClassName} data-automation-selector="popup">
							{
								isCloseBtnRequired &&
								<span className="popup-modal__close-btn" onClick={onClose} data-automation-selector="popup-close">
								<i className="pe-7s-close-circle" />
							</span>
							}
							{children}
							<Button className=" popup-modal__cancel-btn" btnClassName="btn btn-primary" onClick={onAction}>
								{l(cancelText)}
							</Button>
						</div>
					</div>
					<div className="popup-modal__container__shadow"></div>
				</div>
			</div>
		);
	}

	closeOnClickedOutside(e) {
		let modalBackground = ReactDOM.findDOMNode(this.refs.modalBackground);

		if (e.target === modalBackground) {
			this.props.onClose(e);
		}
	}
}


