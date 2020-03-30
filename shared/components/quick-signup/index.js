import loadable from '@loadable/component';
import Spinner from '../common/spinner/spinner';
export const UserScreen = loadable(() => import(/* webpackChunkName: 'user' */'./user.js'),{
	LoadingComponent: Spinner,
});
export const OTPVerify = loadable(() => import(/* webpackChunkName: 'otp' */'./otp.js'),{
	LoadingComponent: Spinner,
});
export const PasswordScreen = loadable(() => import(/* webpackChunkName: 'password' */'./password.js'),{
	LoadingComponent: Spinner,
});
export const ResetPassword = loadable(() => import(/* webpackChunkName: 'passwordreset' */'./password-reset.js'),{
	LoadingComponent: Spinner,
});
export const NewUserRegister = loadable(() => import(/* webpackChunkName: 'register' */'./register.js'),{
	LoadingComponent: Spinner,
});
export const WelcomeNotes = loadable(() => import(/* webpackChunkName: 'welcomenotes' */'./welcome-notes.js'),{
	LoadingComponent: Spinner,
});
export const ActivateAccountSetPassword = loadable(() => import(/* webpackChunkName: 'activateaccount' */'./activate-account-set-password.js'),{
	LoadingComponent: Spinner,
});

