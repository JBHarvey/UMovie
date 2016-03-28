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

    return Backbone.View.extend({

        el: $('#menu-content'),

        initialize: function () {
            this.model = new NavigationBarModel();
            this.render();
        },

        render: function () {
            var template = Handlebars.compile(navigationBarTemplate);
            var source = this.model;
            if (Cookie.get('token') === undefined) {
                source.disconnect();
            } else {
                source.connect(Cookie.get('name'));
            }
            var resultNavigationBar = template(source.defaults);
            console.log(resultNavigationBar);
            //closeMenusIfNeeded();
            this.$el.html(resultNavigationBar);
        },


        events: {
            'click .hamburger': "toggleMenu",
            'click .member-hamburger': "toggleMember",
            'click .go-research': "launchSearchFromButton",
            'press .search-input': "launchSearchFromInput"
        },


        launchSearchFromButton: function (searchGoButton) {
            console.log(searchGoButton);
            var input = searchGoButton.target.previousSibling.valueOf();
            this.launchSearch(input);
        },

        launchSearch: function (inputText) {
            console.log(inputText);
        },



        /*   Menus animations   */
        closeMenusIfNeeded: function () {
            this.closeMember();
            this.closeMenu();
        },

        toggleMenu: function () {
            this.closeMember();
            this.isMenuOpen() ? this.closeMenu() : this.openMenu();
        },

        toggleMember: function () {
            this.closeMenu();
            this.isMemberOpen() ? this.closeMember() : this.openMember();

        },

        isMemberOpen() {
            return this.getMemberMenuId() === "member-menu-open";
        },

        isMenuOpen() {
            return this.getMenuId() === "menu-open";
        },

        openMember: function () {
            if (!this.isMemberOpen()) {
                this.setMemberMenuId("member-menu-open");
                console.log("member", "open");
            }
        },

        closeMember: function () {
            if (this.isMemberOpen()) {
                this.setMemberMenuId("member-menu-closed");
                console.log("member", "close");
            }
        },

        openMenu: function () {
            if (!this.isMenuOpen()) {
                this.setMenuId("menu-open");
                this.changeMenuIcon("cross");
                console.log("menu", "open");
            }
        },

        closeMenu: function () {
            if (this.isMenuOpen()) {
                this.setMenuId("menu-closed");
                this.changeMenuIcon("hamburger");
                console.log("menu", "close");
            }
        },

        getMemberMenuId: function () {
            return document.getElementsByClassName("member-menu")[0].id;
        },

        setMemberMenuId: function (newId) {
            document.getElementsByClassName("member-menu")[0].id = newId;
        },

        getMenuId: function () {
            return document.getElementsByClassName("navigation-options")[0].id;
        },
        setMenuId: function (newId) {
            document.getElementsByClassName("navigation-options")[0].id = newId;
        },

        changeMenuIcon: function (menuIcon) {
            document.getElementsByClassName("hamburger")[0]
                .firstElementChild
                .setAttribute("src", `img/${menuIcon}_menu.svg`);
        }
    });
})
;
