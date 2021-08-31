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
                    bannerClone.find(".imgBanner").attr("src",  baseUrl + imgUrl);
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
            }
        },
        error: function (xhr) {
           console.log("Feature Product ", xhr)
        }
    });
}