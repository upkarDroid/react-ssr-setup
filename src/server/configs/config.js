const configs = {
    PORT: 80,
    publicPath: 'public',
    template: {
        type: '.hbs',
        extname: '.hbs',
        path: './server/views',
        defaultLayout: 'main',
    },
    apiConfig: {
        baseUrl: 'https://upkarsingh.zdev.net',
        isAuthRequired: false,
        userName: 'zdev_upkarsingh',
        password: 'a23cb9a9bdb95c3315fc1d195e664293',
    },
};

export default configs;
