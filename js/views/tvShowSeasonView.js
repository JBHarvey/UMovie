/**
 * Created by Jean-Benoît on 16-02-07.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/tvshow.html',
    '../collections/tvShowEpisodeCollection',
    'views/thumbnailView',
    'models/tvShowEpisodeModel',
    'handlebars',
    'models/searchModel'
], function ($, _, Backbone, TvShowSeasonTemplate,TvShowEpisodeCollection,
             ThumbnailView, TvShowEpisodeModel, Handlebars, SearchModel) {

    var TvShowSeasonView = Backbone.View.extend({

        el: $('#content'),

        initialize: function () {

            var that = this;
            var seasonId = this.model.id;
            this.searchManager = new SearchModel();
            this.collection = new TvShowEpisodeCollection(seasonId);
            this.listenTo(this.model, "change", this.render);

            var syncRendering = _.after(2, function () {
                "use strict";
                that.render();
            });

            this.model.fetch({
                success: syncRendering
            });

            this.collection.fetch({
                success: syncRendering
            });
        },

        render: function () {
            var template = Handlebars.compile(TvShowSeasonTemplate);
            var source = this.model.attributes;
            var resultTvShowSeason = template(source);

            this.$el.html(resultTvShowSeason);
            this.collection.each(function(tvShowEpisode) {
                var thumbnail = new ThumbnailView({model: tvShowEpisode});
                $(".tvShow-episodes-box").append(thumbnail.renderEpisode());
            });
        }

    });
    return TvShowSeasonView;

});