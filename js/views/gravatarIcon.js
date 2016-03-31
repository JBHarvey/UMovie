define([
    'jquery',
    'backbone',
    'crypto',
], function ($, Backbone, Crypto) {
    'use strict';

    return Backbone.View.extend({
        initialize: function (imageClass, email) {
            var encodedEmail;
            if (typeof email === 'string' || email instanceof String) {
                encodedEmail = Crypto.MD5(email);
            } else {
                encodedEmail = Crypto.MD5('dummyemailaddress@dummy.com');
            }

            this.getGravatarURL(imageClass, encodedEmail);
        },

        getGravatarURL: function (imageClass, encodedEmail) {
            $(imageClass).attr('src', 'https://www.gravatar.com/avatar/' +
                encodedEmail + '.jpg');
        },
    });
});
