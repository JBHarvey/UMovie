/**
 * Created by Vincent on 16-01-27.
 *
 * Object creation of a watchlist.
 */

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    var WatchlistModel = Backbone.Model.extend({
        urlRoot: "https://umovie.herokuapp.com/watchlists",

        parse: function (response) {
            if (response.results != undefined) {
                return response.results[0];
            } else {
                return response;
            }
        }
    });

    return WatchlistModel;
});