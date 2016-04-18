define([
    'underscore',
    'backbone',
], function (_, Backbone) {
    'use strict';

    return Backbone.Model.extend({
        urlRoot: 'http://imdb-api-request.herokuapp.com/actors',

        parse: function (results) {
            if (_.isObject(results.data)) {
                return results.data;
            } else {
                return results;
            }
        },
    });
});
