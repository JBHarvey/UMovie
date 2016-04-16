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

        initialize: function () {
            var that = this;
            that.movieName = '';
            that.searchManager = new SearchModel();
            that.collection = new Movies();
            that.collection.url = that.generateSearchQuery(that.movieName);
            that.listenTo(this.collection, 'sync', that.render);
            that.collection.fetch();

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
