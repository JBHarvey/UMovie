/**
 * Created by rives on 2016-03-10.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'jscookie',
    'models/actorModel'
], function($, _, Backbone, Cookie, MovieModel) {

        var Actors = Backbone.Collection.extend({
            model: actorModel,
            url: '/actors',

            parse: function(response) {
                return response.results;
            }
        });

        return Actors;
});