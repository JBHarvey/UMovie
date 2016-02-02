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
            url: "http://www.forgjetthebox.net/wp-content/uploads/2013/05/Iron-Man-3-2013-Movie-Title-Banner.jpg"
        }
    });


    return HomeModel;
});
