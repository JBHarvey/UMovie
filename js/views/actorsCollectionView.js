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
    'models/searchModel',
    'models/imdbActorModel',
    'utils/imdb'
], function ($, _, Backbone, Actors, ThumbnailView, Handlebars, SearchModel,ImdbActorModel, Imdb) {
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
                var searchRequest = this.generateSearchName(actor);

                that.$el.append(thumbnail.render());

                Imdb.actors.findActors({ query: searchRequest }, function (data) {
                    var parsedData = JSON.parse(data);
                    var actorDatas = parsedData['name_popular']
                        || parsedData['name_exact']
                        || parsedData['name_approx']
                        || parsedData['name_substring'];

                    if (actorDatas) {

                        var actorID = undefined;
                        actorDatas.forEach(function(actor){
                            console.log(actor.name);
                            console.log(model.attributes.artistName);
                            if(actor.name == model.attributes.artistName && actorID == undefined){

                                actorID = actor;
                            }
                        });
                       // var actorID = actorDatas[0];
                        that.imdbModel = new ImdbActorModel(actorID);
                        that.imdbModel.fetch({
                            success: function (data) {
                                var biography = data.attributes.bio;
                                var picture = data.attributes.image.url;
                                console.log(data);
                                Imdb.actors.modifySingleActorBio(biography, actor.bioId);
                                Imdb.actors.modifySingleActorImage(picture, actor.imageId)
                            },
                        });
                    }
                });
            });
        },

        generateSearchName: function (actor) {
            return encodeURI(this.model.get(actor.artistName));
        },


        generateSearchQuery(actorName) {
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
        },
    });
    return ActorsCollectionView;
});
