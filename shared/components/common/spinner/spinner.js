import React from 'react';

export default function({singleColor=false , styles={}}) {
	return (
		<div className={`mdl-spinner ${singleColor ? 'no-color': ''}`} style={styles}>
			<svg className="circular" viewBox="25 25 50 50">
				<circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="4" strokeMiterlimit="10"/>
			</svg>
		</div>
	)
}
