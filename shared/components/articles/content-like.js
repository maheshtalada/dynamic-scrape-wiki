import React from 'react';
import Cx from 'classnames';

const ContentLike = ({onClickLike, l, likeCount, classNames, liked}) => {
	return (
		<div className={Cx('content-like-wrap',classNames)}>
			<div className="content-like-wrap__likes-txt"><span className="like-count">{likeCount}</span> {l('LIKES')}</div>
			<button onClick={()=>{onClickLike()}} className={`${liked ? 'liked' : ''} content-like-wrap__like-btn`}><i className="pe-7s-like2"/></button>
		</div>
	)
};

export default ContentLike;
