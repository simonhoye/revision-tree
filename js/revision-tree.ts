/// <reference path="references.ts" />


class RevisionTree extends createjs.Stage {
    private _revisions:Array<Revision>;
    private _linesContainer:createjs.Container = new createjs.Container();
    private _dotsContainer:createjs.Container = new createjs.Container();

    public previousRevisionOnStage:Revision;
    public previousPublicRevisionOnStage:Revision;

    constructor(canvasId:string, revisions:Array<Revision>) {
        super(canvasId);
        this.enableMouseOver(10);
        this._revisions = revisions;
        this.renderRevisionsToStage();
    }
    renderRevisionsToStage():void {
        for(var revision of this._revisions) {
            if(this.previousRevisionOnStage) {
                var line:createjs.Shape = revision.connectToDot(this.previousRevisionOnStage);
                this._linesContainer.addChild(line);
            }
            if(this.previousPublicRevisionOnStage
                && revision.revisionType === "public"
                && this.previousPublicRevisionOnStage !== this.previousRevisionOnStage) {
                var publicLine:createjs.Shape = revision.connectToDot(this.previousPublicRevisionOnStage);
                this._linesContainer.addChild(publicLine);
            }
            this._addListeners(revision);
            this._dotsContainer.addChild(revision);

            if(revision.revisionType === "public") {
                this.previousPublicRevisionOnStage = revision;
            }
            this.previousRevisionOnStage = revision;
        }

        this.addChild(this._linesContainer,this._dotsContainer);
        this.update();
    }
    _addListeners(revision:Revision):void {
        revision.on("mouseover", this._handleMouseOver, this);
        revision.on("mouseout",this._handleMouseOut, this);
        revision.on("click",this._handleClick, this);
    }
    _handleMouseOver(e:createjs.MouseEvent):void {
        e.currentTarget.cursor = "pointer";
        e.currentTarget.scaleX = 1.2;
        e.currentTarget.scaleY = 1.2;

        let canvasPosition = $('#'+this.canvas.id).position();
        let xPos;
        if(e.currentTarget.x === 50) {
            xPos = e.currentTarget.x + canvasPosition.left - 350;
        } else {
            xPos = e.currentTarget.x + canvasPosition.left + 50;
        }

        let yPos = canvasPosition.top + 20;
        $('.panel').css({left:xPos, top: yPos}).show();
        this.update();
    }
    _handleMouseOut(e:createjs.MouseEvent):void {
        e.currentTarget.cursor = "default";
        e.currentTarget.scaleX = 1;
        e.currentTarget.scaleY = 1;
        $('.panel').hide();
        this.update();
    }
    _handleClick(e:createjs.MouseEvent):void {

    }
    get width():number {
        return this.canvas.width;
    }
    set width(value:number) {
        this.canvas.width = value;
        this.update();
    }
    get height():number {
        return this.canvas.height;
    }
    set height(value:number) {
        this.canvas.height = value;
        this.update();
    }
}

var dots:Array<Revision> = [];

dots.push(new Revision(50,50,"orange","public","3"));
dots.push(new Revision(120,120,"grey","private","3a"));
dots.push(new Revision(50,190,"orange","public","2"));
dots.push(new Revision(120,260,"grey","private","2b"));
dots.push(new Revision(120,330,"grey","private","2a"));
dots.push(new Revision(50,400,"orange","public","1"));

var revisionTree:RevisionTree = new RevisionTree("revision-tree",dots);
revisionTree.width = 180;
revisionTree.height = 600;
