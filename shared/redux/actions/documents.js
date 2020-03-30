import DocumentsService from '../../services/documents';
import { getTabImages } from '../../utils/listingUtil';
import { mediaTabsConfig } from '../../assets/static/media-drop-zone-tabs.json';
import { REQUEST_UPDATE_ERROR_RESPONSE, UPDATE_ERROR_STATE } from './application';

export function REQUEST_UPLOAD_PROPERTY_IMAGES(files, propertyID, mediaOption, defaultImage) {

		return async(dispatch,getState) => {
			dispatch({
				type : 'REQUEST_SAVE_PROPERTY_IMAGES',
				data : {}
			});
			dispatch({
				type : 'REQUEST_UPLOAD_PROPERTY_IMAGES',
				data : {
					isFetching: true
				}
			});

			try {
				// TODO - too much logic in action , make it simple, clean & lean to test

				let i=0;
				for(;i < files.length; i++) {
					dispatch({
						type: 'SHOW'
					});
					let payload = {
							file: files[i],
							directory : propertyID,
							title: files[i].title || files[i].name
						},
						data =[], uploadedFiles = [];
					const { media_server_data } = getState().documents;
					let uploadData = new FormData();
					uploadData.set('enctype','multipart/form-data');
					uploadData.append('file',payload.file, payload.title);
					uploadData.append('directory',payload.directory);
					const uploadConfig = {
						endpoint : 'mediaupload',
						method : 'post',
						dataPayload : uploadData
					};
					try {
						const response = await DocumentsService.fetchData(uploadConfig);

						if(media_server_data.mediadata) {
							data = media_server_data.mediadata;
						}

						if(media_server_data.uploadedFiles) {
							uploadedFiles = media_server_data.uploadedFiles;
						}

						data.push({
							'uri':response.data.filepath,
							'mediaOption':mediaOption,
							'primary' : files[i] === defaultImage,
							'thumbnailUri' : response.data.thumbnailpath,
							'title' : files[i].title || files[i].name,
							'tag' : files[i].tag
						});

						uploadedFiles.push({
							...files[i]
						});
						dispatch({
							type: 'HIDE'
						});
						dispatch({
							type : 'REQUEST_UPLOAD_PROPERTY_IMAGES',
							data : Object.assign(
								{'mediadata':data},
								{'uploadedFiles' : uploadedFiles},
								{isFetching: ( (files.length === (i+1)) ? false : true)}
							)
						});
					}catch (e) {
						dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
							action : {
								type : 'REQUEST_UPLOAD_PROPERTY_IMAGES',
								data : Object.assign(e, {isFetching: false})
							},
							error : e
						}));
					}
				}

			}catch (e) {
				console.log(e);
			}

		};
	}

export function REQUEST_DELETE_PROPERTY_IMAGES(params,file, currentTab, index, updateMediaStore) {

		return async (dispatch, getState) => {
			const { listing_media } = getState().documents,
				options =[];
			if(updateMediaStore) {
				const links  = listing_media[mediaTabsConfig[currentTab].DATA_KEY];
				dispatch({
					type : 'REQUEST_GET_LISTING_MEDIA',
					data : Object.assign({},listing_media,{[mediaTabsConfig[currentTab].DATA_KEY]:[
						...links.slice(0,index),...links.slice(index+1)
					]})
				})
			}
			dispatch({
				type : 'RESPONSE_DELETE_PROPERTY_IMAGES',
				data : {
					isFetching: true
				}
			});

			try {

				if(file.thumbnailUri) {
					options.push('thumbnailUri');
				}

				if(file.uri) {
					options.push('uri');
				}

				const config = {
					endpoint: 'deletelistingimages',
					method: 'post',
					dataPayload: {
						key : file.uri,
						mediaOption : currentTab
					},
					paramsPayload : params
				};
					/* {id} -> Listing Id
					key - > image uri
					mediaOption -> Media Option (Whether PROPERTY or INTERIOR)*/
				const response = await DocumentsService.fetchData(config);
				dispatch({
					type : 'RESPONSE_DELETE_PROPERTY_IMAGES',
					data : Object.assign(response.data,{isFetching: false})
				});

			}catch (e) {
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'RESPONSE_DELETE_PROPERTY_IMAGES',
						data : Object.assign(e, {isFetching: false})
					},
					error : e
				}));
			}
		};
	}

export function REQUEST_ADD_DEFAULT_PROPERTY_IMAGES(paramsPayload, dataPayload) {
		return async ( dispatch) => {

			dispatch({
				type : 'RESPONSE_ADD_DEFAULT_PROPERTY_IMAGES',
				data : {
					isFetching: true
				}
			});

			const config = {
				endpoint: 'savelistingdefaultimage',
				method: 'post',
				dataPayload: dataPayload,
				paramsPayload : paramsPayload
			};

			try {
				const response = await DocumentsService.fetchData(config);
				dispatch({
					type : 'RESPONSE_ADD_DEFAULT_PROPERTY_IMAGES',
					data : Object.assign(response.data,{isFetching: false})
				});

			}catch (e) {
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'RESPONSE_ADD_DEFAULT_PROPERTY_IMAGES',
						data : Object.assign(e, {isFetching: false})
					},
					error : e
				}));
			}
		};

	}

export function REQUEST_GET_LISTING_MEDIA(payload, dispatch) {
		return async(dispatch) => {

			dispatch({
				type: 'SHOW'
			});

			dispatch({
				type : 'REQUEST_GET_LISTING_MEDIA',
				data : {
					isFetching: true
				}
			});

			const config = {
				endpoint: 'getlistingmedia',
				method: 'get',
				paramsPayload: payload.params
			};

			try {
				const response = await DocumentsService.fetchData(config);

				dispatch({
					type: 'HIDE'
				});

				dispatch({
					type : 'REQUEST_GET_LISTING_MEDIA',
					data : Object.assign(response.data,{isFetching: false})
				});

			}catch (e) {
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'REQUEST_GET_LISTING_MEDIA',
						data : Object.assign(e, {isFetching: false})
					},
					error : e
				}));
			}

		};
	}

export function UPDATE_UPDATE_LISTING_MEDIA(data) {
		return {
			'type' : 'REQUEST_GET_LISTING_MEDIA',
			'data' : data
		};
	}

export function REQUEST_SAVE_PROPERTY_IMAGES(payload, currentTab) {
		return async(dispatch, getState) => {
			const { media_server_data, listing_media } = getState().documents;
			const config = {
				endpoint: 'savelistingimages',
				method: 'post',
				dataPayload: media_server_data.mediadata,
				paramsPayload : payload
			};

			try {
				const response = await DocumentsService.fetchData(config);
				dispatch({
					type : 'REQUEST_SAVE_PROPERTY_IMAGES',
					data : Object.assign({'saveddata':response.data},{isFetching: false})
				});

				UPDATE_UPDATE_LISTING_MEDIA(getTabImages(listing_media, media_server_data.mediadata,currentTab));

			}catch(e) {
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'REQUEST_SAVE_PROPERTY_IMAGES',
						data : Object.assign(e, {isFetching: false})
					},
					error : e
				}));
			}
		};
	}

export function REQUEST_SAVE_PROPERTY_ADDITIONAL_LINKS(payload) {
		return async(dispatch, getState) => {
			const { listing_media } = getState().documents;
			const links = listing_media[mediaTabsConfig[payload.tab].DATA_KEY] || [];
			dispatch({
				type : 'REQUEST_GET_LISTING_MEDIA',
				data : Object.assign({},listing_media,{[mediaTabsConfig[payload.tab].DATA_KEY]:[
					{title : payload.dataPayload[0].title, uri: payload.dataPayload[0].uri},...links
				]})
			});
			dispatch({
				type : 'REQUEST_SAVE_PROPERTY_IMAGES',
				data : Object.assign({isFetching: false})
			});
			const config = {
				endpoint: 'savelistingimages',
				method: 'post',
				dataPayload: payload.dataPayload,
				paramsPayload : payload.paramsPayload
			};
			try {
				const response = await DocumentsService.fetchData(config);
				dispatch({
					type : 'REQUEST_SAVE_PROPERTY_IMAGES',
					data : Object.assign({},response.data,{isFetching: false})
				});

			}catch(e) {
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'REQUEST_SAVE_PROPERTY_IMAGES',
						data : Object.assign(e, {isFetching: false})
					},
					error : e
				}));
			}
		};
	}

export function REQUEST_EDIT_PROPERTY_IMAGES( listingID, payload, mediaOption, defaultImage, name) {
		return async(dispatch, getState) => {
			const { listing_media } = getState().documents;

			dispatch({
				type : 'REQUEST_GET_LISTING_MEDIA',
				data : {
					...listing_media,
					isFetching: true
				}
			});

			try {
				let uploadData = new FormData();
					uploadData.set('enctype','multipart/form-data');
					uploadData.append('file',payload.file, payload.title);
					uploadData.append('key',payload.oldFilePath);
					const uploadConfig = {
						endpoint : 'mediaedit',
						method : 'post',
						dataPayload : uploadData
					};
				const response = await DocumentsService.fetchData(uploadConfig),
					mediaData = {
						'oldKey' : payload.oldFilePath,
						'uri': response.data.filepath,
						'mediaOption': mediaOption,
						'primary': defaultImage,
						'thumbnailUri': response.data.thumbnailpath,
						'title': name
					},
					paramsPayload = {
						'listingid' : listingID
					};
				try {
					const config = {
						endpoint: 'editlistingmedia',
						method: 'post',
						dataPayload: mediaData,
						paramsPayload : paramsPayload
					};
					const serverRes = await DocumentsService.fetchData(config)
					try {
						const response = await DocumentsService.GetListingMedia({'id' : listingID});
						dispatch({
							type : 'REQUEST_GET_LISTING_MEDIA',
							data : Object.assign(response.data,{isFetching: false})
						});

					}catch (e) {
						dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
							action : {
								type : 'REQUEST_GET_LISTING_MEDIA',
								data : Object.assign(e, {isFetching: false})
							},
							error : e
						}));
					}
				} catch (e) {
					dispatch(UPDATE_ERROR_STATE(e));
				}

			}catch (e) {
				dispatch(UPDATE_ERROR_STATE(e));
			}
		}

	};

export function REQUEST_GET_TENANT_MEDIA(payload, dispatch) {
		return async(dispatch) => {

			dispatch({
				type: 'SHOW'
			});

			dispatch({
				type : 'RESPONSE_DOWNLOAD_TENANT_MEDIA',
				data : {
					isFetching: true
				}
			});

			const config = {
				endpoint: 'downloadtenantmedia',
				method: 'get',
				paramsPayload: payload.params,
				dataPayload: payload.dataPayload
			};

			try {
				const response = await DocumentsService.fetchData(config);

				dispatch({
					type: 'HIDE'
				});

				dispatch({
					type : 'RESPONSE_DOWNLOAD_TENANT_MEDIA',
					data : Object.assign({},{data: response.data},{isFetching: false})
				});

			}catch (e) {
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'RESPONSE_DOWNLOAD_TENANT_MEDIA',
						data : Object.assign(e, {isFetching: false})
					},
					error : e
				}));
			}

		};

    }

