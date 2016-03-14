/**
 * Created by Jean-Benoît on 16-02-07.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/tvShowEpisode.html',
    '../models/tvShowEpisodeModel',
    'handlebars'
], function ($, _, Backbone, tvShowEpisodeTemplate, TvShowEpisodeModel, Handlebars) {


    var TvShowEpisodeView = Backbone.View.extend({

        el: $('#content'),

        initialize: function (tvShowId) {
            this.model = new TvShowEpisodeModel({id: tvShowId});
            this.listenTo(this.model, "change", this.render);
            this.model.fetch();
        },

        render: function () {

            //The data used in the template
            var template = Handlebars.compile(tvShowEpisodeTemplate);

            var source = this.model.attributes;
            var resultTvShowEpisode = template(source);

            this.$el.html(resultTvShowEpisode);
        }
    });
    return TvShowEpisodeView;

});