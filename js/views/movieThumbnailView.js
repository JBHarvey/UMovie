/**
 * Created by Jean-Benoît on 16-03-02.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/movieThumbnail.html',
    'handlebars'
], function ($, _, Backbone, movieThumbnailTemplate, Handlebars) {


var MovieThumbnailView = Backbone.View.extend({

        comparator: 'trackName',

        initialize: function () {
        },

        render: function () {
            var template = Handlebars.compile(movieThumbnailTemplate);
            var source = this.model.attributes;
            return template(source);
        }
    });
    return MovieThumbnailView;

});