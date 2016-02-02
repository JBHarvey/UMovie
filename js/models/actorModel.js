/**
 * Created by rives on 2016-01-28.
 */


define([
    'underscore',
    'backbone'
],function(_, Backbone) {

    var ActorModel = Backbone.Model.extend({
        defaults:{
            name: "Brad Pitt",
            genre: "Action",
            imageActor: "../../img/imgActor.jpg",
            itunesLink: "https://itunes.apple.com/us/artist/brad-pitt/id272994458"
        }
    });

    return ActorModel;
});