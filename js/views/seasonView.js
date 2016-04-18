/**
 * Created by Jean-Benoît on 16-02-07.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/movie-season.html',
    'collections/episodeCollection',
    'views/thumbnailView',
    'models/episodeModel',
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
                error : function (model, jqXHR) {
                    var parsedResponse = JSON.parse(jqXHR.responseText);
                    $("#error-message-movie").text('Erreur : ' + parsedResponse.message);
                }
            });

            this.collection.fetch({
                success: syncRendering,
                error : function (model, jqXHR) {
                    var parsedResponse = JSON.parse(jqXHR.responseText);
                    $("#error-message-movie").text('Erreur : ' + parsedResponse.message);
                }
            });
        },

        generateSearchRequest: function () {
            return this.model.get('collectionName') + ' trailer';
        },

        render: function () {
            var that = this;
            var searchRequest = this.generateSearchRequest();
            var template = Handlebars.compile(MovieSeasonTemplate);
            var source = that.model.attributes;
            var resultSeason = template(source);

            this.$el.html(resultSeason);
            var youtubeVideo = new YoutubeVideo(searchRequest, '.preview-element-video');

            that.collection.each(function (episode) {
                var thumbnail = new ThumbnailView({ model: episode });
                $('.episodes-box').append(thumbnail.render());

                var episodeId = episode.get('trackId');
                episode.set({ id: parseInt(episodeId) });
                $('#idThumbnail').attr('id', episodeId);
            });
        },

        events: {
            'click .episode-box': 'accessEpisode',
        },

        accessEpisode: function (event) {
            var id = event.currentTarget.id;
            var selectedEpisodeId = parseInt(id);
            var model = this.collection.get(selectedEpisodeId);
            var episode = new EpisodeView({ model: model });
            episode.render();
        },

    });
    return SeasonView;

});
