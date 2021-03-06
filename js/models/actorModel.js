/**
 * Created by rives on 2016-01-28.
 */

define([
    'underscore',
    'backbone',
], function (_, Backbone) {
    'use strict';

    var ActorModel = Backbone.Model.extend({
        urlRoot: 'https://umovie.herokuapp.com/actors',

        parse(data) {
            if (_.isObject(data.results)) {
                return this.processData(data.results[0]);
            } else {
                return this.processData(data);
            }
        },

        processData(data) {
            var that = this;
            var nameEncode = that.formatForHtmlId(data.artistName);
            data.imageId = `${nameEncode}Img`;
            data.bioId = `${nameEncode}Bio`;
            data.tmdbRequest = encodeURI(data.artistName);

            return data;
        },

        formatForHtmlId: function (stringToChange) {
            var formatedText = stringToChange.replace(/\./gi, '');
            return formatedText.replace(/ /gi, '_');
        },

        defaults: {
            urlRoot: `/actors/253584821`,
            wrapperTyper: 'artist',
            artistType: 'Artist',
            artistName: 'John Sawyer',
            artistLinkUrl: 'https://itunes.apple.com/us/artist/john-sawyer/id253584821?uo=4',
            artistId: 253584821,
            amgArtistId: 122340,
            primaryGenreName: 'Tribute',
            primaryGenreId: 100022,
            radioStationUrl: 'https://itunes.apple.com/station/idra.253584821',
            imgActor: 'url(../../img/actor/noProfile.jpg',
            isActorType: true,
        },

    });

    return ActorModel;
});
