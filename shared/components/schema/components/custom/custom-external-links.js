import React from 'react';
import PropTypes from 'prop-types';
import ContentLinkComponent from '../content/content-link';

export default class CustomExternalLinks extends ContentLinkComponent {
	static propTypes = {
		classNames: PropTypes.array
	};

	static defaultProps = {
		classNames: ['schema__content', 'schema__external__link']
	};

	renderValue(value) {
		const { medias: dataSet } = this.props.data;
		return (
			<div className="property-details__external-links">
				<ul className="links">
					{
						dataSet.map(link=>
							<li>
								<a href={link.uri} target="_blank" rel="noopener noreferrer">{link.title || link.uri}</a>
							</li>
						)
					}
				</ul>
			</div>
		)
	}
}



