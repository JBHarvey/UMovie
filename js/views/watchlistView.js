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
    'text!templates/watchlistPage.html',
    'handlebars',
    '../models/watchlistItemModel'
], function ($, _, Backbone, watchlistTemplate, Handlebars, watchlistItemModel) {

    var WatchlistView = Backbone.View.extend({

    el: $('#content'),

    initialize: function() {
        this.render();
    },
    render : function(){
        var template = Handlebars.compile(watchlistTemplate);
        var initial = new watchlistModel();
        var resultWatchlist = template(initial.defaults);

        this.$el.html(resultWatchlist);



    }

});
  return WatchlistView;

});