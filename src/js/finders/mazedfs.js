// idx = Math.floor((Math.random() * 4));
// console.log(idx)
// visited = [];
// for(i=0;i<4;++i){
// 	visited.push([]);
// 	for(j=0;j<2;++j){
// 		visited[i].push(false);
//   }
// }
//
// visited[3][0] = true;
// console.log(visited)
d = [0,1,2]
e = [2,1,2]
f = [3,1,2]
var a = [];
var b = [];
var c = [];
[a,b,c] = [d,e,f];
console.log(a);
console.log(b);
console.log(c);
// list = true;
// list = [0,1]
// list.push([0,0])
// list.push([0,4])
// list.push([0,3])
// console.log(list)
// cell = list[2]
// console.log(cell)
// console.log(cell[0])
// console.log(cell[1])
// Connect : function(x,y dir){
//     if(dir == 1){ //east
//         this.grid.setWalkableAt(x+1,y,true);
//         View.setAttributeAt(x+1, y, 'walkable', true);
// 		return
//     }
//     if(dir == 2){ //south
//         this.grid.setWalkableAt(x,y+1,true);
//         View.setAttributeAt(x,y+1, 'walkable', true);
// 		return
//     }
//     if(dir == 3){ //west
//         this.grid.setWalkableAt(x,y-1,true);
//         View.setAttributeAt(x, y-1, 'walkable', true);
// 		return
//     }
//     if(dir == 4){ //north
//         this.grid.setWalkableAt(x-1,y,true);
//         View.setAttributeAt(x-1, y, 'walkable', true);
// 		return
//     }
// },
//
// GetNeighbours : function(x , y){
// 	neighbours=[];
// 	dir = [];
// 	var node =new Node(0,0);
// 	// ↑
// 	if(y-2 > 0 && visited[x][y-2] == false) {
// 		node.x = x;
// 		node.y = y-2;
// 		neighbours.push(node);
// 		dir.push(4);
// 	}
// 	// →
// 	if(x+2 < this.gridSize[0] && visited[x+2][y] == false) {
// 		node.x = x+2;
// 		node.y = y;
// 		neighbours.push(node);
// 		dir.push(1);
// 	}
// 	if(y+2 < this.gridSize[1] && visited[x][y+2] == false) {
// 		node.x = x;
// 		node.y = y+2;
// 		neighbours.push(node);
// 		dir.push(2);
// 	}
// 	if(x-2 > 0 && visited[x-2][y] == false) {
// 		node.x = x-2;
// 		node.y = y;
// 		neighbours.push(node);
// 		dir.push(3);
// 	}
//  	return neighbours, dir
// },
// function Node(x,y){
// 	this.x=x;
// 	this.y=y;
// },
//
// DfsMaze : function(node){
// 	for(var i =0; i< this.gridSize[0], i++){
// 		for(var j=0; j<this.gridSize[1], j++){
// 			this.grid.setWalkableAt(i,j,false);
// 	        View.setAttributeAt(i, j, 'walkable', false);
// 		}
// 	}
//
// 	for(i=0;i<this.gridSize[1];++i){
// 	  	visited.push([]);
// 	  	for(j=0;j<this.gridSize[0];++j){
// 			visited[i].push(false);
// 	  }
// 	}
//
// 	openList = [];
// 	visited[node.x][node.y] = true;
// 	openList.push(node)
// 	this.grid.setWalkableAt(node.x, node.y ,true);
// 	View.setAttributeAt(node.x, node.y, 'walkable', true);
//
// 	while(openList.length !=0){
// 		cell = openList.pop();
//
// 		neighbours, dir = this.GetNeighbours(node.x, node.y, visited);
// 		idx = Math.floor((Math.random() * neighbours.length));
//
// 		for(var i=0; i<neighbours.length; i++){
// 			if(i != idx){
// 				openList.push(neighbours[i]);
// 				this.grid.setWalkableAt(neighbours[i].x, neighbours[i].y ,true);
// 				View.setAttributeAt(neighbours[i].x, neighbours[i].y, 'walkable', true);
// 				this.Connect(cell.x, cell.y, dir[i])
// 			}//if
// 		}//for
// 		openList.push(neighbours[idx]);
// 		this.grid.setWalkableAt(neighbours[idx].x, neighbours[idx].y ,true);
// 		View.setAttributeAt(neighbours[idx].x, neighbours[idx].y, 'walkable', true);
// 		this.Connect(cell.x, cell.y, dir[idx]);
// 	}
// },
// \
// jrtrrrrrr
// Connect : function(x,y, dir){
//     if(dir == 1){ //east
//         this.grid.setWalkableAt(x+1,y,true);
//         View.setAttributeAt(x+1, y, 'walkable', true);
// 		return
//     }
//     if(dir == 2){ //south
//         this.grid.setWalkableAt(x,y+1,true);
//         View.setAttributeAt(x,y+1, 'walkable', true);
// 		return
//     }
//     if(dir == 3){ //west
//         this.grid.setWalkableAt(x-1,y,true);
//         View.setAttributeAt(x-1, y, 'walkable', true);
// 		return
//     }
//     if(dir == 4){ //north
//         this.grid.setWalkableAt(x,y-1,true);
//         View.setAttributeAt(x, y-1, 'walkable', true);
// 		return
//     }
// },
//
// GetNeighbours : function(x , y, visited, value){
// 	neighbours_x=[];
//     neighbours_y=[];
// 	dir = [];
//     s4 = false; s1 = false;
//     s2 = false; s3 = false;
// 	// var node =new Node(0,0);
// 	// ↑
// 	if(y-2 > 0) {
//         if(visited[x][y-2] == value){
// 		// node.x = x;node.y = y-2;	neighbours.push(node);
//         neighbours_x.push(x);
//         neighbours_y.push(y-2);
// 		dir.push(4);
//         s4 = true;
//     }
// 	}
// 	// →
// 	if(x+2 < this.gridSize[0] ){
//         if( visited[x+2][y] == value) {
// 		// node.x = x+2;node.y = y;neighbours.push(node);
//         neighbours_x.push(x+2);
//         neighbours_y.push(y);
// 		dir.push(1);
//         s1 = true;
//     }
// 	}
// 	if(y+2 < this.gridSize[1]){
//         if(visited[x][y+2] == value) {
// 		// node.x = x;node.y = y+2;neighbours.push(node);
//         neighbours_x.push(x);
//         neighbours_y.push(y+2);
// 		dir.push(2);
//         s2 = true;
//     }
// 	}
// 	if(x-2 > 0){
//         if(visited[x-2][y] == value) {
// 		// node.x = x-2;node.y = y;neighbours.push(node);
//         neighbours_x.push(x-2);
//         neighbours_y.push(y);
// 		dir.push(3);
//         s3 = true;
//     }
// 	}
//     if(s1+s2+s3+s4 == false){return [0,0,0]}
//  	return [neighbours_x, neighbours_y, dir]
// },
//
// DfsMaze : function(x,y){
// 	for(var i =0; i< this.gridSize[0]; i++){
// 		for(var j=0; j<this.gridSize[1]; j++){
// 			this.grid.setWalkableAt(i,j,false);
// 	        View.setAttributeAt(i, j, 'walkable', false);
// 		}
// 	}
//     visited = [];
// 	for(i=0;i<this.gridSize[0];++i){
// 	  	visited.push([]);
// 	  	for(j=0;j<this.gridSize[1];++j){
// 			visited[i].push(false);
// 	  }
// 	}
//
// 	openList = [];
// 	openList.push([x,y])
// 	this.grid.setWalkableAt(x, y ,true);
// 	View.setAttributeAt(x, y, 'walkable', true);
//
// 	while(openList.length !=0){
// 		cell = openList.pop();
//         visited[x][y] = true;
//
// 		[neighbours_x,neighbours_y, dir] = this.GetNeighbours(cell[0], cell[1], visited,false);
//         if(dir != 0){
// 		idx = Math.floor((Math.random() * dir.length));
//
// 		for(var i=0; i<neighbours_x.length; i++){
// 			if(i != idx){
// 				openList.push([neighbours_x[i],neighbours_y[i]]);
//                 visited[neighbours_x[i]][neighbours_y[i]] = true;
// 				this.grid.setWalkableAt(neighbours_x[i], neighbours_y[i] ,true);
// 				View.setAttributeAt(neighbours_x[i], neighbours_y[i], 'walkable', true);
// 				this.Connect(cell[0], cell[1], dir[i])
// 			}//if
// 		}//for
// 		openList.push([neighbours_x[idx],neighbours_y[idx]]);
//         visited[neighbours_x[idx]][neighbours_y[idx]] = true;
// 		this.grid.setWalkableAt(neighbours_x[idx], neighbours_y[idx] ,true);
// 		View.setAttributeAt(neighbours_x[idx], neighbours_y[idx], 'walkable', true);
// 		this.Connect(cell[0], cell[1], dir[idx]);
//     }
// 	}
//
//     // for(var i = 0; i < this.endNodes.length; i++){
//     //     this.grid.setWalkableAt(this.endNodes[i][0], this.endNodes[i][1],true);
//     //     View.setAttributeAt(this.endNodes[i][0], this.endNodes[i][1], 'walkable', true);
//     //     }
// },
//
// PrimMaze : function(x,y){
//     for(var i =0; i< this.gridSize[0]; i++){
//         for(var j=0; j<this.gridSize[1]; j++){
//             this.grid.setWalkableAt(i,j,false);
//             View.setAttributeAt(i, j, 'walkable', false);
//         }
//     }
//     visited = [];
//     for(i=0;i<this.gridSize[0];++i){
//         visited.push([]);
//         for(j=0;j<this.gridSize[1];++j){
//             visited[i].push(false);
//       }
//     }
//
//     openList = [];
//     visited[x][y] = true;
//     openList.push([x,y])
//     this.grid.setWalkableAt(x, y ,true);
//     View.setAttributeAt(x, y, 'walkable', true);
//
//     while(openList.length !=0){
//         cell = openList.pop();
//
//         [neighbours_x,neighbours_y, dir] = this.GetNeighbours(cell[0], cell[1], visited);
//         if(dir != 0){
//         idx = Math.floor((Math.random() * dir.length));
//
//         for(var i=0; i<neighbours_x.length; i++){
//             if(i != idx){
//                 openList.push([neighbours_x[i],neighbours_y[i]]);
//                 visited[neighbours_x[i]][neighbours_y[i]] = true;
//                 this.grid.setWalkableAt(neighbours_x[i], neighbours_y[i] ,true);
//                 View.setAttributeAt(neighbours_x[i], neighbours_y[i], 'walkable', true);
//                 this.Connect(cell[0], cell[1], dir[i])
//             }//if
//         }//for
//         openList.push([neighbours_x[idx],neighbours_y[idx]]);
//         visited[neighbours_x[idx]][neighbours_y[idx]] = true;
//         this.grid.setWalkableAt(neighbours_x[idx], neighbours_y[idx] ,true);
//         View.setAttributeAt(neighbours_x[idx], neighbours_y[idx], 'walkable', true);
//         this.Connect(cell[0], cell[1], dir[idx]);
//     }
//     }
//
//     for(var i = 0; i < this.endNodes.length; i++){
//         this.grid.setWalkableAt(this.endNodes[i][0], this.endNodes[i][1],true);
//         View.setAttributeAt(this.endNodes[i][0], this.endNodes[i][1], 'walkable', true);
//         }
//
// },
