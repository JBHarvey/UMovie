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
        window.history.pushState("","","");
        Router.initialize();
    };

    return {
        initialize: initialize
    };
});