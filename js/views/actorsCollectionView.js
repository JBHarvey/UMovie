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

    var ActorsCollectionView = Backbone.View.extend({

        el: '#content',

        initialize: function () {
            this.searchManager = new SearchModel();
            this.collection = new Actors();
            this.collection.url = this.generateDefaultQuery(); this.listenTo(this.collection, 'sync', this.render);
            this.collection.fetch();
        },

        render: function () {
            var that = this;
            var tmdbData;
            that.$el.html('');
            that.collection.each(function (actor) {
                var thumbnail = new ThumbnailView({ model: actor });

                that.$el.append(thumbnail.render());

                var artistName = actor.attributes.artistName;
                var nameEncode = that.removeSpace(artistName);

                var idImg = nameEncode + 'Img';
                var idBio = nameEncode + 'Bio';

                $('#idTmpImg').attr('id', idImg);
                $('#idTmpBio').attr('id', idBio);

                var searchRequest = encodeURI(actor.attributes.artistName);
                tmdbData = new TmdbData();
                tmdbData.getTmdbActorData(searchRequest, idImg, idBio);

                //SE FAIT TOUT AVANT DE FAIRE LA METHODE GETTMDBACTORDATA
                //console.log(tmdbData.actorToFind);
                // tmdbData.getActorImgBio();
            });
        },

        removeSpace: function (stringToChange) {
            return stringToChange.replace(/ /i, '_');
        },

        generateDefaultQuery: function () {
            this.searchManager.setSearchType('actors');
            this.searchManager.setSearchName('Brad');
            this.searchManager.setSearchLimit(40);
            return this.searchManager.url();
        },
    });
    return ActorsCollectionView;
});
