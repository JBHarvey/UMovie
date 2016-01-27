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
    'views/authenticationView'
], function ($, _, Backbone, NavigationBarView, HomeView, AuthenticationView) {

    var UMovieRouter = Backbone.Router.extend({
        routes: {
            'home': 'goHome',
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
        var authenticationView = new AuthenticationView(true);

        uMovieRouter.on('route:goHome', function () {
            var homeModel = new HomeView();
            console.log("Chewie, we're home!!");
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
            var authenticationView = new AuthenticationView(true);
            console.log('The signup dialog should be displayed now');
        });

        uMovieRouter.on('route:login', function () {
            var authenticationView = new AuthenticationView(false);
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