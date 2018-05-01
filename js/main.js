$( document ).ready(function() {

$("#nysel").on("change", function() {
  var selected = $(this).val();
  $(".site-header").addClass("header2");
  $("#articles").addClass("newarticles");
  $("#articles").before('<div class ="loader"><img src="/images/ajax-loader.gif"> </div>'); 
  $("#articles").empty();
  // $(".site-header").empty();
  var url = "https://api.nytimes.com/svc/topstories/v2/" + selected + ".json";
  url +=
    "?" +
    $.param({
      "api-key": "36dcc95bc47347f382b905a6f391861e"
    });

  $.ajax({
    url: url,
    method: "GET",
  })
    .done(function(data) {
      var results = data.results.filter(function(article){
        return article.multimedia.length>0;
    }).slice(0,12);

      $.each(results, function( index, value ) {
        // console.log(value.title);
    
        var html = "";
        html += "<li class='items'>";
        // html += '<div class="bkimg" style="background-image:url(' + value.multimedia[4].url + ')">';
        html += "<div class=ikkk><a href='" + value.url + "'><img src=" + value.multimedia[4].url + ">"
        html += "<div class='pnews'><p>" + value.abstract + "</p></div></div>";
        html += "</a>"
        // html += "<div class='pnews'><p>" + value.abstract + "</p></div>";
        // html += "<a href='"+ value.url +"'> <img src='" + value.multimedia[4].url + ">";
        html += "</li>";
        $("#articles").append(html);
        
      });
    

      
    })
    .fail(function(errr) {
        alert('something went wrong');
    })

    .always(function (){
            
      $('.loader').remove();
    });
});

})