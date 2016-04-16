define([
    'jquery',
    'underscore',
    'backbone',
    '../collections/memberCollection',
    'views/memberThumbnailView',
    'handlebars',
    'models/searchModel',
    '../utils/gravatarIcon',
], function ($, _, Backbone, MemberCollection, MemberThumbnailView, Handlebars, SearchModel, GravatarIcon) {
    "use strict";

    var MemberCollectionView = Backbone.View.extend({

        el: '#content',

        initialize: function () {
            this.searchManager = new SearchModel();
            this.collection = new MemberCollection();
            this.collection.url = this.generateDefaultQuery();

            var that = this;
            this.collection.fetch({
                success: function ()  {
                    that.render();
                }
            });
        },

        render: function () {
            var that = this;
            this.$el.html('');
            this.collection.each(function (member) {
                var thumbnail = new MemberThumbnailView({ model: member });
                that.$el.append(thumbnail.render());
            });

            this.setGravatarIcon();
        },

        setGravatarIcon: function () {
            var gravatarImages = document.getElementsByClassName('gravatar-photo');
            Array.prototype.forEach.call(gravatarImages, function (imageElement) {
                var gravatarIcon = new GravatarIcon(imageElement.dataset.email);
                imageElement.src = gravatarIcon.getGravatarURL();
            });
        },

        generateDefaultQuery: function () {
            return this.searchManager
                .setSearchType('users')
                .setSearchName('a')
                .url();
        },
    });
    return MemberCollectionView;
});
