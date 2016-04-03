/**
 * Created by Jean-Benoît on 16-03-02.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/movieThumbnail.html',
    'text!templates/seasonThumbnail.html',
    'text!templates/episodeThumbnail.html',
    'text!templates/actorThumbnail.html',
    'handlebars',
], function ($, _, Backbone,
             movieThumbnailTemplate,
             seasonThumbnailTemplate,
             episodeThumbnailTemplate,
             actorThumbnailTemplate,
             Handlebars) {

    var ThumbnailView = Backbone.View.extend({

        comparator: 'trackName',

        initialize: function () {
        },

        renderMovie: function () {
            var template = Handlebars.compile(movieThumbnailTemplate);
            var source = this.model.attributes;
            return template(source);
        },

        renderSeason: function () {
            var template = Handlebars.compile(seasonThumbnailTemplate);
            var source = this.model.attributes;
            return template(source);
        },

        renderEpisode: function () {
            var template = Handlebars.compile(episodeThumbnailTemplate);
            var source = this.model.attributes;
            return template(source);
        },

        renderActor: function () {
            var template = Handlebars.compile(actorThumbnailTemplate);
            var source = this.model.attributes;
            return template(source);
        },
    });
    return ThumbnailView;

});
