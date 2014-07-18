(function ($) {
  $(document).ready(
    function(){
      $(document).on('flatdoc:ready', function() {
        // Add GitHub style anchors to headers.
        var anchors = [];
        $('.content h2,h3,h4,h5,h6').each(function(i,v){
          var anchor = v.textContent.replace(/[!@#$%^&*()=+<>;:'"\\\/]/g, "").replace(/ /g, "-").toLowerCase();
          while(anchors.indexOf(anchor) != -1){
            var nums = anchor.match(/-(\d+)$/);
            if(nums !== null){
              anchor = anchor.replace(/(\d+)$/, parseInt(nums[1]) + 1);
            }else{
              anchor = anchor + "-1";
            }
          }

          anchors.push(anchor);
          $('<a/>', {
            name: anchor
          }).appendTo(v);  
        });
        
        if(document.location.hash != ""){
          $('html, body').animate({
            scrollTop: $(document.location.hash).offset().top
          }, 500);
        }
      });
  });
})(window.jQuery)
