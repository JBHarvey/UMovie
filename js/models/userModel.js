/**
 * Created by Jean-Benoît on 2016-01-26.
 */
define([
    'backbone'
], function (Backbone) {

    var UserModel = Backbone.Model.extend({
        defaults: {
            name: undefined,
            email: undefined,
            following: [{
                name: undefined,
                email: undefined
            }]
        },
        connected: false,

        validateEmail: function (emailToCheck) {
            var emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (emailRegEx.test(emailToCheck)) {
                email = emailToCheck;
            } else {
                email = undefined;
            }
        },

        attemptSignUp: function (newName, newPassword) {
            id = undefined;
            urlRoot = 'https://umovie.herokuapp.com/signup';
            name = newName;
            password = newPassword;
            console.log(id);
            console.log(urlRoot);
            console.log(url());
            console.log(name);
            console.log(password);
            /*
             user.save().then(
             function (model, response, options) { //Will execute on success
             console.log('Registration complete!');
             console.log("The app will need to be redirected as a user has registered, he should now be logged in.");
             }, function (model, error, options) { //Will execute on error
             console.log('Error while signing in.');
             }
             );
             */
        },

        attemptLogIn: function (newPassword) {
            id = undefined;
            password = newPassword;
            urlRoot = 'https://umovie.herokuapp.com/login';
            console.log(id);
            console.log(urlRoot);
            console.log(url());
            console.log(name);
            console.log(password);

            /*
             user.save().then(function () {
             console.log(user.token);
             });
             */

        },

        disconnect: function () {
            urlRoot = undefined;
            name = undefined;
            email = undefined;
            following = undefined;
            connected = false;
        }

    });


    return UserModel;
})
;
