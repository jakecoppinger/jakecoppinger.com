$(document).ready(function() {
    if (!is_touch_device()) {
        ['transit-in-sydney', 'departing',
            'swirlesque', 'engineering-process', 'films'
        ].forEach(attachBackgroundImage);
    }
});

function is_touch_device() {
    try {
        document.createEvent("TouchEvent");
        return true;
    } catch (e) {
        return false;
    }
}

function attachBackgroundImage(imageName) {
    $("#landingscreen a." + imageName).hover(
        function() {
            $("#maintitle").css("opacity", "1");
            //$("#maintitle").css("mix-blend-mode", "exclusion");
            $(".landingimage." + imageName).stop().fadeTo(200, 1);

        },
        function() {
            $("#maintitle").css("opacity", "1");
            //$("#maintitle").css("mix-blend-mode", "normal");
            $(".landingimage." + imageName).stop().fadeTo(200, 0.0);

        });
}
