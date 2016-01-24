/**
 * Created by Jean-Benoît on 2016-01-18.
 * This file routes the links of the UMovie app
 */

define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    var UMovieRouter = Backbone.Router.extend({
        routes: {
            '/home': 'goHome',

            //Default
            '*actions': 'defaultAction'
        }
    });

    var initialize = function () {
        var uMovieRouter = new UMovieRouter();
        uMovieRouter.on('goHome', function () {
        });

        uMovieRouter.on('defaultAction', function (actions) {
            console.log('No route to: ', actions);
        });
        Backbone.history.start();
    };
    return {
        initialize: initialize
    };
});