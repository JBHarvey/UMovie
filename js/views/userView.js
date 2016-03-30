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

    var UserView = Backbone.View.extend({

        el: '#content',

        initialize: function () {
            this.render();
            console.log("render after initialize");

            var sync = _.after(1, function(){
                this.render();
                this.listenTo(this, 'change', this.render());
                this.listenTo(this, 'update', this.render());
            });
            this.fetch({
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

            if (user) {
                source = new UserModel();
            } else {
                source = user;
            }

            var resultUser = template(source);

            this.$el.append(resultUser);

        },

        updateModelName: function(){
            "use strict";

            console.log("Je passe dans la methode...");
            var newNameButton = event.currentTarget;
            var $newName = $('.inputNewName');

            if($newName != this.model.name){
                this.model.name = $newName;
            }

            else{
                console.log("Le nom entre est le meme !");
            }

            this.render();
        }
    });

    return UserView;
});
