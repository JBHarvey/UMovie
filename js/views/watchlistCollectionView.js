/**
 * Created by Vincent on 16-01-27.
 *
 * Object creation of a watchlist.
 */
//Definition of the watchlistCollectionView
define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'collections/watchlists',
    'text!templates/watchlist.html',
    'text!templates/pageHeader.html',
    'views/watchlistView'
], function ($, _, Backbone, Handlebars, WatchLists, WatchlistTemplate, PageHeaderTemplate, WatchListView) {
    var WatchlistCollectionView = Backbone.View.extend({

        el: $('#content'),

        initialize: function () {
            this.collection = new WatchLists();
            this.collection.url = this.generateDefaultQuery();
            this.listenTo(this.collection, 'sync', this.render);
            this.collection.fetch();
        },

        render: function () {
            var pageHeaderTemplate = Handlebars.compile(PageHeaderTemplate);

            this.$el.html(pageHeaderTemplate(this.collection.pageHeader));

            that = this;
            this.collection.each(function (watchlist) {
                var watchList = new WatchListView({model: watchlist});
                that.$el.append(watchList.render());
            });
        },

        generateDefaultQuery: function () {
            this.searchManager.setSearchType('movies');
            this.searchManager.setSearchName('dead');
            this.searchManager.setSearchLimit(100);
            this.searchManager.setSearchGenre('');
            return this.searchManager.url();
        }
    });
    return WatchlistCollectionView;
});

