/**
 * Created by Antoine Gagné on 4/4/16.
 */

define(function () {
    "use strict";
    var imdb = {};

    imdb.common = {
        base_url: 'http://localhost:5000',
        //base_url: 'https://www.imdb-api-request.herokuapp.com',
        timeout: 12000,

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
            var method, status, xhr;

            method = "POST";
            status = 200;
            xhr = new XMLHttpRequest();

            xhr.ontimeout = function () {
                error('{"status_code":408,"status_message":"Request timed out"}');
            };

            xhr.open(method, options.url, true);

            xhr.setRequestHeader('Content-Type', 'application/json');

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

            var query = JSON.stringify({ query: options.query });
            xhr.send(query);
        }
    };

    imdb.medias = {
        findMedias: function (options, success, error) {
            imdb.common.validateRequired(options, ['query']);

            imdb.common.validateCallbacks([success, error]);

            imdb.common.client(
                {
                    query: options.query,
                    url: imdb.common.base_url + '/search/medias'
                },
                success,
                error
            );
        },

        getMediaById: function (options, success, error) {
            imdb.common.validateRequired(options, ['query']);

            imdb.common.validateCallbacks([success, error]);

            imdb.common.client(
                {
                    query: options.query,
                    url: imdb.common.base_url + '/medias'
                },
                success,
                error
            );
        }
    };

    imdb.actors = {
        findActors: function (options, success, error) {
            imdb.common.validateRequired(options, ['query']);

            imdb.common.validateCallbacks([success, error]);

            imdb.common.client(
                {
                    query: options.query,
                    url: imdb.common.base_url + '/search/actors'
                },
                success,
                error
            );
        },

        getActorById: function (options, success, error) {
            imdb.common.validateRequired(options, ['query']);

            imdb.common.validateCallbacks([success, error]);

            imdb.common.client(
                {
                    query: options.query,
                    url: imdb.common.base_url + '/actors'
                },
                success,
                error
            );
        }
    };

    return imdb;
});
