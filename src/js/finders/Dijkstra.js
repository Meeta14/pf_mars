// var PriorityQueue=require('./PQ.js')
// var Util     = require('../core/Util.js')
// // var Node = require('../core/Node.js');

// class CellAttributes {
//     constructor(f, i, j){
//       this.f = f;
//       this.parent_i=i;
// 			this.parent_j=j;
//     }
// }

// function Dijkstra(obj){
// 	if(obj == undefined || obj.diagonal == undefined ){this.diagonal=false;}
//     else{this.diagonal=obj.diagonal}
// }

// Dijkstra.prototype.findPath= function(startX, startY, endX, endY, grid){

// // check if source and destination is inside the grid // TODO: see input is valid ouside the func before givig input?
//    sourceNode = grid.getNodeAt(startX, startY);
//    endNode =  grid.getNodeAt(endX, endY);

// // check if either of the source or destination is blocked
//     if(!grid.isWalkableAt(startX, startY) || !grid.isWalkableAt(endX, endY)){return [];}

//     // check if source and destination is same
//     if(sourceNode.x == endNode.x && sourceNode.y == endNode.y){return [];}

//     var values =  grid.dimention();
//     //declaring openlist as priority queue(it is ordered according to f value)
//     var  openList= [];
//     // new PriorityQueue(comparator = (nodeA, nodeB) => cellDetails[nodeA.x][nodeA.y].f < cellDetails[nodeB.x][nodeB.y].f);

//     // 2d array that holds details of cell
//     let cellDetails = [];

//     for(let i = 0; i < values[1]; i++) {
//         for (let j = 0; j < values[0]; j++){
//             cellDetails[i] = [...(cellDetails[i] ? cellDetails[i] : []),
//                 new CellAttributes(Number.MAX_VALUE , -1, -1)
//         ];
//       }
//   }
//     // parameters of starting node
//     cellDetails[sourceNode.x][sourceNode.y].f = 0.0;
// 	cellDetails[sourceNode.x][sourceNode.y].parent_i = sourceNode.x;
//     cellDetails[sourceNode.x][sourceNode.y].parent_j = sourceNode.y;

//     openList.push(sourceNode);
//     sourceNode.opened=true;

//     var foundDest = false; //flag variable to check if destination has been found

// 		while(openList.length!= 0){

// 	    	cell=openList[0]
// 				openList.splice(0, 1)
// 				cell.closed = true;
// 	    	// var min=Number.MAX_VALUE;
// 				[neighbours,weights] = grid.getNeighbours(cell,this.diagonal)
// 				// console.log(neighbours, weights)
// 				for (var i = 0; i < weights.length; i++) {
// 						if(neighbours[i].x == endNode.x && neighbours[i].y == endNode.y){
// 							cellDetails[neighbours[i].x][neighbours[i].y].parent_i = cell.x;
// 							cellDetails[neighbours[i].x][neighbours[i].y].parent_j = cell.y;
// 							foundDest=true;
// 							break;
// 						}
// 						else if(neighbours[i].closed == false){
// 									fnew = cellDetails[cell.x][cell.y].f + weights;
// 									if(cellDetails[neighbours[i].x][neighbours[i].y].f == Number.MAX_VALUE || cellDetails[neighbours[i].x][neighbours[i].y].f > fnew){
// 							            openList.push(neighbours[i]);
// 							            neighbours[i].opened = true;
// 							            cellDetails[neighbours[i].x][neighbours[i].y].f = fnew;
// 							            cellDetails[neighbours[i].x][neighbours[i].y].parent_i = cell.x;
// 							            cellDetails[neighbours[i].x][neighbours[i].y].parent_j = cell.y;
// 							            }
// 							        }
// 						}//end for loop
// 						console.log(openList)
// 						if(foundDest){break};
// 	        } //end while loop


//      if (foundDest == 0) {return 'not found'}
//      else{return Util.backtrace2(cellDetails, endNode)}
//  }
var Distance = require('./distance.js')
var Util     = require('../core/Util.js')
var PriorityQueue=require('./PQ.js')

class CellAttributes {
    constructor(f, g, h, i, j){
      this.f = f;
      this.parent_i = i
      this.parent_j = j
    }
}

// Astar has attributes:-
// htype = type of h distace to be cal
function Dijkstra(obj){
    // if there is choice between distance then h type = manhattan by default
    if(obj == undefined || obj.htype == undefined ){this.htype = Distance.dijkstraFinder}
    else{this.htype = obj.htype}
    if(obj == undefined || obj.diagonal == undefined ){this.diagonal=false;}
    else{this.diagonal=obj.diagonal}
}


Dijkstra.prototype.successor = function(cellDetails, cell, parentNode, endNode, weight, closedList, grid, openList){
    htype = this.htype;
    if(cell.x == endNode.x && cell.y == endNode.y){
    cellDetails[cell.x][cell.y].parent_i = parentNode.x;
    cellDetails[cell.x][cell.y].parent_j = parentNode.y;
    return true;
    // break;
    }
// If the successor is already on the closed list or if it is blocked(the get neighbors fun takes care of it ie, does not return blocked neighbours), then ignore it. Else do the following
// && !grid.isBlock(cell.x, cell.y, block)
    else if (closedList[cell.x][cell.y] == false ) {
        fnew = cellDetails[parentNode.x][parentNode.y].f + weight;
        //

    // If the cell isn't in the oprn list or if it there and we have f cost less that the previous one then update it
        if(cellDetails[cell.x][cell.y].f == Number.MAX_VALUE || cellDetails[cell.x][cell.y].f > fnew){
            openList.push(cell);
            cell.opened = true;
            cellDetails[cell.x][cell.y].f = fnew;
            cellDetails[cell.x][cell.y].parent_i = parentNode.x;
            cellDetails[cell.x][cell.y].parent_j = parentNode.y;
            }
        }
    return false;
};

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
<<<<<<< HEAD
    sourceNode.opened = true;
=======
    sourceNode.opened=true;

    var foundDest = false; //flag variable to check if destination has been found

		while(openList.length!= 0){

	    	cell=openList[0]
				openList.splice(0, 1)
				closedList[cell.x][cell.y] = true;
				cell.closed = true;
	    	// var min=Number.MAX_VALUE;
				[neighbours,weights] = grid.getNeighbours(cell,this.diagonal)
				// console.log(neighbours, weights)
				for (var i = 0; i < weights.length; i++) {
					// console.log('f', closedList[cell.x][cell.y] == false)
						if(neighbours[i].x == endNode.x && neighbours[i].y == endNode.y){
							cellDetails[neighbours[i].x][neighbours[i].y].parent_i = cell.x;
							cellDetails[neighbours[i].x][neighbours[i].y].parent_j = cell.y;
							foundDest=true;
							break;
						}
						else if(closedList[neighbours[i].x][neighbours[i].y] == false){
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
						// console.log(openList)
						if(foundDest){break};
	        } //end while loop
	    //     else{
			// 			closedList[cell.x][cell.y] = true;
		  //       cell.closed = true;
		  //       //get neighbours
		  //         //neighbours
		  //       var i;
		  //       for(i=0;i<neighbours.length;++i){
			//
		  //       	newf=cellDetails[cell.x][cell.y].f+weights[i]
		  //       	cellDetails[neighbours[i].x][neighbours[i].y].f=Math.min(newf,cellDetails[neighbours[i].x][neighbours[i].y].f);
			//
		  //       }
		  //       neighbours.forEach(function(node){
			// 				if(!node.closed){
			// 					openList.push(node);
			// 					node.opened=true;
			// 					cellDetails[node.x][node.y].parent=cell;
			// 				}});
		  //   }
			//
	    // } //end while loop
>>>>>>> 6c65a8d7d029579e981aa1ad48c0638e246cd1e9

    while(openList.length != 0){
        cell=openList.pop();
        closedList[cell.x][cell.y] = true;
        cell.closed = true;
        if(cell.x==endNode.x && cell.y == endNode.y){
        	foundDest=true;
        	break;
        }
        //get neighbours
        [neighbours,weights] = grid.getNeighbours(cell,this.diagonal)
        // console.log(neighbours, weights)
        for (var i = 0; i < weights.length; i++) {
        	if(neighbours[i].closed){
        		continue;
        	}
        	else if(neighbours[i].x==endNode.x && neighbours[i].y == endNode.y){
        	foundDest=true;
        	cellDetails[neighbours[i].x][neighbours[i].y].parent_i=cell.x;
        	cellDetails[neighbours[i].x][neighbours[i].y].parent_j=cell.y;
        	break;
        }
        else{
        	newf=cellDetails[cell.x][cell.y].f+weights[i];
        	if(newf<cellDetails[neighbours[i].x][neighbours[i].y].f){
        		neighbours[i].opened=true;
        		cellDetails[neighbours[i].x][neighbours[i].y].f=newf;
        		openList.push(neighbours[i]);
        		cellDetails[neighbours[i].x][neighbours[i].y].parent_i=cell.x;
        		cellDetails[neighbours[i].x][neighbours[i].y].parent_j=cell.y;

        	}
        }
            // foundDest = this.successor(cellDetails, neighbours[i], cell, endNode, weights[i], closedList, grid, openList)
            if(foundDest){break}
        }// end for loop
            if(foundDest){break}
            // console.log(openList)
    } //end while loop

     if (foundDest == 0) {return 'not found'}
     else{
         // console.log(closedList)
         // console.log(cellDetails)
         return Util.backtrace2(cellDetails, endNode)}
 };
module.exports=Dijkstra;
