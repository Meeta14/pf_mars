var PriorityQueue=require('./PQ.js')
var Distance = require('./distance.js')
var Util     = require('../core/Util.js')

class CellAttributes {
    constructor(f, node){
      this.f = f;
      this.parent=node;
    }
}

function BestFirstSearch(obj){
	this.htype = Distance.manhattan
	// if(obj == undefined || obj.htype == undefined ){this.htype = Distance.manhattan}
 //    else{this.htype = obj.htype}

}

BestFirstSearch.prototype.findPath= function(startX, startY, endX, endY, grid){

// check if source and destination is inside the grid // TODO: see input is valid ouside the func before givig input?
   sourceNode = grid.getNodeAt(startX, startY);
   endNode =  grid.getNodeAt(endX, endY);

// check if either of the source or destination is blocked
    if(grid.isBlock(startX, startY) || grid.isBlock(endX, endY)){return [];}

    // check if source and destination is same
    if(sourceNode.isequal(endNode)){return [];}

    var values=[grid.height,grid.width]
    //declaring openlist as priority queue(it is ordered according to f value)
    var openList = new PriorityQueue(comparator = (nodeA, nodeB) => cellDetails[nodeA.x][nodeA.y].f < cellDetails[nodeB.x][nodeB.y].f);
    var foundDest = false;
    // making 2d array for closed list
    closedList=[];
    var i,j;
    for(i=0;i<values[0];++i){
      closedList.push([]);
      for(j=0;j<values[1];++j){
        closedList[i].push(false);
      }
    }
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

// // TODO: check if same node is being pushed (can it be pushed?)
    openList.push(sourceNode);
    while(openList.size() != 0){        
    	cell=openList.pop()
        if(cell.isequal(endNode)){
        	foundDest=true;
        	break;
        }
        else{
	        closedList[cell.x][cell.y] = true;
	        //get neighbours
	        [neighbours,_] = grid.getNeighbours(cell, [])  //neighbours
	        var i;
	        for(i=0;i<neighbours.length;++i){
	        	cellDetails[neighbours[i].x][neighbours[i].y].f=this.htype(neighbours[i].x, neighbours[i].y, endNode)
	        }
	        neighbours.forEach(function(node){if(!closedList[node.x][node.y]){openList.push(node);closedList[node.x][node.y]=true; cellDetails[node.x][node.y].parent=cell;}});
	    }

    } //end while loop

     if (foundDest == 0) {return 'not found'}
     else{return Util.backtrace(cellDetails, endNode)}
 }

module.exports=BestFirstSearch;