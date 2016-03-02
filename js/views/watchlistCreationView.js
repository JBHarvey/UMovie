/**
 * Created by Vincent on 2016-02-03.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!../templates/creationWatchlist.html',
    "models/watchlistCreationModel",
    'handlebars'
], function ($, _, Backbone, creationWatchListTemplate, creationWatchlistModel, Handlebars) {

    var WatchlistCreationView = Backbone.View.extend({

        el: $('#content'),

        initialize: function () {
            this.render();
        },

        render: function (user) {

            var source;
            var template = Handlebars.compile(creationWatchListTemplate);

            if (user) {
                source = new watchlistCreationModel();
            } else {
                source = user;
            }

            var resultWatchlistCreation = template(source.defaults);

            this.$el.append(creationWatchListTemplate);

        }
    });

    return WatchlistCreationView;
});
/**
 * Created by Vincent on 16-03-02.
 */
