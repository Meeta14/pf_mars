var Distance = require('./distance.js')
var Util     = require('../core/Util.js')
var PriorityQueue=require('./PQ.js')

class CellAttributes {
    constructor(f, i, j,visitedby){
      this.f = f;
      this.parent_i = i
      this.parent_j = j
      this.visitedby=visitedby;
    }
}

function BiDijkstra(obj){
    if(obj == undefined || obj.diagonal == undefined ){this.diagonal=false;}
    else{this.diagonal=obj.diagonal}
}


BiDijkstra.prototype.findPath = function(startX, startY, endX, endY, grid){
// check if source and destination is inside the grid // TODO: see input is valid ouside the func before givig input?
   sourceNode = grid.getNodeAt(startX, startY);
   endNode =  grid.getNodeAt(endX, endY);
// check if either of the source or destination is blocked
    if(!grid.isWalkableAt(startX, startY) || !grid.isWalkableAt(endX, endY)){return [];}
    // check if source and destination is same
    if(sourceNode.x == endNode.x && sourceNode.y == endNode.y){return [];}

    // var openList = [];
    var openList_source = new PriorityQueue(comparator = (nodeA, nodeB) => cellDetails[nodeA.x][nodeA.y].f < cellDetails[nodeB.x][nodeB.y].f);
    var openList_end = new PriorityQueue(comparator = (nodeA, nodeB) => cellDetails[nodeA.x][nodeA.y].f < cellDetails[nodeB.x][nodeB.y].f);
    var values = [grid.height,grid.width];
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
    cellDetails[sourceNode.x][sourceNode.y].visitedby = 1;
    cellDetails[endNode.x][endNode.y].f = 0.0;
    cellDetails[endNode.x][endNode.y].parent_i = endNode.x;
    cellDetails[endNode.x][endNode.y].parent_j = endNode.y;
    cellDetails[endNode.x][endNode.y].visitedby = 2;

// // TODO: check if same node is being pushed (can it be pushed?)
    openList_source.push(sourceNode);
    openList_end.push(endNode);

    sourceNode.opened=true;
    endNode.opened=true;

    
    while(!openList_source.isEmpty() && !openList_end.isEmpty() ){
      //for source openList

        cell=openList_source.pop();
        cell.closed = true;
        //get neighbours
        [neighbours,weights] = grid.getNeighbours(cell,this.diagonal)
        for (var i = 0; i < weights.length; i++) {
          if(!neighbours[i].closed){
          
          if(cellDetails[neighbours[i].x][neighbours[i].y].visitedby==2){
          // cellDetails[neighbours[i].x][neighbours[i].y].parent_i=cell.x;
          // cellDetails[neighbours[i].x][neighbours[i].y].parent_j=cell.y;
          let path1= Util.backtrace2(cellDetails, neighbours[i]);   //path from endNode to neighbour
          let path2=Util.backtrace2(cellDetails, cell);    //path from sourceNode to cell
          let path=path2.concat(path1.reverse());
          console.log("check1",path[0][0]==sourceNode.x && path[0][1]==sourceNode.y);
          return path;
        }
        else{
          cellDetails[neighbours[i].x][neighbours[i].y].visitedby=1;
          newf=cellDetails[cell.x][cell.y].f+weights[i];
          if(newf<cellDetails[neighbours[i].x][neighbours[i].y].f){
            neighbours[i].opened=true;
            cellDetails[neighbours[i].x][neighbours[i].y].f=newf;
            openList_source.push(neighbours[i]);
            cellDetails[neighbours[i].x][neighbours[i].y].parent_i=cell.x;
            cellDetails[neighbours[i].x][neighbours[i].y].parent_j=cell.y;
          }
        }
            }  
        } // end for loop

      //for end openList 

        cell=openList_end.pop();
        cell.closed = true;
        //get neighbours
        [neighbours,weights] = grid.getNeighbours(cell,this.diagonal)
        for (var i = 0; i < weights.length; i++) {
          if(!neighbours[i].closed){
          
          if(cellDetails[neighbours[i].x][neighbours[i].y].visitedby==1){
          // cellDetails[neighbours[i].x][neighbours[i].y].parent_i=cell.x;
          // cellDetails[neighbours[i].x][neighbours[i].y].parent_j=cell.y;
          let path1= Util.backtrace2(cellDetails, cell);   //path from endNode to neighbour
          let path2=Util.backtrace2(cellDetails, neighbours[i]);    //path from sourceNode to cell
          let path=path2.concat(path1.reverse());
          console.log("check2",path[0][0]==sourceNode.x && path[0][1]==sourceNode.y);
          return path;
        }
        else{
          cellDetails[neighbours[i].x][neighbours[i].y].visitedby=2;
          newf=cellDetails[cell.x][cell.y].f+weights[i];
          if(newf<cellDetails[neighbours[i].x][neighbours[i].y].f){
            neighbours[i].opened=true;
            cellDetails[neighbours[i].x][neighbours[i].y].f=newf;
            openList_end.push(neighbours[i]);
            cellDetails[neighbours[i].x][neighbours[i].y].parent_i=cell.x;
            cellDetails[neighbours[i].x][neighbours[i].y].parent_j=cell.y;


          }
        }
            }
        }// end for loop


    } //end while loop

return "not found";

}
module.exports=BiDijkstra;
