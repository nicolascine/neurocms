/*
 *  particulas - index
 */

$(document).ready(function() {
  $('#particles').particleground({
    dotColor: '#00D8FF',
    lineColor: '#00D8FF',
    particleRadius: 6
  });
  $('.intro').css({
    'margin-top': -($('.intro').height() / 2)
  });

/*
 * Google fonts 
 */

WebFontConfig = {
    google: { families: [ 'Source+Sans+Pro:300,400,600:latin', 'Bitter:400,400italic:latin' ] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();
  
});