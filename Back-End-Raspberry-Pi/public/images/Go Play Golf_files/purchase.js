$(document).ready(function () {
    ShowCardTypeSection();
    InitializeHeaderEvents();
    InitializeSelectionEvents();
    InitializeFieldHelpers();
    InitializeSubmitHandling();
    InitializeDeliverySection();
    InitializePreFilledValues();
});

var InitializeHeaderEvents = function() {
    $("div#card-type-header").click(function() {
        ShowCardTypeSection();
    });
    $("div#card-option-header").click(function() {
        ShowCardOptionSection();
    });
    $("div#card-value-header").click(function() {
        ShowCardValueSection();
    });
    $("div#delivery-header").click(function() {
        ShowDeliverySection();
    });
};

var InitializeSelectionEvents = function() {
    $("#card-type-select li").click(function (e) {
        SetCardType(e);
        CardTypeComplete();
    });
    $("#gift-box-section li").click(function (e) {
        SetGiftBoxOption(e);
    });
    $("#card-style-section li").click(function(e) {
        SetCardStyleOption(e);
    });
    $("button#calculate-shipping-button").click(function () {
        CalculateShippingMethods();
    });
    $("button#card-value-button").click(function () {
        SetCardValue();
    });
    $("button#immediate-delivery").click(function() {
        SetDeliveryImmediate(true);
    });
    $("button#future-delivery").click(function() {
        SetDeliveryImmediate(false);
    });
    $("button#delivery-date-select-button").click(function() {
        SetDeliveryDate(false);
    });
    $("#email-tab-selector").click(function() {
        DisablePrintGiftCardValues();
        EnableEmailGiftCardValues();
    });
    $("#print-tab-selector").click(function() {
        DisableEmailGiftCardValues();
        EnablePrintGiftCardValues();
    });
};

var InitializePreFilledValues = function () {
    if (window.location.href.toLowerCase().indexOf("editgiftcard") > -1) {
        $(".sectionbar").addClass("alt");
        $(".number").addClass("alt");
        $("div.selected-card-type").show();
        if ($("input#CardType").val() === "Ecard") {
            $("#selected-type").text("Digital");
        }
        else if ($("input#CardType").val() === "Plastic") {
            $("#selected-type").text("Physical");
        }
        else if ($("input#CardType").val() === "EcardP") {
            $("#selected-type").text("Digital & Physical");
        }
        $("div.selected-option-type").show();
        if ($("input#CardStyleDisplay").val().length > 0) {
            $("#selected-option").text($("input#CardStyleCategoryDisplay").val());
            $("#selected-style").text($("input#CardStyleDisplay").val());
        } else {
            $("#selected-option").text($("input#GiftBoxDisplay").val());
            $("#selected-style").text($("input#GiftBoxStyleDisplay").val());
        }
        $("div.selected-card-value").show();
        $("#selected-value").text(FormatToCurrency(parseFloat($("input#card-value-input").val())));
        $("div.selected-delivery-date").show();
        var deliveryImmediately = $("input#DeliveryImmediately").val() === "True";
        if (deliveryImmediately) {
            $("#selected-delivery").text("Immediately");
        } else {
            var date = $("#DesiredDeliveryDate").val();
            $("#selected-delivery").text(date);
        }
    }
};

var InitializeSubmitHandling = function() {
    $("input.save-button").click(function (e) {
        e.stopPropagation();
        e.preventDefault();
        var cardTypeName = $(e.currentTarget).attr("data-name");
        $("input#Command").val(cardTypeName);
        ValidateGiftCard();
        if ($(".error").length < 1) {
            $("#cardForm").submit();
        } else {
            return false;
        }
        return true;
    });
};

var InitializeFieldHelpers = function() {
    $(".gpg-help").tooltip();
};

var InitializeDeliverySection = function() {
    var earliestDate = DateAdd(new Date(), "day", 1);
    var latestDate = DateAdd(earliestDate, "year", 1);
    $("#DesiredDeliveryDate").datepicker({ defaultDate: earliestDate, minDate: earliestDate, maxDate: latestDate });
    $("#DesiredDeliveryDate").datepicker("setDate", earliestDate);
    $("#digital-card-delivery-tabs").tabs();
};

var ShowCardTypeSection = function() {
    $("#card-option-select").slideUp();
    $("#card-value-select").slideUp();
    $("#delivery-payment-select").slideUp();
    $("#card-type-select").slideDown({ complete: ScrollToCardType });
    $("#card-type-number").addClass("alt");
    $("#card-type-header").addClass("alt");
};

var ShowCardOptionSection = function (comboSecondRun) {
    if ($("input#CardType").val() === undefined || $("input#CardType").val() === null || $("input#CardType").val() === "") {
        return;
    }
    $("#card-value-select").slideUp();
    $("#delivery-payment-select").slideUp();
    $("#card-type-select").slideUp();
    $("#card-option-select").slideDown({ complete: ScrollToCardOption });
    if (comboSecondRun === true) {
        $("#gift-box-section").slideUp();
        $("#card-style-section").slideDown({ complete: ScrollToCardOption });
    }
    else if ($("input#CardType").val() === "Plastic" || $("input#CardType").val() === "EcardP") {
        $("#gift-box-section").show();
        $("#card-style-section").hide();
    } else if ($("input#CardType").val() === "Ecard") {
        $("#gift-box-section").hide();
        $("#card-style-section").show();
    }
    $("#card-options-number").addClass("alt");
    $("#card-option-header").addClass("alt");
};

var ShowCardValueSection = function () {
    var canShowCardValue = false;
    if ($("input#CardType").val().length > 0) {
        if ($("input#CardType").val() === "Ecard") {
            canShowCardValue = true;
        } else if (($("input#CardType").val() === "Plastic" || $("input#CardType").val() === "EcardP")) {
            if (IsGiftBoxStyledByName(($("#selected-option").text()))) {
                if ($("input#SelectedGiftBoxStyleId").val() > 0) {
                    canShowCardValue = true;
                }
            } else {
                canShowCardValue = true;
            }
        }
    }
    if (canShowCardValue) {
        $("#delivery-payment-select").slideUp();
        $("#card-type-select").slideUp();
        $("#card-option-select").slideUp();
        $("#card-value-select").slideDown({ complete: ScrollToCardValue });
        $("#card-value-number").addClass("alt");
        $("#card-value-header").addClass("alt");
    }
};

var ShowDeliverySection = function () {
    var canShowDelivery = false;
    if ($("input#CardType").val().length > 0) {
        if ($("input#CardType").val() === "Ecard") {
            canShowDelivery = true;
        } else if (($("input#CardType").val() === "Plastic" || $("input#CardType").val() === "EcardP")) {
            if (IsGiftBoxStyledByName(($("#selected-option").text()))) {
                if ($("input#SelectedGiftBoxStyleId").val() > 0) {
                    canShowDelivery = true;
                }
            } else {
                canShowDelivery = true;
            }
        }
    }
    if ($("input#CardType").val() === "Ecard" || $("input#CardType").val() === "EcardP") {
        $("div.digital-card-required").show();
        $("div#no-tabs").hide();
        $("div#digital-card-delivery-tabs").show();
        $("div.all-card-required").hide();
        $("div.plastic-card-required").hide();
        $("div#finish-add-card").hide();
        $("h3#their-email-address span.required-indicator").show();
        $("h3#confirm-their-email-address span.required-indicator").show();
    }
    else {
        DisablePrintGiftCardValues();
        DisableEmailGiftCardValues();
        SetDeliveryImmediate(true);
        $("div.plastic-card-required").show();
        $("div.all-card-required").show();
        $("div#no-tabs").show();
        $("div#digital-card-delivery-tabs").hide();
        $("div.digital-card-required").hide();
        $("div#finish-add-card").show();
        $("h3#their-email-address span.required-indicator").hide();
        $("h3#confirm-their-email-address span.required-indicator").hide();
    }
    if (canShowDelivery) {
        $("#card-type-select").slideUp();
        $("#card-option-select").slideUp();
        $("#card-value-select").slideUp();
        $("#delivery-payment-select").slideDown({ complete: ScrollToDelivery });
        $("#delivery-number").addClass("alt");
        $("#delivery-header").addClass("alt");
    }
};

var CardTypeComplete = function () {
    ClearCardOption();
    ShowCardOptionSection();
    SetProgressBar(2);
};

var CardOptionComplete = function () {
    ShowCardValueSection();
    $("div#card-style-category-select").slideDown();
    $("div#card-style-select").slideUp();
    $("div.gift-box-select").slideDown();
    $("div.gift-box-style-select").slideUp();
    SetProgressBar(3);
};

var CardValueComplete = function() {
    ShowDeliverySection();
    SetProgressBar(4);
};

var DeliveryComplete = function() {
    SetProgressBar(5);
};

var SetCardType = function (e) {
    $("div.selected-card-type").show();
    var cardTypeName = $(e.currentTarget).attr("data-name");
    var cardTypeValue = $(e.currentTarget).attr("data-value");
    $("#selected-type").text(cardTypeName);
    $("input#CardType").val(cardTypeValue);
    $("input#SelectedGiftBoxId").val(0);
    $("input#SelectedGiftBoxStyleId").val(0);
};

var SetCardStyleOption = function(e) {
    ResetShippingCalculation();
    $("div.selected-option-type").show();
    var cardStyleCategoryId = $(e.currentTarget).attr("data-id");
    var cardStyleCategoryName = $(e.currentTarget).attr("data-name");
    $("#selected-option").text(cardStyleCategoryName);
    $("#selected-style").text("");
    if ($("input#CardType").val() !== "EcardP") {
        $("input#SelectedGiftBoxStyleId").val(0);
        $("input#SelectedGiftBoxId").val(0);
        $("input#SelectedCardStyleId").val(0);
    }
    if (cardStyleCategoryName === undefined || cardStyleCategoryName === null || cardStyleCategoryName === "") {
        ClearCardOption();
    }
    if (IsCardCategoryStyledByName(cardStyleCategoryName)) {
        GetCardStyles(cardStyleCategoryId);
    } else {
        CardOptionComplete();
    }
};

var SetGiftBoxOption = function (e) {
    ResetShippingCalculation();
    $("div.selected-option-type").show();
    var giftBoxId = $(e.currentTarget).attr("data-id");
    var giftBoxName = $(e.currentTarget).attr("data-name");
    $("#selected-option").text(giftBoxName);
    $("#selected-style").text("");
    $("input#SelectedGiftBoxStyleId").val(0);
    $("input#SelectedCardStyleId").val(0);
    $("input#SelectedGiftBoxId").val(giftBoxId);
    // Set Style For Shipping Purposes If Standard Box.
    if (giftBoxId === "7") {
        $("input#SelectedGiftBoxStyleId").val(7);
    }
    if (giftBoxName === undefined || giftBoxName === null || giftBoxName === "") {
        ClearCardOption();
    }
    if (IsGiftBoxStyledByName(giftBoxName)) {
        GetGiftBoxStyles(giftBoxId);
    } else {
        if ($("input#CardType").val() === "EcardP") {
            ShowCardOptionSection(true);
        } else {
            CardOptionComplete();
        }
    }
};

var ClearCardOption = function() {
    $("#selected-style").text("");
    $("div.selected-option-type").show();
    $("#selected-option").text("N/A");
};

var SetGiftBoxStyle = function (e) {
    var giftBoxStyleId = $(e.currentTarget).attr("data-id");
    var giftBoxStyleName = $(e.currentTarget).attr("data-name");
    $("input#SelectedGiftBoxStyleId").val(giftBoxStyleId);
    $("#selected-style").text(giftBoxStyleName);
    // If They Selected Combo, Proceed To Card Style.
    if ($("input#CardType").val() === "EcardP") {
        ShowCardOptionSection(true);
    } else {
        CardOptionComplete();
    }
};

var SetCardStyle = function(e) {
    var cardStyleId = $(e.currentTarget).attr("data-id");
    var cardStyleName = $(e.currentTarget).attr("data-name");
    $("input#SelectedCardStyleId").val(cardStyleId);
    $("#selected-style").text(cardStyleName);
    CardOptionComplete();
};

var SetCardValue = function () {
    var cardAmount = $("#card-value-input");
    if (cardAmount.val() % 25 !== 0) {
        cardAmount.after(GenerateError("CardAmount", "You must select a value that is a multiple of $25."));
    } else {
        $("div.selected-card-value").show();
        var value = $("#card-value-input").val();
        $("#selected-value").text(FormatToCurrency(parseFloat(value)));
        CardValueComplete();
    }
};

var SetDeliveryImmediate = function (deliverImmediately) {
    $("div.selected-delivery-date").show();
    if (deliverImmediately === true) {
        $("input#DeliveryImmediately").val("True");
        $("div#digital-delivery-section").slideUp();
        $("#selected-delivery").text("Immediately");
        $("div.all-card-required").slideDown();
        if ($("input#CardType").val() === "Ecard") {
            $("div.plastic-card-required").hide();
        } else {
            $("div.plastic-card-required").show();
        }
        $("div#finish-add-card").show();
    } else {
        $("input#DeliveryImmediately").val("False");
        $("div#delivery-option-step").hide();
        $("div#FutureDate").show();
    }
};

var SetDeliveryDate = function() {
    var date = $("#DesiredDeliveryDate").val();
    $("div#digital-delivery-section").slideUp();
    $("#selected-delivery").text(date);
    $("div.all-card-required").slideDown({complete: function() {
            $("div#delivery-option-step").show();
        }
    });
    $("div#FutureDate").hide();
    if ($("input#CardType").val() === "Ecard") {
        $("div.plastic-card-required").hide();
    } else {
        $("div.plastic-card-required").show();
    }
    $("div#finish-add-card").show();
};

var DisablePrintGiftCardValues = function () {
    var disableContainer = $("#print-gift-card-tab");
    var recipientName = $(disableContainer).find("#RecipientName");
    var purchaseName = $(disableContainer).find("#PurchaserName");
    var personalMessage = $(disableContainer).find("#PersonalMessage");
    var email = $(disableContainer).find("#RecipientEmail");
    var confirmEmail = $(disableContainer).find("#ConfirmRecipientEmail");
    $(recipientName).attr("disabled", "disabled");
    $(purchaseName).attr("disabled", "disabled");
    $(personalMessage).attr("disabled", "disabled");
    $(email).attr("disabled", "disabled");
    $(confirmEmail).attr("disabled", "disabled");
};

var EnablePrintGiftCardValues = function () {
    var enableContainer = $("#print-gift-card-tab");
    var recipientName = $(enableContainer).find("#RecipientName");
    var purchaseName = $(enableContainer).find("#PurchaserName");
    var personalMessage = $(enableContainer).find("#PersonalMessage");
    var email = $(enableContainer).find("#RecipientEmail");
    var confirmEmail = $(enableContainer).find("#ConfirmRecipientEmail");
    $(recipientName).removeAttr("disabled");
    $(purchaseName).removeAttr("disabled");
    $(personalMessage).removeAttr("disabled");
    $(email).removeAttr("disabled");
    $(confirmEmail).removeAttr("disabled");
};

var DisableEmailGiftCardValues = function () {
    var container = $("#email-gift-card-tab");
    var recipientName = $(container).find("#RecipientName");
    var purchaseName = $(container).find("#PurchaserName");
    var personalMessage = $(container).find("#PersonalMessage");
    var email = $(container).find("#RecipientEmail");
    var confirmEmail = $(container).find("#ConfirmRecipientEmail");
    $(recipientName).attr("disabled", "disabled");
    $(purchaseName).attr("disabled", "disabled");
    $(personalMessage).attr("disabled", "disabled");
    $(email).attr("disabled", "disabled");
    $(confirmEmail).attr("disabled", "disabled");
};

var EnableEmailGiftCardValues = function () {
    var enableContainer = $("#email-gift-card-tab");
    var recipientName = $(enableContainer).find("#RecipientName");
    var purchaseName = $(enableContainer).find("#PurchaserName");
    var personalMessage = $(enableContainer).find("#PersonalMessage");
    var email = $(enableContainer).find("#RecipientEmail");
    var confirmEmail = $(enableContainer).find("#ConfirmRecipientEmail");
    $(recipientName).removeAttr("disabled");
    $(purchaseName).removeAttr("disabled");
    $(personalMessage).removeAttr("disabled");
    $(email).removeAttr("disabled");
    $(confirmEmail).removeAttr("disabled");
};

var ScrollToCardType = function () {
    var hash = "#card-type";
    $("html, body").animate({
        scrollTop: $(hash).offset().top
    }, 1000, null);
};

var ScrollToCardOption = function() {
    var hash = "#card-option";
    $("html, body").animate({
        scrollTop: $(hash).offset().top
    }, 1000, null);
};

var ScrollToCardValue = function () {
    var hash = "#card-value";
    $("html, body").animate({
        scrollTop: $(hash).offset().top
    }, 1000, null);
};

var ScrollToDelivery = function () {
    var hash = "#delivery";
    $("html, body").animate({
        scrollTop: $(hash).offset().top
    }, 1000, null);
};

var FormatToCurrency = function(n)
{
    return "$" + n.toFixed(2).replace(/./g, function(c, i, a) {
        return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
    });  
};

var DateAdd = function(date, interval, units) {
    var ret = new Date(date);
    switch (interval.toLowerCase()) {
        case "year": ret.setFullYear(ret.getFullYear() + units); break;
        case "quarter": ret.setMonth(ret.getMonth() + 3 * units); break;
        case "month": ret.setMonth(ret.getMonth() + units); break;
        case "week": ret.setDate(ret.getDate() + 7 * units); break;
        case "day": ret.setDate(ret.getDate() + units); break;
        case "hour": ret.setTime(ret.getTime() + units * 3600000); break;
        case "minute": ret.setTime(ret.getTime() + units * 60000); break;
        case "second": ret.setTime(ret.getTime() + units * 1000); break;
        default: ret = undefined; break;
    }
    return ret;
};