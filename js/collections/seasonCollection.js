/**
 * Created by Jean-Benoît on 2016-01-27.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'jscookie',
    'models/seasonModel',
], function ($, _, Backbone, Cookie, SeasonModel) {

    var Seasons = Backbone.Collection.extend({
        model: SeasonModel,
        url: 'https://umovie.herokuapp.com/tvShows',

        parse: function (response) {
            return response.results;
        },
    });
    return Seasons;

});
