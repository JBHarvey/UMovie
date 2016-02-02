/**
 * Created by Jean-Benoît on 2016-01-27.
 */
define([
    'underscore',
    'backbone'
], function (_, Backbone) {

    var HomeModel = Backbone.Model.extend({
        defaults: {
            title: "Movie browser!",
            movie: "Fight Club",
        }
    });


    return HomeModel;
});
