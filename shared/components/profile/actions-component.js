import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../common/button';
import TogglePanel from '../toogle-panel/toggle-panel';
import { Link } from 'react-router';
import { sprintf } from '../../utils';
import Cx from 'classnames';

export default class Actions extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showMoreActions: false
		};
		this.onMoreActionsClick = this.onMoreActionsClick.bind(this);
	}

	static propTypes = {
		handleActionClick: PropTypes.func,
		mainActions: PropTypes.array,
		moreActions: PropTypes.array,
		actionsConfig: PropTypes.object,
		data: PropTypes.object
	};

	static contextTypes = {
		i18n: PropTypes.object
	};

	onMoreActionsClick() {
		this.setState((prevState) => {
			return {
				showMoreActions : !prevState.showMoreActions
			};
		});
	}

	renderAction(action,type) {
		const actionName = action.name.toLowerCase();
		const { actionsConfig, data, handleActionClick } = this.props;
		const actionData = {...data,...action};
		const { l } = this.context.i18n;

		if(actionsConfig[actionName].link) {
			const linkTo = actionsConfig[actionName].path ?
				sprintf(actionsConfig[actionName].path,actionData.id,frameworkGlobals.env) :
				action.uri;
			return (
				<Link to={linkTo} target={actionsConfig[actionName].isOpenSameTab ? "" : "_blank"} className={Cx("btn-default",{'btn': type === 'main'})} title={l(actionsConfig[actionName].label)}>
					{type === 'more' && l(actionsConfig[actionName].label)}
					<i title={l(actionsConfig[actionName].label)}
						className={`pe-7s-${actionsConfig[actionName].icon}`}/>
				</Link>
			);
		} else {
			return (
				<button title={l(actionsConfig[actionName].label)} onClick={()=> {
					handleActionClick({...data,...action},actionsConfig[actionName].callback);
				}} className={Cx("btn-default",{'btn': type === 'main'})}>
					{type === 'more' && l(actionsConfig[actionName].label)}
					<i className={`pe-7s-${actionsConfig[actionName].icon}`}/>
				</button>
			);
		}
	}

	render() {
		const { mainActions, moreActions, handleActionClick, actionsConfig, data, itemIndex } = this.props;
		const { l } = this.context.i18n;
		const { showMoreActions } = this.state;

		return (
			<div className="actions">
				{mainActions.map(action => {
					return this.renderAction(action,'main');
				})
				}
				{moreActions.length > 0 &&
					<Button title={l('MOREACTIONS')} btnClassName={`${showMoreActions ? 'btn-primary' :'btn-default'} more-actions-btn toggle-ignore-${itemIndex}`} onClick={this.onMoreActionsClick}>
						<i className={'pe-7s-menu2'}/>
					</Button>
				}
				{showMoreActions &&
					<TogglePanel
					 collapse={this.onMoreActionsClick}
					 ignoreClass={`toggle-ignore-${itemIndex}`}>
						{
							moreActions.map(action => {
								return this.renderAction(action,'more');
							})
						}
					</TogglePanel>
				}
			</div>
		);
	}
}
