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

        prepareDefaultRendering: function (actorName) {
            var that = this;
            that.actorName = actorName;
            that.collection.url = that.generateSearchQuery(that.actorName);
            that.listenTo(that.collection, 'sync', that.render);
            that.collection.fetch();
        },

        initialize: function () {
            var that = this;
            that.actorName = '';
            that.searchManager = new SearchModel();
            that.collection = new Actors();

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

        removeSpace: function (stringToChange) {
            return stringToChange.replace(/ /i, '_');
        },

        /*generateDefaultQuery: function () {
            var that = this;
            return that.searchManager
                .setSearchType('actors')
                .setSearchName('brad')
                .setSearchLimit(40)
                .url();
        },*/

        generateSearchQuery(actorName) {
            var that = this;
            var name = "";
            if (actorName) {
                name = actorName;
              }
            else {
               name = "Xavier";
            }
            return this.searchManager
                .setSearchName(name)
                .setSearchType('actors')
                .setSearchLimit(10)
                .url();
        }
    });
    return ActorsCollectionView;
});
