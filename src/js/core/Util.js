//backtrance func
function backtrace(cellDetails,node){
    var path=[[node.x,node.y]];
    temp=Object.assign({},node);
    while(!( cellDetails[temp.x][temp.y].parent.x == temp.x && cellDetails[temp.x][temp.y].parent.y == temp.y)){
        temp=Object.assign({},cellDetails[temp.x][temp.y].parent);
        path.push([temp.x,temp.y])

    }
    return path.reverse();
}
exports.backtrace=backtrace;

 function backtracebi(cellDetails, startNode, endNode){
	 return 'found'
 }
exports.backtracebi=backtracebi;
