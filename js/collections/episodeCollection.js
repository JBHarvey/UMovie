/**
 * Created by Jean-Benoît on 2016-01-27.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'jscookie',
    'models/episodeModel',
], function ($, _, Backbone, Cookie, EpisodeModel) {

    var Episodes = Backbone.Collection.extend({
        model: EpisodeModel,

        initialize: function (seasonId) {
            this.url = `https://umovie.herokuapp.com/tvShows/season/${seasonId}/episodes`;
        },

        parse: function (response) {
            return response.results;
        },
    });
    return Episodes;

});
