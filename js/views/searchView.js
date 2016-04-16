/**
 * Created by Jean-Benoît on 16-03-08.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'views/thumbnailView',
    '../collections/movieCollection',
    '../collections/seasonCollection',
    '../collections/actorCollection',
    'views/searchCollectionView',
    'text!../templates/seachGroup.html',
    'handlebars',
    'views/tmdbData',
    'models/searchModel',
], function ($, _, Backbone, ThumbnailView, Movies, Seasons, Actors,
             SearchCollectionView, searchGroupTemplate, Handlebars,
             TmdbData, SearchModel) {

    var SearchView = Backbone.View.extend({

        el: '#content',

        searchToShow: {group: [],},


        selectSearchScope: function () {
            var that = this;
            that.searchToShow = {
                searchWord: that.searchWord,
                group: []
            };
            var scope = that.scope;
            if (scope.match('movie')) {
                that.searchToShow.group.push({title: 'Movie', name: 'movies'});
            }
            if (scope.match('season')) {
                that.searchToShow.group.push({title: 'Season', name: 'tvshows'});
            }
            if (scope.match('actor')) {
                that.searchToShow.group.push({title: 'Actor', name: 'actors'});
            }
            if (scope.match('member')) {
                that.searchToShow.group.push({title: 'Member', name: 'members'});
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

        searchCollection: function (newCollection, idName, genres) {
            var searchCollectionView = new SearchCollectionView({
                collection: newCollection,
                el: idName,
                model: genres
            });
        },
        activateSearches: function () {
            var that = this;
            var idName = '';
            var newCollection = undefined;
            var genres = undefined;
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
                newCollection = new Members();
                newCollection.url = function () {
                    return that.searchMember();
                };

                that.searchCollection(newCollection, idName, genres);
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
            var name = this.searchWord ? this.searchWord : "";

            return that.searchManager
                .setSearchType(searchType)
                .setSearchName(name)
                .setSearchLimit(36)
                .setSearchGenre('')
                .url();

        },

        events: {
            'click .component-genre': 'toggleThumbnailGenre'
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

        selectActiveFilters(mediaType){
            var that = this;
            var filters = that.selectedGenres[mediaType];
            var filterKeys = Object.keys(filters);
            return filterKeys.filter(function (element) {
                if (filters[element] == true) {
                    return element;
                }
            });
        },

        applyGenreFilters: function (activeFilters, mediaType) {
            var targetedResults = document.getElementById(`${mediaType}-search-result`);
            var movieBoxes = targetedResults.getElementsByClassName('movies-box');


            for (var box in movieBoxes) {


                if (movieBoxes.hasOwnProperty(box)) {
                    var currentBox = movieBoxes[box];

                    var currentThumbnail = currentBox.getElementsByClassName('thumbnail');

                    var elementGenre = currentThumbnail[0].attributes.getNamedItem('media-primary-genre').nodeValue;

                    if (activeFilters.length != 0) {
                        if (activeFilters.includes(elementGenre)) {
                            console.log(movieBoxes[box]);
                            movieBoxes[box].style.display = "inline-flex";
                        }
                        else {
                            movieBoxes[box].style.display = "none";
                        }
                    } else {
                        movieBoxes[box].style.display = "inline-flex";
                    }

                }
            }
            /*
             for (var box in movieBoxes) {

             var currentBox = movieBoxes[box];

             if(typeof currentBox == typeof movieBoxes) {

             var currentThumbnail = currentBox.getElementsByClassName('thumbnail');
             console.log(currentBox);
             console.log(currentThumbnail);

             if (typeof currentThumbnail == typeof movieBoxes) { // This here ensures the current thumbnail is an object
             var elementGenre = currentThumbnail.attributes.getNamedItem('media-primary-genre').nodeValue;

             if (activeFilters.includes(elementGenre)) {
             console.log(movieBoxes[box]);
             }
             }
             }
             }
             */

        }

    });
    return SearchView;

});




























