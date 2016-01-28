/**
 * Created by Jean-Benoît on 2016-01-27.
 */
define([
    'backbone'
], function (Backbone) {

    var MovieGenreModel = Backbone.Model.extend({
        defaults: {
            id: "404",
            name: "Genre not found"
        }

        /*
         *
         *  Just in case you wanted to prepare a movie genre browsing, here's what the server sends back
         *
         [{"id": "4401", "name": "Action & Adventure"}, {"id": "4402", "name": "Anime"}, {
         "id": "4403",
         "name": "Classics"
         }, {"id": "4404", "name": "Comedy"}, {"id": "4405", "name": "Documentary"}, {
         "id": "4406",
         "name": "Drama"
         }, {"id": "4407", "name": "Foreign"}, {"id": "4408", "name": "Horror"}, {
         "id": "4409",
         "name": "Independent"
         }, {"id": "4410", "name": "Kids & Family"}, {"id": "4411", "name": "Musicals"}, {
         "id": "4412",
         "name": "Romance"
         }, {"id": "4413", "name": "Sci-Fi & Fantasy"}, {"id": "4414", "name": "Short Films"}, {
         "id": "4415",
         "name": "Special Interest"
         }, {"id": "4416", "name": "Thriller"}, {"id": "4417", "name": "Sports"}, {
         "id": "4418",
         "name": "Western"
         }, {"id": "4419", "name": "Urban"}, {"id": "4420", "name": "Holiday"}, {
         "id": "4421",
         "name": "Made for TV"
         }, {"id": "4422", "name": "Concert Films"}, {"id": "4423", "name": "Music Documentaries"}, {
         "id": "4424",
         "name": "Music Feature Films"
         }, {"id": "4425", "name": "Japanese Cinema"}, {"id": "4426", "name": "Jidaigeki"}, {
         "id": "4427",
         "name": "Tokusatsu"
         }, {"id": "4428", "name": "Korean Cinema"}, {"id": "4429", "name": "Russian"}, {
         "id": "4430",
         "name": "Turkish"
         }, {"id": "4431", "name": "Bollywood"}, {"id": "4432", "name": "Regional Indian"}, {
         "id": "4433",
         "name": "Middle Eastern"
         }, {"id": "4434", "name": "African"}]

         *
         * */
    });


    return MovieGenreModel;
});
