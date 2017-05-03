$(document).ready(function() {
    SetupOffsitePopup("merchandise");
    SetupOffsitePopup("vacations");
    SetupOffsitePopup("rapidredeem");
    SetupOffsitePopup("publicbooking");
    SetupOffsitePopup("privatebooking");
});

function SetupOffsitePopup(name) {
    $("." + name + "-link").click(function (e) {
        var href = e.currentTarget.href;
        $("#" + name + "-popup").dialog({
            resizable: false,
            height: "auto",
            width: 500,
            model: true,
            buttons: {
                "Leave Go Play Golf": function () {
                    $(this).dialog("close");
                    window.open(href);
                },
                Cancel: function () {
                    $(this).dialog("close");
                }
            }
        });
        e.preventDefault();
        return false;
    });
};