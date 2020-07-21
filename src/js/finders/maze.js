
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
