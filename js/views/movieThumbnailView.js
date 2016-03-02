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


    var MovieCollectionView = Backbone.View.extend({

        initialize: function () {
        },

        render: function () {
            var template = Handlebars.compile(movieThumbnailTemplate);
            var source = this.model.attributes;
            return template(source);
        }
    });
    return MovieCollectionView;

});