/**
 * Created by seydou on 16-02-07.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/tvshow.html',
    '../models/tvShowSeasonModel',
    'handlebars'
], function ($, _, Backbone, tvShowTemplate, TvShowModel, Handlebars) {


    var TvShowView = Backbone.View.extend({

        el: $('#content'),

        initialize: function (tvShowId) {
            this.id = tvShowId;
            this.render();
        },

        render: function () {

            //The data used in the template
            var template = Handlebars.compile(tvShowTemplate);

            var source = new TvShowModel();
            var resultTvShow = template(source.defaults);
            this.$el.html(resultTvShow);
        }
    });
    return TvShowView;

});