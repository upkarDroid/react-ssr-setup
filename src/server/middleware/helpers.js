import querystring from 'querystring';
import fetch from 'node-fetch';
import configs from '../configs/config';
import { WEB_API_IDENTIFIER, allowedReqHeaders, allowedResHeaders } from '../constants/common';

const shouldRedirect = (url) => {
    return url === '/';
    //currently redirecting only for homepage hits, should include country pages as well
};

const replaceHost = (data) => {
    let tempDataStr = JSON.stringify(data);
    const host = Array.isArray(data)
        ? data[3].response.pageTopdata.head.host
        : data.response.pageTopdata.head.host;
    const b = new RegExp(host, 'g');
    tempDataStr = tempDataStr.replace(b, 'http://dev.zomato.com/');
    // console.log(tempDataStr);
    return JSON.parse(tempDataStr);
};

const getRedirectUrl = () => {
    return '/ncr';
    //hard-coded for now, should be fetched from webApi
};

const isWebApiCall = (paramsObj) => {
    return paramsObj.hasOwnProperty(WEB_API_IDENTIFIER);
};

const makeAPIQuery = (paramsObj, additionalParams) => {
    if (!isWebApiCall(paramsObj)) {
        paramsObj[WEB_API_IDENTIFIER] = 1;
    }
    return querystring.stringify({ ...paramsObj, ...additionalParams });
};

const makeRequestPromise = (url, req, res) => {
    console.log(url);
    const headers = new fetch.Headers();

    for (const header in req.headers) {
        if (allowedReqHeaders.indexOf(header) !== -1) {
            headers.set(header, req.headers[header]);
        }
    }

    if (configs.apiConfig.isAuthRequired) {
        headers.set(
            'Authorization',
            'Basic ' +
                Buffer.from(configs.apiConfig.userName + ':' + configs.apiConfig.password).toString(
                    'base64'
                )
        );
    }
    headers.set('Accept', 'application/json');
    const options = {
        headers,
        // redirect: 'manual',
        redirect: 'manual',
    };

    if (req.method == 'POST') {
        options.body = JSON.stringify(req.body);
    }

    return fetch(url, options)
        .then((response) => {
            // res.status(response.status);
            //set res headers here
            for (const header of response.headers.entries()) {
                if (allowedResHeaders.indexOf(header[0]) !== -1) {
                    res.setHeader(header[0], header[1]);
                }
            }
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
};

const createPageMetaReq = (req, res) => {
    const url =
        configs.apiConfig.baseUrl + req.path + '?' + makeAPIQuery(req.query, { pagetopdata: 1 });
    return makeRequestPromise(url, req, res);
};

const createBannerDataReq = (req, res) => {
    const url =
        configs.apiConfig.baseUrl + req.path + '?' + makeAPIQuery(req.query, { bannerdata: 1 });
    return makeRequestPromise(url, req, res);
};

const createGlobalDataReq = (req, res) => {
    const url =
        configs.apiConfig.baseUrl + req.path + '?' + makeAPIQuery(req.query, { globaldata: 1 });
    return makeRequestPromise(url, req, res);
};

const createUserDataReq = (req, res) => {
    const url =
        configs.apiConfig.baseUrl + req.path + '?' + makeAPIQuery(req.query, { userdata: 1 });
    return makeRequestPromise(url, req, res);
};

const createPageResponseReq = (req, res) => {
    const url = configs.apiConfig.baseUrl + req.path + '?' + makeAPIQuery(req.query);
    return makeRequestPromise(url, req, res);
};

const createPostFetchReq = (req, res) => {
    const url = configs.apiConfig.baseUrl + req.path + '?' + makeAPIQuery(req.query);
    return makeRequestPromise(url, req, res);
};

export {
    createPostFetchReq,
    createPageResponseReq,
    createUserDataReq,
    createGlobalDataReq,
    createBannerDataReq,
    createPageMetaReq,
    shouldRedirect,
    getRedirectUrl,
    isWebApiCall,
    replaceHost,
};
