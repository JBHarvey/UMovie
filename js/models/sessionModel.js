/**
 * Created by Jean-Benoît on 2016-01-26.
 */
define([
    'jquery',
    'backbone',
    'jscookie',
], function ($, Backbone, Cookie) {

    var UserModel = Backbone.Model.extend({
        connected: false,
        loginURL: 'https://umovie.herokuapp.com/login',
        signupURL: 'https://umovie.herokuapp.com/signup',

        changeUrlForUserInfo: function () {
            return `https://umovie.herokuapp.com/users/${this.id}`;

        },

        validateEmail: function (emailToCheck) {
            var emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (emailRegEx.test(emailToCheck)) {
                this.email = emailToCheck;
            } else {
                this.email = undefined;
            }
        },

        /*
            Setting the different HTTP header parameters that need to be passed
            for the call to succeed.
         */
        sync: function (method, model, options) {
            'use strict';
            /* Forces a POST to be send, for when the model has already been
             POST-ed once, it will be send with a PUT every following request
             */
            if ('update' === method || 'create' === method) {
                method = 'create';
                options.data = model.data;
                options.success = model.success;
                options.error = model.error;
            }

            return Backbone.sync(method, model, options);
        },

        parse(data) {
            if (_.isObject(data.results)) {
                return data.results[0];
            } else {
                return data;
            }
        },

        prepareForSignUp: function (newName, newPassword) {
            var that = this;
            that.data = {
                email: that.email,
                name: newName,
                password: newPassword,
            };
            that.changeUrlDestination(that.signupURL);
            success = function (data) {
                that.name = data.name;
                that.id = data.id;
                window.history.pushState('', '', '/UMovie/#login');
                document.location.reload(true);
            };

            error = function (jqXHR, textStatus) {
                console.log('Error on signup: ', jqXHR);
                console.log('Content type : ', jqXHR.contentType);
            };

        },

        prepareForLogIn: function (newPassword) {
            var that = this;
            that.data = {
                email: that.email,
                password: newPassword,
            };
            that.changeUrlDestination(that.loginURL);
            that.success = function (data) {
                $("#error-message").text("");
                that.name = data.name;
                that.id = data.id;
                that.connected = true;

                Cookie.set('token', data.token, { expires: 365, path: '/' });
                Cookie.set('name', data.name, { expires: 365, path: '/' });
                Cookie.set('email', data.email, { expires: 365, path: '/' });
                Cookie.set('id', data.id, { expires:365, path:'/' });
                window.history.pushState('', '', '/UMovie/#');

                document.location.reload(true);
            };

            that.error = function (jqXHR, textStatus) {
                $("#error-message").text("Invalid username / password.");
            };

        },

        disconnect: function () {

            Cookie.remove('token', { path: '/' });
            Cookie.remove('name', { path: '/' });
            Cookie.remove('email', { path: '/' });
            Cookie.remove('id', { path: '/' });

            this.set({
                id: undefined,
                name: undefined,
                email: undefined,
                following: undefined,
                connected: false,
            });
        },

        changeUrlDestination: function (newDestination) {
            this.url = function () {
                return newDestination;
            };
        },

    });

    return UserModel;
})

;
