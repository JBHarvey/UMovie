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
        'models/actorModel',
        'views/movieView',
        'views/movieCollectionView',
        'views/tvShowView',
        'views/tvShowsCollectionView',
        'views/actorView',
        'views/actorsCollectionView',
        'views/watchlistView'
    ], function ($, _, Backbone,
                 Cookie,
                 NavigationBarView,
                 HomeView,
                 AuthenticationView,
                 UserModel,
                 ActorModel,
                 MovieView,
                 MovieCollectionView,
                 TvShowView,
                 TvShowCollectionView,
                 ActorView,
                 ActorCollectionView,
                 WatchlistView) {

        var UMovieRouter = Backbone.Router.extend({

            routes: {
                '': 'goHome',
                'movies': 'displayMovies',
                'movie/:movieId': 'displaySpecificMovie',
                'tvShows': 'displayTvShows',
                'tvShow/:tvShowId': 'displaySpecificTvShow',
                'actors': 'displayActors',
                'actor/:actorId': 'displaySpecificActor',
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

            uMovieRouter.setHeaderAuthorization = function () {
                $(document).ajaxSend(function (e, xhr, options) {
                    xhr.setRequestHeader("Authorization", Cookie.get('token'));
                });
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
                if (!homeView) {
                    homeView = new HomeView();
                } else {
                    homeView.render();
                }
            }


            uMovieRouter.on('route:goHome', function () {
                if (uMovieRouter.checkCredentials()) {
                    navigationBarView.render();
                    homeView.render();
                }
            });

            // Movies
            uMovieRouter.on('route:displayMovies', function () {
                /*
                 * THIS PART IS <b> VERY </b> TEMPORARY
                 * It shall stay as long as we do not have a movie collection along with its presentation
                 */
                var movies = new MovieCollectionView();
            });

            uMovieRouter.on('route:displaySpecificMovie', function (movieId) {
                // This should be the actual movieView page.
                var movieView = new MovieView(movieId);
            });


            //TV Shows
            uMovieRouter.on('route:displayTvShows', function () {
                var tvShows = new TvShowCollectionView();
            });

            uMovieRouter.on('route:displaySpecificTvShow', function (tvShowId) {
                var tvShowView = new TvShowView(tvShowId);
            });


            //Actors
            uMovieRouter.on('route:displayActors', function () {
                var actors = new ActorCollectionView();
            });

            uMovieRouter.on('route:displaySpecificActor', function (actorId) {

                var newActor = new ActorModel({id: actorId});
                var actorView = new ActorView({model: newActor});
            });


            uMovieRouter.on('route:displayWatchlists', function () {
                if (uMovieRouter.checkCredentials()) {
                    var watchlistModel = new WatchlistView();
                    console.log("Showing Watchlists");
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


            uMovieRouter.setHeaderAuthorization();
            Backbone.history.start({root: '/UMovie'});

        };


        return {
            initialize: initialize
        };
    }
);