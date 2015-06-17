/// <reference path="references.ts" />

class Panel {
    private _parent:JQuery;
    constructor(parent:JQuery) {
        this._parent = parent;
        this.createPanel();
    }
    createPanel():void {
        let panel = '<div class="panel">this is a panel</div>';
        this._parent.append(panel);
    }
}
