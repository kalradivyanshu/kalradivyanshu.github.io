var imageObj = function(file, ele) {
    this.image = file;
    this.ele = ele;
    this.positioned = false;
    this.x = 0;
    this.y = 0;
    this.place = function(x, y) {
        console.log(x, y, "placed Called.")
        window.currentUnpositioned = undefined;
        this.x = x;
        this.y = y;
        this.positioned = true;
    }
    this.updateAndDraw = function(c) {
        if(!this.positioned) {
            this.x = mouseX;
            this.y = mouseY;
        }
        window.debugC.drawingContext.drawImage(this.ele, this.x, this.y);
    }
    window.currentUnpositioned = this;
}