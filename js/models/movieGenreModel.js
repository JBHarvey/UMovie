/**
 * Created by Jean-Benoît on 2016-01-27.
 */
define([
    'backbone'
], function (Backbone) {

    var MovieGenreModel = Backbone.Model.extend({
        defaults: {
            id: 404,
            name: "Genre not found"
        }

    });


    return MovieGenreModel;
});
