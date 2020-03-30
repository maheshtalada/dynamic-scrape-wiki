import React, { Fragment, memo } from 'react';

const WizardQuestion = memo(({question}) => {
	return (
		<Fragment className="wizard__question">{question}</Fragment>
	);
});

export default WizardQuestion;
