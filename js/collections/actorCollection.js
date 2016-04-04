/**
 * Created by rives on 2016-03-10.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'jscookie',
    'models/actorModel',
], function ($, _, Backbone, Cookie, ActorModel) {
    'use strict';

    var Actors = Backbone.Collection.extend({
            model: ActorModel,
            url: '/actors',

            parse: function (response) {
                if (response.results) {
                    return response.results;
                } else {
                    return response;
                }
            },
        });

    return Actors;
});
