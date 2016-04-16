/**
 * Created by rives on 2016-01-28.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/actor.html',
    '../collections/movieCollection',
    'handlebars',
    'models/imdbActorModel',
    'utils/imdb',
    ], function ($, _, Backbone, actorTemplate, MovieCollection, Handlebars, ImdbActorModel, Imdb) {
        'use strict';

        var ActorView = Backbone.View.extend({

            el: '#content',

            initialize: function () {

                var that = this;
                this.collectionMovies = new MovieCollection();

                this.listenTo(this.model, 'change', that.render);
                this.listenTo(this.collectionMovies, 'update', that.render);

                var waitForRender = _.after(3, function () {
                    that.render();
                });

                this.model.fetch({
                    success: waitForRender,
                });

                this.collectionMovies.fetch({
                    success: waitForRender,
                });
            },

            generateSearchName: function (name) {
                return encodeURI(name);
            },

            render: function () {
                var that = this;

                var source = that.model.attributes;
                var template = Handlebars.compile(actorTemplate);

                that.$el.html(template(source));


                var search = that.model.attributes.artistName.replace(/ ([A-Z]\w?\.)/g, '');
                var searchRequest = this.generateSearchName(search);

                Imdb.actors.findActors({ query: searchRequest }, function (data) {
                    var parsedData = JSON.parse(data);
                    var actorDatas = parsedData['name_popular']
                        || parsedData['name_exact']
                        || parsedData['name_approx']
                        || parsedData['name_substring'];

                    if (actorDatas) {

                        var actorID = undefined;
                        actorDatas.forEach(function(actor){

                            if(actor.name.localeCompare(that.model.attributes.artistName) == 0 && actorID == undefined){

                                actorID = actor;
                            }
                        });
                        that.imdbModel = new ImdbActorModel(actorID);
                        that.imdbModel.fetch({
                            success: function (data) {

                                var biography = data.attributes.bio;
                                var picture = data.attributes.image.url;
                                Imdb.actors.modifySingleActorBio(biography, 'description');
                                Imdb.actors.modifySingleActorImage(picture, 'imgActor')

                            },
                        });
                    }
                });

            },


        });
        return ActorView;
    });
