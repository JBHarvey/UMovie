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
        },

        render: function () {
            var template = Handlebars.compile(genreTemplate);
            var source = this.model.attributes;

            return template(source);

        },

    });
    return GenreView;
});

