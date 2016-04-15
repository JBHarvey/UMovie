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


        initialize: function () {
            var that = this
            that.seasonName = "";
            that.searchManager = new SearchModel();
            that.collection = new Seasons();
            that.collection.url = this.generateSearchQuery(that.seasonName);
            that.listenTo(that.collection, 'sync', this.render);
            that.collection.fetch();
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
