import {
    createPageResponseReq as createFetchReq,
    createBannerDataReq,
    createGlobalDataReq,
    createPageMetaReq,
    createUserDataReq,
} from '../helpers';
import { get as _get } from 'lodash/get'; // will only load relevant _get and its dependencies in bundle
import debug from 'debug';
import Promise from 'promise';

const objectPromiseAll = (object) => {
    const promisedProperties = [];
    const objectKeys = Object.keys(object);

    objectKeys.forEach((key) => promisedProperties.push(object[key]));

    return Promise.all(promisedProperties).then((resolvedValues) => {
        return resolvedValues.reduce((resolvedObject, property, index) => {
            resolvedObject[objectKeys[index]] = property;
            return resolvedObject;
        }, object);
    });
};

const fetchMultiApiRes = (req, res) => {
    return new Promise((resolve, reject) => {
        const promises = {
            page_response: createFetchReq(req, res),
            user_data: createUserDataReq(req, res),
            banner_data: createBannerDataReq(req, res),
            pagetop_data: createPageMetaReq(req, res),
            global_data: createGlobalDataReq(req, res),
        };

        objectPromiseAll(promises)
            .then((data) => {
                resolve(data);
                // const { page_response, user_data, banner_data, pagetop_data, global_data } = data;
                // const pagetop_head = _get(pagetop_data, `response.pageTopdata.head`, {});
                // const page_top_html = _get(pagetop_data, `response.pageTopdata.html`, {});
                // const page_info = _get(page_response, `response.pageInfo`, {});

                // console.log(data);

                // resolve({
                //     page_response,
                //     user_data,
                //     banner_data,
                //     pagetop_data,
                //     global_data,
                // });
            })
            .catch((err) => {
                console.log(err);
            });
    });
};

const handleError = (err) => {
    debug(err);
};

export { fetchMultiApiRes, handleError };
