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
    'views/authenticationView',
    'models/userModel'
], function ($, _, Backbone, NavigationBarView, HomeView, AuthenticationView, UserModel) {

    var UMovieRouter = Backbone.Router.extend({

        routes: {
            '': 'goHome',
            'watchlists': 'displayWatchlists',
            'user': 'showUser',
            'otherUsers': 'browseUsers',
            'settings': 'settings',
            'login': 'login',
            'signup': 'signup',
            'disconnect': 'disconnect',

            //Default
            '*actions': 'defaultAction'
        }
    });

    var initialize = function () {

        var uMovieRouter = new UMovieRouter();

        var user = new UserModel();
        var authenticationView = new AuthenticationView(user, false);
        var navigationBarView = new NavigationBarView();
        navigationBarView.listenTo(user, "change:connected", navigationBarView.render());
        var homeView = new HomeView();

        uMovieRouter.on('route:goHome', function () {
            homeView = new HomeView();
            console.log("Chewie, we're home!!");
        });

        uMovieRouter.on('route:displayWatchlists', function () {
            console.log('The watchlists should be displayed now');
        });

        uMovieRouter.on('route:showUser', function () {
            console.log('The user (id still to be determined) should be displayed now');
        });

        uMovieRouter.on('route:settings', function () {
            console.log('The settings should be displayed now');
        });

        uMovieRouter.on('route:signup', function () {
            authenticationView.render(true);
        });

        uMovieRouter.on('route:login', function () {
            authenticationView.render(false);
        });

        uMovieRouter.on('route:disconnect', function () {
            authenticationView.
            user.disconnect();
        });

        uMovieRouter.on('route:defaultAction', function (actions) {
            console.log('No route to:', actions);
        });

        Backbone.history.start({root: '/UMovie'});

    };
    return {
        initialize: initialize
    };
});