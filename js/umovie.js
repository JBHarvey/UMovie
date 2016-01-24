/**
 * Created by Jean-Benoît on 2016-01-24.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'router'
], function ($, _, Backbone, Router) {
    console.log(Router);
    var initialize = function () {
        Router.initialize();
    };

    return {
        initialize: initialize
    };
});