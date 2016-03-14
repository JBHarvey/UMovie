/**
 * Created by seydou on 16-02-07.
 */
define([
    'underscore',
    'backbone'
], function (_, Backbone) {

    var TvShowSeasonModel = Backbone.Model.extend({
        urlRoot: "https://umovie.herokuapp.com/seasons",
        parse(data){
            if (data.results != undefined) {
                result = data.results[0];
                result.releaseYear = this.releaseYear(result.releaseDate);
                return data.results[0];
            } else {
            return data;
}
        },

        releaseYear(date) {
            return new Date(date).getFullYear();
        },

        defaults: {
            "wrapperType": "collection",
            "collectionType": "TV Season",
            "artistId": 278750007,
            "collectionId": 279175900,
            "artistName": "Rome",
            "collectionName": "Rome, Season 1",
            "collectionCensoredName": "Rome, Season 1",
            "artistViewUrl": "https://itunes.apple.com/us/tv-show/rome/id278750007?uo=4",
            "collectionViewUrl": "https://itunes.apple.com/us/tv-season/rome-season-1/id279175900?uo=4",
            "artworkUrl60": "http://is4.mzstatic.com/image/pf/us/r30/Video2/v4/8e/5d/67/8e5d6720-1da6-b8fa-d10e-262e2d68a482/mzl.lhhvljhw.60x60-50.jpg",
            "artworkUrl100": "http://is2.mzstatic.com/image/pf/us/r30/Video2/v4/8e/5d/67/8e5d6720-1da6-b8fa-d10e-262e2d68a482/mzl.lhhvljhw.100x100-75.jpg",
            "collectionPrice": 19.99,
            "collectionHdPrice": 29.99,
            "collectionExplicitness": "notExplicit",
            "contentAdvisoryRating": "TV-MA",
            "trackCount": 12,
            "copyright": "© 2005 Home Box Office, Inc.",
            "country": "USA",
            "currency": "USD",
            "releaseDate": "2008-05-12T07:00:00Z",
            "releaseYear": 2008,
            "primaryGenreName": "Drama",
            "longDescription": "Every city has its secrets. HBO presents Season 1 of this epic series about generals and soldiers, masters and slaves, husbands and wives &#8212; all entwined in the furious historical events that saw the death of a republic and the birth of an empire. The season begins in 52 B.C. as Gaius Julius Caesar completes his quest of Gaul after eight years of war and prepares to return with his army to Rome. But while Caesar's self-interested niece Atia and long-lost paramour Servilia anxiously await his return, the ruling patricians despair that Caesar's homecoming will disrupt the status quo. As Caesar's legions move closer to Rome, allegiances are put to the test for both soldiers and civilians &#8212; and the escalating tensions climax with a full-scale conflict destined to change history. The ensemble cast includes Kevin McKidd, Ray Stevenson, Polly Walker, Kenneth Cranham, Tobias Menzies, James Purefoy, and Ciar&#225;n Hinds.",
            "productionHouse": "N/A",
            "writers": "N/A",
            "language": "English"
        }

    });

    return TvShowSeasonModel;
});
