/**
 * Created by Vincent on 16-03-01.
 */

//Creating a template for the usage of the movies and tv shows
// thumbnails in their respective pages.
define([
    'underscore',
    'backbone'
], function (_, Backbone){

    var ImageLinkModel = Backbone.Model.extend({
        defaults: {
            "artworkUrl60" : '',
            "urlReference" : '/movie',
            "id" : 25,
            "releaseDate" : '2014-',
            "trackName" : "",
            "collectionName" : ""

        },

        movie: {
            "artworkUrl60" : '',
            "urlReference" : '/movies',
            "id" : 25,
            "releaseDate" : '',
            "trackName" : "",
            "collectionName" : ""

        },

        tvShow: {
            "artworkUrl60" : "http://is3.mzstatic.com/image/pf/us/r30/Video7/v4/b5/17/49/b517492a-91b2-a098-4f75-a8b467cd4fb7/mzl.unbcquai.40x30-75.jpg",
            "urlReference" : '/tvShows',
            "id": 279753813,
            "releaseDate" : '2005-08-28T07:00:00Z',
            "trackName" : "",
            "collectionName" : ""

        }
    });

    return ImageLinkModel;
});