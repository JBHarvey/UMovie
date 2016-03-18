/**
 * Created by Vincent on 16-01-27.
 *
 * Object creation of a watchlist.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'collections/watchlists',
    'text!templates/watchlist.html',
    'text!templates/pageHeader.html',
    'views/watchlistView',
    'models/searchModel'
], function ($, _, Backbone, Handlebars, WatchLists, WatchlistTemplate, PageHeaderTemplate, WatchListView, searchModel) {
    var WatchlistCollectionView = Backbone.View.extend({

        el: $('#content'),

        initialize: function () {
            //this.searchManager = new searchModel();
            this.collection = new WatchLists();
            //this.collection.url = this.generateDefaultQuery();
            this.listenTo(this.collection, 'sync', this.render);
            this.collection.fetch();
        },

        render: function () {
            var pageHeaderTemplate = Handlebars.compile(PageHeaderTemplate);
            this.$el.html(pageHeaderTemplate(this.collection.pageHeader));

            var that = this;
            this.collection.each(function (watchlist) {
                var watchListView = new WatchListView(watchlist);
                that.$el.append(watchListView.render());
            });
        },

        generateDefaultQuery: function () {
            return this.searchManager.url();
        }
    });
    return WatchlistCollectionView;
});

