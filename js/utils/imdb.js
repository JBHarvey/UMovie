/**
 * @author Antoine Gagné <antoine.gagne.2@ulaval.ca>
 * This module contains an object with methods to call the custom IMDB API.
 * It was largely inspired by the TheMovieDB javascript file.
 */

define(['jquery',

],function ($) {
    'use strict';

    var imdb = {};

    imdb.common = {
        base_url: 'http://localhost:5000',

        // At the moment, the HTTPS of heroku is not working with the application HTTP
        //base_url: 'https://www.imdb-api-request.herokuapp.com',
        timeout: 2000,

        validateCallbacks: function (callbacks) {
            if (typeof callbacks[0] !== 'function' || typeof callbacks[1] !== 'function') {
                throw 'Success and error parameters must be functions!';
            }
        },

        validateRequired: function (options, requiredOptions) {
            for (var i = 0; i < requiredOptions.length; ++i) {
                if (!options.hasOwnProperty(requiredOptions[i])) {
                    throw requiredOptions[i] + 'is a required parameter and is not present in the options!';
                }
            }
        },

        generateQuery: function (option) {
            return encodeURI(option.query).replace(/%20/g, '+');
        },

        client: function (options, success, error) {
            var method;
            var status;
            var xhr;

            method = options.method;
            status = 200;
            xhr = new XMLHttpRequest();

            xhr.ontimeout = function () {
                error('{"status_code":408,"status_message":"Request timed out"}');
            };

            xhr.open(method, options.url, true);

            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.setRequestHeader('Accept', 'application/json');

            xhr.timeout = imdb.common.timeout;

            xhr.onload = function (e) {
                if (xhr.readyState === 4) {
                    if (xhr.status === status) {
                        success(xhr.responseText);
                    } else {
                        error(xhr.responseText);
                    }
                } else {
                    error(xhr.responseText);
                }
            };

            xhr.onerror = function (e) {
                error(xhr.responseText);
            };

            if (method === 'POST') {
                var query = JSON.stringify({ query: options.query });
                xhr.send(query);
            } else {
                xhr.send(null);
            }
        },
    };

    imdb.medias = {
        /**
         * Retrieves the ID of medias that respects a certain name.
         * @param {Object} options - An object that contains the query.
         * @param {string} options.query - The URI encoded name of the media.
         * @param {callback} success - The success callback function that handles the response.
         * @param {callback} error - The error callback function.
         *
         * @example
         * imdb.medias.findMedias({query: 'avengers'}, function (successData) {
         *    var parsedData = JSON.parse(successData);
         *    // Do something with the data
         * }, function (error) {
         *    // Handles the error
         * });
         */
        findMedias: function (options, success, error) {
            imdb.common.validateRequired(options, ['query']);

            var successCB = success || function (data) { console.log(data); };
            var errorCB = error || function (data) { console.log(data); };

            imdb.common.validateCallbacks([successCB, errorCB]);

            imdb.common.client(
                {
                    method: 'POST',
                    query: options.query,
                    url: imdb.common.base_url + '/search/medias',
                },
                successCB,
                errorCB
            );
        },

        /**
         * Retrieves a media by ID.
         * @param {Object} options - An object that contains the query.
         * @param {string} options.query - The id of the media.
         * @param {callback} success - The success callback function that handles the response.
         * @param {callback} error - The error callback function.
         *
         * @example
         * imdb.medias.getMediaById({query: 'tt2395427'}, function (successData) {
         *    var parsedData = JSON.parse(successData);
         *    // Do something with the data
         * }, function (error) {
         *    // Handles the error
         * });
         */
        getMediaById: function (options, success, error) {
            imdb.common.validateRequired(options, ['query']);

            var successCB = success || function (data) { console.log(data); };
            var errorCB = error || function (data) { console.log(data); };

            imdb.common.validateCallbacks([successCB, errorCB]);

            imdb.common.client(
                {
                    method: 'GET',
                    url: imdb.common.base_url + '/medias/' + options.query,
                },
                successCB,
                errorCB
            );
        },

        /**
         * Retrieves the images of a media.
         * @param {Object} options - An object that contains the query.
         * @param {string} options.query - The id of the media.
         * @param {callback} success - The success callback function that handles the response.
         * @param {callback} error - The error callback function.
         *
         * @example
         * imdb.medias.getMediaImages({query: 'tt2395427'}, function (successData) {
         *    var parsedData = JSON.parse(successData);
         *    // Do something with the data
         * }, function (error) {
         *    // Handles the error
         * });
         */
        getMediaImages: function (options, success, error) {
            imdb.common.validateRequired(options, ['query']);

            var successCB = success || function (data) { console.log(data); };
            var errorCB = error || function (data) { console.log(data); };

            imdb.common.validateCallbacks([successCB, errorCB]);

            imdb.common.client(
                {
                    method: 'POST',
                    query: options.query,
                    url: imdb.common.base_url + '/medias/images',
                },
                successCB,
                errorCB
            );
        },

        /**
         * Retrieves the credits of a media.
         * @param {Object} options - An object that contains the query.
         * @param {string} options.query - The id of the media.
         * @param {callback} success - The success callback function that handles the response.
         * @param {callback} error - The error callback function.
         *
         * @example
         * imdb.medias.getMediaCredits({query: 'tt2395427'}, function (successData) {
         *    var parsedData = JSON.parse(successData);
         *    // Do something with the data
         * }, function (error) {
         *    // Handles the error
         * });
         */
        getMediaCredits: function (options, success, error) {
            imdb.common.validateRequired(options, ['query']);

            var successCB = success || function (data) { console.log(data); };
            var errorCB = error || function (data) { console.log(data); };

            imdb.common.validateCallbacks([successCB, errorCB]);

            imdb.common.client(
                {
                    method: 'POST',
                    query: options.query,
                    url: imdb.common.base_url + '/medias/credits',
                },
                successCB,
                errorCB
            );
        },

        /**
         * Retrieves the comments of users on a media.
         * @param {Object} options - An object that contains the query.
         * @param {string} options.query - The id of the media.
         * @param {callback} success - The success callback function that handles the response.
         * @param {callback} error - The error callback function.
         *
         * @example
         * imdb.medias.getUsersComments({query: 'tt2395427'}, function (successData) {
         *    var parsedData = JSON.parse(successData);
         *    // Do something with the data
         * }, function (error) {
         *    // Handles the error
         * });
         */
        getUsersComments: function (options, success, error) {
            imdb.common.validateRequired(options, ['query']);

            var successCB = success || function (data) { console.log(data); };
            var errorCB = error || function (data) { console.log(data); };

            imdb.common.validateCallbacks([successCB, errorCB]);

            imdb.common.client(
                {
                    method: 'POST',
                    query: options.query,
                    url: imdb.common.base_url + '/medias/usercomments',
                },
                successCB,
                errorCB
            );
        },

        /**
         * Retrieves the plot of a media.
         * @param {Object} options - An object that contains the query.
         * @param {string} options.query - The id of the media.
         * @param {callback} success - The success callback function that handles the response.
         * @param {callback} error - The error callback function.
         *
         * @example
         * imdb.medias.getMediaPlot({query: 'tt2395427'}, function (successData) {
         *    var parsedData = JSON.parse(successData);
         *    // Do something with the data
         * }, function (error) {
         *    // Handles the error
         * });
         */
        getMediaPlot: function (options, success, error) {
            imdb.common.validateRequired(options, ['query']);

            var successCB = success || function () {};
            var errorCB = error || function (data) { console.log(data) };

            imdb.common.validateCallbacks([successCB, errorCB]);

            imdb.common.client(
                {
                    method: 'POST',
                    query: options.query,
                    url: imdb.common.base_url + '/medias/plot',
                },
                successCB,
                errorCB
            );
        },

        /**
         * Retrieves the 250 top rated TV shows.
         * @param {callback} success - The success callback function that handles the response.
         * @param {callback} error - The error callback function.
         *
         * @example
         * imdb.medias.getTopRatedTVShows(function (successData) {
         *    var parsedData = JSON.parse(successData);
         *    // Do something with the data
         * }, function (error) {
         *    // Handles the error
         * });
         */
        getTopRatedTVShows: function (success, error) {
            var successCB = success || function (data) { console.log(data); };
            var errorCB = error || function (data) { console.log(data); };

            imdb.common.validateCallbacks([successCB, errorCB]);

            imdb.common.client(
                {
                    method: 'GET',
                    url: imdb.common.base_url + '/medias/top/tvshows',
                },
                successCB,
                errorCB
            );
        },

        /**
         * Retrieves the 250 top rated movies.
         * @param {callback} success - The success callback function that handles the response.
         * @param {callback} error - The error callback function.
         *
         * @example
         * imdb.medias.getTopRatedMovies(function (successData) {
         *    var parsedData = JSON.parse(successData);
         *    // Do something with the data
         * }, function (error) {
         *    // Handles the error
         * });
         */
        getTopRatedMovies: function (success, error) {
            var successCB = success || function (data) { console.log(data); };
            var errorCB = error || function (data) { console.log(data); };

            imdb.common.validateCallbacks([successCB, errorCB]);

            imdb.common.client(
                {
                    method: 'GET',
                    url: imdb.common.base_url + '/medias/top/movies',
                },
                successCB,
                errorCB
            );
        },
    };

    imdb.actors = {
        /**
         * Retrieves the ID of actors that respects a certain name.
         * @param {Object} options - An object that contains the query.
         * @param {string} options.query - The URI encoded name of the actors.
         * @param {callback} success - The success callback function that handles the response.
         * @param {callback} error - The error callback function.
         *
         * @example
         * imdb.actors.findActors({query: 'eleanor+tomlinson'}, function (successData) {
         *    var parsedData = JSON.parse(successData);
         *    // Do something with the data
         * }, function (error) {
         *    // Handles the error
         * });
         */
        findActors: function (options, success, error) {
            imdb.common.validateRequired(options, ['query']);

            var successCB = success || function () {};
            var errorCB = error || function (data) { console.log(data) };

            imdb.common.validateCallbacks([successCB, errorCB]);

            imdb.common.client(
                {
                    method: 'POST',
                    query: options.query,
                    url: imdb.common.base_url + '/search/actors',
                },
                successCB,
                errorCB
            );
        },

        /**
         * Retrieves a media by ID.
         * @param {Object} options - An object that contains the query.
         * @param {string} options.query - The id of the actor.
         * @param {callback} success - The success callback function that handles the response.
         * @param {callback} error - The error callback function.
         *
         * @example
         * imdb.actors.getActorById({query: 'nm1870434'}, function (successData) {
         *    var parsedData = JSON.parse(successData);
         *    // Do something with the data
         * }, function (error) {
         *    // Handles the error
         * });
         */
        getActorById: function (options, success, error) {
            imdb.common.validateRequired(options, ['query']);

            var successCB = success || function () {};
            var errorCB = error || function (data) { console.log(data) };

            imdb.common.validateCallbacks([successCB, errorCB]);

            imdb.common.client(
                {
                    method: 'GET',
                    url: imdb.common.base_url + '/actors/' + options.query,
                },
                successCB,
                errorCB
            );
        },

        /**
         * Retrieves the images of a media.
         * @param {Object} options - An object that contains the query.
         * @param {string} options.query - The id of the actor.
         * @param {callback} success - The success callback function that handles the response.
         * @param {callback} error - The error callback function.
         *
         * @example
         * imdb.actors.getActorImages({query: 'nm1870434'}, function (successData) {
         *    var parsedData = JSON.parse(successData);
         *    // Do something with the data
         * }, function (error) {
         *    // Handles the error
         * });
         */
        getActorImages: function  (options, success, error) {
            imdb.common.validateRequired(options, ['query']);

            var successCB = success || function () {};
            var errorCB = error || function (data) { console.log(data) };

            imdb.common.validateCallbacks([successCB, errorCB]);

            imdb.common.client(
                {
                    method: 'POST',
                    query: options.query,
                    url: imdb.common.base_url + '/actors/images',
                },
                successCB,
                errorCB
            );
        },

        modifySingleActorBio: function (biography, bioIdName) {

            if (biography) {
                const actorBioId = bioIdName;
                $(`#${actorBioId}`).each(function () {
                    if (actorBioId !== 'description') {
                        $(this).text(imdb.actors.shortenText(biography));
                    } else {
                        $(this).text(biography);
                    }
                });
            }

            return this;
        },

        modifySingleActorImage: function (image, imageId) {

            if (image) {
                $(`#${imageId}`).attr('src', image);

            }

            return this;
        },
        shortenText: function (textToShortent, length) {
            var newLength = length || 300;
            return `${textToShortent.slice(0, newLength)} ... `;

        },
    };

    return imdb;
});
