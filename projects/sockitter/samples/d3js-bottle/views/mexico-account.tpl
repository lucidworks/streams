<!DOCTYPE html>
<meta charset="utf-8">

<head>
<style>

  .bar{
    fill: steelblue;
  }

  .bar:hover{
    fill: brown;
  }

  .axis {
    font: 15px sans-serif;
  }

  .axis path,
  .axis line {
    fill: none;
    stroke: #000;
    shape-rendering: crispEdges;
  }

</style>
</head>

<body>
<a href="javascript:window.close();">close</a> :: <a target=_blank href="https://twitter.com/{{q}}">{{q}} twitter</a> ::  
% if rt=="1":
retweets ON :: 
% else:
retweets OFF :: 
%end

<a href="?q={{q}}&rt=1&field={{field}}">RT+</a>
<a href="?q={{q}}&rt=0&field={{field}}">RT-</a>
::
% if field=="userScreenName_t":
list of screenNames mentioning this account
% else:
switch to <a href="?q={{q}}&rt=0&field=userScreenName_t">userScreenNames</a>
%end
::
% if field=="tagText_t":
co-mentioned tagTexts
% else:
switch to <a href="?q={{q}}&rt=0&field=tagText_t">tagText</a>
%end
::
% if field=="inReplyToScreenName_s":
replied TO or FROM these screenNames
% else:
switch to <a href="?q={{q}}&rt=0&field=inReplyToScreenName_s">inReplyToScreenName</a>
%end
:: ctrl/cmd-click to search related terms 
:: no graph? no data




<script src="http://d3js.org/d3.v3.min.js"></script>
<script>
// set the dimensions of the canvas
var margin = {top: 20, right: 20, bottom: 180, left: 80},
    width = 1280 - margin.left - margin.right,
    height = 640 - margin.top - margin.bottom;

// set the ranges
var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

var y = d3.scale.linear().range([height, 0]);

// define the axis
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);


// add the SVG element
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

// load the data
d3.json("http://35.224.161.52/api/account?q={{q}}&ip=35.233.253.193&rt={{rt}}&field={{field}}", function(error, data) {

    data.forEach(function(d) {
        d.id = d.id;
        d.value = +d.value;
    });
    
  // scale the range of the data
  x.domain(data.map(function(d) { return d.id; }));
  y.domain([0, d3.max(data, function(d) { return d.value; })]);

  // add axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );


  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 5)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("count")


  // Add bar chart
  svg.selectAll("bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.id); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.value); })
      .on("click", function(d) { 
          if (d3.event.ctrlKey || d3.event.metaKey) {
            window.open("mexico-relation?q="+d.id)
          } else {
            window.open("?q="+d.id+"&rt={{rt}}") 
          }
      })

      .attr("height", function(d) { return height - y(d.value); });

});

</script>



</body>
