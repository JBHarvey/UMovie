/**
 * Created by Jean-Benoît on 3/8/2016.
 */

"use strict";

define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {

    var SearchModel = Backbone.Model.extend({
        baseURL: 'https://umovie.herokuapp.com/search',
        parameters: {
            type: '',
            name: '',
            limit: '',
            genre: ''
        },
        addedParameters: 0,
        url: function () {
            this.addedParameters = 0;
            let type = `${this.parameters.type == '' ? '' : '/'}${this.parameters.type}`;
            let name = this.formatParameter(this.parameters.name);
            let limit = this.formatParameter(this.parameters.limit);
            let genre = this.formatParameter(this.parameters.genre);
            return `${this.baseURL}${type}${name}${limit}${genre}`;
        },

        parse: function (response) {
            return response.results;
        },

        setSearchType: function (type) {
            this.parameters.type = type;
        },

        setSearchLimit: function (limit) {
            this.parameters.limit = limit != 0 ? `limit=${limit}` : '';
        },

        setSearchGenre: function (genre) {
            this.parameters.genre = genre != '' ? `genre=${genre}` : '';
        },

        setSearchName: function (name) {
            this.parameters.name = name != '' ? `q=${name}` : '';
        },

        formatParameter: function (parameterToAdd) {
            let formattedParameter = '';
            if (parameterToAdd) {
                formattedParameter = `${this.addParamSplitter()}${parameterToAdd}`;
                this.addedParameters++;
            }
            return formattedParameter;

        },

        addParamSplitter: function () {
            return this.addedParameters == 0 ? '?' : '&';
        }


    });
    return SearchModel;

});