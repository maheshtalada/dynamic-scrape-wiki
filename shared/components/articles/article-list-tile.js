import React, { memo } from 'react';
import { getPostedOndate } from 'utils/searchUtil';

const renderThumbnail = (item,assetsPath) => {
    let content = <img src={`${assetsPath}/images/noimages/no-article.png`} alt="news article"/> ;
    if(item.thumbnail) {
        content = <img src={`${item.thumbnail}`} alt="article photo"/>
    }
    return (
        <a href={`${item.contenturl}`}  className="info__title info__article-link" target="_blank">
            <div className="thumbnail">
                <span>
                    {content}
                </span>
            </div>
        </a>
    )
}

const renderTags = (item) => {
    if(item.tags && item.tags.length) {
        return (
            <div className="content-details-page__article-wrap__tags">
                {
                    item.tags.map(tag => {
                        return (
                            <span className="tag">{tag}</span>
                        );
                    })
                }
            </div>
        )
    }
    return null;
}

const renderAuthorName = (item) => {
    let name = <span className="info__author-name">{item.postedby}</span>;
    if(item.userprofileurl) {
        return (
            <a href={item.userprofileurl} className="info__title info__article-link" target="_blank">
                {name}
            </a>
        )
    }
    return (
        name
    )
}

const ArticleListTile = memo((props) => {
    const { l, item, assetsPath, country, hideAuthorName } = props;
    return (
        <div className="blog-item-wrapper">
            {renderThumbnail(item,assetsPath)}
            <div className="info">
                <div>
					<a href={`${item.contenturl}`}  className="info__title info__article-link" target="_blank">{item.title}</a>
					{!hideAuthorName && renderAuthorName(item)}
					<span className="info__created-date">{getPostedOndate(item.creationdate, country, 'DD MMM YYYY')}</span>
                    {/*<div className="info__description">{item.content}</div>*/}
                    {/*<div className="info__readmore">{l('CATEGORY')} : <span className="">{l(item.category.toUpperCase())}</span></div>*/}
                    <p className="info__description">
                        {item.content}
                    </p>
                    {/* {renderTags(item)} */}
                </div>
            </div>
            <a href={`${item.contenturl}`}  className="info__readmore info__article-link" target="_blank">{l('READMORE')}</a>
        </div>
    )
})

export default ArticleListTile;
