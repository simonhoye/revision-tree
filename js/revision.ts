/// <reference path="references.ts" />

class Revision extends createjs.Container {
    private _color:string;
    private _type:string;
    private _label:string;

    public x:number;
    public y:number;

    constructor(xPos:number,yPos:number,color:string,type:string,label:string) {
        super();
        this._color = color;
        this.x = xPos;
        this.y = yPos;
        this._type = type;
        this._label = label;
        this._drawDot();
   }
   _drawDot():void {
      let dot:createjs.Shape = new createjs.Shape();
      dot.graphics.beginFill(this._color).drawCircle(0,0,18);
      dot.shadow = new createjs.Shadow("rgba(0,0,0,0.3)", 1, 2, 4);
      this.addChild(dot);
      this._addLabel();
   }
   _addLabel():void {
      let text = new createjs.Text(this._label,"15px Arial","#ffffff");
      text.x = -text.getMeasuredWidth()/2;
      text.y = -text.getMeasuredHeight()/2;
      text.mouseEnabled = false;
      this.addChild(text);

   }
   connectToDot(dot:Revision):createjs.Shape {
      let line = new createjs.Shape();
      line.graphics.setStrokeStyle(8);
      line.graphics.beginStroke("rgba(204,204,204,0.5)");
      line.graphics.moveTo(this.x,this.y);
      line.graphics.lineTo(dot.x,dot.y);
      line.graphics.endStroke();

      return line;
   }
   get revisionType() {
      return this._type;
   }
}
