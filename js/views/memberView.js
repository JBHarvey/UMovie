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
], function ($, _, Backbone, UserTemplate, MemberModel, Follow, User, Handlebars, GravatarIcon, Cookie, MemberThumbnailView) {
    'use strict';

    var MemberView = Backbone.View.extend({

        el: '#content',
        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.follow, 'change', this.render);

            this.activeUser = new MemberModel({ id: Cookie.get('id')});

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
            this.model.set('isFollowing', this.isActiveUserFollowing());

            var source = this.model.attributes;
            this.$el.html(template(source));

            var gravatarIcon = new GravatarIcon(Cookie.get('email'));
            gravatarIcon.getGravatarURL(`#gravatar-photo-${this.model.id}`);
        },

        isActiveUserFollowing: function () {
            var that = this;
            return this.activeUser
                .get('following')
                .filter(function (follower) { return follower.id === that.model.id; }).length > 0;
        },

        events: {
            'click .follow-unfollow-member': 'followUnfollowMember',
        },

        followUnfollowMember: function (event) {
            var currentButton = event.currentTarget;

            var that = this;
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
