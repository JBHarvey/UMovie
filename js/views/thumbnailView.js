/**
 * Created by Jean-Benoît on 16-03-02.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/thumbnail.html',
    'handlebars',
], function ($, _, Backbone,
             ThumbnailTemplate,
             Handlebars) {

    var ThumbnailView = Backbone.View.extend({

        comparator: 'trackName',

        initialize: function () {
        },

        render: function () {
            var template = Handlebars.compile(ThumbnailTemplate);
            var source = this.model.attributes;
            return template(source);
        },
    });
    return ThumbnailView;

});
