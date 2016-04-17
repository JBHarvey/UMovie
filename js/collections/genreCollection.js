/**
 * Created by rives on 4/15/2016.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'jscookie',
    '../models/genreModel',
], function ($, _, Backbone, Cookie, GenreModel) {

    var Genres = Backbone.Collection.extend({
        model: GenreModel,

        parse: function (response) {
            return response;
        },
    });
    return Genres;
});
