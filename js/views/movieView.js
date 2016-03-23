/**
 * Created by Jean-Benoît on 16-01-26.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/movie.html',
    'models/movieModel',
    'views/youtubeVideos',
    'handlebars'
], function ($, _, Backbone, movieTemplate, MovieModel, YoutubeVideo, Handlebars) {


    var MovieView = Backbone.View.extend({

        el: $('#content'),

        initialize: function (movieId) {
            this.model = new MovieModel({id: movieId});

            this.listenTo(this.model, "change", this.render);
            this.model.fetch();
        },

        render: function () {
            // Encode the URI and replace the space by '+'
            var searchRequest = encodeURI(this.model.get('trackName') + ' trailer')
                .replace(/%20/g, '+');

            //The data used in the template
            var template = Handlebars.compile(movieTemplate);
            var source = this.model.attributes;
            var resultMovie = template(source);

            this.$el.html(resultMovie);

            // Adds the youtube trailer to the right HTML tag with the corresponding class
            var youtubeVideo = new YoutubeVideo(searchRequest, '.movie-video-preview');
        }

    });
    return MovieView;

});
