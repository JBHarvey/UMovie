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
        'views/movieView',
        'models/movieModel',
        'views/movieCollectionView',
        'views/tvShowView',
        'views/tvShowSeasonView',
        'models/tvShowSeasonModel',
        'views/tvShowsCollectionView',
        'views/actorView',
        'models/actorModel',
        'views/actorsCollectionView',
        'views/watchlistCollectionView',
        'views/userSettingsView'
    ], function ($, _, Backbone, Cookie, NavigationBarView, HomeView, AuthenticationView,
                 UserModel, MovieView, MovieModel, MovieCollectionView, TvShowView, TvShowSeasonView,
                 TvShowSeasonModel, TvShowCollectionView, ActorView, ActorModel, ActorCollectionView, WatchlistCollectionView,
                 UserView) {

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
            var currentView;
            var uMovieRouter = new UMovieRouter();

            var session = new UserModel();
            var navigationBarView = new NavigationBarView();

            uMovieRouter.listenTo(Backbone, 'router:go', uMovieRouter.go);

            var lastAuthState = 'disconnected';


            var noAuthPage = function (signUp) {
                session.disconnect();
                navigationBarView.render();
                authenticationView.render(signUp);
            };

            var updateNavigationBar = function () {
                if ((Cookie.get('token') === undefined && lastAuthState == 'connected') ||
                    (Cookie.get('token') !== undefined && lastAuthState == 'disconnected')) {
                    navigationBarView.render();
                }
                navigationBarView.closeMenusIfNeeded();
            };

            var checkCredentials = function () {
                if (Cookie.get('token') === undefined) {
                    lastAuthState = 'disconnected';
                    if (lastAuthState === 'connected') {

                    }
                    return false;
                } else {
                    if (lastAuthState === 'disconnected') {

                    }
                    lastAuthState = 'connected';
                    return true;
                }
            };

            /**
             * Sets the main view information to the ones of the passed class,
             * with the correspondent model, if any is given
             * @param ViewClass The class to be set as principalView
             * @param newModel the model to give to the class so it can render it
             */
            var updateMainView = function (ViewClass, newModel) {
                if (checkCredentials()) {
                    currentView = newModel ? new ViewClass({model:newModel}) : new ViewClass();
                } else {
                    noAuthPage(false);
                }
                updateNavigationBar();
            };

            //Shows the login at start up. If the user has already logged in, the home page will be shown.
            authenticationView = new AuthenticationView(session, false);
            updateMainView(HomeView, undefined);


            uMovieRouter.on('route:goHome', function () {
                updateMainView(HomeView, undefined);
            });

            // Movies
            uMovieRouter.on('route:displayMovies', function () {
                updateMainView(MovieCollectionView, undefined);
            });

            uMovieRouter.on('route:displaySpecificMovie', function (movieId) {
                var id = parseInt(movieId);
                var newMovie = new MovieModel({trackId: id});
                updateMainView(MovieView, newMovie);
            });

            //TV Shows
            uMovieRouter.on('route:displayTvShows', function () {
                updateMainView(TvShowCollectionView, undefined);
            });

            uMovieRouter.on('route:displaySpecificTvShow', function (tvShowId) {
                var newId = parseInt(tvShowId);
                var newTvShowSeason = new TvShowSeasonModel({id: newId});
                updateMainView(TvShowSeasonView, newTvShowSeason);
            });

            //Actors
            uMovieRouter.on('route:displayActors', function () {
                updateMainView(ActorCollectionView, undefined);
            });

            uMovieRouter.on('route:displaySpecificActor', function (actorId) {
                var newActor = new ActorModel({id: actorId});
                updateMainView(ActorView, newActor);
            });


            uMovieRouter.on('route:displayWatchlists', function () {
                updateMainView(WatchlistCollectionView, undefined);
            });

            uMovieRouter.on('route:showUser', function () {
                    console.log(session);
                    updateMainView(UserView, session);
                    console.log('The user (id still to be determined) should be displayed now');
            });

            uMovieRouter.on('route:settings', function () {
                if (checkCredentials()) {
                    console.log('The settings should be displayed now');
                }
            });

            uMovieRouter.on('route:signup', function () {
                noAuthPage(true);
            });

            uMovieRouter.on('route:login', function () {
                noAuthPage(false);
            });

            uMovieRouter.on('route:disconnect', function () {
                noAuthPage(false);
            });

            uMovieRouter.on('route:defaultAction', function (actions) {
                console.log('Error : no route to', actions);
            });

            var setHeaderAuthorization = function () {
                $(document).ajaxSend(function (e, xhr, options) {
                    xhr.setRequestHeader("Authorization", Cookie.get('token'));
                });
            };

            setHeaderAuthorization();

            Backbone.history.start({root: '/UMovie'});

        };


        return {
            initialize: initialize
        };
    }
);
