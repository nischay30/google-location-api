const Router = require('express').Router();

const signup = require('./signup');
const login = require('./login');
const search = require('./search');
const recentSearch = require('./recentSearch');

const saveSearch = require('./saveSearch');
const middleware = require('./middleware');

Router.use(require('body-parser').json());

Router.post('/signup', signup);
Router.post('/login', login);

Router.get('/search/:location', search);
Router.post('/recent', middleware, recentSearch);
Router.post('/save', middleware, saveSearch);

module.exports = Router;