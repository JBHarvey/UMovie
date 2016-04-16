/**
 * Created by seydou on 16-03-29.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/user.html',
    'models/memberModel',
    'models/followModel',
    'models/userModel',
    'handlebars',
    'utils/gravatarIcon',
    'jscookie',
    'views/memberThumbnailView',
], function ($, _, Backbone, userTemplate, MemberModel, Follow, User, Handlebars, GravatarIcon, Cookie, MemberThumbnailView) {
    'use strict';

    var MemberView = Backbone.View.extend({

        el: '#content',
        initialize: function () {
            this.follow = new Follow();
            this.currentUser = new MemberModel({ id: Cookie.get('id') });

            var that = this;
            this.listenTo(that.currentUser, 'change', that.render);
            this.listenTo(that.model, 'change', that.render);
            this.listenTo(that.follow, 'change', that.render);
            this.currentUser.fetch();
            this.model.fetch({
                success: that.render(that.model),
            });
        },

        render: function () {
            this.model.attributes.isFollowing = this.isFollowing();
            this.model.attributes.isNotCurrentUser = this.isNotCurrentUser();
            var source = this.model.attributes;
            var template = Handlebars.compile(userTemplate);

            this.$el.html(template(source));

            var gravatarIcon = new GravatarIcon(Cookie.get('email'));
            gravatarIcon.getGravatarURL(`#gravatar-photo-${this.model.id}`);

            this.appendFollowersToHtml();
        },

        appendFollowersToHtml: function () {
            var followers = this.assembleFollowers();
            this.$el.append(followers);
            this.addGravatarIconsToFollowers();
        },

        assembleFollowers: function () {
            var followers = '';
            this.model.attributes.following.forEach(function (member) {
                member.attributes = member;
                if (typeof member.gravatarIdName == 'undefined') {
                    member.gravatarIdName = member.id;
                }

                var thumbnail = new MemberThumbnailView({ model: member });
                followers = `${followers}${thumbnail.render()}`;
            });

            return followers;
        },

        addGravatarIconsToFollowers: function () {
            this.model.attributes.following.forEach(function (member) {
                member.attributes = member;
                var gravatarIcon = new GravatarIcon(member.email);
                gravatarIcon.getGravatarURL(`#gravatar-photo-${member.id}`);
            });
        },

        events: {
            'click .follow-unfollow-member': 'followUnfollowMember',
        },

        isFollowing: function () {
            if (this.currentUser.attributes.following.length > 0) {
                var currentMemberId = this.model.attributes.id;
                for (var i = 0; i < this.currentUser.attributes.following.length; i++) {
                    var userMember = this.currentUser.attributes.following[i];
                    if (userMember.id === currentMemberId) {
                        return true;
                    }
                }
            }

            return false;
        },

        isNotCurrentUser: function () {
            return this.model.attributes.id !== this.currentUser.attributes.id;
        },

        followUnfollowMember: function (event) {
            this.$followButton = $('.follow-unfollow-member');

            var follower = new Follow({ id: this.model.attributes.id });

            var that = this;
            if (this.$followButton.text().indexOf('Follow') > -1) {
                follower.save(null, {
                    success: function () {
                        that.$followButton.text('Unfollow');
                    },
                });
            } else {
                follower.destroy({
                    success: function () {
                        that.$followButton.text('Follow');
                    },
                });
            }
        },
    });
    return MemberView;
});
