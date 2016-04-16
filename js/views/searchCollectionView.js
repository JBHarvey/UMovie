/**
 * Created by Jean-Benoît on 16-03-01.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'views/thumbnailView',
    'views/tmdbData',
], function ($, _, Backbone, ThumbnailView, Tmdb) {

    var SearchCollectionView = Backbone.View.extend({

        initialize: function () {
            var that = this;
            that.listenTo(this.collection, 'sync', that.render);
            that.collection.fetch();
        },

        render: function () {
            var that = this;

            this.removeNoResultFoundsMessage();
            if (_.isObject(that.genreCollectionView)) {
                //ICI**********
                document.getElementById('#').html(that.genreCollectionView.render());
            }
            this.collection.each(function (model) {
                var thumbnail = new ThumbnailView({model: model});
                that.$el.append(thumbnail.render());
                if (model.attributes.tmdbRequest) {
                    var tmdb = new Tmdb();
                    tmdb.getTmdbActorData(model.attributes.tmdbRequest, model.attributes.imageId, model.attributes.bioId);
                }

            });
        },

        removeNoResultFoundsMessage: function () {
            var that = this;
            if (that.collection.length != 0){
                that.$el.html('');
            }

        },


    });
    return SearchCollectionView;

});

/*
 newCollection.afterRenderCallback = function () {
 tmdbData.getTmdbActorData(actor.tmdbRequest, actor.imageId, actor.bioId);
 };
 */