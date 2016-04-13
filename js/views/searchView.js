/**
 * Created by Jean-Benoît on 16-03-08.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    '../views/movieCollectionView',
    '../views/actorsCollectionView',
    '../views/seasonCollectionView',
    /*'../views/memberCollectionView',*/
    'views/thumbnailView',
    'handlebars',
], function ($, _, Backbone, Movies, Actors, Seasons, /*Members,*/ ThumbnailView, Handlebars) {

    var SearchView = Backbone.View.extend({

        el: '#content',

        searchToShow: {
            group:[],
        },

        initialize: function () {

            this.movieCollectionView = new Movies();
            this.actorCollectionView = new Actors();
            this.seasonCollectionView = new Seasons();



            // To fix
           /* this.collection = new Movies();
            this.collection.url = this.collection.moviesDefaultQuery;

            this.listenTo(this.collection, 'sync', this.render);
            this.collection.fetch();*/
        },

        render: function () {
            that = this;
            this.$el.html('');

           //collectionview.render
        },

        searchMovie: function(searchName) {
            this.searchToShow.group.append({name:'movie'});
        },

        searchActor: function(searchName) {
        },

        searchSeason: function(searchName) {
        },

        searchUser: function(searchName) {
        },
    });
    return SearchView;

});
