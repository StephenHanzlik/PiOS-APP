var SetProgressBar = function(stage) {
    var desiredStage = stage;
    var currentStage = GetProgressStage();
    if (currentStage < desiredStage) {
        for (var i = currentStage; i < desiredStage; i++) {
            IncrementProgressBar();
        }
    } else if (currentStage > desiredStage) {
        for (var j = currentStage; j > desiredStage; j--) {
            DecrementProgressBar();
        }
    }
};

var IncrementProgressBar = function () {
    var bar = $(".milestone--bar");
    var stage = GetProgressStage();
    switch (stage) {
        case (1):
            $(bar).removeClass("milestone--bar--one");
            $(bar).addClass("milestone--bar--two");
            $(".stage-3").addClass("progress-active");
            $("div#progress-2").addClass("completed");
            break;
        case (2):
            $(bar).removeClass("milestone--bar--two");
            $(bar).addClass("milestone--bar--three");
            $(".stage-4").addClass("progress-active");
            $("div#progress-3").addClass("completed");
            break;
        case (3):
            $(bar).removeClass("milestone--bar--three");
            $(bar).addClass("milestone--bar--four");
            $("div#progress-4").addClass("completed");
            break;
        default:
            break;
    }
};

var DecrementProgressBar = function () {
    var bar = $(".milestone--bar");
    var stage = GetProgressStage();
    switch (stage) {
        case (4):
            $(bar).removeClass("milestone--bar--four");
            $(bar).addClass("milestone--bar--three");
            $("div#progress-4").removeClass("completed");
            break;
        case (3):
            $(bar).removeClass("milestone--bar--three");
            $(bar).addClass("milestone--bar--two");
            $(".stage-4").removeClass("progress-active");
            $("div#progress-3").removeClass("completed");
            break;
        case (2):
            $(bar).removeClass("milestone--bar--two");
            $(bar).addClass("milestone--bar--one");
            $(".stage-3").removeClass("progress-active");
            $("div#progress-2").removeClass("completed");
            break;
        default:
            break;
    }
};

var GetProgressStage = function () {
    var bar = $(".milestone--bar");
    if ($(bar).find("div.stage-4.progress-active").length > 0 && $(bar).hasClass("milestone--bar--four")) {
        return 4;
    } else if ($(bar).find("div.stage-4.progress-active").length > 0) {
        return 3;
    } else if ($(bar).find("div.stage-3.progress-active").length > 0) {
        return 2;
    } else {
        return 1;
    }
};