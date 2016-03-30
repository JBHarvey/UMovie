/**
 * Created by Jean-Benoît on 2016-01-27.
 */
define([
    'backbone',
    'models/movieGenreModel',
], function (Backbone, MovieGenreModel) {

    var MovieGenres = Backbone.Model.Collection({
        url: '/genres/movies',
        model: MovieGenreModel,
    });

    return HomeModel;
});
