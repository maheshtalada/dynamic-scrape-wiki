import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MetrosServed from 'components/metros-served';

export default class MobileSearchOptions extends Component {
    constructor(props) {
        super(props);
        this.onClickGuidedSearch = this.onClickGuidedSearch.bind(this);
    }

    static contextTypes = {
        i18n : PropTypes.object,
        router : PropTypes.object
    };

    onClickGuidedSearch() {
        this.context.router.push({
            pathname : `/guided-search/investment`,
        });
    }

    render() {
        const { onSelect, options, selected, searchType } = this.props;
        const { l } = this.context.i18n;
        const modifiedOptions = options.slice(0,options.length-1);
        return (
            <div className="mobile-search-options">
				<div className="mobile-search-options__option">
					<button className="btn btn-default" onClick={()=>{this.props.onToggleMobileSearch('searchByMetro');}}>
						{l('BYMETRO')}
					</button>
				</div>
                <div className="mobile-search-options__option">
                    <button className="btn btn-default" onClick={()=>{this.props.onToggleMobileSearch('searchByLocation');}}>{l('BYLOCATION')}</button>
                </div>
				<div className="mobile-search-options__option">
					<button className="btn btn-default" onClick={this.onClickGuidedSearch}>
						{l('BYBUDGET')}
					</button>
				</div>
			</div>
        )
    }
}
