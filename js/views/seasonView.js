/**
 * Created by Jean-Benoît on 16-02-07.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/movie-season.html',
    '../collections/episodeCollection',
    'views/thumbnailView',
    '../models/episodeModel',
    'handlebars',
    'views/youtubeVideos',
], function ($, _, Backbone, MovieSeasonTemplate, EpisodeCollection,
             ThumbnailView, EpisodeModel, Handlebars, YoutubeVideo) {
    'use strict';

    var SeasonView = Backbone.View.extend({

        el: '#content',

        initialize: function () {

            var that = this;
            var seasonId = this.model.id;
            this.collection = new EpisodeCollection(seasonId);
            this.listenTo(this.model, 'change', this.render);

            var syncRendering = _.after(2, function () {
                that.render();
            });

            this.model.fetch({
                success: syncRendering,
            });

            this.collection.fetch({
                success: syncRendering,
            });
        },

        generateSearchRequest: function () {
            return this.model.get('collectionName') + ' trailer';
        },

        render: function () {
            var searchRequest = this.generateSearchRequest();

            var template = Handlebars.compile(MovieSeasonTemplate);
            var source = this.model.attributes;
            var resultSeason = template(source);

            this.$el.html(resultSeason);
            var youtubeVideo = new YoutubeVideo(searchRequest, '.tvShow-season-video-preview');
            this.collection.each(function (episode) {
                var thumbnail = new ThumbnailView({ model: episode });
                $('.episodes-box').append(thumbnail.render());
            });
        },

    });
    return SeasonView;

});
