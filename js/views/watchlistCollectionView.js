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
    'models/searchModel',
    'models/watchlistModel'
], function ($, _, Backbone, Handlebars, WatchLists, WatchlistTemplate, PageHeaderTemplate, WatchListView, searchModel, WatchListModel) {

    var WatchlistCollectionView = Backbone.View.extend({
        el: $('#content'),

        initialize: function () {
            //this.searchManager = new searchModel();
            this.collection = new WatchLists();
            //this.collection.url = this.generateDefaultQuery();
            this.listenTo(this.collection, 'sync', this.render);
            this.listenTo(this.collection, 'update', this.render)
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
            that.$el.append('<button id="delete-watchlist" class="delete-btn btn"> Delete </button>');
        },

        events: {
            'click #delete-watchlist': 'deleteWatchlists',
            'keyup #add-watchlist-text': 'checkAddWatchlistText',
            'click #add-watchlist-button': 'addWatchlist'
        },

        deleteWatchlists: function (event) {
            "use strict";

            var checkedValues = $('.delete-watchlist-checkbox:checkbox:checked')
                .map(function() {
                    return this.value;
            }).get();

            var that = this;
            checkedValues.forEach(function (id) {
                var watchlist = that.collection.remove(id);
                watchlist.destroy();
            });
        },

        checkAddWatchlistText: function (event) {
            "use strict";
            var currentInputValue = event.currentTarget.value;
            var submitButton = $('#add-watchlist-button');
            if (/^((\w*\d*[^\s])+\s?)+$/.test(currentInputValue)) {
                submitButton.prop('disabled', false);
            } else {
                submitButton.prop('disabled', true);
            }
        },

        addWatchlist: function (event) {
            "use strict";
            var watchlistInput = $('#add-watchlist-text');
            var watchlist = new WatchListModel({
                name: watchlistInput.val()
            });

            var that = this;
            watchlist.save(null, {
                success: function (data) {
                    that.collection.add(data);
                }
            });
        },

        generateDefaultQuery: function () {
            return this.searchManager.url();
        }
    });

    return WatchlistCollectionView;
});

