/**
 * Created by Jean-Benoît on 2016-01-26.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!../templates/user.html',
    "models/userModel",
    'handlebars'
], function ($, _, Backbone, UserTemplate, UserModel, Handlebars) {
    "use strict";

    var UserView = Backbone.View.extend({

        el: '#content',

        initialize: function () {
            var that = this;
            var sync = _.after(1, function(){
                that.render();
                that.listenTo(that, 'change', that.render());
                that.listenTo(that, 'update', that.render());
            });

            this.model.url = this.model.changeUrlForUserInfo();
            this.model.fetch({
               success: sync
            });
        },

        events:{
            'click .inputNewNameButton': 'updateModelName'
        },

        render: function (user) {
            console.log("je passe dans le render");
            var source;
            var template = Handlebars.compile(UserTemplate);

            if (!_.isObject(user)) {
                source = new UserModel();
            } else {
                source = user;
            }

            var resultUser = template(source);

            this.$el.html(resultUser);

        },

        updateModelName: function(){
            console.log("Je passe dans la methode...");
            var newNameButton = event.currentTarget;
            var $newName = $('.inputNewName');

            if($newName != this.model.name){
                this.model.name = $newName;
            }

            else{
                console.log("Le nom entre est le meme !");
            }
        }
    });

    return UserView;
});
