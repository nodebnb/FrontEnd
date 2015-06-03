import request from 'superagent';
// import secrets from './../secrets';
import qs from 'querystring';
import url from 'url';
import routes from '../configs/routes';


let  resultsPool = [{
                'id': '1',
                'title': 'house1',
                'img': 'https://a0.muscache.com/ac/pictures/52804006/dc1adbb9_original.jpg',
                'location':'San Bruno'
            }, {
                'id': '2',
                'title': 'house2',
                'img': 'https://a0.muscache.com/ac/pictures/52804006/dc1adbb9_original.jpg',
                'location':'San Bruno'
            },
            {
                'id': '3',
                'title': 'house3',
                'img': 'https://a0.muscache.com/ac/pictures/52804006/dc1adbb9_original.jpg',
                'location':'Palo Alto'
            }

            ];

let fetchAPI = function(docParams, callback) {
    // console.log(">< docParams", docParams)
    // console.log(">< cb", cb)
    let url = "http://localhost:1337/"


    request
        .get(url)
        .end(function(err, res) {
            if (err) {
                   console.log("------------------------------------------")
            console.log(">< error", err)
                return callback(err);
            }
            console.log("------------------------------------------")
            console.log(">< res", res)

            // let md = res.body; // base64 encoded string of the markdown file

            return callback(null, res.body);
        });
    // callback(null, resultsPool);
};


export
default {
    name: 'search',
    read: function(req, resource, params, config, callback) {
       // return fetchAPI(params, callback);
        // Return immediately if repo's readme is in cache
        // if (cache[params.path]) {
        // return callback(null, cache[params.path]);
        // } else {
       // return fetchAPI(params, callback);
        // }
        return callback(null, resultsPool);
    }
};