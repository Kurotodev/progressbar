var cancelledTimer = null;
$("document").ready(function () {
    Progressbar = {};
    Progressbar.Progress = function (data) {
        clearTimeout(cancelledTimer);
        $("#progress-label").text(data.label);
        $(".progress-bar-container").css("width", "30vh");
        $(".progress-bar-container").addClass("show");
        $(".progress-container").addClass("show");
        setTimeout(() => {
            $("#progress-bar")
                .stop()
                .css({ width: 0 })
                .animate(
                    {
                        width: "100%",
                    },
                    {
                        duration: parseInt(data.duration),
                        complete: function () {
                            $(".progress-container").removeClass("show");
                            $(".progress-bar-container").removeClass("show");
                            setTimeout(() => {
                                $("#progress-bar").removeClass("cancellable");
                                $("#progress-bar").css("width", 0);
                                $(".progress-bar-container").css("width", 0);
                                $.post(
                                    "https://progressbar/FinishAction",
                                    JSON.stringify({})
                                );
                            }, 1000);
                        },
                    }
                );
        }, 1000);
    };

    Progressbar.ProgressCancel = function () {
        $("#progress-label").text("Cancelando progreso...");
        $("#progress-bar").stop().css({ width: "100%" });
        $("#progress-bar").removeClass("cancellable");

        cancelledTimer = setTimeout(function () {
            $(".progress-container").removeClass("show");
            $(".progress-bar-container").removeClass("show");
            setTimeout(() => {
                $("#progress-bar").css("width", 0);
                $(".progress-bar-container").css("width", 0);
                $.post("https://progressbar/CancelAction", JSON.stringify({}));
            }, 1000);
        }, 1000);
    };

    Progressbar.CloseUI = function () {
        $(".progress-container").removeClass("show");
        $(".progress-bar-container").removeClass("show");
    };

    window.addEventListener("message", function (event) {
        switch (event.data.action) {
            case "progress":
                Progressbar.Progress(event.data);
                break;
            case "cancel":
                Progressbar.ProgressCancel();
                break;
        }
    });
});
