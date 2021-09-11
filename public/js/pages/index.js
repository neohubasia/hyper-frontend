$(document).ready(function () {
    // $(".humberger__menu__nav").find(".humberger__menu__link").removeClass("active");
    // $(".humberger__menu__nav").find(".home__menu__link").addClass("active");
    $(".header__menu").find(".header__menu__link").removeClass("active");
    $(".header__menu").find(".home__menu__link").addClass("active");

    if (Object.keys(authData).length > 0) {
        shopCartCount.call(this)
    }
    else {
        sessionStorage.removeItem('cartList')
    }

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

                getFeatureStore({ status: true })
            }
        },
        error: function (xhr) {
            console.log("Banner ", xhr)
        }
    });
}

async function getFeatureStore(data) {
    $.ajax({
        url: "/api/getOfficialStore",
        type: "GET",
        data: data,
        dataType: 'json',
        success: async function (result) {
            if (result.status == "SUCCESS" && result.data) {
                let featTitleClone = $('#preFeatureStore').find('ul:first').clone()
                let featStoreClone = $('#preFeatureStore').find('.featured__filter').clone()
                let liTitle = "", featProduct = "", liTitleTemp = [];

                $.each(result.data, async function (Idx, Obj) {

                    if (!liTitleTemp.includes(Obj.product_type_id._id)) {
                        liTitleTemp.push(Obj.product_type_id._id)

                        featTitleClone.find('li').removeAttr('class')
                        featTitleClone.find('li').attr('data-filter', `.cat-${liTitleTemp[liTitleTemp.length - 1]}`)
                        featTitleClone.find('li').text(`${Obj.product_type_id.name}`)
                        liTitle += featTitleClone.html();
                    }

                    featStoreClone.find('.mix').removeClass(`${liTitleTemp.map(catId => "cat-" + catId).join(' ')}`);
                    featStoreClone.find('.mix').addClass(`cat-${liTitleTemp.slice(-1)}`);

                    // featStoreClone.find('button:first').attr('onclick', `location.href='./shop-details/${Obj.id}'`);
                    // featStoreClone.find('button:last').attr('onclick', `addToCart('${Obj.id}', 1, this);`);

                    featStoreClone.find('a:last').attr('href', `shop-items?supplier_id=${Obj.id}`);
                    featStoreClone.find('a:last').text(`${Obj.company_name}`);
                    featProduct += featStoreClone.html();
                });

                $('#featureStore').find('ul:first').append(liTitle)
                $('#featureStore').find('.featured__filter').html(featProduct)

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

                getProductSliders({
                    'page': {
                        'limit': 6,
                        'skip': 0
                    },
                    'filter': {
                        'status': true
                    },
                    'sort': {
                        'updated_at': 1
                    }
                })
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

                let disProdClone = $('#productSliders').find('.latest-product__slider:first').clone()
                let popProdClone = $('#productSliders').find('.latest-product__slider:eq(1)').clone()
                let lttProdClone = $('#productSliders').find('.latest-product__slider:last').clone()

                let popProdSlideClone = popProdClone.find('.latest-prdouct__slider__item').clone();
                popProdSlideHtml = "", popProdHtml = "";

                let disProdSlideClone = disProdClone.find('.latest-prdouct__slider__item').clone();
                disProdSlideHtml = "", disProdHtml = "";

                let lttProdSlideClone = lttProdClone.find('.latest-prdouct__slider__item').clone();
                lttProdSlideHtml = "", lttProdHtml = "";

                $.each(result.data, async function (Idx, Obj) {
                    popProdSlideClone.find('h6').text(`${Obj.name}`)
                    popProdSlideClone.find('span').text(`${Obj.price}MMK`)
                    popProdSlideClone.find('.latest-product__item').attr('href', `/shop-details?product_id=${Obj.id}`)
                    popProdHtml += popProdSlideClone.html();

                    if (((Idx + 1) % 3) == 0) {
                        popProdSlideHtml += `<div class="latest-product__slider owl-carousel"><div class="latest-prdouct__slider__item">` + popProdHtml + `</div></div>`;
                        popProdHtml = "";
                    }
                });

                $.each(result.data, async function (Idx, Obj) {
                    disProdSlideClone.find('h6').text(`${Obj.name}`)
                    disProdSlideClone.find('span').text(`${Obj.price}MMK`)
                    disProdSlideClone.find('.latest-product__item').attr('href', `/shop-details?product_id=${Obj.id}`)
                    disProdHtml += disProdSlideClone.html();

                    if (((Idx + 1) % 3) == 0) {
                        disProdSlideHtml += `<div class="latest-product__slider owl-carousel"><div class="latest-prdouct__slider__item">` + disProdHtml + `</div></div>`;
                        disProdHtml = "";
                    }
                });

                $.each(result.data, async function (Idx, Obj) {
                    lttProdSlideClone.find('h6').text(`${Obj.name}`)
                    lttProdSlideClone.find('span').text(`${Obj.price}MMK`)
                    lttProdSlideClone.find('.latest-product__item').attr('href', `/shop-details?product_id=${Obj.id}`)
                    lttProdHtml += lttProdSlideClone.html();

                    if (((Idx + 1) % 3) == 0) {
                        lttProdSlideHtml += `<div class="latest-product__slider owl-carousel"><div class="latest-prdouct__slider__item">` + lttProdHtml + `</div></div>`;
                        lttProdHtml = "";
                    }
                });

                $('#productSliders').find('.latest-product__slider:first').html(popProdSlideHtml)
                $('#productSliders').find('.latest-product__slider:nth-child(2)').html(disProdSlideHtml)
                $('#productSliders').find('.latest-product__slider:last').html(lttProdSlideHtml)


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