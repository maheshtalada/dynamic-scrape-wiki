import { React, Component } from 'react';
import Checkbox from 'components/common/checkbox/checkbox';
import ReactDOM from 'react-dom';

class CheckboxEditor extends Component {
    constructor(props) {
      super(props);
      this.state = {
        value : props.value
      }
    }

    validate(value) {
        if(value[this.props.column.key] && !this.inputFocus) {
            return true;
        }
        return false;
    }

    getValue() {
        const { column } = this.props;
        return {
            [column.key] : this.state.value
        }
      // should return an object of key/value pairs to be merged back to the row
    }

    getInputNode() {
        const node = ReactDOM.findDOMNode(this);
        const input = node.querySelector('input');
        return input;
    }
  
    disableContainerStyles() {
      // Optional method
      // If set to true, the EditorContainer will not apply default styling to the editor
    }

    handleChange = (e) => {
        this.inputFocus = false;
      this.setState({
          value : e.currentTarget.checked ? 'false' : 'true'
      },this.props.onCommit);
    }

    render() {
      // return UI for the editor
        const { value } = this.state;
        const { rowData, column } = this.props;
        const isHidden = value === 'false';
        return (
            <div className="data-grid-checkbox-editor">
                <Checkbox onBlur={() =>{this.inputFocus = false}} onFocus={()=>{this.inputFocus = true}} name={`data-grid-checkbox-editor-${column.key}-${rowData.id}`} id={`data-grid-checkbox-editor-${column.key}-${rowData.id}`} checked={isHidden} onChange={this.handleChange}/>
            </div>
        )
    }
}

export default CheckboxEditor;