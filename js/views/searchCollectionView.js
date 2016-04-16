/**
 * Created by Jean-Benoît on 16-03-01.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'views/thumbnailView',
    'models/imdbActorModel',
    'utils/imdb'
], function ($, _, Backbone, ThumbnailView, ImdbActorModel, Imdb) {

    var SearchCollectionView = Backbone.View.extend({

        initialize: function () {
            var that = this;
            that.listenTo(this.collection, 'sync', that.render);
            that.collection.fetch();
        },

         render: function () {
            var that = this;
            this.removeNoResultFoundsMessage();
            this.collection.each(function (model) {
                var thumbnail = new ThumbnailView({model: model});
                that.$el.append(thumbnail.render());

                if (model.attributes.tmdbRequest) {
                    that.callImdb( model);
                }

            });
        },

        callImdb: function (model) {
            var that = this;


            var search = model.attributes.artistName.replace(/ ([A-Z]\w?\.)/g, '');
           var searchRequest = encodeURI( search);

            console.log(searchRequest);

            Imdb.actors.findActors({query: searchRequest}, function (data) {
                var parsedData = JSON.parse(data);
                var actorDatas = parsedData['name_popular']
                    || parsedData['name_exact']
                    || parsedData['name_approx']
                    || parsedData['name_substring'];

                if (actorDatas) {

                    var actorID = undefined;
                    actorDatas.forEach(function(actor){

                        if(actorID == undefined && actor.name.localeCompare(model.attributes.artistName) == 0){
                            actorID = actor;
                        }
                    });

                    that.imdbModel = new ImdbActorModel(actorID);
                    that.imdbModel.fetch({
                        success: function (data) {

                            var biography = data.attributes.bio;
                            const bioId = model.attributes.bioId;


                            var picture = data.attributes.image.url;
                            const imageID = model.attributes.imageId;
                            console.log(picture);
                            console.log(imageID);

                            Imdb.actors.modifySingleActorBio(biography, bioId);
                            Imdb.actors.modifySingleActorImage(picture, imageID);
                        },
                    });
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