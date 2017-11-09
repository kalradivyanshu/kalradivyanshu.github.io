$("#selectAssest").change(function() {
    console.log($(this).val());
    loadImages($(this).val());
});

function imageClicked(ele) {
    if(window.currentUnpositioned != undefined)
        return null;
    console.log(ele.src, ele);
    //window.ele = ele;
    object = new imageObj(undefined, ele);
    window.images.push(object)
    //console.log(window.createImadeP5(ele));
    //console.log(createImg(ele));
    //myImage.src = ele.src;
}
function loadImages(parPath) {
    $('#assetsHolder').html("");
    for(i = 1; i < 25; i++) {
        imgPath = "./assets/"+parPath+"/0"+i+".png";
        //console.log(imgPath);
        $('<img class = "imgAsset" src="'+ imgPath +'" onclick = "imageClicked(this)">').load(function() {
            //console.log(this);
            $(this).appendTo('#assetsHolder');
        });
    }
}
$(document).ready(function(){
    loadImages("Adventurer");
});