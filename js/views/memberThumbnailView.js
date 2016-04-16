/**
 * Created by Jean-Benoît on 16-03-02.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/memberThumbnail.html',
    'handlebars',
], function ($, _, Backbone, MemberThumbnailTemplate, Handlebars) {

    var ThumbnailView = Backbone.View.extend({

        initialize: function () {
        },

        render: function () {
            var template = Handlebars.compile(MemberThumbnailTemplate);
            var source = this.model.attributes;
            return template(source);
        },
    });
    return ThumbnailView;

});
