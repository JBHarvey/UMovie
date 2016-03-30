/**
 * Created by Jean-Benoît on 16-02-07.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/tvshowEpisode.html',
    'views/thumbnailView',
    'handlebars',
    'models/searchModel'
], function ($, _, Backbone, TvShowEpisodeTemplate, ThumbnailView, Handlebars, SearchModel) {

    var TvShowEpisodeView = Backbone.View.extend({

        el: $('#content'),

        initialize: function () {

            this.listenTo(this.model, "change", this.render);
            var syncRendering = _.after(2, function () {
                "use strict";
                that.render();
            });

            this.model.fetch({
                success: syncRendering
            });
        },

        render: function () {
            var source = this.model.attributes;
            var template = Handlebars.compile(TvShowEpisodeTemplate);
            var resultTvShowEpisode = template(source);
            this.$el.html(resultTvShowEpisode);
        },

    });
    return TvShowEpisodeView;

});