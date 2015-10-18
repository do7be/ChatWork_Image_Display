$(function () {
  var old = TimeLineView.prototype.renderTimeLine;
  TimeLineView.prototype.renderTimeLine = function (el) {

    old.apply(this, arguments);

    // gyazo
    $(el).find('a[href^="https://gyazo.com/"]').each(function () {
      var urls = $(this).attr("href").split("/");
      var url = "https://i.gyazo.com/"+urls[3];

      if($(this).children('img[src^="'+url+'"]').length > 0){
          return false;
      }

      $('<br />').appendTo(this);
      $('<img style="display:box; height:150px; border:1px solid #CCC;" />')
      .attr("src", url+".png")
      .appendTo(this)
      .error(function(){
          var url_tmp_jpg = $(this).attr("src").replace(".png", ".jpg");
          $(this).attr("src", url_tmp_jpg)
          .error(function(){
              var url_tmp_gif = $(this).attr("src").replace(".jpg", ".gif");
              $(this).attr("src", url_tmp_gif);
          });
      });
    });

    // image
    $(el).find('a[href^="http://"]', 'a[href^="https://"]').each(function () {
      var url = $(this).attr("href");
      $('<br />').appendTo(this);
      $('<img style="display:box; height:150px; border:1px solid #CCC;" />')
        .attr("src", url)
        .appendTo(this)
        .error(function(){
          this.remove();
        });
    });
  };
});