/**
 * Created by Vincent on 16-03-10.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'jscookie',
    'models/watchlistModel'
], function ($, _, Backbone, Cookie, WatchListModel) {

    var Watchlists = Backbone.Collection.extend({
        model: WatchListModel,
        url: 'https://umovie.herokuapp.com/watchlists',
        initialize: function (userEmail) {
            "use strict";
            if (_.isObject(userEmail)) {
                this.email = userEmail;
            } else {
                this.email = Cookie.get('email');
            }
        },

        parse: function (response) {
            var that = this;

            var filter = function (data) {
                "use strict";
                return _.filter(data, function (model) {
                    var ownerPresent = _.isObject(model.owner);
                    return ownerPresent ? model.owner.email === that.email : false;
                });
            };
            if (_.isObject(response.results)) {
                return filter(response.results);
            } else {
                return filter(response);
            }
        },

        pageHeader: {
            option: [
                {
                    optionClass: 'add-watchlist',
                    action: 'Ajouter'
                }
            ]
        }
    });
    return Watchlists;

});
