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

            this.listenTo(this.model, 'change', this.render);

        },

        render: function () {
            var source = this.model.attributes;
            var template = Handlebars.compile(genreTemplate);
            return template(source);

        },

    });
    return GenreView;
});

