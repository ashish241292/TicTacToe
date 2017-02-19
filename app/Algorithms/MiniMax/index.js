class Position {
    constructor( xPositopn, yPosition ) {
        this.x = xPositopn;
        this.y = yPosition;
    }
}

export default class MiniMax {
    constructor( minimizer = 2, maximizer = 1, winState = [
        [ [0,0], [0,1], [0,2] ],
        [ [1,0], [1,1], [1,2] ],
        [ [2,0], [2,1], [2,2] ],
        [ [0,0], [1,0], [2,0] ],
        [ [0,1], [1,1], [2,1] ],
        [ [0,2], [1,2], [2,2] ],
        [ [0,0], [1,1], [2,2] ],
        [ [0,2], [1,1], [2,0] ],
    ]) {
        this.minPlayer = minimizer;
        this.maxPlayer = maximizer;
        this.winState = winState;
    }
    cloneBoard( board ){
        let newBoard = new Array();
        for (let row in board) {
            newBoard.push( board[ row ].slice(0) );
        }
        return newBoard;
    }
    isItTie( board ){
        for (var i = 0; i < board.length; i++) {
            for (var j = 0; j < board[i].length; j++) {
                if ( board[i][j] == 0 ){
                    return false;
                }
            }
        }
        return true;
    }
    checkWinner( player, board ){
        for (var i = 0; i < this.winState.length; i++) {
            let co = this.winState[i];
            //console.log(co);
            if( board[co[0][0]][co[0][1]] == player &&
                board[co[1][0]][co[1][1]] == player &&
                board[co[2][0]][co[2][1]] == player ) {
                return true;
            }
        }
        return false;
    }
    makeMove( board, player, move ){
        let newBoard  = this.cloneBoard( board );
        let { x, y } = move;
        if ( newBoard[x][y] == 0) {
            newBoard[x][y] = player;
            return newBoard;
        }
        return null;
    }
    findMove( board ){
        let bestMoveValue = -100;
        let _depth = 10000;
        let move = new Position( 0, 0 );
        for (var i = 0; i < board.length; i++) {
            for (var j = 0; j < board[i].length; j++) {
                if ( board[i][j] == 0 ) {
                    let newBoard = this.makeMove( board, this.maxPlayer, new Position(i,j), );
                    if ( newBoard ){
                        let depth = Object.assign( {},{ value: 1 } );
                        let predictedMoveValue = this.minValue( newBoard, depth );
                        //console.log(depth, predictedMoveValue, {i,j});
                        if( predictedMoveValue > bestMoveValue ) {// || (depth.value < _depth && predictedMoveValue > -1) ) {
                            bestMoveValue = predictedMoveValue;
                            _depth = depth.value
                            move.x = i;
                            move.y = j;
                        }
                    }
                }
            }
        }
        console.log(move);
        return move;
    }
    minValue( board, depth ){
        if ( this.checkWinner( this.maxPlayer, board ) ){
            return 1;
        } else if ( this.checkWinner( this.minPlayer, board ) ){
            return -1;
        }else if ( this.isItTie( board ) ) {
            return 0;
        } else {
            let bestMoveValue = 100;
            let move = new Position( 0, 0);
            for (var i = 0; i < board.length; i++) {
                for (var j = 0; j < board[i].length; j++) {
                    let newBoard = this.makeMove( board, this.minPlayer, new Position(i,j) );
                    if ( newBoard ){
                        depth.value++;
                        let predictedMoveValue = this.maxValue( newBoard, depth );
                        if( predictedMoveValue < bestMoveValue ) {
                            bestMoveValue = predictedMoveValue;
                            move.x = i;
                            move.y = j;
                        }
                    }
                }
            }
            return bestMoveValue;
        }
    }
    maxValue( board, depth ){
        if ( this.checkWinner( this.maxPlayer, board ) ){
            return 1;
        } else if ( this.checkWinner( this.minPlayer, board ) ){
            return -1;
        }else if ( this.isItTie( board ) ) {
            return 0;
        } else {
            let bestMoveValue = -100;
            let move = new Position( 0, 0);
            for (var i = 0; i < board.length; i++) {
                for (var j = 0; j < board[i].length; j++) {
                    let newBoard = this.makeMove( board, this.maxPlayer, new Position(i,j) );
                    if ( newBoard ){
                        depth.value++;
                        let predictedMoveValue = this.minValue( newBoard, depth );
                        if( predictedMoveValue > bestMoveValue ) {
                            bestMoveValue = predictedMoveValue;
                            move.x = i;
                            move.y = j;
                        }
                    }
                }
            }
            return bestMoveValue;
        }
    }
}
