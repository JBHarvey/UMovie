({
    baseURL: './',
    paths: {
        jquery: './js/lib/jquery-2.2.0',
        underscore: './js/lib/underscore',
        backbone: './js/lib/backbone',
        handlebars: './js/lib/handlebars-v4.0.5',
        text: './js/lib/text',
        jscookie: './js/lib/js.cookie',
        theMovieDb: './js/lib/themoviedb',
        crypto: './js/plugins/google/md5',
        IMDB: './js/utils/imdb',
    },
    fileExclusionRegExp: /^node_modules$/,
    keepBuildDir: false,
    optimizeCss: 'standard',
    optimize: 'uglify',
    normalizeDirDefines: 'skip',
    dir: './build',
    inlineText: true,
    useStrict: true,
    skipSemiColonInsertion: false,
    writeBuildTxt: true
})
