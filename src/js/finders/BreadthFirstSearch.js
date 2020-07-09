var Util     = require('./util.js');

class CellAttributes {
    constructor(i, j){
      this.parent_i = i
      this.parent_j = j
    }
}

function BreadthFS(obj){}

BreadthFS.prototype.findPath = function(startX, startY, endX, endY, grid, block, terrain){
  // check if source and destination is inside the grid
     sourceNode = grid.getNodeAt(startX, startY);
     endNode =  grid.getNodeAt(endX, endY);

 // check if either of the source or destination is blocked
    if(grid.isBlock(startX, startY, block) || grid.isBlock(endX, endY, block)){return [];}

    // check if source and destination is same
    if(sourceNode.isEqual(endNode)){return [];}

    var openList = [];
    var foundDest = false;
    // making 2d array for visited list
    var values = grid.dimention();
    closedList=[];
    var i,j;
    for(i = 0; i < values[0]; ++i){
      closedList.push([]);
      for(j = 0; j < values[1]; ++j){
        closedList[i].push(false);
      }// end for
   }// end for

   // 2d array that holds details of cell i.e parents of cell
   let cellDetails = [];

   for(let i = 0; i < values[0]; i++) {
      for (let j = 0; j < values[1]; j++){
           cellDetails[i] = [...(cellDetails[i] ? cellDetails[i] : []),
               new CellAttributes(Number.MAX_VALUE , Number.MAX_VALUE , Number.MAX_VALUE , -1, -1)
      ];
     }
 }

    // parameters of starting node
   cellDetails[sourceNode.x][sourceNode.y].parent_i = sourceNode.x;
   cellDetails[sourceNode.x][sourceNode.y].parent_j = sourceNode.y;

    openList.push(sourceNode);

    while(openList.length != 0){
      //current cell in consideration
        cell = openList.pop()
        closedList[cell.x][cell.y] = true;
         //get neighbours
         [neighbours,weights] = grid.getNeighbours(cell, terrain, block)
         for (var i = 0; i < weights.length; i++) {
            // check if the neighbour is the endnode
            if(endNode.isEqual(neighbours[i])){
               closedList[neighbours[i].x][neighbours[i].y] = true;
               cellDetails[neighbours[i].x][neighbours[i].y].parent_i = cell.x;
               cellDetails[neighbours[i].x][neighbours[i].y].parent_j = cell.y;
               foundDest = true;
            }
            // if it is not blocked(get neighbour func takes care of it) and not visited yet
            else if(closedList[neighbours[i].x][neighbours[i].y] == false){
               openList.push(neighbours[i]);
               closedList[neighbours[i].x][neighbours[i].y] = true;
               cellDetails[neighbours[i].x][neighbours[i].y].parent_i = cell.x;
               cellDetails[neighbours[i].x][neighbours[i].y].parent_j = cell.y;
            }


         }// end for loop
             if(foundDest){break}
    } //end while loop

      if (foundDest == 0) {return 'not found'}
      else{return Util.backtrace(cellDetails, endNode)}
    };

module.exports = BreadthFS;
