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
            title: 'Your Watchlist',
            movies: 'Your movies',
            tvSeries: 'Your TV Series',
            defaultTextMovies: 'You have no movie in your watchlist.',
            defaultTextTvSeries: 'You have no TV series in your watchlist.'

        }
    });

    return WatchlistModel;
});