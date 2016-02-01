/**
 * Created by seydou on 16-01-26.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/movie.html',
    'models/movieModel',
    'handlebars'
], function ($, _, Backbone, movieTemplate, MovieModel, Handlebars) {


    var MovieView = Backbone.View.extend({

        el: $('#content'),

        initialize: function() {
            this.render();
        },

        render: function() {

            //The data used in the template
            var template = Handlebars.compile(movieTemplate);

            var source = new MovieModel();
            var resultMovie = template(source.defaults);

            this.$el.html(resultMovie);
        }
    });
    return MovieView;

});