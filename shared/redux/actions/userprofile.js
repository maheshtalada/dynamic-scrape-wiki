import UserProfileService from '../../services/userprofile';
import uniqueId from '../../utils/uniqueFormId';
import { chunk as _chunk } from 'lodash';
import { REQUEST_UPDATE_ERROR_RESPONSE } from './application';
import { REQUEST_USER_PROFILE_SCHEMA } from './schema';

const IMPORT_CONTACTS_BATCH_SIZE = 20;

export function REQUEST_USER_LISTING(payload) {
		const currentPage = (payload.query && Number(payload.query.page)) || 1;
		const dataPayload = payload.query;
		return async(dispatch) => {

			dispatch({
				type : 'RESPONSE_USER_LISTING',
				data : {
					isFetching: true
				}
			});

			try {
				const config = {
					endpoint:'getuserlisting',
					method:'get',
					dataPayload: {
						...dataPayload,
						cacheBust : new Date().getTime()
					}
				};
				const response = await UserProfileService.fetchData(config);
				dispatch({
					type : 'RESPONSE_USER_LISTING',
					data : Object.assign(response.data,{isFetching: false},{currentPage: currentPage})
				});

			}catch (e) {
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'RESPONSE_USER_LISTING',
						data: Object.assign(e,{isFetching: false})
					},
					error : e
				}));
			}

		};
	}

export function REQUEST_USER_PROPERTIES(payload) {
		const currentPage = (payload.query && Number(payload.query.page)) || 1;
		const dataPayload = payload.query;
		return async(dispatch,getState) => {
			const { userprofile } = getState();
			dispatch({
				type : 'RESPONSE_USER_PROPERTIES',
				data : {
					...userprofile.user_properties,
					isFetching: true
				}
			});

			try {
				const config = {
					endpoint:'getuserproperties',
					method:'get',
					dataPayload: {
						...dataPayload,
						cacheBust : new Date().getTime()
					}
				};
				const response = await UserProfileService.fetchData(config);
				dispatch({
					type : 'RESPONSE_USER_PROPERTIES',
					data : Object.assign(response.data,{isFetching: false, actionResponseId : payload.actionResponseId || uniqueId()},{currentPage: currentPage})
				});

			}catch (e) {
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'RESPONSE_USER_PROPERTIES',
						data: Object.assign(e,{isFetching: false})
					},
					error : e
				}));
			}

		};
	}

export function REQUEST_USER_RETURNS(payload) {
		const currentPage = (payload.query && Number(payload.query.page)) || 1;
		const dataPayload = payload.query;
		return async(dispatch) => {

			dispatch({
				type : 'RESPONSE_USER_RETURNS',
				data : {
					isFetching: true
				}
			});

			try {
				const config = {
					endpoint:'getuserreturns',
					method:'get',
					dataPayload: {
						...dataPayload,
						cacheBust : new Date().getTime()
					}
				};
				const response = await UserProfileService.fetchData(config);
				dispatch({
					type : 'RESPONSE_USER_RETURNS',
					data : Object.assign(response.data,{isFetching: false},{currentPage: currentPage})
				});

			}catch (e) {
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'RESPONSE_USER_RETURNS',
						data: Object.assign(e,{isFetching: false})
					},
					error : e
				}));
			}

		};
	}

export function DELETE_SAVED_RETURN(payload) {
		return async(dispatch) => {

			dispatch({
				type : 'SHOW'
			});

			dispatch({
				type : 'RESPONSE_DELETE_SAVED_RETURN',
				data : {
					isDeleting : true
				}
			});

			try {
				const config = {
					endpoint : 'deletesavedreturn',
					method : 'post',
					paramsPayload : payload
				};
				const response = await UserProfileService.fetchData(config);
				dispatch({
					type : 'HIDE'
				});

				dispatch({
					type : 'RESPONSE_DELETE_SAVED_RETURN',
					data : Object.assign(response.data,{ isDeleting: false})
				});
				if(response.status.toLowerCase() === 'success') {
					dispatch(REQUEST_USER_RETURNS(
						{
							query: {
								page : payload.page
							}
						}
						)
					);
				}
			} catch (e) {
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'RESPONSE_DELETE_SAVED_RETURN',
						data : Object.assign(e,{ isDeleting: false})
					},
					error : e
				}));
			}
		};
	}

export function DELETE_USER_LISTING(payload) {
		return async(dispatch) => {

			dispatch({
				type : 'SHOW'
			});

			dispatch({
				type : 'RESPONSE_DELETE_USER_LISTING',
				data : {
					isDeleting : true
				}
			});

			try {
				const config = {
					endpoint : 'deleteuserlisting',
					method : 'post',
					paramsPayload : payload
				};
				const response = await UserProfileService.fetchData(config);

				dispatch({
					type : 'HIDE'
				});

				dispatch({
					type : 'RESPONSE_DELETE_USER_LISTING',
					data : Object.assign(response.data,{ isDeleting: false})
				});
				if(response.status.toLowerCase() === 'success') {
					dispatch(REQUEST_USER_LISTING(
						{
							query: {
								page : payload.page
							}
						}
						)
					);
				}
			} catch (e) {
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'RESPONSE_DELETE_USER_LISTING',
						data : Object.assign(e,{ isDeleting: false})
					},
					error : e
				}));
			}
		};
	}

export function REQUEST_USER_COMPANY(payload) {
		return async(dispatch) => {
			const currentPage = (payload.query && Number(payload.query.page)) || 1;
			const dataPayload = payload.query;
			dispatch({
				type : 'RESPONSE_USER_COMPANY',
				data : {
					isFetching: true
				}
			});

			try {
				const config = {
					endpoint:'getusercompany',
					method:'get',
					dataPayload: {
						...dataPayload,
						cacheBust : new Date().getTime()
					}
				};
				const response = await UserProfileService.fetchData(config);
				dispatch({
					type : 'RESPONSE_USER_COMPANY',
					data : Object.assign(response.data,{isFetching: false},{currentPage: currentPage})
				});

			}catch (e) {
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'RESPONSE_USER_COMPANY',
						data: Object.assign(e,{isFetching: false})
					},
					error : e
				}));
			}

		};
	}

export function REQUEST_USER_NOTIFICATIONS(payload) {
		const currentPage = (payload.query && Number(payload.query.page)) || 1;
		const dataPayload = payload.query;
		return async(dispatch) => {
			dispatch({
				type : 'RESPONSE_USER_NOTIFICATIONS',
				data : {
					isFetching : true
				}
			});

			try {
				const config = {
					endpoint: 'getusernotifications',
					method: 'get',
					dataPayload: {
						...dataPayload,
						cacheBust : new Date().getTime()
					}
				};
				const response = await UserProfileService.fetchData(config);
				dispatch({
					type : 'RESPONSE_USER_NOTIFICATIONS',
					data : Object.assign(response.data,{ isFetching : false, currentPage: currentPage })
				});
			} catch (e) {
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'RESPONSE_USER_NOTIFICATIONS',
						data: Object.assign(e,{isFetching: false})
					},
					error : e
				}));
			}
		};
	}

export function REQUEST_REMOVE_USER_LISTING(payload) {

		return async(dispatch) => {
			dispatch({
				type : 'RESPONSE_REMOVE_USER_LISTING',
				data: {
					isFetching: true,
					updatingid: payload.paramData.listingid
				}
			});
			try {
				const config = {
					endpoint:'listingconfirmation',
					method:'post',
					paramsPayload: payload.paramData,
					dataPayload: payload.data
				};
				const response = await UserProfileService.fetchData(config);
				dispatch({
					type: 'RESPONSE_REMOVE_USER_LISTING',
					data: {
						isFetching: false,
						updatedid: payload.paramData.listingid,
						...response.data
					}
				});
				if(response.status.toLowerCase() === 'success') {
					dispatch(REQUEST_USER_LISTING(
						{
							query: {
								page : payload.page
							}
						}
					)
					);
				}
			} catch (e) {
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'RESPONSE_REMOVE_USER_LISTING',
						data : {
							isFetching: false,
							'error' : e.error && e.error.error_description || '',
							'status' : e.status
						}
					},
					error : e
				}));
			}
		};
	}

export function REQUEST_REMOVE_USER_PROPERTY(payload) {

		return async(dispatch) => {
			dispatch({
				type : 'RESPONSE_REMOVE_USER_PROPERTY',
				data: {
					isFetching: true,
					updatingid: payload.paramData.id
				}
			});
			try {
				const config = {
					endpoint:'removeproperty',
					method:'post',
					paramsPayload: payload.paramData
				};
				const response = await UserProfileService.fetchData(config);
				dispatch({
					type: 'RESPONSE_REMOVE_USER_PROPERTY',
					data: {
						isFetching: false,
						updatedid: payload.paramData.id,
						...response.data
					}
				});
				if(response.status.toLowerCase() === 'success') {
					dispatch(REQUEST_USER_PROPERTIES(
						{
							query: {
								page : payload.page,
								...payload.requestQuery
							}
						}
					)
					);
				}
			} catch (e) {
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'RESPONSE_REMOVE_USER_PROPERTY',
						data : {
							isFetching: false,
							'error' : e.error && e.error.error_description || '',
							'status' : e.status
						}
					},
					error : e
				}));
			}
		};
	}

export function REQUEST_UPLOAD_OFFICE_LOGO(file, listingId) {

	return async(dispatch) => {
		dispatch({
			type : 'RESPONSE_UPLOAD_PROFILE_IMAGE',
			data : {
				isUploading: true
			}
		});
		try {
			const payload = {file};
			let uploadData = new FormData();
			uploadData.set('enctype','multipart/form-data');
			uploadData.append('file',payload.file, payload.title);

			const uploadConfig = {
				endpoint : 'brokaragefirm.upload.post.officelogo',
				method : 'post',
				dataPayload : uploadData,
				paramsPayload : {
					id : listingId
				}
			};
			console.log(uploadConfig);
			const response = await UserProfileService.fetchData(uploadConfig);

			dispatch({
				type : 'RESPONSE_UPLOAD_PROFILE_IMAGE',
				data : Object.assign(response.data,{ isUploading : false, status : 'success'})
			});
		} catch (e) {
			dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
				action : {
					type : 'RESPONSE_UPLOAD_PROFILE_IMAGE',
					data : Object.assign(e,{isUploading: false})
				},
				error : e
			}));
		}
	};
}

export function REQUEST_UPLOAD_PROFILE_IMAGE(file) {
		return async(dispatch) => {
			dispatch({
				type : 'RESPONSE_UPLOAD_PROFILE_IMAGE',
				data : {
					isUploading: true
				}
			});
			try {
				const payload = {file};
				let uploadData = new FormData();
				uploadData.set('enctype','multipart/form-data');
				uploadData.append('file',payload.file);

				const uploadConfig = {
					endpoint : 'saveprofileimage',
					method : 'post',
					dataPayload : uploadData
				};
				const response = await UserProfileService.fetchData(uploadConfig);

				dispatch({
					type : 'RESPONSE_UPLOAD_PROFILE_IMAGE',
					data : Object.assign(response.data,{ isUploading : false, status : 'success'})
				});
			} catch (e) {
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'RESPONSE_UPLOAD_PROFILE_IMAGE',
						data : Object.assign(e,{isUploading: false})
					},
					error : e
				}));
			}
		};
	}

export function REQUEST_SAVE_PROFILE_IMAGE(payload) {

		return async(dispatch,getState) => {
			const { filepath } = getState().userprofile.profile_image_upload;
			dispatch({
				type : 'RESPONSE_UPLOAD_PROFILE_IMAGE',
				data : {
					filepath : filepath
				}
			});
			dispatch({
				type : 'RESPONSE_SAVE_PROFILE_IMAGE',
				data : {
					isSaving : true
				}
			});

			try {
				const config = {
					endpoint:'saveprofileimage',
					method:'post',
					dataPayload: payload.dataPayload
				};
				const response = await UserProfileService.fetchData(config);
				dispatch({
					type : 'RESPONSE_SAVE_PROFILE_IMAGE',
					data : Object.assign(response.data,{ isSaving : false, status : 'success'})
				});
				if(payload.isEditProfile) {
					REQUEST_USER_PROFILE_SCHEMA(
						dispatch,{}
					);
				}
			} catch (e) {
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'RESPONSE_SAVE_PROFILE_IMAGE',
						data : Object.assign(e,{isSaving: false})
					},
					error : e
				}));
			}
		};
	}

export function DELETE_USER_PROFILE_PIC(payload) {

		return async(dispatch) => {
			dispatch({
				type : 'RESPONSE_DELETE_USER_PROFILE_PIC',
				data : {
					deletingPic : true
				}
			});

			dispatch({
				type : 'RESPONSE_SAVE_PROFILE_IMAGE',
				data : {}
			});

			try {
				const config = {
					endpoint: 'deleteprofilepic',
					method: 'post',
					dataPayload: payload
				};
				const response = await UserProfileService.fetchData(config);
				dispatch({
					type : 'RESPONSE_DELETE_USER_PROFILE_PIC',
					data : Object.assign(response.data, { deletingPic : false})
				});
				if(payload.isEditProfile) {
					REQUEST_USER_PROFILE_SCHEMA(
						dispatch,{}
					);
				}
			} catch (e) {
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'RESPONSE_DELETE_USER_PROFILE_PIC',
						data : Object.assign(e, { deletingPic : false})
					},
					error : e
				}));
			}
		};
	}

export function REQUEST_USER_ARTICLES(payload) {
		const currentPage = (payload.query && Number(payload.query.page)) || 1;
		const dataPayload = payload.query;
		return async(dispatch) => {

			dispatch({
				type : 'RESPONSE_USER_ARTICLES',
				data : {
					isFetching: true
				}
			});

			try {
				const config = {
					endpoint:'getuserarticles',
					method:'get',
					dataPayload: {
						...dataPayload,
						cacheBust : new Date().getTime()
					}
				};
				const response = await UserProfileService.fetchData(config);
				dispatch({
					type : 'RESPONSE_USER_ARTICLES',
					data : Object.assign(response.data,{isFetching: false, currentPage: currentPage})
				});

			}catch (e) {
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'RESPONSE_USER_ARTICLES',
						data : Object.assign(e,{ isFetching : false})
					},
					error : e
				}));
			}

		};
	}

export function USER_PROFILE_CHANGE_PASSWORD(payload) {
		return async(dispatch) => {
			dispatch({
				type : 'RESPONSE_USER_PROFILE_CHANGE_PASSWORD',
				data : {
					isSaving: true
				}
			});

			try {
				const config = {
					endpoint:'userprofilepassword',
					method:'post',
					dataPayload: payload.dataPayload
				};
				const response = await UserProfileService.fetchData(config);
				dispatch({
					type : 'RESPONSE_USER_PROFILE_CHANGE_PASSWORD',
					data : Object.assign(response.data,{isSaving: false})
				});


			}catch (e) {
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'RESPONSE_USER_PROFILE_CHANGE_PASSWORD',
						data : Object.assign(e,{isSaving: false})
					},
					error : e
				}));
			}
		};
	}

export function REQUEST_USER_SEARCHES(payload) {
		const currentPage = (payload.query && Number(payload.query.page)) || 1;
		const dataPayload = payload.query;
		return async(dispatch,getState) => {
			const { userprofile } = getState();
			dispatch({
				type : 'RESPONSE_USER_SEARCHES',
				data : {
					isFetching: true
				}
			});

			try {
				const config = {
					endpoint: 'getusersearches',
					method: 'get',
					dataPayload: {
						...dataPayload,
						cacheBust : new Date().getTime()
					}
				};
				let response = await UserProfileService.fetchData(config);
				if(payload.loadMoreRequired && payload.query && payload.query.page > 1) {
					console.log(response.data,userprofile.user_searches);
					response.data.data = [...userprofile.user_searches.data,...response.data.data];
				}
				dispatch({
					type : 'RESPONSE_USER_SEARCHES',
					data : Object.assign(response.data,{isFetching: false, currentPage: currentPage})
				});

			}catch (e) {
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'RESPONSE_USER_SEARCHES',
						data : Object.assign(e,{isFetching: false})
					},
					error : e
				}));
			}

		};
	}

export function DELETE_SAVED_SEARCH(payload) {
		return async(dispatch) => {
			
			dispatch({
				type : 'SHOW'
			});

			dispatch({
				type : 'RESPONSE_DELETE_SAVED_SEARCH',
				data : {
					isDeleting : true
				}
			});

			try {
				const config = {
					endpoint : 'deletesavedsearch',
					method : 'post',
					paramsPayload : payload
				};
				const response = await UserProfileService.fetchData(config);
				dispatch({
					type : 'HIDE'
				});

				dispatch({
					type : 'RESPONSE_DELETE_SAVED_SEARCH',
					data : Object.assign(response.data,{ isDeleting: false})
				});
				if(response.status.toLowerCase() === 'success') {
					dispatch(REQUEST_USER_SEARCHES(
						{
							query: {
								page : payload.page
							}
						}
						)
					);
				}
			} catch (e) {
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'RESPONSE_DELETE_SAVED_SEARCH',
						data : Object.assign(e,{ isDeleting: false})
					},
					error : e
				}));
			}
		};
	}

export function REQUEST_USER_WISHLIST(payload) {
		const currentPage = (payload.query && Number(payload.query.page)) || 1;
		const dataPayload = payload.query;
		return async(dispatch) => {

			dispatch({
				type : 'RESPONSE_USER_WISHLIST',
				data : {
					isFetching: true
				}
			});

			try {
				const config = {
					endpoint: 'getuserwishlist',
					method: 'get',
					dataPayload: {
						...dataPayload,
						cacheBust : new Date().getTime()
					}
				};
				const response = await UserProfileService.fetchData(config);
				dispatch({
					type : 'RESPONSE_USER_WISHLIST',
					data : Object.assign(response.data,{isFetching: false, currentPage: currentPage})
				});

			}catch (e) {
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'RESPONSE_USER_WISHLIST',
						data : Object.assign(e,{isFetching: false, currentPage: currentPage})
					},
					error : e
				}));
			}

		};
	}

export function DELETE_WISHLIST_ITEM(payload) {
		return async(dispatch) => {

			dispatch({
				type : 'SHOW'
			});

			dispatch({
				type : 'RESPONSE_DELETE_WISHLIST_ITEM',
				data : {
					isDeleting : true
				}
			});

			try {
				const config = {
					endpoint : 'deletewishlistitem',
					method : 'post',
					dataPayload : payload
				};
				const response = await UserProfileService.fetchData(config);
				dispatch({
					type : 'HIDE'
				});

				dispatch({
					type : 'RESPONSE_DELETE_WISHLIST_ITEM',
					data : Object.assign(response.data,{ isDeleting: false})
				});
				if(response.status.toLowerCase() === 'success') {
					dispatch(REQUEST_USER_WISHLIST(
						{
							query: {
								page : payload.page
							}
						}
						)
					);
				}
			} catch (e) {
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'RESPONSE_DELETE_WISHLIST_ITEM',
						data : Object.assign(e,{ isDeleting: false})
					},
					error : e
				}));
			}
		};
	}

export function REQUEST_USER_QUESTIONS(payload) {
		const currentPage = (payload.query && Number(payload.query.page)) || 1;
		const dataPayload = payload.query;
		return async(dispatch) => {

			dispatch({
				type : 'RESPONSE_USER_QUESTIONS',
				data : {
					isFetching: true
				}
			});

			const config = {
				endpoint:'getuserquestions',
				method:'get',
				dataPayload: {
					...dataPayload,
					cacheBust : new Date().getTime()
				}
			};

			try {
				const response = await UserProfileService.fetchData(config);
				dispatch({
					type : 'RESPONSE_USER_QUESTIONS',
					data : Object.assign(response.data,{isFetching: false, currentPage: currentPage})
				});

			}catch (e) {
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'RESPONSE_USER_QUESTIONS',
						data : Object.assign(e,{ isFetching: false})
					},
					error : e
				}));
			}

		};
	}

export function REQUEST_ADD_TO_MY_CONTACTS(payload) {
		return async(dispatch) => {
			const config = {
				endpoint:'addtomycontacts',
				method:'post',
				dataPayload: payload
			};
			try {
				const response = await UserProfileService.fetchData(config);
				dispatch({
					type : 'RESPONSE_ADD_TO_MY_CONTACTS',
					data : Object.assign(response.data,{isFetching: false})
				});
			} catch (e) {
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'RESPONSE_ADD_TO_MY_CONTACTS',
						data : Object.assign(e,{isFetching: false})
					},
					error : e
				}));
			}
		}
	}

export function REQUEST_IMPORT_CONTACTS(payload) {
		return async(dispatch) => {
			let config = {
				endpoint: 'importcontacts',
				method:'post'
			};
			
			const contactsCollection = _chunk(payload.contacts,IMPORT_CONTACTS_BATCH_SIZE);

			try {
				let addedContactsCount = 0;
				let response = '';
				for(let i = 0; i < contactsCollection.length; i++) {
					addedContactsCount += contactsCollection[i].length;
					dispatch({
						type : 'RESPONSE_IMPORT_CONTACTS',
						data : Object.assign({},{addedContactsCount,selectedContactsToAdd: payload.contacts.length, isSaving: true})
					});
					config['dataPayload'] = contactsCollection[i];
					response = await UserProfileService.fetchData(config);
				}
				dispatch({
					type : 'RESPONSE_IMPORT_CONTACTS',
					data : Object.assign(response.data,{addedContactsCount, selectedContactsToAdd: payload.contacts.length, isSaving: false})
				});
			} catch (e) {
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'RESPONSE_IMPORT_CONTACTS',
						data : Object.assign(e,{isFetching: false})
					},
					error : e
				}));
			}
		}
	}

export function	REQUEST_USER_APPLICATIONS(payload) {
		const currentPage = (payload.query && Number(payload.query.page)) || 1;
		let dataPayload = payload.query || {};
		return async(dispatch,getState) => {
			const { user } = getState();
			dataPayload['userid'] = user.user.id;
			dispatch({
				type : 'RESPONSE_USER_APPLICATIONS',
				data : {
					isFetching: true
				}
			});

			try {
				const config = {
					endpoint:'getuserapplications',
					method:'get',
					dataPayload: {
						...dataPayload,
						cacheBust : new Date().getTime()
					}
				};
				const response = await UserProfileService.fetchData(config);
				dispatch({
					type : 'RESPONSE_USER_APPLICATIONS',
					data : Object.assign(response.data,{isFetching: false},{currentPage: currentPage})
				});

			}catch (e) {
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'RESPONSE_USER_APPLICATIONS',
						data: Object.assign(e,{isFetching: false})
					},
					error : e
				}));
			}

		};
	}

export function	REQUEST_USER_PAYMENTS(payload) {
		const currentPage = (payload.query && Number(payload.query.page)) || 1;
		const dataPayload = payload.query;
		return async(dispatch) => {

			dispatch({
				type : 'RESPONSE_USER_PAYMENTS',
				data : {
					isFetching: true
				}
			});

			try {
				const config = {
					endpoint:'getuserpayments',
					method:'get',
					dataPayload: {
						...dataPayload,
						cacheBust : new Date().getTime()
					}
				};
				const response = await UserProfileService.fetchData(config);
				dispatch({
					type : 'RESPONSE_USER_PAYMENTS',
					data : Object.assign(response.data,{isFetching: false},{currentPage: currentPage})
				});

			}catch (e) {
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'RESPONSE_USER_PAYMENTS',
						data: Object.assign(e,{isFetching: false})
					},
					error : e
				}));
			}

		};
	}

