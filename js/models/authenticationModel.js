/**
 * Created by Jean-Benoît on 2016-01-27.
 */
define([
    'backbone'
], function (Backbone) {

    var AuthentificationModel = Backbone.Model.extend({
        login: {
            inputField: [
                {inputName: "Email", inputType: "text"},
                {inputName: "Password", inputType: "password"}
            ],
            newEntry: false
        },
        signup: {
            inputField: [
                {inputName: "Name", inputType: "text"},
                {inputName: "Email", inputType: "text"},
                {inputName: "Password", inputType: "password"}
            ],
            newEntry: true
        }
    });


    return AuthentificationModel;
});
