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
            this.searchManager = new SearchModel();
            this.collection = new Movies();
            this.collection.url = this.generateDefaultQuery();
            this.listenTo(this.collection, 'sync', this.render);
            this.collection.fetch();
        },

        render: function () {
            var that = this;
            this.$el.html('');
            this.collection.each(function (movie) {
                var thumbnail = new ThumbnailView({ model: movie });
                that.$el.append(thumbnail.render());
            });
        },

        generateDefaultQuery: function () {
            return this.searchManager
                .setSearchType('movies')
                .setSearchName('night')
                .setSearchLimit(100)
                .setSearchGenre('')
                .url();
        },
    });
    return MovieCollectionView;

});
