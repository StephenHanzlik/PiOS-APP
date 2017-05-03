var ValidateGiftCard = function () {
    $(".error").remove();
    ValidateCommon();
    if ($("input#CardType").val() === "Ecard") {
        ValidateEcard();
    } else if ($("input#CardType").val() === "EcardP") {
        ValidateEcard();
        ValidatePlastic();
    } else {
        ValidatePlastic();
    }
};

var ValidateCommon = function () {
    var tabContainer = GetDeliverySelection();
    var recipientName = tabContainer.find("#RecipientName");
    var purchaserName = tabContainer.find("#PurchaserName");
    var personalMessage = tabContainer.find("#PersonalMessage");
    var cardAmount = $("#card-value-input");
    if (cardAmount.val() < 25.00) {
        cardAmount.after(GenerateError("CardAmount", "You must purchase at least $25 worth of card value."));
        ShowCardValueSection();
    }
    if (cardAmount.val() % 25 !== 0) {
        cardAmount.after(GenerateError("CardAmount", "You must select a value that is a multiple of $25."));
        ShowCardValueSection();
    }
    if (recipientName.val().trim().length < 1) {
        recipientName.after(GenerateError("RecipientName", "A recipient name is required for your gift."));
    }
    if (purchaserName.val().trim().length < 1) {
        purchaserName.after(GenerateError("PurchaserName", "A purchaser name is required for your gift."));
    }
    if (personalMessage.val().trim().length > 300) {
        personalMessage.after(GenerateError("Personal Message", "Your personal message is too long."));
    }
};

var ValidateEcard = function () {
    var tabContainer = GetDeliverySelection();
    var recipientEmail = tabContainer.find("#RecipientEmail");
    var confirmRecipientEmail = tabContainer.find("#ConfirmRecipientEmail");
    if (recipientEmail.val().trim().length < 1 || !IsEmail(recipientEmail.val())) {
        recipientEmail.after(GenerateError("RecipientEmail", "Please enter a valid email address."));
    }
    if (recipientEmail.val() !== confirmRecipientEmail.val() || confirmRecipientEmail.val().trim().length < 1) {
        confirmRecipientEmail.after(GenerateError("ConfirmRecipientEmail", "Please make sure you entered the correct email address."));
    }
};

var ValidatePlastic = function() {
    var shippingFirstName = $("#ShippingFirstName");
    var shippingLastName = $("#ShippingLastName");
    var shippingAddress1 = $("#ShippingAddress1");
    var shippingCity = $("#ShippingCity");
    var shippingState = $("#ShippingState");
    var shippingZip = $("#ShippingZip");
    var calculateShipping = $("#calculateShipping");
    var giftBox = $("#GiftBox");
    var giftBoxStyle = $("#GiftBoxStyle");
    var shippingMethodSelect = $("#calculate-shipping-button");
    if (shippingFirstName.val().trim().length < 1) {
        shippingFirstName.after(GenerateError("ShippingFirstName", "Please enter a first name for delivery."));
    }
    if (shippingLastName.val().trim().length < 1) {
        shippingLastName.after(GenerateError("ShippingLastName", "Please enter a last name for delivery."));
    }
    if (shippingAddress1.val().trim().length < 1) {
        shippingAddress1.after(GenerateError("ShippingAddress1", "Please enter a delivery address."));
    }
    if (shippingCity.val().trim().length < 1) {
        shippingCity.after(GenerateError("ShippingCity", "Please enter a delivery city."));
    }
    if (shippingState.val().trim().length < 1) {
        shippingState.after(GenerateError("ShippingState", "Please select a delivery state."));
    }
    if (shippingZip.val().trim().length < 1) {
        shippingZip.after(GenerateError("ShippingZip", "Please enter a valid delivery zip code."));
    }
    if (calculateShipping.is(":visible")) {
        calculateShipping.after(GenerateError("ShippingMethod", "Please select a shipping method"));
    }
    if (giftBox.val() === "Standard") {
        giftBoxStyle.val("Standard");
    }
    if (giftBox.val() !== "" && giftBoxStyle.val() === "") {
        calculateShipping.after(GenerateError("ShippingMethod", "Please select a giftbox style."));
    }
    if ($("#SelectedShippingMethodId") == null || $("#SelectedShippingMethodId").length <= 0 || $("#SelectedShippingMethodId").val().length <= 0) {
        shippingMethodSelect.after(GenerateError("ShippingMethodSelect", "Please select a shipping method by clicking 'Calculate Shipping'."));
    }
};

var GetDeliverySelection = function() {
    var tabContainer;
    if ($("#email-gift-card-tab").is(":visible")) {
        tabContainer = $("#email-gift-card-tab");
    } else if ($("#print-gift-card-tab").is(":visible")) {
        tabContainer = $("#print-gift-card-tab");
    } else {
        tabContainer = $("#no-tabs");
    }
    return tabContainer;
};

var GenerateError = function(fieldId, message) {
    return '<label for="' + name + '" class="error">' + message + '</label>';
};

var IsEmail = function(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};