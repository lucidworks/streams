<!DOCTYPE html>
<html>
<meta charset="utf-8">
<head>
<style>

.node {
  stroke: #fff;
  stroke-width: 1.5px;
}

.russian {
  stroke: red;
}

.link {
  fill: none;
  stroke: #bbb;
}

</style>
<svg width="1920" height="1080"></svg>
<script src="https://d3js.org/d3.v4.min.js"></script>
</head>
<body>
mexico election :: presidential candidate's source targets ::
% if rt=="1":
retweets ON :: 
% else:
retweets OFF :: 
%end

<a href="?rt=1">RT+</a>
<a href="?rt=0">RT-</a>
:: russian bots in black :: click to inspect node :: ctrl/cmd-click to twitter

<script>
var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var color = d3.scaleOrdinal(d3.schemeCategory10);

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().distance(10).strength(0.3))
    .force("charge", d3.forceManyBody().strength(-10))
    .force("center", d3.forceCenter(width / 2, height / 2));

d3.json("http://35.224.161.52/api/candidates?field=userScreenName_t&ip=35.233.253.193&rt={{rt}}", function(error, graph) {
  if (error) throw error;

  var nodes = graph.nodes,
      nodeById = d3.map(nodes, function(d) { return d.id; }),
      links = graph.links,
      bilinks = [];

  links.forEach(function(link) {
    var s = link.source = nodeById.get(link.source),
        t = link.target = nodeById.get(link.target),
        i = {}; // intermediate node
    nodes.push(i);
    links.push({source: s, target: i}, {source: i, target: t});
    bilinks.push([s, i, t]);
  });

  var link = svg.selectAll(".link")
    .data(bilinks)
    .enter().append("path")
      .attr("class", "link");

  var node = svg.selectAll(".node")
    .data(nodes.filter(function(d) { return d.id; }))
    .enter().append("circle")
      .attr("class", "node")
      .attr("r", 5)
      .attr("fill", function(d) { 
        if (/\d{8}/.test(d.id)) {
            // no color
        } else {
            return color(d.group); 
        }
      })
      .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));
                                                                                             
  node.on("click", function(d){
    if (d3.event.ctrlKey || d3.event.metaKey) {
        window.open("https://twitter.com/"+d.id);
    }
    window.open("mexico-account?q="+d.id+"&rt={{rt}}");
  });

  node.append("title")
      .text(function(d) { return d.id; });

  simulation
      .nodes(nodes)
      .on("tick", ticked);

  simulation.force("link")
      .links(links);

  function ticked() {
    link.attr("d", positionLink);
    node.attr("transform", positionNode);
  }
});

function positionLink(d) {
  return "M" + d[0].x + "," + d[0].y
       + "S" + d[1].x + "," + d[1].y
       + " " + d[2].x + "," + d[2].y;
}

function positionNode(d) {
  return "translate(" + d.x + "," + d.y + ")";
}

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x, d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x, d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null, d.fy = null;
}

</script>                                                                              
</body>
</html>
