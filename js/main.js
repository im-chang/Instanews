$( document ).ready(() => {

  $("#nysel").on("change", function() {
    let selected = $(this).val();
    $(".site-header").addClass("header2");
    $("#articles").before('<div class ="loader"><img src="images/ajax-loader.gif"> </div>'); 
    $("#articles").empty();
    let url = `https://api.nytimes.com/svc/topstories/v2/${selected}.json`;
    url +=
      `?${$.param({
  "api-key": "36dcc95bc47347f382b905a6f391861e"
  })}`;
  
    $.ajax({
      url,
      method: "GET",
    })
      .done(data => {
        let results = data.results.filter(article => article.multimedia.length>0).slice(0,12);
  
        $.each(results, (index, value) => {
          let html = "";
          html += "<li class='items'>";
          html += `<div class=bkg><a href='${value.url}'><img src=${value.multimedia[4].url}>`
          html += `<div class='pnews'><p>${value.abstract}</p></div></div>`;
          html += "</a>"
          html += "</li>";
          $("#articles").append(html);
        });
      })
      .fail(errr => {
          alert('Please Select a Category');
      })
  
      .always(() => {
              
        $('.loader').remove();
      });
  });
  
  })
  