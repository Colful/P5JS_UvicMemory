$(document).ready(function() {
    // Search id in GET parameters URL
    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };
    if (getUrlParameter('fin') == 1) {
        var result = document.getElementsByClassName("result");
        result[0].innerText = "Number of Tries: " + getUrlParameter('tries');
        $('.container_lost').css("display","none");
        $('.container_win').css("display","block");
    }else if (getUrlParameter('fin') == 0){
        $('.container_win').css("display","none");
        $('.container_lost').css("display","block");
    }

    // console.log(getUrlParameter('tries'))
});

function replay() {
    window.location.href = "../../../index.html";
}