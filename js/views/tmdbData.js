

define([
    'jquery',
    'underscore',
    'backbone',
    'theMovieDb'
], function($, _, Backbone, theMovieDb) {
    var TmdbModel = Backbone.View.extend({


        initialize: function (searchRequest, imgClassName, bioClassName) {
            console.log(theMovieDb);
            theMovieDb.common.api_key = '8e2fb63d78986604185e4448ce8fbaad';
            this.searchRequest = searchRequest;
            this.imgClassName = imgClassName;
            this.bioClassName = bioClassName;
            var that = this;
            that.getTmdbData();
        },


        getTmdbData: function () {
            'use strict';
            var that = this;

            var searchOptions = {
                query: that.searchRequest,
                page: 1,
                include_adult: true,
                search_Type: 'phrase'
            };
            console.log(searchOptions);

            var query = theMovieDb.common.generateQuery(searchOptions);

            var errorCB = function (data) {
                console.log(data);
            };

            var searchSuccessCallback = function (data) {
                var artistSearch = JSON.parse(data);
                var artistSearchInfo = artistSearch.results[0]

                theMovieDb.people.getById({'id': artistSearchInfo.id}, function (data) {
                    var artistInfo = JSON.parse(data);
                    that.modifyBiography(artistInfo.biography)
                        .modifyImage(artistSearchInfo.profile_path);
                }, errorCB);
            };

            theMovieDb.search.getPerson({query: query}, searchSuccessCallback, errorCB);


        },

        modifyBiography: function (biography) {
            var that = this;
            $(that.bioClassName).each(function () {
                $(this).text(biography);
            });

            return this;
        },

        modifyImage: function (image) {
            var that = this;
            if (image) {
                var path = theMovieDb.common.images_uri + 'original' + image;
                $(that.imgClassName).attr("src", path);
            }

            return this;
        }

    });
    return TmdbModel;
});