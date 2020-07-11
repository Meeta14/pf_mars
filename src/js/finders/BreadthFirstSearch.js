var Util     = require('../core/Util.js');
// var Node = require('../core/Node.js');

class CellAttributes {
    constructor(node){
      this.parent = node;
    }
}

function BreadthFS(obj){}

BreadthFS.prototype.findPath = function(startX, startY, endX, endY, grid){
  // check if source and destination is inside the grid
     sourceNode = grid.getNodeAt(startX, startY);
     endNode =  grid.getNodeAt(endX, endY);

 // check if either of the source or destination is blocked
    if(!grid.isWalkableAt(startX, startY) || !grid.isWalkableAt(endX, endY)){return [];}

    // check if source and destination is same
    if(sourceNode.x == endNode.x && sourceNode.y == endNode.y){return [];}

    var openList = [];
    var foundDest = false;
    // making 2d array for visited list
    var values = grid.dimention();
   //  closedList=[];
   //  var i,j;
   //  for(i = 0; i < values[0]; ++i){
   //    closedList.push([]);
   //    for(j = 0; j < values[1]; ++j){
   //      closedList[i].push(false);
   //    }// end for
   // }// end for

   // 2d array that holds details of cell i.e parents of cell
   let cellDetails = [];

   for(let i = 0; i < values[0]; i++) {
      for (let j = 0; j < values[1]; j++){
           cellDetails[i] = [...(cellDetails[i] ? cellDetails[i] : []),
               new CellAttributes(-1)
      ];
     }
 }
 console.log(cellDetails)
    // parameters of starting node
   cellDetails[sourceNode.x][sourceNode.y].parent = sourceNode;


    openList.push(sourceNode);
    sourceNode.opened = true;

    while(openList.length != 0){
      // console.log(openList)
      //current cell in consideration
        cell = openList.pop()
        // closedList[cell.x][cell.y] = true;
        cell.closed = true;
         //get neighbours
         [neighbours,weights] = grid.getNeighbours(cell)
         for (var i = 0; i < weights.length; i++) {
            // check if the neighbour is the endnode
            if(neighbours[i].x == endNode.x && neighbours[i].y == endNode.y){
               // closedList[neighbours[i].x][neighbours[i].y] = true;
               neighbours[i].closed = true;
               cellDetails[neighbours[i].x][neighbours[i].y].parent = cell;
               foundDest = true;
            }
            // if it is not blocked(get neighbour func takes care of it) and not visited yet
            else if(neighbours[i].closed !=  true && grid.isInside(endX, endY)){
               openList.push(neighbours[i]);
               // closedList[neighbours[i].x][neighbours[i].y] = true;
               neighbours[i].opened = true;
               console.log(cell)
               cellDetails[neighbours[i].x][neighbours[i].y].parent = cell;
            }


         }// end for loop
             if(foundDest){break}
    } //end while loop

      if (foundDest == 0) {return 'not found'}
      else{return Util.backtrace(cellDetails, endNode)}
    };

module.exports = BreadthFS;
