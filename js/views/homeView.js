/**
 * Created by Jean-Benoît on 2016-01-25.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/home.html',
    'models/homeModel',
    'handlebars',
    'views/TmdbData'
], function ($, _, Backbone, homeTemplate, HomeModel, Handlebars, TmdbData) {

    var HomeView = Backbone.View.extend({

        el: '#content',

        initialize: function () {
            this.render();
        },

        render: function () {

            var template = Handlebars.compile(homeTemplate);

            var source = new HomeModel();
            var resultHome = template(source.defaults);
            this.$el.html(resultHome);

            var searchRequest = "Titanic";
            var tmdbData = new TmdbData();
            tmdbData.getTmdbSimilarMovie(searchRequest);

        },
    });
    return HomeView;

});
