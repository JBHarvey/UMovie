/**
 * Created by Jean-Benoît on 2016-01-27.
 */
define([
    'backbone',
], function (Backbone) {

    var genreModel = Backbone.Model.extend({
        urlRoot: 'https://umovie.herokuapp.com/genres',


        parse(data) {
            if (_.isObject(data.results)) {
                return this.processData(data.results[0]);
            } else {
                return this.processData(data);
            }
        },

        processData(data) {
            return data;
        },


    });

    return genreModel;
});
