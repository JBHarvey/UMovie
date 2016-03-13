/**
 * Created by seydou on 16-02-07.
 */
define([
    'underscore',
    'backbone'
], function (_, Backbone) {

    var TvShowModel = Backbone.Model.extend({

        parse(data){
            if (data.results != undefined) {
                result = data.results[0];
                result.convertDuration = this.convertDuration(result.trackTimeMillis);
                result.releaseYear = this.releaseYear(result.releaseDate);
                return data.results[0];
            } else {
                return data;
            }
        },

        convertDuration(duration) {
            return `${Math.ceil(duration / 60000)} minutes`;
        },

        releaseYear(date) {
            return new Date(date).getFullYear();
        },
        defaults: {
            "wrapperType": "track",
            "kind": "tv-episode",
            "artistId": 278750007,
            "collectionId": 279175900,
            "trackId": 279753813,
            "artistName": "Rome",
            "collectionName": "Rome, Season 1",
            "trackName": "The Stolen Eagle",
            "collectionCensoredName": "Rome, Season 1",
            "trackCensoredName": "The Stolen Eagle",
            "artistViewUrl": "https://itunes.apple.com/us/tv-show/rome/id278750007?uo=4",
            "collectionViewUrl": "https://itunes.apple.com/us/tv-season/the-stolen-eagle/id279175900?i=279753813&uo=4",
            "trackViewUrl": "https://itunes.apple.com/us/tv-season/the-stolen-eagle/id279175900?i=279753813&uo=4",
            "previewUrl": "http://a1543.v.phobos.apple.com/us/r1000/038/Video2/v4/23/c3/85/23c38551-56aa-cc18-2195-b7bd5526dab6/mzvf_1547539782181340397.640x480.h264lc.D2.p.m4v",
            "artworkUrl30": "http://is3.mzstatic.com/image/pf/us/r30/Video7/v4/b5/17/49/b517492a-91b2-a098-4f75-a8b467cd4fb7/mzl.unbcquai.40x30-75.jpg",
            "artworkUrl60": "http://is1.mzstatic.com/image/pf/us/r30/Video7/v4/b5/17/49/b517492a-91b2-a098-4f75-a8b467cd4fb7/mzl.unbcquai.80x60-75.jpg",
            "artworkUrl100": "http://is1.mzstatic.com/image/pf/us/r30/Video7/v4/b5/17/49/b517492a-91b2-a098-4f75-a8b467cd4fb7/mzl.unbcquai.100x100-75.jpg",
            "collectionPrice": 19.99,
            "trackPrice": 1.99,
            "collectionHdPrice": 29.99,
            "trackHdPrice": 2.99,
            "releaseDate": "2005-08-28T07:00:00Z",
            "collectionExplicitness": "notExplicit",
            "trackExplicitness": "notExplicit",
            "discCount": 1,
            "discNumber": 1,
            "trackCount": 12,
            "trackNumber": 1,
            "trackTimeMillis": 3134815,
            "country": "USA",
            "currency": "USD",
            "primaryGenreName": "Drama",
            "contentAdvisoryRating": "TV-MA",
            "shortDescription": "In the pilot episode of this series, Caesar ends eight years of war with victory in Gaul, but a personal loss at home.",
            "longDescription": "52 B.C. Eager to return to Rome after eight long years of war, Gaius Julius Caesar ends his campaign with a big triumph in Gaul--and news of a shattering personal loss at home. When his army's gold standard is stolen, Caesar's cousin and commander Mark Antony enlists two soldiers, Centurion Lucius Vorenus and Legionnaire Titus Pullo, to track it down.",
            "radioStationUrl": "https://itunes.apple.com/station/idra.279753813",
            "productionHouse": "N/A",
            "writers": "N/A",
            "language": "English"
        }

    });

    return TvShowEpisodeModel;
});
