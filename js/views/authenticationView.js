/**
 * Created by Jean-Benoît on 2016-01-27.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/authentication.html',
    'models/authenticationModel',
    'handlebars'
], function ($, _, Backbone, authenticationTemplate, AuthenticationModel, Handlebars) {

    var AuthenticationView = Backbone.View.extend({

        el: $('#modal-popup'),

        initialize: function (signup) {
            this.render(signup);
        },


        render: function (signup) {

            this.signup = signup;

            var template = Handlebars.compile(authenticationTemplate);
            var source = new AuthenticationModel();

            //If the user is not signing up, he is login in
            if (signup) {
                var resultHome = template(source.signup);
            } else {
                var resultHome = template(source.login);
            }

            this.$el.html(resultHome);
            this.$el.show();
        },

        events: {
            "click .submitAuthentication": "sendAuthentication",
            "click .signup": "switchToLogin",
            "click .login": "switchToSignUp"

        },

        sendAuthentication: function (data) {
            console.log('Yay!');
            console.log(data);
            if (this.signup) {
                console.log("A new account is created!");
            } else {
                console.log("Someone logged in!");
            }
        },

        switchToLogin: function() {
                window.history.pushState("","","login");
        },

        sendSignUp: function () {

            /*
             sync("create", );
             */
        },

        sendLogIn: function () {
            /*
             sync("create", );
             */

        }

    });
    return AuthenticationView;

})
;