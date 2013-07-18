// Init sidebar
$(function() {
  var activeItem,
      helpList = $('#js-sidebar .js-topic'),
      firstOccurance = true

  // hide list items at startup
  if($('body.api') && window.location){
    var reg = /\/\/[^\/]+(\/.+)/g,
        docUrl = reg.exec(window.location.toString())
    if(docUrl){
      $('#js-sidebar .js-topic a').each(function(){
        var url = $(this).attr('href').toString()
        var cleanDocUrl = docUrl[1].split('#')[0]
        if(url.indexOf(cleanDocUrl) >= 0 && url.length == cleanDocUrl.length){
          $(this).parent('li').addClass('disable')
        }
      })
    }
  }
  $.scrollUp({
	  scrollName: 'scrollUp',
	  topDistance: '300',
	  topSpeed: 300, 
	  animation: 'fade',
	  animationInSpeed: 200, 
	  animationOutSpeed: 200,
	  scrollText: '',
	  activeOverlay: false
  });
});
