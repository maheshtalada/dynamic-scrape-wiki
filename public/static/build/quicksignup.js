(window.webpackJsonp=window.webpackJsonp||[]).push([[102],{gE5P:function(e){e.exports=JSON.parse('{"a":[{"role":"ROLE_CUSTOMER","role_id":100,"name":"OWNER"},{"role":"ROLE_PROFESSIONAL","role_id":200,"name":"PROFESSIONAL"},{"role":"ROLE_REALTOR","role_id":300,"name":"REALTOR"},{"role":"ROLE_PROPSHUB_MARKETING_USER","role_id":400,"name":"REALTOR"},{"role":"ROLE_PROPSHUB_ADMIN","role_id":500,"name":"REALTOR"}]}')},m0ce:function(e,n,t){"use strict";t.r(n);var o=t("gcR/"),i=t.n(o),s=t("pVnL"),E=t.n(s),r=t("lwsE"),a=t.n(r),R=t("a1gu"),S=t.n(R),c=t("Nsbk"),u=t.n(c),O=t("PJYZ"),I=t.n(O),l=t("W8MJ"),T=t.n(l),N=t("7W2i"),P=t.n(N),m=t("q1tI"),d=t.n(m),C=t("17x9"),A=t.n(C),D=t("rW/z"),L=t("J2m7"),p=t.n(L),h=t("TSYQ"),g=t.n(h),_=t("n4SK"),f=t("hAwx"),F=t("MKeS"),U=t("aNkp"),V={USER_SCREEN:Object(F.a)((function(){return t.e(106).then(t.bind(null,"Ixrj"))}),{LoadingComponent:U.a}),OTP_SCREEN:Object(F.a)((function(){return t.e(99).then(t.bind(null,"li5y"))}),{LoadingComponent:U.a}),PASSWORD_SCREEN:Object(F.a)((function(){return t.e(100).then(t.bind(null,"Fd8L"))}),{LoadingComponent:U.a}),RESET_SCREEN:Object(F.a)((function(){return t.e(101).then(t.bind(null,"ZkJA"))}),{LoadingComponent:U.a}),REGISTER_SCREEN:Object(F.a)((function(){return Promise.all([t.e(0),t.e(4),t.e(103)]).then(t.bind(null,"YCUq"))}),{LoadingComponent:U.a}),WELCOME_SCREEN:Object(F.a)((function(){return t.e(122).then(t.bind(null,"scML"))}),{LoadingComponent:U.a}),ACTIVATE_ACCOUNT_SET_PASSWORD:Object(F.a)((function(){return Promise.all([t.e(3),t.e(96)]).then(t.bind(null,"ZBGu"))}),{LoadingComponent:U.a})},v=function(e){function Login(e){var n;a()(this,Login),(n=S()(this,u()(Login).call(this,e))).onInputChange=n.onInputChange.bind(I()(n)),n.onActionSubmit=n.onActionSubmit.bind(I()(n)),n.onTermsSelect=n.onTermsSelect.bind(I()(n)),n.keyPress=n.keyPress.bind(I()(n));var t=e.user,o=t.userstatus,i=t.username,s=t.name,E=t.roleType;return n.state={currentScreen:e.screen||"USER_SCREEN",username:i,name:s,roleType:E,screenStatus:o||"DEFAULT_SCREEN",showEmailValidationError:!1,loginContext:void 0},n}return P()(Login,e),T()(Login,null,[{key:"getLayoutOption",value:function getLayoutOption(e){return p()(D,{status:e})}}]),T()(Login,[{key:"componentWillReceiveProps",value:function componentWillReceiveProps(e){var n=e.user,t=n.userstatus,o=void 0===t?void 0:t,i=n.isFetching,s=n.lookupStatus,E=void 0===s?void 0:s,r=n.username,a=n.name,R=n.roleType,S=this.state,c=S.screenStatus,u=S.loginContext;e.user.isLogIn&&(this.props.removeModal(),e.unauthorizeErrorLogin&&window.location.reload()),this.setState({currentStep:e.screen||"USER_SCREEN",screenStatus:o||c,loginContext:E||u,isFetching:i,username:this.state.username||r,name:a,roleType:R})}},{key:"componentDidMount",value:function componentDidMount(){document.addEventListener("keyup",this.keyPress)}},{key:"componentWillUnmount",value:function componentWillUnmount(){document.removeEventListener("keyup",this.keyPress)}},{key:"keyPress",value:function keyPress(e){13===e.keyCode&&this.onActionSubmit()}},{key:"onForgotPassword",value:function onForgotPassword(){var e=this,n=this.state.username;n&&this.setState({screenStatus:"FORGOT_PASSWORD"},(function(){e.props.dispatch(Object(f.b)({username:n}))}))}},{key:"onBackToLogin",value:function onBackToLogin(){this.setState({screenStatus:"DEFAULT_SCREEN"})}},{key:"onVerifyOTP",value:function onVerifyOTP(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=this.state,t=n.username,o=n.otp;t&&o&&this.props.dispatch(Object(f.j)({username:t,token:o},e))}},{key:"onRegisterVerifyOTP",value:function onRegisterVerifyOTP(){this.onReduxAction(f.i,this.state.rememberFlg)}},{key:"onResetPassword",value:function onResetPassword(){this.onReduxAction(f.c,this.state.rememberFlg||!0)}},{key:"onSetPasswordViaEmail",value:function onSetPasswordViaEmail(e,n){this.props.dispatch(Object(f.e)({password:n.password,name:n.name,token:this.props.location.query.token,rememberFlg:n.rememberFlg}))}},{key:"onReduxAction",value:function onReduxAction(e,n){var t=this.state,o=t.username,i=t.otp,s=t.password;o&&i&&this.props.dispatch(e({username:o,token:i,password:s,rememberFlg:n}))}},{key:"onLogin",value:function onLogin(){var e=this.state,n=e.username,t=e.password,o=e.rememberFlg,i=void 0===o||o;n&&t&&this.props.dispatch(Object(f.f)({grant_type:"password",username:n,password:t,remember:i}))}},{key:"onGenerateOTP",value:function onGenerateOTP(){var e=this.state.username;e&&this.props.dispatch(Object(f.b)({username:e}))}},{key:"onIsUserExist",value:function onIsUserExist(){var e=this.state.username;Object(_.a)(e)?(this.props.dispatch(Object(f.h)({username:e})),this.setState({showEmailValidationError:!1})):this.setState({showEmailValidationError:!0})}},{key:"onInputChange",value:function onInputChange(e){this.setState(e)}},{key:"onActionSubmit",value:function onActionSubmit(e,n){var t=this.state,o=t.actionObject,i=t.screenStatus,s=e?{action:e}:Login.getLayoutOption(i);"function"==typeof this[s.action]&&this[s.action](o,n)}},{key:"onPreviousClick",value:function onPreviousClick(){}},{key:"getCurrentStep",value:function getCurrentStep(){var e=this.state,n=e.currentScreen,t=e.screenStatus;if(t){var o=Login.getLayoutOption(t);return{componentConfig:o,component:V[o.screen]}}return{component:V[n.data]}}},{key:"render",value:function render(){var e=this.getCurrentStep(),n=e.component,t=e.componentConfig,o=this.context.i18n.l;return i()("div",{className:g()("login-wrapper",this.props.className)},void 0,d.a.createElement(n,E()({l:o},this.props,this.state,t,{onChange:this.onInputChange,onSubmit:this.onActionSubmit,onAgreeTerms:this.onTermsSelect})))}},{key:"onTermsSelect",value:function onTermsSelect(e){this.setState({isAgreeTerms:e})}}]),Login}(m.Component);v.defaultProps={removeModal:function removeModal(){},isThirdPartyLogin:!1},v.contextTypes={router:A.a.object,i18n:A.a.object};n.default=v},n4SK:function(e,n,t){"use strict";t.d(n,"c",(function(){return getRoleID})),t.d(n,"d",(function(){return getRoleName})),t.d(n,"a",(function(){return checkIfValidEmailId})),t.d(n,"b",(function(){return checkIfValidMobileNumber}));var o=t("gE5P"),i=t("J2m7"),s=t.n(i),E=/^\s*(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\s*$/,r=/^[0-9]{0,10}$/;function getRoleID(e){var n=e&&e.length>0&&e.map((function(e){var n=s()(o.a,{role:e});return n&&n.role_id||0}));return Math.max.apply(null,n)}function getRoleName(e){var n=getRoleID(e);return s()(o.a,{role_id:n}).name}function checkIfValidEmailId(e){return!!e&&E.test(e)}function checkIfValidMobileNumber(e){return r.test(e)}},"rW/z":function(e){e.exports=JSON.parse('[{"status":"USER_EXIST","screen":"PASSWORD_SCREEN","action":"onLogin","welcome_note":{"heading":"PASSWORDHEADING","line1":"PASSWORDDESCRIPTIONLINE1","line2":"PASSWORDDESCRIPTIONLINE2"}},{"status":"AUTO_VERIFIED_USER_EXIST","screen":"PASSWORD_SCREEN","action":"onLogin","isBackRequired":false},{"status":"BAD_CREDENTIALS","screen":"PASSWORD_SCREEN","action":"onLogin","welcome_note":{"heading":"PASSWORDHEADING","line1":"PASSWORDDESCRIPTIONLINE1","line2":"PASSWORDDESCRIPTIONLINE2"}},{"status":"INVALID_USERNAME","screen":"PASSWORD_SCREEN","action":"onLogin","welcome_note":{"heading":"PASSWORDHEADING","line1":"PASSWORDDESCRIPTIONLINE1","line2":"PASSWORDDESCRIPTIONLINE2"}},{"status":"TOKEN_NOT_MATCHING","screen":"OTP_SCREEN","action":"onVerifyOTP","isPasswordResetRequired":true,"welcome_note":{"heading":"VERIFYOTPHEADING","line1":"VERIFYOTPDESCRIPTIONLINE1","line2":"VERIFYOTPDESCRIPTIONLINE2"}},{"status":"DEFAULT_SCREEN","screen":"USER_SCREEN","action":"onIsUserExist","welcome_note":{"heading":"LOGINHEADING","line1":"LOGINDESCRIPTIONLINE1","line2":"LOGINDESCRIPTIONLINE2"}},{"status":"USER_ACCOUNT_DISABLED","screen":"USER_SCREEN","action":"onIsUserExist","message":"USERACCOUNTDISABLED","screenTitle":"USERACCOUNTDISABLEDTITLE","welcome_note":{"heading":"USERACCOUNTDISABLEDHEADING","line1":"USERACCOUNTDISABLEDLINE1","line2":"USERACCOUNTDISABLEDLINE2"}},{"status":"USER_NOT_FOUND","screen":"REGISTER_SCREEN","welcome_note":{"heading":"REGISTRATIONHEADING","line1":"REGISTRATIONDESCRIPTIONLINE1","line2":"REGISTRATIONDESCRIPTIONLINE2"}},{"status":"USER_UNVERIFIED","screen":"OTP_SCREEN","action":"onRegisterVerifyOTP","screenTitle":"VERIFYOTPDESCRIPTIONLINE2","welcome_note":{"heading":"VERIFYOTPHEADING","line1":"VERIFYOTPUSERUNVERIFIEDLINE1","line2":"VERIFYOTPUSERUNVERIFIEDLINE2"}},{"status":"USER_CREATED","screen":"OTP_SCREEN","action":"onRegisterVerifyOTP","screenTitle":"VERIFYOTPDESCRIPTIONLINE2","welcome_note":{"heading":"VERIFYOTPHEADING","line1":"VERIFYOTPDESCRIPTIONLINE1","line2":"VERIFYOTPDESCRIPTIONLINE2"}},{"status":"USER_ACCOUNT_LOCKED","screen":"OTP_SCREEN","action":"onVerifyOTP","message":"USERACCOUNTLOCKED","screenTitle":"VERIFYOTPDESCRIPTIONLINE2","welcome_note":{"heading":"VERIFYOTPHEADING","line1":"VERIFYOTPACCOUNTLOCKEDLINE1","line2":"VERIFYOTPACCOUNTLOCKEDLINE2"}},{"status":"EMPTY_PASSWORD","screen":"OTP_SCREEN","action":"onVerifyOTP","message":"EMPTYPASSWORD","screenTitle":"VERIFYOTPDESCRIPTIONLINE2","welcome_note":{"heading":"VERIFYOTPHEADING","line1":"VERIFYOTPEMPTYPASSWORDLINE1","line2":"VERIFYOTPEMPTYPASSWORDLINE2"}},{"status":"FORGOT_PASSWORD","screen":"OTP_SCREEN","action":"onVerifyOTP","message":"FORGOTPASSWORD","screenTitle":"VERIFYOTPDESCRIPTIONLINE2","welcome_note":{"heading":"VERIFYOTPHEADING","line1":"VERIFYOTPFORGOTPASSWORDLINE1","line2":"VERIFYOTPFORGOTPASSWORDLINE2"}},{"status":"USER_AUTO_REGISTERED","screen":"OTP_SCREEN","action":"onVerifyOTP","message":"USERAUTOREGISTERED","screenTitle":"VERIFYOTPDESCRIPTIONLINE2","welcome_note":{"heading":"VERIFYOTPHEADING","line1":"VERIFYOTPAUTOREGISTEREDLINE1","line2":"VERIFYOTPAUTOREGISTEREDLINE2"}},{"status":"RESET_PASSWORD","screen":"RESET_SCREEN","action":"onResetPassword","screenTitle":"FORGOTPASSWORDDESCRIPTIONLINE1","welcome_note":{"heading":"FORGOTPASSWORDHEADING","line1":"FORGOTPASSWORDDESCRIPTIONLINE1","line2":"FORGOTPASSWORDDESCRIPTIONLINE2"}},{"status":"AUTO_VERIFIED_USER_RESET_PASSWORD","screen":"ACTIVATE_ACCOUNT_SET_PASSWORD","action":"onSetPasswordViaEmail","isBackRequired":false,"screenTitle":"FORGOTPASSWORDDESCRIPTIONLINE1"},{"status":"AUTO_VERIFIED_USER_VERIFY_OTP","screen":"OTP_SCREEN","action":"onVerifyOTP","isBackRequired":false,"screenTitle":"VERIFYOTPDESCRIPTIONLINE2"}]')}}]);