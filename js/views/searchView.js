/**
 * Created by Jean-Benoît on 16-03-08.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'collections/movies',
    'views/movieThumbnailView',
    'handlebars'
], function ($, _, Backbone, Movies, MovieThumbnailView, Handlebars) {


    var SearchView = Backbone.View.extend({

        el: $('#content'),

        initialize: function () {
            this.collection = new Movies();
            this.collection.url = this.collection.moviesDefaultQuery;
            this.listenTo(this.collection, 'sync', this.render);
            this.collection.fetch();
        },

        render: function () {
            that = this;
            this.$el.html("");
            this.collection.each(function(movie){
                var movieThumbnail = new MovieThumbnailView({model: movie});
                that.$el.append(movieThumbnail.render());
            });
        }
    });
    return SearchView;

});
