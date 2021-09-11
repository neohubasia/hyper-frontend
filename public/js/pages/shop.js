$(document).ready(function () {
    $(".header__menu").find(".header__menu__link").removeClass("active");
    $(".header__menu").find(".shop__menu__link").addClass("active");

    var cartList = sessionStorage.getItem('cartList');
    cartList = (cartList != null) ? JSON.parse(cartList) : {};

    if (cartList && cartList.length > 0) {
        $('.shopCartCount').each(function () {
            // console.log("Local Storage ", cartList)
            $(this).find('span').text(cartList.length)
        })
    }

    getFilterProduct({
        page: {
            limit: 60,
            skip: 0
        },
        filter: {
            status: true
        },
        sort: {
            'updated_at': -1
        }
    })
    getBannerOne({ no_of_image: 1 });
});

function getFilterProduct(data) {
    $('#filterPagings').pagination({
        dataSource: function (done) {
            $.ajax({
                url: "/api/getProduct",
                type: "GET",
                data: data,
                dataType: 'json',
                success: async function (result) {
                    if (result.status == "SUCCESS" && result.data) {
                        $('#countProduct').text(result.data.length);
                        done(result.data);
                    }
                },
                error: function (xhr) {
                    console.log("Product Filter ", xhr)
                }
            })
        },
        locator: 'items',
        pageSize: 9,
        showPageNumbers: true,
        showPrevious: true,
        showNext: true,
        showNavigator: true,
        className: 'paginationjs-theme-blue paginationjs-big',
        ajax: {
            beforeSend: function () {
                $('#filterProduct').html('Loading data from our source ...');
            }
        },
        callback: function (response, pagination) {
            window.console && console.log(22, response, pagination);
            let filtProdClone = $('#preFilterProduct').clone(), filtProdHtml = "";

            $.each(response, async function (Idx, Obj) {
                filtProdClone.find('a:last').text(`${Obj.name}`)
                filtProdClone.find('button:first').attr('href', `shop-details?product_id=${Obj.id}`)
                filtProdClone.find('button:last').attr('onclick', `addToCart('${Obj.id}', 1, this);`);
                filtProdClone.find('h5').text(`${Obj.price}MMK`)
                filtProdHtml += filtProdClone.html();
            });

            $('#filterProduct').html(filtProdHtml);
        }
    })
}

function getBannerOne(data) {
    $.ajax({
        url: "/api/getBanner",
        type: "GET",
        data: data,
        dataType: 'json',
        success: function (result) {
            if (result.status == "SUCCESS" && result.data) {
                $("#breadCrumb").safeUrl({
                    changeUrl: baseUrl + result.data[0].images[0],
                    originUrl: $("#breadCrumb").data('setbg')
                });
            }

            getOfficailStore({ status: true })
        },
        error: function (xhr) {
            console.log("Banner ", xhr)
        }
    });
}

function getOfficailStore(data) {
    $.ajax({
        url: "/api/getOfficialStore",
        type: "GET",
        data: data,
        dataType: 'json',
        success: async function (result) {
            if (result.status == "SUCCESS" && result.data) {

                let offStoreHtml = "",
                    offStoreClone = $('#officialStore').find('.officialStoreList:first').clone()

                $.each(result.data, async function (Idx, Obj) {
                    offStoreClone.find('a').text(`${Obj.company_name}`);
                    offStoreClone.find('a').attr('href', `/shop-items?supplier_id=${Obj.id}`);

                    offStoreHtml += offStoreClone.html();
                })

                $('#officialStore').find('.officialStoreList:last').html(offStoreHtml);
            }

            getDiscountProduct({
                page: {
                    'limit': 12,
                    'skip': 0
                },
                sort: {
                    'updated_at': -1
                },
                filter: {
                    'status': true
                },
                can_discount: true
            })
        }
    })
}

function getDiscountProduct(data) {
    $.ajax({
        url: "/api/getProduct",
        type: "GET",
        data: data,
        dataType: 'json',
        success: async function (result) {
            if (result.status == "SUCCESS" && result.data) {

                let discProdHtml = "",
                    discProdClone = $('#discountProduct').find('.product__discount__slider').clone()

                $.each(result.data, async function (Idx, Obj) {
                    discProdClone.find('a:last').text(`${Obj.name}`)
                    // discProdClone.find('span:first').text(`${Obj.category_id.name}`)
                    discProdClone.find('.product__item__price').html(`${Obj.price}MMK <span>${Obj.price}MMK</span>`)

                    discProdHtml += discProdClone.html();
                });

                $('#discountProduct').find('.product__discount__slider').html(discProdHtml)

                /*-----------------------------
                    Product Discount Slider
                -------------------------------*/
                $(".product__discount__slider").owlCarousel({
                    loop: true,
                    margin: 0,
                    items: 3,
                    dots: true,
                    smartSpeed: 1200,
                    autoHeight: false,
                    autoplay: true,
                    responsive: {

                        320: {
                            items: 1,
                        },

                        480: {
                            items: 2,
                        },

                        768: {
                            items: 2,
                        },

                        992: {
                            items: 3,
                        }
                    }
                });

            }

            getPopProductSliders({
                page: {
                    'limit': 12,
                    'skip': 0
                },
                filter: {
                    'status': true
                },
                sort: {
                    'updated_at': -1
                }
            })
        },
        error: function (xhr) {
            console.log("Product Slider ", xhr)
        }
    });
}

function getPopProductSliders(data) {
    $.ajax({
        url: "/api/getProduct",
        type: "GET",
        data: data,
        dataType: 'json',
        success: async function (result) {
            if (result.status == "SUCCESS" && result.data) {

                let lttProdClone = $('#popProductSliders').find('.latest-product__slider:first').clone()

                let lttProdSlideClone = lttProdClone.find('.latest-prdouct__slider__item').clone();
                lttProdSlideHtml = "", lttProdHtml = "";

                $.each(result.data, async function (Idx, Obj) {
                    lttProdSlideClone.find('h6').text(`${Obj.name}`)
                    lttProdSlideClone.find('span').text(`${Obj.price}MMK`)
                    lttProdSlideClone.find('.latest-product__item').attr('href', `/shop-details?product_id=${Obj.id}`)
                    lttProdHtml += lttProdSlideClone.html();

                    if (((Idx + 1) % 4) == 0) {
                        lttProdSlideHtml += `<div class="latest-product__slider owl-carousel"><div class="latest-prdouct__slider__item">` + lttProdHtml + `</div></div>`;
                        lttProdHtml = "";
                    }
                });

                $('#popProductSliders').find('.latest-product__slider:first').html(lttProdSlideHtml)

                $('#popProductSliders').find(".latest-product__slider").owlCarousel({
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
            getlttProductSliders({
                page: {
                    'limit': 12,
                    'skip': 0
                },
                filter: {
                    'status': true
                },
                sort: {
                    'updated_at': -1
                }
            })
        },
        error: function (xhr) {
            console.log("Product Slider ", xhr)
        }
    });
}

function getlttProductSliders(data) {
    $.ajax({
        url: "/api/getProduct",
        type: "GET",
        data: data,
        dataType: 'json',
        success: async function (result) {
            if (result.status == "SUCCESS" && result.data) {

                let lttProdClone = $('#lttProductSliders').find('.latest-product__slider:first').clone()

                let lttProdSlideClone = lttProdClone.find('.latest-prdouct__slider__item').clone();
                lttProdSlideHtml = "", lttProdHtml = "";

                $.each(result.data, async function (Idx, Obj) {
                    lttProdSlideClone.find('h6').text(`${Obj.name}`)
                    lttProdSlideClone.find('span').text(`${Obj.price}MMK`)
                    lttProdSlideClone.find('.latest-product__item').attr('href', `/shop-details?product_id=${Obj.id}`)
                    lttProdHtml += lttProdSlideClone.html();

                    if (((Idx + 1) % 4) == 0) {
                        lttProdSlideHtml += `<div class="latest-product__slider owl-carousel"><div class="latest-prdouct__slider__item">` + lttProdHtml + `</div></div>`;
                        lttProdHtml = "";
                    }
                });

                $('#lttProductSliders').find('.latest-product__slider:first').html(lttProdSlideHtml)

                $('#lttProductSliders').find(".latest-product__slider").owlCarousel({
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

