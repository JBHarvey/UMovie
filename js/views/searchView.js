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
], function ($, _, Backbone, ThumbnailView, Movies, Seasons, Actors, SearchCollectionView, searchGroupTemplate, Handlebars, TmdbData, SearchModel) {

    var SearchView = Backbone.View.extend({

        el: '#content',

        searchToShow: {
            group: undefined,
        },


        selectSearchScope: function () {
            if (this.scope.movie) {
                this.searchToShow.group.concat({name: 'Movie'});
            }
            if (this.scope.season) {
                this.searchToShow.group.concat({name: 'Season'});
            }
            if (this.scope.actor) {
                this.searchToShow.group.concat({name: 'Actor'});
            }
            if (this.scope.member) {
                this.searchToShow.group.concat({name: 'Member'});
            }
        }, initialize: function () {

            var that = this;
            that.searchManager = new SearchModel();
            that.searchWord = that.model.searchWord;
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
            console.log(that.searchToShow);
            var resultSearchView = template(that.searchToShow);
            this.$el.html(resultSearchView);
/*
            this.searches.forEach(function (search) {
                console.log(that.textToSearch);
                console.log(viewToShow);
                search.render();
            });
*/
            this.activateSearches(that);

        },

        activateSearches: function (that) {
            if (this.scope.movie) {
                var movies = new Movies();
                movies.url = function () {
                    return that.searchMovie();
                };
                var searchCollection = new SearchCollectionView({
                    collection: movies,
                    el: '#movie-search-result',
                });
            }
            if (this.scope.season) {
                this.movieCollectionView = new Seasons();
                this.movieCollectionView.el = '#season-search-result';
            }
            if (this.scope.actor) {
                this.movieCollectionView = new Actors();
                this.movieCollectionView.el = '#actor-search-result';
            }
            if (this.scope.member) {
                this.movieCollectionView = new Members();
                this.movieCollectionView.el = '#movie-search-result';
            }
        },

        searchMovie: function () {
            return this.generateSearchQuery('movies');

        },
        searchActor: function () {
            return this.generateSearchQuery('actor');

        },
        searchSeason: function () {
            return this.generateSearchQuery().setSearchType('tvshows/seasons').url();

        },
        searchMember: function () {
            return this.generateSearchQuery().setSearchType('member').url();

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


        /******************  REFACTOR MAJEUR ***************/

        /*
         initialize: function (collection) {
         var that = this;
         that.name = '';
         that.searchManager = new SearchModel();
         that.collection = new collection(); //correct??
         that.collection.url = that.generateSearchQuery(that.name);
         that.listenTo(that.collection, 'sync', that.render);
         that.collection.fetch();

         },


         render: function () { // Season
         var that = this;
         this.$el.html('');
         this.collection.each(function (model) {
         var thumbnail = new ThumbnailView({model: model});
         that.$el.append(thumbnail.render());
         if (model.tmdbRequest != undefined) {
         var tmdbData = new TmdbData();
         tmdbData.getTmdbActorData(actor.tmdbRequest, actor.imageId, actor.bioId);
         }
         });
         },


         */
        /******************  REFACTOR MAJEUR ******************/

        /* searchUser: function() {
         this.searchToShow.group.concat({name:'User', view: this.userCollectionView});
         this.searchToShow.group.append({name: 'User'});
         },*/
    });
    return SearchView;

});
