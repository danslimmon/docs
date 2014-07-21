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
            id: anchor
          }).appendTo(v);  
        });

        // Remap markdown files to directories.
        $('.content a').each(function() {
          var href = $(this).attr('href');
          if (typeof(href) === 'string' && href.indexOf('http') != 0){
            href = href.replace(/README\.md$/, '../');
            href = href.replace(/\.md$/, '/');
            this.href = href;
          }
        });
        
        if(document.location.hash != ""){
          $('html, body').animate({
            scrollTop: $(document.location.hash).offset().top
          }, 500);
        }

        // put flatdoc menu inside heading
        
        // strip trailing slash
        var path = document.location.pathname.replace(/\/$/, '');
        
        // remove first level 1 menu so it isn't duplicated
        var menutitle = $('div.menu.section[role=flatdoc-menu] a[class=level-1]');
        menutitle.detach();
        
        $("div.menubar > ul li a").each(function() {
          if ($(this).attr('href') === path) {
            // remove title
            $('div.menu.section[role=flatdoc-menu]').detach().appendTo($(this));
          }
        });
      });
  });
})(window.jQuery)
