let tema, dif;

function play() {
    dif = $("input[name='diff']:checked").val();
    tema = $("input[name='topic']:checked").val();
    window.location.href = "assets/pages/game.html?diff="+dif+"&topic="+tema;
}

function credits() {
    window.location.href = "assets/pages/credits.html";
}