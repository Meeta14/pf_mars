var PriorityQueue=require('./PQ.js')
var Util     = require('../core/Util.js')
// var Node = require('../core/Node.js');

class CellAttributes {
    constructor(f, node){
      this.f = f;
      this.parent=node;
    }
}

function Dijkstra(obj){

}

Dijkstra.prototype.findPath= function(startX, startY, endX, endY, grid){

// check if source and destination is inside the grid // TODO: see input is valid ouside the func before givig input?
   sourceNode = grid.getNodeAt(startX, startY);
   endNode =  grid.getNodeAt(endX, endY);

// check if either of the source or destination is blocked
    if(!grid.isWalkableAt(startX, startY) || !grid.isWalkableAt(endX, endY)){return [];}

    // check if source and destination is same
    if(sourceNode.x == endNode.x && sourceNode.y == endNode.y){return [];}

    var values = grid.dimention();
    //declaring openlist as priority queue(it is ordered according to f value)
    var openList = new PriorityQueue(comparator = (nodeA, nodeB) => cellDetails[nodeA.x][nodeA.y].f < cellDetails[nodeB.x][nodeB.y].f);

    // 2d array that holds details of cell
    let cellDetails = [];

    for(let i = 0; i < values[0]; i++) {
        for (let j = 0; j < values[1]; j++){
            cellDetails[i] = [...(cellDetails[i] ? cellDetails[i] : []),
                new CellAttributes(Number.MAX_VALUE , -1, -1)
        ];
      }
  }
    // parameters of starting node
    cellDetails[sourceNode.x][sourceNode.y].f = 0.0;
    cellDetails[sourceNode.x][sourceNode.y].parent = sourceNode;

    openList.push(sourceNode);
    sourceNode.opened=true;

    var foundDest = false; //flag variable to check if destination has been found

		while(openList.size() != 0){
	    	cell=openList.pop()
	    	var min=Number.MAX_VALUE;

	        if(cell.x == endNode.x && cell.y == endNode.y){
	        	foundDest=true;
	        	break;
	        }
	        else{
	          cell.opened=false;
		        cell.closed = true;
		        //get neighbours
		        [neighbours,weights] = grid.getNeighbours(cell)  //neighbours
		        var i;
		        for(i=0;i<neighbours.length;++i){
		        	newg=cellDetails[cell.x][cell.y].f+weights[i]
		        	cellDetails[neighbours[i].x][neighbours[i].y].g=Math.min(newg,cellDetails[neighbours[i].x][neighbours[i].y].g);

		        }
		        neighbours.forEach(function(node){
							if(!node.closed){
								openList.push(node);
								node.opened=true;
								cellDetails[node.x][node.y].parent=cell;
							}});
		    }

	    } //end while loop

     if (foundDest == 0) {return 'not found'}
     else{return Util.backtrace(cellDetails, endNode)}
 }

module.exports=Dijkstra;
