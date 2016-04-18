/**
 * Created by Eduardo on 2016-04-17.
 */
define([
    'backbone',
], function (Backbone) {

    var teamModel = Backbone.Model.extend({
        defaults: {
            teamDevelopers: [
                {
                    name: 'Luis Obando', nickname: 'The UX Master',
                    photoLink: 'url(../../img/Team/luis.jpg',
                    quote: 'Do you even flex-box bro?!',
                    facebookLink: 'https://www.facebook.com/luiseduardo.obandocarbajal?fref=ts',
                    githubLink: 'https://github.com/luiseduardo1',
                },

                {
                    name: 'Antoine Gagné', nickname: 'The Haskell Enthusiast',
                    photoLink: 'url(../../img/Team/antoine.jpg',
                    quote: 'Needs more Haskell!',
                    facebookLink: 'https://www.facebook.com/antoine.gagne.58?fref=ts',
                    githubLink: 'https://github.com/AntoineGagne',
                },

                {
                    name: 'Jean-Benoit Harvey', nickname: 'The Architect',
                    photoLink: 'url(../../img/Team/jean-benoit.jpg',
                    quote: 'TV guys!',
                    facebookLink: 'https://www.facebook.com/jeanbenoit.harvey.1?fref=ts',
                    githubLink: 'https://github.com/JBHarvey',
                },

                {
                    name: 'Alexandre Rivest', nickname: 'The *MDB Master',
                    photoLink: 'url(../../img/Team/alexandre.jpg',
                    quote: 'Checker ça les boys : <random link>!',
                    facebookLink: 'https://www.facebook.com/alexandre.rivest.58?fref=ts',
                    githubLink: 'https://github.com/tiaaaa123',
                },

                {
                    name: 'Vincent Emond', nickname: 'The Ginger One',
                    photoLink: 'url(../../img/Team/vincent.jpg',
                    quote: 'Je suis même pas roux!',
                    facebookLink: 'https://www.facebook.com/vincent.emond.50?fref=ts',
                    githubLink: 'https://github.com/VincEmond',
                },

                {
                    name: 'Seydou Konaté', nickname: 'Seydou L. Jackson Konaté',
                    photoLink: 'url(../../img/Team/seydou.jpg',
                    quote: 'Hi guys...',
                    facebookLink: 'https://www.facebook.com/seydou.konate.9678?fref=ts',
                    githubLink: 'https://github.com/skip87',
                },

                {
                    name: 'Ronald Beaubrun', nickname: 'Our Spiritual Leader',
                    photoLink: 'url(../../img/Team/ronald.jpg',
                    quote: 'Connaissez-vous mon algorithme?',
                },
            ],
        },
    });

    return teamModel;
});
