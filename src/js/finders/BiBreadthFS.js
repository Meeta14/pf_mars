var Util     = require('../core/Util.js');
// var Node = require('../core/Node.js');

class CellAttributes {
    constructor(node, a){
      this.parent = node;
      this.visitedBy = a;
    }
}

function BiBreadthFS(obj){
  if(obj == undefined || obj.diagonal == undefined ){this.diagonal=false;}
    else{this.diagonal=obj.diagonal}
}

BiBreadthFS.prototype.findPath = function(startX, startY, endX, endY, grid){
  // check if source and destination is inside the grid
     sourceNode = grid.getNodeAt(startX, startY);
     endNode =  grid.getNodeAt(endX, endY);

 // check if either of the source or destination is blocked
    if(!grid.isWalkableAt(startX, startY) || !grid.isWalkableAt(endX, endY)){return [];}

    // check if source and destination is same
    if(sourceNode.x == endNode.x && sourceNode.y == endNode.y){return [];}

    var openListstart = [];
    var openListend  = [];
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
               new CellAttributes(-1, -1)
      ];
     }
 }
    // parameters of starting node
   cellDetails[sourceNode.x][sourceNode.y].parent = sourceNode;
   cellDetails[endNode.x][endNode.y].parent = endNode;

    idx1 = 0;
    openListstart.push(sourceNode);
    sourceNode.opened = true;
    cond1 = true;

    idx2 = 0;
    openListend.push(endNode);
    endNode.opened = true;
    cond2 = true;

    fromstart = 1;
    fromend   = 2;

    while(cond1 && cond2){
      // console.log(openList)
      //current cell in consideration
         cell=openListstart[idx1];
         idx1 = idx1+1;
         // openList.shift()
         closedList[cell.x][cell.y] = true;
         cell.closed = true;
         //get neighbours
         [neighbours,weights] = grid.getNeighbours(cell,this.diagonal)

         for (var i = 0; i < weights.length; i++) {
            // check if the neighbour is the endnode
            if(cellDetails[neighbours[i].x][neighbours[i].y].visitedBy == fromend){
               // foundDest = true;
               let path1= Util.backtrace(cellDetails, neighbours[i]);   //path from endNode to neighbour
               let path2=Util.backtrace(cellDetails, cell);    //path from sourceNode to cell
               return path2.concat(path1.reverse());
               // let path=path2.concat(path1.reverse());
               // console.log("check1",path[0][0]==sourceNode.x && path[0][1]==sourceNode.y);
               // return path;
            }
            // if it is not blocked(get neighbour func takes care of it) and not visited yet
            else if(!(closedList[neighbours[i].x][neighbours[i].y] == true || neighbours[i].opened == true)){
               openListstart.push(neighbours[i]);
               // closedList[neighbours[i].x][neighbours[i].y] = true;
               neighbours[i].opened = true;
               // console.log(cell)
               cellDetails[neighbours[i].x][neighbours[i].y].parent = cell;
               cellDetails[neighbours[i].x][neighbours[i].y].visitedBy = fromstart;
            }
         }// end for loop
             // if(foundDest){break}

       //fromend
            cell=openListend[idx2];
            idx2 = idx2+1;
            // openList.shift()
            closedList[cell.x][cell.y] = true;
            cell.closed = true;
            //get neighbours
            [neighbours,weights] = grid.getNeighbours(cell,this.diagonal)
            for (var i = 0; i < weights.length; i++) {
               // check if the neighbour is the endnode
               if(cellDetails[neighbours[i].x][neighbours[i].y].visitedBy == fromstart){
                  // neighbours[i].closed = true;
                  // cellDetails[neighbours[i].x][neighbours[i].y].parent = cell;
                  // foundDest = true;
                  let path1= Util.backtrace(cellDetails, cell);   //path from endNode to neighbour
                  let path2=Util.backtrace(cellDetails, neighbours[i]);    //path from sourceNode to cell
                  return path2.concat(path1.reverse());
                  // let path=path2.concat(path1.reverse());
                  // console.log("check2",path[0][0]==sourceNode.x && path[0][1]==sourceNode.y);
                  // return path;
               }
               // if it is not blocked(get neighbour func takes care of it) and not visited yet
               else if(!(closedList[neighbours[i].x][neighbours[i].y] == true || neighbours[i].opened == true)){
                  openListend.push(neighbours[i]);
                  // closedList[neighbours[i].x][neighbours[i].y] = true;
                  neighbours[i].opened = true;
                  // console.log(cell)
                  cellDetails[neighbours[i].x][neighbours[i].y].parent = cell;
                  cellDetails[neighbours[i].x][neighbours[i].y].visitedBy = fromend;
               }
            }// end for loop
                // if(foundDest){break}

             // console.log(openList)
         cond1 = openListstart.length != idx1;
         cond2 = openListend.length != idx2;
    } //end while loop

      return 'not found'
    };

module.exports = BiBreadthFS;
