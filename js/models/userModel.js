/**
 * Created by Jean-Benoît on 2016-01-26.
 */
define([
    'jquery',
    'backbone'
], function ($, Backbone) {

    var UserModel = Backbone.Model.extend({
        urlRoot: 'https://umovie.herokuapp.com',
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
            this.urlRoot = 'https://umovie.herokuapp.com/signup';
            this.set(defaults = {
                email: this.email,
                name: newName,
                password: newPassword
            });
            this.save({
                type: 'POST',
                contentType: 'application/x-www-form-urlencoded'
            }).then(function () {
            });
            /*
             user.save().then(

             );
             */
        },

        attemptLogIn: function (newPassword) {
            this.urlRoot = 'https://umovie.herokuapp.com/login';
            this.set(defaults = ({
                email: this.email,
                password: newPassword
            }));
            this.save({
                type: 'POST',
                contentType: 'application/x-www-form-urlencoded'
            }).then(function (model, response, options) { //Will execute on success
                console.log(response);
                console.log(model.token);
                $cookie(model.token);
            }, function (model, error, options) { //Will execute on error
                console.log('Error while signing in.');

            });

        },

        disconnect: function () {
            name = undefined;
            email = undefined;
            following = undefined;
            connected = false;
        }

    });


    return UserModel;
})
;
