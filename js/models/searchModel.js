/**
 * Created by Jean-Benoît on 3/8/2016.
 */
define([
    'jquery',
    'underscore',
    'backbone',
], function ($, _, Backbone) {

    var SearchModel = Backbone.Collection.extend({
        model: MovieModel,
        baseURL: 'https://umovie.herokuapp.com/search/',
        searchType: '',
        nameParameter: '',
        limitParameter: '',
        genreParameter: '',
        parameterPresence: false,
        url: function () {
            var urlToSend = baseURL;
            if (parameterPresence) {
                if (nameParameter != '') {
                    urlToSend = `${urlToSend}${searchType}`;
                }

            }
            return urlToSend;
        },

        parse: function (response) {
            return response.results;
        }
        ,

        setSearchType: function (type) {
            if (type != 'global') {

            } else {
                
            }
        }


    });
    return SearchModel;

})
;