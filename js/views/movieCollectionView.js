/**
 * Created by Jean-Benoît on 16-03-01.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'collections/movies',
    'views/movieThumbnailView',
    'handlebars'
], function ($, _, Backbone, Movies, MovieThumbnailView, Handlebars) {


    var MovieCollectionView = Backbone.View.extend({

        el: $('#content'),

        initialize: function () {
            this.collection = new Movies();
            this.collection.url = function() {return "https://umovie.herokuapp.com/search/movies?q=ring";};
            this.listenTo(this.collection, 'sync', this.render);
            this.collection.fetch();
        },

        render: function () {
            console.log(this.collection);
            this.collection.each(function(movie){
                var movieThumbnail = new MovieThumbnailView({model: movie}).$el;
                console.log(movieThumbnail.html.toString());
            });
        }
    });
    return MovieCollectionView;

});
