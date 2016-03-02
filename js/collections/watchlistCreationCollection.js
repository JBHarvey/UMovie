/**
 * Created by Vincent on 16-03-02.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'jscookie',
    '/models/watchlistCreationModel'

], function($, _, Backbone, Cookie, WatchListCreationModel){
    var WatchListCollection = Backbone.Collection.extend({
        model: WatchListCreationModel,
        url: '/watchlists',
        parse: function (response) {
            return response.results;
        }
    });
    return WatchListCollection;
})