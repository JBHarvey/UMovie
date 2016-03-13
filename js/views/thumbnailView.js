/**
 * Created by Jean-Benoît on 16-03-02.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/movieThumbnail.html',
    'text!templates/tvShowSeasonThumbnail.html',
    'text!templates/tvShowEpisodeThumbnail.html',
    'handlebars'
], function ($, _, Backbone, movieThumbnailTemplate, Handlebars) {

    var ThumbnailView = Backbone.View.extend({

        comparator: 'trackName',

        initialize: function () {
        },


        render: function () {
            var template = Handlebars.compile(thumbnailTemplate);
            var source = this.model.attributes;
            return template(source);
        }
    });
    return ThumbnailView;

});