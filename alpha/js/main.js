function  colorwheelit(){
  var cw = Raphael.colorwheel($("#colorwheelholder")[0],150);
  $("#input_example").attr('value', window.color);
  cw.input($("#input_example")[0]);
  cw.onchange(function(color) {
    window.color = color.hex;
    $("#input_example").attr('value', window.color);
  });
}
function togglemarker(){
  if($('.marker').attr('src') == "./images/marker.png") {
    $('.marker').attr('src',"./images/cmarker.png");
    $('.marker').css('margin-top','55px');
    $('.marker').css('margin-left','87px');
  }
  else {
    $('.marker').attr('src',"./images/marker.png");
    $('.marker').css('margin-top','69px');
    $('.marker').css('margin-left','83px');
  }
}
function togglepen() {
  if($('.pen').attr('src') == "./images/pen.png") {
    $('.pen').attr('src',"./images/cpen.png");
    $('.pen').css('margin-top','4px');
    $('.pen').css('margin-left','7px');
  }
  else {
    $('.pen').attr('src',"./images/pen.png");
    $('.pen').css('margin-top','13px');
    $('.pen').css('margin-left','7px');
  }
}
function togglebrush() {
  if($('.brush').attr('src') == "./images/brush.png") {
    $('.brush').attr('src',"./images/cbrush.png");
    $('.brush').css('margin-top','36px');
    $('.brush').css('margin-left','7px');
  }
  else {
    $('.brush').attr('src',"./images/brush.png");
    $('.brush').css('margin-top','42px');
    $('.brush').css('margin-left','7px');
  }
}
function unselectbrush()
{
  //console.log(window.brushtype)
  if(window.brushtype == "marker") {
    togglemarker();
  }
  else if(window.brushtype == "pen") {
    togglepen();
  }
  else if(window.brushtype == "brush") {
    togglebrush();
  }
  else {
    console.log("none");
  }
}
$('.b').click(function(){
  //console.log($(this).hasClass("pen"))
  if($(this).hasClass("marker"))
  {
    if(window.brushtype == "marker") {
    }
    else {
      unselectbrush();
      window.brushtype = "marker";
      togglemarker();
    }
  }
  else if($(this).hasClass("pen"))
  {
    if(window.brushtype == "pen") {
    }
    else {
      unselectbrush();
      window.brushtype = "pen";
      togglepen();
    }
  }
  else if($(this).hasClass("brush"))
  {
    if(window.brushtype == "brush") {
    }
    else {
      unselectbrush();
      window.brushtype = "brush";
      togglebrush();
    }
  }
  else {
    console.log("none");
  }
})


$('.color').click(function() {
  window.color = $(this).css('background-color');
  $("#input_example").attr('value', window.color);
});
$('.colorpallet').click(function(){
  $('.selectcolor').toggle();
});
$('.wand').click(function(){
  $('#colorwheel').modal('show');
})
$(document).ready(function(){
  colorwheelit();
  togglemarker();
  window.brushtype = "marker";
});
