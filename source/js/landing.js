$(document).ready(function() {
    $("h2").hover(

        function() {
            $("#backgroundimage").stop().fadeTo(200, 1);
        },
        function() {
            $("#backgroundimage").stop().fadeTo(200, 0.0);
        });
});
