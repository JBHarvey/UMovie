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
            this.model = new MovieModel({trackId: movieId});
            this.watchlists = new Watchlists();
            //this.listenTo(this.model, "change", this.render);
            this.listenTo(this.watchlists, 'update', this.render);
            var syncRendering = _.after(2, function () {
                "use strict";
                that.render();
            });

            this.model.fetch({
                success: syncRendering
            });
            this.watchlists.fetch({
                success: syncRendering
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
            'click .myButton': 'toggleWatchlistMenu',
            'click .watchlist-button-desktop': 'toggleWatchlistMenu',
            'click .watchlist-select-group': 'addToWatchList',
            'keyup .new-watchlist-input': 'checkCreateWatchlistInput',
            'click .submit-new-watchlist': 'createNewWatchlist'
        },

        toggleWatchlistMenu: function (event) {
            "use strict";
            $('.watchlist-menu-group').toggle();
            $('.new-watchlist').hide();
        },

        addToWatchList: function (event) {
            "use strict";
            var selectedItem = event.currentTarget;
            var createWatchlistMenu = $('.new-watchlist');
            if (selectedItem.dataset.id === 'create-watchlist') {
                createWatchlistMenu.toggle();
            } else {
                createWatchlistMenu.hide();
            }
        },

        checkCreateWatchlistInput: function (event) {
            "use strict";
            var currentInputValue = event.currentTarget.value;
            var submitNewWatchlistButton = $('.submit-new-watchlist');
            if (/^((\w*\d*[^\s])+\s?)+$/.test(currentInputValue)) {
                submitNewWatchlistButton.prop('disabled', false);
            } else {
                submitNewWatchlistButton.prop('disabled', true);
            }
        },

        createNewWatchlist: function (event) {
            "use strict";

            var goodInputValue = document.getElementsByClassName('new-watchlist-input');
            goodInputValue = _.find(goodInputValue, function (inputValue) {
                return /^((\w*\d*[^\s])+\s?)+$/.test(inputValue.value);
            });

            var watchlist = new Watchlist({
                'name': goodInputValue.value
            });

            var that = this;
            watchlist.save(null, {
                success: function (data) {
                    that.watchlists.add(data);
                    that.model.save(null, {
                        watchlistID: watchlist.attributes.id
                    });
                }
            });
        }
    });
    return MovieView;

});