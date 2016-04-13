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
    '../collections/movieCollection',
    'views/thumbnailView',
], function ($, _, Backbone, Handlebars, WatchlistTemplate, Movies, ThumbnailView) {

    var WatchlistView = Backbone.View.extend({

        initialize: function (watchlist) {
            this.model = watchlist;
            this.collection = new Movies();
            this.collection.set(this.model.attributes.movies)
        },

        render: function () {
            var that = this;
            var template = Handlebars.compile(WatchlistTemplate);
            var partialHtml = template(this.model.attributes);

            /*Cuts open the template*/
            var name = that.model.attributes.name;
            var idName = `${name}-watchlist-movies">`;
            var placeToCut = partialHtml.indexOf(idName) + idName.length;
            var renderedHtml = partialHtml.slice(0, placeToCut);

            /*Adds the movies thumbnail*/
            this.collection.each(function (movie) {
                var attr = movie.attributes;
                movie.attributes.convertDuration = movie.convertDuration(attr.trackTimeMillis);
                movie.attributes.releaseYear = movie.releaseYear(attr.releaseDate);
                movie.attributes.routingRef = `#movie/${attr.trackId}`;
                movie.attributes.entertainementName = attr.trackName;
                movie.attributes.cssClassType = 'special-movie movies';
                console.log(movie);

                var thumbnail = new ThumbnailView({model: movie});
                renderedHtml = `${renderedHtml} ${thumbnail.render()}`;
            });

            /*Closes up the template*/
            renderedHtml = `${renderedHtml} ${partialHtml.slice(placeToCut, -1)}`;

            return renderedHtml;
        },

    });

    return WatchlistView;
});
