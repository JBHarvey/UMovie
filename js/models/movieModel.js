/**
 * Created by Jean-Benoît on 16-01-27.
 */
define( [
    'underscore',
    'backbone'
], function( _, Backbone ) {

    var MovieModel = Backbone.Model.extend( {
        urlRoot: 'https://umovie.herokuapp.com/movies',
        idAttribute: 'trackId',

        sync: function( method, model, options ) {

            // To add to watchlist, you will have to pass watchlist ID in the options
            'use strict';
            if ( 'update' === method || 'create' === method ) {
                method = 'create';
                options.url = 'https://umovie.herokuapp.com/watchlists/' +
                        options.watchlistID + '/movies';
            }

            return Backbone.sync( method, model, options );
        },

        parse( data ) {
                if ( data.results !== undefined ) {
                    result = data.results[ 0 ];
                    result.convertDuration = this.convertDuration( result.trackTimeMillis );
                    result.releaseYear = this.releaseYear( result.releaseDate );
                    return data.results[ 0 ];
                } else {
                    return data;
                }
        },

        convertDuration( duration ) {
            return `${Math.ceil( duration / 60000 )} minutes`;
        },

        releaseYear( date ) {
            return new Date( date ).getFullYear();
        },

        defaults: {
            'urlRoot': 'https://umovie.herokuapp.com/movie/265727087',
            'wrapperType': 'track',
            'kind': 'feature-movie',
            'trackId': 265727087,
            'artistName': 'James Wan',
            'trackName': 'Saw',
            'trackCensoredName': 'Saw',
            'trackViewUrl': 'https://itunes.apple.com/us/movie/saw/id265727087?uo=4',
            'previewUrl': 'http://a978.v.phobos.apple.com/us/r1000/097/Video/a6/aa/f2/mzm.jszrvyyu..640x360.h264lc.D2.p.m4v',
            'artworkUrl30': 'http://is5.mzstatic.com/image/pf/us/r30/Music/af/37/e2/dj.fsfobjrm.30x30-50.jpg',
            'artworkUrl60': 'http://is2.mzstatic.com/image/pf/us/r30/Music/af/37/e2/dj.fsfobjrm.60x60-50.jpg',
            'artworkUrl100': 'http://is2.mzstatic.com/image/pf/us/r30/Music/af/37/e2/dj.fsfobjrm.100x100-75.jpg',
            'collectionPrice': 9.99,
            'trackPrice': 9.99,
            'convertDuration': '104 minutes',
            'trackRentalPrice': 2.99,
            'collectionHdPrice': 12.99,
            'trackHdPrice': 12.99,
            'trackHdRentalPrice': 3.99,
            'releaseDate': '2004-10-29T07:00:00Z',
            'releaseYear': 2004,
            'collectionExplicitness': 'notExplicit',
            'trackExplicitness': 'notExplicit',
            'trackTimeMillis': 6187486,
            'country': 'USA',
            'currency': 'USD',
            'primaryGenreName': 'Horror',
            'contentAdvisoryRating': 'R',
            'longDescription': 'Would you die to live? That\'s what two men, Adam (Leigh Whannell) and Gordon (Cary Elwes), have to ask themselves when they\'re paired up in a deadly situation. Abducted by a serial killer, they\'re trapped up in a prison constructed with such ingenuity that they may not be able to escape before their captor decides it\'s time to dismantle their bodies in his signature way. Attempting to break free may kill them, but staying definitely will.',
            'radioStationUrl': 'https://itunes.apple.com/station/idra.265727087',
            'productionHouse': 'N/A',
            'writers': 'N/A',
            'language': 'English'
        }

    } );

    return MovieModel;
} );
