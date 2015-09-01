/******************************************************************
JAVASCRIPT: MAIN

******************************************************************/

// SIDENAV

$(document).ready(function() {

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