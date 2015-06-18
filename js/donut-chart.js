/// <reference path="references.ts" />
var DonutChart = (function () {
    function DonutChart(elementId, width, height, colours, data) {
        this._elementId = elementId;
        this._width = width;
        this._height = height;
        this._radius = Math.min(width, height) / 2;
        this._colours = d3.scale.ordinal().range(colours);
        this._data = data;
        this._drawChart();
    }
    DonutChart.prototype._drawChart = function () {
        var that = this;
        var arc = d3.svg.arc()
            .innerRadius(this._radius - 60)
            .outerRadius(this._radius - 10);
        var pie = d3.layout.pie()
            .value(function (d) {
            return d["value"];
        })
            .sort(null);
        var svg = d3.select(this._elementId)
            .attr("width", this._width)
            .attr("height", this._height)
            .append("g")
            .attr("transform", "translate(" + this._radius + "," + this._radius + ")");
        var g = svg.selectAll(".arc")
            .data(pie(this._data))
            .enter().append("g")
            .attr("class", "arc");
        g.append("path")
            .attr("d", arc)
            .attr("fill", function (d, i) {
            return that._colours(i);
        }).transition()
            .ease("exp")
            .duration(2000)
            .attrTween("d", function (d) {
            var i = d3.interpolate({
                startAngle: 1.1 * Math.PI,
                endAngle: 1.1 * Math.PI
            }, d);
            return function (t) {
                return arc(i(t));
            };
        });
    };
    return DonutChart;
})();
