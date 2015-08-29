/******************************************************************
JAVASCRIPT: MAIN

******************************************************************/

// SIDENAV

$(document).ready(function() {

    var contentSections    = $('.article-section'),
        navigationItems    = $('.sidenav-toplink'),
        navigationItemsAll = $('.sidenav-link'),
        navigation         = $('.sidenav'),
        sectionFirst       = $('#section1');

    updateNavigation();

    $(window).on('scroll', function(){
        updateNavigation();
        scrollNavigation();
    });

    //smooth scroll to the section
    navigationItemsAll.on('click', function(event){
        event.preventDefault();
        smoothScroll($(this.hash));
    });

    function updateNavigation() {
        contentSections.each(function(){

            $this = $(this);
            var activeSection = $('.sidenav a[href="#' + $this.attr('id') + '"]').data('number') - 1;

            if ( ( $this.offset().top - $(window).height()/2 < $(window).scrollTop() ) && ( $this.offset().top + $this.height() - $(window).height()/2 > $(window).scrollTop() ) ) {
                navigationItems.eq(activeSection).addClass('is-selected');

            } else {
                navigationItems.eq(activeSection).removeClass('is-selected');
            }
        });
    }

    function scrollNavigation() {
        var winOffset = $(window).scrollTop(),
            secOffset = sectionFirst.offset().top,
            navOffset = winOffset - secOffset + 100;

        if ( winOffset > ( secOffset - 100) ) {
            navigation.css('top', navOffset);

        } else {
            navigation.css('top', 0);
        }
    }

    function smoothScroll(target) {
        $('body,html').animate(
            {'scrollTop':target.offset().top - 100},
            600
        );
    }

}); // end document.ready
// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());