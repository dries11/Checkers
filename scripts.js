var canvas = document.getElementById('board');

canvas.width = 400;
canvas.height = 400;
var blockSize = canvas.height/8;
var ctx = canvas.getContext('2d');

var pieces = JSON.parse(readJSON("piecesredo.json"));

var black = new Image();
black.src = './assets/blackChip.png';

var blackKing = new Image();
blackKing.src = './assets/blackKing.png';

var red = new Image();
red.src = './assets/redChip.png';

var redKing = new Image();
redKing.src = './assets/redKing.png';

function readJSON(file){
    var request = new XMLHttpRequest();
    request.open('GET', file, false);
    request.send(null);
    if(request.status == 200){
        console.log(request.responseText);
        return request.responseText;
    }
}

function Piece() {

    this.move = function(arg) {
      console.log("Getting to move");
      if(arg.idy<0 || arg.idx<0 || arg.idy>7 || arg.idx>7){
        return;
      }
      console.log(arg);
      _this.space.draw(ctx);
      _this.space = arg;
      _this.x = arg.x+arg.w/2; _this.y = arg.y+arg.h/2;
      console.log(arg);
      this.draw(ctx);
    }

     this.drawPieces = function(){
      for(var i = 0; i < pieces.length; i++){
        var currentPiece = pieces[i];
        if(currentPiece.identifier < 13){
          if(currentPiece.isKing){
            ctx.drawImage(redKing,currentPiece.column * blockSize, currentPiece.row * blockSize, blockSize, blockSize);
          }
          else{
            ctx.drawImage(red,currentPiece.column * blockSize, currentPiece.row * blockSize, block, blockSize)
          }
        }
        else if(currentPiece.identifier > 12){
          if(currentPiece.isKing){
            ctx.drawImage(blackKing,currentPiece.column * blockSize, currentPiece.row * blockSize, blockSize, blockSize);
          }
          else{
            ctx.drawImage(black,currentPiece.column * blockSize, currentPiece.row * blockSize, blockSize, blockSize);
      }
    }
  }
}

    this.draw(ctx);
}

function Space(x,y,w,h,c,idy,idx) {
  var t = this;
  (function() {
    t.x=x; 
    t.y=y; 
    t.w=w; 
    t.h=h; 
    t.color=c; 
    t.idy=idy; 
    t.idx=idx;
  })();

    this.cyclePieces = function() {
      for(i=0;i<board.pieces.length;i++) {
        if(board.pieces[i].column == this.column && board.pieces[i].row == this.row){
          board.pieces[i].draw(ctx);
        }
      }
    }
    this.hasPiece = function() {
      for(i=0;i<board.pieces.length;i++) {
        if(board.pieces[i].column == this.column && board.pieces[i].row == this.row){
          return i;
        }
      } 
      return undefined;
    }
    this.draw = function(ctx) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x,this.y,this.h,this.w);
    }
    this.reDraw = function() {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x,this.y,this.h,this.w);
      this.cyclePieces();
    }
    this.highlight = function(ctx) {
      ctx.fillStyle = 'rgba(220,200,60,.5)';
      ctx.fillRect(this.x,this.y,this.h,this.w);
      this.cyclePieces();
    }
    this.draw(ctx);
}

function Board() {
  var grid = new Array(8);
  this.drawGrid = function() {
    var boxH = canvas.height/8;
    var boxW = canvas.width/8;
    var incr = 0;
    var x = 0;
    var y = 0;
    var fill = false;

    for(i=0;i<8;i++) {
      grid[i]= new Array(8);
      for(j=0;j<8;j++) {
        var color;
        if(fill) { color = '#b59565'; } else { color = '#ffefdf'; }
        grid[i][j] = new Space(x,y,boxW,boxH,color,i,j);
        incr++; x+=boxW; fill=!fill;
      }
      x=0; y+=boxH; fill=!fill;
    }
  }
  this.grid = grid;

      this.drawPieces = function(){
        for(var i = 0; i < pieces.length; i++){
          var currentPiece = pieces[i];
          if(currentPiece.identifier < 13){
            if(currentPiece.isKing){
              ctx.drawImage(redKing,currentPiece.column * blockSize, currentPiece.row * blockSize, blockSize, blockSize);
            }
            else{
              ctx.drawImage(red,currentPiece.column * blockSize, currentPiece.row * blockSize, blockSize, blockSize)
            }
          }
          else if(currentPiece.identifier > 12){
            if(currentPiece.isKing){
              ctx.drawImage(blackKing,currentPiece.column * blockSize, currentPiece.row * blockSize, blockSize, blockSize);
            }
            else{
              ctx.drawImage(black,currentPiece.column * blockSize, currentPiece.row * blockSize, blockSize, blockSize);
            }
          }
      }
    }
    this.pieces = pieces;

}


var board = new Board();
board.drawGrid();
board.drawPieces();



canvas.addEventListener("mouseup",getPosition,false);
canvas.addEventListener("mousedown",movePiece,true);


  var activeSpace;
  var activePiece;


function getPosition(event) {
  var ey; 
  var ex;

  if(activeSpace!=undefined){
    activeSpace.reDraw();
  }
  if(event.pageX!=undefined && event.pageY!=undefined) {
    var ey = event.pageY;

    var ex = event.pageX;

  } 
  else {
    ey = event.clientY+document.body.scrollTop+document.documentElement.scrollTop;
    ex = event.clientX+document.body.scrollLeft+document.documentElement.scrollLeft;

  }

  ey = Math.floor((ey - canvas.offsetTop)/(canvas.width/8)); 
  ex = Math.floor((ex - canvas.offsetLeft)/(canvas.height/8));

  activeSpace = board.grid[ey][ex];

  activePiece = board.pieces[activeSpace.hasPiece()];
  activeSpace.highlight(ctx);
  console.log("Got Posistion and it eqyals ey =" + ey + " ex =" + ex);
}
//}
function movePiece(event) {
  console.log("Calling movePiece!");
    if(activePiece!=undefined) {
      var my; 
      var mx; 
      var blockX; 
      var blockY;
    }
    if(event.pageX!=undefined && event.pageY!=undefined) {
      my = event.pageY; mx = event.pageX;
    } 
    else {
      my = event.clientY+document.body.scrollTop+document.documentElement.scrollTop;
      mx = event.clientX+document.body.scrollLeft+document.documentElement.scrollLeft;
    }
    console.log("Going through if/else statements")
    my -= canvas.offsetTop; 
    mx -= canvas.offsetLeft;
    blockY = Math.floor(my/(canvas.width/8)); 
    blockX = Math.floor(mx/(canvas.height/8));

    console.log("Getting before move");
    activePiece.move(board.grid[blockY][blockX]);

    //activeSpace.reDraw();
}

