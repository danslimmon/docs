(function ($) {
  $(document).ready(
    function(){
      $('.header ul a').on('click', function(event) {
        event.preventDefault();
        var href = $(this).attr('href');
        href = href.replace('#', '');
        var file = '';
        Flatdoc.run({
          fetcher: Flatdoc.file(href + '.md')
        });
      });

      $(document).on('flatdoc:ready', function() {
        $('.content a').each(function() {
          console.log($(this).attr('href'));
        });

        // make content links work in flatdoc
        $('.content a').on('click', function(event) {
          var href = $(this).attr('href');
          if (href.indexOf('http') != 0) {
            // don't touch anchor links
            if (href.indexOf('#') != 0) {
              event.preventDefault();
              if (href.indexOf('/') === href.length - 1) {
                Flatdoc.run({
                  fetcher: Flatdoc.file(href + 'README.md')
                });
              }
            } 
          }
        });

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
      });
  });
})(window.jQuery)
