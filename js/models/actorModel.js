/**
 * Created by rives on 2016-01-28.
 */


define([
    'underscore',
    'backbone'
],function(_, Backbone) {

    var ActorModel = Backbone.Model.extend({
        defaults:{
            wrapperTyper: "",
            artistType: "",
            artistName: "",
            artistLinkUrl: "",
            artistId: -1,
            amgArtistId: -1,
            primaryGenreName: "",
            primaryGenreId: -1,
            radioStationUrl: ""
        }
    });

    return ActorModel;
});