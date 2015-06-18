/// <reference path="references.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var RevisionTree = (function (_super) {
    __extends(RevisionTree, _super);
    function RevisionTree(canvasId, revisions) {
        _super.call(this, canvasId);
        this._linesContainer = new createjs.Container();
        this._dotsContainer = new createjs.Container();
        this.enableMouseOver(10);
        this._revisions = revisions;
        this.renderRevisionsToStage();
    }
    RevisionTree.prototype.renderRevisionsToStage = function () {
        for (var _i = 0, _a = this._revisions; _i < _a.length; _i++) {
            var revision = _a[_i];
            if (this.previousRevisionOnStage) {
                var line = revision.connectToDot(this.previousRevisionOnStage);
                this._linesContainer.addChild(line);
            }
            if (this.previousPublicRevisionOnStage
                && revision.revisionType === "public"
                && this.previousPublicRevisionOnStage !== this.previousRevisionOnStage) {
                var publicLine = revision.connectToDot(this.previousPublicRevisionOnStage);
                this._linesContainer.addChild(publicLine);
            }
            this._addListeners(revision);
            this._dotsContainer.addChild(revision);
            if (revision.revisionType === "public") {
                this.previousPublicRevisionOnStage = revision;
            }
            this.previousRevisionOnStage = revision;
        }
        this.addChild(this._linesContainer, this._dotsContainer);
        this.update();
    };
    RevisionTree.prototype._addListeners = function (revision) {
        revision.on("mouseover", this._handleMouseOver, this);
        revision.on("mouseout", this._handleMouseOut, this);
        revision.on("click", this._handleClick, this);
    };
    RevisionTree.prototype._handleMouseOver = function (e) {
        e.currentTarget.cursor = "pointer";
        e.currentTarget.scaleX = 1.2;
        e.currentTarget.scaleY = 1.2;
        var canvasPosition = $('#' + this.canvas.id).position();
        var xPos;
        if (e.currentTarget.x === 50) {
            xPos = e.currentTarget.x + canvasPosition.left - 350;
        }
        else {
            xPos = e.currentTarget.x + canvasPosition.left + 50;
        }
        var yPos = canvasPosition.top + 20;
        $('.panel').css({ left: xPos, top: yPos }).show();
        this.update();
    };
    RevisionTree.prototype._handleMouseOut = function (e) {
        e.currentTarget.cursor = "default";
        e.currentTarget.scaleX = 1;
        e.currentTarget.scaleY = 1;
        $('.panel').hide();
        this.update();
    };
    RevisionTree.prototype._handleClick = function (e) {
    };
    Object.defineProperty(RevisionTree.prototype, "width", {
        get: function () {
            return this.canvas.width;
        },
        set: function (value) {
            this.canvas.width = value;
            this.update();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RevisionTree.prototype, "height", {
        get: function () {
            return this.canvas.height;
        },
        set: function (value) {
            this.canvas.height = value;
            this.update();
        },
        enumerable: true,
        configurable: true
    });
    return RevisionTree;
})(createjs.Stage);
