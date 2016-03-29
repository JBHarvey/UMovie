/**
 * Created by Jean-Benoît on 16-02-07.
 */

define( [
    "jquery",
    "underscore",
    "backbone",
    "text!templates/tvshow.html",
    "../models/tvShowSeasonModel",
    "handlebars"
], function( $, _, Backbone, TvShowSeasonTemplate, TvShowSeasonModel, Handlebars ) {

    var TvShowSeasonView = Backbone.View.extend( {

        el: $( "#content" ),

        initialize: function() {
            this.listenTo( this.model, "change", this.render );
            this.model.fetch();
        },

        render: function() {

            //The data used in the template
            var template = Handlebars.compile( TvShowSeasonTemplate );

            var source = this.model.attributes;
            var resultTvShowSeason = template( source );
            console.log( resultTvShowSeason );
            this.$el.html( resultTvShowSeason );
        }
    } );
    return TvShowSeasonView;

} );
