/**
 * Created by Jean-Benoît on 2016-01-27.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'jscookie',
    '../models/tvShowEpisodeModel'
], function ($, _, Backbone, Cookie, TvShowEpisodeModel) {

    var Episodes = Backbone.Collection.extend({
        model: TvShowEpisodeModel,
        url: '/tvShows/episodes',

        parse: function (response) {
            return response.results;
        },
    });
    return Episodes;

});
