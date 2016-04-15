define([
    'underscore',
    'backbone',
], function (_, Backbone) {
    'use strict';

    return Backbone.Model.extend({
        urlRoot: 'http://localhost:5000/actors',

        parse: function (results) {
            if (_.isObject(results.data)) {
                return results.data
            } else {
                return results;
            }
        },
    });
});
