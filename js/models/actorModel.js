/**
 * Created by rives on 2016-01-28.
 */


define([
    'underscore',
    'backbone'
],function(_, Backbone) {

    var ActorModel = Backbone.Model.extend({
        urlRoot: "https://umovie.herokuapp.com/actors",

        parse(data) {
          if (data.results != undefined) {
              return data.results[0];
          }else {
              return data;
          }
        },


        defaults:{
            "urlRoot" : 'https://umovie.herokuapp.com/actors/253584821',
            "wrapperTyper": "artist",
            "artistType": "Artist",
            "artistName": "John Sawyer",
            "artistLinkUrl": "https://itunes.apple.com/us/artist/john-sawyer/id253584821?uo=4",
            "artistId": 253584821,
            "amgArtistId": 122340,
            "primaryGenreName": "Tribute",
            "primaryGenreId": 100022,
            "radioStationUrl": "https://itunes.apple.com/station/idra.253584821"
        },

        updateInformationsFromTMDB: function () {
            var that = this;

            //Appel d'api externe
            var dataBaseUrl =  "https://api.themoviedb.org/3";
            var dataBaseApiKey = "?api_key=8e2fb63d78986604185e4448ce8fbaad";
            var dataBaseImg = "https://image.tmdb.org/t/p/original";
            var actorName = "&query=" + that.attributes.artistName.split(' ').join('+');

            $.ajax({
                type: "GET",
                url: dataBaseUrl + "/search/person" + dataBaseApiKey + actorName,
                dataType: 'jsonp',
                jsonCallback: 'test',
                contentType: 'application/json',
                success: function(data) {
                    if(data.results[0]) {
                        if(data.results[0].profile_path) {
                            var newImage = dataBaseImg + data.results[0].profile_path;
                            that.attributes.imgActor = newImage;
                        }
                        if (data.results[0].id) {
                            $.ajax({
                                type: "GET",
                                url: dataBaseUrl + "/person/" + data.results[0].id + dataBaseApiKey,
                                dataType: "jsonp",
                                jsonpCallback: 'test',
                                contentType: 'application/json',
                                success: function (Data) {
                                    var newBiography = Data.biography;
                                    that.attributes.biography = newBiography;
                                }
                            });
                        }
                    }
                }
            });
        }

    });

    return ActorModel;
});