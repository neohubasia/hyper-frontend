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

    $(".shoping__cart__table").on('click', '.btn-delete-item', function (e) {
        const thisBtn = $(this);
        const cartId = thisBtn.closest('tr').find('input[type=hidden]').val();

        $.ajax({
            url: '/api/deleteCart?_id=' + cartId,
            type: 'DELETE',
            contentType: 'application/json',
            dataType: 'json',
            success: function (result) {
                console.log(result)
                if (result.status == "SUCCESS") {
                    thisBtn.closest('tr').remove();
                    alertWarning('#msgAlert', 'alert-success', "SUCCESS", "Your item is successfully removed")
                    calculateTotal(".shoping__cart__total")
                }
                else {
                    swalWarning({
                        icon: "warning",
                        title: "Warning Message",
                        text: "Sorry, You can't remove item from cart",
                    });
                }

            },
            error: function (result) {
                console.log('An error occurred.');
                console.log(result);
            }
        });
    });

    $('#updateCartForm').submit(function (e) {
        e.preventDefault();

        console.log($(this).serialize())
        $.ajax({
            url: $(this).attr('action') + "?customer_id=" + authData._id || authData.id,
            type: $(this).attr('method'),
            data: $(this).serialize(),
            success: function (data) {
                if (data.status == "SUCCESS") {
                    alertWarning('#msgAlert', 'alert-success', "SUCCESS", "Your cart is successfully updated")
                }
                else {
                    alertWarning('#msgAlert', 'alert-warning', "FAIL", "Sorry your cart can't update")
                }

            },
            error: function (data) {
                console.log('An error occurred.');
                console.log(data);
            },
        });
    });

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