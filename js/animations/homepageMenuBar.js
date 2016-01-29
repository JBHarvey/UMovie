$(document).ready(function () {
    var crossButton = $('.cross');
    var hamburgerButton = $('.hamburger');
    hamburgerButton.on('click', function(event) {
    	event.preventDefault();
    	var slideOutMenu = $('.navigation-options');

    	slideOutMenu.toggleClass("open");

    	if (slideOutMenu.hasClass("open")) {
	    	slideOutMenu.animate({
		    	left: "0px"
	    	});
			crossButton.display('block');
            hamburgerButton.display('none');
    	}
    });

    crossButton.on('click', function(event) {
        event.preventDefault();
        var slideOutMenu = $('.navigation-options');
        var slideOutMenuWidth = slideOutMenu.width();

        slideOutMenu.toggleClass("open");

        if (!slideOutMenu.hasClass("open")) {
            slideOutMenu.animate({
                    left: -slideOutMenuWidth
                }, 250);
            crossButton.display('none');
            hamburgerButton.display('block');
        }
    });
});