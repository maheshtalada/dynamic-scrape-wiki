import React, {Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Input from '../input/input';
import { getPartialSearchAttribute } from '../../../utils/searchUtil';

export default class SearchByName extends Component {

	static propTypes= {
		headerTitle : PropTypes.string,
		onSearch : PropTypes.func,
		name : PropTypes.string,
		placeHolder : PropTypes.string,
		isTitleRequired : PropTypes.bool,
		isClearSearchRequired : PropTypes.bool,
		onClearSearch : PropTypes.func,
		searchKeywordLength : PropTypes.number
	};

	static defaultProps= {
		onSearch : ()=>{},
		name : undefined,
		placeHolder : 'ENTERNAME',
		isTitleRequired : true,
		isClearSearchRequired : true,
		onClearSearch : () =>{},
		searchKeywordLength : 3,
		headerTitle : 'SEARCHBYNAME'
	};

	static contextTypes = {
		i18n: PropTypes.object
	};

	constructor(props) {
		super(props);
		this.state = {};
		this.keyPress = this.keyPress.bind(this);
		this.onSearch = this.onSearch.bind(this);
		this.onClearSearch = this.onClearSearch.bind(this);
	}

	componentDidMount() {
		document.addEventListener('keydown', this.keyPress);
	}

	componentWillReceiveProps(props) {
		if(props) {
			this.setState({
				location: props.location
			});
		}
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.keyPress);
	}

	keyPress(event) {
		if(event.keyCode === 13) {
			this.onSearch();
			return;
		}
	}

	onClearSearch() {
		const { searchType } = this.props;
		const searchNameKey = getPartialSearchAttribute(searchType);
		this.props.onClearSearch && this.props.onClearSearch(searchNameKey);
	}

	onSearch() {
		const searchString = ReactDOM.findDOMNode(this.refs.placeInput.refs.input).value;
		this.props.onSearch && searchString.length >= this.props.searchKeywordLength && this.props.onSearch(searchString);
	}

	render() {
		const { placeHolder, name, isTitleRequired, isClearSearchRequired, headerTitle } = this.props;
		const { l } = this.context.i18n;
		return (
			<div className="search-by-name">
				{isTitleRequired && <span className="search-by-name__title">
					 {l(headerTitle)}
					</span>
				}
				{ name && isClearSearchRequired && <button className="search-by-name__clear btn btn-primary btn-xs" onClick={this.onClearSearch}>
					{l('CLEARSEARCH')}
				</button> }
				<Input
					ref="placeInput"
					parentClass="flex flex-align-center"
					placeholder={`${l(placeHolder)}`}
					value={name}
					autoFocus={false}
					classes="no-border quick-search-input">
					<button className="search-by-name__search-btn" onClick={this.onSearch}>
						<i className="pe-7s-search" />
					</button>
				</Input>
			</div>
		);
	}

}
