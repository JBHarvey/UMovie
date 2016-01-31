/**
 * Created by Jean-Benoît on 2016-01-26.
 */
define([
    'jquery',
    'backbone',
    'jscookie'
], function ($, Backbone, Cookie) {

    var UserModel = Backbone.Model.extend({
        connected: false,

        validateEmail: function (emailToCheck) {
            var emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (emailRegEx.test(emailToCheck)) {
                this.email = emailToCheck;
            } else {
                this.email = undefined;
            }
        },

        attemptSignUp: function (newName, newPassword) {
            this.set(defaults = {
                email: this.email,
                name: newName,
                password: newPassword
            });
            $.ajax({
                url: 'https://umovie.herokuapp.com/signup',
                type: 'POST',
                data: {
                    name: newName,
                    email: this.email,
                    password: newPassword
                },
                contentType: 'application/x-www-form-urlencoded'
            }).done(
                function (data) {
                    this.name = data.name;
                    this.id = data.id;
                    window.history.pushState("","", "/UMovie/#login");
                    document.location.reload(true);
                }
            ).fail(
                function (jqXHR, textStatus) {
                    return false;
                }
            );
        },

        attemptLogIn: function (newPassword) {
            this.set(defaults = ({
                email: this.email,
                password: newPassword
            }));
            $.ajax({
                url: 'https://umovie.herokuapp.com/login',
                type: 'POST',
                data: {
                    email: this.email,
                    password: newPassword
                },
                contentType: 'application/x-www-form-urlencoded'
            }).done(
                function (data) {
                    this.name = data.name;
                    this.connected = true;
                    Cookie.set('token', data.token, {expires: 365, path: '/'});
                    window.history.pushState("","", "/UMovie/#");
                    document.location.reload(true);
                }
            ).fail(
                function (jqXHR, textStatus) {
                    return false;
                }
            );
            /*

             THE BACKBONE WAY TO REQUEST POST.
             IT WORKS, BUT IS NOT OPTIMAL FOR THIS SPECIFIC CASE.
             THUS IT STAYS HERE IN ORDER TO BE AN EXAMPLE FOR OTHER BACKBONE.MODELS

             ERASE WHEN ALL THE CALL ARE DEALT WITH

             this.save({
             type: 'POST',
             contentType: 'application/x-www-form-urlencoded'
             }).then(function (model, response, options) { //Will execute on success
             console.log(response);
             console.log(model.token);
             return true;
             }, function (model, error, options) { //Will execute on error
             console.log('Error while signing in.');
             return false;
             });
             */

        },

        disconnect: function () {
            Cookie.remove('token', {path: '/'});
            this.set({
                name: undefined,
                email: undefined,
                following: undefined,
                connected: false
            });
        }

    });


    return UserModel;
})
;
