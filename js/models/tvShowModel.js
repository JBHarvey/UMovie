/**
 * Created by seydou on 16-02-07.
 */
/**
 * Created by seydou on 16-02-07.
 */
define([
    'underscore',
    'backbone'
], function (_, Backbone) {

    var TvShowModel = Backbone.Model.extend({
        hardcode: {

            title: "House of Cards",
            link: " https://www.apple.com/ca/itunes/link/",
            genre: "Drama / Politics",
            date: "2013",
            description: "Created by Beau Willimon, “House of Cards,” takes a look into the sneaky politics and the underhand of U.S. electoral politics. The one-hour drama follows Frank Underwood (Kevin Spacey, an ambitious politician with his eye on the top job.",
            image: "img/tvShow/houseOfCards.jpg",
            rating: "Everyone",
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

    return TvShowModel;
});
