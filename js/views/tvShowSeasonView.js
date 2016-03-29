/**
 * Created by Jean-Benoît on 16-02-07.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/tvshow.html',
    '../models/tvShowSeasonModel',
    '../collections/tvShowEpisodeCollection',
    'views/thumbnailView',
    'models/tvShowEpisodeModel',
    'handlebars',
    'models/searchModel'
], function ($, _, Backbone, TvShowSeasonTemplate, TvShowSeasonModel,
             TvShowEpisodeCollection, ThumbnailView, TvShowEpisodeModel,
             Handlebars, SearchModel) {


    var TvShowSeasonView = Backbone.View.extend({

        el: $('#content'),

        initialize: function () {

            var seasonId = this.model.id;
            this.searchManager = new SearchModel();
            this.collection = new TvShowEpisodeCollection();
            this.collection.url = this.generateDefaultQuery();

            this.listenTo(this.model, "change", this.render);
            this.listenTo(this.collection, 'sync', this.render);
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

            that = this;
            var template = Handlebars.compile(TvShowSeasonTemplate);
            var source = this.model.attributes;
            var resultTvShowSeason = template(source);

            this.$el.html(resultTvShowSeason);
            this.collection.each(function(tvShowEpisode) {
                var thumbnail = new ThumbnailView({model: tvShowEpisode});
                that.$el.append(thumbnail.renderEpisode());
            });
        },

        generateDefaultQuery: function() {
            this.searchManager.setSearchType('tvshows/episodes');
            this.searchManager.setSearchName('Rome');
            this.searchManager.setSearchLimit(10);
            this.searchManager.setSearchGenre('');
            console.log(this.searchManager.url());
            return this.searchManager.url();
        }
    });
    return TvShowSeasonView;

});