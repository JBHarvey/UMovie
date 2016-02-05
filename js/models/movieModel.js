/**
 * Created by seydou on 16-01-27.
 */
define([
    'underscore',
    'backbone'
], function (_, Backbone) {

    var MovieModel = Backbone.Model.extend({
        hardcode: {

            title: "Wolf Of Wall Street",
            link: " https://www.apple.com/ca/itunes/link/",
            genre: "Biopic / Thiller / Policier",
            date: "2014",
            description: "Based on the true story of Jordan Belfort, from his rise to a wealthy stock-broker living the high life to his fall involving crime, corruption and the federal government.",
            image: "img/movie/wolfOfWallStreet.jpg",
            rating: "R",
            movie: "toto"
        },
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
