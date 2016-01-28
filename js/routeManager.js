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
    'views/navigationBarView',
    'views/homeView',
    'views/movieView'
], function ($, _, Backbone, NavigationBarView, HomeView) {

    var UMovieRouter = Backbone.Router.extend({
        routes: {
            '/home': 'goHome',
            '/movie': 'displayMovie',

            //Default
            '*actions': 'defaultAction'
        }
    });

    var initialize = function () {

        var uMovieRouter = new UMovieRouter();

        var navigationBarView = new NavigationBarView();

        var movieView = new MovieView();

        uMovieRouter.on('goHome', function () {

        });

        uMovieRouter.on('displayMovie', function(actions){
            alert("toto", actions);
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