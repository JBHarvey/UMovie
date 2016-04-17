/**
 * Created by seydou on 16-04-02.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'jscookie',
    'models/memberModel',
], function ($, _, Backbone, Cookie, MemberModel) {

    var Members = Backbone.Collection.extend({
        model: MemberModel,
        url: 'https://umovie.herokuapp.com/users',

        parse: function (response) {
            return response;
        },
    });

    return Members;
});