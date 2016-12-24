$(document).ready(function () {

    "use strict";

    $(window).on("load", function () {

        // page loader
        
        var pageLoader = $(".page-loader");
        
        pageLoader.fadeOut("slow", function () {
            $(this).remove();
        });

        // Filter items on button click

        var pFilter = $('.portfolio-filter'),
            container = $('.masonry');
        
        pFilter.on('click', 'a', function (e) {
            e.preventDefault();
            var filterValue = $(this).attr('data-filter');
            
            container.isotope({
                filter: filterValue
            });

            $('.portfolio-filter a').removeClass('active');
            $(this).closest('a').addClass('active');

        });

        // Masonry

        container.imagesLoaded(function () {
            container.isotope({
                itemSelector: '.masonry-item',
                layoutMode: 'masonry',
                resizesContainer: false,
                percentPosition: true,
                masonry: {
                    columnWidth: '.thumb',
                    gutter: 6
                }
            });
        });
    });

    // Smooth Scroll Navigation

    var root = $('html, body'),
        topMenu = $(".nav"),
        easing = $(".easing"),
        topMenuHeight = topMenu.outerHeight(),
        menuItems = topMenu.find("a"),

        scrollItems = menuItems.map(function () {
            var item = $($(this).attr("href"));
            if (item.length) {
                return item;
            }
        });

    menuItems.on("click", function (e) {
        var href = $(this).attr("href"),
            offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight;
        
        root.stop().animate({
            scrollTop: offsetTop
        }, 1100, "easeInOutExpo");
        e.preventDefault();
    });


    easing.on("click", function (e) {
        e.preventDefault();
        root.animate({
            scrollTop: $(this.hash).offset().top
        }, 1000, "easeInOutExpo");
    });


    // jQuery Sticky menu
    
    var header = $('header'),
        offsetTop = 50;
    
    $(window).on("scroll", function () {
        if ($(window).scrollTop() > offsetTop) {
            header.addClass('sticky');
        } else {
            header.removeClass('sticky');
        }
    });




    // Intro content center

    function top() {
        var intro = $(".intro"),
            introH = intro.height() / 2,
            introC = $(".intro-content"),
            introCH = introC.height() / 2;
        introC.css("top", introH - introCH);
    }
    
    top();
    
    $(window).on("resize", function () {
        top();
    });


    // Skillbar 

    var skillbar = $(".skillbar");
    
    skillbar.appear(function () {
        skillbar.each(function () {
            $(this).find(".skillbar-child").animate({
                width: $(this).attr("data-percent")
            }, 1000);

        });
    });


    // Testimonial Carousel 

    var tCarosuel = $(".testimonial-carousel");

    tCarosuel.owlCarousel({
        items: 1,
        loop: true,
        nav: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 5000,
        slideSpeed: 1000,
        navText: ['<i class="ion-android-arrow-back"></i>', '<i class="ion-android-arrow-forward"></i>']
    });


    // Image popups

    var popup = $('.mfp-popup');
    
    popup.magnificPopup({
        delegate: 'a',
        type: 'image',
        removalDelay: 500,
        closeOnContentClick: true,
        midClick: true,
        callbacks: {
            open: function () {
                $("html").css({
                    'margin-right': '0'
                });
            },
            beforeOpen: function () {
                this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                this.st.mainClass = this.st.el.attr('data-effect');
            }
        }
    });
    
});