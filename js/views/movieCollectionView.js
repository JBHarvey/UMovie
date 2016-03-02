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
            this.listenTo(this.collection.model, 'add', this.updateTest);
            this.collection = new Movies();
            this.collection.url = function() {return "https://umovie.herokuapp.com/search/movies?q=ring";};
            this.collection.fetch();
            this.render();
        },

        render: function () {
            console.log(this.collection);
            this.collection.each(function(movie){
                //var movieView = new MovieThumbnailView({model: movie});
                console.log(new MovieThumbnailView({model: movie}));
            });
        },
        i:0,
        updateTest() {
            console.log(i++);
            this.collection.each(function(movie){
                //var movieView = new MovieThumbnailView({model: movie});
                console.log(new MovieThumbnailView({model: movie}));
            });
        }
    });
    return MovieCollectionView;

});
