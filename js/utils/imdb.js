/**
 * Created by Antoine Gagné on 4/4/16.
 */

define(function () {
    "use strict";
    var imdb = {};

    imdb.common = {
        id_base_url: 'http://www.imdb.com/xml/find?json=1&nr=1',
        info_base_url: 'http://app.imdb.com/name/maindetails',
        timeout: 2000,

        validateCallbacks: function (callbacks) {
            'use strict';
            if (typeof callbacks[0] !== "function" || typeof callbacks[1] !== "function") {
                throw "Success and error parameters must be functions!";
            }
        },

        validateRequired: function (options, requiredOptions) {
            for (var i = 0; i < requiredOptions; ++i) {
                if (!options.hasOwnProperty(requiredOptions[i])) {
                    throw requiredOptions[i] + 'is a required parameter and is not present in the options!';
                }
            }
        },

        generateQuery: function (option) {
            var query = encodeURI(option.query).replace(/%20/g, '+');

            return '&q=' + query;
        },

        client: function (options, success, error) {
            var method, status, xhr;

            method = "GET";
            status = 200;
            xhr = new XMLHttpRequest();

            xhr.ontimeout = function () {
                error('{"status_code":408,"status_message":"Request timed out"}');
            };

            xhr.open(method, options.url, true);

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

            xhr.send(null);
        }
    };

    imdb.medias = {
        findMedias: function (options, success, error) {
            imdb.common.validateRequired(options, ['query']);

            imdb.common.validateCallbacks(success, error);

            imdb.common.client(
                {
                    url: imdb.common.id_base_url + '&tt=on' + imdb.common.generateQuery(options.query)
                },
                success,
                error
            );
        },

        getMediaById: function (options, success, error) {
            imdb.common.validateRequired(options, ['query']);

            imdb.common.validateCallbacks(success, error);

            imdb.common.client(
                {
                    url: imdb.common.info_base_url + '?tconst=' + options.query
                },
                success,
                error
            );
        }
    };

    imdb.actors = {
        findActors: function (options, success, error) {
            imdb.common.validateRequired(options, ['query']);

            imdb.common.validateCallbacks(success, error);

            imdb.common.client(
                {
                    url: imdb.common.id_base_url + '&nm=on' + imdb.common.generateQuery(options.query)
                },
                success,
                error
            );
        },

        getActorById: function (options, success, error) {
            imdb.common.validateRequired(options, ['query']);

            imdb.common.validateCallbacks(success, error);

            imdb.common.client(
                {
                    url: imdb.common.info_base_url + '?nconst=' + options.query
                },
                success,
                error
            );
        }
    };

    return imdb;
});
