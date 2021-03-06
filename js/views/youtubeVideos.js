define([
    'jquery',
    'underscore',
    'backbone',
], function ($, _, Backbone) {
    'use strict';

    var YoutubeVideo = Backbone.View.extend({

        initialize: function (searchRequest, className) {
            // Encode the URI of the search request
            this.searchRequest = encodeURI(searchRequest)
                .replace(/%20/g, '+')
                .replace(/((\+)?(\()?(%5B)?[uU]nrated(\))?(%5D)?)/g, '')    // Removes 'Unrated' from the request
                .replace(/%5B/g, '(')                                       // Replaces '[' by '('
                .replace(/%5D/g, ')');                                      // Replaces ']' by ')'

            this.className = className;
            gapi.client.setApiKey('AIzaSyBuDm3nSgIWP3SlJq4Z1Q0iwgubuUT_G9k');

            var that = this;
            gapi.client.load('youtube', 'v3', function () {
                that.getYoutubeVideo();
            });
        },

        getYoutubeVideo: function () {

            // Creates the query with the relevant parameters:
            // fields: Restrict the JSON fields
            // q: The search request
            // order: The order by which the results are ordered
            // maxResults: The maximum number of results
            // videoEmbeddable: Only allow the embeddable videos
            // part: The specific part
            // type: the type of the results
            var query = gapi.client.youtube.search.list({
                fields: 'items(id)',
                q: this.searchRequest,
                order: 'relevance',
                maxResults: 1,
                videoEmbeddable: true,
                part: 'snippet',
                type: 'video',
            });

            var that = this;
            query.execute(function (answer) {
                $(that.className).each(function () {
                    $(this).html(
                        '<iframe width="100%" class="w100 video" height="437" ' +
                        'src="//www.youtube.com/embed/' +
                        answer.items[0].id.videoId +
                        '" frameborder="0" allowfullscreen>' +
                        '</iframe>'
                    );
                });

                return this;
            });
        },
    });

    return YoutubeVideo;
});
