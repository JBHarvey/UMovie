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
            this.listenTo(this.model, "change", this.render);
            this.model.fetch();
            this.model.updateInformationsFromTMDB();
        },

        render: function() {

            var source = this.model.attributes;
            var template = Handlebars.compile(actorTemplate);

            console.log(`${source.artistName} Hast Been Rendered`);
            this.$el.html(template(source));
        }

    });
    return ActorView;
});