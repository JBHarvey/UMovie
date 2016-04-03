/**
 * Created by Jean-Benoît on 2016-01-26.
 */
define([
    'backbone',
], function (Backbone) {

    var NavigationBarModel = Backbone.Model.extend({
        defaults: {
            user: null,
            siteImageUrl: '../../img/logo.png',
            references: '',
            menuOption: [
                { name: 'Home', references: '', position: 'menuStandard' },
                { name: 'Movies', references: 'movies', position: 'menuStandard' },
                { name: 'TV Shows', references: 'tvShows', position: 'menuStandard' },
                { name: 'Actors', references: 'actors', position: 'menuStandard' },
            ],
            menuOptionConnected: [
                { name: 'Watchlists', references: 'watchlists', position: 'menuStandard' },
                { name: 'Community', references: 'otherUsers', position: 'menuStandard' },
                { name: 'My Account', references: 'user', position: 'userOption' },
                { name: 'Settings', references: 'settings', position: 'userOption' },
                { name: 'Disconnect', references: 'disconnect', position: 'userOption' },
            ],
            menuOptionDisconnected: [
                { name: 'Login', references: 'login', position: 'authenticationMenuOption' },
                { name: 'Sign Up', references: 'signup', position: 'authenticationMenuOption' },
            ],
            connected: false,
        },

        connect: function (name) {
            this.defaults.connected = true;
            this.defaults.user = name;
        },

        disconnect: function () {
            this.defaults.connected = false;
            this.defaults.user = null;
        },

    });

    return NavigationBarModel;
});
