/**
 * Created by Vincent on 16-01-27.
 *
 * This file creates the view of the Watchlist page. There will be a generic page that will be generated
 * in the case that no user is logged in. There will also be a personalized page if a user connection is
 * online.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!templates/watchlist.html',
], function ($, _, Backbone, Handlebars, WatchlistTemplate) {

    var WatchlistView = Backbone.View.extend({

        el: '#content',

        initialize: function (watchlist) {
            this.model = watchlist;
        },

        render: function () {
            var template = Handlebars.compile(WatchlistTemplate);
            return template(this.model.attributes);
        },
    });

    return WatchlistView;
});
