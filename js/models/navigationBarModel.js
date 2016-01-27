/**
 * Created by Jean-Benoît on 2016-01-26.
 */
define([
    'underscore',
    'backbone'
], function (_, Backbone) {

    var NavigationBarModel = Backbone.Model.extend({
        defaults:{
            user: "GLO-User",
            siteImageUrl: "../../img/siteName.png"
        }
    });

    return NavigationBarModel;
});
