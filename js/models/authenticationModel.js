/**
 * Created by Jean-Benoît on 2016-01-27.
 */
define([
    'backbone',
], function (Backbone) {

    var AuthentificationModel = Backbone.Model.extend({
        login: {
            inputField: [
                { idName: 'email', placeholder: 'E-mail', inputType: 'email' },
                { idName: 'password', placeholder: 'Password', inputType: 'password' },
            ],
            newEntry: false,
            messageButton: 'Log in',
        },
        signup: {
            inputField: [
                { idName: 'name', placeholder: 'Name', inputType: 'text' },
                { idName: 'email', placeholder: 'E-mail', inputType: 'email' },
                { idName: 'password', placeholder: 'Password', inputType: 'password' },
            ],
            newEntry: true,
            messageButton: 'Register',
        },
    });

    return AuthentificationModel;
});
