/**
 * Created by Jean-Benoît on 16-02-07.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/movie-tvshow.html',
    '../collections/tvShowEpisodeCollection',
    'views/thumbnailView',
    'models/tvShowEpisodeModel',
    'handlebars',
    'views/youtubeVideos',
], function ($, _, Backbone, MovieTvShowSeasonTemplate, TvShowEpisodeCollection,
             ThumbnailView, TvShowEpisodeModel, Handlebars, YoutubeVideo) {
    'use strict';

    var TvShowSeasonView = Backbone.View.extend({

        el: '#content',

        initialize: function () {

            var that = this;
            var seasonId = this.model.id;
            this.collection = new TvShowEpisodeCollection(seasonId);
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

            var template = Handlebars.compile(MovieTvShowSeasonTemplate);
            var source = this.model.attributes;
            var resultTvShowSeason = template(source);

            this.$el.html(resultTvShowSeason);
            var youtubeVideo = new YoutubeVideo(searchRequest, '.tvShow-season-video-preview');
            this.collection.each(function (tvShowEpisode) {
                var thumbnail = new ThumbnailView({ model: tvShowEpisode });
                $('.tvShow-episodes-box').append(thumbnail.renderEpisode());
            });
        },

    });
    return TvShowSeasonView;

});
