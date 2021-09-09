$(document).ready(function () {
    $(".header__menu").find(".header__menu__link").removeClass("active");
    $(".header__menu").find(".store__menu__link").addClass("active");

    var cartList = sessionStorage.getItem('cartList');
    cartList = (cartList != null) ? JSON.parse(cartList) : {};

    if (cartList && cartList.length > 0) {
        $('.shopCartCount').each(function () {
            // console.log("Local Storage ", cartList)
            $(this).find('span').text(cartList.length)
        })
    }

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
                    offStoreClone = $('#preOfficialStore').clone()

                $.each(result.data, async function (Idx, Obj) {
                    offStoreClone.find('h5').text(`${Obj.company_name}`);
                    offStoreClone.find('p').text(`${Obj.description}`);
                    offStoreClone.find('a').attr('href', `/shop-items?supplier_id=${Obj.id}`);

                    offStoreHtml += offStoreClone.html();
                })

                $('#officialStore').html(offStoreHtml);
            }
        }
    })
}