var pathfinding = {
    'Heap'                      : require('heap'),
    'Node'                      : require('./core/Node'),
    'Grid'                      : require('./core/Grid'),
    'Util'                      : require('./core/Util'),
    'DiagonalMovement'          : require('./core/DiagonalMovement'),
    'Distance'                  : require('./finders/distance'),
    'AstarSearch'               : require('./finders/A_star'),

    'BestFirstSearch'           : require('./finders/BestFirstSearch'),
    'BreadthFS'                 : require('./finders/BreadthFirstSearch'),
    'Dijkstra'                  : require('./finders/Dijkstra'),
    'PriorityQueue'             : require('./finders/PQ'),
    'BiAstarSearch'             : require('./finders/BiAStarFinder'),
    'BiBestFirstSearch'         : require('./finders/BiBestFirstFinder'),
    // 'BiBreadthFirstFinder'      : require('./finders/BiBreadthFirstFinder'),
    'DijkstraBi'          : require('./finders/BiDijkstraFinder'),
    // 'IDAStarFinder'             : require('./finders/IDAStarFinder'),
    // 'JumpPointFinder'           : require('./finders/JumpPointFinder'),
};

window.PF = pathfinding;
