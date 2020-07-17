var Distance = require('./distance.js')
var Util     = require('../core/Util.js')
var PriorityQueue=require('./PQ.js')

class CellAttributes {
    constructor(f, i, j){
      this.f = f;
      this.parent_i = i
      this.parent_j = j
    }
}

function Dijkstra(obj){
    if(obj == undefined || obj.diagonal == undefined ){this.diagonal=false;}
    else{this.diagonal=obj.diagonal}
    if(obj==undefined || obj.dontCrossCorners ==undefined){this.dontCrossCorners = false;}
       else{this.dontCrossCorners =obj.dontCrossCorners;}
}


Dijkstra.prototype.findPath = function(startX, startY, endX, endY, grid){
// check if source and destination is inside the grid // TODO: see input is valid ouside the func before givig input?
   sourceNode = grid.getNodeAt(startX, startY);
   endNode =  grid.getNodeAt(endX, endY);
// check if either of the source or destination is blocked
    if(!grid.isWalkableAt(startX, startY) || !grid.isWalkableAt(endX, endY)){return [];}
    // check if source and destination is same
    if(sourceNode.x == endNode.x && sourceNode.y == endNode.y){return [];}

    // var openList = [];
    var openList = new PriorityQueue(comparator = (nodeA, nodeB) => cellDetails[nodeA.x][nodeA.y].f < cellDetails[nodeB.x][nodeB.y].f);
    var foundDest = false;
    // making 2d array for closed list
    var values = [grid.height,grid.width];
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

// // TODO: check if same node is being pushed (can it be pushed?)
    openList.push(sourceNode);

    sourceNode.opened=true;

    var foundDest = false; //flag variable to check if destination has been found


    while(!openList.isEmpty()){
        cell=openList.pop();
        cell.opened=false;
        cell.closed = true;

        // console.log(cell);
        //get neighbours
        [neighbours,weights] = grid.getNeighbours(cell,this.diagonal, true, this.dontCrossCorners)
        for (var i = 0; i < weights.length; i++) {
        	if(!neighbours[i].closed){

        	if(neighbours[i].x==endNode.x && neighbours[i].y == endNode.y){
        	foundDest=true;
        	cellDetails[neighbours[i].x][neighbours[i].y].parent_i=cell.x;
        	cellDetails[neighbours[i].x][neighbours[i].y].parent_j=cell.y;
        	break;
        }
        else{
        	newf=cellDetails[cell.x][cell.y].f+weights[i];
        	// if(newf<cellDetails[neighbours[i].x][neighbours[i].y].f){
        	// 	neighbours[i].opened=true;
        	// 	cellDetails[neighbours[i].x][neighbours[i].y].f=newf;
        	// 	openList.push(neighbours[i]);
        	// 	cellDetails[neighbours[i].x][neighbours[i].y].parent_i=cell.x;
        	// 	cellDetails[neighbours[i].x][neighbours[i].y].parent_j=cell.y;

        	// }
            if(cellDetails[neighbours[i].x][neighbours[i].y].f==Number.MAX_VALUE){
                neighbours[i].opened=true;
                cellDetails[neighbours[i].x][neighbours[i].y].f=newf;
                openList.push(neighbours[i]);
                cellDetails[neighbours[i].x][neighbours[i].y].parent_i=cell.x;
                cellDetails[neighbours[i].x][neighbours[i].y].parent_j=cell.y;
            }
            else if(newf<cellDetails[neighbours[i].x][neighbours[i].y].f){
                neighbours[i].opened=true;
                cellDetails[neighbours[i].x][neighbours[i].y].f=newf;
                // openList.push(neighbours[i]);
                openList._siftUp();
                cellDetails[neighbours[i].x][neighbours[i].y].parent_i=cell.x;
                cellDetails[neighbours[i].x][neighbours[i].y].parent_j=cell.y;

            }
        }
            if(foundDest){break}
            }
        }// end for loop
            if(foundDest){break}
    } //end while loop

     if (foundDest == 0) {return 'not found'}
     else{
         // console.log(closedList)
         // console.log(cellDetails)
         return Util.backtrace2(cellDetails, endNode)}
 };
module.exports=Dijkstra;
