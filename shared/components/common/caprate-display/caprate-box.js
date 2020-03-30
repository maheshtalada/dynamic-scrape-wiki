import React, { memo } from 'react';
import Cx from 'classnames';

const CaprateBox = memo(({value='',label='',theme='', className, tooltip=''})=> {
	return (
		<div data-tip={tooltip} data-place="left" className={Cx('property-caprate',theme, className)}>
			<div className="value">
				{value}
			</div>
			<div className="label">
				{label}
			</div>
		</div>
	)
});

CaprateBox.displayName = 'CaprateBox';

export default CaprateBox;


