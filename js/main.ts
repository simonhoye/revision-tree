/// <reference path="references.ts" />

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


var colours:Array<string> = ["#f5a623","#417505","#d0021b","#9b9b9b"];
var data:Array<any> = [{
   "label": "Pending",
   "value": 45
}, {
   "label": "Accepted",
   "value": 25
}, {
   "label": "Rejected",
   "value": 25
}, {
   "label": "No Action",
   "value": 13
}];

var chart = new DonutChart("#chart1",650,200,colours,data);
