(window.webpackJsonp=window.webpackJsonp||[]).push([[46],{"5hM0":function(e,t){function dataURItoBlob(e){for(var t=atob(e.split(",")[1]),n=e.split(",")[0].split(":")[1].split(";")[0],s=new ArrayBuffer(t.length),a=new DataView(s),i=0;i<t.length;i++)a.setUint8(i,t.charCodeAt(i));return new Blob([s],{type:n})}e.exports={getDataTransferFiles:function getDataTransferFiles(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=[];if(e.dataTransfer){var s=e.dataTransfer;s.files&&s.files.length?n=s.files:s.items&&s.items.length&&(n=s.items)}else e.target&&e.target.files&&(n=e.target.files);return n.length>0&&(n=t?n:[n[0]]),Array.prototype.slice.call(n)},resizeImage:function resizeImage(e){if(!e.isCompress)return e.file;var t=e.file,n=e.quality,s=new FileReader,a=new Image,i=document.createElement("canvas");return new Promise((function(r,o){t.type.match(/image.*/)?(s.onload=function(t){a.onload=function(){return r(function resize(t){var s=a.width,r=a.height,o=i.getContext("2d");if(s>t){for(i.width=s,i.height=r,o.drawImage(a,0,0);.5*i.width>t;)i.width*=.5,i.height*=.5,o.drawImage(i,0,0,i.width,i.height);i.width=t,i.height=i.width*a.height/a.width,o.drawImage(a,0,0,i.width,i.height)}else i.width=s,i.height=r,o.drawImage(a,0,0,i.width,i.height);return dataURItoBlob(i.toDataURL(e.file.type,n/100))}(e.maxWidth))},a.src=t.target.result},s.readAsDataURL(t)):o(new Error("Not an image"))}))},dataURItoBlob:dataURItoBlob}},"78R6":function(e,t,n){"use strict";var s=n("gcR/"),a=n.n(s),i=n("lSNA"),r=n.n(i),o=n("lwsE"),l=n.n(o),u=n("W8MJ"),d=n.n(u),c=n("a1gu"),p=n.n(c),g=n("Nsbk"),h=n.n(g),f=n("PJYZ"),m=n.n(f),v=n("7W2i"),b=n.n(v),y=n("q1tI"),S=n.n(y),k=n("17x9"),w=n.n(k),E=n("Y+p1"),C=n.n(E),I=(n("k82f"),function(e){function Suggestions(){return l()(this,Suggestions),p()(this,h()(Suggestions).apply(this,arguments))}return b()(Suggestions,e),d()(Suggestions,[{key:"shouldComponentUpdate",value:function shouldComponentUpdate(e){var t=this.props,n=t.shouldRenderSuggestions||this.shouldRenderSuggestions;return!C()(t.suggestions,e.suggestions,e.defaultShowSuggestions)||n(e.query,e.minQueryLength,e.defaultShowSuggestions)||n(e.query,e.minQueryLength,e.defaultShowSuggestions)!=n(t.query,t.minQueryLength,t.defaultShowSuggestions)}},{key:"componentDidUpdate",value:function componentDidUpdate(e){var t=this.refs.suggestionsContainer,n=this.props,s=n.selectedIndex;n.classNames;if(t&&e.selectedIndex!==s){var a=t.querySelector("pills-suggestions__suggestions__activeSuggestion");a&&function maybeScrollSuggestionIntoView(e,t){var n=t.offsetHeight,s=e.offsetHeight,a=e.offsetTop-t.scrollTop;a+s>=n?t.scrollTop+=a-n+s:a<0&&(t.scrollTop+=a)}(a,t)}}},{key:"markIt",value:function markIt(e,t){var n=t.trim().replace(/[-\\^$*+?.()|[\]{}]/g,"\\$&");return{__html:e.replace(RegExp(n,"gi"),"<mark>$&</mark>")}}},{key:"shouldRenderSuggestions",value:function shouldRenderSuggestions(e,t,n){return e.length>=t||n}},{key:"renderSuggestions",value:function renderSuggestions(){var e=this,t=this.props,n=t.suggestions,s=t.handleClick,i=t.handleHover,r=t.selectedIndex,o=(t.classNames,t.query);return n.map((function(t,n){return a()("li",{onMouseDown:function onMouseDown(e){return s(e,n)},onMouseOver:function onMouseOver(e){return i(e,n)},className:n==r?"pills-suggestions__suggestions__activeSuggestion":""},n,a()("span",{dangerouslySetInnerHTML:e.markIt(t,o)}))}))}},{key:"render",value:function render(){return this.shouldRenderSuggestions(this.props.query,this.props.minQueryLength,this.props.defaultShowSuggestions)?S.a.createElement("div",{ref:"suggestionsContainer",className:"pills-suggestions__suggestions"},a()("ul",{},void 0," ",this.renderSuggestions()," ")):null}}]),Suggestions}(y.Component));function ownKeys(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,s)}return n}function _objectSpread(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(n,!0).forEach((function(t){r()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ownKeys(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}I.defaultProps={minQueryLength:2,defaultShowSuggestions:!1},n.d(t,"a",(function(){return F}));var x=13,P=9,q=8,R=38,D=40,_=27,N={tags:"pills-suggestions__tags",tagInput:"pills-suggestions__tagInput",tagInputField:"pills-suggestions__pill-input-field",selected:"ReactTags__selected",tag:"ReactTags__tag",remove:"ReactTags__remove",suggestions:"ReactTags__suggestions",activeSuggestion:"ReactTags__activeSuggestion"},L=a()("i",{className:"pe-7s-plus"}),F=function(e){function PillsSuggestions(e){var t;return l()(this,PillsSuggestions),(t=p()(this,h()(PillsSuggestions).call(this,e))).state={suggestions:t.props.suggestions,query:"",selectedIndex:-1,selectionMode:!1,showDefaultSuggestions:!1},t.handleBlur=t.handleBlur.bind(m()(t)),t.handleFocus=t.handleFocus.bind(m()(t)),t.handleKeyDown=t.handleKeyDown.bind(m()(t)),t.handleChange=t.handleChange.bind(m()(t)),t.handlePaste=t.handlePaste.bind(m()(t)),t.resetAndFocusInput=t.resetAndFocusInput.bind(m()(t)),t.handleSuggestionHover=t.handleSuggestionHover.bind(m()(t)),t.handleSuggestionClick=t.handleSuggestionClick.bind(m()(t)),t}return b()(PillsSuggestions,e),d()(PillsSuggestions,[{key:"componentWillMount",value:function componentWillMount(){this.setState({classNames:_objectSpread({},N,{},this.props.classNames)})}},{key:"resetAndFocusInput",value:function resetAndFocusInput(){this.textInput.value="",this.textInput.focus()}},{key:"componentDidMount",value:function componentDidMount(){var e=this.props,t=e.autofocus,n=e.updateInputValue,s=e.defaultInputValue;t&&!n&&this.resetAndFocusInput(),n&&(this.textInput.value=s)}},{key:"filteredSuggestions",value:function filteredSuggestions(e,t){return this.props.handleFilterSuggestions?this.props.handleFilterSuggestions(e,t):t.filter((function(t){return 0===t.toLowerCase().indexOf(e.toLowerCase())}))}},{key:"componentWillReceiveProps",value:function componentWillReceiveProps(e){var t=this.filteredSuggestions(this.state.query,e.suggestions);this.setState({showDefaultSuggestions:!1,suggestions:t,classNames:_objectSpread({},N,{},e.classNames)})}},{key:"handleDelete",value:function handleDelete(e,t){this.props.handleDelete&&this.props.handleDelete(e),this.setState({query:""}),this.resetAndFocusInput()}},{key:"handleChange",value:function handleChange(e){this.props.handleInputChange&&this.props.handleInputChange(e.target.value.trim());var t=e.target.value.trim(),n=this.filteredSuggestions(t,this.props.suggestions);this.setState({query:t,suggestions:n,showAddPill:t.length>0,selectedIndex:0})}},{key:"handleBlur",value:function handleBlur(e){var t=e.target.value.trim();this.props.handleInputBlur&&(this.props.handleInputBlur(t),this.textInput.value=""),this.setState({query:"",suggestions:[],selectedIndex:-1})}},{key:"handleFocus",value:function handleFocus(e){if(this.props.showOnFocus){var t=e.target.value.trim(),n=this.props.suggestions;this.setState({query:t,suggestions:n,selectedIndex:0,selectionMode:!0,showDefaultSuggestions:this.props.showOnFocus})}}},{key:"handleKeyDown",value:function handleKeyDown(e){var t=this.state,n=t.query,s=(t.selectedIndex,t.suggestions);if(e.keyCode===_&&(e.preventDefault(),e.stopPropagation(),this.setState({selectedIndex:-1,selectionMode:!1,suggestions:[]})),-1===this.props.delimiters.indexOf(e.keyCode)||e.shiftKey||((e.keyCode!==P||!this.props.showOnFocus&&""!==n)&&e.preventDefault(),(this.props.showOnFocus||""!==n)&&(this.state.selectionMode&&-1!=this.state.selectedIndex&&(n=this.state.suggestions[this.state.selectedIndex]),this.addPill(n))),e.keyCode===q&&""==n&&this.props.allowDeleteFromEmptyInput&&this.handleDelete(this.props.pills.length-1),e.keyCode===R){e.preventDefault();var a=this.state,i=a.selectedIndex;a.suggestions;i=i<=0?0:i-1,this.setState({selectedIndex:i,selectionMode:!0})}e.keyCode===D&&(console.log("down"),e.preventDefault(),this.setState({selectedIndex:(this.state.selectedIndex+1)%s.length,selectionMode:!0}))}},{key:"handlePaste",value:function handlePaste(e){var t=this;e.preventDefault();var n=function escapeRegex(e){return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")}(this.props.delimiters.map((function(e){var t=e-48*Math.floor(e/48);return String.fromCharCode(96<=e?t:e)})).join("")),s=(e.clipboardData||window.clipboardData).getData("text"),a=new RegExp("[".concat(n,"]+"));s.split(a).forEach((function(e){return t.props.handleAddition(e)}))}},{key:"addPill",value:function addPill(e,t){if(this.props.autocomplete){var n=this.filteredSuggestions(e,this.props.suggestions);(1===this.props.autocomplete&&1===n.length||!0===this.props.autocomplete&&n.length)&&(e=n[0])}this.props.handleAddition(e,t),this.setState({query:"",selectionMode:!1,selectedIndex:-1,showAddPill:!1}),this.props.updateInputValue?this.textInput.value=e:this.resetAndFocusInput()}},{key:"handleSuggestionClick",value:function handleSuggestionClick(e,t){this.addPill(this.state.suggestions[t],t)}},{key:"handleSuggestionHover",value:function handleSuggestionHover(e,t){this.setState({selectedIndex:e,selectionMode:!0})}},{key:"renderPills",value:function renderPills(){var e=this,t=this.props,n=t.pills,s=t.isFullPill;return n.map((function(t,n){return e.props.renderPill(n,t,s)}))}},{key:"render",value:function render(){var e=this,t=this.state,n=t.query,s=t.selectedIndex,i=t.suggestions,r=t.showAddPill,o=this.props,l=o.placeholder,u=o.maxLength,d=o.isAddNewPill,c=o.errorClass,p=o.translator;return a()("div",{className:"pills-suggestions".concat(c?" error":"")},void 0,a()("div",{className:"pills-suggestions__suggestions-wrapper"},void 0,a()("div",{className:"pills-suggestions__input-wrapper"},void 0,S.a.createElement("input",{ref:function ref(t){e.textInput=t},className:this.state.classNames.tagInputField,type:"text",placeholder:l,"aria-label":l,onBlur:this.handleBlur,onChange:this.handleChange,onKeyDown:this.handleKeyDown,onPaste:d&&this.handlePaste,onFocus:this.handleFocus,name:this.props.name,id:this.props.id,maxLength:u}),d&&r&&a()("button",{className:"btn btn-default pill-add-btn",onClick:function onClick(){e.addPill(e.textInput.value)}},void 0,L,p("ADD"))),a()("div",{className:"pills-suggestions__pills-wrapper"},void 0,this.renderPills()),a()(I,{query:n.trim(),suggestions:i,selectedIndex:s,handleClick:this.handleSuggestionClick,handleHover:this.handleSuggestionHover,minQueryLength:this.props.minQueryLength,defaultShowSuggestions:this.state.showDefaultSuggestions,shouldRenderSuggestions:this.props.shouldRenderSuggestions,classNames:this.state.classNames})))}}]),PillsSuggestions}(y.Component);F.PropTypes={isAddNewPill:w.a.bool,isFullPill:w.a.bool,errorClass:w.a.string,placeholder:w.a.string,suggestions:w.a.array,delimiters:w.a.array,autofocus:w.a.bool,handleDelete:w.a.func.isRequired,handleAddition:w.a.func.isRequired,handleFilterSuggestions:w.a.func,allowDeleteFromEmptyInput:w.a.bool,handleInputChange:w.a.func,handleInputBlur:w.a.func,minQueryLength:w.a.number,shouldRenderSuggestions:w.a.func,removeComponent:w.a.func,autocomplete:w.a.oneOfType([w.a.bool,w.a.number]),name:w.a.string,id:w.a.string,maxLength:w.a.string,showOnFocus:w.a.bool,pills:w.a.object.isRequired,classNames:w.a.object,renderPill:w.a.func.isRequired,renderPills:w.a.func.isRequired,updateInputValue:w.a.bool},F.defaultProps={isAddNewPill:!0,isFullPill:!1,errorClass:null,placeholder:"Add new tag",pills:[],suggestions:[],delimiters:[x,P],autofocus:!1,showOnFocus:!0,inline:!0,allowDeleteFromEmptyInput:!0,minQueryLength:2,autocomplete:!1,labelField:"text",renderPill:function renderPill(){},renderPills:function renderPills(){},updateInputValue:!1}},"J+aZ":function(e,t,n){"use strict";n.d(t,"a",(function(){return I}));var s=n("gcR/"),a=n.n(s),i=n("pVnL"),r=n.n(i),o=n("QILm"),l=n.n(o),u=n("lwsE"),d=n.n(u),c=n("W8MJ"),p=n.n(c),g=n("a1gu"),h=n.n(g),f=n("Nsbk"),m=n.n(f),v=n("PJYZ"),b=n.n(v),y=n("7W2i"),S=n.n(y),k=n("q1tI"),w=n.n(k),E=(n("17x9"),n("TSYQ")),C=n.n(E),I=function(e){function Button(e){var t;return d()(this,Button),(t=h()(this,m()(Button).call(this,e))).state={},t.handleClick=t.handleClick.bind(b()(t)),t}return S()(Button,e),p()(Button,[{key:"handleClick",value:function handleClick(){this.props.onClick()}},{key:"render",value:function render(){var e=this.props,t=e.btnText,n=e.className,s=e.btnClassName,i=l()(e,["btnText","className","btnClassName"]);return a()("div",{className:C()("input-field",n)},void 0,w.a.createElement("button",r()({className:C()("btn",s),onClick:this.handleClick},i),this.props.children?this.props.children:t))}}]),Button}(k.Component);I.defaultProps={onClick:function onClick(){},btnText:"Button",className:"",btnClassName:"btn-primary"}},j21j:function(e,t,n){"use strict";var s=n("o0o1"),a=n.n(s),i=n("yXPU"),r=n.n(i),o=n("lwsE"),l=n.n(o),u=n("a1gu"),d=n.n(u),c=n("Nsbk"),p=n.n(c),g=n("7W2i"),h=n.n(g),f=n("N7uj"),m=function(e){function DocumentsService(){var e,t;l()(this,DocumentsService);for(var n=arguments.length,s=new Array(n),i=0;i<n;i++)s[i]=arguments[i];return(t=d()(this,(e=p()(DocumentsService)).call.apply(e,[this].concat(s)))).GetListingMedia=function(){var e=r()(a.a.mark((function _callee(e){var n;return a.a.wrap((function _callee$(s){for(;;)switch(s.prev=s.next){case 0:return n=Object.assign({},f.a.defaultConfig,{endpoint:"getlistingmedia",method:"get",paramsPayload:e}),s.next=3,t.fetchData(n);case 3:return s.abrupt("return",s.sent);case 4:case"end":return s.stop()}}),_callee)})));return function(t){return e.apply(this,arguments)}}(),t}return h()(DocumentsService,e),DocumentsService}(f.a);t.a=new m},nTlw:function(e,t,n){"use strict";n.r(t);var s=n("gcR/"),a=n.n(s),i=n("o0o1"),r=n.n(i),o=n("yXPU"),l=n.n(o),u=n("lwsE"),d=n.n(u),c=n("W8MJ"),p=n.n(c),g=n("a1gu"),h=n.n(g),f=n("Nsbk"),m=n.n(f),v=n("PJYZ"),b=n.n(v),y=n("7W2i"),S=n.n(y),k=n("q1tI"),w=n.n(k),E=n("17x9"),C=n.n(E),I=n("5hM0"),x=n("j21j"),P={quality:60,maxWidth:600,isCompress:!0},q=function(){var e=l()(r.a.mark((function _callee(e,t){var n,s,a,i;return r.a.wrap((function _callee$(r){for(;;)switch(r.prev=r.next){case 0:return t=Object.assign(P,t),r.next=3,Object(I.resizeImage)({file:e,quality:t.quality,maxWidth:t.maxWidth,isCompress:t.isCompress});case 3:return n=r.sent,(s=new FormData).append("file",n),s.append("directory",t.directory),s.append("thumbnail",t.thumbnail),s.append("userid",t.userid),a={endpoint:"mediaupload",method:"post",dataPayload:s},r.prev=10,r.next=13,x.a.fetchData(a);case 13:return i=r.sent,r.abrupt("return",Promise.resolve(i));case 17:return r.prev=17,r.t0=r.catch(10),r.abrupt("return",Promise.reject(r.t0));case 20:case"end":return r.stop()}}),_callee,null,[[10,17]])})));return function UploadImageToS3(t,n){return e.apply(this,arguments)}}(),R=n("J2m7"),D=n.n(R),_=n("aNkp"),N=n("r39Y"),L=n("MKeS"),F=n("GMTw");n.d(t,"default",(function(){return M}));var A=Object(L.a)((function(){return Promise.all([n.e(23),n.e(18),n.e(119)]).then(n.t.bind(null,"rmP6",7))}),{LoadingComponent:F.a}),T=N.default.imageRootPath,O=["jpg","jpeg","png"],j=a()(_.a,{}),M=function(e){function TextEditor(e){var t;return d()(this,TextEditor),(t=h()(this,m()(TextEditor).call(this,e))).imgHandler=function(){var e=l()(r.a.mark((function _callee2(e){var n,s,a,i,o;return r.a.wrap((function _callee2$(e){for(;;)switch(e.prev=e.next){case 0:n=t.quillRef.getEditor(),s=n.container,a=s.querySelector("input.ql-image[type=file]"),i=s.querySelector(".ql-image-loader"),o=t.context.i18n.l,null===a&&((a=document.createElement("input")).setAttribute("type","file"),a.setAttribute("accept","image/png, image/gif, image/jpeg, image/bmp, image/x-icon"),a.setAttribute("style","display: none;"),a.classList.add("ql-image"),a.addEventListener("change",l()(r.a.mark((function _callee(){var e,n;return r.a.wrap((function _callee$(r){for(;;)switch(r.prev=r.next){case 0:if(null==a.files||null==a.files[0]){r.next=16;break}return r.prev=1,i&&i.classList.remove("hide"),r.next=5,q(a.files[0],t.props.imageServerPayload);case 5:e=r.sent,n=t.quillRef.getEditor().getSelection(),t.quillRef.getEditor().insertEmbed(n.index,"image","".concat(T,"/").concat(e.data.filepath),"user"),a.value="",s.removeChild(a),i&&i.classList.add("hide"),r.next=16;break;case 13:throw r.prev=13,r.t0=r.catch(1),new Error("things went wrong while uploading",r.t0);case 16:case"end":return r.stop()}}),_callee,null,[[1,13]])})))),s.appendChild(a),i&&(i.querySelector(".ql-image-loader__content").innerHTML=o("UPLOADING"))),a.click();case 6:case"end":return e.stop()}}),_callee2)})));return function(t){return e.apply(this,arguments)}}(),t.handleDrop=function(){var e=l()(r.a.mark((function _callee3(e){var n,s,a,i,o,l,u,d;return r.a.wrap((function _callee3$(r){for(;;)switch(r.prev=r.next){case 0:if(e.preventDefault(),n=t.quillRef.getEditor(),s=n.container,a=t.context.i18n.l,i=e.dataTransfer&&e.dataTransfer.files&&e.dataTransfer.files[0],o=i&&i.name&&i.name.split(".").pop(),!(O.indexOf(o)<0)){r.next=7;break}return r.abrupt("return");case 7:return(l=s.querySelector(".ql-image-loader"))&&(l.querySelector(".ql-image-loader__content").innerHTML=a("UPLOADING")),r.prev=9,l&&l.classList.remove("hide"),r.next=13,q(i,t.props.imageServerPayload);case 13:u=r.sent,d=t.quillRef.getEditor().getLength()-1,t.quillRef.getEditor().insertEmbed(d,"image","".concat(T,"/").concat(u.data.filepath),"user"),l&&l.classList.add("hide"),r.next=23;break;case 19:throw r.prev=19,r.t0=r.catch(9),l&&l.classList.add("hide"),new Error("things went wrong while uploading",r.t0);case 23:case"end":return r.stop()}}),_callee3,null,[[9,19]])})));return function(t){return e.apply(this,arguments)}}(),t.handlePaste=function(){var e=l()(r.a.mark((function _callee4(e){var n,s,a,i,o,l,u,d,c,p,g,h;return r.a.wrap((function _callee4$(r){for(;;)switch(r.prev=r.next){case 0:if(n=t.quillRef.getEditor(),s=n.container,a=t.context.i18n.l,(i=s.querySelector(".ql-image-loader"))&&(i.querySelector(".ql-image-loader__content").innerHTML=a("UPLOADING")),e.clipboardData&&e.clipboardData.items&&e.clipboardData.items.length){r.next=6;break}return r.abrupt("return");case 6:if(o=Array.from(e.clipboardData.items),l=D()(o,{kind:"file"})){r.next=10;break}return r.abrupt("return");case 10:if(u=l.getAsFile(),d=u&&u.name&&u.name.split(".").pop(),!(O.indexOf(d)<0)){r.next=14;break}return r.abrupt("return");case 14:return r.prev=14,i&&i.classList.remove("hide"),r.next=18,q(u,t.props.imageServerPayload);case 18:c=r.sent,p=t.quillRef.getEditor().getSelection(),g=t.quillRef.getEditor().getLength()-1,h=p?p.index:g,t.quillRef.getEditor().insertEmbed(h,"image","".concat(T,"/").concat(c.data.filepath),"user"),i&&i.classList.add("hide"),r.next=30;break;case 26:throw r.prev=26,r.t0=r.catch(14),i&&i.classList.add("hide"),new Error("things went wrong while uploading",r.t0);case 30:case"end":return r.stop()}}),_callee4,null,[[14,26]])})));return function(t){return e.apply(this,arguments)}}(),t.state={hasErrors:!1,forceValidation:!1,modifiedValues:{},initialValues:{},text:e.value},t.quillRef=void 0,t.modules={toolbar:{container:e.editorOptions,handlers:{image:t.imgHandler}}},t.formats=e.editorFormats,t.handleDrop=t.handleDrop.bind(b()(t)),t.handlePaste=t.handlePaste.bind(b()(t)),t}return S()(TextEditor,e),p()(TextEditor,[{key:"componentWillReceiveProps",value:function componentWillReceiveProps(e){this.setState({text:e.value})}},{key:"componentDidMount",value:function componentDidMount(){this.quillRef&&this.quillRef.getEditor().focus()}},{key:"renderQuill",value:function renderQuill(){var e=this;return frameworkGlobals.isServer?j:w.a.createElement(A,{ref:function ref(t){return e.onEditorLoad(t)},value:this.state.text,onChange:this.handleChange.bind(this),theme:"snow",modules:this.modules,formats:this.formats,placeholder:this.props.placeholder})}},{key:"render",value:function render(){return a()("div",{className:"text-editor"},void 0,this.renderQuill())}},{key:"handleChange",value:function handleChange(e){this.setState({text:e}),this.props.onChange&&this.props.onChange(e)}},{key:"onEditorLoad",value:function onEditorLoad(e){this.quillRef=e;var t=document.createElement("div");if(t.classList.add("ql-image-loader","hide"),t.innerHTML='<span class="ql-image-loader__content">""</span>',this.quillRef){var n=this.quillRef.getEditor().container;this.quillRef.getEditor().root.addEventListener("drop",this.handleDrop,!1),this.quillRef.getEditor().root.addEventListener("paste",this.handlePaste,!1),n.appendChild(t),this.quillRef.getEditor().root.dataset.placeholder=this.props.placeholder}}},{key:"insert",value:function insert(e){var t=(this.quillRef.getEditor().getSelection()||{}).index||this.quillRef.getEditor().getLength();this.quillRef.getEditor().insertEmbed(t,"image",e,"user")}},{key:"readFiles",value:function readFiles(e,t){[].forEach.call(e,(function(e){if(e.type.match(/^image\/(gif|jpe?g|a?png|svg|webp|bmp|vnd\.microsoft\.icon)/i)){var n=new FileReader;n.onload=function(e){t(e.target.result)};var s=e.getAsFile?e.getAsFile():e;s instanceof Blob&&n.readAsDataURL(s)}}))}}]),TextEditor}(k.Component);M.defaultProps={placeholder:"STARTTYPEHERE",onChange:function onChange(){},imageServerPayload:void 0,value:"",editorOptions:[[{header:[1,2,!1]}],["bold","italic","underline","strike","blockquote"],[{list:"ordered"},{list:"bullet"},{indent:"-1"},{indent:"+1"}],["link","image","video"],["clean"]],editorFormats:["header","bold","italic","underline","strike","blockquote","list","bullet","indent","link","image","video"]},M.contextTypes={i18n:C.a.object}},rNZM:function(e,t,n){"use strict";n.r(t);var s=n("o0o1"),a=n.n(s),i=n("yXPU"),r=n.n(i),o=n("lwsE"),l=n.n(o),u=n("W8MJ"),d=n.n(u),c=n("a1gu"),p=n.n(c),g=n("Nsbk"),h=n.n(g),f=n("PJYZ"),m=n.n(f),v=n("7W2i"),b=n.n(v),y=n("gcR/"),S=n.n(y),k=n("q1tI"),w=n("17x9"),E=n.n(w),C=n("WwWA"),I=n.n(C),x=n("78R6"),P=n("TTUQ"),q=n("J+aZ"),R=n("vDqi"),D=n.n(R),_=n("BezJ"),N=n.n(_),L=n("TSYQ"),F=n.n(L),expand_indicator=function(e){var t=e.className,n=e.onClick,s=e.titleText,a=void 0===s?"":s,i=e.direction,r=void 0===i?"left":i;return S()("div",{title:a,className:F()("expand-indicator flex flex-align-center",t,n?"cursor":""),onClick:n},void 0,S()("i",{className:"expand-indicator__icon pe-7s-arrowhead-".concat(r)}))},A=n("MKeS"),T=n("ZGPb").default.areasServed;var O=n("J2m7"),j=n.n(O),M=n("r39Y");n.d(t,"default",(function(){return K}));var U=M.default.api,B=M.default.endpoints,W=M.default.cookies,H=Object(A.a)((function(){return Promise.resolve().then(n.bind(null,"nTlw"))}),{ErrorComponent:function ErrorDisplay(e){var t=e.error;return S()("div",{},void 0,"Oups! ",t.message)}}),Y="".concat(U.protocol,"://").concat(U.host,":").concat(U.port).concat(U.prefix).concat(B.sendfeedback),V=[[{header:[1,2,!1]}],["bold","italic","underline","strike","blockquote"],[{list:"ordered"},{list:"bullet"},{indent:"-1"},{indent:"+1"}],["link","image"]],Q=["header","bold","italic","underline","strike","blockquote","list","bullet","indent","link","image"],J=[{label:"REPORTANISSUE",placeholder:"REPORTISSUEPLACEHOLDER"},{label:"REPORTINACCURACYESTIMATIONS",placeholder:"REPORTISSUEPLACEHOLDER"},{label:"PROVIDEFEEDBACK"},{label:"NEEDBUYINGASSISTANCE"},{label:"NEEDINVESTMENTADVICE"},{label:"NEEDLOAN"},{label:"NEEDINSURANCE"},{label:"NEEDLEGALADVICE"},{label:"ADVERTISEWITHUS",template:function advertiseWithUs(){return'<p>1) Your name</p>\n        <p>2) Company</p>\n        <p>3) Contact number</p>\n        <p>4) Nature of advertisement</p>\n        <p>5) Content</p>\n        <p class="ql-indent-1">&lt;attach your content here in jpeg/png format - 300 x 300 size&gt;</p>\n        <p>6) Markets (remove ones that do not apply)</p>\n        '.concat(T.map((function(e){return'<p class="ql-indent-1">'.concat(e.mlsAreaName,"</p>")})).join(" "),'\n        <p>7) Any other Information</p>\n        <p class="ql-indent-1">&lt;Describe&gt;</p>')}},{label:"BECOMEPREFERREDREALTOR",template:function becomePreferredVendor(){return'<p>1) Registered Email ID</p>\n        <p class="ql-indent-1">&lt;Provide the email ID used while registering in our site&gt;</p>\n        <p>2) Profile updated - Yes / No</p>\n        <p class="ql-indent-1">&lt;Is your photo, summary and other information updated in our site&gt;</p>\n        <p>3) Are you a real estate investor? - Yes / No</p>\n        <p>4) Are you a Property Manager? - Yes / No</p>\n        <p>5) Areas of Expertise (remove ones that do not apply)</p>\n        <p class="ql-indent-1">Pre purchase due diligence</p>\n        <p class="ql-indent-1">Offer placement &amp; Negotiation</p>\n        <p class="ql-indent-1">Getting a loan</p>\n        <p class="ql-indent-1">Closing</p>\n        <p class="ql-indent-1">Getting an insurance policy</p>\n        <p class="ql-indent-1">Pre lease fix up</p>\n        <p class="ql-indent-1">Leasing</p>\n        <p class="ql-indent-1">Property management</p>\n        <p>6) How many years experience do you have working with out of state and local investors?</p>\n        <p class="ql-indent-1">&lt;Please describe your investment experience&gt;</p>'}},{label:"REQUESTCOMPANYUPDATE",template:function companyUpdates(){return'<p>Please provide us with the following information:</p>\n        <p>1) Logo attached - Yes / No</p>\n        <p class="ql-indent-1">&lt;attach your logo here in jpeg/png format - 300 x 300 size&gt;</p>\n        <p>2) About</p>\n        <p class="ql-indent-1">&nbsp;&lt;Summary about your company in 5000 characters&gt;</p>\n        <p>3) Links</p>\n        <p class="ql-indent-1">Website URL: &lt;Your Link Here&gt;</p>\n        <p class="ql-indent-1">Facebook URL: &lt;Your Link Here&gt;</p>\n        <p class="ql-indent-1">Twitter URL: &lt;Your Link Here&gt;</p>\n        <p>4) Specialties (remove ones that do not apply)</p>\n        <p class="ql-indent-1">Residential Investments</p>\n        <p class="ql-indent-1">Commercial Properties</p>\n        <p class="ql-indent-1">Income Specialist</p>\n        <p class="ql-indent-1">Residential Lending</p>\n        <p class="ql-indent-1">Commercial Lending</p>\n        <p class="ql-indent-1">Industrial</p>\n        <p class="ql-indent-1">Farm and Land</p>\n        <p class="ql-indent-1">Appraisal</p>\n        <p class="ql-indent-1">Property Management</p>\n        <p class="ql-indent-1">Land Development</p>\n        <p class="ql-indent-1">Urban Planning</p>\n        <p class="ql-indent-1">Legal</p>\n        <p class="ql-indent-1">Research</p>\n        <p class="ql-indent-1">Back Office Specialist</p>'}}],K=function(e){function FeedbackBox(e,t){var n;l()(this,FeedbackBox),n=p()(this,h()(FeedbackBox).call(this,e));var s=t.i18n.l;n.suggestionsConfig=J.map((function(e){return{suggestion:s(e.label),template:e.template?e.template():"",placeholder:e.placeholder}}));var a=j()(n.suggestionsConfig,{suggestion:s(e.defaultSubject)});return n.state={username:N.a.load("anonymousUserEmailId")||"",content:a?a.template:"",placeholder:a?a.placeholder:"",usernameError:!1,subject:e.defaultSubject,title:e.title,listingId:e.listingId,brokerageFirmId:e.brokerageFirmId},n.onClickSend=n.onClickSend.bind(m()(n)),n.onChangeUsername=n.onChangeUsername.bind(m()(n)),n.onChangeContent=n.onChangeContent.bind(m()(n)),n.onChangeSubject=n.onChangeSubject.bind(m()(n)),n}return b()(FeedbackBox,e),d()(FeedbackBox,[{key:"componentWillReceiveProps",value:function componentWillReceiveProps(e){this.setState({subject:e.defaultSubject,title:e.title,listingId:e.listingId,brokerageFirmId:e.brokerageFirmId})}},{key:"onChangeUsername",value:function onChangeUsername(e){var t=!1;0===e.target.value.length&&(t=!0),this.setState({username:e.target.value,usernameError:t})}},{key:"onChangeContent",value:function onChangeContent(e){this.setState({content:e})}},{key:"onClickSend",value:function onClickSend(){var e=this.state.username;this.props.user.user.isLogIn||e?this.sendFeedback():this.setState({usernameError:!0})}},{key:"onChangeSubject",value:function onChangeSubject(e){var t=j()(this.suggestionsConfig,{suggestion:e});this.setState({subject:e,content:t?t.template:this.state.content,placeholder:t?t.placeholder:""})}},{key:"render",value:function render(){var e=this,t=this.context,n=t.i18n.l,s=t.screenSize,a=this.props,i=a.minimized,r=a.user,o=a.defaultSubject,l=a.title,u=r.user.id||"",d=this.state,c=d.usernameError,p=d.content,g=d.username,h=d.placeholder,f=u?"".concat(u,"/siteFeedback"):"siteFeedback";return S()(I.a,{className:"site-feedback__feedback-box ".concat(i?"minimized":""),enable:{top:!1,right:!1,bottom:!1,left:!0,topRight:!1,bottomRight:!1,bottomLeft:!1,topLeft:!1},width:1===s?"100%":550,height:"calc(100vh - 60px)"},void 0,S()(expand_indicator,{titleText:n("EXPAND")}),S()("div",{className:"site-feedback__feedback-box__header"},void 0,S()("h1",{},void 0,n(l)),S()("div",{className:"site-feedback__feedback-box__header__actions"},void 0,S()(q.a,{onClick:function onClick(){e.props.toggleFeedbackBox("feedbackBoxMinimized")}},void 0,n(i?"MAXIMIZE":"MINIMIZE")),S()(q.a,{onClick:this.props.closeFeedbackBox},void 0,n("CLOSE")))),S()("div",{className:"site-feedback__feedback-box__content"},void 0,!r.user.isLogIn&&S()("div",{className:"site-feedback__feedback-box__content__username"},void 0,S()("label",{htmlFor:"username"},void 0,n("FROM")," : "),S()("input",{placeholder:n("EMAILID"),value:g,autoFocus:!0,type:"text",name:"username",id:"username",onChange:this.onChangeUsername})),S()("div",{className:"site-feedback__feedback-box__content__username"},void 0,S()("label",{htmlFor:"email-subject"},void 0,n("SUBJECT")," : "),S()(x.a,{id:"email-subject",minQueryLength:1,isFullPill:!1,translator:n,isAddNewPill:!1,suggestions:this.suggestionsConfig.map((function(e){return e.suggestion})),handleAddition:this.onChangeSubject,handleInputChange:this.onChangeSubject,updateInputValue:!0,defaultInputValue:n(o),placeholder:n("PROVIDESUBJECT")})),S()(H,{onChange:this.onChangeContent,placeholder:n(h||"FEEDBACKCONTENTMESSAGE"),imageServerPayload:{directory:f,thumbnail:"false",userid:u},value:p,editorOptions:V,editorFormats:Q}),c&&S()("div",{className:"alert alert-warning"},void 0,n("EMAILIDREQUIRED")),S()(q.a,{onClick:this.onClickSend},void 0,n("SEND"))))}},{key:"sendFeedback",value:function(){var e=r()(a.a.mark((function _callee(){var e,t,n,s,i,r,o,l,u,d,c,p,g,h,f,m,v,b;return a.a.wrap((function _callee$(a){for(;;)switch(a.prev=a.next){case 0:return e=this.state,t=e.username,n=e.content,s=e.subject,i=e.listingId,r=e.brokerageFirmId,o=this.props.user,l=window.location,u=l.pathname,d=l.search,c="".concat(u).concat(d),p=this.context,g=p.country,h=p.i18n.l,f=i?"".concat(h(s)," for listing with id ").concat(i):h(s),m=Object(P.a)({pageUri:c,comment:n,subject:f,listingId:i,brokerageFirmId:r}),o.user.isLogIn?m.userId=o.user.id:(m.userName=t,N.a.save("anonymousUserEmailId",t,{secure:W.isSecure})),v={method:"POST",url:Y,headers:{countrycode:g},data:m},a.prev=9,this.props.feedbackSending(),a.next=13,D()(v);case 13:b=a.sent,this.props.onFeedbackSent(b),a.next=20;break;case 17:a.prev=17,a.t0=a.catch(9),this.props.onFeedbackSent(a.t0);case 20:case"end":return a.stop()}}),_callee,this,[[9,17]])})));return function sendFeedback(){return e.apply(this,arguments)}}()}]),FeedbackBox}(k.Component);K.defaultProps={defaultSubject:"",title:"SENDSITEFEEDBACK"},K.contextTypes={i18n:E.a.object,country:E.a.string,screenSize:E.a.number}}}]);