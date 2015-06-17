/// <reference path="references.ts" />
var Panel = (function () {
    function Panel(parent) {
        this._parent = parent;
        this.createPanel();
    }
    Panel.prototype.createPanel = function () {
        var panel = '<div class="panel">this is a panel</div>';
        this._parent.append(panel);
    };
    return Panel;
})();
