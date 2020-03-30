import React from 'react';
import ArticleListTile from 'components/articles/article-list-tile';

const RecentArticles = ({articles, l, country, assetsPath}) => {
	return (
		<div className="realtor-articles">
			{
				articles.map(article => {
					return (
						<div className="realtor-articles__article">
							<ArticleListTile item={article} hideAuthorName country={country} assetsPath={assetsPath} l={l}/>
						</div>
					);
				})
			}
		</div>
	);
};

export default RecentArticles;
