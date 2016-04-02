define([
    'jquery',
    'underscore',
    'backbone',
    'theMovieDb'
], function ($, _, Backbone, theMovieDb) {

    var TmdbView = Backbone.View.extend({


        initialize: function () {
            this.searchRequest = "";
            this.imgIdName = "";
            this.bioIdName = "";


        },

        getTmdbSimilarMovie: function() {
            'use strict';
            var that = this;
            var searchOptions = {
                query : this.searchRequest,
                page: 1
            };
            var errorCB = function (data) {
                console.log("Erreur");
                console.log(data);
            };

            var searchSuccessCallback = function (data) {
                var movieSearch = JSON.parse(data);
                var movieSearchInfo = movieSearch.results[0];
                if(!movieSearchInfo) {
                    theMovieDb.getById({'id': movieSearchInfo.id}, function (data) {
                        var moviesInfo = JSON.parse(data);
                        console.log(moviesInfo);
                    })
                }
            };

            theMovieDb.search.getMovie(searchOptions, searchSuccessCallback, errorCB);
        },


        getTmdbActorData: function (searchRequest, idImg, idBio) {
            'use strict';
            var that = this;
            that.searchRequest = searchRequest;
            that.imgIdName = idImg;
            that.bioIdName = idBio;

            var searchOptions = {
                query: that.searchRequest,
                page: 1,
                include_adult: true
            };


            var errorCB = function (data) {
                console.log("Erreur");
                console.log(data);
            };

            var searchSuccessCallback = function (data) {
                var artistSearch = JSON.parse(data);
                var artistSearchInfo = artistSearch.results[0];
                if (artistSearchInfo  != null) {
                    theMovieDb.people.getById({'id': artistSearchInfo.id}, function (data) {
                        var artistInfo = JSON.parse(data);

                        that.modifySingleActorBio(artistInfo.biography)
                            .modifySingleActorImage(artistSearchInfo.profile_path);
                    }, errorCB);
                }
            };


            theMovieDb.search.getPerson(searchOptions, searchSuccessCallback, errorCB);


        },

        shortenText: function (textToShortent, length) {
            var newLength = length || 300;
            return `${textToShortent.slice(0, newLength)} ... `;


        },


        modifySingleActorBio: function (biography) {
            var that = this;

            if (biography) {

                const actorBioId =that.bioIdName;
                $(`#${actorBioId}`).each(function () {
                    if (actorBioId !== 'description'){
                        $(this).text(that.shortenText(biography));
                    }
                    else{
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

               // $(`#${actorImageId}`).attr("src", path);
                $(`#${actorImageId}`).
            }

            return this;
        }

    });
    return TmdbView;
});