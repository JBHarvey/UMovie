/**
 * Created by Vincent on 16-01-27.
 *
 * This file creates the view of the Watchlist page. There will be a generic page that will be generated
 * in the case that no user is logged in. There will also be a personalized page if a user connection is
 * online.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!templates/watchlist.html',
    '../models/watchlistModel',
    'jscookie'
], function ($, _, Backbone, Handlebars, WatchlistTemplate, WatchlistModel, Cookie) {

    var WatchlistView = Backbone.View.extend({

        el: $('#content'),

        initialize: function (watchlist) {
            this.model = watchlist;
            /*this.listenTo(this.model, "change", this.render);
            this.listenTo(this.model, "sync", console.log('onSync!'));
            this.listenTo(this.model, "change", console.log('onChange!'));
            this.model.fetch();*/
        },

        render: function () {

            var template = Handlebars.compile(WatchlistTemplate);
            return template(this.model.attributes);
        },

        events: {
            "click .button-add-watchlist": "createWatchlist"
        },

        createWatchlist: function () {
            this.model = new WatchlistModel({
                name: newName,
                owner: `${Cookie.get('email')}`
            });
        },

        deleteWatchlist: function (id) {
        }


    });
    return WatchlistView;

});