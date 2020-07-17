//defining constructor for nodes
function Node(x,y,walkable,hill){
	this.x=x;
	this.y=y;
	this.walkable=(walkable === undefined ? true : walkable);
	this.hill=(hill === undefined ? 0 : hill);
}

Node.prototype.isequal = function(nodeA){
	if(nodeA.x == this.x && nodeA.y == this.y) {return true;}
	else{return false;}
}

module.exports=Node;
