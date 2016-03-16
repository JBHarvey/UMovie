/**
 * Created by Vincent on 16-03-10.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'jscookie',
    '../models/watchlistModel'
], function ($, _, Backbone, Cookie, WatchListModel) {

    var Watchlists = Backbone.Collection.extend({
        model: WatchListModel,
        url: 'https://umovie.herokuapp.com/watchlists',

        parse: function (response) {
            var filter = function (data) {
                "use strict";
                return _.filter(data, function (model) {
                    var ownerPresent = _.isObject(model.owner);
                    return ownerPresent ? model.owner.email === Cookie.get('email') : false;
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
                    optionClass: 'add-watchlist', action: 'Ajouter'
                }
            ]
        }
    });
    return Watchlists;

});
