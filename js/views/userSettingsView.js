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
    'text!templates/user.html',
    'jscookie'
], function($, _, Backbone, UserModel, Handlebars, UserTemplate, Cookie){

    var UserSettingsView = Backbone.View.extend({

    initialize: function(){

    },

    render: function(user){
        var template = Handlebars.compile(UserTemplate);
        var source = this.model.attributes;
        console.log(source + "ici la source");
        if (user) {
            source = new UserModel();
        } else {
            source = user;
        }

        var resultUser = template(source);

        this.$el.append(resultUser);
    },

    });

    return UserSettingsView;
});