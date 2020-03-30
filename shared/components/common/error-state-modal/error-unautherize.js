import React, { Component } from 'react';
import Spinner from '../spinner/spinner';
import loadable from '@loadable/component';

const Login = loadable(() => import(/* webpackChunkName: 'quicksignup' */'../../login/login'),{
	LoadingComponent: Spinner,
});


const Unautherize = (props) => {
	const {onSubmit, l} = props;
	return (
		<div className="error-state-handle">
			<Login {...props} unauthorizeErrorLogin/>
		</div>
	)
};

export default Unautherize;
