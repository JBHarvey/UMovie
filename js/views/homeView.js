/**
 * Created by Jean-Benoît on 2016-01-25.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/home.html',
    'models/homeModel',
    'handlebars',
    'models/searchModel',
    '../collections/movieCollection',
    'views/thumbnailView',
], function ($, _, Backbone, homeTemplate, HomeModel, Handlebars, SearchModel, Movies, ThumbnailView) {

    var HomeView = Backbone.View.extend({

        el: '#content',
        content : {category : [],},

        initialize: function () {
            this.searchManager = new SearchModel();
            this.collection = new Movies();
            this.collection.url = this.generateDefaultQuery();
            this.listenTo(this.collection, 'sync', this.render);
            this.collection.fetch();

        },

        render: function () {

            var that = this;
            this.$el.html('Trending now : <br/>');
            this.collection.each(function (movie) {
                var trendingThumbnails = new ThumbnailView({ model: movie });
                that.$el.append(trendingThumbnails.render());
            });

            that.$el.append('<div>Other users are also watching : </div><br/>');
            that.collection.each(function(movie){
                var otherWatchersThumbnails = new ThumbnailView({model : movie});
                that.$el.append(otherWatchersThumbnails.render());
            });


            console.log("render.");

        },

        generateDefaultQuery: function () {
            return this.searchManager
                .setSearchType('movies')
                .setSearchName('rings')
                .setSearchLimit(6)
                .setSearchGenre('')
                .url();
        },

        generateWatchingQuery: function (){
            return this.searchManager
            .setSearchType('movies')
            .setSearchName('rings')
            .setSearchLimit(6)
            .setSearchGenre('')
            .url();
        }

    });
    return HomeView;

});
