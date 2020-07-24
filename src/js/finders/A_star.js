var Distance = require('./distance.js')
var Util     = require('../core/Util.js')

class CellAttributes {
    constructor(f, g, h,node){
      this.g = g;
      this.f = f;
      this.h = h;
      this.parent = node;
    }
}

// Astar has attributes:-
// htype = type of h distace to be cal
function AstarSearch(obj){

    if(obj == undefined || obj.diagonal == undefined ){this.diagonal=false;}
    else{this.diagonal=obj.diagonal}

    if(obj==undefined || obj.weight ==undefined){this.weight=1;}
    else{this.weight=obj.weight;}

    if (this.diagonal === true) {
        if(obj == undefined || obj.htype == undefined  || obj.htype == Distance.manhattan){
            this.htype=Distance.octile;
        }
        else{
            this.htype=obj.htype;
        }

    }
    else {
        if(obj == undefined || obj.htype == undefined ){this.htype = Distance.manhattan}
        else{this.htype = obj.htype}
        }

    if(obj==undefined || obj.dontCrossCorners ==undefined){this.dontCrossCorners = false;}
    else{this.dontCrossCorners =obj.dontCrossCorners;}

}

AstarSearch.prototype.minFscore = function(openList,cellDetails){
    minF=cellDetails[openList[0].x][openList[0].y].f
    index = 0
    for(var i=1; i<openList.length; i++){
        if(cellDetails[openList[i].x][openList[i].y].f < minF){
            minF=cellDetails[openList[i].x][openList[i].y].f
            index=i
        }//  if f value is same then choose wrt h value
    }//end for
    return index
}//end function

AstarSearch.prototype.successor = function(cellDetails, cell, parentNode, endNode, weight, closedList, grid, openList){
    htype = this.htype;
// If the successor is already on the closed list or if it is blocked(the get neighbors fun takes care of it ie, does not return blocked neighbours), then ignore it. Else do the following
     if (closedList[cell.x][cell.y] == false ) {
        gnew = cellDetails[parentNode.x][parentNode.y].g + weight;
        if(grid.isValleyAt(cell.x, cell.y) || grid.isValleyAt( parentNode.x,  parentNode.y)) { factor = grid.valleyweight}
        else{factor = grid.normal}
        hnew =  this.weight*factor*htype(cell.x, cell.y, endNode)  //multiplying hnew with grid.normal to make sure that g and h have equal weightage
        fnew = gnew + hnew
        //

    // If the cell isn't in the oprn list or if it there and we have f cost less that the previous one then update it
        if(cellDetails[cell.x][cell.y].f == Number.MAX_VALUE || cellDetails[cell.x][cell.y].f > fnew){
            openList.push(cell);
            cell.opened = true;
            cellDetails[cell.x][cell.y].f = fnew;
            cellDetails[cell.x][cell.y].g = gnew;
            cellDetails[cell.x][cell.y].h = hnew;
            cellDetails[cell.x][cell.y].parent = parentNode;
            }
        }
};

AstarSearch.prototype.findPath = function(startX, startY, endX, endY, grid){


   sourceNode = grid.getNodeAt(startX, startY);
   endNode =  grid.getNodeAt(endX, endY);
// check if either of the source or destination is blocked
    if(!grid.isWalkableAt(startX, startY) || !grid.isWalkableAt(endX, endY)){return [];}
    // check if source and destination is same
    if(sourceNode.x == endNode.x && sourceNode.y == endNode.y){return [];}

    var openList = [];
    // making 2d array for closed list
    var values = grid.dimention();
    closedList=[];
    var i,j;
    for(i=0;i<values[1];++i){
      closedList.push([]);
      for(j=0;j<values[0];++j){
        closedList[i].push(false);
      }
    }
    // 2d array that holds details of cell
    let cellDetails = [];

    for(let i = 0; i < values[1]; i++) {
        for (let j = 0; j < values[0]; j++){
            cellDetails[i] = [...(cellDetails[i] ? cellDetails[i] : []),
                new CellAttributes(Number.MAX_VALUE , Number.MAX_VALUE , Number.MAX_VALUE , -1, )
        ];
      }
  }
    // parameters of starting node
    cellDetails[sourceNode.x][sourceNode.y].f = 0.0;
    cellDetails[sourceNode.x][sourceNode.y].g = 0.0;
    cellDetails[sourceNode.x][sourceNode.y].h = 0.0;
    cellDetails[sourceNode.x][sourceNode.y].parent = sourceNode;

// // TODO: check if same node is being pushed (can it be pushed?)
    openList.push(sourceNode);
    sourceNode.opened = true;

    while(openList.length != 0){
        index=this.minFscore(openList, cellDetails);
        cell=openList[index];

        if(index>-1){openList.splice(index, 1)}
        closedList[cell.x][cell.y] = true;
        cell.closed = true;

        if(cell.x == endNode.x && cell.y == endNode.y ){
            return Util.backtrace(cellDetails, endNode);
        }

        //get neighbours
        [neighbours,weights] = grid.getNeighbours(cell,this.diagonal, true, this.dontCrossCorners);
        for (var i = 0; i < weights.length; i++) {
            this.successor(cellDetails, neighbours[i], cell, endNode, weights[i], closedList, grid, openList);
        }// end for loop
    } //end while loop

//if not found
    console.log('not found');
    return 0;
 };

module.exports = AstarSearch;
