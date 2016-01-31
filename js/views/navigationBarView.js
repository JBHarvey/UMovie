/**
 * Created by Jean-Benoît on 2016-01-26.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'jscookie',
    'text!../templates/navigationBar.html',
    "models/navigationBarModel",
    'handlebars'
], function ($, _, Backbone, Cookie, navigationBarTemplate, NavigationBarModel, Handlebars) {

    var NavigationBarView = Backbone.View.extend({

        el: $('#menu-content'),

        initialize: function () {
            this.render();
        },

        render: function () {

            var template = Handlebars.compile(navigationBarTemplate);

            var source = new NavigationBarModel();
            if (Cookie.get('token') === undefined) {
                source.disconnect();
            } else {
                source.connect();
            }
            var resultNavigationBar = template(source.defaults);

            this.$el.html(resultNavigationBar);

        }
    });

    return NavigationBarView;
});
