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

        initialize: function () {
            this.model = new WatchlistModel();
            this.listenTo(this.model, "change", this.render);
            this.listenTo(this.model, "sync", console.log('onSync!'));
            this.listenTo(this.model, "change", console.log('onChange!'));
            this.model.fetch();
        },

        render: function () {

            var template = Handlebars.compile(WatchlistTemplate);
            return template(this.model.attributes);
        },

        events: {
            "click .button-add-watchlist": "createWatchlist"
        },

        createWatchlist: function () {
            console.log("je click");
            console.log("Ajout de la watchlist");
            /*trouver l,info du nom de la watchlist a ajouter dans le document //ex:  var newName = $('.new-watchlist-name') */
            this.model = new WatchlistModel({name: newName, owner: `${Cookie.get('email')}`});

        },

        deleteWatchlist: function (id) {
            console.log("Suppression de la watchlist...")
        }


    });
    return WatchlistView;

});