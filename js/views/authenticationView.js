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
    'handlebars',
], function ($, _, Backbone, Cookie, authenticationTemplate, AuthenticationModel, Handlebars) {

    var AuthenticationView = Backbone.View.extend({

        el: '#content',

        initialize: function (globalUser) {

            this.user = globalUser;
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
            'click .submitAuthentication': 'sendAuthentication',
            'keyup .authentication-input': 'launchFromEnter',
        },

        launchFromEnter: function(inputText) {
            var that = this;
            if (inputText.keyCode == 13)
                that.sendAuthentication();
        },

        sendAuthentication: function () {
            this.user.validateEmail($('#email').val());
            if (this.signup) {
                this.user.prepareForSignUp($('#name').val(), $('#password').val());
            } else {
                this.user.prepareForLogIn($('#password').val());
            }

            Backbone.emulateJSON = true;
            this.user.save();
            Backbone.emulateJSON = false;
        },
    });
    return AuthenticationView;

})

;
