/**
 * Created by Jean-Benoît on 2016-01-25.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/home.html',
    'handlebars'
], function ($, _, Backbone, homeTemplate, Handlebars) {

    var HomeView = Backbone.View.extend({

        el: $('#content'),

        initialize: function() {
            this.render();
        },

        render: function() {

            //The data used in the template
            var template = Handlebars.compile(homeTemplate);

            var data = {"title": "Movie browser!", "movie":"Fight Club"};
            var resultHome = template(data);

            this.$el.append(resultHome);
        }
    });
    return HomeView;

});