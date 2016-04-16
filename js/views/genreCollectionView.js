/**
 * Created by rives on 4/15/2016.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    '../collections/genreCollection',
    'text!../templates/genre.html',
    'handlebars',
    'views/genreView',
], function ($, _, Backbone, Genres, GenreTemplates, Handlebars,  GenreView) {

    var GenreCollectionView = Backbone.View.extend({

        initialize: function () {
            var that = this;
            that.type = that.model;
            that.model = undefined;

            that.collection = new Genres();
            that.collection.url = function () {
                return "https://umovie.herokuapp.com/genres/" + that.type;
            };
            that.collection.fetch();
        },

        render: function () {

            var that = this;
            var result = '<div class="genre-browser">';

            that.collection.each(function (genre) {
                var genres = new GenreView({model: genre});
                result = `${result}${genres.render()}`;
            });
            result = `${result}</div>`;
            console.log(result);
            return result;
        },


    });
    return GenreCollectionView;


});