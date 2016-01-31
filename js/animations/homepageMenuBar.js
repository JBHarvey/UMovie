define([
    'jquery'
], function ($) {
    $(document).ready(function () {
        var crossButton = $('.cross');
        var hamburgerButton = $('.hamburger');
        hamburgerButton.on('click', function (event) {
            event.preventDefault();
            var slideOutMenu = $('.navigation-options');

            slideOutMenu.toggleClass("open");

            if (slideOutMenu.hasClass("open")) {
                console.log("shit 1");
                slideOutMenu.animate({
                    left: "0px"
                });
                crossButton.show();
                hamburgerButton.hide();
            }
        });

        crossButton.on('click', function (event) {
            event.preventDefault();
            var slideOutMenu = $('.navigation-options');
            var slideOutMenuWidth = slideOutMenu.width();

            slideOutMenu.toggleClass("open");

            if (!slideOutMenu.hasClass("open")) {
                console.log("Shit 2");
                slideOutMenu.animate({
                    left: -slideOutMenuWidth
                }, 250);
                crossButton.hide();
                hamburgerButton.show();
            }
        });
    });
});
