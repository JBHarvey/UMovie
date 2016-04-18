/**
 * Created by Jean-Benoît on 16-03-07.
 */
define([
    'underscore',
    'backbone',
], function (_, Backbone) {

    var EpisodeModel = Backbone.Model.extend({

        url: function () {
            return `https://umovie.herokuapp.com/tvshows/season/${this.attributes.collectionId}/episodes`;
        },

        parse(data) {
            if (data.results !== undefined) {
                return this.processData(data.results[0]);
            } else {
                return this.processData(data);
            }
        },

        processData(data) {
            if (data.trackPrice === -1) {
                data.trackPrice = 'N/A';
            }

            data.convertDuration = this.convertDuration(data.trackTimeMillis);
            data.releaseYear = this.releaseYear(data.releaseDate);
            data.entertainementName = data.trackName;
            data.cssClassType = 'episode';

            return data;
        },

        convertDuration(duration) {
            return `${Math.ceil(duration / 60000)} minutes`;
        },

        releaseYear(date) {
            return new Date(date).getFullYear();
        },

        defaults: {
            wrapperType: 'track',
            kind: 'tv-episode',
            trackHdPrice: 2.99,
            releaseDate: '2005-08-28T07:00:00Z',
            collectionExplicitness: 'notExplicit',
            trackExplicitness: 'notExplicit',
            discCount: 1,
            discNumber: 1,
            trackCount: 12,
            trackNumber: 1,
            trackTimeMillis: 3134815,
            country: 'USA',
            currency: 'USD',
            primaryGenreName: 'Drama',
            contentAdvisoryRating: 'TV-MA',
            shortDescription: 'In the pilot episode of this series, Caesar ends eight years of war with victory in Gaul, but a personal loss at home.',
            longDescription: '52 B.C. Eager to return to Rome after eight long years of war, Gaius Julius Caesar ends his campaign with a big triumph in Gaul--and news of a shattering personal loss at home. When his army\'s gold standard is stolen, Caesar\'s cousin and commander Mark Antony enlists two soldiers, Centurion Lucius Vorenus and Legionnaire Titus Pullo, to track it down.',
            radioStationUrl: 'https://itunes.apple.com/station/idra.279753813',
            productionHouse: 'N/A',
            writers: 'N/A',
            language: 'English',
            isEpisodeType: true,
        },

    });

    return EpisodeModel;
});
