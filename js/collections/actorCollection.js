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

    var Actors = Backbone.Collection.extend({
            model: ActorModel,
            url: '/actors',

            parse: function (response) {
                console.log(response);
                return response.results;
            },
        });

    return Actors;
});
