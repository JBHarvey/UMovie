/**
 * Created by seydou on 2016-03-27.
 */


define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/user.html',
    '../models/userModel',
    '../models/sessionModel',
    'handlebars',
    'utils/gravatarIcon',
    'jscookie',
    'views/thumbnailView',
    'collections/watchlistCollection',
    'views/watchlistView',
], function ($, _, Backbone, UserTemplate, MemberModel, User, Handlebars, GravatarIcon, Cookie, ThumbnailView, WatchlistCollection, WatchlistView) {
    'use strict';

    var MemberView = Backbone.View.extend({

        el: '#content',
        initialize: function () {
            this.listenTo(this.model, 'change', this.render);

            this.activeUser = new MemberModel({id: Cookie.get('id')});

            var that = this;
            var syncRendering = _.after(2, function () {
                that.render();
            });

            this.activeUser.fetch({
                success: syncRendering,
            });

            this.model.fetch({
                success: syncRendering,
            });
        },

        render: function () {
            var template = Handlebars.compile(UserTemplate);

            this.model.set('isNotCurrentUser', this.model.get('email') !== Cookie.get('email'));
            this.model.set('isFollowing', this.isFollowingActiveUser());

            var source = this.model.attributes;
            this.$el.html(template(source));

            this.setFollowedUsers()
                .setWatchlists()
                .setGravatarIcon();
        },

        setFollowedUsers: function () {
            var $followedUsersBox = $('#followed-list');
            this.model.get('following').forEach(function (followed) {
                var memberThumbnailView = new ThumbnailView({model: new MemberModel(followed)});
                $followedUsersBox.append(memberThumbnailView.render());
            });

            return this;
        },

        setWatchlists: function () {
            var watchlists = new WatchlistCollection(this.model.get('email'));

            var $watchlistsBox = $('#user-watchlists');

            watchlists.fetch({
                success: function (data) {
                    data.each(function (watchlist) {
                        var watchlistView = new WatchlistView(watchlist);
                        $watchlistsBox.append(watchlistView.render());
                    });
                    $('.remove-watchlist-movie').remove();
                    $('.delete-watchlist-checkbox').remove();
                    $('.watchlist-edit-button').remove();
                },
            });

            return this;
        },

        setGravatarIcon: function () {
            var gravatarImages = document.getElementsByClassName('gravatar-photo');
            Array.prototype.forEach.call(gravatarImages, function (imageElement) {
                var gravatarIcon = new GravatarIcon(imageElement.dataset.email);
                imageElement.src = gravatarIcon.getGravatarURL();
            });

            return this;
        },

        isFollowingActiveUser: function () {
            var that = this;
            return this.activeUser
                    .get('following')
                    .filter(function (follower) {
                        return follower.id === that.model.id;
                    }).length > 0;
        },

        events: {
            'click .toggle-following': 'toggleFollowing',
        },

        toggleFollowing: function (event) {
            var currentButton = event.currentTarget;

            if (currentButton.innerHTML.replace(/\s/g, '') === 'Follow') {
                this.activeUser.save(this.model.attributes, {
                    success: function () {
                        currentButton.innerHTML = 'Unfollow';
                    },
                });
            } else {
                this.model.destroy({
                    success: function () {
                        currentButton.innerHTML = 'Follow';
                    },
                });
            }
        },
    });
    return MemberView;
});
