/**
 * Created by Jean-Benoît on 16-03-01.
 */

define( [
    'jquery',
    'underscore',
    'backbone',
    '../collections/tvShowCollection',
    'views/thumbnailView',
    'handlebars',
    'models/searchModel'
], function( $, _, Backbone, TvShows, ThumbnailView, Handlebars, searchModel ) {

    var TvShowsCollectionView = Backbone.View.extend( {

        el: $( '#content' ),

        initialize: function() {
            this.searchManager = new searchModel();
            this.collection = new TvShows();
            this.collection.url = this.generateDefaultQuery();
            this.listenTo( this.collection, 'sync', this.render );
            this.collection.fetch();
        },

        render: function() {
            that = this;
            this.$el.html( '' );
            this.collection.each( function( tvShows ) {
                var thumbnail = new ThumbnailView( { model: tvShows } );
                that.$el.append( thumbnail.renderSeason() );
            } );
        },

        generateDefaultQuery: function() {
            this.searchManager.setSearchType( 'tvshows/seasons' );
            this.searchManager.setSearchName( 'dead' );
            this.searchManager.setSearchLimit( 100 );
            this.searchManager.setSearchGenre( '' );
            return this.searchManager.url();
        }
    } );
    return TvShowsCollectionView;

} );
