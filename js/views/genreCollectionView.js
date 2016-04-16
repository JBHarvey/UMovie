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
            that.type = that.newUrl;
            console.log("Entre");
            console.log(that.type);
            console.log(that.newUrl);
            that.collection = new Genres();
            that.collection.url = function () {
                return "https://umovie.herokuapp.com/genres/" + that.newUrl;
            };


            that.collection.fetch();
        },

        render: function () {
            var that = this;
            var result = '';
            that.collection.each(function (genre) {
                var genres = new GenreView({model: genre});
                result.append(genres.render());
            });
            return result;
        },


    });
    return GenreCollectionView;


});