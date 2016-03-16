/**
 * Created by Jean-Benoît on 16-01-26.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/movie.html',
    'models/movieModel',
    'collections/watchlists',
    'models/watchlistModel',
    'handlebars'
], function ($, _, Backbone, movieTemplate, MovieModel, Watchlists, Watchlist, Handlebars) {


    var MovieView = Backbone.View.extend({

        el: $('#content'),

        initialize: function (movieId) {
            var that = this;
            this.model = new MovieModel({id: movieId});
            this.watchlists = new Watchlists();
            this.listenTo(this.model, "change", this.render);
            this.model.fetch();
            this.watchlists.fetch({
                success: function () {
                    that.listenTo(that.watchlists, 'update', that.render);
                }
            });
        },

        render: function () {

            //The data used in the template
            var template = Handlebars.compile(movieTemplate);

            var source = this.model.attributes;
            if (!_.isEmpty(this.watchlists.models)) {
                source.watchlists = this.watchlists.models;
            }
            var resultMovie = template(source);

            this.$el.html(resultMovie);
        },

        events: {
            'click .watchlist-select-group': 'addToWatchList',
            'keyup .new-watchlist-input': 'checkCreateWatchlistInput',
            'click .submit-new-watchlist': 'createNewWatchlist'
        },

        addToWatchList: function (event) {
            "use strict";
            console.log("Helo");
            var selectedItem = event.currentTarget;
            var createWatchlistMenu = $('.new-watchlist');
            if (selectedItem.value === 'create-watchlist') {
                createWatchlistMenu.show();
            } else {
                createWatchlistMenu.hide();
            }
        },

        checkCreateWatchlistInput: function (event) {
            "use strict";
            var currentInputValue = event.currentTarget.value;
            var submitNewWatchlistButton = $('.submit-new-watchlist');
            if (/^(\w+?\d+?)+$/.test(currentInputValue)) {
                submitNewWatchlistButton.prop('disabled', false);
            } else {
                submitNewWatchlistButton.prop('disabled', true);
            }
        },

        createNewWatchlist: function (event) {
            "use strict";

            var goodInputValue = document.getElementsByClassName('new-watchlist-input');
            goodInputValue = _.filter(goodInputValue, function (inputValue) {
                return /^(\w+?\d+?)+$/.test(goodInputValue.value);
            });

            var watchlist = new Watchlist({
                'name': goodInputValue.value
            });

            var that = this;
            watchlist.save({
                wait: true,
                success: function (data) {
                    console.log(watchlist);
                    that.watchlists.add(watchlist);
                }
            });
        }
    });
    return MovieView;

});