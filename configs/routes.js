export default {
    home: {
        path: '/',
        method: 'get',
        page: 'home',
        title: 'Home',
        handler: require('../components/Home')
    },
    search: {
        path: '/search',
        method: 'get',
        page: 'search',
        title: 'Search',
        handler: require('../components/SearchResults')
    }
};
