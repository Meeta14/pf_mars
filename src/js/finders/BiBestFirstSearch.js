var PriorityQueue=require('./PQ.js')
var Util     = require('../core/util.js')
var Util     = require('../core/Util.js')

class CellAttributes {
    constructor(f,visitedby, node){
      this.f = f;
      this.parent=node;
      this.visitedby=visitedby;
    }
}

function Dijkstra(obj){
  if(obj.htype == undefined ){this.htype = Distance.manhattan}
    else{this.htype = obj.htype}
  if(obj.diagonal==undefined){this.diagonal=false;}
  else{obj.diagonal=diagonal;}
}

Dijkstra.prototype.findPath= function(startX, startY, endX, endY, grid){

// check if source and destination is inside the grid // TODO: see input is valid ouside the func before givig input?
   sourceNode = grid.getNodeAt(startX, startY);
   endNode =  grid.getNodeAt(endX, endY);

// check if either of the source or destination is blocked
    if(grid.isBlock(startX, startY) || grid.isBlock(endX, endY)){return [];}

    // check if source and destination is same
    if(sourceNode.isequal(endNode)){return [];}

    var values=[grid.height,grid.width]
    //declaring openlist as priority queue(it is ordered according to f value)
    var openList_source = new PriorityQueue(comparator = (nodeA, nodeB) => cellDetails[nodeA.x][nodeA.y].f < cellDetails[nodeB.x][nodeB.y].f);
    var openList_end = new PriorityQueue(comparator = (nodeA, nodeB) => cellDetails[nodeA.x][nodeA.y].f < cellDetails[nodeB.x][nodeB.y].f);

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
    cellDetails[endNode.x][endNode.y].f=0;
    cellDetails[endNode.x][endNode.y].parent=endNode;

    openList_source.push(sourceNode);
    openList_end.push(endNode);
    sourceNode.opened=true;
    endNode.opened=true;
    var Node1,Node2=new Node();
    var foundDest = false; //flag variable to check if destination has been found
    while(!openList_source.isEmpty() && !openList_end.isEmpty()){    
    //for the source list    
    	cell=openList_source.pop();
     //    if(cell.isequal(endNode)){
     //    	foundDest=true;
     //    	break;
     //    }
        // else{
          cell.opened=false;
	        cell.closed = true;
	        //get neighbours
	        [neighbours,weights] = grid.getNeighbours(cell,this.diagonal)  //neighbours
	        // var i;
	        // for(i=0;i<neighbours.length;++i){
	        // 	newf=cellDetails[cell.x][cell.y].f+weights[i]
	        // 	cellDetails[neighbours[i].x][neighbours[i].y].f=Math.min(newf,cellDetails[neighbours[i].x][neighbours[i].y].f);

	        // }
	        neighbours.some(function(node,i){
            newf=cellDetails[cell.x][cell.y].f+weights[i]
            cellDetails[node.x][node.y].f=this.htype(node.x, node.y, endNode);
            if(!node.closed){
              if(cellDetails[node.x][node.y].visitedby==2){
                foundDest=true;
                Node1=node;
                Node2=cell;
                return true;

              }
              openList_source.push(node);
              node.opened=true; 
              cellDetails[node.x][node.y].parent=cell;
              cellDetails[node.x][node.y].visitedby=1;

            }
          } );
	      // }


        if(foundDest){
          break;
        }


        //for the end list

      cell=openList_end.pop();
        // if(cell.isequal(endNode)){
        //   foundDest=true;
        //   break;
        // }
        // else{
          cell.opened=false;
          cell.closed = true;
          //get neighbours
          [neighbours,weights] = grid.getNeighbours(cell,this.diagonal)  //neighbours
          // var i;
          // for(i=0;i<neighbours.length;++i){
          //  newf=cellDetails[cell.x][cell.y].f+weights[i]
          //  cellDetails[neighbours[i].x][neighbours[i].y].f=Math.min(newf,cellDetails[neighbours[i].x][neighbours[i].y].f);

          // }
          neighbours.some(function(node,i){
            newf=cellDetails[cell.x][cell.y].f+weights[i]
            cellDetails[node.x][node.y].f=this.htype(node.x, node.y, endNode);
            if(!node.closed){
              if(cellDetails[node.x][node.y].visitedby==1){
                foundDest=true;
                Node2=node;
                Node1=cell;
                return true;
              }
              openList_end.push(node);
              node.opened=true; 
              cellDetails[node.x][node.y].parent=cell;
              cellDetails[node.x][node.y].visitedby=2;

            }});
        // }


        if(foundDest){
          break;
        }



    } //end while loop

     if (foundDest == 0) {return 'not found'}
     else{
        path1= Util.backtrace(cellDetails, Node1);   //path from endNode to Node1
        path2=Util.backtrace(cellDetails,Node2);    //path from sourceNode to Node2
        path=path2.concat(path1.reverse());
        return path;
  
      }
 }

module.exports=BiDijkstra;
