var GetCardStyles = function (id) {
    $.blockUI({ message: $("#ajax-loading") });
    $.ajax({
        type: "GET",
        url: "/Purchase/CardStyles",
        data: { cardStyleCategoryId: id },
        cache: false,
        dataType: "json"
    })
    .done(function (rspTxt) {
        $("div#card-style-select").html(rspTxt);
        $("div#card-style-category-select").slideUp();
        $("div#card-style-select").slideDown();
        $("div#card-style-select li").click(function (e) {
            SetCardStyle(e);
        });
    })
    .complete(function () {
        $.unblockUI();
        ScrollToCardOption();
    });
};

var IsCardCategoryStyledByName = function (name) {
    if (name !== undefined && name !== null && name.length > 0) {
        return true;
    }
    return false;
};