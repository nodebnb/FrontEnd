import Debug from 'debug';
const debug = Debug('doSearch');

export default function doSearch(context, input, done) {
    debug(input);

    console.log(">< do search")
    
    // Load from service
    // action execute search then notify store, store then notify view. 
    context.service.read('search', {url: input.url}, {}, function (err, data) {
        if (err) {
            return done(err);
        }

        if (!data) {
            let err404 = new Error('Document not found');
            err404.statusCode = 404;
            return done(err404);
        }
        context.dispatch('RECEIVE_SEARCH_SUCCESS', {url: input.url, query: input.query, results: data, });

        // context.dispatch('DO_SEARCH_STORE_QUERY', query);
        // context.dispatch('UPDATE_PAGE_TITLE', {
        //     pageTitle: pageTitle
        // });
        done();
    });
}
    //context.dispatch('DO_SEARCH', query);

//     done();
// }