/**
 * Created by Jean-Benoît on 16-02-07.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/tvshowEpisode.html',
    '../models/tvShowEpisodeModel',
    '../collections/tvShowEpisodeCollection',
    'views/thumbnailView',
    'models/tvShowEpisodeModel',
    'handlebars',
    'models/searchModel'
], function ($, _, Backbone, TvShowEpisodeTemplate, TvShowEpisodeModel,
             TvShowEpisodeCollection, ThumbnailView, TvShowEpisodeModel,
             Handlebars, SearchModel) {


    var TvShowEpisodeView = Backbone.View.extend({

        el: $('#content'),

        initialize: function () {

            var episodeId = this.model.id;

            this.listenTo(this.model, "change", this.render);
            var syncRendering = _.after(2, function () {
                "use strict";
                that.render();
            });

            this.model.fetch({
                success: syncRendering
            });

        },

        render: function () {
            var source = this.model.attributes;
            var template = Handlebars.compile(TvShowEpisodeTemplate);
            var resultTvShowEpisode = template(source);

            this.$el.html(resultTvShowEpisode);

        },

    });
    return TvShowEpisodeView;

});