/**
 * Created by Jean-Benoît on 16-03-01.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/movie.html',
    'collections/movies',
    'handlebars'
], function ($, _, Backbone, movieTemplate, MovieCollection, Handlebars) {


    var MovieCollectionView = Backbone.View.extend({

        el: $('#content'),

        initialize: function (movieId) {
            this.id = movieId;
            this.render();
        },

        render: function () {

            //The data used in the template
            var template = Handlebars.compile(movieTemplate);

            var source = new MovieModel();
            var resultMovie = template(source.hardcode);

            this.$el.html(resultMovie);
        }
    });
    return MovieCollectionView;

});