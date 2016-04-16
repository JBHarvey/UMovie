/**
 * Created by rives on 4/15/2016.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/genre.html',
    'handlebars',
], function ($, _, Backbone, genreTemplate, Handlebars) {


    var GenreView = Backbone.View.extend({

        initialize: function () {
            this.genreType = this.tagName;
            this.tagName = undefined;
        },

        render: function () {
            var that = this;
            var template = Handlebars.compile(genreTemplate);
            var source = that.model.attributes;
            source.typeName = that.genreType;
            return template(source);

        },

    });
    return GenreView;
});

