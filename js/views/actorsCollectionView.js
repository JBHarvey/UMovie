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
    'models/searchModel',
], function ($, _, Backbone, Actors, ThumbnailView, Handlebars, TmdbData, SearchModel) {
    'use strict';

    var ActorsCollectionView = Backbone.View.extend({

        el: '#content',

        initialize: function (actorName) {
            var that = this;
            that.actorName = actorName;
            that.searchManager = new SearchModel();
            that.collection = new Actors();

            if (!actorName) {
                that.collection.url = that.generateDefaultQuery();
            }
            else{
                that.collection.url = that.generateSearchQuery(that.actorName);
            }

            that.listenTo(that.collection, 'sync', this.render);
            that.collection.fetch();
        },

        render: function () {
            var that = this;
            that.$el.html('');
            that.collection.each(function (actor) {
                var thumbnail = new ThumbnailView({ model: actor });

                that.$el.append(thumbnail.render());

                var artistName = actor.get('artistName');
                var nameEncode = that.removeSpace(artistName);

                var idImg = nameEncode + 'Img';
                var idBio = nameEncode + 'Bio';

                $('#idTmpImg').attr('id', idImg);
                $('#idTmpBio').attr('id', idBio);

                var searchRequest = encodeURI(actor.get('artistName'));
                var tmdbData = new TmdbData();
                tmdbData.getTmdbActorData(searchRequest, idImg, idBio);
            });
        },

        setActorName: function(actorName){
            this.actorName = actorName;
        },

        removeSpace: function (stringToChange) {
            return stringToChange.replace(/ /i, '_');
        },

        generateDefaultQuery: function () {
            var that = this;
            return that.searchManager
                .setSearchType('actors')
                .setSearchName('brad')
                .setSearchLimit(40)
                .url();
        },
        generateSearchQuery(actorName) {
            var that = this;
            var name = actorName;
            if (!name) {
            that.searchManager
                .setSearchName(actorName)
              }
            else {
                that.searchManager.setSearchName(name);
            }
            return this.searchManager
                .setSearchType('actors')
                .setSearchLimit(40)
                .url();
        }
    });
    return ActorsCollectionView;
});
