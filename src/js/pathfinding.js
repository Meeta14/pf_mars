var pathfinding = {
    'Heap'                      : require('heap'),
    'Node'                      : require('./core/Node'),
    'Grid'                      : require('./core/Grid'),
    'Util'                      : require('./core/Util'),
    // 'DiagonalMovement'          : require('./core/DiagonalMovement'),
    // 'Heuristic'                 : require('./core/Heuristic'),
    'Distance'                  : require('./finders/distance'),
    'AstarSearch'               : require('./finders/A_star'),
    // 'BestFirstFinder'           : require('./finders/BestFirstFinder'),
    // 'BreadthFS'                 : require('./finders/BreadthFirstSearch'),
    // 'DijkstraFinder'            : require('./finders/DijkstraFinder'),
    // 'BiAStarFinder'             : require('./finders/BiAStarFinder'),
    // 'BiBestFirstFinder'         : require('./finders/BiBestFirstFinder'),
    // 'BiBreadthFirstFinder'      : require('./finders/BiBreadthFirstFinder'),
    // 'BiDijkstraFinder'          : require('./finders/BiDijkstraFinder'),
    // 'IDAStarFinder'             : require('./finders/IDAStarFinder'),
    // 'JumpPointFinder'           : require('./finders/JumpPointFinder'),
};

window.PF = pathfinding;
