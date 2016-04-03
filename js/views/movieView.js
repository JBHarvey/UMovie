/**
 * Created by Jean-Benoît on 16-01-26.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/movie-season.html',
    'models/movieModel',
    '../collections/watchlistCollection',
    'models/watchlistModel',
    'views/youtubeVideos',
    'handlebars',
], function ($, _, Backbone, movieTemplate, MovieModel, Watchlists, Watchlist, YoutubeVideo, Handlebars) {

    var MovieView = Backbone.View.extend({

        el: '#content',

        initialize: function () {

            var that = this;
            this.watchlists = new Watchlists();
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.watchlists, 'update', this.render);
            var syncRendering = _.after(2, function () {
                'use strict';
                that.render();
            });

            this.model.fetch({
                success: syncRendering,
            });
            this.watchlists.fetch({
                success: syncRendering,
            });
        },

        generateSearchRequest: function () {
            return this.model.get('trackName') + ' trailer';
        },

        render: function () {
            var searchRequest = this.generateSearchRequest();

            //The data used in the template
            var template = Handlebars.compile(movieTemplate);
            var source = this.model.attributes;
            if (!_.isEmpty(this.watchlists.models)) {
                // Only returns the watchlist which do not already contain the movie
                var that = this;
                source.watchlists = _.filter(this.watchlists.models, function (model) {
                    return !(_.some(model.attributes.movies, function (movie) {
                        return that.model.get('trackId') === movie.trackId;
                    }));
                });
            }

            var resultMovie = template(source);
            this.$el.html(resultMovie);

            // Adds the youtube trailer to the right HTML tag with the corresponding class
            var youtubeVideo = new YoutubeVideo(searchRequest, '.preview-element-video');
        },

        events: {
            'click .myButton': 'toggleWatchlistMenu',
            'click .watchlist-button-desktop': 'toggleWatchlistMenu',
            'click .watchlist-select-group': 'addToWatchList',
            'keyup .new-watchlist-input': 'checkCreateWatchlistInput',
            'click .submit-new-watchlist': 'createNewWatchlist',
        },

        toggleWatchlistMenu: function (event) {
            'use strict';
            $('.watchlist-menu-group').toggle();
            $('.new-watchlist').hide();
        },

        addToWatchList: function (event) {
            'use strict';
            var selectedItem = event.currentTarget;
            var $createWatchlistMenu = $('.new-watchlist');
            if (selectedItem.dataset.id === 'create-watchlist') {
                $createWatchlistMenu.toggle();
            } else {
                $createWatchlistMenu.hide();
                let that = this;
                this.model.save(null, {
                    watchlistID: selectedItem.dataset.id,
                    success: function (data) {
                        that.watchlists.get(selectedItem.dataset.id)
                            .get('movies')
                            .push(that.model.attributes);
                        that.render();
                    },
                });
            }
        },

        checkCreateWatchlistInput: function (event) {
            'use strict';
            var currentInputValue = event.currentTarget.value;
            var $submitNewWatchlistButton = $('.submit-new-watchlist');
            if (/^((\w*\d*[^\s])+\s?)+$/.test(currentInputValue)) {
                $submitNewWatchlistButton.prop('disabled', false);
            } else {
                $submitNewWatchlistButton.prop('disabled', true);
            }
        },

        createNewWatchlist: function (event) {
            'use strict';

            var goodInputValue = document.getElementsByClassName('new-watchlist-input');
            goodInputValue = _.find(goodInputValue, function (inputValue) {
                return /^((\w*\d*[^\s])+\s?)+$/.test(inputValue.value);
            });

            var watchlist = new Watchlist({
                name: goodInputValue.value,
            });

            var that = this;
            watchlist.save(null, {
                success: function (data) {
                    that.watchlists.add(data);
                    that.model.save(null, {
                        watchlistID: watchlist.attributes.id,
                    });
                },
            });
        },

    });
    return MovieView;

});
