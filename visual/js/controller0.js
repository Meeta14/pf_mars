/**
 * The visualization controller will works as a state machine.
 * See files under the `doc` folder for transition descriptions.
 * See https://github.com/jakesgordon/javascript-state-machine
 * for the document of the StateMachine module.
 */
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


    getDest: function(){
            // var destattr =$('input[name=dest]:checked').val();
        var destattr = Panel.getnumdest();
        return destattr;
    },
    getchoice: function(){
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
        // => drawingWall
    },

    Orientation:  function(width, height){
        if(width < height){return 1}
        if(height < width){return 2}
        return  (Math.floor((Math.random() * 2)))+1
    },
    RecursiveMaze : function(grid,x,y,width,height, orientation){
        if(width < 6 || height < 6){return}
            console.log(width,height)
            horizontal = (orientation == 1)

        //where will the wall be drawn from?
        if(horizontal){
            wx = x;
            wy = y +  Math.floor((Math.random() * (height-6)))+3;// random between x+3 to x+ width-3 (so that there is enough space between walls)
            }
            else{
            wx = x + Math.floor((Math.random() * (width-6)))+3; //+  Math.floor(width * .5);
            wy = y;
            }

    // where will the hole be there?
        if(horizontal){
            px=wx+ Math.floor((Math.random() * (width-3))) + 1;  //random between wx+1 to x+ width-2 (as ht =5 means y goes till 5) (so that there is enough space between walls)
            py = wy                                             // it also ensures that px+-1 and py +-1 does not go beyound grid
        }
        else{
            px=wx;
            py=wy+ Math.floor((Math.random() * (height-3))) + 1;
        }
        //what dir awithh the wall be drawn
        if(horizontal){ dx = 1; dy = 0}
        else{dx = 0; dy = 1}

        //length of wall
        if(horizontal){length = width;}
        else{length = height;}
        // console.log(px, wx)

        if(dx){
        for(var i=0; i<length; i++){
            if(i != px || i != px+1 || i != px11){
                this.grid.setWalkableAt(i,wy,false);
                View.setAttributeAt(i, wy, 'walkable',false);
            }
            else{}
            }//for
        }//if
        if(dy){
        for(var i=0; i<length; i++){
            if(i != py || i != py+1 ||i != py-1 ){
                 this.grid.setWalkableAt(wx,i,false);
                View.setAttributeAt(wx, i, 'walkable',false);}
            else{}
        }//for
        }//if

        var nx = x;
        var ny = y;
        //change the wt and ht
        var w, h;
        if(horizontal){
        w = width;
        h = wy-y+1;
        }
        else{
        w = wx-x+1;
        h = height;}
        this.RecursiveMaze(grid, nx, ny, w, h, this.Orientation(w, h));

    //change in sq x and y
        if(horizontal){nx=x; ny = wy+1}
        else{ nx = wx+1; ny = y }

        if(horizontal){
        w = width;
        h = y+height-wy-1}
        else{w = x+width-wx-1;
        h = height;}
        this.RecursiveMaze(grid, nx, ny, w, h, this.Orientation(w, h))
        },

    ondrawMaze: function(event,from,to){
        var maze= $( 'input[name=maze]:checked').val();
        Controller.clearOperations();
        Controller.clearAll();
        Controller.buildNewGrid();
        width = this.gridSize[0];
        height = this.gridSize[1];
        console.log('starting drawing maze')
        this.RecursiveMaze(this.grid,0,0, width, height, this.Orientation(width,height));
},

    onsearch: function(event, from, to) {
        var timeStart, timeEnd;
            // finder = Panel.getFinder();
             timeStart = window.performance ? performance.now() : Date.now();
             var temp = 0;
            par = [];
            for(var i = 0; i < this.endNodes.length-1; i++){
                    j = i+1
                        var Grid = this.grid.clone();
                        var finder = Panel.getFinder();
                        var dist = finder.findPath(
                                this.endNodes[i][0], this.endNodes[i][1], this.endNodes[j][0], this.endNodes[j][1], Grid
                            );
                            par=par.concat(dist);
                            temp = temp + PF.Util.pathLength(dist)
                }
                this.path = par;
                this.len = temp;

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
            text: 'Clear Walls',
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

        this.setStartPos(centerX - 5, centerY);
        this.setEndPos(centerX + 5, centerY, 1);

        if(Controller.getDest() === "Two") {
            this.setEndPos(centerX, centerY+5, 2);

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
            this.setEndPos(centerX, centerY+5, 2);
            this.setEndPos(centerX, centerY-5, 3);

            if(this.endNodes[4]){
               this.setEndPos(64*nodeSize, 36*nodeSize, 4);
               this.endNodes.splice(4);
            }
        }
        else if(Controller.getDest() === "Four"){
            this.setEndPos(centerX, centerY+5, 2);
            this.setEndPos(centerX, centerY-5, 3);
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
