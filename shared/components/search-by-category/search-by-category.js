import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {options} from '../../assets/static/advance-search-options';
import Select from '../../components/common/select/select';
import { findIndex as _findIndex } from 'lodash';
const { areasServed } =  require('../../assets/static/metros-served-config').default;
export default class SearchByCategory extends Component {
    
    static contextTypes = {
        i18n : PropTypes.object,
        screenSize : PropTypes.number
    }
    
    constructor(props) {
        super(props);
        this.state = {
        };
        this.onTypeChange = this.onTypeChange.bind(this);
        this.onMetroChange = this.onMetroChange.bind(this);
    }

    onMetroChange(areaServed) {
        const selected = _findIndex(areasServed,{ metroID : areaServed.metroID});
        this.setState({
            selectedMetroIndex : selected,
            showMetroOptions : false
        });
        this.props.onMetroChange && this.props.onMetroChange(areaServed,this.props.selectedCategoryIndex >= 0);
    }

    getMetrosSelectOptions() {
		return areasServed.sort((a, b)=>{
			if(a.label > b.label) {
				return 1;
			}

			if(b.label > a.label) {
				return -1
			}
			return 0

		}).map(area => {
			return {
				name : area.label,
				value : area
			}
		})
    }

    onTypeChange(value) {
        this.props.onTypeChange(value);
        if(this.state.selectedMetroIndex === undefined) {
            this.setState({
                showMetroOptions : true
            })
        }
    }

    render() {
        const { i18n : {l}, screenSize } = this.context;
        const { onTypeChange, selectedCategoryIndex, onSearch } = this.props;
        const { selectedMetroIndex, showMetroOptions } = this.state;
        return (
            <div className="search-by-category flex flex-align-center">
                <div className="search-by-category__options-wrap flex flex-align-center">
                    <Select
                        key="select-options-search"
                        btnClassName={screenSize === 1 ? 'btn btn-default' : ''}
                        options={options}
                        showOptionsByDefault
                        openSubOptions
                        name="search-options"
                        selected={selectedCategoryIndex}
                        btnLabel={selectedCategoryIndex >= 0 ? '' : 'CHOOSESEARCHCATEGORY'}
                        wrapperCls="search-options-select"
                        inputClasses="no-border quick-search-input"
                        onChange={this.onTypeChange}
                    />
                    <Select
                        key="select-options-market"
                        btnClassName={screenSize === 1 ? 'btn btn-default' : ''}
                        wrapperCls="market-options-select"
                        selected={selectedMetroIndex}
                        showOptions={showMetroOptions}
                        options={this.getMetrosSelectOptions()} 
                        isTranslationRequired={false} 
                        btnLabel={selectedMetroIndex >= 0 ? '' : 'CHOOSEAMARKET'}
                        onChange={this.onMetroChange}/>
                </div>
                <button className="btn btn-primary search-by-category__search-btn" onClick={()=>{onSearch();}}>
                    {l('SEARCH')}
                </button>
            </div>
        )
    }
}
