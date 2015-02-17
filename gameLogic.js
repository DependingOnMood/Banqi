/**
 * Created by Dongbo on 2/12/15.
 */
'use strict';

angular.module('myApp', []).factory('gameLogic', function() {

    /**
     * Initial Board For Game
     *
     * board:
     * [[{object}*8],
     *  [{object}*8],
     *  [{object}*8],
     *  [{object}*8]]
     *
     * object elements states as below:
     * color, the chess color, ‘B’:blue, ‘R’:red, ‘’:no chess.
     * hide, 0 if the chess is hided, 1 if the chess is turned
     * rank, the rank of the chess, as the comments stated
     *
     * all objects shuffled and hided for the start of the game
     *
     * @returns {Array}
     */
    function getInitialBoard() {
        var board = [];

        //Insert Blue Chess
        for (var i = 0; i < 5; i++){
            board.push({color:'B', hide:0, rank:1});//Soldier;
        }
        board.push({color:'B', hide:0, rank:2});//Cannon
        board.push({color:'B', hide:0, rank:2});//Cannon
        board.push({color:'B', hide:0, rank:3});//Horse
        board.push({color:'B', hide:0, rank:3});//Horse
        board.push({color:'B', hide:0, rank:4});//Chariot
        board.push({color:'B', hide:0, rank:4});//Chariot
        board.push({color:'B', hide:0, rank:5});//Elephant
        board.push({color:'B', hide:0, rank:5});//Elephant
        board.push({color:'B', hide:0, rank:6});//Advisor
        board.push({color:'B', hide:0, rank:6});//Advisor
        board.push({color:'B', hide:0, rank:7});//General

        //Insert Red Chess
        for (var i = 0; i < 5; i++){
            board.push({color:'R', hide:0, rank:1});//Soldier;
        }
        board.push({color:'R', hide:0, rank:2});//Cannon
        board.push({color:'R', hide:0, rank:2});//Cannon
        board.push({color:'R', hide:0, rank:3});//Horse
        board.push({color:'R', hide:0, rank:3});//Horse
        board.push({color:'R', hide:0, rank:4});//Chariot
        board.push({color:'R', hide:0, rank:4});//Chariot
        board.push({color:'R', hide:0, rank:5});//Elephant
        board.push({color:'R', hide:0, rank:5});//Elephant
        board.push({color:'R', hide:0, rank:6});//Advisor
        board.push({color:'R', hide:0, rank:6});//Advisor
        board.push({color:'R', hide:0, rank:7});//General

        shuffle(board);//shuffle
        board = arrayToMatrix(board, 8);//set it to a 4*8 matrix

        return board;
    }

    /**
     * Shuffle An Array
     * @param arr
     * @returns {*}
     */
    function shuffle(arr){
        for(var j, x, i = arr.length; i; j = Math.floor(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
        return arr;
    }

    /**
     * Turn Array to Matrix Array
     * @param array
     * @param elementsPerSubArray
     * @returns {Array}
     */
    function arrayToMatrix(array, elementsPerSubArray) {
        var matrix = [], i, k;

        for (i = 0, k = -1; i < array.length; i++) {
            if (i % elementsPerSubArray === 0) {
                k++;
                matrix[k] = [];
            }

            matrix[k].push(array[i]);
        }

        return matrix;
    }

    /**
     * Return a winner (either 'R' or 'B') or '' if there is no winner.
     *
     * A game is ended with a winner as the following rule:
     * If the board only has Red chesses left, Red win
     * If the board only has Blue chesses left, Blue win
     *
     * @param board
     * @returns {string}
     */
    function getWinner(board) {
        var numR = 0;
        var numB = 0;
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 8; j++) {
                if (board[i][j].color === 'R') {
                    numR++;
                }
                if (board[i][j].color === 'B') {
                    numB++;
                }
            }
        }
        if (numR === 0) return 'B';
        if (numB === 0) return 'R';
        return '';
    }

    /**
     * Check if the game is tie
     *
     * A game is tie as the following rule:
     * If Red and Blue has both one chess and they are not next to each other, it's a Tie
     * If Red only has one chess left and the chess rank higher than all chess in Blue, it's a Tie
     * If Blue only has one chess left and the chess rank higher than all chess in Red, it's a Tie
     *
     * @param board
     * @returns {boolean}
     */
    function isTie(board) {
        var numR = 0;
        var numB = 0;
        var Rx =0;
        var Ry =0;
        var Bx =0;
        var By =0;
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 8; j++) {
                if (board[i][j].color === 'R') {
                    numR++;
                    Rx = i;
                    Ry = j;
                }
                if (board[i][j].color === 'B') {
                    numB++;
                    Bx = i;
                    By = j;
                }
            }
        }
        // If Red and Blue has both one chess and they are not next to each other, it's a tie
        if (numR === 1 && numB === 1 && !isNext(Rx, Ry, Bx, By)) return true;

        //Red only has one chess left and the chess rank higher than all chess in Blue, it's a tie
        if (numR === 1 && numB > 1){
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 8; j++) {
                    if ((board[i][j].color === 'B') && (board[Rx][Ry].rank < board[i][j].rank)){
                        return false;
                    }
                }
            }
            return true;
        }

        //Blue only has one chess left and the chess rank higher than all chess in Red, it's a tie
        if (numB === 1 && numR > 1){
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 8; j++) {
                    if ((board[i][j].color === 'R') && (board[Bx][By].rank < board[i][j].rank)){
                        return false;
                    }
                }
            }
            return true;
        }

        return false;

    }

    /**
     * Check if two spot (x1,y1) and (x2, y2) is next to each other
     *
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     * @returns {boolean}
     */
    function isNext(x1, y1, x2, y2){
        if (x1 === x2 && (y1 - y2 === 1|| y1 - y2 === -1)) {return true;}
        if (y1 === y2 && (x1 - x2 === 1|| x1 - x2 === -1)) {return true;}
        return false;
    }

    /**
     * Returns all the possible moves for the given board and turnIndexBeforeMove.
     * Returns an empty array if the game is over.
     *
     * @param board
     * @param turnIndexBeforeMove
     * @returns {Array}
     */
    function getPossibleMoves(board, turnIndexBeforeMove){
        var possibleMoves = [];
        var i, j, k, l;
        for (i = 0; i < 4; i++) {
            for (j = 0; j < 8; j++) {
                for (k = 0; k < 4; k++) {
                    for (l = 0; l < 8; l++) {
                        try {
                            possibleMoves.push(createMove(board, i, j, k, l, turnIndexBeforeMove));
                        } catch (e) {
                            // if there are any exceptions then the move is illegal
                        }
                    }
                }
            }
        }
        return possibleMoves;
    }

    /**
     * CreateMove function
     * Move a chess from (rowBeforeMove, colBeforeMove) to (rowAfterMove, colAfterMove)
     * if the chess is hided, simply gave (-1, -1) to (rowAfterMove, colAfterMove), this would turn it over
     * a spot is free if board[row][col].color === ''
     *
     * @param board
     * @param rowBeforeMove
     * @param colBeforeMove
     * @param rowAfterMove
     * @param colAfterMove
     * @param turnIndexBeforeMove
     * @returns {*[]}
     */
    function createMove(board, rowBeforeMove, colBeforeMove, rowAfterMove, colAfterMove,turnIndexBeforeMove){
        if (board === undefined) {
            // Initially (at the beginning of the match), the board in state is undefined.
            board = getInitialBoard();
        }
        //When the space has nothing, cant choose it
        if (board[rowBeforeMove][colBeforeMove].color === '') {
            throw new Error("There is nothing at that position!");
        }
        //when it's not Red's turn, cant choose red showed chess
        if (board[rowBeforeMove][colBeforeMove].color === 'R' && board[rowBeforeMove][colBeforeMove].hide === 1 && turnIndexBeforeMove !== 0) {
            throw new Error("Please wait for your turn!");
        }
        //when it's not Blue's turn, cant choose blue showed chess
        if (board[rowBeforeMove][colBeforeMove].color === 'B' && board[rowBeforeMove][colBeforeMove].hide === 1 && turnIndexBeforeMove !== 1) {
            throw new Error("Please wait for your turn!");
        }
        if (rowBeforeMove === rowAfterMove && colBeforeMove === colAfterMove){
            throw new Error("Same chess, move canceled!");
        }

        var boardAfterMove = angular.copy(board);

        //turn a chess over
        if ((boardAfterMove[rowBeforeMove][colBeforeMove].hide === 0) || (rowAfterMove === -1 && colAfterMove === -1)) {
            boardAfterMove[rowBeforeMove][colBeforeMove].hide = 1;
        }
        //move or kill chess
        else {
            //move chess
            if (boardAfterMove[rowAfterMove][colAfterMove].color === '') {
                boardAfterMove = moveChess(boardAfterMove, rowBeforeMove, colBeforeMove, rowAfterMove, colAfterMove)
            }
            //kill chess
            else {
                boardAfterMove = killChess(boardAfterMove, rowBeforeMove, colBeforeMove, rowAfterMove, colAfterMove)
            }
        }

        var firstOperation;
        var winner = getWinner(boardAfterMove);

        if (winner !== '' || isTie(boardAfterMove)) {
            // Game over.
            firstOperation = {endMatch: {endMatchScores:
                (winner === 'R' ? [1, 0] : (winner === 'B' ? [0, 1] : [0, 0]))}};
        } else {
            // Game continues. Now it's the opponent's turn (the turn switches from 0 to 1 and 1 to 0).
            firstOperation = {setTurn: {turnIndex: 1 - turnIndexBeforeMove}};
        }

        return [firstOperation,
            {set: {key: 'board', value: boardAfterMove}},
            {set: {key: 'delta', value: {rowBeforeMove: rowBeforeMove, colBeforeMove: colBeforeMove, rowAfterMove: rowAfterMove, colAfterMove: colAfterMove }}}];
    }

    /**
     * Move a chess from (rowBeforeMove, colBeforeMove) to a next free spot (rowAfterMove, colAfterMove)
     * Return the board after move
     * 
     * @param board
     * @param rowBeforeMove
     * @param colBeforeMove
     * @param rowAfterMove
     * @param colAfterMove
     * @returns {*}
     */
    function moveChess(board, rowBeforeMove, colBeforeMove, rowAfterMove, colAfterMove){
        if (!isNext(board, rowBeforeMove, colBeforeMove, rowAfterMove, colAfterMove)){
            throw new Error("You can not move the chess to that position!");
        }
        else {
            board[rowAfterMove][colAfterMove]=board[rowBeforeMove][colBeforeMove];
            board[rowBeforeMove][colBeforeMove].color = '';
        }

        return board;
    }

    /**
     * Kill a Chess, place the killer chess from (rowBeforeMove, colBeforeMove) on killed chess (rowAfterMove, colAfterMove)
     * Return the board after kill
     *
     * @param board
     * @param rowBeforeMove
     * @param colBeforeMove
     * @param rowAfterMove
     * @param colAfterMove
     * @returns {*}
     */
    function killChess(board, rowBeforeMove, colBeforeMove, rowAfterMove, colAfterMove){
        //For special Cannon
        if (board[rowBeforeMove][colBeforeMove].rank ===2){
            //check if it's follow the cannon killing rule
            if (rowBeforeMove === rowAfterMove){
                var cnt = 0;
                for (var i = colBeforeMove + 1; i < colAfterMove; i++){
                    if (board[rowAfterMove][i].color !== '') {
                        cnt++;
                    }
                }
                if (cnt === 1) {
                    board[rowAfterMove][colAfterMove]=board[rowBeforeMove][colBeforeMove];
                    board[rowBeforeMove][colBeforeMove].color = '';
                    return board;
                }
            }
            if (colBeforeMove === colAfterMove){
                var cnt = 0;
                for (var i = rowBeforeMove + 1; i < rowAfterMove; i++){
                    if (board[i][colAfterMove].color !== ''){
                        cnt++;
                    }
                }
                if (cnt === 1) {
                    board[rowAfterMove][colAfterMove]=board[rowBeforeMove][colBeforeMove];
                    board[rowBeforeMove][colBeforeMove].color = '';
                    return board;
                }
            }
            throw new Error("You can not kill the chess at that position!");

        }
        //For special general soldier option
        else if (board[rowBeforeMove][colBeforeMove].rank === 7 && board[rowAfterMove][colAfterMove].rank === 1){
            throw new Error("General can not kills soldier, soldier kills General!");
        }
        //For special general soldier option
        else if (board[rowBeforeMove][colBeforeMove].rank === 1 && board[rowAfterMove][colAfterMove].rank === 7){
            board = moveChess(board, rowBeforeMove, colBeforeMove, rowAfterMove, colAfterMove);
            return board;
        }
        //For chesses not Cannon, and not general soldier option
        else{
            //rank compair
            if (board[rowBeforeMove][colBeforeMove].rank >= board[rowAfterMove][colAfterMove].rank){
                board = moveChess(board, rowBeforeMove, colBeforeMove, rowAfterMove, colAfterMove);
                return board;
            }
            throw new Error("You can not kill the chess at that position!");

        }
        //return board;
    }

    /**
     * isMoveOk function
     *
     * @param params
     * @returns {boolean}
     */
    function isMoveOk(params){
        var move = params.move;
        var turnIndexBeforeMove = params.turnIndexBeforeMove;
        var stateBeforeMove = params.stateBeforeMove;
        // The state and turn after move are not needed in any game where all state is public.
        //var turnIndexAfterMove = params.turnIndexAfterMove;
        //var stateAfterMove = params.stateAfterMove;

        // We can assume that turnIndexBeforeMove and stateBeforeMove are legal, and we need
        // to verify that move is legal.
        try {

            var deltaValue = move[2].set.value;
            var rowBeforeMove = deltaValue.rowBeforeMove;
            var colBeforeMove = deltaValue.colBeforeMove;
            var rowAfterMove = deltaValue.rowAfterMove;
            var colAfterMove = deltaValue.colAfterMove;
            var board = stateBeforeMove.board;
            var expectedMove = createMove(board, rowBeforeMove, colBeforeMove, rowAfterMove, colAfterMove, turnIndexBeforeMove);
            if (!angular.equals(move, expectedMove)) {
                return false;
            }
        } catch (e) {
            // if there are any exceptions then the move is illegal
            return false;
        }
        return true;
    }

    return {
        getInitialBoard: getInitialBoard,
        getPossibleMoves: getPossibleMoves,
        createMove: createMove,
        isMoveOk: isMoveOk
    };

});