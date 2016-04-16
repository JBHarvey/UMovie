/**
 * Created by seydou on 16-03-29.
 */

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

    var MemberCollectionView = Backbone.View.extend({

        el: '#content',

        initialize: function () {
            this.searchManager = new SearchModel();
            this.collection = new MemberCollection();
            this.collection.url = this.generateDefaultQuery();
            this.listenTo(this.collection, 'sync', this.render);
            this.collection.fetch();
        },

        render: function () {
            var that = this;
            this.$el.html('');
            this.collection.each(function (member) {
                var thumbnail = new MemberThumbnailView({ model: member });
                that.$el.append(thumbnail.render());
                var gravatarIcon = new GravatarIcon(member.attributes.email);
                gravatarIcon.setGravatarURL(`#gravatar-photo-${member.attributes.gravatarIdName}`);
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
