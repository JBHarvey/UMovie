/**
 * Created by Jean-Benoît on 2016-01-27.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'jscookie',
    '../models/tvShowSeasonModel'
], function ($, _, Backbone, Cookie, TvShowModel) {

    var TvShows = Backbone.Collection.extend({
        model: TvShowModel,
        url: '/tvShows',

        parse: function (response) {
            console.log(response);
            return response.results;
        }
    });
    return TvShows;

});
