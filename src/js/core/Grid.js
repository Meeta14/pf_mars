var Node=require('./Node');

//defining grid class
//constructor
function Grid(width,height){
	this.width=width;
	this.height=height;
	this.nodes=this.makenodes(width,height);
}

//function that returns height and width of grid
Grid.prototype.dimention=function(){
	return [this.height, this.width];
}

//function that makes all nodes
Grid.prototype.makenodes=function(width,height){
	var i,j;
	var nodes=new Array(height);
	for (i = 0; i < height; ++i) {
        nodes[i] = new Array(width);
        for (j = 0; j < width; ++j) {
            nodes[i][j] = new Node(j, i);
        }
    }
    return nodes;
}
//Function that checks whether the given point is inside the grid
Grid.prototype.isInside = function(x, y) {
    return (x >= 0 && x < this.width) && (y >= 0 && y < this.height);
};

//function that returns the node at a particular index
Grid.prototype.getNodeAt=function(x,y){
	if (this.isInside(x,y)){
		return this.nodes[y][x];
	}
	else{
		return false;
	}
}

//Adding class function to Array class to check if two arrays are the same
Array.prototype.equals = function (arr) {
    return this.length == arr.length && this.every((u, i) => u === arr[i]);
}

//function to check if array is present in list of blocked nodes
Grid.prototype.isBlock=function(x,y){
var i;
if(!this.nodes[y][x].walkable){
	return true;
}
else{
	return false;
}
}

//function to check if array is present in list of terrain nodes
Grid.prototype.isterrain=function(x,y,node){
	if(this.isHillAt(x,y) && this.isHillAt(node.x,node.y)){
		return true;
	}
	else{
		return false;
	}

}

//function to return all neighbours of a given node
Grid.prototype.getNeighbours=function(node,diagonal,w=true){
	var x=node.x, y=node.y;
	var dict={};
	neighbours=[];
	weights=[];
			if (this.isWalkableAt(x, y - 1)) {
	        neighbours.push(this.nodes[y - 1][x]);
	        if(w){
	        	if (this.isterrain(x, y - 1,node)){
	        	weights.push(4);
		        }
		        else{
		        	weights.push(1)
		        }
	        }

	        
	    }
	    // →  
	    if (this.isWalkableAt(x + 1, y)) {
	        neighbours.push(this.nodes[y][x + 1]);
	        if(w){
		        if (this.isterrain(x+1,y,node)){
		        	weights.push(4);
		        }
		        else{
		        	weights.push(1)
		        }
	    	}
	    }

	    // ↓
	    if (this.isWalkableAt(x, y + 1)) {
	        neighbours.push(this.nodes[y + 1][x]);
	        if(w){
		        if (this.isterrain(x,y+1,node)){
		        	weights.push(4);
		        }
		        else{
		        	weights.push(1)
		        }
		    }
	    }
	    // ←
	    if (this.isWalkableAt(x - 1, y)) {
	        neighbours.push(this.nodes[y][x - 1]);
	        if(w){
		        if (this.isterrain(x-1, y ,node)){
		        	weights.push(4);
		        }
		        else{
		        	weights.push(1)
		        }
		    }
	    }
	    if(diagonal==true){
	    	if (this.isInside(x-1 ,y-1) && !this.isBlock(x - 1, y-1)) {
	        	neighbours.push(this.nodes[y-1][x - 1]);
	        	if(w){
			        if (this.isterrain(x-1, y-1 ,node)){
			        	weights.push(4);
			        }
			        else{
			        	weights.push(1)
			        }
			    }
	    	}

	    	if (this.isInside(x-1 ,y+1) && !this.isBlock(x - 1, y+1)) {
	        	neighbours.push(this.nodes[y+1][x - 1]);
	        	if(w){
			        if (this.isterrain(x-1, y+1 ,node)){
			        	weights.push(4);
			        }
			        else{
			        	weights.push(1)
			        }
			    }
	    	}

	    	if (this.isInside(x+1 ,y-1) && !this.isBlock(x +1, y-1)) {
	        	neighbours.push(this.nodes[y-1][x + 1]);
	        	if(w){
			        if (this.isterrain(x+1, y-1 ,node)){
			        	weights.push(4);
			        }
			        else{
			        	weights.push(1)
			        }
			    }
	    	}

	    	if (this.isInside(x+1 ,y+1) && !this.isBlock(x + 1, y+1)) {
	        	neighbours.push(this.nodes[y+1][x + 1]);
	        	if(w){
			        if (this.isterrain(x+1, y+1 ,node)){
			        	weights.push(4);
			        }
			        else{
			        	weights.push(1)
			        }
		        }
	 		}				

	    }
	if(w){
		return [neighbours,weights];
	}
	else{
		return neighbours;
	}
	
};

Grid.prototype.isWalkableAt = function(x, y) {
	// console.log('a')
    return this.isInside(x, y) && this.nodes[y][x].walkable;
};

Grid.prototype.isHillAt = function(x, y) {
    return this.isInside(x, y) && this.nodes[y][x].hill;
};

Grid.prototype.setWalkableAt = function(x, y, walkable) {
    this.nodes[y][x].walkable = walkable;
};

Grid.prototype.setHillAt = function(x, y, hill) {
	// console.log(x,y)
    this.nodes[y][x].hill = hill;
};

Grid.prototype.clone = function() {
    var i, j,
        width = this.width,
        height = this.height,
        thisNodes = this.nodes,

        newGrid = new Grid(width, height),
        newNodes = new Array(height);

    for (i = 0; i < height; ++i) {
        newNodes[i] = new Array(width);
        for (j = 0; j < width; ++j) {
            newNodes[i][j] = new Node(j, i, thisNodes[i][j].walkable, thisNodes[i][j].hill);
        }
    }

    newGrid.nodes = newNodes;

    return newGrid;
};

module.exports=Grid;