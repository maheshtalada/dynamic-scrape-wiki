import BaseService from './BaseService';


class DocumentsService extends BaseService {

	GetListingMedia = async (dataPayload) => {
        const config = Object.assign({},BaseService.defaultConfig,{
            endpoint: 'getlistingmedia',
            method: 'get',
            paramsPayload: dataPayload
        });
        return await this.fetchData(config);
    };

}

export default new DocumentsService;
