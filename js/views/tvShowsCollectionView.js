/**
 * Created by Jean-Benoît on 16-03-01.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    '../collections/tvShowCollection',
    'views/thumbnailView',
    'handlebars',
    'models/searchModel',
], function ($, _, Backbone, TvShows, ThumbnailView, Handlebars, SearchModel) {

    var TvShowsCollectionView = Backbone.View.extend({

        el: '#content',

        initialize: function () {
            this.searchManager = new SearchModel();
            this.collection = new TvShows();
            this.collection.url = this.generateDefaultQuery();
            this.listenTo(this.collection, 'sync', this.render);
            this.collection.fetch();
        },

        render: function () {
            var that = this;
            this.$el.html("");
            this.collection.each(function(tvShows){
                var thumbnail = new ThumbnailView({model: tvShows});
                that.$el.append(thumbnail.renderSeason());
            });
        },

        generateDefaultQuery: function () {
            return this.searchManager
                .setSearchType('tvshows/seasons')
                .setSearchName('dead')
                .setSearchLimit(100)
                .setSearchGenre('')
                .url();
        },
    });
    return TvShowsCollectionView;

});
