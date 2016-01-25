/**
 * Created by Jean-Benoît on 2016-01-18.
 * This file routes the links of the UMovie app
 *
 * The name is routeManager because there seemed to have a problem with
 * the old "router.js" name...
 * The loaded file was empty and it wouldn't work in the browser, as if the one loaded
 * was an old cached version.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'views/homeView'
], function ($, _, Backbone, HomeView) {
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