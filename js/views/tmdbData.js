

define([
    'jquery',
    'underscore',
    'backbone',
    'theMovieDb'
], function($, _, Backbone, theMovieDb) {
    var TmdbModel = Backbone.View.extend({


        initialize: function (searchRequest, imgClassName, bioClassName) {
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

            };


           // var query = theMovieDb.common.generateQuery(searchOptions);


            var searchArtist = theMovieDb.search
                .getPerson(searchOptions, that.successCB, that.errorCB); //plante ici
            console.log("ici");
            console.log(searchArtist);
            var artistSearchInfo = searchArtist.results[0];

            console.log("ici " + searchArtist);
            console.log(artistSearchInfo);

            var artistInfo = theMovieDb.people
                .getById({'id': artistSearchInfo.id}, successCD, errorCD);

            that.modifyBiography(artistInfo.biography)
                .modifyImage(artistSearchInfo.profile_path);

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
                var path = theMovieDb.images_uri + image;
                $(that.imgClassName).attr("src", path);
            }

            return this;
        },
        successCB: function(data){
            console.log(data);
            return this;
        },
        errorCB: function() {
            console.log("Error!");
            return this
        }

    });
    return TmdbModel;
});