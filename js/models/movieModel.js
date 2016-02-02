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
            description:"Based on the true story of Jordan Belfort, from his rise to a wealthy stock-broker living the high life to his fall involving crime, corruption and the federal government.",
            image:"img/movie/wolfOfWallStreet.jpg",
            rating:"R",
            movie: "toto"
        }
    });


    return MovieModel;
});
