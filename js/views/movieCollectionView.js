/**
 * Created by Jean-Benoît on 16-03-01.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/movie.html',
    'collections/movies',
    'handlebars'
], function ($, _, Backbone, movieTemplate, Movies, Handlebars) {


    var MovieCollectionView = Backbone.View.extend({

        el: $('#content'),

        initialize: function () {
            this.collection = new Movies();
            this.collection.url = function() {return "https://umovie.herokuapp.com/search/movies?q=ring";};
            this.collection.fetch();
            console.log(this.collection);
            this.render();
        },

        render: function () {


            console.log(this.collection);


            ////The data used in the template
            //var template = Handlebars.compile(movieTemplate);
            //
            //var source = new MovieModel();
            //var resultMovie = template(source.hardcode);
            //
            //this.$el.html(resultMovie);
        }
    });
    return MovieCollectionView;

});
