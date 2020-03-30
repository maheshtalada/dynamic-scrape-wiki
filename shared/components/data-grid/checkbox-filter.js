import React, { Component } from 'react';
import FilterableHeaderCell from './filterable-header-cell';
import Select from 'components/common/select/select';

export default class CheckboxFilter extends FilterableHeaderCell {

    // handleChange = (e) => {
    //     let val = e.currentTarget.checked ? 'false' : 'true';
    //     this.setState({filterTerm: val });
    //     console.log(this.props);
    //     this.props.onChange({filterTerm: val, column: this.props.column});
    // };

    handleChange = (value) => {
        this.setState({ selectedFilter : value.index, filterTerm : value.val });
        this.props.onChange({filterTerm: value.val, column: this.props.column});
    }

    renderInput = () => {
        const { l } = this.props;
        const { selectedFilter=0 } = this.state;
        if (this.props.column.filterable === false) {
          return <span/>;
        }
        const options = [
            { name : l('ALL'), value : {
                index : 0,
                val : ''
            } }, 
            { name : l('EXCLUDED'), value : {
                index : 1,
                val : 'false'
            }}
        ];
        let inputKey = 'header-filter-' + this.props.column.key;
        return (
            <div className="grid-filter-checkbox-wrap">
                <Select btnClassName="btn btn-default" selected={selectedFilter} options={options} onChange={this.handleChange} />
                <i className="pe-7s-filter" />
            </div>
        );
    };
}

