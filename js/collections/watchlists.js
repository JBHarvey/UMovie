/**
 * Created by Vincent on 16-03-10.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'jscookie',
    '../models/watchlistModel'
], function ($, _, Backbone, Cookie, WatchListModel) {

    var Watchlists = Backbone.Collection.extend({
        model: WatchListModel,
        url: '/watchlists',

        parse: function (response) {
            return response.results;
        },

        pageHeader: {
            option: [
                {optionClass: 'add-watchlist', action: 'Ajouter'}]
        }
    });
    return Watchlists;

});
