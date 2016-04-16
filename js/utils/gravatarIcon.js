define([
    'jquery',
    'backbone',
    'crypto',
], function ($, Backbone, Crypto) {
    'use strict';

    return Backbone.View.extend({
        initialize: function (email) {
            var encodedEmail;
            if (typeof email === 'string' || email instanceof String) {
                encodedEmail = Crypto.MD5(email);
            } else {
                encodedEmail = Crypto.MD5('dummyemailaddress@dummy.com');
            }

            this.email = encodedEmail;
        },

        setGravatarURL: function (className) {
            $(className).attr('src', `https://www.gravatar.com/avatar/${this.email}.jpg`);
        },

        getGravatarURL: function () {
            return `https://www.gravatar.com/avatar/${this.email}.jpg`;
        },
    });
});
