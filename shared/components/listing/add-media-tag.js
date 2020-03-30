import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { Button } from '../common/button';

export default class AddMediaTag extends Component {
	static propTypes = {
		tags: PropTypes.array,
		tab: PropTypes.string,
		onSaveTag: PropTypes.func,
		fileIndex: PropTypes.number,
		btnText: PropTypes.string,
		inputPlaceholder: PropTypes.string
	};

	static contextTypes = {
		i18n: PropTypes.object
	};

	constructor(props) {
		super(props);

		this.onInputChange = this.onInputChange.bind(this);
		this.onSave = this.onSave.bind(this);
		this.handleBodyClick = this.handleBodyClick.bind(this);
		this.onKeyEnter = this.onKeyEnter.bind(this);
		this.state = {
			showTags: false,
			tagValue: '',
			showTagBox: false
		};
	}

	componentWillMount() {
		window.addEventListener('click', this.handleBodyClick);
	}

	componentWillUnmount() {
		window.removeEventListener('click', this.handleBodyClick);
	}

	onTagSelect(tag) {
		this.setState({
			tagValue: tag
		},() => this.onSave());
	}

	onInputChange(evt) {
		let showTags = true;
		if(evt.target.value.length > 0) {
			showTags = false;
		}
		this.setState({
			tagValue: evt.target.value,
			showTags
		});
	}

	onKeyEnter(evt) {
		if(evt.keyCode !== 13) {
			return;
		}
		this.onSave();
	}

	onSave() {
		const { tagValue } = this.state;
		const { fileIndex, onSaveTag, tab } = this.props;
		this.toggleTagBox(false,() => {
			onSaveTag(fileIndex,tagValue,tab);
		});
	}

	renderTagBox() {
		const { inputPlaceholder,tags, selectedTag } = this.props;
		const { showTags } = this.state;
		const { l } = this.context.i18n;
		return (
			<div className="media-tag-box">
				<div className="media-tag-box__input-wrap">
					<input onKeyUp={this.onKeyEnter} autoFocus={true} className="media-tag-box__input" placeholder={l(inputPlaceholder)} onChange={this.onInputChange} onFocus={this.toggleTagsList.bind(this,true)}/>
					<Button btnClassName="btn-default" onClick={this.onSave}>{l('SAVE')}</Button>
				</div>
				{showTags && tags.length > 0 &&
					<ul className="media-tag-box__tags-list">
						{
							tags.map(tag => {
								return (
									<li onClick={() => this.onTagSelect(tag)} className="media-tag-box__tags-list__tag" title={l(tag)}>
										<button>
											{l(tag)}
										</button>
									</li>
								);
							})
						}
					</ul>
				}
				<button className="media-tag-box__close" onClick={()=>{ this.toggleTagBox(false); }}><i className="pe-7s-close"/> </button>
			</div>
		);
	}

	render() {
		const { l } = this.context.i18n;
		const { btnText, mode } = this.props;
		const { showTagBox } = this.state;
		return (
			<div className="">
				{mode === 'add' &&
					<Button title={l(btnText)} btnClassName="btn-default" onClick={()=> {
						this.toggleTagBox(true);
					}}>
						{l(btnText)}
					</Button>
				}
				{mode === 'edit' &&
					<i title={l('EDIT')} className="edit-tag pe-7s-note" onClick={() => {this.toggleTagBox(true);}}/>
				}
				{showTagBox && this.renderTagBox()}
			</div>
		);
	}

	toggleTagsList(val) {
		this.setState({
			showTags: val
		});
	}

	toggleTagBox(val,callback) {
		this.setState({
			showTagBox : val
		},() => {
			typeof callback === 'function' && callback();
		});
	}

	handleBodyClick(evt) {
		if(!findDOMNode(this).contains(evt.target)) {
			this.toggleTagBox(false);
		}
	}

}
