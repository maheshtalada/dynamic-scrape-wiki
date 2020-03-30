import React from 'react';
import Cx from 'classnames';

export default function({online=false, className}) {
	const indicatorClasses = online ? 'online' : 'offline';
	return <span className={Cx('online-indicator',className,indicatorClasses)} />
}
