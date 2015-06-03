import Debug from 'debug';
const debug = Debug('doSearch');

export default function doSearch(context, query, done) {
    debug(query);
    
    // Load from service
    // action execute search then notify store, store then notify view. 
    context.service.read('search', { name: 'niuniu'}, {}, function (err, data) {
        if (err) {
            return done(err);
        }

        if (!data) {
            let err404 = new Error('Document not found');
            err404.statusCode = 404;
            return done(err404);
        }
        console.log(">< data", data)

        context.dispatch('RECEIVE_SEARCH_SUCCESS', data);
        // context.dispatch('UPDATE_PAGE_TITLE', {
        //     pageTitle: pageTitle
        // });
        done();
    });
}
    //context.dispatch('DO_SEARCH', query);

//     done();
// }