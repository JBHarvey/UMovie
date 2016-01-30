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
                this.success = user.attemptSignUp($('#name').val(), $('#password').val()).then(checkForSuccess());
            } else {
                this.success = user.attemptLogIn($('#password').val());
            }
        },

        checkForSuccess: function () {
            if (this.success) {
                console.log('asdf');
                this.$el.hide();
            }
        }
    });
    return AuthenticationView;

})
;