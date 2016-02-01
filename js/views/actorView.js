/**
 * Created by rives on 2016-01-28.
 */


define([
    'jquery',
    'underscore',
    'backbone',
    'text!../templates/actor.html',
    "models/actorModel",
    'handlebars'
    ], function($, _, Backbone, actorTemplate, ActorModel, Handlebars) {

    var ActorView = Backbone.View.extend({
        el: $('#content'),

        initialize: function(){
            this.render();
        },

        render: function() {


            var source = new ActorModel();
            var template = Handlebars.compile(actorTemplate);
            var resultActor = template(source.defaults);

            this.$el.html(resultActor);
        }

    });
    return ActorView;
});