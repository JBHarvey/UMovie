/**
 * Created by Jean-Benoît on 2016-01-27.
 */
define([
    'backbone',
], function (Backbone) {

    var genreModel = Backbone.Model.extend({
        urlRoot: 'https://umovie.herokuapp.com/genres',


        defaults: {
            id: 404,
            name: 'Genre not found',
        },

    });

    return genreModel;
});
