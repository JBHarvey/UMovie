/**
 * Created by rives on 2016-01-28.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/actor.html',
    '../collections/movieCollection',
    'views/tmdbData',
    'handlebars',
    'models/imdbActorModel',
    'utils/imdb',
    ], function ($, _, Backbone, actorTemplate, MovieCollection, TmdbData, Handlebars, ImdbActorModel, Imdb) {
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

            generateSearchName: function () {
                return encodeURI(this.model.get('artistName'));
            },

            render: function () {
                var searchRequest = this.generateSearchName();

                var source = this.model.attributes;
                var template = Handlebars.compile(actorTemplate);

                this.$el.html(template(source));
                var tmdbData = new TmdbData();
                tmdbData.getTmdbActorData(searchRequest, 'imgActor', 'description');


                var that = this;
                Imdb.actors.findActors({ query: searchRequest }, function (data) {
                    var parsedData = JSON.parse(data);
                    var actorDatas = parsedData['name_popular']
                        || parsedData['name_exact']
                        || parsedData['name_approx']
                        || parsedData['name_substring'];

                    if (actorDatas) {
                        var actorID = actorDatas[0];
                        that.imdbModel = new ImdbActorModel(actorID);
                        that.imdbModel.fetch({
                            success: function (data) {
                                console.log(data);
                            },
                        });
                    }
                });


               /* var myQuery = {
                    query: 'Xavier',
                };
                Imdb.actors.findActors(myQuery, function(successData) {
                    var parsedData = JSON.parse(successData);
                    console.log(parsedData);
                }, function(error){
                });*/



            },

        });
        return ActorView;
    });
