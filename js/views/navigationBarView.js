/**
 * Created by Jean-Benoît on 2016-01-26.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'jscookie',
    'text!../templates/navigationBar.html',
    'models/navigationBarModel',
    'handlebars',
    'views/gravatarIcon',
], function ($, _, Backbone, Cookie, navigationBarTemplate, NavigationBarModel, Handlebars, GravatarIcon) {

    return Backbone.View.extend({

        el: '#menu-content',

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

            this.$el.html(resultNavigationBar);

            var gravatarIcons = new GravatarIcon('.user-icon');
        },

        events: {
            'click .hamburger': 'toggleMenu',
            'click .member-hamburger': 'toggleMember',
            'click .go-research': 'launchSearchFromButton',
            'press .search-input': 'launchSearchFromInput',
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
            /* jshint ignore:start */
            this.isMenuOpen() ? this.closeMenu() : this.openMenu();
            /* jshint ignore:end */
        },

        toggleMember: function () {
            this.closeMenu();
            /* jshint ignore:start */
            this.isMemberOpen() ? this.closeMember() : this.openMember();
            /* jshint ignore:end */
        },

        isMemberOpen() {
            return this.getMemberMenuId() === 'member-menu-open';
        },

        isMenuOpen() {
            return this.getMenuId() === 'menu-open';
        },

        openMember: function () {
            if (!this.isMemberOpen()) {
                this.setMemberMenuId('member-menu-open');
            }
        },

        closeMember: function () {
            if (this.isMemberOpen()) {
                this.setMemberMenuId('member-menu-closed');
            }
        },

        openMenu: function () {
            if (!this.isMenuOpen()) {
                this.setMenuId('menu-open');
                this.changeMenuIcon('cross');
            }
        },

        closeMenu: function () {
            if (this.isMenuOpen()) {
                this.setMenuId('menu-closed');
                this.changeMenuIcon('hamburger');
            }
        },

        getMemberMenuId: function () {
            return document.getElementsByClassName('member-menu')[0].id;
        },

        setMemberMenuId: function (newId) {
            document.getElementsByClassName('member-menu')[0].id = newId;
        },

        getMenuId: function () {
            return document.getElementsByClassName('navigation-options')[0].id;
        },

        setMenuId: function (newId) {
            document.getElementsByClassName('navigation-options')[0].id = newId;
        },

        changeMenuIcon: function (menuIcon) {
            document.getElementsByClassName('hamburger')[0]
                .firstElementChild
                .setAttribute('src', `img/${menuIcon}_menu.svg`);
        },
    });
})

;
