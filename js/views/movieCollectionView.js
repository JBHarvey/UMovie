/**
 * Created by Jean-Benoît on 16-03-01.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    '../collections/movieCollection',
    'views/thumbnailView',
    'handlebars',
    'models/searchModel',
], function ($, _, Backbone, Movies, ThumbnailView, Handlebars, SearchModel) {

    var MovieCollectionView = Backbone.View.extend({

        el: '#content',

        prepareDefaultRendering: function (movieName) {
            var that = this;
            that.movieName = movieName;
            that.collection.url = that.generateSearchQuery(that.movieName);
            that.listenTo(this.collection, 'sync', that.render);
            that.collection.fetch();
        },

        initialize: function () {
            this.movieName = "";
            this.searchManager = new SearchModel();
            this.collection = new Movies();
            /*this.prepareDefaultRendering();*/
        },

        render: function () {
            var that = this;
            this.$el.html('');
            this.collection.each(function (movie) {
                var thumbnail = new ThumbnailView({ model: movie });
                that.$el.append(thumbnail.render());
            });
        },

        generateSearchQuery: function (movieName) {
            var that = this;
            var name = "";

            if(movieName){
                name = movieName;
            }
            else {
                name = "dead";
            }
            return that.searchManager
                .setSearchType('movies')
                .setSearchName(name)
                .setSearchLimit(10)
                .setSearchGenre('')
                .url();
        },
    });
    return MovieCollectionView;

});
