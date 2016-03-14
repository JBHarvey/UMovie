/**
 * Created by Jean-Benoît on 2016-01-27.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'jscookie',
    'text!templates/authentication.html',
    'models/authenticationModel',
    'handlebars'
], function ($, _, Backbone, Cookie, authenticationTemplate, AuthenticationModel, Handlebars) {


    var AuthenticationView = Backbone.View.extend({

        el: $('#content'),

        initialize: function (globalUser) {

            user = globalUser;
            this.render();
        },

        render: function (signup) {

            this.signup = signup;
            this.template = Handlebars.compile(authenticationTemplate);
            var source = new AuthenticationModel();

            //If the user is not signing up, he is login in
            if (this.signup) {
                resultAuthentication = this.template(source.signup);
            } else {
                resultAuthentication = this.template(source.login);
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
            } else {
                user.attemptLogIn($('#password').val());
            }
        }
    });
    return AuthenticationView;

})
;