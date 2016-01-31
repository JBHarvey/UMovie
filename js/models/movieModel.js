/**
 * Created by seydou on 16-01-27.
 */
define([
    'underscore',
    'backbone'
], function (_, Backbone) {

    var MovieModel = Backbone.Model.extend({
        defaults: {
            title: "Movie browser!",
            movie: "toto"
        }
    });


    return MovieModel;
});
