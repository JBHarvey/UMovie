/**
 * Created by Jean-Benoît on 16-01-26.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/movie.html',
    'models/movieModel',
    'models/youtubeSearchModel',
    'handlebars'
], function ($, _, Backbone, movieTemplate, MovieModel, YoutubeSearchModel, Handlebars) {


    var MovieView = Backbone.View.extend({

        el: $('#content'),

        initialize: function (movieId) {
            this.model = new MovieModel({id: movieId});
            this.listenTo(this.model, "change", this.render);
            this.model.fetch();

        },

        render: function () {

            //The data used in the template
            var template = Handlebars.compile(movieTemplate);

            // Call to Youtube's API
            var googleKey = "AIzaSyBG8B9W-Yw88Sj-kWm85l5xY4nsnocnGAA";
            // Encode the URI and replace the space by '+'
            var searchRequest = encodeURI(this.model.get('trackName') + ' trailer')
                .replace(/%20/g, '+');
            var requestURL = 'https://www.googleapis.com/youtube/v3/' +
                'search?part=snippet&maxResults=1&q=' +
                searchRequest +
                '&type=video&videoEmbeddable=true&key=' + googleKey;
            var youtubeSearchModel = new YoutubeSearchModel();
            youtubeSearchModel.urlRoot = requestURL;
            youtubeSearchModel.fetch();
            var trailerURL = 'https://youtube.com/watch?v=' + youtubeSearchModel.get('id').videoId;

            this.model.set('trailerURL', trailerURL);
            var source = this.model.attributes;
            var resultMovie = template(source);

            this.$el.html(resultMovie);
        }
    });
    return MovieView;

});