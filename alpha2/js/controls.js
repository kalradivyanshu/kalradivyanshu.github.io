window.countdown = false;
var count = 30;
$('.startb').click(function(){
  var ctx = $('#drawcanvas')[0].getContext('2d');
  var canvas = $('#drawcanvas')[0];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  window.countdown = true;
  window.draw = true;
});
$('.resetb').click(function(){
  var ctx = $('#drawcanvas')[0].getContext('2d');
  var canvas = $('#drawcanvas')[0];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  count = 30;
  window.countdown = true;
  window.draw = true;
});
setInterval(function countdown() {
  //console.log(count);
  if(window.countdown == true) {
    if(count>0)
      count--;
    $('.time').text(count);
    if(count == 0) {
      window.draw = false;
    }
  }
},1000);
