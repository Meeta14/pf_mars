
//function to return path from the end node
function backtrace(cellDetails,node){
	var path=[[node.x,node.y]];
	x=node.x;
	y=node.y;
	while(!( cellDetails[x][y].parent_i == x && cellDetails[x][y].parent_j==y )){
		tempx=cellDetails[x][y].parent_i;
		tempy=cellDetails[x][y].parent_j;
		x=tempx
		y=tempy
		path.push([x,y])

	}
	// console.log('path', path)
	return path.reverse();
}

exports.backtrace=backtrace;

function pathLength(path) {
// change // TODO: add terrain path
var i, sum = 0, a, b, dx, dy;
for (i = 1; i < path.length; ++i) {
		a = path[i - 1];
		b = path[i];
		dx = a[0] - b[0];
		dy = a[1] - b[1];
		sum += Math.sqrt(dx * dx + dy * dy);
}
return sum;
}
exports.pathLength = pathLength;
