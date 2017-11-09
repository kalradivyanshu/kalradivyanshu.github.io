function setup() {
  // create canvas
  var c = createCanvas(window.innerWidth/2, window.innerHeight);
  c.parent('canvas');
  window.debugC = c;
  background(100);
  // Add an event for when a file is dropped onto the canvas
  c.drop(gotFile);
  window.images = [];
  $($(window.debugC)[0].elt).on("click", function(){
      //console.log("here", mouseX, mouseY);
      if(window.currentUnpositioned != undefined) {
          window.currentUnpositioned.place(mouseX, mouseY);
      }
  });
}

function draw() {
  //window.createImadeP5 = createImg;
  background(0);
  for(var i = 0; i < window.images.length; i++)
      window.images[i].updateAndDraw();
}
function gotFile(file) {
   console.log(file);
  if(window.currentUnpositioned != undefined) {
      alert("Please place the current image first.")
      return undefined;
  }
  // If it's an image file
  if (file.type === 'image') {
    // Create an image DOM element but don't show it
    img = createImg(file.data).hide();
    obj = new imageObj(file, img);
    window.images.push(obj);
    // Draw the image onto the canvas
  } else {
    println('Not an image file!');
  }
}
