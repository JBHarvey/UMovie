/**
 * Created by Jean-Benoît on 2016-01-25.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/home.html',
    'models/homeModel',
    'handlebars'
], function ($, _, Backbone, homeTemplate, HomeModel,Handlebars) {

    var HomeView = Backbone.View.extend({

        el: $('#content'),

        initialize: function() {
            this.render();
        },

        render: function() {


            var template = Handlebars.compile(homeTemplate);

            var source = new HomeModel();
            var resultHome = template(source.defaults);
            console.log(resultHome);
            this.$el.html(resultHome);
        }
    });
    return HomeView;

});