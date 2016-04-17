/**
 * Created by Jean-Benoît on 2016-01-26.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'jscookie',
    'text!templates/navigationBar.html',
    'models/navigationBarModel',
    'handlebars',
    'utils/gravatarIcon',
    'views/searchView',
], function ($, _, Backbone, Cookie, navigationBarTemplate, NavigationBarModel, Handlebars, GravatarIcon, SearchView) {

    return Backbone.View.extend({

        el: '#menu-content',

        searchPrefilter: {
            movie: false,
            season: false,
            actor: false,
            member: false,
        },

        searchTextToUse: '',

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

            var gravatarIcon = new GravatarIcon(Cookie.get('email'));
            gravatarIcon.setGravatarURL('.user-icon');
        },

        events: {
            'click .hamburger': 'toggleMenu',
            'click .toggle-member-menu': 'toggleMember',
            'click #initialise-search': 'launchSearchFromButton',
            'keyup .search-input': 'launchEnterSearchFromInput',
            'click #scope-movie-icon': 'toggleMovieSearch',
            'click #scope-season-icon': 'toggleSeasonSearch',
            'click #scope-actor-icon': 'toggleActorSearch',
            'click #scope-member-icon': 'toggleMemberSearch',
        },

        launchEnterSearchFromInput: function (inputText) {
            if (inputText.keyCode == 13) {
                this.launchSearchFromButton();
            }
        },

        launchSearchFromButton: function () {
            var text = $('.search-input').val();

            this.launchSearch(text);
        },

        launchSearch: function (inputText) {
            var that = this;
            var query = encodeURI(inputText);
            var scopeText = that.formatScopeForRedirection();
            const url = `/UMovie/#search?scope=${scopeText}&query=${query}`;
            window.history.pushState('', '', url);
            document.location.reload(true);
        },

        formatScopeForRedirection: function () {
            var that = this;
            var formatedScope = '';

            if (that.searchPrefilter.movie) {
                formatedScope = `${formatedScope}${that.querySeparator(formatedScope)}movie`;
            }

            if (that.searchPrefilter.season) {
                formatedScope = `${formatedScope}${that.querySeparator(formatedScope)}season`;
            }

            if (that.searchPrefilter.actor) {
                formatedScope = `${formatedScope}${that.querySeparator(formatedScope)}actor`;
            }

            if (that.searchPrefilter.member) {
                formatedScope = `${formatedScope}${that.querySeparator(formatedScope)}member`;
            }

            console.log(formatedScope);
            return formatedScope;
        },

        toggleMovieSearch: function (event) {
            this.searchPrefilter.movie = !this.searchPrefilter.movie;
            this.toggleScopeClass(event);
        },

        toggleSeasonSearch: function (event) {
            this.searchPrefilter.season = !this.searchPrefilter.season;
            this.toggleScopeClass(event);
        },

        toggleActorSearch: function (event) {
            this.searchPrefilter.actor = !this.searchPrefilter.actor;
            this.toggleScopeClass(event);
        },

        toggleMemberSearch: function (event) {
            this.searchPrefilter.member = !this.searchPrefilter.member;
            this.toggleScopeClass(event);
        },

        toggleScopeClass: function(event) {
            var typeClass = event.target.attributes.getNamedItem('class').nodeValue;
            if (typeClass.match(/ scope-selected/g)) {
                event.target.attributes.getNamedItem('class').nodeValue = typeClass.replace(/ scope-selected/g, '');
            } else {
                event.target.attributes.getNamedItem('class').nodeValue = `${typeClass} scope-selected`;
            }
        },

        querySeparator: function (scope) {
            return scope !== '' ? '-' : '';
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
