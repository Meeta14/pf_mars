
var Controller = StateMachine.create({
    initial: 'none',
    events: [
        {
            name: 'init',
            from: 'none',
            to:   'ready'
        },
        {
            name: 'set',
            from: '*',
            to:   'ready'
        },
        {
            name: 'search',
            from: 'starting',
            to:   'searching'
        },
        {
            name: 'pause',
            from: 'searching',
            to:   'paused'
        },
        {
            name: 'finish',
            from: 'searching',
            to:   'finished'
        },
        {
            name: 'resume',
            from: 'paused',
            to:   'searching'
        },
        {
            name: 'cancel',
            from: 'paused',
            to:   'ready'
        },
        {
            name: 'modify',
            from: 'finished',
            to:   'modified'
        },
        {
            name: 'reset',
            from: '*',
            to:   'ready'
        },
        {
            name: 'clear',
            from: ['finished', 'modified'],
            to:   'ready'
        },
        {
            name: 'start',
            from: ['ready', 'modified', 'restarting'],
            to:   'starting'
        },
        {
            name: 'restart',
            from: ['searching', 'finished'],
            to:   'restarting'
        },
        {
            name: 'dragStart',
            from: ['ready', 'finished'],
            to:   'draggingStart'
        },
        {
            name: 'dragEnd',
            from: ['ready', 'finished'],
            to:   'draggingEnd'
        },
        {
            name: 'dragEnd2',
            from: ['ready', 'finished'],
            to:   'draggingEnd2'
        },
                {
            name: 'dragEnd3',
            from: ['ready', 'finished'],
            to:   'draggingEnd3'
        },
        {
            name: 'dragEnd4',
            from: ['ready', 'finished'],
            to:   'draggingEnd4'
        },
        {
            name: 'drawWall',
            from: ['ready', 'finished'],
            to:   'drawingWall'
        },
        {
            name: 'erase',
            from: ['ready', 'finished'],
            to:   'erasing'
        },
        {
            name: 'drawHill',
            from: ['ready', 'finished'],
            to:   'drawingHill'
        },
        {
            name: 'drawMaze',
            from: ['ready', 'finished'],
            to:   ['ready']
        },
        {
            name: 'drawValley',
            from: ['ready', 'finished'],
            to:   'drawingValley'
        },

        {
            name: 'rest',
            from: ['draggingStart', 'draggingEnd', 'draggingEnd2', 'draggingEnd3', 'draggingEnd4', 'drawingWall', 'drawingHill', 'erasing','drawingValley'],
            to  : 'ready'
        },
    ],
});

$.extend(Controller, {
    gridSize: [64, 36], // number of nodes horizontally and vertically
    operationsPerSecond: 300,


    getDest: function(){ // returns number of destinations
        var destattr = Panel.getnumdest();
        return destattr;
    },
    getchoice: function(){ //returns type of terrain chosen
      var selected_choice= $('input[name=terrain]:checked').val();
      return selected_choice;
    },
    /**
     * Asynchronous transition from `none` state to `ready` state.
     */
    onleavenone: function() {
        var numCols = this.gridSize[0],
            numRows = this.gridSize[1];

        this.grid = new PF.Grid(numCols, numRows);

        View.init({
            numCols: numCols,
            numRows: numRows
        });

        this.endNodes = new Array;

            View.generateGrid(function() {
            Controller.setDefaultStartEndPos();
            Controller.bindEvents();
            Controller.transition(); // transit to the next state (ready)
        });

        this.$buttons = $('.control_button');

        this.hookPathFinding();

        return StateMachine.ASYNC;
        // => ready
    },
    ondrawWall: function(event, from, to, gridX, gridY) {
        this.setWalkableAt(gridX, gridY, false);
        // => drawingWall
    },
    onerase: function(event, from, to, gridX, gridY) {
        this.setWalkableAt(gridX, gridY, true);
        this.setHillAt(gridX, gridY, false);
        this.setValleyAt(gridX,gridY,false);
        // => erasing Wall ,valley and hill
    },
    ondrawHill: function(event, from, to, gridX, gridY) {
        this.setHillAt(gridX, gridY, true);
        // => drawingWall
    },
    ondrawValley: function(event, from, to, gridX, gridY) {
        this.setValleyAt(gridX, gridY, true);
        // => drawingValley
    },
    Connect : function(x,y, dir){
        if(dir == 1){ //east
            this.grid.setWalkableAt(x+1,y,true);
            View.setAttributeAt(x+1, y, 'walkable', true);
    		return
        }
        if(dir == 2){ //south
            this.grid.setWalkableAt(x,y+1,true);
            View.setAttributeAt(x,y+1, 'walkable', true);
    		return
        }
        if(dir == 3){ //west
            this.grid.setWalkableAt(x-1,y,true);
            View.setAttributeAt(x-1, y, 'walkable', true);
    		return
        }
        if(dir == 4){ //north
            this.grid.setWalkableAt(x,y-1,true);
            View.setAttributeAt(x, y-1, 'walkable', true);
    		return
        }
    },

    GetNeighbours : function(x , y, visited, value){  //for maze
    	neighbours_x=[];
        neighbours_y=[];
    	dir = [];
        s4 = false; s1 = false;
        s2 = false; s3 = false;
    	// ↑
    	if(y-2 >= 0) {
            if(visited[x][y-2] == value){
            neighbours_x.push(x);
            neighbours_y.push(y-2);
    		dir.push(4);
            s4 = true;
        }
    	}
    	// →
    	if(x+2 < this.gridSize[0] ){
            if( visited[x+2][y] == value) {
            neighbours_x.push(x+2);
            neighbours_y.push(y);
    		dir.push(1);
            s1 = true;
        }
    	}
    	if(y+2 < this.gridSize[1]){
            if(visited[x][y+2] == value) {
            neighbours_x.push(x);
            neighbours_y.push(y+2);
    		dir.push(2);
            s2 = true;
        }
    	}
    	if(x-2 >= 0){
            if(visited[x-2][y] == value) {
            neighbours_x.push(x-2);
            neighbours_y.push(y);
    		dir.push(3);
            s3 = true;
        }
    	}
        if(s1+s2+s3+s4 == false){return [0,0,0];}
     	return [neighbours_x, neighbours_y, dir];
    },

    DfsMaze : function(x,y){
    	for(var i =0; i< this.gridSize[0]; i++){
    		for(var j=0; j<this.gridSize[1]; j++){
    			this.grid.setWalkableAt(i,j,false);
    	        View.setAttributeAt(i, j, 'walkable', false);
    		}
    	}
        visited = [];
    	for(i=0;i<this.gridSize[0];++i){
    	  	visited.push([]);
    	  	for(j=0;j<this.gridSize[1];++j){
    			visited[i].push(false);
    	  }
    	}

    	openList = [];
    	openList.push([x,y])
    	this.grid.setWalkableAt(x, y ,true);
    	View.setAttributeAt(x, y, 'walkable', true);

    	while(openList.length !=0){
    		cell = openList.pop();
            visited[x][y] = true;

    		[neighbours_x,neighbours_y, dir] = this.GetNeighbours(cell[0], cell[1], visited,false);
            if(dir != 0){
    		idx = Math.floor((Math.random() * dir.length));

    		for(var i=0; i<neighbours_x.length; i++){
    			if(i != idx){
    				openList.push([neighbours_x[i],neighbours_y[i]]);
                    visited[neighbours_x[i]][neighbours_y[i]] = true;
    				this.grid.setWalkableAt(neighbours_x[i], neighbours_y[i] ,true);
    				View.setAttributeAt(neighbours_x[i], neighbours_y[i], 'walkable', true);
    				this.Connect(cell[0], cell[1], dir[i]);
    			}//end of if
    		}//end of for
    		openList.push([neighbours_x[idx],neighbours_y[idx]]);
            visited[neighbours_x[idx]][neighbours_y[idx]] = true;
    		this.grid.setWalkableAt(neighbours_x[idx], neighbours_y[idx] ,true);
    		View.setAttributeAt(neighbours_x[idx], neighbours_y[idx], 'walkable', true);
    		this.Connect(cell[0], cell[1], dir[idx]);
        }
    	}

        for(var i = 0; i < this.endNodes.length; i++){
            this.grid.setWalkableAt(this.endNodes[i][0], this.endNodes[i][1],true);
            View.setAttributeAt(this.endNodes[i][0], this.endNodes[i][1], 'walkable', true);
            }
    },


        PrimMaze : function(x,y){
            for(var i =0; i< this.gridSize[0]; i++){
                for(var j=0; j<this.gridSize[1]; j++){
                    this.grid.setWalkableAt(i,j,false);
                    View.setAttributeAt(i, j, 'walkable', false);
                }
            }
            visited = [];
            for(i=0;i<this.gridSize[0];++i){
                visited.push([]);
                for(j=0;j<this.gridSize[1];++j){
                    visited[i].push(false);
              }
            }

            opened = [];
            for(i=0;i<this.gridSize[0];++i){
                opened.push([]);
                for(j=0;j<this.gridSize[1];++j){
                    opened[i].push(false);
              }
            }

            openList = [];
            openList.push([x,y])
            this.grid.setWalkableAt(x, y ,true);
            View.setAttributeAt(x, y, 'walkable', true);
            opened[x][y] = true;
            while(openList.length !=0){
                idx = Math.floor((Math.random() * openList.length));
                cell=openList[idx];
                openList.splice(idx, 1)
                visited[cell[0]][cell[1]] = true;

                [neighbours_x,neighbours_y, dir] = this.GetNeighbours(cell[0], cell[1], visited, true);
                if(dir != 0){
                    idx = Math.floor((Math.random() * dir.length));
                    this.Connect(cell[0], cell[1], dir[idx]);
                }//if

            [neighbours_x, neighbours_y, dir] = this.GetNeighbours(cell[0], cell[1], visited, false);
            if(dir != 0){
                for(var i=0; i<neighbours_x.length; i++){
                    if(!opened[neighbours_x[i]][neighbours_y[i]]){
                        openList.push([neighbours_x[i],neighbours_y[i]]);
                        opened[neighbours_x[i]][neighbours_y[i]] = true;
                        this.grid.setWalkableAt(neighbours_x[i], neighbours_y[i] ,true);
                        View.setAttributeAt(neighbours_x[i], neighbours_y[i], 'walkable', true);
                    }//if
                }//for
            }//if

        }//while
            for(var i = 0; i < this.endNodes.length; i++){
                this.grid.setWalkableAt(this.endNodes[i][0], this.endNodes[i][1],true);
                View.setAttributeAt(this.endNodes[i][0], this.endNodes[i][1], 'walkable', true);
                }
    console.log('done')
        },
    ondrawMaze: function(event,from,to){
        var maze= $( 'input[name=maze]:checked').val();
        Controller.clearOperations();
        Controller.clearAll();
        Controller.buildNewGrid();
        console.log('starting drawing maze')
        if(maze == 1){this.DfsMaze(0,0);}
        else{if(maze == 2){this.PrimMaze(0,0);}}

        console.log('ending drawing maze')
},
getPath: function(mask,gr,pos,n, path){
        if (mask === ((1<<n)-1)) {
            path.p.push(pos);
            return 0;
        }
        var min_len = Number.MAX_VALUE;
        for (var i = 1; i < n; i++) {
            if (!(mask & (1<<i))) {
                var new_o = {p: new Array};
                if(!gr[pos][i][0]){
                    path.p = new_o.p;
                    return 0;
                }
                var new_len = Controller.getPath(mask|(1<<i), gr, i, n, new_o);
                new_len += gr[pos][i][0] ;
                if(new_len < min_len) {
                    min_len = new_len;
                    path.p = new_o.p;
                }
            }
        }
        path.p.push(pos);
        return min_len;
    },
    
    pathlength : function(path){
        var i, sum = 0, a, b, dx, dy;
        for (i = 1; i < path.length; ++i) {
        		a = path[i - 1];
        		b = path[i];
        		dx = a[0] - b[0];
        		dy = a[1] - b[1];
                node = new PF.Node(b[0], b[1]);
                factor = this.grid.calcweight(a[0],a[1],node);
        		sum += Math.sqrt(dx * dx + dy * dy) * factor * 0.2;
        }
        return sum;
    },
    
        onsearch: function(event, from, to) {
        var timeStart, timeEnd;
        timeStart = window.performance ? performance.now() : Date.now();
        // console.log(this.getpriority());
        let priority=$('input[name=priority]:checked').val();
        switch(priority){
            case "1":
                var temp = 0;
                par = [];
                for(var i = 0; i < this.endNodes.length-1; i++){
                        j = i+1
                            var Grid = this.grid.clone();
                            var finder = Panel.getFinder();
                            if(finder ==  undefined ){ window.alert("Please select search Algo");}
                            var dist = finder.findPath(
                                    this.endNodes[i][0], this.endNodes[i][1], this.endNodes[j][0], this.endNodes[j][1], Grid
                                );
                                
                                par=par.concat(dist);
                                temp = temp + this.pathlength(dist)
                    }
                this.path = par;
                this.len = temp;
                break;
            
            case "0":
                size=this.endNodes.length;
                // var graph_dist=new Array(size);
                var graph_nodes=new Array(size);
                for(let i=0;i<graph_nodes.length;++i){
                    // graph_dist[i]=new Array(size);
                    graph_nodes[i]=new Array(size);
                }
                for(var i=0;i<graph_nodes.length;i++){
                     for(var j=i;j<graph_nodes.length;j++){
                         var Grid = this.grid.clone();
                         var finder = Panel.getFinder();
                         if(finder ==  undefined ){ window.alert("Please select search Algo");}
                         var dist = finder.findPath(
                                 this.endNodes[i][0], this.endNodes[i][1], this.endNodes[j][0], this.endNodes[j][1], Grid
                             );
                        var len = PF.Util.pathLength(dist);
                        graph_nodes[i][j]=new Array(2);
                        graph_nodes[j][i]=new Array(2);
                        graph_nodes[j][i][0]=len;
                        graph_nodes[j][i][1]=dist;
                        graph_nodes[i][j][0]=len;
                        graph_nodes[i][j][1]= dist.reverse();
                    }
                }
                pathArray = new Array();
                path=new Array();
                len = this.getPath(1,graph_nodes,0,size, path);
                f = path.p.reverse();
                l = f.length;
                for(var j=0; j<l-1; j++){
                     if(f[j+1] > f[j] ) graph_nodes[f[j]][f[j+1]][1].reverse();
                     pathArray = pathArray.concat(graph_nodes[f[j]][f[j+1]][1]); 
                }   
                this.path = pathArray;
                this.len=len;
                break;
        }
        this.operationCount = this.operations.length;
        timeEnd = window.performance ? performance.now() : Date.now();
        this.timeSpent = (timeEnd - timeStart).toFixed(4);
        this.loop();
        // => searching
    },

    onrestart: function() {
        // When clearing the colorized nodes, there may be
        // nodes still animating, which is an asynchronous procedure.
        // Therefore, we have to defer the `abort` routine to make sure
        // that all the animations are done by the time we clear the colors.
        // The same reason applies for the `onreset` event handler.
        setTimeout(function() {
            Controller.clearOperations();
            Controller.clearFootprints();
            Controller.start();
        }, View.nodeColorizeEffect.duration * 1.2);
        // => restarting
    },
    onpause: function(event, from, to) {
        // => paused
    },
    onresume: function(event, from, to) {
        this.loop();
        // => searching
    },
    oncancel: function(event, from, to) {
        this.clearOperations();
        this.clearFootprints();
        // => ready
    },
    onfinish: function(event, from, to) {
        View.showStats({
            pathLength: this.len,
            timeSpent:  this.timeSpent,
            operationCount: this.operationCount,
        });
        View.drawPath(this.path);
        // => finished
    },
    onclear: function(event, from, to) {
        this.clearOperations();
        this.clearFootprints();
        // => ready
    },
    onmodify: function(event, from, to) {
        // => modified
    },
    onset: function(event, from, to) {
        setTimeout(function() {
            Controller.clearOperations();
            Controller.clearAll();
            Controller.buildNewGrid();
            Controller.setDefaultStartEndPos();
        }, View.nodeColorizeEffect.duration * 1.2);
        // => ready
    },
    onreset: function(event, from, to) {
        setTimeout(function() {
            Controller.clearOperations();
            Controller.clearAll();
            Controller.buildNewGrid();
        }, View.nodeColorizeEffect.duration * 1.2);
        // => ready
    },

    /**
     * The following functions are called on entering states.
     */

    onready: function() {
        console.log('=> ready');
        this.setButtonStates({
            id: 3,
            text: 'Start Search',
            enabled: true,
            callback: $.proxy(this.start, this),
        }, {
            id: 4,
            text: 'Pause Search',
            enabled: false,
        }, {
            id: 5,
            text: 'Clear Terrain',
            enabled: true,
            callback: $.proxy(this.reset, this),
        },

        {
            id: 2,
            text: 'Set maze',
            enabled: true,
            callback: $.proxy(this.drawMaze,this),
        },
        {
            id: 1,
            text: 'Set dest',
            enabled: true,
            callback: $.proxy(this.set, this),
        },
    );
        // => [starting, draggingStart, draggingEnd, drawingStart, drawingEnd]
    },
    onstarting: function(event, from, to) {
        console.log('=> starting');
        // Clears any existing search progress
        this.clearFootprints();
        this.setButtonStates({
            id: 4,
            enabled: true,
        },
        {
            id: 1,
            text: 'Set dest',
            enabled: false,
            callback: $.proxy(this.set, this),
        },
        {
            id: 2,
            enabled: false,
        }
        );
        this.search();
        // => searching
    },
    onsearching: function() {
        console.log('=> searching');
        this.setButtonStates({
            id: 3,
            text: 'Restart Search',
            enabled: true,
            callback: $.proxy(this.restart, this),
        }, {
            id: 4,
            text: 'Pause Search',
            enabled: true,
            callback: $.proxy(this.pause, this),
        },{
            id: 1,
            text: 'Set dest',
            enabled: false,
            callback: $.proxy(this.set, this),
        },
        {
            id: 2,
            enabled: false,
        });
        // => [paused, finished]
    },
    onpaused: function() {
        console.log('=> paused');
        this.setButtonStates({
            id: 3,
            text: 'Resume Search',
            enabled: true,
            callback: $.proxy(this.resume, this),
        }, {
            id: 4,
            text: 'Cancel Search',
            enabled: true,
            callback: $.proxy(this.cancel, this),
        },{
            id: 1,
            text: 'Set dest',
            enabled: false,
            callback: $.proxy(this.set, this),
        },
        {
            id: 2,
            enabled: false,
        });
        // => [searching, ready]
    },
    onfinished: function() {
        console.log('=> finished');
        this.setButtonStates({
            id: 3,
            text: 'Restart Search',
            enabled: true,
            callback: $.proxy(this.restart, this),
        }, {
            id: 4,
            text: 'Clear Path',
            enabled: true,
            callback: $.proxy(this.clear, this),
        },{
            id: 1,
            text: 'Set dest',
            enabled: true,
            callback: $.proxy(this.set, this),
        },
        {
            id: 2,
            enabled: true,
        });
    },
    onmodified: function() {
        console.log('=> modified');
        this.setButtonStates({
            id: 3,
            text: 'Start Search',
            enabled: true,
            callback: $.proxy(this.start, this),
        }, {
            id: 4,
            text: 'Clear Path',
            enabled: true,
            callback: $.proxy(this.clear, this),
        },{
            id: 1,
            text: 'Set dest',
            enabled: true,
            callback: $.proxy(this.set, this),
        },
        {
            id: 2,
            enabled: true,
        });
    },

    hookPathFinding: function() {

        PF.Node.prototype = {
            get opened() {
                return this._opened;
            },
            set opened(v) {
                this._opened = v;
                Controller.operations.push({
                    x: this.x,
                    y: this.y,
                    attr: 'opened',
                    value: v
                });
            },
            get closed() {
                return this._closed;
            },
            set closed(v) {
                this._closed = v;
                Controller.operations.push({
                    x: this.x,
                    y: this.y,
                    attr: 'closed',
                    value: v
                });
            },
            get tested() {
                return this._tested;
            },
            set tested(v) {
                this._tested = v;
                Controller.operations.push({
                    x: this.x,
                    y: this.y,
                    attr: 'tested',
                    value: v
                });
            },
        };

        this.operations = [];
    },
    bindEvents: function() {
        $('#draw_area').mousedown($.proxy(this.mousedown, this));
        $(window)
            .mousemove($.proxy(this.mousemove, this))
            .mouseup($.proxy(this.mouseup, this));
    },
    loop: function() {
        var interval = 1000 / this.operationsPerSecond;
        (function loop() {
            if (!Controller.is('searching')) {
                return;
            }
            Controller.step();
            setTimeout(loop, interval);
        })();
    },
    step: function() {
        var operations = this.operations,
            op, isSupported;

        do {
            if (!operations.length) {
                this.finish(); // transit to `finished` state
                return;
            }
            op = operations.shift();
            isSupported = View.supportedOperations.indexOf(op.attr) !== -1;
        } while (!isSupported);

        View.setAttributeAt(op.x, op.y, op.attr, op.value);
    },
    clearOperations: function() {
        this.operations = [];
    },
    clearFootprints: function() {
        View.clearFootprints();
        View.clearPath();
    },
    clearAll: function() {
        this.clearFootprints();
        View.clearBlockedNodes();
        View.clearHillNodes();
        View.clearValleyNodes();
    },
    buildNewGrid: function() {
        this.grid = new PF.Grid(this.gridSize[0], this.gridSize[1]);
    },
    mousedown: function (event) {
        var coord = View.toGridCoordinate(event.pageX, event.pageY),
            gridX = coord[0],
            gridY = coord[1],
            grid  = this.grid;

        if (this.can('dragStart') && this.isStartPos(gridX, gridY)) {
            this.dragStart();
            return;
        }
        if (this.can('dragEnd') && this.isEndPos(gridX, gridY, 1)) {
            this.dragEnd();
            return;
        }
            if (this.can('dragEnd2') && this.isEndPos(gridX, gridY,2)) {
                this.dragEnd2();
                return;
            }
            if (this.can('dragEnd3') && this.isEndPos(gridX, gridY,3)) {
                this.dragEnd3();
                return;
        }
        if (this.can('dragEnd4') && this.isEndPos(gridX, gridY,4)) {
            this.dragEnd4();
            return;
        }
        if (this.can('drawWall') && this.getchoice()==0 && grid.isWalkableAt(gridX, gridY)) {
            this.drawWall(gridX, gridY);
            return;
        }
        if (this.can('erase') && (!grid.isWalkableAt(gridX, gridY) || grid.isHillAt(gridX, gridY) || grid.isValleyAt(gridX,gridY) ) ) {
            this.erase(gridX, gridY);
            return;
        }
        if (this.can('drawHill') && this.getchoice()==1 &&  !grid.isHillAt(gridX, gridY)) {
            this.drawHill(gridX, gridY);
            return;
        }
        if (this.can('drawValley') && this.getchoice()==2 &&  !grid.isValleyAt(gridX, gridY)) {
            this.drawValley(gridX, gridY);
            return;
        }
    },
    mousemove: function(event) {
        var coord = View.toGridCoordinate(event.pageX, event.pageY),
            grid = this.grid,
            gridX = coord[0],
            gridY = coord[1];

        if (this.isStartOrEndPos(gridX, gridY)) {
            return;
        }

        switch (this.current) {
        case 'draggingStart':
            if (grid.isWalkableAt(gridX, gridY)) {
                this.setStartPos(gridX, gridY);}
            break;
        case 'draggingEnd':
            if (grid.isWalkableAt(gridX, gridY)) {
                this.setEndPos(gridX, gridY,1);}
            break;
        case 'draggingEnd2':
            if (grid.isWalkableAt(gridX, gridY)) {
                this.setEndPos(gridX, gridY,2);}
            break;
        case 'draggingEnd3':
            if (grid.isWalkableAt(gridX, gridY)) {
                this.setEndPos(gridX, gridY,3);}
            break;
        case 'draggingEnd4':
            if (grid.isWalkableAt(gridX, gridY)) {
                this.setEndPos(gridX, gridY,4);}
            break;
        case 'drawingWall':
            this.setWalkableAt(gridX, gridY, false);
            break;
        case 'erasing':
            this.setWalkableAt(gridX, gridY, true);
            this.setHillAt(gridX, gridY, false);
            this.setValleyAt(gridX, gridY, false);
            break;
        case 'drawingHill':
            this.setHillAt(gridX, gridY, true);
            break;
        case 'drawingValley':
            this.setValleyAt(gridX, gridY, true);
            break;
        }
    },
    mouseup: function(event) {
        if (Controller.can('rest')) {
            Controller.rest();
        }
    },
    setButtonStates: function() {
        $.each(arguments, function(i, opt) {
            var $button = Controller.$buttons.eq(opt.id -1);
            if (opt.text) {
                $button.text(opt.text);
            }
            if (opt.callback) {
                $button
                    .unbind('click')
                    .click(opt.callback);
            }
            if (opt.enabled === undefined) {
                return;
            } else if (opt.enabled) {
                $button.removeAttr('disabled');
            } else {
                $button.attr({ disabled: 'disabled' });
            }
        });
    },

    setDefaultStartEndPos: function() {
        var width, height,
            marginRight, availWidth,
            centerX, centerY,
            endX, endY,
            nodeSize = View.nodeSize;

        width  = $(window).width();
        height = $(window).height();

        marginRight = $('#algorithm_panel').width();
        availWidth = width - marginRight;

        centerX = Math.ceil(availWidth / 2 / nodeSize);
        centerY = Math.floor(height / 2 / nodeSize);

        this.setStartPos(centerX - 6, centerY + 1);
        this.setEndPos(centerX + 6, centerY+1, 1);

        if(Controller.getDest() === "Two") {
            this.setEndPos(centerX, centerY+6, 2);

            if(this.endNodes[4]){
               this.setEndPos(64*nodeSize, 36*nodeSize, 4);
               this.endNodes.splice(4);
            }

            if(this.endNodes[3]){
               this.setEndPos(64*nodeSize, 36*nodeSize, 3);
               this.endNodes.splice(3);
            }
        }
        else if(Controller.getDest() === "Three"){
            this.setEndPos(centerX, centerY+6, 2);
            this.setEndPos(centerX, centerY-6, 3);

            if(this.endNodes[4]){
               this.setEndPos(64*nodeSize, 36*nodeSize, 4);
               this.endNodes.splice(4);
            }
        }
        else if(Controller.getDest() === "Four"){
            this.setEndPos(centerX, centerY+6, 2);
            this.setEndPos(centerX, centerY-6, 3);
            this.setEndPos(centerX-10, centerY, 4);

        }
        else{
            if(this.endNodes[4]){
               this.setEndPos(64*nodeSize, 36*nodeSize, 4);
               this.endNodes.splice(4);
            }

            if(this.endNodes[3]){
               this.setEndPos(64*nodeSize, 36*nodeSize, 3);
               this.endNodes.splice(3);
            }

            if(this.endNodes[2]){
               this.setEndPos(64*nodeSize, 36*nodeSize, 2);
               this.endNodes.splice(2);
            }
        }
    },
    setStartPos: function(gridX, gridY) {
        this.endNodes[0] = [gridX, gridY];
        View.setStartPos(gridX, gridY);
    },
    setEndPos: function(gridX, gridY, n) {
       this.endNodes[n] = [gridX, gridY];
        View.setEndPos(gridX, gridY,n);
    },
    setWalkableAt: function(gridX, gridY, walkable) {
        this.grid.setWalkableAt(gridX, gridY, walkable);
        View.setAttributeAt(gridX, gridY, 'walkable', walkable);
    },
    setHillAt: function(gridX, gridY, hill) {
        this.grid.setHillAt(gridX, gridY, hill);
        View.setAttributeAt(gridX, gridY, 'hill', hill);
    },
    setValleyAt: function(gridX, gridY, valley) {
        this.grid.setValleyAt(gridX, gridY, valley);
        View.setAttributeAt(gridX, gridY, 'valley', valley);
    },
    isStartPos: function(gridX, gridY) {
        return gridX === this.endNodes[0][0] && gridY === this.endNodes[0][1];
    },
    isEndPos: function(gridX, gridY, n) {
        if(this.endNodes[n] === undefined) return false;
        return (gridX === this.endNodes[n][0] && gridY === this.endNodes[n][1]);
    },
    isStartOrEndPos: function(gridX, gridY) {
        return this.isStartPos(gridX, gridY) || this.isEndPos(gridX, gridY, 1) || this.isEndPos(gridX, gridY, 2)
           || this.isEndPos(gridX, gridY, 3) || this.isEndPos(gridX, gridY, 4);
    },
});
