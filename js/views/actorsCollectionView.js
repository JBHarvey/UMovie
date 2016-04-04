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

        initialize: function () {
            this.searchManager = new SearchModel();
            this.collection = new Actors();
            this.collection.url = this.generateDefaultQuery();
            this.listenTo(this.collection, 'sync', this.render);
            this.collection.fetch();
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

        generateDefaultQuery: function () {
            return this.searchManager
                .setSearchType('actors')
                .setSearchName('Brad')
                .setSearchLimit(40)
                .url();
        },
    });
    return ActorsCollectionView;
});
