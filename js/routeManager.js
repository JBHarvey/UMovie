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
], function ($, _, Backbone, NavigationBarView, HomeView, MovieView) {

    var UMovieRouter = Backbone.Router.extend({
        routes: {

            'home': 'goHome',
            'movie': 'displayMovie',
            'watchlists': 'displayWatchlists',
            'user/': 'showUser',
            'parameters': 'parameters',
            'signup': 'signup',
            'login': 'login',
            'logout': 'logout',

            //Default
            '*actions': 'defaultAction'
        }
    });

    var initialize = function () {

        var uMovieRouter = new UMovieRouter();
        var navigationBarView = new NavigationBarView();

        //

        uMovieRouter.on('route:goHome', function () {
            var homeModel = new HomeView();
            console.log("Chewie, we're home!!");
        });

        uMovieRouter.on('route:displayMovie', function(){
            var movieView = new MovieView();
            console.log('The movie dialog should be displayed now')
        });

        uMovieRouter.on('route:displayWatchlists', function () {
            console.log('The watchlists should be displayed now');
        });

        uMovieRouter.on('route:showUser', function () {
            console.log('The user (id still to be determined) should be displayed now');
        });

        uMovieRouter.on('route:parameters', function () {
            console.log('The parameters should be displayed now');
        });

        uMovieRouter.on('route:signup', function () {
            console.log('The signup dialog should be displayed now');
        });

        uMovieRouter.on('route:login', function () {
            console.log('The login dialog should be displayed now');
        });

        uMovieRouter.on('route:logout', function () {
            console.log('The logout dialog should be displayed now');
        });


        uMovieRouter.on('route:defaultAction', function (actions) {
            console.log('No route to: ', actions);
        });
        Backbone.history.start();
    };
    return {
        initialize: initialize
    };
});