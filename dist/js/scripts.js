/******************************************************************
JAVASCRIPT: MAIN

******************************************************************/

// SIDENAV

$(document).ready(function() {

    var offset = 300,
        //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
        offset_opacity = 1200,
        //duration of the top scrolling animation (in ms)
        scroll_top_duration = 600,
        //grab the "back to top" link
        $back_to_top = $('.cd-top');

    var contentSections    = $('.article-section'),
        navigationItems    = $('.sidenav-toplink'),
        navigationItemsSec = $('.sidenav-toplink a'),
        navigationItemsAll = $('.sidenav-link'),
        navigation         = $('.sidenav'),
        sectionFirst       = $('#section1');

    if ( $(window).width() > 1361 ) {

        updateNavigation();
    }

    $(window).on('scroll', function(){
        updateNavigation();
        scrollNavigation();
        backToTop();
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
        $('body,html').animate({
            'scrollTop': target.offset().top - 100},
            scroll_top_duration
        );
    }

    function backToTop() {
        if ( $(this).scrollTop() > offset ) {
            $back_to_top.addClass('cd-is-visible');

        } else {
            $back_to_top.removeClass('cd-is-visible cd-fade-out');
        }

        if ( $(this).scrollTop() > offset_opacity ) {
            $back_to_top.addClass('cd-fade-out');
        }
    }

    //smooth scroll to top
    $back_to_top.on('click', function(event){
        event.preventDefault();
        $('body,html').animate({
            scrollTop: 0 ,
            }, scroll_top_duration
        );
    });

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