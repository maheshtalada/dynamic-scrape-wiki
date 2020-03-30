import { React, Component } from 'react';
import { Link } from 'react-router';
import Logo from '../common/logo/logo';
import Title from '../common/title/title';
import Cx from 'classnames';


export default class ClientHeader extends Component {

	static propTypes = {

	};

	static defaultProps = {


	};

	render() {

		return(
			<div className="client-header">
				<div className="client-header__logo-container">
					<Logo />
				</div>
				<div className="client-header__header-title">
					<Title
						titleName = "test"
						class="header-title"
					/>
				</div>
				<div className="client-header__header-actions" />
			</div>
		);
	}
}
