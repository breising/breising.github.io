var view = {};
var data = {};




$(document).ready(function() {

    view.hidePops = function() {
        $('.inviscomfort').hide();
        $('.pop-overview').hide();
        $('.pop-precise').hide();
        $('.pop-install').hide();
        $('.pop-dialed').hide();
        $('.pop-retainer').hide();
    }

    $('.preinstalled').click(function(e) {
        e.preventDefault();
        view.hidePops();
        //$(window).scrollTop($('.pop-install').offset().top - 350);
        $('html, body').stop().animate({ 'scrollTop': $('.preinstalled').offset().top }, 900, 'swing', function() {});
        $('.pop-install').show();
    });

    $('.autopilot').click(function(e) {
        e.preventDefault();
        view.hidePops();
        //$(window).scrollTop($('.pop-precise').offset().top - 350);
        $('html, body').stop().animate({ 'scrollTop': $('.autopilot').offset().top }, 900, 'swing', function() {});
        $('.pop-precise').show();

    });

    $('.dialed').click(function(e) {
        e.preventDefault();
        view.hidePops();
        //$(window).scrollTop($('.pop-dialed').offset().top - 350);
        $('html, body').stop().animate({ 'scrollTop': $('.dialed').offset().top }, 900, 'swing', function() {});
        $('.pop-dialed').show();
    });

    $('.retainer').click(function(e) {
        e.preventDefault();
        view.hidePops();
        //$(window).scrollTop($('.pop-retainer').offset().top - 520);
        $('html, body').stop().animate({ 'scrollTop': $('.retainer').offset().top }, 900, 'swing', function() {});
        $('.pop-retainer').show();
    });

    $('.digital').click(function(e) {
        e.preventDefault();
        view.hidePops();
        //$(window).scrollTop($('.pop-overview').offset().top - 350);
        $('html, body').stop().animate({ 'scrollTop': $('.digital').offset().top }, 900, 'swing', function() {});
        $('.pop-overview').show();
    });

    $('.beauty').click(function(e) {
        e.preventDefault();
        view.hidePops();
        //$(window).scrollTop($('.inviscomfort').offset().top - 350);
        $('html, body').stop().animate({ 'scrollTop': $('.beauty').offset().top }, 900, 'swing', function() {});
        $('.inviscomfort').show();
    });

    $('.xout').click(function() {
        view.hidePops();
    });

    $('.main-butt').click(function() {

    });

});
