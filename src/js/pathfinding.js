var pathfinding = {
    'Heap'                      : require('heap'),
    'Node'                      : require('./core/Node'),
    'Grid'                      : require('./core/Grid'),
    'Util'                      : require('./core/Util'),
    'DiagonalMovement'          : require('./core/DiagonalMovement'),
    'Distance'                  : require('./finders/distance'),
    'AstarSearch'               : require('./finders/A_star'),
    'BreadthFS'                 : require('./finders/BreadthFirstSearch'),
    'Dijkstra'                  : require('./finders/Dijkstra'),
    'DijkstraBi'                : require('./finders/BiDijkstra'),
    'PriorityQueue'             : require('./finders/PQ'),
    'BiAstarSearch'             : require('./finders/A_star_bi'),
    'BiBreadthFS'               : require('./finders/BiBreadthFS'),

    // 'IDAStarFinder'             : require('./finders/IDAStarFinder'),
    // 'JumpPointFinder'           : require('./finders/JumpPointFinder'),
};

window.PF = pathfinding;
