/**
 * Created by Jean-Benoît on 16-01-26.
 */

define('gapi', [
    'jquery',
    'underscore',
    'backbone',
    'text!templates/movie.html',
    'models/movieModel',
    'models/youtubeSearchModel',
    'handlebars',
    'async!https://apis.google.com/js/client.js!onload'
], function ($, _, Backbone, movieTemplate, MovieModel, YoutubeSearchModel, Handlebars, GoogleClient) {


    var MovieView = Backbone.View.extend({

        el: $('#content'),

        initialize: function (movieId) {
            this.model = new MovieModel({id: movieId});

            // Call to Youtube's API
            /*
            var googleKey = "AIzaSyBuDm3nSgIWP3SlJq4Z1Q0iwgubuUT_G9k";*/
            // Encode the URI and replace the space by '+'
            var searchRequest = encodeURI(this.model.get('trackName') + ' trailer')
                .replace(/%20/g, '+');
            /*
            var requestURL = 'https://www.googleapis.com/youtube/v3/' +
                'search?part=snippet&maxResults=1&q=' +
                searchRequest +
                '&type=video&videoEmbeddable=true&fields=items(id)&key=' + googleKey;
            var youtubeSearchModel = new YoutubeSearchModel();
            youtubeSearchModel.urlRoot = requestURL;
            */
            var trailerURL = undefined;
            /*
            youtubeSearchModel.fetch({
                success: function () {
                    "use strict";
                    trailerURL = 'https://youtube.com/watch?v=' + youtubeSearchModel.get('id').videoId;
                }
            });
            */
            var request = GoogleClient.client.youtube.search.list({
              q: searchRequest,
              part: 'snippet',
              maxResults: 1,
              type: 'video',
              videoEmbeddable: true,
              fields: 'items(id)'
            });
            console.log(GoogleClient);
            this.model.set('trailerURL', trailerURL);

            this.listenTo(this.model, "change", this.render);
            this.model.fetch();

        },

        render: function () {

            //The data used in the template
            var template = Handlebars.compile(movieTemplate);
            var source = this.model.attributes;
            var resultMovie = template(source);

            this.$el.html(resultMovie);
        }
    });
    return MovieView;

});