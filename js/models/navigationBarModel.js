/**
 * Created by Jean-Benoît on 2016-01-26.
 */
define([
    'backbone'
], function (Backbone) {

    var NavigationBarModel = Backbone.Model.extend({
        defaults:{
            user: "GLO-User",
            siteImageUrl: "../../img/siteName.png",
            references:"home",
            menuOption: [
                {name: "Home", references: "home"},
                {name: "Movies", references: "movies"},
                {name: "Watchlists", references: "watchlists"},
                {name: "My Account", references: "user/"},
                {name: "Parameters", references: "parameters"},
                {name: "Disconnect", references: "logout"}
            ]
        }
    });


    return NavigationBarModel;
});
