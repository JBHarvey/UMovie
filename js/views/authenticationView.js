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

            var template = Handlebars.compile(authenticationTemplate);

            var source = new AuthenticationModel();

            //If the user is not signing up, he is loggin in
            if (signup) {
                var resultHome = template(source.signup);
            } else {
                var resultHome = template(source.login);
            }

            this.$el.html(resultHome);
            this.$el.show();
        }
    });
    return AuthenticationView;

});