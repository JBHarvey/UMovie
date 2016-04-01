/**
 * Created by Jean-Benoît on 2016-01-27.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'jscookie',
    '../models/tvShowEpisodeModel',
], function ($, _, Backbone, Cookie, TvShowEpisodeModel) {

    var Episodes = Backbone.Collection.extend({
        model: TvShowEpisodeModel,

        initialize: function (seasonId) {
            this.url = 'https://umovie.herokuapp.com/tvShows/season/' + seasonId + '/episodes';
        },

        parse: function (response) {
            return response.results;
        },
    });
    return Episodes;

});
