import React from 'react';
import PropTypes from 'prop-types';

export default class FilterableHeaderCell extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired
  };

  state = {filterTerm: ''};

  handleChange = (e) => {
    let val = e.target.value;
    this.setState({filterTerm: val });
    this.props.onChange({filterTerm: val, column: this.props.column});
  };

  renderInput = () => {
    if (this.props.column.filterable === false) {
      return <span/>;
    }

    let inputKey = 'header-filter-' + this.props.column.key;
    return (
        <div className="grid-filter-input-wrap">
            <input key={inputKey} type="text" className="form-control input-sm" value={this.state.filterTerm} onChange={this.handleChange}/>
            <i className="pe-7s-filter" />
        </div>
    );
  };

  render() {
    return (
      <div>
        <div className="form-group">
          {this.renderInput()}
        </div>
      </div>
    );
  }
}


