$(document).ready(function () {

    var endpoint = "http://en.wikipedia.org//w/api.php?action=opensearch&format=json&search=";
    var par = "&limit=10&utf8=1&formatversion=2";

    $("#intext").keyup(function () {
        $(".slider").empty();
        var query = document.getElementById("intext").value;
        var url = endpoint + query + par;
        $.ajax({
            url: url,
            dataType: 'jsonp',
            type: 'POST',
            success: function dataQuery(json) {
                //  $("#test").html(json[1][0]);
                json[1].forEach(function suggestion(entry) {
                    $(".slider").append("<p id=\"sug\">" + entry + "</p>");

                });
                $(".slider p").click(function () {
                    document.getElementById("intext").value = $(this).text();
                    $(".slider").empty();
                    if (query.length > 0) {
                        event.preventDefault();
                        $(".search-results").empty();
                        $(".searchbox").css("top", 0);
                        $(".searchbox").css("position", "relative");



                        var url = endpoint + query + par;
                        $.ajax({
                            url: url,
                            dataType: 'jsonp',
                            type: 'POST',
                            success: function dataQuery(data) {
                                var i = 0;
                                while (i < data[1].length) {

                                    $(".search-results").append("<div class=\"row\"><div class=\"results\"><h4><a href=\"" + data[3][i] + "\" target=\"_blank\">" + data[1][i] + "</a></h4><p><a href=\"" + data[3][i] + "\" target=\"_blank\">" + data[2][i] + "</a></p></div></div>");
                                    i++;

                                }


                            }
                        })
                    }


                });
            }
        });

    });


    $(document).keypress(function start() {

        var query = document.getElementById("intext").value;
        if (event.which == 13 && query.length > 0) {
            event.preventDefault();
            $(".search-results").empty();
            $(".searchbox").css("top", 0);
            $(".searchbox").css("position", "relative");



            var url = endpoint + query + par;
            $.ajax({
                url: url,
                dataType: 'jsonp',
                type: 'POST',
                success: function dataQuery(data) {
                    var i = 0;
                    while (i < data[1].length) {

                        $(".search-results").append("<div class=\"row\"><div class=\"results\"><h4><a href=\"" + data[3][i] + "\" target=\"_blank\">" + data[1][i] + "</a></h4><p><a href=\"" + data[3][i] + "\" target=\"_blank\">" + data[2][i] + "</a></p></div></div>");
                        i++;

                    }


                }
            })
        }
    });

})