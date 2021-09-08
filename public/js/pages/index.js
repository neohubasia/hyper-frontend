$(document).ready(function () {
    // $(".humberger__menu__nav").find(".humberger__menu__link").removeClass("active");
    // $(".humberger__menu__nav").find(".home__menu__link").addClass("active");
    $(".header__menu").find(".header__menu__link").removeClass("active");
    $(".header__menu").find(".home__menu__link").addClass("active");

    commonProductCategory(true)
    getBannerOne({ no_of_image: 1 });
});

function getBannerOne(data) {
    $.ajax({
        url: "/api/getBanner",
        type: "GET",
        data: data,
        dataType: 'json',
        success: function (result) {
            if (result.status == "SUCCESS" && result.data) {
                $("#homeBanner-1").safeUrl({
                    changeUrl: baseUrl + result.data[0].images[0],
                    originUrl: $("#homeBanner-1").data('setbg')
                });
                getBannerTwo({ no_of_image: 2 });
            }

        },
        error: function (xhr) {
            console.log("Banner ", xhr)
        }
    });
}

async function getBannerTwo(data) {
    $.ajax({
        url: "/api/getBanner",
        type: "GET",
        data: data,
        dataType: 'json',
        success: async function (result) {
            if (result.status == "SUCCESS" && result.data) {
                let bannerHtml = "";
                let bannerClone = $("#homeBanner-2").find(".holdBanner").clone();

                $.each(result.data[0].images, async function (imgIdx, imgUrl) {
                    bannerClone.find(".imgBanner").attr("src", baseUrl + imgUrl);
                    bannerHtml += bannerClone.html();
                });

                $("#homeBanner-2").find(".holdBanner").html(bannerHtml).removeClass('d-none')

                getFeatureProduct({ status: true })
            }
        },
        error: function (xhr) {
            console.log("Banner ", xhr)
        }
    });
}

async function getFeatureProduct(data) {
    $.ajax({
        url: "/api/getProduct",
        type: "GET",
        data: data,
        dataType: 'json',
        success: async function (result) {
            if (result.status == "SUCCESS" && result.data) {
                let featTitleClone = $('#featureProduct').find('ul:first').clone()
                let featProductClone = $('#featureProduct').find('.featured__filter').clone()
                let liTitle = "", featProduct = "";

                // let  test = ['vegetables', 'fresh-meat']

                $.each(result.data, async function (Idx, Obj) {
                    featTitleClone.find('li').attr('data-filter', `.cat-${Idx}`)
                    featTitleClone.find('li').removeAttr('class')
                    featTitleClone.find('li').text(`${Obj.category_id.name}`)
                    liTitle += featTitleClone.html();

                    featProductClone.find('.mix').addClass(`cat-${Idx}`);
                    featProductClone.find('.mix').removeClass(`cat-${--Idx}`);
                    featProductClone.find('a:last').attr('href', `/shop-details?product_id=${Obj.id}`);
                    featProductClone.find('a:last').text(`${Obj.name}`);
                    featProductClone.find('h5').text(`${Obj.price}MMK`);
                    featProduct += featProductClone.html();
                });

                $('#featureProduct').find('ul:first').append(liTitle)
                $('#featureProduct').find('.featured__filter').html(featProduct)

                /*------------------
                    Gallery filter
                --------------------*/
                $('.featured__controls li').on('click', function () {
                    $('.featured__controls li').removeClass('active');
                    $(this).addClass('active');
                });

                if ($('.featured__filter').length > 0) {
                    var containerEl = document.querySelector('.featured__filter');
                    var mixer = mixitup(containerEl);
                }

                getProductSliders({ status: true })
            }
        },
        error: function (xhr) {
            console.log("Feature Product ", xhr)
        }
    });
}

function getProductSliders(data) {
    $.ajax({
        url: "/api/getProduct",
        type: "GET",
        data: data,
        dataType: 'json',
        success: async function (result) {
            if (result.status == "SUCCESS" && result.data) {

                let lttProdClone = $('#productSliders').find('.latest-product__slider:first').clone()
                let topProdClone = $('#productSliders').find('.latest-product__slider:eq(1)').clone()
                let rvwProdClone = $('#productSliders').find('.latest-product__slider:last').clone()

                let lttProdSlideClone = lttProdClone.find('.latest-prdouct__slider__item').clone();
                lttProdSlideHtml = "", lttProdHtml = "";

                let topProdSlideClone = topProdClone.find('.latest-prdouct__slider__item').clone();
                topProdSlideHtml = "", topProdHtml = "";

                let rvwProdSlideClone = rvwProdClone.find('.latest-prdouct__slider__item').clone();
                rvwProdSlideHtml = "", rvwProdHtml = "";

                $.each(result.data, async function (Idx, Obj) {
                    lttProdSlideClone.find('h6').text(`${Obj.name}`)
                    lttProdSlideClone.find('span').text(`${Obj.price}MMK`)
                    lttProdHtml += lttProdSlideClone.html();

                    if (((Idx + 1) % 3) == 0) {
                        lttProdSlideHtml += `<div class="latest-product__slider owl-carousel"><div class="latest-prdouct__slider__item">` + lttProdHtml + `</div></div>`;
                        lttProdHtml = "";
                    }
                });

                $.each(result.data, async function (Idx, Obj) {
                    topProdSlideClone.find('h6').text(`${Obj.name}`)
                    topProdSlideClone.find('span').text(`${Obj.price}MMK`)
                    topProdHtml += topProdSlideClone.html();

                    if (((Idx + 1) % 3) == 0) {
                        topProdSlideHtml += `<div class="latest-product__slider owl-carousel"><div class="latest-prdouct__slider__item">` + topProdHtml + `</div></div>`;
                        topProdHtml = "";
                    }
                });

                $.each(result.data, async function (Idx, Obj) {
                    rvwProdSlideClone.find('h6').text(`${Obj.name}`)
                    rvwProdSlideClone.find('span').text(`${Obj.price}MMK`)
                    rvwProdHtml += rvwProdSlideClone.html();

                    if (((Idx + 1) % 3) == 0) {
                        rvwProdSlideHtml += `<div class="latest-product__slider owl-carousel"><div class="latest-prdouct__slider__item">` + rvwProdHtml + `</div></div>`;
                        rvwProdHtml = "";
                    }
                });

                $('#productSliders').find('.latest-product__slider:first').html(lttProdSlideHtml)
                $('#productSliders').find('.latest-product__slider:nth-child(2)').html(topProdSlideHtml)
                $('#productSliders').find('.latest-product__slider:last').html(rvwProdSlideHtml)


                $(".latest-product__slider").owlCarousel({
                    loop: true,
                    margin: 0,
                    items: 1,
                    dots: false,
                    nav: true,
                    navText: ["<span class='fa fa-angle-left'><span/>", "<span class='fa fa-angle-right'><span/>"],
                    smartSpeed: 1200,
                    autoHeight: false,
                    autoplay: true
                });
            }
        },
        error: function (xhr) {
            console.log("Product Slider ", xhr)
        }
    });
}