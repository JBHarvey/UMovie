/**
 * Created by Jean-Benoît on 2016-01-26.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'jscookie',
    'text!../templates/navigationBar.html',
    "models/navigationBarModel",
    'handlebars'
], function ($, _, Backbone, Cookie, navigationBarTemplate, NavigationBarModel, Handlebars) {

    var NavigationBarView = Backbone.View.extend({

            el: $('#menu-content'),

            initialize: function () {
                this.render();
            },

            render: function () {

                var template = Handlebars.compile(navigationBarTemplate);

                var source = new NavigationBarModel();
                if (Cookie.get('token') === undefined) {
                    source.disconnect();
                } else {
                    source.connect(Cookie.get('name'));
                }
                var resultNavigationBar = template(source.defaults);

                this.$el.html(resultNavigationBar);
            },


            events: {
                'click .hamburger': "openHamburgerMenu",
                'click .cross': "closeHamburgerMenu",
                'click .go-research': "launchSearchFromButton",
                'press .search-input': "launchSearchFromInput"
            },

            slideOutMenu: $('.navigation-options'),
            crossButton: $('.cross'),

            toggleMenu: function (distance, buttonToShow, buttonToHide) {

            },


            openHamburgerMenu: function (eventInfo) {
                console.log(eventInfo);
                var hamburgerButton = eventInfo.currentTarget;
                this.slideOutMenu.toggleClass("open");
                if (this.slideOutMenu.hasClass("open")) {
                    this.slideOutMenu.animate({
                        left: "0px"
                    });
                    this.crossButton.show();
                    hamburgerButton.hide();
                }
            },

            closeHamburgerMenu: function () {
                this.slideOutMenu.toggleClass("open");
                if (!this.slideOutMenu.hasClass("open")) {
                    this.slideOutMenu.animate({
                        left: -this.slideOutMenu.width()
                    }, 250);
                    this.crossButton.hide();
                    this.hamburgerButton.show();
                }
            },

            launchSearchFromButton: function (searchGoButton) {
                console.log(searchGoButton);
                var input = searchGoButton.target.previousSibling.valueOf();
                this.launchSearch(input);
            },

            launchSearch(inputText) {
                console.log(inputText);
            }

        })
        ;

    return NavigationBarView;
});
