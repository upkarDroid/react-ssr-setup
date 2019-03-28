import express from 'express';
import routeController from './routeController';
import { json } from 'body-parser';

const router = express.Router();
// middleware that is specific to this router
// router.use(function timeLog(req, res, next) {

//     next();
// });

router.get('/', (req, res, next) => {
    //this is home page route,
    //redirect here
    // res.redirect("/ncr");
    next();
});

router
    .route('*')
    .all(routeController.routeMiddleware)
    .get(routeController.handleGetAPis)
    .post([json(), routeController.handlePostAPis]);

export default router;
