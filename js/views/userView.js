/**
 * Created by Jean-Benoît on 2016-01-26.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!../templates/user.html',
    'models/userModel',
    'handlebars',
], function ($, _, Backbone, UserTemplate, UserModel, Handlebars) {

    var UserView = Backbone.View.extend({

        el: '#content',

        initialize: function () {
            this.render();
        },

        render: function (user) {

            var source;
            var template = Handlebars.compile(navigationBarTemplate);

            if (user) {
                source = new UserModel();
            } else {
                source = user;
            }

            var resultNavigationBar = template(source.defaults);

            this.$el.append(resultNavigationBar);

        },
    });

    return UserView;
});
