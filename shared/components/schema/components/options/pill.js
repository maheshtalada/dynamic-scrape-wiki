import React from 'react';
import Chip from '../../../common/chip/chip';
import DefaultComponent from '../default-component/default-component';

export default class PillComponent extends DefaultComponent {

	static defaultProps = {
		classNames: ['schema__pill']
	};

	constructor(props) {
		super(props);
		this.handleDelete = this.handleDelete.bind(this);
	}

	renderLabel() {
		return null;
	}

	handleDelete() {
		this.props.remove();
	}

	renderValue(value) {
		const { l } = this.props;
		return (<Chip className={this.props.data.className} onClose={e => {
			this.handleDelete();
		}}>{l(value)}</Chip>)
	}
}
