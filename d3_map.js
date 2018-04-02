(function(){

var height = 600,
    width = 900,
    projection = d3.geoMercator(),
    mexico = void 0;

    var geoID = function(d) {
      return "c" + d.properties.ID_1;
    };

    var click = function(d){
      d3.selectAll('path').attr('fill-opacity',0.2)
      d3.select('#' + geoID(d)).attr('fill-opacity', 1);
    };



var path = d3.geoPath().projection(projection);
var svg = d3.select('#map')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

// getting geo data
d3.json('geo-data.json').then(function(data){
  var states = topojson.feature(data, data.objects.MEX_adm1);
  // set up scale and translate
  var b, s, t;
  projection.scale(1).translate([0, 0]);
  var b = path.bounds(states.features[5]);
  var s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height);
  var t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];
  projection.scale(s).translate(t);

  var map = svg.append('g').attr('class', 'boundry');

  mexico = map.selectAll('path').data(states.features);
  var color = d3.scaleLinear().domain([0,33]).range(['red', 'yellow']);

  // enter
  mexico.enter()
    .append('path')
    .attr('d', path)
    .attr('id', geoID)
    .on("click", click)
    .attr('fill', function(d,i){
      return color(i);
    });

});

})();
