/**
 * Created by rives on 2016-01-28.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/actor.html',
    'collections/movieCollection',
    'handlebars',
    'models/imdbActorModel',
    'utils/imdb',
    'views/tmdbData',
], function ($, _, Backbone, actorTemplate, MovieCollection, Handlebars, ImdbActorModel, Imdb, Tmdb) {

    'use strict';

    var ActorView = Backbone.View.extend({

        el: '#content',

        initialize: function () {

            var that = this;
            this.collectionMovies = new MovieCollection();

            this.listenTo(this.model, 'change', that.render);
            this.listenTo(this.collectionMovies, 'update', that.render);

            var waitForRender = _.after(2, function () {
                that.render();
            });

            this.model.fetch({
                success: waitForRender,
                error: function (model, jqXHR) {
                    var parsedResponse = JSON.parse(jqXHR.responseText);
                    $("#error-message-actor").text("Erreur : " + parsedResponse.message);
                },
            })
            ;

            this.collectionMovies.fetch({
                success: waitForRender,
                error: function (model, jqXHR) {
                    var parsedResponse = JSON.parse(jqXHR.responseText);
                    $("#error-message-actor").text("Erreur : " + parsedResponse.message);
                },
        })
            ;
        },

        generateSearchName: function (name) {
            return encodeURI(name);
        },

        render: function () {
            var that = this;

            var source = that.model.attributes;
            var template = Handlebars.compile(actorTemplate);

            that.$el.html(template(source));
            var tmdbData = new Tmdb();
            tmdbData.getTmdbActorData(that.model.attributes.tmdbRequest, 'imgActor', 'description');

            var search = that.model.attributes.artistName.replace(/ ([A-Z]\w?\.)/g, '');
            var searchRequest = this.generateSearchName(search);

            Imdb.actors.findActors({ query: searchRequest }, function (data) {
                var parsedData = JSON.parse(data);

                /* jshint ignore:start */

                // jscs:disable
                var actorDatas = parsedData['name_popular']
                    || parsedData['name_exact']
                    || parsedData['name_approx']
                    || parsedData['name_substring'];

                // jscs:enable
                /* jshint ignore:end */

                if (actorDatas) {

                    var actorID;
                    actorDatas.forEach(function (actor) {

                        if (actor.name.localeCompare(that.model.attributes.artistName) === 0 && actorID === undefined) {

                            actorID = actor;
                        }
                    });

                    that.imdbModel = new ImdbActorModel(actorID);
                    that.imdbModel.fetch({
                        success: function (data) {

                            var biography = data.attributes.bio;
                            var picture = data.attributes.image.url;
                            Imdb.actors.modifySingleActorBio(biography, 'description');
                            if (data.attributes.image) {
                                Imdb.actors.modifySingleActorImage(picture, 'imgActor');
                            }

                        },
                        error: function (model, jqXHR) {
                            var parsedResponse = JSON.parse(jqXHR.responseText);
                            $("#error-message-actor").text("Erreur : " + parsedResponse.message);
                        },
                    });
                }
            });

        },

        addImageToActors: function (model) {
            if (model.attributes.tmdbRequest) {
                var tmdb = new Tmdb();
                tmdb.getTmdbActorData(model.attributes.tmdbRequest, model.attributes.imageId, model.attributes.bioId);
            }
        },

    });
    return ActorView;
});
