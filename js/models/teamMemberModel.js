/**
 * Created by Eduardo on 2016-04-17.
 */
define([
    'backbone',
], function (Backbone) {

    var teamModel = Backbone.Model.extend({
        defaults: {
            teamDevelopers: [
                {name: "Luis Obando", nickname:"The UX Master",
                    quote: "Do you even flex-box bro?!",
                    facebookLink: "https://www.facebook.com/luiseduardo.obandocarbajal?fref=ts",
                    githubLink:"https://github.com/luiseduardo1"},

                {name: "Antoine Gagné", nickname: "The Haskell Enthusiast",
                    quote: "Needs more haskell!",
                    facebookLink: "ttps://www.facebook.com/antoine.gagne.58?fref=ts",
                    githubLink:"https://github.com/AntoineGagne"},

                {name: "Jean-Benoit Harvey", nickname:"The UX Master",
                    quote: "TV guys!",
                    facebookLink: "https://www.facebook.com/jeanbenoit.harvey.1?fref=ts",
                    githubLink:"https://github.com/JBHarvey"},

                {name: "Antoine Rivest", nickname:"The *MDB Master",
                    quote: "Checker ça les boys : random link!",
                    facebookLink: "https://www.facebook.com/alexandre.rivest.58?fref=ts",
                    githubLink:"https://github.com/tiaaaa123"},

                {name: "Vincent Emond", nickname:"The Ginger One",
                    quote: "Je suis même pas roux!",
                    facebookLink: "https://www.facebook.com/vincent.emond.50?fref=ts",
                    githubLink:"https://github.com/VincEmond"},

                {name: "Seydou Konaté", nickname:"Seydou L. Jackson Konaté",
                    quote: "Add your quote here!",
                    facebookLink: "", githubLink:""},

                {name: "Ronald Beaubrun", nickname:"Our Spiritual Leader",
                    quote: "Connaissez-vous mon algorithme?"},
            ]
        }
    });

    return teamModel;
});