/**
 * This leverages Express to create and run the http server.
 * A Fluxible context is created and executes the navigateAction
 * based on the URL. Once completed, the store state is dehydrated
 * and the application is rendered via React.
 */

import express from 'express';
import path from 'path';
import serialize from 'serialize-javascript';
import {navigateAction} from 'fluxible-router';
import debugLib from 'debug';
import React from 'react';
import app from './app';
import HtmlComponent from './components/Html';
import SearchService from './services/search';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const htmlComponent = React.createFactory(HtmlComponent);

const debug = debugLib('flux1');

const server = express();
server.set('state namespace', 'App');
server.use('/public', express.static(path.join(__dirname, '/build')));
server.use(cookieParser());
server.use(bodyParser.json());


// Get access to the fetchr plugin instance
const fetchrPlugin = app.getPlugin('FetchrPlugin');
console.log(">< fetchrPlugin", fetchrPlugin)

// Register our services
fetchrPlugin.registerService(SearchService);

// Set up the fetchr middleware
server.use(fetchrPlugin.getXhrPath(), fetchrPlugin.getMiddleware());

server.use((req, res, next) => {
    let context = app.createContext({
        req: req // The fetchr plugin depends on this
    });

    debug('Executing navigate action');
    context.getActionContext().executeAction(navigateAction, {
        url: req.url
    }, (err) => {
        if (err) {
            if (err.statusCode && err.statusCode === 404) {
                next();
            } else {
                next(err);
            }
            return;
        }

        debug('Exposing context state');
        const exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';

        debug('Rendering Application component into html');
        const html = React.renderToStaticMarkup(htmlComponent({
            context: context.getComponentContext(),
            state: exposed,
            markup: React.renderToString(context.createElement())
        }));

        debug('Sending markup');
        res.type('html');
        res.write('<!DOCTYPE html>' + html);
        res.end();
    });
});

const port = process.env.PORT || 3000;
server.listen(port);
console.log('Listening on port ' + port);

export default server;
