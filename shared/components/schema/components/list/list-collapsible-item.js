import React from 'react';
import PropTypes from 'prop-types';
import ListCollapsibleComponent from './list-collapsible';
import Collapsible from '../../../common/collapsible/collapsible';
import MarkdownWrapper from '../default-component/markdown-wrapper';
/**
 * @description Renders a list based of off a specific tab value
 * @prop classNames {array} Additional classnames to be added to the component
 */

export default class ListCollapsibleItem extends ListCollapsibleComponent {

	static propTypes = {
		classNames: PropTypes.array
	};

	static defaultProps = {
		classNames: ['schema__list', 'schema__list-collapsible-item']
	};

	renderLabel() {
		return null;
	}

	renderValue() {
		const { l,label, data } = this.props;
		//console.log(children);
		return (
			<Collapsible
				key={this.state.uniqueId}
				transitionTime={250}
				trigger={l(label)}
				open={data.isOpen}
				extraProps={{
					id : data.htmlId
				}}
				className="property-details__section-wrapper"
			>
				{this.props.children.length ? this.props.children : <MarkdownWrapper value={data.value}/>}
				{/*<MarkdownWrapper value={data.value}/>*/}
			</Collapsible>
		);
	}

}


