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
    'models/watchlistModel',
    'models/movieModel',
    'collections/movies'
], function ($, _, Backbone, Handlebars, WatchLists, WatchlistTemplate, PageHeaderTemplate, WatchListView, WatchListModel, MovieModel, MovieCollection) {

    var WatchlistCollectionView = Backbone.View.extend({
        el: $('#content'),

        initialize: function () {
            this.collection = new WatchLists();
            //this.listenTo(this.collection, 'sync', this.render);
            this.listenTo(this.collection, 'update', this.render);
            this.listenTo(this.collection, 'change', this.render);
            this.collection.fetch({
                success: this.render
            });
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
            'click #add-watchlist-button': 'addWatchlist',
            'click .remove-watchlist-movie': 'removeWatchlistMovie'
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

        removeWatchlistMovie: function (event) {
            "use strict";
            var checkedValues = $('.delete-watchlist-movie-checkbox:checkbox:checked')
                .map(function() {
                    return {
                        "movieID": this.value,
                        "watchlistID": this.dataset.id
                    };
                }).get();

            var that = this;
            checkedValues.forEach(function (idObject) {
                //var watchlist = that.collection.get(idObject.watchlistID);
                //var movies = new MovieCollection(watchlist.get('movies'));
                var movies = new MovieCollection(that.collection
                    .get(idObject.watchlistID)
                    .get('movies'));
                var movie = movies.get(idObject.movieID);
                //watchlist.removeMovie(movie);
                that.collection.get(idObject.watchlistID).removeMovie(movie);
                // Strangely, we have to set the URL or it doesn't work...
                // Although it works with the save method...
                movie.url = 'https://umovie.herokuapp.com/watchlists/' +
                        idObject.watchlistID + '/movies/' + idObject.movieID;
                movie.destroy();
            });
        }
    });

    return WatchlistCollectionView;
});

