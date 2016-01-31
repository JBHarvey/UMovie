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
    'jscookie',
    'views/navigationBarView',
    'views/homeView',
    'views/authenticationView',
    'models/userModel',
    'views/movieView'
], function ($, _, Backbone, Cookie, NavigationBarView, HomeView, AuthenticationView, UserModel,MovieView) {


    var UMovieRouter = Backbone.Router.extend({

        routes: {

            '': 'goHome',
            'movie': 'displayMovie',
            'watchlists': 'displayWatchlists',
            'user': 'showUser',
            'otherUsers': 'browseUsers',
            'settings': 'settings',
            'login': 'login',
            'signup': 'signup',
            'disconnect': 'disconnect',

            //Default
            '*actions': 'defaultAction'
        },

        go: function (route) {
            console.log(route);
            this.navigate(route, {trigger: yes});
        }


    });

    var initialize = function () {


        var authenticationView;
        var homeView;
        var uMovieRouter = new UMovieRouter();

        var user = new UserModel();
        var navigationBarView = new NavigationBarView();


        uMovieRouter.listenTo(Backbone, 'router:go', uMovieRouter.go);

        var lastAuthState = 'disconnected';
        updateNavigationBar = function () {
            if (Cookie.get('token') === undefined && lastAuthState == 'connected') {
                navigationBarView.render();
            } else if (Cookie.get('token') !== undefined && lastAuthState == 'disconnected') {
                navigationBarView.render();
            }
        };

        uMovieRouter.checkCredentials = function () {
            updateNavigationBar();
            if (Cookie.get('token') === undefined) {
                lastAuthState = 'disconnected';
                Backbone.trigger('route:login');
                return false;
            } else {
                lastAuthState = 'connected';
                return true;
            }
        };

        //Shows the login at start up. If the user has already logged in, the home page will be shown.
        authenticationView = new AuthenticationView(user, false);
        if (uMovieRouter.checkCredentials()) {
            homeView = new HomeView();
        }

        uMovieRouter.on('route:goHome', function () {
            if (uMovieRouter.checkCredentials()) {
                navigationBarView.render();
                homeView.render();
            }
        });

        uMovieRouter.on('route:displayMovie', function(){
            var movieView = new MovieView();
            console.log('The movie dialog should be displayed now')
        });

        uMovieRouter.on('route:displayWatchlists', function () {
            if (uMovieRouter.checkCredentials()) {
                console.log('The watchlists should be displayed now');
            }
        });

        uMovieRouter.on('route:showUser', function () {
            if (uMovieRouter.checkCredentials()) {
                console.log('The user (id still to be determined) should be displayed now');
            }
        });

        uMovieRouter.on('route:settings', function () {
            if (uMovieRouter.checkCredentials()) {
                console.log('The settings should be displayed now');
            }
        });

        uMovieRouter.on('route:signup', function () {
            authenticationView.render(true);
        });

        uMovieRouter.on('route:login', function () {
            authenticationView.render(false);
        });

        uMovieRouter.on('route:disconnect', function () {
            user.disconnect();
            navigationBarView.render();
            authenticationView.render(false);
        });


        uMovieRouter.on('route:defaultAction', function (actions) {
            console.log('Error : no route to', actions);
        });

        Backbone.history.start({root: '/UMovie'});

    };


    return {
        initialize: initialize
    };
});