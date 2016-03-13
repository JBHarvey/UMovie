/**
 * Created by rives on 2016-03-10.
 */



define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/actorCollection.html',
    'handlebars'
], function ($, _, Backbone, actorCollectionTemplate, Handlebars) {

    var ActorsCollectionView = Backbone.View.extend({

        comperator: 'trackName',

        initialize: function() {
        },

        render: function() {
            var template = Handlebars.compile(actorCollectionTemplate);
            var source = this.model.attributes;
            return template(source);
        }
    });
    return ActorsCollectionView;
});