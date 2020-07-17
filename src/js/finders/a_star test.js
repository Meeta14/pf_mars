var Node = require('../core/Node.js')
var Grid = require('../core/Grid.js')
// var A_star = require('./A_star_bi.js')
var A_star = require('./A_star.js')
var Distance = require('./distance.js')
var astar = new A_star(
          // obj.htype: Distance.euclidean,
          {diagonal: true});

var grid = new Grid(5,5);
var startX = 0;
var  startY = 0;
var endX = 4;
var endY = 4;
grid.setWalkableAt(2,2,false)
grid.setWalkableAt(1,3,false)
grid.setWalkableAt(3,1,false)
console.log(astar.findPath(startX, startY, endX, endY, grid))
