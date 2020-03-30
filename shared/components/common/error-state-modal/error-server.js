import React, { Component } from 'react';
import { Button } from '../button';


const ServerError = ({onSubmit, l}) => {
	return (
		<div className="error-state-handle">
			<div className="text-center login-wrapper__screen-title">Oops !!! some thing went wrong , please try after some time or reload the page. To report this issue , click on Contact Us menu and Send feed back</div>
			<div className="action-btn-wrap flex flex-justify-center">
				<Button className="toolbar-group save-search" onClick={() => onSubmit()}>
					{l('OK')}
				</Button>
			</div>
		</div>
	)
};

export default ServerError;
