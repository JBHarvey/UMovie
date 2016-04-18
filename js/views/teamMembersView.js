/**
 * Created by Eduardo on 2016-04-17.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/teamMembers.html',
    '../models/teamMembersModel',
    'handlebars',
], function ($, _, Backbone, TeamMembersTemplate, TeamMembersModel, Handlebars) {

    var teamMemberView = Backbone.View.extend({

        el: '#content',

        initialize: function () {
            this.model = new TeamMembersModel();
            this.render();
        },

        render: function () {
            var template = Handlebars.compile(TeamMembersTemplate);
            var source = this.model.attributes;
            var teamPage = template(source);
            this.$el.html(teamPage);
        },
    });

    return teamMemberView;
});
