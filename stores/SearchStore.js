import Debug from 'debug';
import { BaseStore } from 'fluxible/addons';
import _ from 'lodash';

const debug = Debug('SearchStore');

/*
This is a 'resource store', holding the results objects loaded by the app.
results objects can come either loading a single photo (`LOAD_PHOTO_SUCCESS`)
or after loading featured photos (`LOAD_FEATURED_PHOTOS_SUCCESS`).
*/
class SearchStore extends BaseStore {

    constructor(dispatcher) {
        super();
        // this.docs = null;
        this.index = null;
        this.query = null;
        // this.results = [];
        //
        this.results = [];// resultsPool
    }

    // _doSearch(query) {
    //       console.log('_doSearch:', query);
    //     if (query === null){
    //          this.results = resultsPool;
    //          return  this.emitChange();
    //     }

    //     // debug('Seaching');
    //     this.query = query;

    //     // if ()
    //     // if (this.index) {
    //         // perform search, grab each doc and only return first 10
    //         // this.results = this.index.search(query).map(result => this.docs[result.ref]).slice(0, 10);
    //     this.results = _.union(_.filter(resultsPool, 'title', query), _.filter(resultsPool, 'location', query));
    //     // /[{id: query.id, title: 'pp', img: 'https://a0.muscache.com/ac/pictures/52804006/dc1adbb9_original.jpg'}];
    //     debug('Search complete');
    //     // }
    //     this.emitChange();
    // }

    _receiveSearch(data){
        // console.log(">< received results", results)
         this.results = data.results;
         this.query = data.query;
         this.emitChange();
    }


    // _receiveresults(results) {
    //     this.photos = results;
    //     // _.merge({}, this.photos[photo.id], photo);
    //     this.emitChange();
    // }

    getQuery() {
        return this.query;
    }


    getState() {
        return {
            // docs: this.docs,
            // index: this.index,
            query: this.query,
            results: this.results
        };
    }

    // handleLoadFeaturedSuccess({ photos }) {
    //   this.photos = _(photos).indexBy('id').merge(this.photos).value();
    //   this.emitChange();
    // }

    // get(id, minSize=0) {
    //   return _.find(this.photos, photo =>
    //     photo.id === parseInt(id) && photo.images[0].size >= minSize
    //   );
    // }

    // getMultiple(ids) {
    //   return ids.map(id => this.photos[id]);
    // }

    // dehydrate() {
    //     return {
    //         results: this.results
    //     };
    // }

    // rehydrate(state) {
    //     this.results = state.results;
    // }

}

SearchStore.storeName = 'SearchStore';

SearchStore.handlers = {
    'RECEIVE_SEARCH_SUCCESS': '_receiveSearch',
    'DO_SEARCH': '_doSearch'
};


export default SearchStore;