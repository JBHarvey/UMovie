/**
 * Created by seydou on 16-01-26.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/movie.html',
    'handlebars'
], function ($, _, Backbone, movieTemplate, Handlebars) {

    var MovieView = Backbone.View.extend({

        el: $('#content'),

        initialize: function() {
            this.render();
        },

        render: function() {

            //The data used in the template
            var template = Handlebars.compile(movieTemplate);

            var data = {"title": "Movie browser!", "movie":"Fight Club"};
            var resultMovie = template();

            this.$el.append(resultMovie);
        }
    });
    return MovieView;

});