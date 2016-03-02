/**
 * Created by Vincent on 16-03-02.
 */

//Model for the definition of the creation of a watchlist
define([
    'jquery',
    'backbone'
], function($,Backbone){
    var watchlistCreationModel = Backbone.Model.extend({
        defaults: {
            name : ""
        }

    });
    console.log("je passe dans le modele");
    return watchlistCreationModel;
});