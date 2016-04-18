/**
 * Created by Vincent on 16-01-27.
 *
 * Object creation of a watchlist.
 */

define([
    'underscore',
    'backbone',
], function (_, Backbone) {
    var WatchlistModel = Backbone.Model.extend({
        urlRoot: 'https://umovie.herokuapp.com/watchlists',

        parse: function (response) {

            this.error = function (jqXHR, textStatus) {
                $("#error-message-watchlist").text("Erreur : " + jqXHR.error);
            };

            if (_.isObject(response.results)) {
                return response.results[0];
            } else {
                return response;
            }


        },

        removeMovie: function (movieModel) {
            'use strict';
            this.set('movies', _.reject(this.get('movies'), function (movie) {
                return movie.trackId === movieModel.get('trackId');
            }));
        },

        convertDuration(duration) {
            return `${Math.ceil(duration / 60000)} minutes`;
        },

        releaseYear(date) {
            return new Date(date).getFullYear();
        },

    });

    return WatchlistModel;
});
