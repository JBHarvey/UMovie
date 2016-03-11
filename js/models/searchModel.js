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
        baseURL: 'https://umovie.herokuapp.com/search',
        parameters: {
            type: '',
            name: '',
            limit: '',
            genre: '',
        },
        addedParameters: 0,
        url: function () {
            this.addedParameters = 0;
            var urlToSend = this.parameters.type != '' ? `${this.baseURL}/${this.searchType}` : this.baseURL;
            let name = this.formatParameter(this.parameters.name);
            let limit = this.formatParameter(this.parameters.limit);
            let genre = this.formatParameter(this.parameters.genre);
            return `${urlToSend}${name}${limit}${genre}`;
        },

        parse: function (response) {
            return response.results;
        },

        setSearchType: function(type) {
            this.parameters.type = type;
        },

        setSearchLimit: function(limit) {
            this.parameters.type = limit != 0 ? `limit=${limit}` : '';
        },

        setSearchGenre: function(genre) {
            this.parameters.genre= genre != '' ? `genre=${genre}`:'';
        },

        setSearchName: function(name) {
            this.parameters.name = name != '' ? `q=${name}`:'';
        },

        formatParameter: function(parameterToAdd) {
            let formattedParameter = '';
            if (parameterToAdd){
                formattedParameter = `${this.addParamSplitter()}${parameterToAdd}`;
                this.addedParameters++;
            }
            return formattedParameter;

        },

        addParamSplitter: function() {
            return this.addedParameters == 0 ? '?' : '&';
        }


    });
    return SearchModel;

})
;