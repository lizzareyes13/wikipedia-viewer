const $ = require('jquery');

$.getJSON("http://en.wikipedia.org/w/api.php?callback=?&action=query&format=json&prop=extracts&generator=search&exlimit=10&exintro=1&gsrsearch=Presidents")
$(document).on("keypress", function(e){
  if(e.keyCode == 13){
    $("#searchResults").html("");
    $("#searchContainer").css("margin-top", "0");

    $.getJSON("http://en.wikipedia.org/w/api.php?callback=?"+
    "&action=query&format=json&prop=extracts&generator=search"+
    "&exlimit=10&exintro=1&gsrsearch="+$("#searchBox").val())
    .then(function(resp,txt,xhr){
      console.log(resp);
      //resp.query.pages has the unfo I need
      for (var k in resp.query.pages){
        console.log(resp.query.pages[k].title);
        //$("#searchResults").append("<h1>"+ resp.query.pages[k].title + "</h1>");
        //$("#searchResults").append("<p>"+ resp.query.pages[k].extract + "</p>");
        let markupToAppend =
        `<div class='wiki-result'>
          <h1>${resp.query.pages[k].title}</h1>
          <p>
            ${resp.query.pages[k].extract}
          </p>
        </div>`;
        $("#searchResults").append(markupToAppend);

      }
    })

  }
});
