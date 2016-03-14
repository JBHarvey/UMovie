define([
    'underscore',
    'backbone'
], function (_, Backbone) {

    var YoutubeSearchModel = Backbone.Model.extend({
        parse: function (data) {
            "use strict";
            console.log(data);
            if (data.items !== undefined) {
                console.log(data.items);
                return data.items[0];
            }
            else {
                return data;
            }
        }
    });

    return YoutubeSearchModel;
});
