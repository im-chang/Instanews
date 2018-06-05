"use strict";

$(document).ready(function () {

  var x = 1;

  $("#nysel").on("change", function () {
    var selected = $(this).val();
    $(".site-header").addClass("header2");
    // $("#articles").addClass("newarticles");
    $("#articles").before('<div class ="loader"><img src="images/ajax-loader.gif"> </div>');
    $("#articles").empty();
    var url = "https://api.nytimes.com/svc/topstories/v2/" + selected + ".json";
    url += "?" + $.param({
      "api-key": "36dcc95bc47347f382b905a6f391861e"
    });

    $.ajax({
      url: url,
      method: "GET"
    }).done(function (data) {
      var results = data.results.filter(function (article) {
        return article.multimedia.length > 0;
      }).slice(0, 12);

      $.each(results, function (index, value) {
        var html = "";
        html += "<li class='items'>";
        html += "<div class=bkg><a href='" + value.url + "'><img src=" + value.multimedia[4].url + ">";
        html += "<div class='pnews'><p>" + value.abstract + "</p></div></div>";
        html += "</a>";
        html += "</li>";
        $("#articles").append(html);
      });
    }).fail(function (errr) {
      alert('Please Select a Category');
    }).always(function () {

      $('.loader').remove();
    });
  });
});