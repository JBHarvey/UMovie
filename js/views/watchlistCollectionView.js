//Definition of the watchlistCollectionView
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/watchlistItem.html',
    'text!templates/pageHeader.html',
    'handlebars',
    'collections/watchlists'
], function ($, _, Backbone, WatchlistTemplate ,PageHeaderTemplate ,Handlebars, watchlistCollection) {
        var WatchlistCollectionView = Backbone.View.extend({

    });

    return WatchlistCollectionView;
});

