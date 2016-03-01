/**
 * Created by seydou on 16-01-27.
 */
define([
    'underscore',
    'backbone'
], function (_, Backbone) {

    var MovieModel = Backbone.Model.extend({

        defaults: {
            wrapperType: undefined,
            kind: undefined,
            trackId: undefined,
            artistName: undefined,
            trackName: undefined,
            trackCensoredName: undefined,
            trackViewUrl: undefined,
            previewUrl: undefined,
            artworkUrl30: undefined,
            artworkUrl60: undefined,
            artworkUrl100: undefined,
            trackPrice: undefined,
            trackRentalPrice: undefined,
            trackHdPrice: undefined,
            trackHdRentalPrice: undefined,
            collectionPrice: undefined,
            collectionHdPrice: undefined,
            releaseDate: undefined,
            collectionExplicitness: undefined,
            trackTimeMillis: undefined,
            country: undefined,
            currency: undefined,
            primaryGenreName: undefined,
            contentAdvisoryRating: undefined,
            longDescription: undefined,
            radioStationUrl: undefined

        }
    });

    return MovieModel;
});
