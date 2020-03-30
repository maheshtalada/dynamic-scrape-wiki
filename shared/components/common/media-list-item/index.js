import React, { memo } from 'react';

const MediaListItem = memo(({data, awsImagePath, onClick}) => {
	return (
		<div className="media-list__item" onClick={()=>onClick(data)}>
			{data.photo && <div className="media-list__item__photo">
				<img src={`${awsImagePath}/${data.photo}`}/>
			</div>}
			<div className="media-list__item__info">
				<span className="media-list__item__info__item name">{data.name}</span>
				<span className="media-list__item__info__item profession">{data.profession}</span>
			</div>
		</div>
	)
});

export default MediaListItem
