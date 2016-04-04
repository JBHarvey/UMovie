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
], function ($, _, Backbone, EpisodeTemplate, ThumbnailView, Handlebars) {
    'use strict';

    var EpisodeView = Backbone.View.extend({

        el: '#content',

        initialize: function () {

            this.listenTo(this.model, 'change', this.render);
            var syncRendering = _.after(2, function () {
                that.render();
            });

            this.model.fetch({
                success: syncRendering,
            });
        },

        render: function () {
            var source = this.model.attributes;
            var template = Handlebars.compile(EpisodeTemplate);
            var resultEpisode = template(source);
            this.$el.html(resultEpisode);
        },

    });
    return EpisodeView;

});
