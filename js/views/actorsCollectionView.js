/**
 * Created by rives on 2016-03-10.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'collections/actorCollection',
    'views/thumbnailView',
    'handlebars',
    'views/tmdbData',
    'models/searchModel',
], function ($, _, Backbone, Actors, ThumbnailView, Handlebars, TmdbData, SearchModel) {
    'use strict';

    var ActorsCollectionView = Backbone.View.extend({

        el: '#content',

        initialize: function () {
            var that = this;
            that.actorName = '';
            that.searchManager = new SearchModel();
            that.collection = new Actors();
            that.collection.url = that.generateSearchQuery(that.actorName);
            that.listenTo(that.collection, 'sync', that.render);
            that.collection.fetch();

        },

        render: function () {
            var that = this;
            that.$el.html('');
            that.collection.each(function (actor) {
                var thumbnail = new ThumbnailView({ model: actor });

                that.$el.append(thumbnail.render());

                var tmdbData = new TmdbData();
                tmdbData.getTmdbActorData(actor.tmdbRequest, actor.imageId, actor.bioId);
            });
        },

        generateSearchQuery(actorName) {
            var that = this;
            var name = '';
            if (actorName) {
                name = actorName;
            } else {
                name = 'Xavier';
            }

            return this.searchManager
                .setSearchName(name)
                .setSearchType('actors')
                .setSearchLimit(10)
                .url();
        },
    });
    return ActorsCollectionView;
});
