/**
 * Created by Jean-Benoît on 2016-01-26.
 */
define([
    'underscore',
    'backbone'
], function (_, Backbone) {

    var NavigationBarModel = Backbone.Model.extend({
        defaultValues:{
            user: "GLO-User",
            siteImageUrl: "../../img/siteName.png",
            menuOption: [
                {name: "Home"},
                {name: "Watchlist"},
                {name: "My Account"},
                {name: "Parameters"},
                {name: "Disconnect"}
            ]
        }
    });


    return NavigationBarModel;
});
