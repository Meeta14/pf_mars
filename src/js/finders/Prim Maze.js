Connect : function(x,y, dir){ //colorizes the node that is next to (x,y) wrt the direction
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

  GetNeighbours : function(x , y, visited, value){
    neighbours_x=[];
      neighbours_y=[];
    dir = [];  // shows the direction where the neighbour is (also the direction for connect)
      s4 = false; s1 = false; // gets updated when any neighbour is found
      s2 = false; s3 = false; // ensures that empty list is not passed on

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
      if(s1+s2+s3+s4 == false){return [0,0,0];} // if no neighbour was found
    return [neighbours_x, neighbours_y, dir];
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
