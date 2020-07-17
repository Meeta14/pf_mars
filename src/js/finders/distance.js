module.exports = {
    // manhatten distance is absolute difference between 2 nodes
    manhattan: function(x, y, node){
        return Math.abs(x - node.x) + Math.abs(y - node.y);
    },

    //octile distance
    octile: function(x, y, node){
        dx = Math.abs(node.x-x);
        dy = Math.abs(node.y-y);
        var F = Math.SQRT2 - 1;
        return (dx < dy) ? F * dx + dy : F * dy + dx;
    },

    // euclidian distance is the square root of sq of diff between nodes
    euclidean: function(x, y, node){
        return Math.sqrt((x-node.x)*(x-node.x) + (y-node.y)*(y-node.y))
    },

    // diagonal distance is the maximum distance between x and y difference
    diagonal: function(x, y, node){
        return Math.max(Math.abs(x-node.x), Math.abs(y-node.y))
    },

    // in djkstra, distance function gives zero
    dijkstraFinder: function(x, y, node){
        return 0
    },
};
