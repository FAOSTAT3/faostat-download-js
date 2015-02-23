var root = '../modules/';

require.config({

    baseUrl: 'js/libs',

    paths: {
        SELECTORS: root + 'faostat-download-selectors/faostat-download-selectors',
        selectors: root + 'faostat-download-selectors'
    },

    shim: {
        bootstrap: ['jquery']
    }

});

require(['jquery',
        'mustache',
        'bootstrap',
        'domReady!'], function($, Mustache) {

});