//TODO: figure out the best way to set query to current routes

let UrlUtil = {
    //update existing query on the url
    updateQuery: function(currentUrl, key, value) {
        let expression = '([?&]' + key + '=)([^&]*)';
        let regex = new RegExp(expression, 'g');
        return currentUrl.replace(regex, '$1' + value);
    },
    //add a new query to the url
    addQuery: function(currentUrl, key, value) {
        return currentUrl + '&' + key + '=' + value;
    }
};

module.exports = UrlUtil;
