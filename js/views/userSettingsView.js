/**
 * Created by Vincent on 2016-03-29.
 * Generatating a view for the userSettingsPage.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'models/userModel',
    'handlebars',
    'text!templates/user.html'
], function($, _, Backbone, UserModel, Handlebars, UserTemplate){

    var UserSettingsView = Backbone.View.extend({
        el: '#content',

    initialize: function(){
        var that = this;
        this.model.url = that.model.changeUrlForUserInfo();
        that.listenTo(this.model, "change", that.render);
        that.model.fetch();

    },

    render: function(){
        var template = Handlebars.compile(UserTemplate);
        var source = this.model.attributes;

        var resultUser = template(source);

        this.$el.html(resultUser);
    },

    });

    return UserSettingsView;
});