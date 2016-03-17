/**
 * Created by Jean-Benoît on 16-01-26.
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
            // Encode the URI and replace the space by '+'
            var searchRequest = encodeURI(this.model.get('trackName') + ' trailer')
                .replace(/%20/g, '+');

            //The data used in the template
            var template = Handlebars.compile(movieTemplate);
            var source = this.model.attributes;
            var resultMovie = template(source);

            this.$el.html(resultMovie);

            var that = this;
            gapi.client.load("youtube", "v3", function () {
                "use strict";
                that.getYoutubeVideo(searchRequest);
            });
        },

        getYoutubeVideo: function (searchRequest) {
            "use strict";
            var query = gapi.client.youtube.search.list({
                fields: 'items(id)',
                q: searchRequest + " trailer",
                order: "relevance",
                maxResults: 1,
                videoEmbeddable: true,
                part: "snippet",
                type: "video"
            });

            query.execute(function (answer) {
                $('.movie-video-preview').each(function() {
                    $(this).html(
                        '<iframe width="100%" class="w100 video" height="350" ' +
                        'src="//www.youtube.com/embed/' +
                        answer.items[0].id.videoId +
                        '" frameborder="0" allowfullscreen>' +
                        '</iframe>'
                    );
                });
                return this;
            });
        }
    });
    return MovieView;

});