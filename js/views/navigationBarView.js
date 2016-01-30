/**
 * Created by Jean-Benoît on 2016-01-26.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!../templates/navigationBar.html',
    "models/navigationBarModel",
    'handlebars'
], function ($, _, Backbone, navigationBarTemplate, NavigationBarModel, Handlebars) {

    var NavigationBarView = Backbone.View.extend({

        el: $('#menu-content'),

        initialize: function () {
            this.render();
        },

        render: function (connected) {

            var template = Handlebars.compile(navigationBarTemplate);

            var source = new NavigationBarModel();
            source.connected = connected;
            var resultNavigationBar = template(source.defaults);

            this.$el.html(resultNavigationBar);

        }
    });

    return NavigationBarView;
});
