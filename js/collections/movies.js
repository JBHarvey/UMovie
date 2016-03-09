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

    var Movies = Backbone.Collection.extend({
        model: MovieModel,
        url: '/movies',

        parse: function (response) {
            return response.results;
        },

        moviesDefaultQuery: function() {
            return "https://umovie.herokuapp.com/search/movies?q=ring";
        }
    });
    return Movies;

});
