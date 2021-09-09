/*  ---------------------------------------------------
    Template Name: itemplate
    Description:  itemplate eCommerce  HTML Template
    Author: Colorlib
    Author URI: https://colorlib.com
    Version: 1.0
    Created: Colorlib
---------------------------------------------------------  */

'use strict';

/// Checking Something Functoin ///

$.fn.safeUrl = function (args) {
    var that = this;

    if ($(that).attr('data-safeurl') && $(that).attr('data-safeurl') === 'found') {
        return that;
    }
    else {
        $.ajax({
            url: args.changeUrl,
            type: 'HEAD',
            error: function () {
                $(that).attr('setbg', args.originUrl)
            },
            success: function () {
                $(that).css("background-image", "url(" + args.changeUrl + ")");
                $(that).attr('data-safeurl', 'found');
            }
        });
    }
    return that;
};

function swalWarning(args, icon = "warning") {
    Swal.fire({
        icon: icon,
        text: args.text,
        title: args.title,
        buttonsStyling: true,
        showConfirmButton: true,
        confirmButtonText: "CLOSE",
        customClass: 'swal-style',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    });
}

function checkAuthEnsure() {
    if (Object.keys(authData).length <= 0) {
        // swalWarning({
        //     icon: "warning",
        //     title: "Warning Message",
        //     text: "The specified number of images has been reached",
        // }); that is general calling

        Swal.fire({
            icon: "warning",
            title: "Warning Message",
            text: "You need to login first to continue",
            showCancelButton: true,
            confirmButtonText: 'Login',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        }).then((result) => {
            /* Read more about isConfirmed */
            if (result.isConfirmed) {
                window.location = '/auth/login'
            }
        })
        return false;
    }
    else return true;
}

/// Comman Ajax Request ///

function commonProductCategory(slider = false) {
    $.ajax({
        url: "/api/getProductCategory",
        type: "GET",
        data: { status: true },
        dataType: 'json',
        success: async function (result) {
            if (result.status == "SUCCESS" && result.data.length > 0) {
                let catClone = $('#commonCategory').find('ul').clone();
                let liHtml = "";

                $.each(result.data, async function (Idx, obj) {
                    catClone.find('a').attr('href', `/shop-items?category_id=${obj.id}`)
                    catClone.find('a').text(obj.name)
                    liHtml += catClone.html();
                });

                $('#commonCategory').find('ul').html(liHtml);

                if (slider == true) {
                    let catSliderClone = $('#commonCategorySlider').find('.owl-carousel').clone();
                    let sliderHtml = "";

                    $.each(result.data, async function (Idx, obj) {
                        catSliderClone.find('.categories__item').attr('data-setbg', 'https://via.placeholder.com/270x270/555/555')
                        catSliderClone.find('a').attr('href', `/shop-items?category_id=${obj.id}`);
                        catSliderClone.find('a').text(obj.name);

                        sliderHtml += catSliderClone.html();
                    })

                    $('#commonCategorySlider').find('.owl-carousel').html(sliderHtml);

                    /*-----------------------
                        Categories Slider
                    ------------------------*/
                    $(".categories__slider").owlCarousel({
                        loop: true,
                        margin: 0,
                        items: 4,
                        nav: true,
                        dots: false,
                        navText: ["<span class='fa fa-angle-left'><span/>", "<span class='fa fa-angle-right'><span/>"],
                        animateOut: 'fadeOut',
                        animateIn: 'fadeIn',
                        smartSpeed: 1200,
                        autoHeight: false,
                        autoplay: true,
                        responsive: {
                            0: {
                                items: 1,
                            },

                            480: {
                                items: 2,
                            },

                            768: {
                                items: 3,
                            },

                            992: {
                                items: 4,
                            }
                        }
                    });
                }
            }
        },
        error: function (xhr) {
            console.log("Product Category ", xhr)
        }
    });
}

function shopCartCount() {
    $.ajax({
        url: '/api/getCartList',
        data: {
            customerId: authData._id
        },
        dataType: 'json',
        success: function (response) {
            $('.shopCartCount').each(function () {
                $(this).find('span').text(response.data.length)
                sessionStorage.setItem('cartList', JSON.stringify(response.data))
            })
        }
    });
}

function addToCart(productId, quantity) {
    if (!checkAuthEnsure()) {
        return false;
    }

    $.ajax({
        url: '/api/addToCart',
        data: {
            customerId: authData._id,
            productId: productId,
            quantity: quantity
        },
        type: "post",
        dataType: 'json',
        success: function (response) {
            console.log("ADD TO CART ", response)
            alert("Process to Add to cart  update")
        }
    });
}


(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloader").delay(100).fadeOut(100);

        /*------------------
            Gallery filter
        --------------------*/
        // $('.featured__controls li').on('click', function () {
        //     $('.featured__controls li').removeClass('active');
        //     $(this).addClass('active');
        // });
        // if ($('.featured__filter').length > 0) {
        //     var containerEl = document.querySelector('.featured__filter');
        //     var mixer = mixitup(containerEl);
        // }
    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    //Humberger Menu
    $(".humberger__open").on('click', function () {
        $(".humberger__menu__wrapper").addClass("show__humberger__menu__wrapper");
        $(".humberger__menu__overlay").addClass("active");
        $("body").addClass("over_hid");
    });

    $(".humberger__menu__overlay").on('click', function () {
        $(".humberger__menu__wrapper").removeClass("show__humberger__menu__wrapper");
        $(".humberger__menu__overlay").removeClass("active");
        $("body").removeClass("over_hid");
    });

    /*------------------
        Navigation
    --------------------*/
    $(".mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });

    $('.hero__categories__all').on('click', function () {
        $('.hero__categories ul').slideToggle(400);
    });


    /*---------------------------------
        Product Details Pic Slider
    ----------------------------------*/
    $(".product__details__pic__slider").owlCarousel({
        loop: true,
        margin: 20,
        items: 4,
        dots: true,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true
    });

    /*-----------------------
        Price Range Slider
    ------------------------ */
    var rangeSlider = $(".price-range"),
        minamount = $("#minamount"),
        maxamount = $("#maxamount"),
        minPrice = rangeSlider.data('min'),
        maxPrice = rangeSlider.data('max');

    rangeSlider.slider({
        range: true,
        min: minPrice,
        max: maxPrice,
        values: [minPrice, maxPrice],
        slide: function (event, ui) {
            minamount.val(ui.values[0]);
            maxamount.val(ui.values[1]);
        }
    });
    minamount.val(rangeSlider.slider("values", 0));
    maxamount.val(rangeSlider.slider("values", 1));

    /*--------------------------
        Select
    ----------------------------*/
    $("select").niceSelect();

    /*------------------
        Single Product
    --------------------*/
    $('.product__details__pic__slider img').on('click', function () {

        var imgurl = $(this).data('imgbigurl');
        var bigImg = $('.product__details__pic__item--large').attr('src');
        if (imgurl != bigImg) {
            $('.product__details__pic__item--large').attr({
                src: imgurl
            });
        }
    });

    /*-------------------
        Quantity change
    --------------------- */
    var proQty = $('.pro-qty');
    proQty.prepend('<span class="dec qtybtn">-</span>');
    proQty.append('<span class="inc qtybtn">+</span>');
    proQty.on('click', '.qtybtn', function () {
        var $button = $(this);
        var oldValue = $button.parent().find('input').val();
        if ($button.hasClass('inc')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            // Don't allow decrementing below zero
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        $button.parent().find('input').val(newVal);
    });

})(jQuery);