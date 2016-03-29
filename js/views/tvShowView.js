/**
 * Created by seydou on 16-02-07.
 */

define( [
    'jquery',
    'underscore',
    'backbone',
    'text!templates/tvShowEpisode.html',
    '../models/tvShowEpisodeModel',
    'handlebars'
], function( $, _, Backbone, tvShowEpisodeTemplate, TvShowEpisodeModel, Handlebars ) {

    var TvShowEpisodeView = Backbone.View.extend( {

        el: $( '#content' ),

        initialize: function( tvShowId ) {
            this.id = tvShowId;
            this.render();
        },

        render: function() {

            //The data used in the template
            var template = Handlebars.compile( tvShowEpisodeTemplate );

            var source = new TvShowEpisodeModel();
            var resultTvShowEpisode = template( source.defaults );
            this.$el.html( resultTvShowEpisode );
        }
    } );
    return TvShowEpisodeView;

} );
