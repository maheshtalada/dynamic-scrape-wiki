import { React, Component } from 'react';
import Datetime from 'react-datetime';
import moment from 'moment';

class DataGridDateEditor extends Component {
    constructor(props) {
      super(props);
      this.state = {
        value : props.value
      }
    }
    getValue() {
        const { column } = this.props;
        return {
            [column.key] : this.state.value
        }
      // should return an object of key/value pairs to be merged back to the row
    }

    validate(value) {
      if(value[this.props.column.key] && !this.isCalendarOpen) {
        return true;
      }
      return false;
    }
  
    getInputNode() {
      const { rowData } = this.props;
      return document.querySelector(`#date-input-${rowData.id}`);
    }
  
    disableContainerStyles() {
      // Optional method
      // If set to true, the EditorContainer will not apply default styling to the editor
    }

    handleChange = (newDate) => {
      let date = '';
      if(typeof newDate === 'string') {
        date = newDate
      } else {
        date = moment(newDate).format('DD/MM/YYYY');
        this.setValue(date);
      }
    }

    setValue = (value) => {
      this.isCalendarOpen = false;
        this.setState({
          value : value
      },this.props.onCommit);
    }

    onBlur = (value) => {
      const date = moment(value,'MM/DD/YYYY').format('DD/MM/YYYY');
      this.setValue(date);
    }

    render() {
      // return UI for the editor
      const format = 'MM/DD/YYYY';
      const { value, rowData } = this.props;
      // console.log(value);
      const date = moment(value,'DD/MM/YYYY').format('MM/DD/YYYY');
      return (
        <Datetime
            viewMode="days"
            defaultValue={date}
            value={date}
            timeFormat={false}
            dateFormat={format}
            inputProps = {{'placeholder' : 'MM/DD/YYYY', 'id': `date-input-${rowData.id}`}}
            closeOnSelect = {false}
            onFocus = {()=>{ this.isCalendarOpen = true}}
            onBlur = {this.onBlur}
            onChange={(newData)=>this.handleChange(newData)}
        />
      )
    }
}

export default DataGridDateEditor;