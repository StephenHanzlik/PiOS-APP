var CalculateShippingMethods = function () {
    $.blockUI({ message: $("#ajax-loading") });
    var giftBoxId = $("input#SelectedGiftBoxId").val();
    var giftBoxStyleId = $("input#SelectedGiftBoxStyleId").val();
    if (giftBoxId === "7") {
        giftBoxStyleId = 7;
    }
    $.ajax({
        type: "GET",
        url: "/Purchase/ShippingOptions",
        data: { giftBoxStyleId: giftBoxStyleId },
        cache: false,
        dataType: "json"
    })
    .done(function (rspTxt) {
        $("div#shipping-method-select").html(rspTxt);
    })
    .complete(function() {
        $.unblockUI();
    });
};

var ResetShippingCalculation = function() {
    $("div#shipping-method-select").html("<button type='button' id='calculate-shipping-button'>Calculate Shipping</button>");
    $("button#calculate-shipping-button").click(function () {
        CalculateShippingMethods();
    });
};