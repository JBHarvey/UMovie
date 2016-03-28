

define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {
    var TmdbModel = Backbone.Model.extend( {

        dataBaseUrl : "https://api.themoviedb.org/3",
        dataBaseApiKey : "?api_key=8e2fb63d78986604185e4448ce8fbaad",
        dataBaseImg : "https://image.tmdb.org/t/p/original",
        name: '',
        urlRoot : '',



        actorUrl : function(artistName) {
            this.setName(artistName);
            return this.dataBaseUrl + '/search/person' + this.dataBaseApiKey + this.name;
        },

        actorImageUrl : function() {
            return ;
        },

        parse: function (response) {
            return response.results;
        },

        setName: function (name) {
            this.name = name != '' ? "&query=" +  name.split(' ').join('+') : '';
        },

        formatParameter: function(parameterToAdd) {
            let formattedParameter = '';
            if(parameterToAdd) {
                formattedParameter = `${this.addParamSplitter()} ${parameterToAdd}`;
            }
            return formattedParameter;
        },

        addParamSplitter: function () {
            return this.addedParameters == 0 ? '?' : '&';
        }

    });
});