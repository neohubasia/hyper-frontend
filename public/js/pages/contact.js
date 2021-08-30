$(document).ready(function () {
    $(".header__menu").find(".header__menu__link").removeClass("active");
    $(".header__menu").find("#contact__menu__link").addClass("active");

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
                $("#breadCrumb").safeUrl({
                    changeUrl: baseUrl + result.data[0].images[0],
                    originUrl: $("#breadCrumb").data('setbg')
                });
            }
        },
        error: function (xhr) {
           console.log("Banner ", xhr)
        }
    });
}