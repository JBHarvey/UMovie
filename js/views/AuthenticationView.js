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
            this.signup = signup;
            this.render();
        },

        render: function () {

            this.template = Handlebars.compile(authenticationTemplate);
            var source = new AuthenticationModel();

            //If the user is not signing up, he is login in
            if (this.signup) {
                resultAuthentication = this.template(source.signup);
                console.log('a');
            } else {
                resultAuthentication = this.template(source.login);
                console.log('b');
            }

            this.$el.html(resultAuthentication);
            this.$el.show();
        },

        events: {
            "click .submitAuthentication": "sendAuthentication"
        },


        sendAuthentication: function () {
            user.validateEmail($('#email').val());
            if (this.signup) {
                user.attemptSignUp($('#name').val(), $('#password').val());
                console.log(user.url());
            } else {
                user.attemptLogIn($('#password').val());
                console.log(user.url());
            }
        }

    });
    return AuthenticationView;

})
;