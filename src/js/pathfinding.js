var pathfinding = {
    'Heap'                      : require('heap'),
    'Node'                      : require('./core/Node'),
    'Grid'                      : require('./core/Grid'),
    'Util'                      : require('./core/Util'),
    // 'DiagonalMovement'          : require('./core/DiagonalMovement'),
    'Distance'                  : require('./finders/distance'),
    'AstarSearch'               : require('./finders/A_star'),
<<<<<<< HEAD
    'BestFirstFinder'           : require('./finders/BestFirstSearch'),
    // 'BreadthFS'                 : require('./finders/BreadthFirstSearch'),
    // 'DijkstraFinder'            : require('./finders/DijkstraFinder'),
=======
    'BestFirstSearch'           : require('./finders/BestFirstSearch'),
    'BreadthFS'                 : require('./finders/BreadthFirstSearch'),
    'Dijkstra'                  : require('./finders/Dijkstra'),
    'PriorityQueue'             : require('./finders/PQ'),
>>>>>>> 27843307b11d18b514a3af22b9f7d991355e5e33
    // 'BiAStarFinder'             : require('./finders/BiAStarFinder'),
    // 'BiBestFirstFinder'         : require('./finders/BiBestFirstFinder'),
    // 'BiBreadthFirstFinder'      : require('./finders/BiBreadthFirstFinder'),
    // 'BiDijkstraFinder'          : require('./finders/BiDijkstraFinder'),
    // 'IDAStarFinder'             : require('./finders/IDAStarFinder'),
    // 'JumpPointFinder'           : require('./finders/JumpPointFinder'),
};

window.PF = pathfinding;
