/**
 * Created by rives on 2016-01-28.
 */


define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/actor.html',
    "models/actorModel",
    'handlebars'
    ], function($, _, Backbone, actorTemplate, ActorModel, Handlebars) {

    var ActorView = Backbone.View.extend({

        el: $('#content'),

        initialize: function(actorId){
            this.model = new ActorModel({id: actorId});

            this.model.otherCall = false;
            this.model.fetch();
            this.model.updateInformationsFromTMDB();
            this.model.render();
        },

        render: function() {

            console.log(this.model);
            var source = this.model.attributes;
            console.log(source);
            var template = Handlebars.compile(actorTemplate);

            console.log(`${source.artistName} Hast Been Rendered`);
            this.$el.html(template(source));
        }

    });
    return ActorView;
});