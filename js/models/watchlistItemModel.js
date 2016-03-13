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
        defaults:{
            movies: undefined,
            owner:{
                email: "hello@world.com",
                name: "Test Drive mate",
                id: -1
            },
            id: -1

        }

    });

    return WatchlistModel;
});