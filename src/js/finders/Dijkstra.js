var PriorityQueue=require('./PQ.js')
var Util     = require('../core/Util.js')
// var Node = require('../core/Node.js');

class CellAttributes {
    constructor(f, i, j){
      this.f = f;
      this.parent_i=i;
			this.parent_j=j;
    }
}

function Dijkstra(obj){
	if(obj == undefined || obj.diagonal == undefined ){this.diagonal=false;}
    else{this.diagonal=obj.diagonal}
}

Dijkstra.prototype.findPath= function(startX, startY, endX, endY, grid){

// check if source and destination is inside the grid // TODO: see input is valid ouside the func before givig input?
   sourceNode = grid.getNodeAt(startX, startY);
   endNode =  grid.getNodeAt(endX, endY);

// check if either of the source or destination is blocked
    if(!grid.isWalkableAt(startX, startY) || !grid.isWalkableAt(endX, endY)){return [];}

    // check if source and destination is same
    if(sourceNode.x == endNode.x && sourceNode.y == endNode.y){return [];}

    var values =  grid.dimention();
    //declaring openlist as priority queue(it is ordered according to f value)
    var  openList= [];
    // new PriorityQueue(comparator = (nodeA, nodeB) => cellDetails[nodeA.x][nodeA.y].f < cellDetails[nodeB.x][nodeB.y].f);

    // 2d array that holds details of cell
    let cellDetails = [];

    for(let i = 0; i < values[1]; i++) {
        for (let j = 0; j < values[0]; j++){
            cellDetails[i] = [...(cellDetails[i] ? cellDetails[i] : []),
                new CellAttributes(Number.MAX_VALUE , -1, -1)
        ];
      }
  }
    // parameters of starting node
    cellDetails[sourceNode.x][sourceNode.y].f = 0.0;
		cellDetails[sourceNode.x][sourceNode.y].parent_i = sourceNode.x;
    cellDetails[sourceNode.x][sourceNode.y].parent_j = sourceNode.y;

    openList.push(sourceNode);
    sourceNode.opened=true;

    var foundDest = false; //flag variable to check if destination has been found

		while(openList.length!= 0){

	    	cell=openList[0]
				openList.splice(0, 1)
				cell.closed = true;
	    	// var min=Number.MAX_VALUE;
				[neighbours,weights] = grid.getNeighbours(cell,this.diagonal)
				// console.log(neighbours, weights)
				for (var i = 0; i < weights.length; i++) {
						if(neighbours[i].x == endNode.x && neighbours[i].y == endNode.y){
							cellDetails[neighbours[i].x][neighbours[i].y].parent_i = cell.x;
							cellDetails[neighbours[i].x][neighbours[i].y].parent_j = cell.y;
							foundDest=true;
							break;
						}
						else if(neighbours[i].closed == false){
									fnew = cellDetails[cell.x][cell.y].f + weights;
									if(cellDetails[neighbours[i].x][neighbours[i].y].f == Number.MAX_VALUE || cellDetails[neighbours[i].x][neighbours[i].y].f > fnew){
							            openList.push(neighbours[i]);
							            neighbours[i].opened = true;
							            cellDetails[neighbours[i].x][neighbours[i].y].f = fnew;
							            cellDetails[neighbours[i].x][neighbours[i].y].parent_i = cell.x;
							            cellDetails[neighbours[i].x][neighbours[i].y].parent_j = cell.y;
							            }
							        }
						}//end for loop
						console.log(openList)
						if(foundDest){break};
	        } //end while loop


     if (foundDest == 0) {return 'not found'}
     else{return Util.backtrace2(cellDetails, endNode)}
 }

module.exports=Dijkstra;
