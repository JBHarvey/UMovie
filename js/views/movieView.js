/**
 * Created by Jean-Benoît on 16-01-26.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/movie.html',
    'models/movieModel',
    'collections/watchlists',
    'models/watchlistModel',
    'handlebars'
], function ($, _, Backbone, movieTemplate, MovieModel, Watchlists, Watchlist, Handlebars) {


    var MovieView = Backbone.View.extend({

        el: $('#content'),

        initialize: function (movieId) {
            this.model = new MovieModel({id: movieId});
            this.watchlists = new Watchlists();
            this.listenTo(this.model, "change", this.render);
            this.model.fetch();
            this.watchlists.fetch();
        },

        render: function () {

            //The data used in the template
            var template = Handlebars.compile(movieTemplate);

            console.log(this.watchlists);
            var source = this.model.attributes;
            if (!_.isEmpty(this.watchlists.models)) {
                source.watchlists = this.watchlists.models;
            }
            var resultMovie = template(source);

            this.$el.html(resultMovie);
        },

        events: {
            'click watchlist-select-group': 'addToWatchList'
        },

        addToWatchList: function (event) {
            "use strict";
            
        }
    });
    return MovieView;

});