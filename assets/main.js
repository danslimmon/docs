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
        
        // Status Indicator
        var sp = new StatusPage('bjrxlnv3yqfm');
        sp.getStatus(function(data) {
          var status_icon = $('#status-icon')[0];
          var status_text = $('#status-text')[0];

          status_icon.style.visibility = "visible";
          status_text.title = data.status.description;

          switch (data.status.indicator) {
            case "none":
              status_icon.style.backgroundColor = "green";
              break;
            case "minor":
              status_icon.style.backgroundColor = "yellow";
              break;
            case "major": 
              status_icon.style.backgroundColor = "orange";
              break;
            case "critical": 
              status_icon.style.backgroundColor = "red";
              break;

            default: 
              console.log("Unknown Status Indicator")
              status_icon.style.backgroundColor = "grey";
              break;
          }
        });
      });
  });
})(window.jQuery)
