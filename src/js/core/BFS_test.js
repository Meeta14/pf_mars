var PQ=require('../finders/PQ.js')
var Node=require('./Node.js')
var Grid=require('./grid.js')
// var BFS=require('../finders/BestFirstSearch.js')
// var BFS=require('../finders/Dijkstra.js')
var BFS=require('../finders/BreadthFirstSearch.js')
// var BFS=require('../finders/A_star.js')


var bfs=new BFS();
var grid=new Grid(10,15);

// grid.setWalkableAt(0,1,0);
startX=5;
startY=5;
endX=9;
endY=11;
// grid.setHillAt()
console.log(bfs.findPath(startX, startY, endX, endY,grid))
