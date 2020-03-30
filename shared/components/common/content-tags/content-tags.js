import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '../checkbox/checkbox';
import Cx from 'classnames';

class ContentTags extends Component {

	static propTypes = {
		fetchedTags : PropTypes.array,
		newTags : PropTypes.array,
		updateSelectedTags : PropTypes.func,
		updateNewTags : PropTypes.func
	};

	static contextTypes = {
		i18n : PropTypes.object
	};

	constructor(props) {
		super(props);
		this.state = {
			tagExists : false,
			fetchedTags : props.fetchedTags,
			newTags : props.newTags
		};
		this.selectedTags = props.selectedTags || [];
		this.addNewTag = this.addNewTag.bind(this);
		this.removeTag = this.removeTag.bind(this);
		this.handleSelectTags = this.handleSelectTags.bind(this);
		this.isDuplicateTag = this.isDuplicateTag.bind(this);
		this.handleTagInputKeyPress = this.handleTagInputKeyPress.bind(this);
	}

	componentWillReceiveProps(props) {
		this.setState({
			fetchedTags : props.fetchedTags,
			newTags : props.newTags
		});
	}

	render() {
		const { tagExists, fetchedTags, newTags } = this.state;
		const tags = [...fetchedTags,...newTags];
		const { l } = this.context.i18n;
		return (
			<div className={Cx('content-tags-wrap',this.props.className)}>
				<ul className="m-article-tags__tags-wrap__tags">
					{tags && tags.length > 0 &&
					tags.map(tag => {
						const checkFlag = this.selectedTags.indexOf(tag) > -1;
						return (
							<div className="m-article-tags__tags-wrap__tags__tag-wrap">
								<Checkbox checked={checkFlag} label={tag} name={tag} id={tag} onChange={this.handleSelectTags}/>
							</div>
						);
					})
					}
				</ul>
				<div className="m-article-tags__tags-wrap__new-tags">
					{/*
					 newTags.map((tag,index) => {
					 return (
					 <Chip onClose={()=>{this.removeTag(index)}} className="m-article-tags__tags-wrap__new-tags__new-tag">
					 {tag}
					 </Chip>
					 )
					 })
					 */}
					{tagExists &&
					<div className="m-article-tags__tags-wrap__new-tags__tag-exist">
						<span>{l('TAGEXISTS')}</span>
					</div>
					}
					<input ref="newTagInput" type="text" placeholder={l('ADDNEWTAG')} onKeyDown={this.handleTagInputKeyPress}/>
					<button className="btn btn-primary m-article-tags__tags-wrap__new-tags__add-tag" onClick={this.addNewTag}>{l('ADD')}</button>
				</div>
			</div>
		)
	}

	handleSelectTags(evt) {
		let updatedSelectTags = [...this.selectedTags];
		if(evt.target.checked) {
			updatedSelectTags.push(evt.target.name);
		} else {
			let index = updatedSelectTags.indexOf(evt.target.name);
			updatedSelectTags.splice(index,1);
		}
		this.selectedTags = updatedSelectTags;
		this.props.updateSelectedTags(this.selectedTags);
	}

	handleTagInputKeyPress(evt) {
		const tagValue = evt.target.value;
		const { newTags } = this.state;
		let updatedNewTags = [...newTags];
		let duplicateCheck = false;
		if(evt.keyCode !== 13) {
			return;
		}
		if(!this.isDuplicateTag(tagValue)) {
			evt.target.value = '';
			updatedNewTags.push(tagValue);
			this.selectedTags.push(tagValue);
			duplicateCheck = false;
		} else {
			duplicateCheck = true;
		}
		this.setState({
			tagExists : duplicateCheck
		},()=>this.props.updateNewTags(updatedNewTags));
	}

	addNewTag() {
		const { newTags, fetchedTags } = this.state;
		let updatedNewTags = [...newTags];
		let duplicateCheck = false;
		const tagValue = this.refs.newTagInput.value;
		if(!this.isDuplicateTag(tagValue)) {
			updatedNewTags.push(tagValue);
			this.selectedTags.push(tagValue);
			this.props.updateSelectedTags(this.selectedTags);
			duplicateCheck = false;
			this.refs.newTagInput.value = '';
		} else {
			duplicateCheck = true;
		}
		this.setState({
			tagExists : duplicateCheck
		},()=>this.props.updateNewTags(updatedNewTags));
	}

	isDuplicateTag(tagValue) {
		const { fetchedTags, newTags } = this.state;
		if(fetchedTags.length === 0 && newTags.length === 0) {
			return;
		}
		const lowerCasedTags = [...fetchedTags,...newTags].map(tag => tag.toLowerCase());
		const tag = tagValue.toLowerCase();
		return (lowerCasedTags.indexOf(tag) >= 0);
	}

	removeTag(index) {
		let updatedTags = [...this.state.newTags];
		updatedTags.splice(index,1);
		this.props.updateNewTags(updatedTags);
	}
}

export default ContentTags;
