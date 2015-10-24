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
    $(el).find(':not(a[href^="https://gyazo.com/"])')
    .find('a[href^="http://"], a[href^="https://"]')
    .each(function() {
      var url = $(this).attr("href");
      if ($(this).children('img[src^="'+url+'"]').length > 0) {
        return true;
      }

      // include anker or cgi
      var error_reg = new RegExp('[#|\?]', 'i');
      if (error_reg.test(url)) {
        return true;
      }

      var img_reg = new RegExp('\.(jpg|gif|png|ico)$', 'i');
      if (img_reg.test(url)) {
        // absolute image
        $('<img class="thumbnail" />').attr("src", url)
        .appendTo(this);
      }
      else {
        // guess image
        $('<img class="thumbnail-no-extension" />').attr("src", url)
        .appendTo(this)
        .error(function(){
          this.remove();
        })
        .bind("load", function(){
          $(this).css("display", "block").show();
          var height = $(this).height();
          var top = $('#_timeLine').scrollTop();
          $('#_timeLine').scrollTop(top + height, 'normal');
        });
      }
    });
  };
});