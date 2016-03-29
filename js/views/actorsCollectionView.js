/**
 * Created by rives on 2016-03-10.
 */

define( [
    'jquery',
    'underscore',
    'backbone',
    '../collections/actorCollection',
    'views/thumbnailView',
    'handlebars',
    'models/searchModel'
], function( $, _, Backbone, Actors, ThumbnailView, Handlebars, searchModel ) {

    var ActorsCollectionView = Backbone.View.extend( {

        el: $( '#content' ),

        initialize: function() {
            this.searchManager = new searchModel();
            this.collection = new Actors();
            this.collection.url = this.generateDefaultQuery();
            this.listenTo( this.collection, 'sync', this.render );
            this.collection.fetch();
        },

        render: function() {
            that = this;
            this.$el.html( '' );
            this.collection.each( function( actor ) {
                var thumbnail = new ThumbnailView( { model: actor } );
                that.$el.append( thumbnail.renderActor() );
            } );

        },

        generateDefaultQuery: function() {
            this.searchManager.setSearchType( 'actors' );
            this.searchManager.setSearchName( 'Brad' );
            this.searchManager.setSearchLimit( 10 );
            return this.searchManager.url();

        }
    } );
    return ActorsCollectionView;
} );
