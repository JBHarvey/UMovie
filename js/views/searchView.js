/**
 * Created by Jean-Benoît on 16-03-08.
 */

define( [
    'jquery',
    'underscore',
    'backbone',
    '../collections/movieCollection',
    'thumbnailView',
    'handlebars'
], function( $, _, Backbone, Movies, ThumbnailView, Handlebars ) {

    var SearchView = Backbone.View.extend( {

        el: $( '#content' ),

        initialize: function() {

            // To fix
            this.collection = new Movies();
            this.collection.url = this.collection.moviesDefaultQuery;

            this.listenTo( this.collection, 'sync', this.render );
            this.collection.fetch();
        },

        render: function() {
            that = this;
            this.$el.html( '' );

            //That too
            this.collection.each( function( movie ) {
                var movieThumbnail = new ThumbnailView( { model: movie } );
                that.$el.append( movieThumbnail.render() );
            } );
        }
    } );
    return SearchView;

} );
