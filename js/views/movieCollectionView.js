/**
 * Created by Jean-Benoît on 16-03-01.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'collections/movies',
    'views/thumbnailView',
    'handlebars',
    'models/searchModel'
], function ($, _, Backbone, Movies, ThumbnailView, Handlebars, searchModel) {


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
            var that = this;
            this.$el.html("");
            this.collection.each(function(movie){
                var thumbnail = new ThumbnailView({model: movie});
                that.$el.append(thumbnail.renderMovie());
            });
        },

        generateDefaultQuery: function() {
            return this.searchManager
                .setSearchType('movies')
                .setSearchName('dead')
                .setSearchLimit(100)
                .setSearchGenre('')
                .url();
        }
    });
    return MovieCollectionView;

});
