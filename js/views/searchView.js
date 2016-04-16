/**
 * Created by Jean-Benoît on 16-03-08.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'views/thumbnailView',
    'collections/movieCollection',
    'collections/seasonCollection',
    'collections/actorCollection',
    'views/searchCollectionView',
    'text!templates/searchGroup.html',
    'handlebars',
    'views/tmdbData',
    'models/searchModel',
], function ($, _, Backbone, ThumbnailView, Movies, Seasons, Actors, SearchCollectionView, searchGroupTemplate, Handlebars, TmdbData, SearchModel) {

    var SearchView = Backbone.View.extend({

        el: '#content',

        searchToShow: { group: [], },

        selectSearchScope: function () {
            var that = this;
            that.searchToShow = { group: [] };
            var scope = that.scope;
            if (scope.match('movie')) {
                that.searchToShow.group.push({ name: 'Movie' });
            }

            if (scope.match('season')) {
                that.searchToShow.group.push({ name: 'Season' });
            }

            if (scope.match('actor')) {
                that.searchToShow.group.push({ name: 'Actor' });
            }

            if (scope.match('member')) {
                that.searchToShow.group.push({ name: 'Member' });
            }
        },

        initialize: function () {

            var that = this;

            that.searchManager = new SearchModel();
            that.searchWord = decodeURI(that.model.searchWord);
            that.scope = that.model.scope;
            that.model = undefined;
            this.searches = {};

            this.selectSearchScope();
            this.render();
        },

        render: function () {
            var that = this;
            this.$el.html('');
            var template = Handlebars.compile(searchGroupTemplate);
            var resultSearchView = template(that.searchToShow);
            this.$el.html(resultSearchView);

            this.activateSearches();

        },

        searchCollection: function (newCollection, idName) {
            var searchCollection = new SearchCollectionView({
                collection: newCollection,
                el: idName,
            });

        },

        activateSearches: function () {
            var that = this;
            var idName = '';
            var newCollection;
            var scope = that.scope;
            if (scope.match('movie')) {
                idName = '#Movie-search-result';
                newCollection = new Movies();
                newCollection.url = function () {
                    return that.searchMovie();
                };

                this.searchCollection(newCollection, idName);
            }

            if (scope.match('season')) {
                idName = '#Season-search-result';
                newCollection = new Seasons();
                newCollection.url = function () {
                    return that.searchSeason();
                };

                this.searchCollection(newCollection, idName);
            }

            if (scope.match('actor')) {
                idName = '#Actor-search-result';
                newCollection = new Actors();
                newCollection.url = function () {
                    return that.searchActor();
                };

                this.searchCollection(newCollection, idName);
            }

            if (scope.match('member')) {
                idName = '#Member-search-result';
                newCollection = new Members();
                newCollection.url = function () {
                    return that.searchMember();
                };

                this.searchCollection(newCollection, idName);
            }
        },

        searchMovie: function () {
            return this.generateSearchQuery('movies');

        },

        searchActor: function () {
            return this.generateSearchQuery('actors');

        },

        searchSeason: function () {
            return this.generateSearchQuery('tvshows/seasons');

        },

        searchMember: function () {
            return this.generateSearchQuery('member');

        },

        generateSearchQuery: function (searchType) {
            var that = this;
            var name = this.searchWord ? this.searchWord : '';

            return that.searchManager
                .setSearchType(searchType)
                .setSearchName(name)
                .setSearchLimit(36)
                .setSearchGenre('')
                .url();

        },
    });
    return SearchView;

});
