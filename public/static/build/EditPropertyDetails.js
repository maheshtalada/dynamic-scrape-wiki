(window.webpackJsonp=window.webpackJsonp||[]).push([[42],{GEYT:function(e,t){var i="complete",n="canceled";function setElementScroll(e,t,i){e.self===e?e.scrollTo(t,i):(e.scrollLeft=t,e.scrollTop=i)}function animate(e){var t=e._scrollSettings;if(t){var n=t.maxSynchronousAlignments,a=function getTargetScrollLocation(e,t){var i,n,a,r,o,s,l,c=e.align,d=e.target.getBoundingClientRect(),h=c&&null!=c.left?c.left:.5,u=c&&null!=c.top?c.top:.5,p=c&&null!=c.leftOffset?c.leftOffset:0,m=c&&null!=c.topOffset?c.topOffset:0,f=h,v=u;if(e.isWindow(t))s=Math.min(d.width,t.innerWidth),l=Math.min(d.height,t.innerHeight),n=d.left+t.pageXOffset-t.innerWidth*f+s*f,a=d.top+t.pageYOffset-t.innerHeight*v+l*v,a-=m,r=(n-=p)-t.pageXOffset,o=a-t.pageYOffset;else{s=d.width,l=d.height,i=t.getBoundingClientRect();var g=d.left-(i.left-t.scrollLeft),y=d.top-(i.top-t.scrollTop);n=g+s*f-t.clientWidth*f,a=y+l*v-t.clientHeight*v,n=Math.max(Math.min(n,t.scrollWidth-t.clientWidth),0),a=Math.max(Math.min(a,t.scrollHeight-t.clientHeight),0),a-=m,r=(n-=p)-t.scrollLeft,o=a-t.scrollTop}return{x:n,y:a,differenceX:r,differenceY:o}}(t,e),r=Date.now()-t.startTime,o=Math.min(1/t.time*r,1);if(t.endIterations>=n)return setElementScroll(e,a.x,a.y),e._scrollSettings=null,t.end(i);var s=1-t.ease(o);if(setElementScroll(e,a.x-a.differenceX*s,a.y-a.differenceY*s),r>=t.time)return t.endIterations++,animate(e);!function raf(e){if("requestAnimationFrame"in window)return window.requestAnimationFrame(e);setTimeout(e,16)}(animate.bind(null,e))}}function defaultIsWindow(e){return e.self===e}function transitionScrollTo(e,t,i,a){var r,o=!t._scrollSettings,s=t._scrollSettings,l=Date.now(),c={passive:!0};function end(e){t._scrollSettings=null,t.parentElement&&t.parentElement._scrollSettings&&t.parentElement._scrollSettings.end(e),a(e),r&&(t.removeEventListener("touchstart",r,c),t.removeEventListener("wheel",r,c))}s&&s.end(n);var d=i.maxSynchronousAlignments;null==d&&(d=3),t._scrollSettings={startTime:s?s.startTime:Date.now(),endIterations:0,target:e,time:i.time+(s?l-s.startTime:0),ease:i.ease,align:i.align,isWindow:i.isWindow||defaultIsWindow,maxSynchronousAlignments:d,end:end},"cancellable"in i&&!i.cancellable||(r=end.bind(null,n),t.addEventListener("touchstart",r,c),t.addEventListener("wheel",r,c)),o&&animate(t)}function defaultIsScrollable(e){return"pageXOffset"in e||(e.scrollHeight!==e.clientHeight||e.scrollWidth!==e.clientWidth)&&"hidden"!==getComputedStyle(e).overflow}function defaultValidTarget(){return!0}e.exports=function(e,t,n){if(e){"function"==typeof t&&(n=t,t=null),t||(t={}),t.time=isNaN(t.time)?1e3:t.time,t.ease=t.ease||function(e){return 1-Math.pow(1-e,e/2)};for(var a=e.parentElement,r=1,o=t.validTarget||defaultValidTarget,s=t.isScrollable;a;){if(o(a,r)&&(s?s(a,defaultIsScrollable):defaultIsScrollable(a))&&(r++,transitionScrollTo(e,a,t,done)),!(a=a.parentElement)){done(i);break}"BODY"===a.tagName&&(a=(a=a.ownerDocument).defaultView||a.ownerWindow)}}function done(e){--r||n&&n(e)}}},WZLu:function(e,t,i){"use strict";i.d(t,"a",(function(){return o}));var n=i("gcR/"),a=i.n(n),r=i("MKeS"),o=Object(r.a)((function(){return Promise.all([i.e(0),i.e(1),i.e(2),i.e(3),i.e(83)]).then(i.bind(null,"pzZ4"))}),{LoadingComponent:a()("div",{},void 0,"Loading...")})},gDA4:function(e,t,i){"use strict";i.r(t);var n=i("gcR/"),a=i.n(n),r=i("lwsE"),o=i.n(r),s=i("W8MJ"),l=i.n(s),c=i("a1gu"),d=i.n(c),h=i("Nsbk"),u=i.n(h),p=i("7W2i"),m=i.n(p),f=i("q1tI"),v=i.n(f),g=i("17x9"),y=i.n(g),S=i("5IO/"),E=i("Vg22"),_=i("E+oP"),x=i.n(_),b=i("P/G1"),T=i.n(b),k=i("BkRI"),w=i.n(k),N=i("xweI"),C=i.n(N),P=i("zdiy"),O=i.n(P),I=i("WZLu"),W=i("GMTw"),L=i("9V8J"),D=i("GEYT"),V=i.n(D),M=i("zbfZ"),j=i("jKqO"),A=a()(W.a,{}),B=function(e){function EditProperty(e){var t;return o()(this,EditProperty),(t=d()(this,u()(EditProperty).call(this,e))).state={modifiedValues:{},initialValues:{},isFetching:!1,navigatingSaveExit:!1,errorCode:"",isError:!1},t}return m()(EditProperty,e),l()(EditProperty,[{key:"componentWillReceiveProps",value:function componentWillReceiveProps(e){var t=e.schema_get_property;if(this.setState({isFetching:t&&t.isFetching}),e.schema_save_property&&e.schema_save_property.isFetching?this.setState({isFetching:e.schema_save_property.isFetching}):e.schema_save_property&&e.schema_save_property.listingid&&this.handlePostOnline(e.schema_save_property),e.schema_save_property&&(e.schema_save_property.error||"error"===e.schema_save_property.status)){window.scrollTo(0,0);var i=e.schema_save_property.error.errors;this.setState({isError:!0,errorCode:function(e){return e.map((function(e){return a()("div",{style:{display:"block"}},void 0,e.field," ",e.code)}))}(i)})}}},{key:"handlePostOnline",value:function handlePostOnline(e){var t=this,i=this.state,n=i.goto,a=i.navigatingSaveExit;n&&"finish"===n?this.setState({isFetching:e.isFetching},(function(){a?t.context.router.push("/profile/listings"):t.context.router.push({pathname:e.listingurl})})):n&&"next"===n&&this.context.router.push({pathname:"/profile/financial/property-listing/".concat(e.listingid)})}},{key:"onSchemaChange",value:function onSchemaChange(e,t){var i=this.props.schema_get_property;this.setState({changeObject:e,hasErrors:t});var n=T()(i.schemas).length;if(!x()(this.refs))for(var a=0;a<n;++a)this.refs["schema_".concat(a)]&&this.refs["schema_".concat(a)].rebuild()}},{key:"renderSchema",value:function renderSchema(){var e=this,t=this.context,i=t.i18n,n=t.country,r=this.props.schema_get_property;if(x()(r))return null;var o=r.schemas,s=r.referenceData;r.schemaInfos;return C()(T()(o),(function(e){return e.order})).map((function(t,r){return a()("div",{id:"schema_".concat(r),className:"schema-container-wrapper schema-border"},void 0,v.a.createElement(I.a,{l:i.l,country:n,ref:"schema_".concat(r),data:t,writeMode:!0,updateonPropsChange:!0,onChange:e.onSchemaChange.bind(e),modifiedValues:e.state.modifiedValues,initialValues:e.state.initialValues,referenceData:s}))}))}},{key:"onSubmit",value:function onSubmit(e){for(var t=!0,i=T()(this.props.schema_get_property.schemas).length,n=[],a=0;a<i;++a)this.refs["schema_".concat(a)].checkSubmissionValid()||(n.push("schema_".concat(a)),t=!1);t?(this.setState({goto:e}),this.props.dispatch(Object(j.f)({payload:O()({},this.state.initialValues,this.state.modifiedValues)}))):V()(document.getElementById(n[0]))}},{key:"onBackClick",value:function onBackClick(){this.context.router.push({pathname:"/profile/listing/property-listing/".concat(this.props.params.id)})}},{key:"onNextClick",value:function onNextClick(){this.onSubmit("next")}},{key:"onConfirmClick",value:function onConfirmClick(){this.onSubmit("finish")}},{key:"onNavigateSaveExitClick",value:function onNavigateSaveExitClick(){this.onSubmit("finish"),this.setState({navigatingSaveExit:!0})}},{key:"render",value:function render(){var e=this.context.i18n.l,t=this.state,i=t.isFetching,n=t.errorCode,r=t.isError;return a()("div",{className:"schema-forms"},void 0,i&&!frameworkGlobals.isServer&&A,r&&a()(M.a,{l:e,errorCode:""},void 0,a()("div",{},void 0,n)),this.renderSchema(),!i&&a()("div",{className:"col-xs-12",style:{padding:0}},void 0,a()(L.a,{nextText:"NEXTTOADDITIONAL",backText:"BACKTOFINANCIAL",saveExitText:"POSTONLINE",className:"linear-navigation--light-theme",isSaveExitRequired:!0,onNext:this.onNextClick.bind(this),onBack:this.onBackClick.bind(this),onConfirm:this.onConfirmClick.bind(this),isNavigatingSaveExitRequired:!0,navigatingSaveExitText:"SAVEEXIT",onNavigateSaveExit:this.onNavigateSaveExitClick.bind(this)})))}}]),EditProperty}(f.Component);B.contextTypes={i18n:y.a.object,router:y.a.object,country:y.a.string};var F=Object(E.connect)((function mapStateToProps(e){return{schema_save_property:e.schema.schema_save_property}}))(B),R=i("oasI"),q=i("cTyv"),H=function(e){function EditPropertyDetailsPage(e){var t;o()(this,EditPropertyDetailsPage),t=d()(this,u()(EditPropertyDetailsPage).call(this,e));var i=w()(q.a);return i[2].activeStep=!0,t.state={navigationMap:i},t}return m()(EditPropertyDetailsPage,e),l()(EditPropertyDetailsPage,[{key:"render",value:function render(){var e=this.context.i18n.l,t=this.state.navigationMap;return a()("div",{className:"profile-page__layout__profile-section"},void 0,a()("div",{className:"schema-listing-page listing-property-page flex-layout"},void 0,a()("div",{className:"row"},void 0,a()("div",{className:"col-xs-12"},void 0,a()(R.a,{steps:t,currentStep:t[2],keyName:"{listingid}",keyValue:this.props.params.id||"",title:"Listing & Property set-up"}))),a()("div",{className:""},void 0,a()("div",{className:""},void 0,a()("div",{className:""},void 0,a()("div",{className:"schema-border","data-automation-selector":"ssj-section-header-content"},void 0,a()("h2",{className:"subheader-heading","data-automation-selector":"ssj-section-title"},void 0,e("PROPERTYINFOSCHEMATITLE"))),v.a.createElement(F,this.props))))))}}]),EditPropertyDetailsPage}(f.Component);H.contextTypes={i18n:y.a.object};t.default=Object(E.connect)((function mapStateToProps(e){return{schema_get_property:e.schema.schema_get_property}}))(Object(S.a)(H,[j.n],!0))},qbnB:function(e,t,i){var n=i("juv8"),a=i("LsHQ"),r=i("mTTR"),o=a((function(e,t){n(t,r(t),e)}));e.exports=o},zbfZ:function(e,t,i){"use strict";var n=i("gcR/"),a=i.n(n),r=(i("q1tI"),i("TSYQ")),o=i.n(r);t.a=function ErrorBox(e){var t=e.errorCode,i=e.l,n=e.classNames,r=e.children,s=void 0===r?null:r;return a()("div",{className:o()("error-box",n)},void 0,i(t),s)}},zdiy:function(e,t,i){e.exports=i("qbnB")}}]);