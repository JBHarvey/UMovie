define([
    'jquery',
    'underscore',
    'backbone',
    'theMovieDb',
], function ($, _, Backbone, theMovieDb) {
    'use strict';

    var TmdbView = Backbone.View.extend({

        getTmdbSimilarMovie: function (searchRequest) {
            var that = this;
            that.searchRequest = searchRequest;

            var searchOptions = {
                query: that.searchRequest,
                page: 1,
            };

            var errorCB = function (data) {
                console.log('Erreur');
                console.log(data);
            };

            var searchSuccessCallback = function (data) {
                var movieSearch = JSON.parse(data);
                var movieSearchInfo = movieSearch.results[0];

                if (movieSearchInfo) {
                    theMovieDb.movies.getById({ id: movieSearchInfo.id }, function (data) {
                        // Do nothing
                    }, errorCB);
                }
            };

            theMovieDb.search.getMovie(searchOptions, searchSuccessCallback, errorCB);
        },

        getTmdbActorData: function (searchRequest, idImg, idBio) {
            var that = this;
            that.searchRequest = searchRequest;
            that.imgIdName = idImg;
            that.bioIdName = idBio;

            var searchOptions = {
                query: that.searchRequest,
                page: 1,
                include_adult: true,
            };

            var errorCB = function (data) {
                console.log('Erreur');
                console.log(data);
            };

            var searchSuccessCallback = function (data) {
                var artistSearch = JSON.parse(data);
                var artistSearchInfo = artistSearch.results[0];
                if (_.isObject(artistSearchInfo)) {
                    theMovieDb.people.getById({ id: artistSearchInfo.id }, function (data) {
                        that.actorToFind = JSON.parse(data);

                        that.modifySingleActorBio(that.actorToFind.biography)
                            .modifySingleActorImage(that.actorToFind.profile_path);
                    }, errorCB);
                }

            };

            theMovieDb.search.getPerson(searchOptions, searchSuccessCallback, errorCB);
        },

        getActorImgBio: function () {
            var that = this;
            var info = that.actorToFind;
            that.modifySingleActorBio(info.biography)
                .modifySingleActorImage(info.profile_path);
        },

        shortenText: function (textToShortent, length) {
            var newLength = length || 300;
            return `${textToShortent.slice(0, newLength)} ... `;

        },

        modifySingleActorBio: function (biography) {
            var that = this;

            if (biography) {
                const actorBioId = that.bioIdName;
                $(`#${actorBioId}`).each(function () {
                    if (actorBioId !== 'description') {
                        $(this).text(that.shortenText(biography));
                    } else {
                        $(this).text(biography);
                    }
                });
            }

            return this;
        },

        modifySingleActorImage: function (image) {
            var that = this;

            if (image) {
                var path = theMovieDb.common.images_uri + 'original' + image;

                const actorImageId = that.imgIdName;

                $(`#${actorImageId}`).attr('src', path);

            }

            return this;
        },

    });
    return TmdbView;
});
