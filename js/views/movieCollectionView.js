/**
 * Created by Jean-Benoît on 16-03-01.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'collections/movies',
    'views/movieThumbnailView',
    'handlebars',
    'models/searchModel'
], function ($, _, Backbone, Movies, MovieThumbnailView, Handlebars, searchModel) {


    var MovieCollectionView = Backbone.View.extend({

        el: $('#content'),

        initialize: function () {
            this.searchManager = new searchModel();
            this.collection = new Movies();
            this.collection.url = this.generateDefaultQuery();
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
        },

        generateDefaultQuery: function() {
            this.searchManager.setSearchType('movies');
            this.searchManager.setSearchName('dead');
            this.searchManager.setSearchLimit(0);
            this.searchManager.setSearchGenre('');
            return this.searchManager.url();
        }
    });
    return MovieCollectionView;

});
