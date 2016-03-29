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
        var that = this;
        this.model.url = function(){
            return `https://umovie.herokuapp.com/users/${that.model.id}` ;
        }
        that.listenTo(this.model, "change", this.render);
        that.model.fetch();

        that.render();

    },

    render: function(){
        var template = Handlebars.compile(UserTemplate);
        var source = this.model.attributes;
        console.log(source + "ici la source");

        var resultUser = template(source);

        this.$el.html(resultUser);
    },

    });

    return UserSettingsView;
});