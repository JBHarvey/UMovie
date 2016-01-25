/**
 * Created by Jean-Benoît on 2016-01-25.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/home.html'
], function ($, _, Backbone, homeTemplate) {

    var HomeView = Backbone.View.extend({

        el: $('#content'),
        render: function() {

            //The data used in the template
            var context = {"title": "Movie browser!", "movie":"Fight Club"};
            var template = Handlebars.compile(homeTemplate);
            var resultHTML = template(context);

            this.$el.append(resultHTML);
        }
    });
    return HomeView;

});