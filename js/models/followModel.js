/**
 * Created by seydou on 16-04-05.
 */
define([
    'underscore',
    'backbone',
], function (_, Backbone) {
    var FollowModel = Backbone.Model.extend({
        urlRoot: 'https://umovie.herokuapp.com/follow',

        parse(data) {
            if (_.isObject(data.results)) {
                return data.results[0];
            } else {
                return data;
            }
        },

        processData(data) {
            data.attributes.followData = { id: `${data.id}` };
            return data;
        },

        sync: function (method, model, options) {
            if (method === 'update' || method === 'create') {
                method = 'create';

                options.contentType = 'application/json';
                options.url = 'https://umovie.herokuapp.com/follow';
                options.data = JSON.stringify(model.attributes);
            }

            return Backbone.sync(method, model, options);
        },

    });

    return FollowModel;
});
