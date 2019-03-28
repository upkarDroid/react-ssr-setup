import {
    isWebApiCall,
    shouldRedirect,
    createPageResponseReq as createFetchReq,
    getRedirectUrl,
    replaceHost,
} from '../helpers';
import { fetchMultiApiRes, handleError } from '../api_handlers';

const fetchWebAPIResponse = (req, res) => {
    console.log(req.url);
    createFetchReq(req, res)
        .then((data) => {
            console.log(req.url);
            // data = req.hostname === 'dev.zomato.com' ? replaceHost(data) : data; //TODO::remove this before merging into master
            //untill we find a better solution
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
        });
};

const handleGetAPis = (req, res) => {
    if (isWebApiCall(req.query)) {
        fetchWebAPIResponse(req, res);
    } else {
        fetchPageResponse(req, res);
    }
};

const handlePostAPis = (req, res) => {
    // console.log(req.body);
    createPostFetchReq(req, res);
};

const fetchPageResponse = (req, res) => {
    fetchMultiApiRes(req, res)
        .then((data) => {
            res.render('home', data);
        })
        .catch(handleError);
};

const routeMiddleware = (req, res, next) => {
    // res.append('Access-Control-Allow-Origin', ['*']);
    // res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    // res.append('Access-Control-Allow-Headers', 'Content-Type');
    // runs for all HTTP verbs first
    // think of it as route specific middleware!
    if (shouldRedirect(req.url)) {
        //redirect for home page
        res.redirect(getRedirectUrl());
    } else {
        //proceed with request
        next();
    }
};

export default {
    handleGetAPis,
    handlePostAPis,
    routeMiddleware,
    fetchWebAPIResponse,
    fetchPageResponse,
};
