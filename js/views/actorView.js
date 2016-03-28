/**
 * Created by rives on 2016-01-28.
 */


define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/actor.html',
    'handlebars'
    ], function($, _, Backbone, actorTemplate, Handlebars) {

    var ActorView = Backbone.View.extend({

        el: $('#content'),

        waitForRender: _.after(2, function() {
            that.render();
        }),

        initialize: function(){



            this.model.attributes.firstAPIDone = false;
            that = this;

            this.listenTo(this.model, "change", that.render);
            this.model.fetch({success: that.waitForRender});
            this.model.updateInformationsFromTMDB(that.waitForRender);
            that.render();



        },

        render: function() {

            var source = this.model.attributes;
            console.log("ICI");
            console.log(source);
            var template = Handlebars.compile(actorTemplate);

            console.log(`${source.artistName} Hast Been Rendered`);
            this.$el.html(template(source));
        }

    });
    return ActorView;
});