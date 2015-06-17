/// <reference path="references.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Revision = (function (_super) {
    __extends(Revision, _super);
    function Revision(xPos, yPos, color, type, label) {
        _super.call(this);
        this._color = color;
        this.x = xPos;
        this.y = yPos;
        this._type = type;
        this._label = label;
        this._drawDot();
    }
    Revision.prototype._drawDot = function () {
        var dot = new createjs.Shape();
        dot.graphics.beginFill(this._color).drawCircle(0, 0, 18);
        dot.shadow = new createjs.Shadow("rgba(0,0,0,0.3)", 1, 2, 4);
        this.addChild(dot);
        this._addLabel();
    };
    Revision.prototype._addLabel = function () {
        var text = new createjs.Text(this._label, "15px Arial", "#ffffff");
        text.x = -text.getMeasuredWidth() / 2;
        text.y = -text.getMeasuredHeight() / 2;
        text.mouseEnabled = false;
        this.addChild(text);
    };
    Revision.prototype.connectToDot = function (dot) {
        var line = new createjs.Shape();
        line.graphics.setStrokeStyle(8);
        line.graphics.beginStroke("rgba(204,204,204,0.5)");
        line.graphics.moveTo(this.x, this.y);
        line.graphics.lineTo(dot.x, dot.y);
        line.graphics.endStroke();
        return line;
    };
    Object.defineProperty(Revision.prototype, "revisionType", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    return Revision;
})(createjs.Container);
