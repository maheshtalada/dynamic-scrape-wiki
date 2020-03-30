(window.webpackJsonp=window.webpackJsonp||[]).push([[73],{"+OGB":function(e,t,a){"use strict";a.r(t);var n=a("cDf5"),s=a.n(n),i=a("lSNA"),o=a.n(i),r=a("o0o1"),l=a.n(r),p=a("yXPU"),c=a.n(p),u=a("lwsE"),d=a.n(u),m=a("a1gu"),h=a.n(m),y=a("Nsbk"),g=a.n(y),v=a("PJYZ"),f=a.n(v),E=a("W8MJ"),I=a.n(E),x=a("7W2i"),T=a.n(x),N=a("gcR/"),_=a.n(N),b=a("q1tI"),C=a.n(b),O=a("17x9"),A=a.n(O),P=a("r39Y"),k=a("TSYQ"),S=a.n(k),M=a("UVND"),R=P.default.assetsPath,D=[{text:"Go to QuickBooks."},{text:"Click on Reports Menu."},{text:'Choose "Profit and Loss Detail" Report under "Company & Financial" Sub-Menu.'},{text:'Choose "All Dates" or select a specific Date Range.'},{text:'Select "Cash" as Report Basis.'},{text:"Ensure that Income/Expenses, Date, Name, Memo, Class & Paid Amount Fields are included."},{text:"Ensure that the Class field value is present in the report and it matches with the name of the property."},{text:"Ensure that the transaction date is in the past and the transaction amount is not empty."},{text:"If you want to import a single property, then, you can apply filter by Class or any other criteria that generates the transactions for that property."}],L=_()("div",{className:"template-info__sub-header"},void 0,"How to Generate"),w=_()("section",{className:"template-info__section"},void 0,_()("div",{className:"template-info__sub-header"},void 0,"Data Elements"),_()(M.a,{className:"data-elements-grid",data:[{id:"1",reportElement:"Class",mappedElement:"Property Name",remarks:"Mandatory element to indicate the name of the property to be imported."},{id:"2",reportElement:"Income / Expense",mappedElement:"Type/ Sub Type",remarks:"Each summary Income / Expense in the report will get mapped to the appropriate pre-defined type and sub type values. If the system is unable to map an Income / Expense row, it will tag it as Other Income (or) Other Expense respectively."},{id:"3",reportElement:"Date",mappedElement:"Transaction Date",remarks:"Ensure that “All Dates” option is chosen or the selected date range covers all the years."},{id:"4",reportElement:"Paid Amount",mappedElement:"Amount",remarks:"Selecting “Cash” as report basis will ensure that this amount is available in the report."},{id:"5",reportElement:"Name",mappedElement:"Description",remarks:""},{id:"6",reportElement:"Memo",mappedElement:"Description",remarks:""}],headers:{id:{label:"#"},reportElement:{label:"Report Element"},mappedElement:{label:"Mapped Element"},remarks:{label:"Remarks"}}})),F=_()("section",{className:"template-info__section"},void 0,_()("div",{className:"template-info__sub-header"},void 0,"Supported Types"),_()(M.a,{data:[{income:"Rental Income",expenses:"Property Tax"},{income:"Application Fee",expenses:"Leasing Fee / Advertisement / Marketing"},{income:"Pet Fee",expenses:"HOA Fee"},{income:"Utility Reimbursement",expenses:"Insurance"},{income:"Laundry Income",expenses:"Management Fee"},{income:"Miscellaneous Income",expenses:"Application Fee"},{expenses:"Commission / Placement Fee"},{expenses:"Repairs / Maintenance"},{expenses:"Utilities / Pest Control"},{expenses:"Remodeling Expense / New Appliance"},{expenses:"Equipment Rental"},{expenses:"Landscaping Expense"},{expenses:"Appraisal / Inspection Expense"},{expenses:"Bank / Security Service Charges"},{expenses:"Closing Costs"},{expenses:"Legal / Accounting / Professional Fee"},{expenses:"Auto / Travel Expense"},{expenses:"Miscellaneous Expense"}],headers:{income:{label:"Income"},expenses:{label:"Expenses"}}}),_()("div",{},void 0,"Note : Security Deposit and Late Fee are ignored")),j=function QuickBooksTemplateInfo(){return _()("div",{className:"template-info"},void 0,_()("section",{className:"template-info__section"},void 0,L,_()("ol",{},void 0,D.map((function(e){return _()("li",{},void 0,e.text,e.screenshot&&_()("div",{className:"template-info__img-wrap"},void 0,_()("img",{src:"".concat(R).concat(e.screenshot),alt:e.text})))})))),w,F)},V=function TemplateDescription(e){var t=e.title,a=e.text;return _()("div",{className:"template-info__description"},void 0,_()("div",{className:"template-info__sub-header"},void 0,t),_()("p",{},void 0,a))},U=a("ubkq"),G=a.n(U),H=a("EUZL"),B=a.n(H),q=a("Vg22"),Q=a("w0bM"),K=a.n(Q),W=a("aNkp"),X=a("5DjF"),Y=a("7E/E"),J=a("jKqO"),$=P.default.assetsPath,z=["date","name","memo","class",["paid amount","amount"]],Z=[{key:"QUICKBOOKSTEMPLATE"}],ee={income:[{regexp:"(rent|leas)",type:"RENTAL_INCOME",subtype:"",isInclude:!0},{regexp:"application",type:"OTHER_INCOME",subtype:"Application Fee",isInclude:!0},{regexp:"misc",type:"OTHER_INCOME",subtype:"Miscellaneous Income",isInclude:!0},{regexp:"(pet.*(deposit|fee)|pet)",type:"OTHER_INCOME",subtype:"Pet Fee",isInclude:!0},{regexp:"late",type:"OTHER_INCOME",subtype:"Late Fee",isInclude:!1},{regexp:"(security.*(deposit|fee)|security|deposit)",type:"OTHER_INCOME",subtype:"Security Deposit",isInclude:!1},{regexp:"(utility.*(reimburse|fee)|utility|reimburse)",type:"OTHER_INCOME",subtype:"Utility Reimbursement",isInclude:!0},{regexp:"laundry",type:"OTHER_INCOME",subtype:"Laundry Income",isInclude:!0}],expenses:[{regexp:"(tax|authority)",type:"PROPERTY_TAXES",subtype:"",isInclude:!0},{regexp:"(leas|advertis|marketing)",type:"LEASING_FEE",subtype:"",isInclude:!0},{regexp:"((home|owner).*(association|owner)|hoa|association)",type:"HOA_FEE",subtype:"",isInclude:!0},{regexp:"(insurance|protection)",type:"INSURANCE",subtype:"",isInclude:!0},{regexp:"(property.*(management|mgmt)|pm|management)",type:"MANAGEMENT_FEE",subtype:"",isInclude:!0},{regexp:"application",type:"MANAGEMENT_FEE",subtype:"Application Fee",isInclude:!0},{regexp:"late",type:"MANAGEMENT_FEE",subtype:"Late Fee",isInclude:!1},{regexp:"(commission|placement)",type:"MANAGEMENT_FEE",subtype:"Commission / Placement Fee",isInclude:!0},{regexp:"(maintenance|repair|carpet|janitor|labor|paint|plumb|floor|hvac|roof|key|lock)",type:"MAINTENANCE",subtype:"",isInclude:!0},{regexp:"(utilit|electricity|gas|water|sewer|garbage|recycl)",type:"MAINTENANCE",subtype:"Utilities",isInclude:!0},{regexp:"(remodel|renovat)",type:"MAINTENANCE",subtype:"Remodeling Expense",isInclude:!0},{regexp:"(equipment.*(rental|lease))",type:"MAINTENANCE",subtype:"Equipment Rental",isInclude:!0},{regexp:"(new.*(appliance|equipment)|appliance)",type:"MAINTENANCE",subtype:"New Appliance",isInclude:!0},{regexp:"pest",type:"MAINTENANCE",subtype:"Pest Control",isInclude:!0},{regexp:"(landscap|lawn|mow|garden)",type:"MAINTENANCE",subtype:"Landscaping Expense",isInclude:!0},{regexp:"(inspection|appraisal)",type:"OTHER_EXPENSES",subtype:"Inspection Expense",isInclude:!0},{regexp:"bank",type:"OTHER_EXPENSES",subtype:"Bank Service Charges",isInclude:!0},{regexp:"(security.*(fee|charge|service))",type:"OTHER_EXPENSES",subtype:"Security Service Charges",isInclude:!0},{regexp:"closing",type:"OTHER_EXPENSES",subtype:"Closing Costs",isInclude:!1},{regexp:"(professional|legal|accounting)",type:"OTHER_EXPENSES",subtype:"Professional Fee",isInclude:!0},{regexp:"(auto|travel)",type:"OTHER_EXPENSES",subtype:"Travel Expense",isInclude:!0},{regexp:"misc",type:"OTHER_EXPENSES",subtype:"Miscellaneous Expense",isInclude:!0}]},te=_()("i",{className:"pe-7s-close-circle invalid"}),ae=_()("i",{className:"pe-7s-check valid"}),ne=_()(W.a,{}),se=_()("i",{className:"pe-7s-check valid"}),ie=function LoadingSteps(e){var t=e.steps,a=void 0===t?[]:t,n=e.l,s=a.length;return s?_()("div",{className:"loading-steps flex flex-column"},void 0,a.map((function(e,t){return t===s-1?_()("div",{className:"loading-step flex flex-align-center "},void 0,e.isStopLoading&&(e.isError?te:ae),_()("span",{},void 0,n(e.msg||e)),!e.isStopLoading&&ne):_()("div",{className:"loading-step flex flex-align-center "},void 0,se,_()("span",{},void 0,n(e)))}))):null},oe=function ErrorDataGrid(e){var t=e.data;return _()(M.a,{className:"error-data-grid",data:t,headers:{row:{label:"ROW"},col:{label:"COLUMN"},message:{label:"MESSAGE"}}})},re=function InvalidHeaders(e){var t=e.headers,a=e.l,n={};t.forEach((function(e){if(Array.isArray(e)){var t=e.pop();n[t]={label:t}}else n[e]={label:e}}));return _()("div",{className:"invalid-headers"},void 0,_()("div",{className:"invalid-headers__msg"},void 0,a("INVALIDHEADERSMESSAGE")),_()(M.a,{className:"invalid-headers-grid",data:[],headers:n}))},le=_()("div",{className:"upload-limit-note"},void 0,"Excel file upto 5 MB size"),pe=function(e){function PortfolioTemplateImport(e){var t;return d()(this,PortfolioTemplateImport),(t=h()(this,g()(PortfolioTemplateImport).call(this,e))).state={option:"QUICKBOOKSTEMPLATE",QUICKBOOKSTEMPLATE:{},APPFOLIOTEMPLATE:{},DEFAULTTEMPLATE:{}},t.onOptionChange=t.onOptionChange.bind(f()(t)),t.toggleInstructions=t.toggleInstructions.bind(f()(t)),t.IMPORT_OPTIONS_CONFIG={QUICKBOOKSTEMPLATE:{instructions:j,descriptionTitle:"Import your historical rental data.",descriptionText:e.description,dataProcessor:"qbProcessor"},APPFOLIOTEMPLATE:{sampleDataFile:"QB_PNL_Sample.xlsx",instructions:j},DEFAULTTEMPLATE:{sampleDataFile:"QB_PNL_Sample.xlsx",descriptionTitle:"Upload detailed Transaction Report",descriptionText:"Each row represents an Income / Expense journal entry for a property.",dataProcessor:"customProcessor"}},t}return T()(PortfolioTemplateImport,e),I()(PortfolioTemplateImport,null,[{key:"getTrailingEmptyCells",value:function getTrailingEmptyCells(e){for(var t=0,a="";t<e.length;t+=1)if(e[t]){a=t;break}return a}},{key:"getQBHeaderColumns",value:function getQBHeaderColumns(e){for(var t,a,n=z.length,s=z.flat(),i=e.length,o=0;o<i;o++){var r=e[o].length;if(r>n){a=0;for(var l=0;l<r;l++)(t=String(e[o][l]))&&s.includes(t.toLowerCase())&&a++;if(a===n)break}}return a!==n?Promise.reject({error:"INVALIDHEADERS",headers:z,validationMsg:["LOADINGFILE","VALIDATINGDATA",{msg:"INVALIDHEADERS",isStopLoading:!0,isError:!0}]}):Promise.resolve({header:e[o],trailingEmptyCells:PortfolioTemplateImport.getTrailingEmptyCells(e[o]),columnsMap:{date:e[o].indexOf("Date"),amount:e[o].indexOf("Paid Amount")>-1?e[o].indexOf("Paid Amount"):e[o].indexOf("Amount"),description:[e[o].indexOf("Name"),e[o].indexOf("Memo")],property:e[o].indexOf("Class")}})}},{key:"getTypSubType",value:function getTypSubType(e,t,a){for(var n=0,s="";n<ee[e].length;n++){var i="",o=ee[e][n],r=new RegExp(o.regexp,"gi");if(a&&(i=a.match(r)),i&&""!==i.join("")||(i=t.match(r)),i&&""!==i.join("")){s=ee[e][n];break}}return s||{type:"OTHER_".concat(e.toUpperCase()),subtype:t||a,isInclude:!0}}},{key:"isValidDate",value:function isValidDate(e,t){if(!e[this.columnsMap.date])return{row:t+1,col:B.a.utils.encode_col(this.columnsMap.date),message:"Date Missing"}}},{key:"isValidAmount",value:function isValidAmount(e,t){if(""===e[this.columnsMap.amount])return{row:t+1,col:B.a.utils.encode_col(this.columnsMap.amount),message:"Amount Missing"}}},{key:"getDescription",value:function getDescription(e,t){return e&&t?"".concat(t," : ").concat(e):t||(e||"")}}]),I()(PortfolioTemplateImport,[{key:"componentDidMount",value:function componentDidMount(){var e=this;document.body.onfocus=this.onFileDialogCancel,this.fileInputEl.addEventListener("change",(function(t){e.handleChange(t)}))}},{key:"componentWillReceiveProps",value:function componentWillReceiveProps(e){var t=e.saveProperties,a=void 0===t?{}:t,n=e.successMsg,s=this.context.i18n.l;!a.isFetching&&a.status&&(e.successCallback(Object(Y.b)(s(n),Object.values(this.propertyObject).length)),e.removeModal())}},{key:"onOptionChange",value:function onOptionChange(e){this.setState({option:e})}},{key:"toggleInstructions",value:function toggleInstructions(){this.setState({showInstructions:!this.state.showInstructions})}},{key:"render",value:function render(){var e=this,t={accept:".xlsx,.xls",type:"file",style:{display:"none"},ref:function ref(t){return e.fileInputEl=t}},a=this.props.analyticsCategory,n=this.state,s=n.option,i=n.showInstructions,o=this.state[s],r=o.validationMsg,l=void 0===r?"":r,p=o.invalidData,c=o.headers,u=this.context.i18n.l,d=this.IMPORT_OPTIONS_CONFIG[s].instructions,m=this.IMPORT_OPTIONS_CONFIG[s].descriptionTitle,h=this.IMPORT_OPTIONS_CONFIG[s].descriptionText,y=this.IMPORT_OPTIONS_CONFIG[s].sampleDataFile,g=l.length>=1&&!p&&!c;return _()("div",{className:"property-template-import"},void 0,_()("div",{className:"property-template-import__option-detail-wrap"},void 0,_()("div",{className:"property-template-import__option-detail-wrap__description-wrap"},void 0,_()(V,{title:m,text:h})),_()("div",{className:"property-template-import__format-options"},void 0,_()(X.a,{title:u("SUPPORTEDFORMATs"),className:"radio-list",items:Z,onChange:function onChange(t){e.setState({option:t.currentTarget.value})},isOptionALLRequired:!1,selectedVal:s,l:u},"import-format-options")),_()("div",{className:"property-template-import__upload-wrap"},void 0,C.a.createElement("input",t),_()("button",{"data-tag-category":a,"data-tag-action":"click","data-tag-label":"Upload property data file",className:S()("btn btn-primary btn-l",{disabled:g}),disabled:g||!1,onClick:function onClick(){e.onSelectFileClick()}},void 0,u("UPLOADFILE")),le),_()("div",{className:"flex"},void 0,y&&_()("div",{className:"flex flex-column",style:{marginRight:"20px"}},void 0,_()("a",{href:"".concat($,"/downloads/").concat(y),download:!0},void 0,"Download Sample Data")),d&&_()("div",{className:"flex flex-justify-end"},void 0,_()("a",{href:"javascript:void(0);",onClick:this.toggleInstructions},void 0,"Detailed Instructions"))),_()(ie,{steps:l,l:u}),p&&_()(oe,{data:p}),c&&_()(re,{headers:c,l:u}),i&&_()("div",{className:"property-template-import__instructions"},void 0,_()("a",{href:"javascript:void(0);",onClick:this.toggleInstructions,className:"property-template-import__instructions__close-btn"},void 0,u("HIDEINSTRUCTIONS")),_()(d,{}))))}},{key:"handleFile",value:function(){var e=c()(l.a.mark((function _callee2(e){var t,a,n=this;return l.a.wrap((function _callee2$(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,K()(500);case 2:t=new FileReader,a=!!t.readAsBinaryString,t.onload=function(){var e=c()(l.a.mark((function _callee(e){var t,s,i,o,r;return l.a.wrap((function _callee$(l){for(;;)switch(l.prev=l.next){case 0:n.propertyObject={},t=e.target.result,s=B.a.read(t,{type:a?"binary":"array",cellDates:!0}),i=s.SheetNames.length>1?s.SheetNames[1]:s.SheetNames[0],o=s.Sheets[i],r=B.a.utils.sheet_to_json(o,{header:1}),n.processAndSendData(r);case 7:case"end":return l.stop()}}),_callee)})));return function(t){return e.apply(this,arguments)}}(),a?t.readAsBinaryString(e):t.readAsArrayBuffer(e);case 6:case"end":return s.stop()}}),_callee2)})));return function handleFile(t){return e.apply(this,arguments)}}()},{key:"processAndSendData",value:function(){var e=c()(l.a.mark((function _callee3(e){var t,a,n,s;return l.a.wrap((function _callee3$(i){for(;;)switch(i.prev=i.next){case 0:return t=this.props,a=t.propertyId,n=t.propertyName,i.prev=1,i.next=4,this.processData(e);case 4:if(!n){i.next=10;break}return s=this.propertyObject[n]&&this.propertyObject[n].cashFlowTransactions||[],i.next=8,this.props.dispatch(Object(J.q)({method:"post",endpoint:"savepropertycashflow",actionType:"RESPONSE_SAVE_USER_MY_PROPERTIES",paramPayload:{id:a},dataPayload:s}));case 8:i.next=12;break;case 10:return i.next=12,this.props.dispatch(Object(J.q)({method:"post",endpoint:"saveproperties",actionType:"RESPONSE_SAVE_USER_MY_PROPERTIES",dataPayload:Object.values(this.propertyObject)}));case 12:i.next=16;break;case 14:i.prev=14,i.t0=i.catch(1);case 16:case"end":return i.stop()}}),_callee3,this,[[1,14]])})));return function processAndSendData(t){return e.apply(this,arguments)}}()},{key:"handleChange",value:function handleChange(e){var t=this,a=this.state.option,n=e.target.files;this.setState(o()({},a,{validationMsg:["LOADINGFILE"],invalidData:""}),(function(){n&&n[0]&&t.handleFile(n[0])}))}},{key:"onSelectFileClick",value:function onSelectFileClick(){this.isFileDialogActive=!0,this.fileInputEl.value=null,this.fileInputEl.click()}},{key:"isDataRow",value:function isDataRow(e){return this._headerColumns.header.length===e.length&&this._headerColumns.trailingEmptyCells===PortfolioTemplateImport.getTrailingEmptyCells(e)}},{key:"getCustomTemplateRecords",value:function getCustomTemplateRecords(){}},{key:"getQuickBooksTemplatePLRecords",value:function getQuickBooksTemplatePLRecords(e,t){for(var a=e.length,n=0,i="",o="";n<a;n++)if(e[n].length)if(this.isDataRow(e[n])){var r="object"===s()(e[n][this._headerColumns.columnsMap.date])?G()(new Date(e[n][this._headerColumns.columnsMap.date]),"dd/mm/yyyy"):e[n][this._headerColumns.columnsMap.date],l=PortfolioTemplateImport.getTypSubType(t,i.join(""),o&&o.join("")||"",e[n]);if(this.propertyObject.hasOwnProperty(e[n][this._headerColumns.columnsMap.property])){var p=this.propertyObject[e[n][this._headerColumns.columnsMap.property]].cashFlowTransactions;p.push({type:l.type,subType:l.subtype,transactionDate:r,description:PortfolioTemplateImport.getDescription(e[n][this._headerColumns.columnsMap.description[0]],e[n][this._headerColumns.columnsMap.description[1]]),amount:e[n][this._headerColumns.columnsMap.amount],isIncludedForComputation:l.isInclude}),this.propertyObject[e[n][this._headerColumns.columnsMap.property]].cashFlowTransactions=p}else this.propertyObject[e[n][this._headerColumns.columnsMap.property]]={name:e[n][this._headerColumns.columnsMap.property],cashFlowTransactions:[{type:l.type,subType:l.subtype,transactionDate:r,description:PortfolioTemplateImport.getDescription(e[n][this._headerColumns.columnsMap.description[0]],e[n][this._headerColumns.columnsMap.description[1]]),amount:e[n][this._headerColumns.columnsMap.amount],isIncludedForComputation:l.isInclude}]};e[n+1]&&!this.isDataRow(e[n+1])&&this._headerColumns.header.length===e[n+1].length&&n++}else i&&i.length<e[n].length?o=e[n]:i=e[n]}},{key:"isValidDataRow",value:function isValidDataRow(e,t){var a=this;if(this._headerColumns.header.length===e.length&&this._headerColumns.trailingEmptyCells===PortfolioTemplateImport.getTrailingEmptyCells(e)){return["isValidDate","isValidAmount"].map((function(n){return PortfolioTemplateImport[n].call(a._headerColumns,e,t)})).filter((function(e){return e}))}}},{key:"customProcessor",value:function(){var e=c()(l.a.mark((function _callee4(e){return l.a.wrap((function _callee4$(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),_callee4)})));return function customProcessor(t){return e.apply(this,arguments)}}()},{key:"qbProcessor",value:function(){var e=c()(l.a.mark((function _callee5(e){var t,a,n,s,i,r,p,c=this;return l.a.wrap((function _callee5$(l){for(;;)switch(l.prev=l.next){case 0:return t=this.state.option,this.setState(o()({},t,{validationMsg:["LOADINGFILE","VALIDATINGDATA"]})),l.next=4,K()(800);case 4:return l.prev=4,l.next=7,PortfolioTemplateImport.getQBHeaderColumns(e);case 7:this._headerColumns=l.sent,l.next=13;break;case 10:return l.prev=10,l.t0=l.catch(4),l.abrupt("return",Promise.reject(l.t0));case 13:if(!(a=e.map((function(e,t){return c.isValidDataRow(e,t)})).filter((function(e){return e&&e.length}))).length){l.next=17;break}return n=[].concat.apply([],a),l.abrupt("return",Promise.reject({validationMsg:["LOADINGFILE","VALIDATINGDATA",{msg:"INVALIDDATAFOUND",isStopLoading:!0,isError:!0}],invalidData:n}));case 17:return this._data=e.map((function(e){var t=PortfolioTemplateImport.getTrailingEmptyCells(e);return e.slice(t,e.length).shift()})),s=this._data.indexOf("Income"),i=this._data.indexOf("Total Income"),r=this._data.indexOf("Expense"),p=this._data.indexOf("Total Expense"),this._income=e.slice(s+1,i),this._expense=e.slice(r+1,p),this.getQuickBooksTemplatePLRecords(this._income,"income"),this.getQuickBooksTemplatePLRecords(this._expense,"expenses"),l.abrupt("return",Promise.resolve({validationMsg:["LOADINGFILE","VALIDATINGDATA",{msg:"UPLOADINGDATA"}]}));case 27:case"end":return l.stop()}}),_callee5,this,[[4,10]])})));return function qbProcessor(t){return e.apply(this,arguments)}}()},{key:"processData",value:function(){var e=c()(l.a.mark((function _callee6(e){var t,a,n;return l.a.wrap((function _callee6$(s){for(;;)switch(s.prev=s.next){case 0:return t=this.state.option,a=this.IMPORT_OPTIONS_CONFIG[t].dataProcessor,s.prev=2,s.next=5,this[a](e);case 5:return n=s.sent,this.setState(o()({},t,n)),delete this.propertyObject.undefined,s.abrupt("return",Promise.resolve());case 11:return s.prev=11,s.t0=s.catch(2),this.setState(o()({},t,s.t0)),s.abrupt("return",Promise.reject());case 15:case"end":return s.stop()}}),_callee6,this,[[2,11]])})));return function processData(t){return e.apply(this,arguments)}}()}]),PortfolioTemplateImport}(b.Component);pe.contextTypes={i18n:A.a.object},pe.defaultProps={analyticsCategory:"Import Properties",description:"Use this tool to import historical rental data for properties you currently own and create useful visualizations."};t.default=Object(q.connect)((function mapStateToProps(e){return{saveProperties:e.userprofile.save_properties}}))(pe)},0:function(e,t){},1:function(e,t){},2:function(e,t){},"5DjF":function(e,t,a){"use strict";var n=a("gcR/"),s=a.n(n),i=a("lwsE"),o=a.n(i),r=a("W8MJ"),l=a.n(r),p=a("a1gu"),c=a.n(p),u=a("Nsbk"),d=a.n(u),m=a("PJYZ"),h=a.n(m),y=a("7W2i"),g=a.n(y),v=a("q1tI"),f=a.n(v),E=a("17x9"),I=a.n(E),x=a("pVnL"),T=a.n(x),N=a("TSYQ"),_=a.n(N),b=a("me71");function Radio(e){var t={id:(e.id||"mdl-radio-field-"+e.value.replace(/[^a-z0-9]/gi,""))+Object(b.a)(),type:"radio",name:e.name,onChange:e.onChange,value:e.value,checked:e.checked||"",disabled:e.disabled||""};return s()("div",{className:_()("mdl-radio-group",e.className)},void 0,f.a.createElement("input",T()({},t,{key:t.id})),s()("label",{htmlFor:t.id},void 0,e.children))}a.d(t,"a",(function(){return O}));var C=s()("div",{}),O=function(e){function RadioList(e){var t;o()(this,RadioList),t=c()(this,d()(RadioList).call(this,e));var a=e.selectedVal,n=e.isOptionALLRequired,s=e.items;return t.onChange=t.onChange.bind(h()(t)),t.state={selectedVal:a||(n?"all":s[0].key)},t}return g()(RadioList,e),l()(RadioList,[{key:"componentWillReceiveProps",value:function componentWillReceiveProps(e){this.setState({selectedVal:e.selectedVal})}},{key:"onChange",value:function onChange(e){this.setState({selectedVal:e.currentTarget.value}),this.props.onChange(e)}},{key:"render",value:function render(){var e=this,t=this.props,a=t.facet,n=t.classNames,i=t.items,o=t.title,r=t.isOptionALLRequired,l=t.labelAppendValue,p=this.state.selectedVal,c=this.context.i18n.l;return s()("div",{className:_()("radio-list-wrapper",n)},void 0,o&&s()("span",{className:"title"},void 0,c(o.toUpperCase())),s()("div",{className:"radio-list-wrapper__items"},void 0,r?s()(Radio,{className:"item",value:"all",name:a,id:"all",checked:"all"===p?"checked":"",onChange:this.onChange},"all",c("ALL")):C,i.map((function(t,n){var i=l?"".concat(c(t.key.toUpperCase())).concat(l):c(t.key.toUpperCase());return s()(Radio,{className:"item",value:t.key,name:a,id:t.key,checked:p===t.key?"checked":"",onChange:e.onChange},"".concat(t.key).concat(n),i,t.count&&s()("span",{className:"item-count"},void 0," (".concat(t.count,")")))}))))}}]),RadioList}(v.Component);O.defaultProps={isOptionALLRequired:!0},O.contextTypes={i18n:I.a.object}}}]);