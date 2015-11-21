//autoscroll.js
/**
 * Created by Fariba Mobara on 12/10/15.
 *
 * @file autoscroll.js
 * @description
 *
 */
(function ($) {
    /**
     * Scolling down to the Edit employment
     * Handle the scrolling animation if user want to scolling
     */
    var $viewport = $('html, body');

    // Some event to trigger the scroll animation (with a nice ease - requires easing plugin )...
    $(".sm-edit-btn").click(function() {
        $viewport.animate({
            scrollTop: $("#employment-form")// set scrollTarget to your desired position
        }, 1700, "easeOutQuint");
    });

    // Stop the animation if the user scrolls. Defaults on .stop() should be fine
    $viewport.bind("scroll mousedown DOMMouseScroll mousewheel keyup", function(e){
        if ( e.which > 0 || e.type === "mousedown" || e.type === "mousewheel"){
            $viewport.stop().unbind('scroll mousedown DOMMouseScroll mousewheel keyup'); // This identifies the scroll as a user action, stops the animation, then unbinds the event straight after (optional)
        }
    });
})
(jQuery);