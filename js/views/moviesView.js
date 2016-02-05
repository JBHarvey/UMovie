/**
 * Created by Jean-Benoît on 2016-02-02.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'collections/movies',
    '',
], function ($, _, Backbone, Movies) {


    var MoviesView = Backbone.View.extend({

        el: $('#content'),

        initialize: function (collection) {
            this.collection = collection;
            console.log(collection);
            this.render();
        },

        render: function () {

            this.collection.each(function(movie) {
                console.log(movie);
            });
            this.$el.html(resultMovie);
        }
    });
    return MovieView;

});