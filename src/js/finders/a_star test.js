var Node = require('../core/Node.js')
var Grid = require('../core/Grid.js')
var A_star = require('./A_star.js')
var Distance = require('./distance.js')
var astar = new A_star(Distance.euclidean);
//
// // var Dijkstra = require('../finder/Dijkstra.js')
// // var dj = new Dijkstra();
// //
// // var BFS = require('../finder/BreadthFirstSearch.js')
// // var bf = new BFS();
//
// //
var grid = new Grid(20,20);
var startX = 5;
var  startY = 5;
var endX = 5;
var endY = 9;
grid.setHillAt(5,6, true)
// grid.setHillAt(1,0, true)
// nodeA.hill = true
// console.log(nodeA)
// var start=new Node(0,0);
// [n,w]=grid.getNeighbours(start);
// console.log(n,w)
// console.log(grid.isterrain(0,1,start))
// var block=[[3,1],[3,0],[3,2],[3,3],[3,4],[3,5],[3,6],[3,7],[3,8],[6,9],[6,8],[7,6],[7,7],[7,8]];
// var block=[[2,4],[2,3],[2,2],[4,2]];
// var terrain = [];
// console.log(bf.findPath(startX, startY, endX, endY, grid, block, terrain))
// console.log(dj.findPath(startX, startY, endX, endY, grid, block, terrain))
console.log(astar.findPath(startX, startY, endX, endY, grid))
// var a
// function Asta(obj){
//     this.hype = obj.htype || 'a';
//     console.log(this.htye)
//     // if(obj.htype){this.htype = Distance.manhattan}
//     // else{this.htpe = obj.htpe}
// }
// var as = new Asta()

// var nodeA=new Node(2,2);
// var nodeB=new Node(2,2);
// console.log(nodeA.isEqual(nodeB))
