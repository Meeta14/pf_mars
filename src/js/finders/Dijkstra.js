var A_star   = require('./A_star');
var Distance = require('./distance.js');

// var astar = new A_star(Distance.dijkstraFinder);

function DijkstraFinder(opt) {
    A_star.call(this, opt);
    this.htype = Distance.dijkstraFinder;
}
DijkstraFinder.prototype = new A_star(Distance.dijkstraFinder);
DijkstraFinder.prototype.constructor = DijkstraFinder;
// DijkstraFinder.prototype.findPath =function(startX, startY, endX, endY, grid, block, terrain){};
module.exports = DijkstraFinder;
