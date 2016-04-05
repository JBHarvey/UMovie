/**
 * Created by Jean-Benoît on 16-02-07.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/episode.html',
    'views/thumbnailView',
    'handlebars',
    'views/youtubeVideos',
], function ($, _, Backbone, EpisodeTemplate, ThumbnailView, Handlebars, YoutubeVideo) {
    'use strict';

    var EpisodeView = Backbone.View.extend({

        el: '#modal-popup',

        initialize: function () {

            this.listenTo(this.model, 'change', this.render);
            var syncRendering = _.after(2, function () {
                that.render();
            });

            this.model.fetch({
                success: syncRendering,
            });
        },

        generateSearchRequest: function () {
            return this.model.get('collectionName') + ' trailer';
        },

        render: function () {
            var searchRequest = this.generateSearchRequest();
            var youtubeVideo = new YoutubeVideo(searchRequest, '.episode-modal-preview');

            var source = this.model.attributes;
            var template = Handlebars.compile(EpisodeTemplate);
            var resultEpisode = template(source);
            this.$el.html(resultEpisode);
            console.log(this.$el);
        },

    });
    return EpisodeView;

});
