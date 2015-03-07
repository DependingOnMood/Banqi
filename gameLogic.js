/**
 * Created by Dongbo on 2/12/15.
 */
'use strict';

angular.module('myApp', []).factory('gameLogic', function() {

    /**
     * initial the Game
     *
     * setTurn:
     * {setTurn: {turnIndex: 0}}
     *
     * set keys (pieces) with position as the key, and hide team all;
     *
     * {set: {key: '0x0', value: 'R1', visibleToPlayerIndexes: []}}
     * ...{{key: '3x7', value: 'B7', visibleToPlayerIndexes: []}}
     *
     * shuffle:
     * {shuffle: ["0x0", ..., "3x7"]}
     *
     * @returns {*[]}
     */
    function initialGame() {

        return [
            //set turn
            {setTurn: {turnIndex: 0}},

            //set delta, (-1, -1) (-1, -1) means initial game
            {set: {key: 'delta', value: {rowBeforeMove: -1, colBeforeMove: -1, rowAfterMove: -1, colAfterMove: -1}}},

            //set keys
            {set: {key: '0x0', value: 'R1', visibleToPlayerIndexes: []}},//Soldier;
            {set: {key: '0x1', value: 'R1', visibleToPlayerIndexes: []}},//Soldier;
            {set: {key: '0x2', value: 'R1', visibleToPlayerIndexes: []}},//Soldier;
            {set: {key: '0x3', value: 'R1', visibleToPlayerIndexes: []}},//Soldier;
            {set: {key: '0x4', value: 'R1', visibleToPlayerIndexes: []}},//Soldier;
            {set: {key: '0x5', value: 'R2', visibleToPlayerIndexes: []}},//Cannon
            {set: {key: '0x6', value: 'R2', visibleToPlayerIndexes: []}},//Cannon
            {set: {key: '0x7', value: 'R3', visibleToPlayerIndexes: []}},//Horse
            {set: {key: '1x0', value: 'R3', visibleToPlayerIndexes: []}},//Horse
            {set: {key: '1x1', value: 'R4', visibleToPlayerIndexes: []}},//Chariot
            {set: {key: '1x2', value: 'R4', visibleToPlayerIndexes: []}},//Chariot
            {set: {key: '1x3', value: 'R5', visibleToPlayerIndexes: []}},//Elephant
            {set: {key: '1x4', value: 'R5', visibleToPlayerIndexes: []}},//Elephant
            {set: {key: '1x5', value: 'R6', visibleToPlayerIndexes: []}},//Advisor
            {set: {key: '1x6', value: 'R6', visibleToPlayerIndexes: []}},//Advisor
            {set: {key: '1x7', value: 'R7', visibleToPlayerIndexes: []}},//General

            {set: {key: '2x0', value: 'B1', visibleToPlayerIndexes: []}},//Soldier;
            {set: {key: '2x1', value: 'B1', visibleToPlayerIndexes: []}},//Soldier;
            {set: {key: '2x2', value: 'B1', visibleToPlayerIndexes: []}},//Soldier;
            {set: {key: '2x3', value: 'B1', visibleToPlayerIndexes: []}},//Soldier;
            {set: {key: '2x4', value: 'B1', visibleToPlayerIndexes: []}},//Soldier;
            {set: {key: '2x5', value: 'B2', visibleToPlayerIndexes: []}},//Cannon
            {set: {key: '2x6', value: 'B2', visibleToPlayerIndexes: []}},//Cannon
            {set: {key: '2x7', value: 'B3', visibleToPlayerIndexes: []}},//Horse
            {set: {key: '3x0', value: 'B3', visibleToPlayerIndexes: []}},//Horse
            {set: {key: '3x1', value: 'B4', visibleToPlayerIndexes: []}},//Chariot
            {set: {key: '3x2', value: 'B4', visibleToPlayerIndexes: []}},//Chariot
            {set: {key: '3x3', value: 'B5', visibleToPlayerIndexes: []}},//Elephant
            {set: {key: '3x4', value: 'B5', visibleToPlayerIndexes: []}},//Elephant
            {set: {key: '3x5', value: 'B6', visibleToPlayerIndexes: []}},//Advisor
            {set: {key: '3x6', value: 'B6', visibleToPlayerIndexes: []}},//Advisor
            {set: {key: '3x7', value: 'B7', visibleToPlayerIndexes: []}},//General

            //shuffle
            {shuffle: { keys: ['0x0', '0x1', '0x2', '0x3', '0x4', '0x5', '0x6', '0x7',
                '1x0', '1x1', '1x2', '1x3', '1x4', '1x5', '1x6', '1x7',
                '2x0', '2x1', '2x2', '2x3', '2x4', '2x5', '2x6', '2x7',
                '3x0', '3x1', '3x2', '3x3', '3x4', '3x5', '3x6', '3x7']}}];

    }

    /**
     * Turn a position (a,b) to 'axb' key version
     * ep. key(0,1) returns '0x1'
     *
     * @param x
     * @param y
     * @returns {string}
     */
    function key(x,y){
        return x.toString() + 'x' + y.toString();
    }

    /**
     * Return a winner (either 'R' or 'B') or '' if there is no winner.
     *
     * A game is ended with a winner as the following rule:
     * If the board only has Red pieces left, Red win
     * If the board only has Blue pieces left, Blue win
     *
     * @param stateBeforeMove
     * @returns {string}
     */
    function getWinner(stateBeforeMove) {
        var numR = 0;
        var numB = 0;
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 8; j++) {
                if (stateBeforeMove[key(i,j)][0] === 'R') {
                    numR++;
                }
                if (stateBeforeMove[key(i,j)][0] === 'B') {
                    numB++;
                }
            }
        }
        if (numR === 0)
            return 'B';
        if (numB === 0)
            return 'R';
        return '';
    }

    /**
     * Check if the game is tie
     *
     * A game is tie as the following rule:
     * If Red and Blue has both one piece and they are not next to each other, it's a Tie
     * If Red only has one piece left and the piece rank higher than all piece in Blue, it's a Tie
     * If Blue only has one piece left and the piece rank higher than all piece in Red, it's a Tie
     *
     * @param stateBeforeMove
     * @returns {boolean}
     */
    function isTie(stateBeforeMove) {
        var numR = 0;
        var numB = 0;
        var Rx =0;
        var Ry =0;
        var Bx =0;
        var By =0;
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 8; j++) {
                if (stateBeforeMove[key(i,j)][0] === 'R') {
                    numR++;
                    Rx = i;
                    Ry = j;
                }
                if (stateBeforeMove[key(i,j)][0] === 'B') {
                    numB++;
                    Bx = i;
                    By = j;
                }
            }
        }
        // If Red and Blue has both one piece and they are not next to each other, it's a tie
        if (numR === 1 && numB === 1 && !isNext(Rx, Ry, Bx, By))
            return true;

        //Red only has one piece left and the piece rank higher than all piece in Blue, it's a tie
        if (numR === 1 && numB > 1){
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 8; j++) {
                    if ((stateBeforeMove[key(i,j)][0] === 'B')
                        && (stateBeforeMove[key(Rx,Ry)][1] < stateBeforeMove[key(i,j)][1])){
                        return false;
                    }
                }
            }
            return true;
        }

        //Blue only has one piece left and the piece rank higher than all piece in Red, it's a tie
        if (numB === 1 && numR > 1){
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 8; j++) {
                    if ((stateBeforeMove[key(i,j)][0] === 'R')
                        && (stateBeforeMove[key(Bx,By)][1] < stateBeforeMove[key(i,j)][1])){
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
        if (x1 === x2 && (y1 - y2 === 1|| y1 - y2 === -1)) {
            return true;
        }
        if (y1 === y2 && (x1 - x2 === 1|| x1 - x2 === -1)) {
            return true;
        }
        return false;
    }

    /**
     * Returns all the possible moves for the given board and turnIndexBeforeMove.
     * Returns an empty array if the game is over.
     *
     * @param stateBeforeMove
     * @param turnIndexBeforeMove
     * @returns {Array}
     */
    function getPossibleMoves(stateBeforeMove, turnIndexBeforeMove){
        var possibleMoves = [];
        var i, j, k, l;
        for (i = 0; i < 4; i++) {
            for (j = 0; j < 8; j++) {
                for (k = -1; k < 4; k++) {
                    for (l = -1; l < 8; l++) {
                        try {
                            possibleMoves.push(createMove(stateBeforeMove, i, j, k, l, turnIndexBeforeMove));
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
     * Move a piece from (rowBeforeMove, colBeforeMove) to (rowAfterMove, colAfterMove)
     * if the piece is hided, simply gave (-1, -1) to (rowAfterMove, colAfterMove), this would turn it over
     * a spot is free if stateBeforeMove[key(row, col)] === ''
     *
     * @param stateBeforeMove
     * @param rowBeforeMove
     * @param colBeforeMove
     * @param rowAfterMove
     * @param colAfterMove
     * @param turnIndexBeforeMove
     * @returns {*}
     */
    function createMove(stateBeforeMove, rowBeforeMove, colBeforeMove, rowAfterMove, colAfterMove,turnIndexBeforeMove){
        if (stateBeforeMove === undefined) {
            // Initially (at the beginning of the match), the board in state is undefined.
            return initialGame();
        }
        //When the space has nothing, cant choose it
        if (stateBeforeMove[key(rowBeforeMove,colBeforeMove)] === '') {
            throw new Error("There is nothing at that position!");
        }

        //can't move a unturned piece
        if ((stateBeforeMove[key(rowBeforeMove,colBeforeMove)] === null) && !(rowAfterMove === -1 && colAfterMove === -1)) {
            throw new Error("Can not move a unturned piece!");
        }

        ////can't turn a turned piece
        if ((stateBeforeMove[key(rowBeforeMove,colBeforeMove)] !== null) && (rowAfterMove === -1 && colAfterMove === -1)) {
            throw new Error("This piece is already turned!");
        }

        //when it's not Red's turn, cant choose red showed piece
        if (stateBeforeMove[key(rowBeforeMove,colBeforeMove)][0] === 'R' && turnIndexBeforeMove !== 0) {
            throw new Error("Please wait for your turn!");
        }
        //when it's not Blue's turn, cant choose blue showed piece
        if (stateBeforeMove[key(rowBeforeMove,colBeforeMove)][0] === 'B' && turnIndexBeforeMove !== 1) {
            throw new Error("Please wait for your turn!");
        }
        if (rowBeforeMove === rowAfterMove && colBeforeMove === colAfterMove){
            throw new Error("Same piece, move canceled!");
        }

        //var stateAfterMove = angular.copy(stateBeforeMove);
        var needToSet;

        //turn a piece over
        if ((stateBeforeMove[key(rowBeforeMove,colBeforeMove)] === null) && (rowAfterMove === -1 && colAfterMove === -1)) {
            needToSet = [{setVisibility: {key: key(rowBeforeMove,colBeforeMove), visibleToPlayerIndexes: null}}];
        }
        //move or kill piece
        else {
            //move piece
            if (stateBeforeMove[key(rowAfterMove, colAfterMove)] === '') {
                needToSet = movePiece(stateBeforeMove, rowBeforeMove, colBeforeMove, rowAfterMove, colAfterMove);
            }
            //kill piece
            else {
                needToSet = killPiece(stateBeforeMove, rowBeforeMove, colBeforeMove, rowAfterMove, colAfterMove);
            }
        }

        var firstOperation;
        var winner = getWinner(stateBeforeMove);

        if (winner !== '' || isTie(stateBeforeMove)) {
            // Game over.
            firstOperation = {endMatch: {endMatchScores:
                (winner === 'R' ? [1, 0] : (winner === 'B' ? [0, 1] : [0, 0]))}};
        } else {
            // Game continues. Now it's the opponent's turn (the turn switches from 0 to 1 and 1 to 0).
            firstOperation = {setTurn: {turnIndex: 1 - turnIndexBeforeMove}};
        }

        return [firstOperation,
            {set: {key: 'delta', value: {rowBeforeMove: rowBeforeMove, colBeforeMove: colBeforeMove,
                rowAfterMove: rowAfterMove, colAfterMove: colAfterMove }}}].concat(needToSet);
    }

    /**
     * Move a piece from (rowBeforeMove, colBeforeMove) to a next free spot (rowAfterMove, colAfterMove)
     *
     * @param stateBeforeMove
     * @param rowBeforeMove
     * @param colBeforeMove
     * @param rowAfterMove
     * @param colAfterMove
     * @returns {*[]}
     */
    function movePiece(stateBeforeMove, rowBeforeMove, colBeforeMove, rowAfterMove, colAfterMove){
        if (!isNext(rowBeforeMove, colBeforeMove, rowAfterMove, colAfterMove)){
            throw new Error("You can not move the piece to that position!");
        }
        else {
            return [{set: {key: key(rowAfterMove, colAfterMove), value: stateBeforeMove[key(rowBeforeMove, colBeforeMove)]}},
                {set: {key: key(rowBeforeMove, colBeforeMove), value: ''}}];
        }
    }

    /**
     * Kill a piece, place the killer piece from (rowBeforeMove, colBeforeMove) on killed piece (rowAfterMove, colAfterMove)
     * Return the the sets
     *
     * @param stateBeforeMove
     * @param rowBeforeMove
     * @param colBeforeMove
     * @param rowAfterMove
     * @param colAfterMove
     * @returns {*[]}
     */
    function killPiece(stateBeforeMove, rowBeforeMove, colBeforeMove, rowAfterMove, colAfterMove){
        //can not kill a unturned piece
        if (stateBeforeMove[key(rowAfterMove, colAfterMove)] === null){
            throw new Error("You can not kill a unturned piece!")
        }
        //For special Cannon
        if (stateBeforeMove[key(rowBeforeMove, colBeforeMove)][1] === '2'){
            //check if it's follow the cannon killing rule
            if (rowBeforeMove === rowAfterMove){
                var cnt = 0;
                for (var i = colBeforeMove + 1; i < colAfterMove; i++){
                    if (stateBeforeMove[key(rowAfterMove, i)] !== '') {
                        cnt++;
                    }
                }
                if (cnt === 1) {
                    return [{set: {key: key(rowAfterMove, colAfterMove), value: stateBeforeMove[key(rowBeforeMove, colBeforeMove)]}},
                        {set: {key: key(rowBeforeMove, colBeforeMove), value: ''}}];
                }
            }
            if (colBeforeMove === colAfterMove){
                var cnt = 0;
                for (var i = rowBeforeMove + 1; i < rowAfterMove; i++){
                    if (stateBeforeMove[key(i, colAfterMove)] !== ''){
                        cnt++;
                    }
                }
                if (cnt === 1) {
                    return [{set: {key: key(rowAfterMove, colAfterMove), value: stateBeforeMove[key(rowBeforeMove, colBeforeMove)]}},
                        {set: {key: key(rowBeforeMove, colBeforeMove), value: ''}}];
                }
            }
            throw new Error("You can not kill the piece at that position!");

        }
        //For special general soldier option
        else if (stateBeforeMove[key(rowBeforeMove, colBeforeMove)][1] === '7'
            && stateBeforeMove[(rowAfterMove, colAfterMove)][1] === '1'){
            throw new Error("General can not kills soldier, soldier kills General!");
        }
        //For special general soldier option
        else if (stateBeforeMove[key(rowBeforeMove, colBeforeMove)][1] === '1'
            && stateBeforeMove[key(rowAfterMove, colAfterMove)][1] === '7'){
            return movePiece(stateBeforeMove, rowBeforeMove, colBeforeMove, rowAfterMove, colAfterMove);
        }
        //For pieces not Cannon, and not general soldier option
        else{
            //rank compare
            if (stateBeforeMove[key(rowBeforeMove, colBeforeMove)][1] >= stateBeforeMove[key(rowAfterMove, colAfterMove)][1]){
                return movePiece(stateBeforeMove, rowBeforeMove, colBeforeMove, rowAfterMove, colAfterMove);
            }
            throw new Error("You can not kill the piece at that position!");

        }
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

            var deltaValue = move[1].set.value;
            var rowBeforeMove = deltaValue.rowBeforeMove;
            var colBeforeMove = deltaValue.colBeforeMove;
            var rowAfterMove = deltaValue.rowAfterMove;
            var colAfterMove = deltaValue.colAfterMove;
            var expectedMove = createMove(stateBeforeMove, rowBeforeMove, colBeforeMove, rowAfterMove, colAfterMove, turnIndexBeforeMove);
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
        initialGame: initialGame,
        getPossibleMoves: getPossibleMoves,
        createMove: createMove,
        isMoveOk: isMoveOk
    };

});