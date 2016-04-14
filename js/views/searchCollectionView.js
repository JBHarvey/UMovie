/**
 * Created by Jean-Benoît on 16-03-01.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'views/thumbnailView',
], function ($, _, Backbone, ThumbnailView) {

    var SearchCollectionView = Backbone.View.extend({

        initialize: function () {
            var that = this;
            that.listenTo(this.collection, 'sync', that.render);
            that.collection.fetch();
        },

        render: function () {
            var that = this;
            this.collection.each(function (model) {
                var thumbnail = new ThumbnailView({ model: model });
                that.$el.append(thumbnail.render());
                console.log('we screwed m8');
            });
        },


    });
    return SearchCollectionView;

});
