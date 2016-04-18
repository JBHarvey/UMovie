/**
 * Created by Jean-Benoît on 2016-01-27.
 */
define([
    'underscore',
    'backbone',
], function (_, Backbone) {

    //Fonction qui permet de parser les collections de films et de les afficher.
    var HomeModel = Backbone.Model.extend({
        parse: function (response) {

            if (_.isObject(response.results)) {
                return response.results[0];
            } else {
                return response;
            }
        },
    });

    return HomeModel;
});
