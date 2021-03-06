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
    'collections/watchlistCollection',
    'text!templates/watchlist.html',
    'text!templates/pageHeader.html',
    'views/watchlistView',
    'models/watchlistModel',
    'models/movieModel',
    'collections/movieCollection',
], function ($, _, Backbone, Handlebars, WatchLists, WatchlistTemplate, PageHeaderTemplate, WatchListView, WatchListModel, MovieModel, MovieCollection) {
    'use strict';

    var WatchlistCollectionView = Backbone.View.extend({
        el: '#content',

        initialize: function () {
            this.collection = new WatchLists();

            var that = this;

            var sync = _.after(1, function () {
                that.render();
                that.listenTo(that.collection, 'change', that.render);
                that.listenTo(that.collection, 'update', that.render);
            });

            this.collection.fetch({
                success: sync,
                error: function (model, jqXHR) {
                    var parsedResponse = JSON.parse(jqXHR.responseText);
                    $('#error-message-movie').text('Erreur : ' + parsedResponse.message);
                },
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

            that.$el.append('<button id="delete-watchlist" class="delete-btn btn"> Delete Watchlists</button>');

        },

        events: {
            'click #delete-watchlist': 'deleteWatchlists',
            'keyup #add-watchlist-text': 'checkAddWatchlistText',
            'click #add-watchlist-button': 'addWatchlist',
            'click .remove-watchlist-movie': 'removeWatchlistMovie',
            'dblclick .watchlist-title': 'editWatchlist',
            'click .watchlist-edit-button': 'editWatchlist',
            'click .watchlist-cancel': 'cancelEditing',
            'keyup .watchlist-title-input': 'checkChangeTitleText',
            'click .watchlist-submit-button': 'submitChanges',
        },

        isTextValid: function (selectorName, inputText) {
            var $submitButton = $(selectorName);
            if (/^((\w*\d*[^\s])+\s?)+$/.test(inputText)) {
                $submitButton.prop('disabled', false);
            } else {
                $submitButton.prop('disabled', true);
            }
        },

        deleteWatchlists: function (event) {
            var $checkedValues = $('.delete-watchlist-checkbox:checkbox:checked')
                .map(function () {
                    return this.value;
                }).get();

            var that = this;
            $checkedValues.forEach(function (id) {
                var watchlist = that.collection.remove(id);
                watchlist.destroy();
            });
        },

        checkAddWatchlistText: function (event) {
            var currentInputValue = event.currentTarget.value;
            this.isTextValid('#add-watchlist-button', currentInputValue);
        },

        addWatchlist: function (event) {
            var $watchlistInput = $('#add-watchlist-text');
            var watchlist = new WatchListModel({
                name: $watchlistInput.val(),
            });

            var that = this;
            watchlist.save(null, {
                success: function (data) {
                    that.collection.add(data);
                },
            });
        },

        removeWatchlistMovie: function (event) {
            var currentButton = event.currentTarget;

            var checkedValues = $('.delete-watchlist-movie-checkbox:checkbox:checked')
                .map(function () {
                    return {
                        movieID: this.value,
                        watchlistID: this.dataset.id,
                    };
                }).get();

            checkedValues = checkedValues.filter(function (idObject) {
                return idObject.watchlistID === currentButton.dataset.id;
            });

            var that = this;
            var movies = new MovieCollection(that.collection
                .get(currentButton.dataset.id)
                .get('movies'));

            checkedValues.forEach(function (idObject) {
                var movie = movies.get(idObject.movieID);
                that.collection.get(idObject.watchlistID).removeMovie(movie);

                // Strangely, we have to set the URL or it doesn't work...
                // Although it works with the save method...
                movie.url = `https://umovie.herokuapp.com/watchlists/${idObject.watchlistID}'/movies/'${idObject.movieID}`;
                movie.destroy();
            });
        },

        editWatchlist: function (event) {
            var previousWatchlist = document.getElementsByClassName('watchlist-title-box');
            previousWatchlist = Array.prototype.filter.call(previousWatchlist, function (element) {
                return element.getElementsByClassName('watchlist-title-input').length;
            });

            if (previousWatchlist.length) {
                previousWatchlist = previousWatchlist[0];
                var previousWatchlistModel = this.collection.get(previousWatchlist.dataset.id);
                previousWatchlist.innerHTML = '<h4 class="watchlist-title">' +
                    previousWatchlistModel.get('name') + '</h4><button class="watchlist-edit-button btn submit-btn" ' +
                    'type="button">Edit</button>';
            }

            var currentTargetParent = event.currentTarget.parentElement;
            var currentWatchlist = this.collection.get(currentTargetParent.dataset.id);

            currentTargetParent.innerHTML = '<input class="watchlist-title-input submit-bar" value="' +
                currentWatchlist.get('name') + '" type="text" placeholder="Enter watchlist name">';
            currentTargetParent.insertAdjacentHTML('beforeend', '<button class="watchlist-submit-button submit-btn" ' +
                'type="button" disabled="disabled">Submit</button>');
            currentTargetParent.insertAdjacentHTML('beforeend', '<button type="button" class="watchlist-cancel button-cancel"></button>');
        },

        cancelEditing: function (event) {
            var currentTargetParent = event.currentTarget.parentElement;
            var currentWatchlist = this.collection.get(currentTargetParent.dataset.id);
            currentTargetParent.innerHTML = '<h4 class="watchlist-title">' + currentWatchlist.get('name') + '</h4>' +
                '<button class="watchlist-edit-button btn submit-btn" type="button">Edit</button>';
        },

        checkChangeTitleText: function (event) {
            var currentInputValue = event.currentTarget.value;
            this.isTextValid('.watchlist-submit-button', currentInputValue);
        },

        submitChanges: function (event) {
            var inputElement = event.currentTarget.previousSibling;
            var parentElement = event.currentTarget.parentElement;
            var currentWatchlist = this.collection.get(parentElement.dataset.id);
            currentWatchlist.set('name', inputElement.value);
            currentWatchlist.save();
        },
    });

    return WatchlistCollectionView;
});

