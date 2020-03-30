import React from 'react';

const WelcomeNotes = ({l, note}) => {
	return (
		<div className="col-md-5 application-description">
			<h2>{`${l('WELCOMETO')}`} <span>{`${l('PROPSHUB')}`}</span></h2>
			<h4>
				{`${l(note.heading)}`}
			</h4>
			<p>{l(note.line1)}</p>
			{note.line2 && <p>{l(note.line2)}</p>}
		</div>
	);
};

export default WelcomeNotes

