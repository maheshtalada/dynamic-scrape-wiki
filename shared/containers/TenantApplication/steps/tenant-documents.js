import React , { Component } from 'react';
import PropTypes from 'prop-types';
import LinearNavigation from 'components/common/linear-navigation/linear-navigation';
import Spinner from 'components/common/spinner/spinner';
import Loader from 'components/common/page-loader/loader';
import ErrorBox from 'components/common/error-box/error-box';
import PropertyContext from 'components/analyze-returns/property-context';
import Dropzone from 'components/common/drop-zone';
import { Button } from 'components/common/button';
import axios from 'axios';
import SiteConfig from '../../../config';
import { REQUEST_SCHEMA_TENANT_APPLICATION } from '../../../redux/actions/schema';
import { REQUEST_RESET_STORE_STATE } from '../../../redux/actions/application';

const { endpoints, api } = SiteConfig;
const MAX_SIZE_BYTES = (1048576 * 10),
    BASE_QUALITY = 90, // base quality
    MAX_WIDTH = 1000,
    MAX_DOC_COUNT = 1,
    ACCEPTED_IMG_TYPES = ['.jpg','.jpeg','.png','image/jpeg','image/png'],
    ACCEPTED_FILE_TYPES = ['.pdf','.xls','.xlsx','.docx','.doc'];
class TenantDocuments extends Component {

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object,
		country: PropTypes.string,
		screenSize: PropTypes.number
	};

	constructor(props) {
		super(props);
		this.state = {
            files : []
        };
        this.onBackClick = this.onBackClick.bind(this);
        this.onNextClick = this.onNextClick.bind(this);
        this.onNavigateSaveExitClick = this.onNavigateSaveExitClick.bind(this);
        this.resetResponseStore();
        this.onPhotoDrop = this.onPhotoDrop.bind(this);
        this.onFileDrop = this.onFileDrop.bind(this);
        this.downloadFile = this.downloadFile.bind(this);
    }
    
    componentWillMount() {
        const { dispatch, stepConfig, params } = this.props;
        let payload =  {};
        if(params.id) {
            payload['applicationid'] = params.id;
        }
        dispatch(REQUEST_SCHEMA_TENANT_APPLICATION({
            method : 'get',
            endpoint : 'gettenantdocuments',
            actionType : 'RESPONSE_SCHEMA_TENANT_APPLICATION',
            dataPayload: payload
        }));
    }

	componentWillReceiveProps(props) {
        const { tenant_upload_photo = {}, tenant_upload_file = {}, get_schema_tenant_application = {} } = props;
		this.setState({
			isFetching : get_schema_tenant_application.isFetching,
            mediaDetails : get_schema_tenant_application,
            propertyListing : get_schema_tenant_application.propertyListing,
            isSaving : props.save_schema_tenant_application.isFetching,
            isFileUploading : tenant_upload_file.isFetching,
            hasIncomeProof : ( tenant_upload_file.status === 'success' ) || (get_schema_tenant_application.hasIncomeProof),
            isPhotoUploading : tenant_upload_photo.isFetching,
            hasPhotoId : ( tenant_upload_photo.status === 'success' ) || (get_schema_tenant_application.hasPhotoId),
        });
        if(props.download_tenant_media && props.download_tenant_media.data) {
            console.log(props.download_tenant_media.data);
            this.fileDownloadStarted = false;
        }
    }

    onPhotoDrop(acceptedFiles, rejectedFiles) {
        if(!acceptedFiles.length) {
            this.setState({
                photoNotAccepted : true,
                isPhotoOpen : false,
                isPhotoOptimizing : false
            });
            return;
        }
        this.setState({
            photoNotAccepted : false,
            isPhotoOpen:false,
            isPhotoOptimizing : false
        });
        this.uploadFile(acceptedFiles[0],'PHOTO_ID','RESPONSE_TENANT_UPLOAD_PHOTO');
    }

    onFileDrop(acceptedFiles=[], rejectedFiles=[]) {
        if(!acceptedFiles.length) {
            this.setState({
                fileNotAccepted : true,
                isFileOpen : false
            });
            return;
        }
        this.setState({
            fileNotAccepted : false,
            isFileOpen:false
        });
        this.uploadFile(acceptedFiles[0],'INCOME_PROOF','RESPONSE_TENANT_UPLOAD_FILE');
    }

    uploadFile(file,mediaOption,response) {
        let form = new FormData();
        form.append('file',file,file.name || file.title);
        form.append('mimetype',file.type);
        form.append('mediaoption',mediaOption);
		this.props.dispatch(REQUEST_SCHEMA_TENANT_APPLICATION({
            method : 'post',
            endpoint : 'savetenantdocuments',
            actionType : response,
            dataPayload: form
        }));
    }
    
    onDropNotifier(state) {
		this.setState(state);
	}

    async downloadFile(mediaOption,fileName) {
        this.setState({
            isPhotoDownloading : mediaOption === 'PHOTO_ID',
            isFileDownloading : mediaOption === 'INCOME_PROOF'
        });
        this.fileDownloadStarted = true;
        let objectURL;
        const config = {
            method : 'GET',
            url : `${api.prefix}${endpoints.downloadtenantmedia}`,
            responseType : 'blob',
            params : {
                mediaoption : mediaOption
            },
            headers : {
                clientip : frameworkGlobals.visitorIP
            }
        };
        try {
            const downloadResponse = await axios(config);
            objectURL = URL.createObjectURL(downloadResponse.data);
            const link = document.createElement('a');
            link.download = fileName;
            link.href = objectURL;
            link.click();
            // Recommended : Revoke the object URL after some time to free up resources
            // There is no way to find out whether user finished downloading
            setTimeout(function() {
                window.URL.revokeObjectURL(objectURL);
            }, 60*1000);
        } catch (e) {

        }
        this.setState({
            isPhotoDownloading : false,
            isFileDownloading : false
        });
    }

    renderMedia() {
        const { l } = this.context.i18n;
        const { hasPhotoId, hasIncomeProof, isFileOpen, isPhotoOpen, isPhotoOptimizing, isPhotoUploading, isFileUploading, isPhotoDownloading, isFileDownloading } = this.state;
        return (<div className="tenant-documents-wrapper">
            <div className="tenant-documents-wrapper__upload">
                <h3>{l('PHOTOID')}</h3>
                <Dropzone className="drop-mode media-drop-zone"
                        onDrop={this.onPhotoDrop}
                        onDropNotifier = {()=>{this.onDropNotifier({
                            isPhotoOptimizing : true,
                            isPhotoOpen : false
                            })}}
                        isResSizeImage={true}
                        isCompressImage={true}
                        openFile={isPhotoOpen}
                        maxSize={MAX_SIZE_BYTES}
                        quality = {BASE_QUALITY}
                        maxWidth={MAX_WIDTH}
                        disableClick={true}
                        key="photo"
                        accept={ACCEPTED_IMG_TYPES.join(',')}
                >   
                    {isPhotoUploading ? <Spinner /> : <i className={`status-icon ${hasPhotoId ? 'pe-7s-check' : 'pe-7s-upload'}`} />}
                    <div className="tenant-documents-wrapper__upload__btn-wrap">    
                        <Button disabled={isPhotoUploading || isPhotoOptimizing}
                                onClick={()=>{
                                    this.setState({
                                        isPhotoOpen : true
                                    });
                                }}>
                            {/* <i className="pe-7s-file" /> */}
                            {l(isPhotoOptimizing ? 'PROCESSING' : 'UPLOAD')}
                        </Button>
                        {hasPhotoId && <Button className="download" btnClassName="btn-default" onClick={()=>{this.downloadFile('PHOTO_ID','Photo ID.jpeg')}}>{l('DOWNLOAD')}</Button>}
                        {isPhotoDownloading && <Spinner />}
                    </div>
                </Dropzone>
            </div>
            <div className="tenant-documents-wrapper__upload">
                <h3>{l('INCOMEPROOF')}</h3>
                <Dropzone className="drop-mode media-drop-zone"
                        onDrop={this.onFileDrop}
                        onDropNotifier = {()=>{this.onDropNotifier({
                            isFileOpen : false
                        })}}
                        isResSizeImage={false}
                        isCompressImage={false}
                        openFile={isFileOpen}
                        maxSize={MAX_SIZE_BYTES}
                        quality = {BASE_QUALITY}
                        maxWidth={MAX_WIDTH}
                        disableClick={true}
                        key="file"
                        accept={ACCEPTED_FILE_TYPES.join(',')}
                >
                    {isFileUploading ? <Spinner /> : <i className={`status-icon ${hasIncomeProof ? 'pe-7s-check' : 'pe-7s-upload'}`} />}
                    <div className="tenant-documents-wrapper__upload__btn-wrap">
                        <Button disabled={isFileUploading}
                                onClick={()=>{
                                    this.setState({
                                        isFileOpen : true
                                    });
                                }}>
                            {/* <i className="pe-7s-file" /> */}
                            {l('UPLOAD')}
                        </Button>
                        {hasIncomeProof && <Button className="download" btnClassName="btn-default" onClick={()=>{this.downloadFile('INCOME_PROOF','Income Proof.pdf')}}>{l('DOWNLOAD')}</Button>}
                        {isFileDownloading && <Spinner />}
                    </div>
                </Dropzone>
            </div>
        </div>);
    }

	render() {
		const { i18n : {l}, screenSize, country} = this.context;
		const { value = '', isFetching, isSaving, mediaDetails, isError, errorCode, propertyListing } = this.state;
		const { stepConfig } = this.props;
		return (
			<div className="tenant-application-start">
                {propertyListing && <PropertyContext l={l} country={country} propertyListing={propertyListing} />}
                <div className="tenant-application__scroll-content">
                    <div className="">
                        <h2 className="subheader-heading">{l(stepConfig.title)}</h2>
                    </div>
                    <div className="schema-forms">
                        <div className="tenant-application-start__schema-wrap">
                            {isSaving && <Loader />}
                            {
                                isError &&
                                <ErrorBox l={l} errorCode={errorCode}/>
                            }
                            {(isFetching) ? <Spinner /> : this.renderMedia()}
                        </div>
                    </div>
                </div>
                <LinearNavigation
                    nextText={l('NEXT')}
                    backText={l('PREVIOUS')}
                    navigatingSaveExitText = "SAVEANDEXIT"
                    className="linear-navigation--light-theme"
                    isBackRequired={!!stepConfig.prev}
                    isNextRequired={!!stepConfig.next}
                    onBack={this.onBackClick}
                    onNext={this.onNextClick}
                    isNavigatingSaveExitRequired
                    onNavigateSaveExit={this.onNavigateSaveExitClick}
                />
			</div>
		);
    }
    
    resetResponseStore() {
        this.props.dispatch(REQUEST_RESET_STORE_STATE({
            type : 'RESPONSE_SAVE_SCHEMA_TENANT_APPLICATION'
        }));
    }

	onProceedToNextStep() {
		this.props.navigateNext({
            step : this.props.stepConfig.next,
            id : this.props.params.id,
			query: this.props.location.query
        });
        this.resetResponseStore();
    }

    onProceedToBack() {
        this.resetResponseStore();
        this.props.navigatePrevious({
            step : this.props.stepConfig.prev,
            id : this.props.params.id,
            query : this.props.location.query
        });
    }
    
    onBackClick() {
        this.onProceedToBack();
	}

	onExit() {
		this.props.onNavigateEnd();
	}
	
	onNavigateSaveExitClick() {
		this.onExit();
	}
    
	onNextClick() {
        this.onProceedToNextStep();
	}

}

export default TenantDocuments;
