/**
 * Created by Jean-Benoît on 16-03-01.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    '../collections/seasonCollection',
    'views/thumbnailView',
    'handlebars',
    'models/searchModel',
], function ($, _, Backbone, Seasons, ThumbnailView, Handlebars, SearchModel) {

    var SeasonCollectionView = Backbone.View.extend({

        el: '#content',

        initialize: function () {
            this.searchManager = new SearchModel();
            this.collection = new Seasons();
            this.collection.url = this.generateDefaultQuery();
            this.listenTo(this.collection, 'sync', this.render);
            this.collection.fetch();
        },

        render: function () {
            var that = this;
            this.$el.html('');
            this.collection.each(function (season) {
                var thumbnail = new ThumbnailView({ model: season });
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
    return SeasonCollectionView;

});
