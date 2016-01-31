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
        el: $('#actor-content'),

        initialize: function(){
            this.render();
        },

        render: function() {

            var template = Handlebars.compile(actorTemplate);
            var source = new ActorModel();
            var  resultActor = template(source.defaults);

            this.$el.append(resultActor);
        }

    });
    return ActorView;
});