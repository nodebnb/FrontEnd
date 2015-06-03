import request from 'superagent';
// import secrets from './../secrets';
import qs from 'querystring';
import url from 'url';
import routes from '../configs/routes';

let fetchAPI = function(docParams, cb) {
    let url = "http://localhost:1337/"

    request
        .get(url)
        .end(function(err, res) {
            if (err) {
                return cb(err);
            }

            let md = res.body && res.body.content; // base64 encoded string of the markdown file

            return cb(null, res.body);
        });
};


export
default {
    name: 'search',
    read: function(req, resource, params, config, callback) {
        // Return immediately if repo's readme is in cache
        // if (cache[params.path]) {
        // return callback(null, cache[params.path]);
        // } else {
        return fetchAPI(params.path);
        // }
    }
};