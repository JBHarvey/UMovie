/**
 * Created by Jean-Benoît on 2016-01-27.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'jscookie',
    'models/movieModel'
], function ($, _, Backbone, Cookie, MovieModel) {

    var Movies = Backbone.collection.extend({
        model: MovieModel,

        url: 'https://umovie.herokuapp.com/movies',

        parse: function (response) {
            return response.results;
        }
    });


});