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
    'text!templates/watchlistItem.html',
    'text!templates/pageHeader.html',
    'handlebars',
    'models/watchlistItemModel'
], function ($, _, Backbone, WatchlistTemplate ,PageHeaderTemplate ,Handlebars, watchlistItemModel) {

    var WatchlistView = Backbone.View.extend({

        el: $('#content'),

        initialize: function () {
            this.render();
        },

        render: function () {
            var pageHeaderTemplate = Handlebars.compile(PageHeaderTemplate);
            var template = Handlebars.compile(WatchlistTemplate);
            var initial = new watchlistItemModel();

            // faire l'ajout du header.
            // var header = new PageHeaderTemplate
            var resultWatchlist = template(initial.defaults);

            //render le result avec le reste de la page.
            //this.$el.html(resultHeader);
            this.$el.html(resultWatchlist);

        },

        events: {
            "click .button-ajouter": "createWatchlist",
            "click .button-supprimer" : "deleteWatchlist"
        },

        createWatchlist: function () {
            console.log("Creation d'une nouvelle watchlist en cours.");

        },

        deleteWatchlist : function(id){
          console.log("Suppression de la watchlist...")
        }


    });
    return WatchlistView;

});