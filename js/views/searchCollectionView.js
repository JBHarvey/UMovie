/**
 * Created by Jean-Benoît on 16-03-01.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'views/thumbnailView',
    'models/imdbActorModel',
    'utils/imdb',
    'views/genreCollectionView',
    '../utils/gravatarIcon',
    'views/tmdbData',
    '../models/userModel',
    'jscookie',
], function ($, _, Backbone, ThumbnailView, ImdbActorModel, Imdb, GenreCollectionView, GravatarIcon, Tmdb, UserModel, Cookie) {
    'use strict';

    var SearchCollectionView = Backbone.View.extend({

        initialize: function () {
            var that = this;
            that.genreCollectionView = that.model;
            that.model = undefined;

            that.listenTo(this.collection, 'sync', that.render);

            that.activeUser = new UserModel({ id: Cookie.get('id') });

            var syncRendering = _.after(2, function () {
                that.render();
            });

            that.activeUser.fetch({
                success: syncRendering,
            });

            that.collection.fetch({
                success: syncRendering,
            });
        },

        render: function () {
            var that = this;

            that.showMessageIfNoResults();
            that.findQueryWord();

            that.collection.each(function (model) {
                if (that.modelCanBeRendered(model)) {
                    that.prepareToFollow(model);
                    var thumbnail = new ThumbnailView({ model: model });
                    that.$el.append(thumbnail.render());
                    that.addImageToActors(model);
                    if (model.attributes.tmdbRequest) {
                        that.callImdb(model);
                    }
                }
            });

            that.addCategoriesToHtml();
            that.addGravatarIcons();
        },

        prepareToFollow: function (model) {
            var that = this;
            if (model.attributes.isUserType) {
                model.attributes.isFollowing = that.isFollowingActiveUser(model);
                model.attributes.userId = model.attributes.id;
                model.attributes.isNotCurrentUser = (Cookie.get('email') !== model.attributes.email);
            }
        },

        addImageToActors: function (model) {
            if (model.attributes.tmdbRequest) {

                var tmdb = new Tmdb();
                tmdb.getTmdbActorData(model.attributes.tmdbRequest, model.attributes.imageId, model.attributes.bioId);
            }
        },

        addGravatarIcons: function () {
            var gravatarImages = document.getElementsByClassName('gravatar-photo');
            Array.prototype.forEach.call(gravatarImages, function (imageElement) {
                var gravatarIcon = new GravatarIcon(imageElement.dataset.email);
                imageElement.src = gravatarIcon.getGravatarURL();
            });
        },

        callImdb: function (model) {
            var that = this;

            var search = model.attributes.artistName.replace(/ ([A-Z]\w?\.)/g, '');
            var searchRequest = encodeURI(search);

            Imdb.actors.findActors({ query: searchRequest }, function (data) {
                var parsedData = JSON.parse(data);

                /* jshint ignore:start */

                // jscs:disable
                var actorDatas = parsedData['name_popular']
                    || parsedData['name_exact']
                    || parsedData['name_approx']
                    || parsedData['name_substring'];

                // jscs:enable
                /* jshint ignore:end */

                if (actorDatas) {

                    var actorID;
                    actorDatas.forEach(function (actor) {

                        if (actorID === undefined && actor.name.localeCompare(model.attributes.artistName) === 0) {
                            actorID = actor;
                        }
                    });

                    that.imdbModel = new ImdbActorModel(actorID);
                    that.imdbModel.fetch({
                        success: function (data) {

                            var biography = data.attributes.bio;
                            const bioId = model.attributes.bioId;
                            Imdb.actors.modifySingleActorBio(biography, bioId);

                            if (data.attributes.image) {
                                var picture = data.attributes.image.url;
                                const imageID = model.attributes.imageId;
                                Imdb.actors.modifySingleActorImage(picture, imageID);
                            }
                        },
                    });
                }
            });
        },

        addCategoriesToHtml: function () {

            var that = this;
            if (that.genreCollectionView) {
                new GenreCollectionView({
                    model: that.genreCollectionView,
                    el: `#${that.genreCollectionView}-search-genre`,
                });
            }
        },

        showMessageIfNoResults: function () {
            var that = this;
            if (that.collection.length === 0) {
                that.$el.append('Sorry, no results were found for this request... Please try again!');
            }
        },

        modelCanBeRendered: function (model) {
            var that = this;

            var query = that.queryWord;
            if (model.attributes.isUserType && query !== '') {
                var name = model.attributes.name;
                var email = model.attributes.email;
                return !!(name.includes(query) || email.includes(query));
            }

            return true;

        },

        effectiveFilter: function (data) {
            return _.filter(data, function (model) {
            });
        },

        findQueryWord: function () {
            if (this.collection.isUserCollection) {
                var currentAddress = document.URL;
                var regexp = /&query=(.*)/g;
                var urlParsed = regexp.exec(currentAddress);
                this.queryWord = decodeURI(urlParsed[1]);
            }
        },

        isFollowingActiveUser: function (user) {
            var that = this;

            return this.activeUser
                    .get('following')
                    .filter(function (follower) {

                        return follower.id === user.attributes.id;
                    }).length > 0;
        },

        events: {
            'click .toggle-following': 'toggleFollowing',
        },

        toggleFollowing: function (event) {
            var that = this;
            var currentButton = event.currentTarget;
            var userId = event.target.attributes.getNamedItem('ref-id').nodeValue;

            if (currentButton.innerHTML.replace(/\s/g, '') === 'Follow') {
                //
                that.activeUser.save({ id: userId }, {
                    success: function () {
                        currentButton.innerHTML = 'Unfollow';
                    },
                });
            } else {
                var userToUnfollow = new UserModel({ id:userId });

                userToUnfollow.destroy({
                    success: function () {
                        currentButton.innerHTML = 'Follow';
                    },
                });
            }
        },
    });
    return SearchCollectionView;

});

