/**
 * Created by seydou on 16-03-29.
 */

define([
    'underscore',
    'backbone',
], function (_, Backbone) {

    var MemberModel = Backbone.Model.extend({
        urlRoot: 'https://umovie.herokuapp.com/users',
        defaults:{ isUserType: true, },

        parse(data) {
            if (_.isObject(data.results)) {
                return this.processData(data.results[0]);
            } else {
                return this.processData(data);
            }
        },

        processData(data) {
            return data;
        },

        sync: function (method, model, options) {
            if (method === 'update' || method === 'create') {
                method = 'create';

                options.contentType = 'application/json';
                options.url = 'https://umovie.herokuapp.com/follow';
                options.data = JSON.stringify(model.attributes);
            } else if (method === 'delete') {
                options.url = `https://umovie.herokuapp.com/follow/${this.id}`;
            }

            return Backbone.sync(method, model, options);
        },

    });

    return MemberModel;
});
