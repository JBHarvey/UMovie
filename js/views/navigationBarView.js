/**
 * Created by Jean-Benoît on 2016-01-26.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/navigationBar.html',
    'handlebars'
], function ($, _, Backbone, navigationBarTemplate, Handlebars) {

    var NavigationBarView = Backbone.View.extend({

        el: $('#menu-content'),

        initialize: function () {
            this.render();
        },

        render: function () {
            var template = Handlebars.compile(navigationBarTemplate);

            var data = {"user": "GLO-User"};
            var resultNavigationBar = template(data);

            this.$el.append(resultNavigationBar);

        }
    });

    return NavigationBarView;
});
