/**
 * Created by Jean-Benoît on 2016-01-24.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'routeManager'
], function ($, _, Backbone, Router) {
    var initialize = function () {
        Backbone.emulateJSON = true;
        Router.initialize();
    };

    return {
        initialize: initialize
    };
});