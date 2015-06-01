import Debug from 'debug';
const debug = Debug('doSearch');

export default function doSearch(context, query, done) {
    debug(query);
    context.dispatch('DO_SEARCH', query);
    done();
}