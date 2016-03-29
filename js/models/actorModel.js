/**
 * Created by rives on 2016-01-28.
 */


define([
    'underscore',
    'backbone'
], function (_, Backbone) {

    var ActorModel = Backbone.Model.extend({
        urlRoot: "https://umovie.herokuapp.com/actors",
        artist: '',

        parse(data) {
            if (data.results) {
                return data.results[0];
            } else {
                return data;
            }
        },

        shortenText: function (textToShortent, length) {
            var newLength = length || 200;
            return `${textToShortent.slice(0, newLength)} ... `;

        },

        defaults: {
            "urlRoot": 'https://umovie.herokuapp.com/actors/253584821',
            "wrapperTyper": "artist",
            "artistType": "Artist",
            "artistName": "John Sawyer",
            "artistLinkUrl": "https://itunes.apple.com/us/artist/john-sawyer/id253584821?uo=4",
            "artistId": 253584821,
            "amgArtistId": 122340,
            "primaryGenreName": "Tribute",
            "primaryGenreId": 100022,
            "radioStationUrl": "https://itunes.apple.com/station/idra.253584821"
        }/*,*/




/*

        findArtistInfo: function (artistName) {
            var that = this;
            that.changeUrlDestination(that.actorUrl(artistName));
            success = function(data) {
                that.artist =  data.result[0];
                that.attributes.artistTmdbId = artist.id;

            };

           $.ajax({
                type: "GET",
                url: dataBaseUrl + "/search/person" + dataBaseApiKey + actorName,
                //url: dataBaseUrl + "/search/person" + dataBaseApiKey + "&query=" + "Brad Pitt".split(' ').join('+'),
                dataType: 'jsonp',
                jsonCallback: 'test',
                contentType: 'application/json',
                success: that.fetchInformationsFromPerson(data),
                error: function () {
                    that.firstAPIDone = false;

                }
            });

        },

        findArtistImage: function (){

            var that = this;
            if (that.artist) {
                var newImage;
                if (artist.profile_path) {
                    newImage = that.dataBaseImg + that.artist.profile_path;
                }
                else {
                    newImage = "url(../../img/actor/noProfile.png";
                }
                that.attributes.imgActor = newImage;
            }
        },

        findArtistBio: function (){
            var that = this;
            that.changeUrlDestination(that.actorDataUrl(that.artist.id));
            that.success = function(data) {
                var newBio = data.biography;
                that.attributes.biography = newBio;
                that.set({shortenBio : that.shortenText(newBio)});
            };
            that.error = function (jqXHR, textStatus){

            }
        },


        fetchInformationsFromPerson: function (data) {


            var actorInfo = data.results[0];
            if (actorInfo) {

                var newImage;
                if (actorInfo.profile_path) {
                    newImage = dataBaseImg + actorInfo.profile_path;
                }
                else {
                    newImage = "url(../../img/actor/noProfile.png";
                }
                that.attributes.imgActor = newImage;


                if (actorInfo.id) {
                    $.ajax({
                        type: "GET",
                        url: dataBaseUrl + "/person/" + actorInfo.id + dataBaseApiKey,
                        dataType: "jsonp",
                        jsonpCallback: 'test',
                        contentType: 'application/json',
                        success: function (data) {
                            console.log(data);
                            var newBiography = data.biography;
                            that.attributes.biography = newBiography;
                            that.set({shortenBio : that.shortenText(newBiography)});

                        }

                    });
                }
            }
        }*/

    });

    return ActorModel;
});