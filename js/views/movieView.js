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

        initialize: function (movieId) {
            this.model = new MovieModel({id: movieId});
            this.listenTo(this.model, "change", this.render);
            this.model.fetch();

        },

        render: function () {

            console.log('pomme');
            //The data used in the template
            var template = Handlebars.compile(movieTemplate);

            var source = this.model.attributes;
            var resultMovie = template(source);

            this.$el.html(resultMovie);
        }
    });
    return MovieView;

});