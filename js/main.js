/**
 * Created by Jean-Benoît on 2016-01-18.
 * This file is the bootstrap.
 * It contains the configuration for require.js and
 * loads the initial dependencies to the project.
 */


require.config({
    paths: {
        jquery: 'lib/jquery-2.2.0',
        underscore: 'lib/underscore',
        backbone: 'lib/backbone',
        handlebars: 'lib/handlebars-v4.0.5',
        text: 'lib/text',
        jscookie: 'lib/js.cookie'
    }
});

require([
    'plugins/google/google-api.min',
    'umovie'
], function (gapi, UMovie) {
        gapi.client.setApiKey("AIzaSyBuDm3nSgIWP3SlJq4Z1Q0iwgubuUT_G9k");
        UMovie.initialize();
    }
);

