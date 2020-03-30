import React from 'react';
const { areasServed } = require('assets/static/metros-served-config').default;

const MetrosServedNote = ({className='metros-served-note'}) => {
    return (
        <div className={className}>
            <p>We are currently serving in the following markets:</p>
            <ul className="metros-served__wrapper">
                {areasServed.map(metro => {
                    return (
                        <li className="metros-served__item col-md-6 col-lg-6 col-sm-6">{metro.aboutUsInfo.label}</li>
                    );
                })}
            </ul>
        </div>
	);
};

export default MetrosServedNote;
