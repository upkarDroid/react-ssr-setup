import express from 'express';
import handlebar from 'express-handlebars';
import configs from './config';
import morgan from 'morgan';
import compression from 'compression';

const setupTemplateEngine = (app) => {
    const hbs = handlebar.create({
        extname: '.hbs',
        defaultLayout: 'main',
    });
    //handlebars is the default template for us

    app.engine('.hbs', hbs.engine);
    app.set('view engine', '.hbs');
};
const shouldCompress = (req, res) => {
    if (req.headers['x-no-compression']) {
        // don't compress responses with this request header
        return false;
    }
    // fallback to standard filter function
    return compression.filter(req, res);
};

const setupApp = (app) => {
    // app.configure(() => {
    app.use(express.static(configs.publicPath));
    app.set('views', configs.template.path);
    setupTemplateEngine(app);
    // app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
    app.use(morgan('common'));
    app.use(compression({ filter: shouldCompress }));
    // app.use(cors());
    // app.use(json());

    // });
};

export default setupApp;
