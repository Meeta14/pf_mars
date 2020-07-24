var Util     = require('../core/Util.js');

class CellAttributes {
    constructor(node){
      this.parent = node;
    }
}

function BreadthFS(obj){
  if(obj == undefined || obj.diagonal == undefined ){this.diagonal=false;}
    else{this.diagonal=obj.diagonal}
if(obj==undefined || obj.dontCrossCorners ==undefined){this.dontCrossCorners = false;}
      else{this.dontCrossCorners =obj.dontCrossCorners;}
}

BreadthFS.prototype.findPath = function(startX, startY, endX, endY, grid){
  // check if source and destination is inside the grid
     sourceNode = grid.getNodeAt(startX, startY);
     endNode =  grid.getNodeAt(endX, endY);

 // check if either of the source or destination is blocked
    if(!grid.isWalkableAt(startX, startY) || !grid.isWalkableAt(endX, endY)){return [];}

    // check if source and destination is same
    if(sourceNode.x == endNode.x && sourceNode.y == endNode.y){return [];}

    var openList = [];
    // var foundDest = false;
    // making 2d array for visited list
    var values = grid.dimention();
    closedList=[];
    var i,j;
    for(i = 0; i < values[1]; ++i){
      closedList.push([]);
      for(j = 0; j < values[0]; ++j){
        closedList[i].push(false);
      }// end for
   }// end for

   // 2d array that holds details of cell i.e parents of cell
   let cellDetails = [];

   for(let i = 0; i < values[1]; i++) {
      for (let j = 0; j < values[0]; j++){
           cellDetails[i] = [...(cellDetails[i] ? cellDetails[i] : []),
               new CellAttributes(-1)
      ];
     }
 }
    // parameters of starting node
   cellDetails[sourceNode.x][sourceNode.y].parent = sourceNode;

    idx = 0;
    openList.push(sourceNode);
    sourceNode.opened = true;
    cond = true;
    while(cond){
      //current cell in consideration
         cell=openList[idx];
         idx = idx+1;
         closedList[cell.x][cell.y] = true;
         cell.closed = true;
         //if dest is found
         if(cell.x == endNode.x && cell.y == endNode.y ){
             return Util.backtrace(cellDetails, endNode);
         }
         //get neighbours
         [neighbours,weights] = grid.getNeighbours(cell,this.diagonal, true, this.dontCrossCorners)
         for (var i = 0; i < weights.length; i++) {
            //if it's in closed list or already in open list then ignore, else upsate it's parameter and push in open list
            if(!(closedList[neighbours[i].x][neighbours[i].y] == true || neighbours[i].opened == true)){
               openList.push(neighbours[i]);
               neighbours[i].opened = true;
               cellDetails[neighbours[i].x][neighbours[i].y].parent = cell;
            }//if
         }// end for loop
         cond = openList.length != idx;
    } //end while loop

      console.log('not found');
      return 0;
    };

module.exports = BreadthFS;
