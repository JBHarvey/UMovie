/**
 * Created by seydou on 16-03-29.
 */

define([
    'underscore',
    'backbone',
], function (_, Backbone) {

    var MemberModel = Backbone.Model.extend({
        urlRoot: 'https://umovie.herokuapp.com/users',

        parse(data) {
            if (_.isObject(data.results)) {
                return this.processData(data.results[0]);
            } else {
                return this.processData(data);
            }
        },

        processData(data) {
            data.gravatarIdName = data.id;
            return data;
        },

        defaults:{
            email: 'john.smith@mail.com',
            name: 'John Smith',
            id: '53ec122d27aafe77d8c37b8',
            following: [{
                id: '53ec12122121afe77d8c37b8',
                name: 'Walter White',
                email: 'walter.white@mail.com',
            },],
        },
    });

    return MemberModel;
});
