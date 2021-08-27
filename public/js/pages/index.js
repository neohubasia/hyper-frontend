$(document).ready(function () {
    $(".humberger__menu__nav").find(".humberger__menu__link").removeClass("active");
    $(".humberger__menu__nav").find(".home__menu__link").addClass("active");
    $(".header__menu").find(".header__menu__link").removeClass("active");
    $(".header__menu").find(".home__menu__link").addClass("active");
});