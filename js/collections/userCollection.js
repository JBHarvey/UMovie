/**
 * Created by seydou on 16-04-02.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'jscookie',
    '../models/userModel',
], function ($, _, Backbone, Cookie, UserModel) {

    var Members = Backbone.Collection.extend({
        model: UserModel,
        url: 'https://umovie.herokuapp.com/users',

        parse: function (response) {
            return response;
        },
    });

    return Members;
});
