/**
 * Created by Eduardo on 2016-04-17.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/teamMembers.html',
    'handlebars',
], function ($, _, Backbone, teamMemberTemplate, Handlebars) {

    var teamMemberView = Backbone.View.extend({

        initialize: function () {
        },

        render: function () {
            var template = Handlebars.compile(teamMemberTemplate);
            var source = this.model.attributes;
            return template(source);
        },

    });
    return teamMemberView;
});