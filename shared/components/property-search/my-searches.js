import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { REQUEST_USER_SEARCHES } from '../../redux/actions/userprofile';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import MobileOverlay from '../common/mobile-overlay/mobile-overlay';
import Spinner from '../common/spinner/spinner';
import Cx from 'classnames';
import NoResults from '../common/no-results/no-results-found';

class MySearches extends Component {
    
    static contextTypes = {
        i18n : PropTypes.object,
        screenSize : PropTypes.number
    };

    constructor(props) {
        super(props);
        this.state = {
            page : 1,
            userSearches : {}
        };

        this.onLoadMore = this.onLoadMore.bind(this);
    }

    componentWillReceiveProps(props) {
        if(props) {
            this.setState({
                userSearches : props.userSearches
            });
        }
    }

    componentDidMount() {
		this.props.dispatch(REQUEST_USER_SEARCHES({
			loadMoreRequired : true
		}));
	}

    onLoadMore() {
        this.setState({
            page : parseInt(this.state.page)+1,
            onLoadMoreClick : true
        },()=>{
            this.props.dispatch(REQUEST_USER_SEARCHES({
                loadMoreRequired : true,
                query : {
                    page : parseInt(this.state.page)
                }
            }));
        })
    }

    renderSearches() {
        const { userSearches, page } = this.state;
        const { l } = this.context.i18n;
        return (
            <div className="my-searches__searches-wrap flex flex-column flex-align-center">
                {userSearches && (userSearches.isFetching ? <Spinner/> :
                    <ul>
                        {userSearches.data ? userSearches.data.map(search => {
                            return (
                                <li>
                                    <a href={search.actions[0].uri}>{search.name}</a>
                                </li>
                            )
                        }) : <NoResults l={l} title="YOUHAVENOSEARCHESTITLE" message="YOUHAVENOSEARCHESMESSAGE"/>}
                    </ul>
                )}
                {userSearches && userSearches.totalpage > page && <div className="my-searches__searches-wrap__load-more">
                    <button className="btn btn-default btn-sm" onClick={this.onLoadMore}>{l('LOADMORE')}</button>
                </div>}
            </div>
        )
    }

	render() {
        const { className, removeModal } = this.props;
        const { i18n : {l}, screenSize } = this.context;
        return (
            <div className={Cx("my-searches",className)}>

				{(screenSize > 2 ? this.renderSearches() :
                    <MobileOverlay onCloseOverlay={removeModal}>
                        {this.renderSearches()}
                    </MobileOverlay>
                )}
            </div>
        )
    }

}

const mapStateToProps = ({userprofile}) => {
	return {
		userSearches: userprofile.user_searches
	};
};
export default connect(mapStateToProps)(MySearches);
