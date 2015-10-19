$(function () {
  var old = TimeLineView.prototype.renderTimeLine;
  TimeLineView.prototype.renderTimeLine = function (el) {

    // render
    old.apply(this, arguments);

    // gyazo url
    $(el).find('a[href^="https://gyazo.com/"]').each(function() {
      var urls = $(this).attr("href").split("/");
      var url = "https://i.gyazo.com/"+urls[3];

      if($(this).children('img[src^="'+url+'"]').length > 0){
          return false;
      }

      // guess png
      $('<img class="thumbnail" />')
      .attr("src", url+".png")
      .appendTo(this)
      .error(function(){
          // guess jpg
          url = $(this).attr("src").replace(".png", ".jpg");
          $(this).attr("src", url)
          .error(function(){
              // guess gif
              url = $(this).attr("src").replace(".jpg", ".gif");
              $(this).attr("src", url);
          });
      });
    });

    // image url
    $(el).find(':not(a[href^="https://gyazo.com/"])').find('a[href^="http://"]', 'a[href^="https://"]').each(function() {
      var url = $(this).attr("href");

      if($(this).children('img[src^="'+url+'"]').length > 0){
          return false;
      }

      $('<img class="thumbnail" />')
      .attr("src", url)
      .appendTo(this)
      .error(function(){
        this.remove();
      });
    });
  };
});