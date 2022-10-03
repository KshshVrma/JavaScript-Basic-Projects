function generate() {
    var f = "";

    fetch('https://api.quotable.io/random')
        .then(response => response.json())
        .then(data => {
            f = "\"" + data.content + "\"";
            f = f + "<br/> -- " + data.author;
            document.getElementById('quote').innerHTML = f;
        });
}