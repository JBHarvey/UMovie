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
    'collections/userCollection',
    'views/searchCollectionView',
    'text!templates/searchGroup.html',
    'handlebars',
    'views/tmdbData',
    'models/searchModel',
], function ($, _, Backbone, ThumbnailView, Movies, Seasons, Actors, Users,
             SearchCollectionView, searchGroupTemplate, Handlebars,
             TmdbData, SearchModel) {

    var SearchView = Backbone.View.extend({

        el: '#content',

        searchToShow: { group: [], },

        selectSearchScope: function () {
            var that = this;

            that.searchToShow = {
                searchWord: that.searchWord,
                group: [],
            };
            var scope = that.scope;
            if (scope.match('movie')) {
                that.searchToShow.group.push({ title: 'Movie', name: 'movies' });
            }

            if (scope.match('season')) {
                that.searchToShow.group.push({ title: 'Season', name: 'tvshows' });
            }

            if (scope.match('actor')) {
                that.searchToShow.group.push({ title: 'Actor', name: 'actors' });
            }

            if (scope.match('member')) {
                that.searchToShow.group.push({ title: 'Member', name: 'members' });

            }
        },

        initialize: function () {

            var that = this;

            that.searchManager = new SearchModel();
            that.searchWord = decodeURI(that.model.searchWord);
            that.scope = that.model.scope;
            that.model = undefined;

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

        activateSearches: function () {
            var that = this;
            var idName = '';
            var newCollection;
            var genres;
            var scope = that.scope;

            if (scope.match('movie')) {
                idName = '#movies-search-result';
                newCollection = new Movies();
                newCollection.url = function () {
                    return that.searchMovie();
                };

                genres = 'movies';
                that.searchCollection(newCollection, idName, genres);
            }

            if (scope.match('season')) {
                idName = '#tvshows-search-result';
                newCollection = new Seasons();
                newCollection.url = function () {
                    return that.searchSeason();
                };

                genres = 'tvshows';
                that.searchCollection(newCollection, idName, genres);
            }

            if (scope.match('actor')) {
                idName = '#actors-search-result';
                newCollection = new Actors();
                newCollection.url = function () {
                    return that.searchActor();
                };

                that.searchCollection(newCollection, idName, genres);

            }

            if (scope.match('member')) {
                idName = '#members-search-result';
                newCollection = new Users();
                newCollection.url = function () {
                    return that.searchMember();
                };

                that.searchCollection(newCollection, idName, genres);
            }

        },

        searchCollection: function (newCollection, idName, genres) {
            var searchCollectionView = new SearchCollectionView({
                collection: newCollection,
                el: idName,
                model: genres,
            });
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
            return this.generateSearchQuery('users');

        },

        generateSearchQuery: function (searchType) {
            var that = this;
            var query = that.searchWord ? that.searchWord : '';
            query = searchType == 'users' ? '' : query;
            var limit = searchType == 'users' ? 0 : 100000;

            return that.searchManager
                .setSearchType(searchType)
                .setSearchName(query)
                .setSearchLimit(limit)
                .url();

        },

        events: {
            'click .component-genre': 'toggleThumbnailGenre',
        },

        selectedGenres: {
            movies: {},
            tvshows: {},
        },

        toggleThumbnailGenre: function (event) {
            var that = this;
            var genreClass = event.target.attributes.getNamedItem('class').nodeValue;
            var genre = event.target.attributes.getNamedItem('genre-name').nodeValue;
            var mediaType = event.target.attributes.getNamedItem('type-name').nodeValue;

            if (genreClass.match(/ filter-selected/g)) {
                event.target.attributes.getNamedItem('class').nodeValue = genreClass.replace(/ filter-selected/g, '');
                that.selectedGenres[mediaType][genre] = false;
            } else {
                event.target.attributes.getNamedItem('class').nodeValue = `${genreClass} filter-selected`;
                that.selectedGenres[mediaType][genre] = true;
            }

            var activeFilters = that.selectActiveFilters(mediaType);
            that.applyGenreFilters(activeFilters, mediaType);
        },

        selectActiveFilters(mediaType) {
            var that = this;
            var filters = that.selectedGenres[mediaType];
            var filterKeys = Object.keys(filters);
            return filterKeys.filter(function (element) {
                if (filters[element] === true) {
                    return element;
                }
            });
        },

        applyGenreFilters: function (activeFilters, mediaType) {
            var that = this;
            var mediaBoxes = this.fetchMediaBoxes(mediaType);

            for (var box in mediaBoxes) {
                if (mediaBoxes.hasOwnProperty(box)) {

                    if (that.filtersNotEmpty(activeFilters)) {

                        var elementGenre = that.fetchMediaGenre(mediaBoxes[box]);
                        if (activeFilters.includes(elementGenre)) {
                            that.showMedia(mediaBoxes[box]);
                        } else {
                            that.hideMedia(mediaBoxes[box]);
                        }
                    } else {
                        that.showMedia(mediaBoxes[box]);
                    }
                }
            }
        },

        fetchMediaBoxes: function (mediaType) {
            var targetedResults = document.getElementById(`${mediaType}-search-result`);
            return targetedResults.getElementsByClassName('movies-box');

        },

        fetchMediaGenre: function (mediaBox) {
            var currentThumbnail = mediaBox.getElementsByClassName('thumbnail');
            return currentThumbnail[0].attributes.getNamedItem('media-primary-genre').nodeValue;
        },

        showMedia: function (mediaBox) {
            mediaBox.style.display = 'inline-flex';
        },

        hideMedia: function (mediaBox) {
            mediaBox.style.display = 'none';
        },

        filtersNotEmpty: function (activeFilters) {
            return activeFilters.length !== 0;
        },

    });
    return SearchView;

});

