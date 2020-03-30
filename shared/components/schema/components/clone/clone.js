import React from 'react';
import PropTypes from 'prop-types';
import DefaultComponent from '../default-component/default-component';

/**
 * @description component that copies the children to it's parent components
 * @prop classNames {array} Additional classnames to be added to the component
 */


export default class CloneComponent extends DefaultComponent {
	static defaultProps = {
		classNames: ['schema__clone']
	};

	static propTypes = {
		classNames: PropTypes.array,
		parent: PropTypes.func,
		root: PropTypes.func,
		inject: PropTypes.func
	};

	constructor(props) {
		super(props);
	}

	onCloneClick(e) {
		e.preventDefault();
		let selfIndex = this.props.parent().children.indexOf(this.props.root());
		let key = this.props.root().data.key++;
		this.props.parent().inject(this.props.root().children, selfIndex, key );
	}

	renderLabel(label) {
		const { l } = this.props;
		return (
			<button className="schema__clone__link button--text btn btn-default"
					onClick={this.onCloneClick.bind(this)}
					data-tealium-narrative ={label} >
				<i className="pe-7s-plus2"/>
				{l(label)}{this.renderLabelInfo()}
			</button>
		);
	}
	renderValue() {
		return null;
	}
}

