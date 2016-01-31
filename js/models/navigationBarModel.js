/**
 * Created by Jean-Benoît on 2016-01-26.
 */
define([
    'backbone'
], function (Backbone) {

    var NavigationBarModel = Backbone.Model.extend({
        defaults: {
            user: "GLO-User",
            siteImageUrl: "../../img/siteName.png",
            references: "",
            menuOption: [
                {name: "Home", references: ""},
                {name: "Movies", references: "movies"},
                {name: "TV Shows", references: "tvShows"},
                {name: "Actors", references: "actors"}
            ],
            menuOptionConnected: [
                {name: "Watchlists", references: "watchlists"},
                {name: "My Account", references: "user"},
                {name: "Settings", references: "settings"},
                {name: "Community", references: "otherUsers"},
                {name: "Disconnect", references: "disconnect"}
            ],
            menuOptionDisconnected: [
                {name: "Login", references: "login"},
                {name: "Sign Up", references: "signup"}
            ],
            connected: false
        },

        connect: function () {
            this.defaults.connected = true;
        },
        disconnect: function () {
            this.defaults.connected = false;
        }

    });


    return NavigationBarModel;
});
