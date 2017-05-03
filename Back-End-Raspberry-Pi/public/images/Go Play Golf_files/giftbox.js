var GetGiftBoxStyles = function (id) {
    $.blockUI({ message: $("#ajax-loading") });
    $.ajax({
            type: "GET",
            url: "/Purchase/GiftBoxStyles",
            data: { giftBoxId: id },
            cache: false,
            dataType: "json"
    })
    .done(function(rspTxt) {
        $("div.gift-box-style-select").html(rspTxt);
        $("div.gift-box-select").slideUp();
        $("div.gift-box-style-select").slideDown();
        $("div.gift-box-style-select li").click(function (e) {
            SetGiftBoxStyle(e);
        });
    })
    .complete(function() {
        $.unblockUI();
        ScrollToCardOption();
    });
};

var IsGiftBoxStyledByEvent = function(e) {
    if (e.currentTarget.children[0].innerText.indexOf("Deluxe") !== -1 || e.currentTarget.children[0].innerText.indexOf("Premium") !== -1 || name.indexOf("Essentials") !== -1) {
        return true;
    }
    return false;
};

var IsGiftBoxStyledByName = function(name) {
    if (name !== undefined && name !== null && name.length > 0 && (name.indexOf("Deluxe") !== -1 || name.indexOf("Premium") !== -1 || name.indexOf("Essentials") !== -1)) {
        return true;
    }
    return false;
};