$(document).ready(function() {
    registerBackgroundImage("departing");
    registerBackgroundImage("robot");
});

function registerBackgroundImage(imageName) {
    $("h2." + imageName).hover(
        function() {
            $(".landingimage." + imageName).stop().fadeTo(200, 1);
        },
        function() {
            $(".landingimage." + imageName).stop().fadeTo(200, 0.0);
        });
}
