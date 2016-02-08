/**
 * Created by seydou on 16-02-07.
 */
/**
 * Created by seydou on 16-02-07.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/tvShow.html',
    'models/tvShowModel',
    'handlebars'
], function ($, _, Backbone, movieTemplate, TvShowModel, Handlebars) {


    var TvShowView = Backbone.View.extend({

        el: $('#content'),

        initialize: function (movieId) {
            this.id = movieId;
            this.render();
        },

        render: function () {

            //The data used in the template
            var template = Handlebars.compile(movieTemplate);

            var source = new TvShowModel();
            var resultMovie = template(source.hardcode);

            this.$el.html(resultMovie);
        }
    });
    return TvShowView;

});