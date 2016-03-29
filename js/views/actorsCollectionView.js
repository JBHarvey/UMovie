/**
 * Created by rives on 2016-03-10.
 */



define([
    'jquery',
    'underscore',
    'backbone',
    '../collections/actorCollection',
    'views/thumbnailView',
    'handlebars',
    'views/tmdbData',
    'models/searchModel'
], function ($, _, Backbone, Actors, ThumbnailView, Handlebars, TmdbData, searchModel) {

    var ActorsCollectionView = Backbone.View.extend({

        el: $('#content'),

        initialize: function() {
            this.searchManager = new searchModel();
            this.collection = new Actors();
            this.collection.url = this.generateDefaultQuery();
            this.listenTo(this.collection, 'sync', this.render);
            this.collection.fetch();
        },

        render: function() {
            var that = this;
            var tmdbData;
            this.$el.html("");
            this.collection.each(function(actor){
                var thumbnail = new ThumbnailView({model: actor});
                that.$el.append(thumbnail.renderActor());
                //console.log(actor.attributes.artistName);
                var searchRequest = encodeURI(actor.attributes.artistName);
                tmdbData = new TmdbData(searchRequest, '.imageThumbnail', '.shortBio', actor);

            });

        },

        generateDefaultQuery: function() {
            this.searchManager.setSearchType('actors');
            this.searchManager.setSearchName('Ron Jeremy');
            this.searchManager.setSearchLimit(15);
            return this.searchManager.url();

        }
    });
    return ActorsCollectionView;
});