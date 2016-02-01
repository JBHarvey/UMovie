/**
 * Created by seydou on 16-01-27.
 */
define([
    'underscore',
    'backbone'
], function (_, Backbone) {

    var MovieModel = Backbone.Model.extend({
        defaults: {
            title: "Wolf Of Wall Street",
            link:" https://www.apple.com/ca/itunes/link/",
            genre:"Biopic / Thiller / Policier",
            date:"2014",
            description:"",
            image:"link",
            rating:"R",
            movie: "toto"
        }
    });


    return MovieModel;
});
