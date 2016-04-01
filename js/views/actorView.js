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
    'handlebars'
    ], function($, _, Backbone, actorTemplate, MovieCollection, TmdbData, Handlebars) {

    var ActorView = Backbone.View.extend({

        el: $('#content'),


        initialize: function(){


            var that = this;
            this.collectionMovies = new MovieCollection();

            this.listenTo(this.model, "change", that.render);
            this.listenTo(this.collectionMovies, 'update', that.render);
            var waitForRender = _.after(2, function() {
                that.render();
            });

            this.model.fetch({
                success: waitForRender
            });
            this.collectionMovies.fetch({
                success: waitForRender
            });


        },

        generateSearchName: function () {
           return encodeURI(this.model.get('artistName'));
        },


        render: function() {
            "use strict";

            var searchRequest = this.generateSearchName();


            var source = this.model.attributes;
            var template = Handlebars.compile(actorTemplate);


            this.$el.html(template(source));
            var tmdbData = new TmdbData(searchRequest,'imgActor', 'description');
        }

    });
    return ActorView;
});