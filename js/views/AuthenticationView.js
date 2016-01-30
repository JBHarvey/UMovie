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

        initialize: function (globalUser, signup) {
            user = globalUser;
            this.render(signup);
        },

        render: function (signup) {

            var template = Handlebars.compile(authenticationTemplate);
            var source = new AuthenticationModel();
            this.source = source;

            this.signup = signup;
            this.source.url = signup ? "/singup" : "/login";


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
            "click .submitAuthentication": "sendAuthentication"
        },


        sendAuthentication: function () {
            user = new UserModel();
            user.validateEmail($('#email').val());
            if (this.signup) {
                user.attemptSignUp($('#name').val(), $('#password').val());
            } else {
                user.attemptLogIn($('#password').val());
            }
        }

    });
    return AuthenticationView;

})
;