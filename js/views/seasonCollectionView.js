/**
 * Created by Jean-Benoît on 16-03-01.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    '../collections/seasonCollection',
    'views/thumbnailView',
    'handlebars',
    'models/searchModel',
], function ($, _, Backbone, Seasons, ThumbnailView, Handlebars, SearchModel) {

    var SeasonCollectionView = Backbone.View.extend({

        el: '#content',

        prepareDefaultRendering: function (seasonName) {
            var that = this;
            that.seasonName = seasonName;
            that.collection.url = this.generateDefaultQuery(that.seasonName);
            that.listenTo(that.collection, 'sync', this.render);
            that.collection.fetch();
        },

        initialize: function () {
            this.seasonName = "";
            this.searchManager = new SearchModel();
            this.collection = new Seasons();

        },

        render: function () {
            var that = this;
            this.$el.html('');
            this.collection.each(function (season) {
                var thumbnail = new ThumbnailView({ model: season });
                that.$el.append(thumbnail.render());
            });
        },

        generateSearchQuery: function (seasonName) {
            var that = this;
            var name ='';
            if(seasonName){
                name = seasonName;
            }
            else{
                name = "dead";
            }
            return this.searchManager
                .setSearchType('tvshows/seasons')
                .setSearchName(name)
                .setSearchLimit(100)
                .setSearchGenre('')
                .url();
        },
    });
    return SeasonCollectionView;

});
