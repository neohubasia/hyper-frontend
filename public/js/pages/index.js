$(document).ready(function () {
    // $(".humberger__menu__nav").find(".humberger__menu__link").removeClass("active");
    // $(".humberger__menu__nav").find(".home__menu__link").addClass("active");
    $(".header__menu").find(".header__menu__link").removeClass("active");
    $(".header__menu").find(".home__menu__link").addClass("active");

    getBannerOne({ no_of_image: 1 });
    getBannerTwo({ no_of_image: 2 })
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
            }
        },
        error: function (xhr) {
           console.log("Banner ", xhr)
        }
    });
}