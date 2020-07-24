var Distance = require('./distance.js')
var Util     = require('../core/Util.js')
var PriorityQueue=require('./PQ.js')

class CellAttributes {
    constructor(f, node){
      this.f = f;
      this.parent = node;
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

    var openList = new PriorityQueue(comparator = (nodeA, nodeB) => cellDetails[nodeA.x][nodeA.y].f < cellDetails[nodeB.x][nodeB.y].f);
    var foundDest = false;
    // making 2d array for closed list
    var values = [grid.height,grid.width];
    let cellDetails = [];

    for(let i = 0; i < values[1]; i++) {
        for (let j = 0; j < values[0]; j++){
            cellDetails[i] = [...(cellDetails[i] ? cellDetails[i] : []),
                new CellAttributes(Number.MAX_VALUE ,-1)
        ];
      }
  }
    // parameters of starting node
    cellDetails[sourceNode.x][sourceNode.y].f = 0.0;
    cellDetails[sourceNode.x][sourceNode.y].parent = sourceNode;

    openList.push(sourceNode);

    sourceNode.opened=true;

    while(!openList.isEmpty()){
        cell=openList.pop();
        cell.opened=false;
        cell.closed = true;

//if dest is found then return
        if(cell.x == endNode.x && cell.y == endNode.y ){
            return Util.backtrace(cellDetails, endNode);
        }
        //get neighbours
        [neighbours,weights] = grid.getNeighbours(cell,this.diagonal, true, this.dontCrossCorners)
        for (var i = 0; i < weights.length; i++) {

            //if dest is still in open list
        if(!neighbours[i].closed){
        	newf=cellDetails[cell.x][cell.y].f+weights[i];

            //if the node is still un inspected
            if(cellDetails[neighbours[i].x][neighbours[i].y].f==Number.MAX_VALUE){
                neighbours[i].opened=true;
                cellDetails[neighbours[i].x][neighbours[i].y].f=newf;
                openList.push(neighbours[i]);
                cellDetails[neighbours[i].x][neighbours[i].y].parent=cell;
            }
            // or if there is a path that leads to same node with less number of steps
            else if(newf<cellDetails[neighbours[i].x][neighbours[i].y].f){
                neighbours[i].opened=true;
                cellDetails[neighbours[i].x][neighbours[i].y].f=newf;
                openList._siftUp();
                cellDetails[neighbours[i].x][neighbours[i].y].parent=cell;

                }//else
            }//if
        }// end for loop
    } //end while loop

    console.log('not found');
    return 0;
 };
module.exports=Dijkstra;
