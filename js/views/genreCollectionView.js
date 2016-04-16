/**
 * Created by rives on 4/15/2016.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    '../collections/genreCollection',
    'text!../tempplates/genre.html',
    'views/genreView',
], function ($, _, Backbone, Genres, GenreTemplates, GenreView) {

    var GenreCollectionView = Backbone.View.extend({

        initialize: function () {
            var that = this;
            that.type = that.model.type;
            that.collection.url = function () {
                return "https://umovie.herokuapp.com/genres/" + that.newUrl;
            };

            that.collection = new Genres(type);

            //that.listenTo(this.collection, 'sync', that.render);
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