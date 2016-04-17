/**
 * Created by Jean-Benoît on 16-03-01.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'views/thumbnailView',
    'views/tmdbData',
    'views/genreCollectionView',
    '../utils/gravatarIcon',
], function ($, _, Backbone, ThumbnailView, Tmdb, GenreCollectionView, GravatarIcon) {

    var SearchCollectionView = Backbone.View.extend({

        initialize: function () {
            var that = this;
            that.genreCollectionView = that.model;
            that.model = undefined;
            that.listenTo(this.collection, 'sync', that.render);
            that.collection.fetch();
        },


        render: function () {
            var that = this;

            that.showMessageIfNoResults();
            that.findQueryWord();

            this.collection.each(function (model) {
                if (that.modelCanBeRendered(model)) {
                    var thumbnail = new ThumbnailView({model: model});
                    that.$el.append(thumbnail.render());
                    that.addImageToActors(model);
                }
            });

            that.addCategoriesToHtml();
            that.addGravatarIcons();
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
            if (model.attributes.isUserType && query != '') {
                var name = model.attributes['name'];
                var email = model.attributes['email'];
                return !!(name.includes(query) || email.includes(query));
            }
            return true;

        },

        effectiveFilter: function (data) {
            'use strict';
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

    });
    return SearchCollectionView;

});
