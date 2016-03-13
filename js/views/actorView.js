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
            this.model.fetch({
                sucess: function() {
                    self.render();
                }
            });
        },

        render: function() {

            this.$el.html(this.template(this.model.toJSON()));
           // var template = Handlebars.compile(actorTemplate);

            var source = this.model.attributes;

            //Appel d'api externe
            var dataBaseUrl =  "https://api.themoviedb.org/3";
            var dataBaseApiKey = "?api_key=8e2fb63d78986604185e4448ce8fbaad";
            var dataBaseImg = "https://image.tmdb.org/t/p/original";
            var actorName = "&query=" + this.model.attributes.artistName.split(' ').join('+');
            $.ajax({
                type: "GET",
                url: dataBaseUrl + "/search/person" + dataBaseApiKey + actorName,
                dataType: 'jsonp',
                jsonCallback: 'test',
                contentType: 'application/json',
                success: function(data) {
                    if(data.results[0]) {
                        if(data.results[0].profile_path) {
                            document.getElementsByClassName("imgActor").src = dataBaseImg + data.results[0].profile_path;
                        }
                        if (data.results[0].id) {
                            $.ajax({
                                type: "GET",
                                url: dataBaseUrl + "/person/" + data.results[0].id + dataBaseApiKey,
                                dataType: "jsonp",
                                jsonpCallback: 'test',
                                contentType: 'application/json',
                                success: function (Data) {
                                    document.getElementsByClassName("div").innerHTML = Data.biography;
                                }
                            });
                        }
                    }
                }
            });


            var resultActor = template(source);



            // var template = Handlebars.compile(actorTemplate);
           // var source = this.model.attributes;
           //var resultActor = template(source);

            this.$el.html(resultActor);
        }

    });
    return ActorView;
});