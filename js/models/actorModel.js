/**
 * Created by rives on 2016-01-28.
 */

define( [
    "underscore",
    "backbone"
], function( _, Backbone ) {

    var ActorModel = Backbone.Model.extend( {
        urlRoot: "https://umovie.herokuapp.com/actors",

        parse( data ) {
          if ( data.results ) {
              return data.results[ 0 ];
          }else {
              return data;
          }
        },

        defaults:{
            "urlRoot": "https://umovie.herokuapp.com/actors/253584821",
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

        updateInformationsFromTMDB: function() {
            var that = this;

            //Appel d'api externe
            var dataBaseUrl =  "https://api.themoviedb.org/3";
            var dataBaseApiKey = "?api_key=8e2fb63d78986604185e4448ce8fbaad";
            var dataBaseImg = "https://image.tmdb.org/t/p/original";
            var actorName = "&query=" + that.attributes.artistName.split( " " ).join( "+" );

            $.ajax( {
                type: "GET",
                url: dataBaseUrl + "/search/person" + dataBaseApiKey + actorName,

                //Url: dataBaseUrl + "/search/person" + dataBaseApiKey + "&query=" + "Brad Hall".split(' ').join('+'),
                dataType: "jsonp",
                jsonCallback: "test",
                contentType: "application/json",
                success: function( data ) {

                    var actorInfo = data.results[ 0 ];
                    if ( actorInfo ) {

                        var newImage;
                        if ( actorInfo.profile_path ) {
                            newImage = dataBaseImg + actorInfo.profile_path;
                        } else {
                            newImage = "url(../../img/actor/noProfile.png";
                        }
                        that.attributes.imgActor = newImage;

                        if ( actorInfo.id ) {
                            $.ajax( {
                                type: "GET",
                                url: dataBaseUrl + "/person/" + actorInfo.id + dataBaseApiKey,
                                dataType: "jsonp",
                                jsonpCallback: "test",
                                contentType: "application/json",
                                success: function( Data ) {
                                    var newBiography = Data.biography;
                                    that.attributes.biography = newBiography;

                                }

                            } );
                        }
                    }
                    that.attributes.firstAPIDone = true;
                },
                error: function() {
                    that.firstAPIDone = false;

                }
            } );
        }

    } );

    return ActorModel;
} );
