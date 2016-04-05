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
    'views/episodeView',
    'handlebars',
    'views/youtubeVideos',
], function ($, _, Backbone, MovieSeasonTemplate, EpisodeCollection,
             ThumbnailView, EpisodeModel, EpisodeView, Handlebars, YoutubeVideo) {
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
            var youtubeVideo = new YoutubeVideo(searchRequest, '.preview-element-video');
            this.collection.each(function (episode) {
                var thumbnail = new ThumbnailView({ model: episode });
                $('.episodes-box').append(thumbnail.render());

                var episodeId = episode.get('trackId');
                $('#idThumbnail').attr('id', episodeId);
            });
        },

        events: {
            'click .episode-box': 'accessEpisode'
        },

        accessEpisode: function (event) {
            console.log(event);
            var id = event.currentTarget.id;
            var selectedEpisodeId = parseInt(id);
            console.log(selectedEpisodeId );
            var selectedEpisodeModel = new EpisodeModel({ id: selectedEpisodeId });
            console.log(selectedEpisodeModel);
            console.log(selectedEpisodeModel.url());

            var episode = new EpisodeView({ model: selectedEpisodeModel});
            $('#modal-popup').append(episode.render());
        }

    });
    return SeasonView;

});
