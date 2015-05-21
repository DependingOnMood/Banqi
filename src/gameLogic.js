/**
 * Created by Dongbo on 2/12/15.
 */

angular.module('myApp', ['ngTouch', 'ui.bootstrap'])
.factory('gameLogic', function() {

    'use strict';

    /**
     * initial the Game
     *
     * setTurn:
     * {setTurn: {turnIndex: 0}}
     *
     * setDelta -1,-1,-1,-1 for initial:
     * {set: {key: 'delta', value: {rowBeforeMove: -1, colBeforeMove: -1, rowAfterMove: -1, colAfterMove: -1}}},
     *
     * set keys (pieces) with position as the key;
     *
     * {set: {key: '0x0', value: 'R1'}}
     * ...{{key: '3x7', value: 'B7'}}
     *
     * shuffle:
     * {shuffle: ["0x0", ..., "3x7"]}
     *
     * hide:
     * {setVisibility: {key: 'b0x0', visibleToPlayerIndexes: []}}
     * ...{setVisibility: {key: 'b3x7', visibleToPlayerIndexes: []}}
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
            {set: {key: 'b0x0', value: 'R1'}},//Soldier;
            {set: {key: 'b0x1', value: 'R1'}},//Soldier;
            {set: {key: 'b0x2', value: 'R1'}},//Soldier;
            {set: {key: 'b0x3', value: 'R1'}},//Soldier;
            {set: {key: 'b0x4', value: 'R1'}},//Soldier;
            {set: {key: 'b0x5', value: 'R2'}},//Cannon
            {set: {key: 'b0x6', value: 'R2'}},//Cannon
            {set: {key: 'b0x7', value: 'R3'}},//Horse
            {set: {key: 'b1x0', value: 'R3'}},//Horse
            {set: {key: 'b1x1', value: 'R4'}},//Chariot
            {set: {key: 'b1x2', value: 'R4'}},//Chariot
            {set: {key: 'b1x3', value: 'R5'}},//Elephant
            {set: {key: 'b1x4', value: 'R5'}},//Elephant
            {set: {key: 'b1x5', value: 'R6'}},//Advisor
            {set: {key: 'b1x6', value: 'R6'}},//Advisor
            {set: {key: 'b1x7', value: 'R7'}},//General

            {set: {key: 'b2x0', value: 'B1'}},//Soldier;
            {set: {key: 'b2x1', value: 'B1'}},//Soldier;
            {set: {key: 'b2x2', value: 'B1'}},//Soldier;
            {set: {key: 'b2x3', value: 'B1'}},//Soldier;
            {set: {key: 'b2x4', value: 'B1'}},//Soldier;
            {set: {key: 'b2x5', value: 'B2'}},//Cannon
            {set: {key: 'b2x6', value: 'B2'}},//Cannon
            {set: {key: 'b2x7', value: 'B3'}},//Horse
            {set: {key: 'b3x0', value: 'B3'}},//Horse
            {set: {key: 'b3x1', value: 'B4'}},//Chariot
            {set: {key: 'b3x2', value: 'B4'}},//Chariot
            {set: {key: 'b3x3', value: 'B5'}},//Elephant
            {set: {key: 'b3x4', value: 'B5'}},//Elephant
            {set: {key: 'b3x5', value: 'B6'}},//Advisor
            {set: {key: 'b3x6', value: 'B6'}},//Advisor
            {set: {key: 'b3x7', value: 'B7'}},//General

            {set: {key: 'stage', value: 0}},

            //shuffle
            {
                shuffle: {
                    keys: ['b0x0', 'b0x1', 'b0x2', 'b0x3', 'b0x4', 'b0x5', 'b0x6', 'b0x7',
                        'b1x0', 'b1x1', 'b1x2', 'b1x3', 'b1x4', 'b1x5', 'b1x6', 'b1x7',
                        'b2x0', 'b2x1', 'b2x2', 'b2x3', 'b2x4', 'b2x5', 'b2x6', 'b2x7',
                        'b3x0', 'b3x1', 'b3x2', 'b3x3', 'b3x4', 'b3x5', 'b3x6', 'b3x7']
                }
            },
            //hide
            {setVisibility: {key: 'b0x0', visibleToPlayerIndexes: []}},
            {setVisibility: {key: 'b0x1', visibleToPlayerIndexes: []}},
            {setVisibility: {key: 'b0x2', visibleToPlayerIndexes: []}},
            {setVisibility: {key: 'b0x3', visibleToPlayerIndexes: []}},
            {setVisibility: {key: 'b0x4', visibleToPlayerIndexes: []}},
            {setVisibility: {key: 'b0x5', visibleToPlayerIndexes: []}},
            {setVisibility: {key: 'b0x6', visibleToPlayerIndexes: []}},
            {setVisibility: {key: 'b0x7', visibleToPlayerIndexes: []}},
            {setVisibility: {key: 'b1x0', visibleToPlayerIndexes: []}},
            {setVisibility: {key: 'b1x1', visibleToPlayerIndexes: []}},
            {setVisibility: {key: 'b1x2', visibleToPlayerIndexes: []}},
            {setVisibility: {key: 'b1x3', visibleToPlayerIndexes: []}},
            {setVisibility: {key: 'b1x4', visibleToPlayerIndexes: []}},
            {setVisibility: {key: 'b1x5', visibleToPlayerIndexes: []}},
            {setVisibility: {key: 'b1x6', visibleToPlayerIndexes: []}},
            {setVisibility: {key: 'b1x7', visibleToPlayerIndexes: []}},
            {setVisibility: {key: 'b2x0', visibleToPlayerIndexes: []}},
            {setVisibility: {key: 'b2x1', visibleToPlayerIndexes: []}},
            {setVisibility: {key: 'b2x2', visibleToPlayerIndexes: []}},
            {setVisibility: {key: 'b2x3', visibleToPlayerIndexes: []}},
            {setVisibility: {key: 'b2x4', visibleToPlayerIndexes: []}},
            {setVisibility: {key: 'b2x5', visibleToPlayerIndexes: []}},
            {setVisibility: {key: 'b2x6', visibleToPlayerIndexes: []}},
            {setVisibility: {key: 'b2x7', visibleToPlayerIndexes: []}},
            {setVisibility: {key: 'b3x0', visibleToPlayerIndexes: []}},
            {setVisibility: {key: 'b3x1', visibleToPlayerIndexes: []}},
            {setVisibility: {key: 'b3x2', visibleToPlayerIndexes: []}},
            {setVisibility: {key: 'b3x3', visibleToPlayerIndexes: []}},
            {setVisibility: {key: 'b3x4', visibleToPlayerIndexes: []}},
            {setVisibility: {key: 'b3x5', visibleToPlayerIndexes: []}},
            {setVisibility: {key: 'b3x6', visibleToPlayerIndexes: []}},
            {setVisibility: {key: 'b3x7', visibleToPlayerIndexes: []}}
            ];

    }

    /**
     * Turn a position (a,b) to 'axb' key version
     * ep. key(0,1) returns '0x1'
     *
     * @param x
     * @param y
     * @returns {string}
     */
    function key(x, y) {
        return 'b' + x.toString() + 'x' + y.toString();
    }

    /**
     * * Return a winner (either 'R' or 'B') or '' if there is no winner.
     *
     * A game is ended with a winner as the following rule:
     * If the board only has Red pieces left, Red win
     * If the board only has Black pieces left, Black win
     *
     * @param stateBeforeMove
     * @param turnIndexAfterMove
     * @returns {string}
     */
    function getWinner(stateBeforeMove, turnIndexAfterMove, myColor) {
        var numR = 0;
        var numB = 0;
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 8; j++) {
                //if there is a hide piece, the game won't end
                if (stateBeforeMove[key(i, j)] === null) return '';

                if (stateBeforeMove[key(i, j)][0] === 'R') {
                    numR++;
                }
                if (stateBeforeMove[key(i, j)][0] === 'B') {
                    numB++;
                }
            }
        }
        if (numR === 0)
            return 'B';
        if (numB === 0)
            return 'R';

        var yourColor;
        if (myColor === 'R'){ yourColor='B';}
        else if (myColor === 'B'){ yourColor='R';}

        if (angular.equals(getPossibleMoves(stateBeforeMove, turnIndexAfterMove), [])){
            if (turnIndexAfterMove === 0) return yourColor;
            if (turnIndexAfterMove === 1) return myColor;
        }
        return '';
    }

    /**
     * Check if the game is tie
     *
     * A game is tie as the following rule:
     * If Red and Black has both one piece and they are not next to each other, it's a Tie
     * If Red only has one piece left and the piece rank higher than all piece in Black, it's a Tie
     * If Black only has one piece left and the piece rank higher than all piece in Red, it's a Tie
     *
     * @param stateBeforeMove
     * @returns {boolean}
     */
    function isTie(stateBeforeMove) {
        var numR = 0;
        var numB = 0;
        var Rx = 0;
        var Ry = 0;
        var Bx = 0;
        var By = 0;
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 8; j++) {
                //if there is a hide piece, the game won't end
                if (stateBeforeMove[key(i, j)] === null) return false;

                if (stateBeforeMove[key(i, j)][0] === 'R') {
                    numR++;
                    Rx = i;
                    Ry = j;
                }
                if (stateBeforeMove[key(i, j)][0] === 'B') {
                    numB++;
                    Bx = i;
                    By = j;
                }
            }
        }
        // If Red and Black has both one piece and they are not next to each other, it's a tie
        if (numR === 1 && numB === 1 && !isNext(Rx, Ry, Bx, By))
            return true;

        //Red tie situate
        if (numR === 1 && numB > 1) {
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 8; j++) {
                    //Red only has one piece left and the piece rank higher than all piece in Black, it's a tie
                    if ((stateBeforeMove[key(i, j)][0] === 'B')
                        && (stateBeforeMove[key(Rx, Ry)][1] < stateBeforeMove[key(i, j)][1])) {
                        return false;
                    }
                    //Red only has one piece left and it's a General, if Black has no Soldier, it's a tie
                    if ((stateBeforeMove[key(i, j)][0] === 'B')
                        && (stateBeforeMove[key(Rx, Ry)][1] === '7' && stateBeforeMove[key(i, j)][1] === '1')) {
                        return false;
                    }
                    //Red only has one piece left, but Black has a Cannon, it's not tie yet
                    if ((stateBeforeMove[key(i, j)][0] === 'B')
                        && (stateBeforeMove[key(i, j)][1] === '2')) {
                        return false;
                    }
                }
            }
            return true;
        }

        //Black tie situate
        if (numB === 1 && numR > 1) {
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 8; j++) {
                    if ((stateBeforeMove[key(i, j)][0] === 'R')
                        && (stateBeforeMove[key(Bx, By)][1] < stateBeforeMove[key(i, j)][1])) {
                        return false;
                    }
                    //Black only has one piece left and it's a General, if Red has no Soldier, it's a tie
                    if ((stateBeforeMove[key(i, j)][0] === 'R')
                        && (stateBeforeMove[key(Rx, Ry)][1] === '7' && stateBeforeMove[key(i, j)][1] === '1')) {
                        return false;
                    }
                    //Black only has one piece left, but Red has a Cannon, it's not tie yet
                    if ((stateBeforeMove[key(i, j)][0] === 'R')
                        && (stateBeforeMove[key(i, j)][1] === '2')) {
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
    function isNext(x1, y1, x2, y2) {
        if (x1 === x2 && (y1 - y2 === 1 || y1 - y2 === -1)) {
            return true;
        }
        if (y1 === y2 && (x1 - x2 === 1 || x1 - x2 === -1)) {
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
    function getPossibleMoves(stateBeforeMove, turnIndexBeforeMove, myColor) {
        var possibleMoves = [];
        var i, j, k, l;
        for (i = 0; i < 4; i++) {
            for (j = 0; j < 8; j++) {
                for (k = -1; k < 4; k++) {
                    for (l = -1; l < 8; l++) {
                        try {
                            possibleMoves.push(createMove(stateBeforeMove, i, j, k, l, turnIndexBeforeMove, myColor));
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
     * stage 0, createMove
     *
     * @param stateBeforeMove
     * @param rowBeforeMove
     * @param colBeforeMove
     * @param rowAfterMove
     * @param colAfterMove
     * @param turnIndexBeforeMove
     * @returns {*}
     */
    function createMove(stateBeforeMove, rowBeforeMove, colBeforeMove, rowAfterMove, colAfterMove, turnIndexBeforeMove, myColor) {
        var yourColor;
        if (myColor === 'R'){ yourColor='B';}
        else if (myColor === 'B'){ yourColor='R';}

        //When the space has nothing, cant choose it
        if (stateBeforeMove[key(rowBeforeMove, colBeforeMove)] === '') {
            throw new Error("There is nothing at that position!");
        }
        //can't move a unturned piece
        if ((stateBeforeMove[key(rowBeforeMove, colBeforeMove)] === null) && !(rowAfterMove === -1 && colAfterMove === -1)) {
            throw new Error("Can not move a unturned piece!");
        }
        ////can't turn a turned piece
        if ((stateBeforeMove[key(rowBeforeMove, colBeforeMove)] !== null) && (rowAfterMove === -1 && colAfterMove === -1)) {
            throw new Error("This piece is already turned!");
        }
        if (stateBeforeMove[key(rowBeforeMove, colBeforeMove)] !== null) {
            //You can't kill yourself
            if (stateBeforeMove[key(rowBeforeMove, colBeforeMove)][0] === stateBeforeMove[key(rowAfterMove, colAfterMove)][0]) {
                throw new Error("You can't kill yourself!");
            }
            //when it's not Red's turn, cant choose red showed piece
            if (stateBeforeMove[key(rowBeforeMove, colBeforeMove)][0] === myColor && turnIndexBeforeMove !== 0) {
                throw new Error("Please wait for your turn!");
            }
            //when it's not Black's turn, cant choose Black showed piece
            if (stateBeforeMove[key(rowBeforeMove, colBeforeMove)][0] === yourColor && turnIndexBeforeMove !== 1) {
                throw new Error("Please wait for your turn!");
            }
        }
        if (rowBeforeMove === rowAfterMove && colBeforeMove === colAfterMove) {
            throw new Error("Same piece, move canceled!");
        }
        //if state 0, move or kill
        var needToSet;

        //turn a piece over
        if ((stateBeforeMove[key(rowBeforeMove, colBeforeMove)] === null) && (rowAfterMove === -1 && colAfterMove === -1)) {
            needToSet = [{setVisibility: {key: key(rowBeforeMove, colBeforeMove), visibleToPlayerIndexes: null}}];
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

        if (myColor === null || myColor === undefined){myColor='';}
        return [{setTurn: {turnIndex: turnIndexBeforeMove}},
            {
                set: {
                    key: 'delta', value: {
                        rowBeforeMove: rowBeforeMove, colBeforeMove: colBeforeMove,
                        rowAfterMove: rowAfterMove, colAfterMove: colAfterMove
                    }
                }
            },
            {set: {key: 'stage', value: 1}},
            {set: {key: 'myColor', value: myColor}},
        ].concat(needToSet);

    }

    /**
     * checkGameEnd
     * if state 1, check if game end
     *
     * @param stateBeforeMove
     * @param turnIndexBeforeMove
     * @returns {{set: {key: string, value: number}}[]}
     */
    function checkGameEnd(stateBeforeMove, turnIndexBeforeMove, myColor) {
        var firstOperation;
        var winner = getWinner(stateBeforeMove, 1 - turnIndexBeforeMove, myColor);

        var yourColor;
        if (myColor === 'R'){ yourColor ='B';}
        else if (myColor === 'B'){ yourColor='R';}

        console.log('isTie:', isTie(stateBeforeMove));
        console.log('winner in checkGameEnd:', winner);
        console.log('myColor in checkGameEnd:', myColor);
        console.log('yourColor in checkGameEnd:', yourColor);


        if (winner !== '' || isTie(stateBeforeMove)) {
            // Game over.
            firstOperation = {
                endMatch: {
                    endMatchScores: (winner === myColor ? [1, 0] : (winner === yourColor ? [0, 1] : [0, 0]))
                }
            };
        } else {
            // Game continues. Now it's the opponent's turn (the turn switches from 0 to 1 and 1 to 0).
            firstOperation = {setTurn: {turnIndex: 1 - turnIndexBeforeMove}};
        }

        return [firstOperation,
            {set: {key: 'stage', value: 0}}]
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
    function movePiece(stateBeforeMove, rowBeforeMove, colBeforeMove, rowAfterMove, colAfterMove) {
        if (!isNext(rowBeforeMove, colBeforeMove, rowAfterMove, colAfterMove)) {
            throw new Error("You can not move the piece to that position!");
        }
        else {
            return [{
                set: {
                    key: key(rowAfterMove, colAfterMove),
                    value: stateBeforeMove[key(rowBeforeMove, colBeforeMove)]
                }
            },
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
    function killPiece(stateBeforeMove, rowBeforeMove, colBeforeMove, rowAfterMove, colAfterMove) {
        //can not kill a unturned piece
        if (stateBeforeMove[key(rowAfterMove, colAfterMove)] === null) {
            throw new Error("You can not kill a unturned piece!")
        }
        //For special Cannon
        if (stateBeforeMove[key(rowBeforeMove, colBeforeMove)][1] === '2') {
            //check if it's follow the cannon killing rule
            if (rowBeforeMove === rowAfterMove) {
                var cnt = 0;
                var bigger;
                var smaller;
                if (colBeforeMove > colAfterMove){
                    bigger = colBeforeMove;
                    smaller = colAfterMove;
                }
                else{
                    bigger = colAfterMove;
                    smaller = colBeforeMove;
                }

                for (var i = smaller + 1; i < bigger; i++) {
                    if (stateBeforeMove[key(rowAfterMove, i)] !== '') {
                        cnt++;
                    }
                }
                if (cnt === 1) {
                    return [{
                        set: {
                            key: key(rowAfterMove, colAfterMove),
                            value: stateBeforeMove[key(rowBeforeMove, colBeforeMove)]
                        }
                    },
                        {set: {key: key(rowBeforeMove, colBeforeMove), value: ''}}];
                }
            }
            if (colBeforeMove === colAfterMove) {
                var cnt = 0;
                var bigger;
                var smaller;
                if (rowBeforeMove > rowAfterMove){
                    bigger = rowBeforeMove;
                    smaller = rowAfterMove;
                }
                else{
                    bigger = rowAfterMove;
                    smaller = rowBeforeMove;
                }
                for (var i = smaller + 1; i < bigger; i++) {
                    if (stateBeforeMove[key(i, colAfterMove)] !== '') {
                        cnt++;
                    }
                }
                if (cnt === 1) {
                    return [{
                        set: {
                            key: key(rowAfterMove, colAfterMove),
                            value: stateBeforeMove[key(rowBeforeMove, colBeforeMove)]
                        }
                    },
                        {set: {key: key(rowBeforeMove, colBeforeMove), value: ''}}];
                }
            }
            throw new Error("You can not kill the piece at that position!");

        }
        //For special general soldier option
        else if (stateBeforeMove[key(rowBeforeMove, colBeforeMove)][1] === '7'
            && stateBeforeMove[key(rowAfterMove, colAfterMove)][1] === '1') {
            throw new Error("General can not kills soldier, soldier kills General!");
        }
        //For special general soldier option
        else if (stateBeforeMove[key(rowBeforeMove, colBeforeMove)][1] === '1'
            && stateBeforeMove[key(rowAfterMove, colAfterMove)][1] === '7') {
            return movePiece(stateBeforeMove, rowBeforeMove, colBeforeMove, rowAfterMove, colAfterMove);
        }
        //For pieces not Cannon, and not general soldier option
        else {
            //rank compare
            if (stateBeforeMove[key(rowBeforeMove, colBeforeMove)][1] >= stateBeforeMove[key(rowAfterMove, colAfterMove)][1]) {
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
    function isMoveOk(params) {
        var move = params.move;
        var turnIndexBeforeMove = params.turnIndexBeforeMove;
        var stateBeforeMove = params.stateBeforeMove;

        // The state and turn after move are not needed in any game where all state is public.
        //var turnIndexAfterMove = params.turnIndexAfterMove;
        var stateAfterMove = params.stateAfterMove;

        // We can assume that turnIndexBeforeMove and stateBeforeMove are legal, and we need
        // to verify that move is legal.
        try {
            //var isFirstMove = true;
            var myColor;
            var stage;
            if (stateBeforeMove !== (undefined || null)) {
                stage = stateBeforeMove.stage;
            }

            console.log('stage', stage);
            console.log('myColor', myColor);

            if (stage === 0) {

                var deltaValue = move[1].set.value;
                myColor = stateAfterMove["myColor"];
                var rowBeforeMove = deltaValue.rowBeforeMove;
                var colBeforeMove = deltaValue.colBeforeMove;
                var rowAfterMove = deltaValue.rowAfterMove;
                var colAfterMove = deltaValue.colAfterMove;
                var expectedMove = createMove(stateBeforeMove, rowBeforeMove, colBeforeMove,
                    rowAfterMove, colAfterMove, turnIndexBeforeMove, myColor);
                //get myColor
                //if (isFirstMove){
                //    console.log('deltaValue: ', deltaValue);
                //    console.log('stateAfterMove: ', stateAfterMove);
                //    myColor = stateAfterMove[key(deltaValue.rowBeforeMove, deltaValue.colBeforeMove)][0];
                //    console.log('myColor in isMoveOk: ', myColor);
                //    isFirstMove = false;
                //}

                if (!angular.equals(move, expectedMove)) {
                    console.log('move, expectedMove are not equal');
                    console.log('move', move);
                    console.log('expectedMove', expectedMove);
                    return false;
                }
            }
            else if (stage === 1) {
                myColor = stateAfterMove["myColor"];
                var expectedMove = checkGameEnd(stateBeforeMove, turnIndexBeforeMove, myColor);

                if (!angular.equals(move, expectedMove)) {
                    console.log('move, expectedMove are not equal');
                    console.log('move', move);
                    console.log('expectedMove', expectedMove);
                    return false;
                }
            }
            else {
                console.log('should initialGame');
                var expectedMove = initialGame();
                //the move and expected move won't equal because move would set hide pieces to null
                if (!angular.equals(move, expectedMove)) {
                    console.log('move: ', move);
                    console.log('expectedMove: ', expectedMove)
                    console.log('move, expectedMove are not equal');
                    return false;
                }
            }
        } catch (e) {
            // if there are any exceptions then the move is illegal
            console.log('got exceptions in isMoveOk: ', e);
            return false;
        }
        console.log('isMoveOk is True!');
        return true;
    }

    return {
        initialGame: initialGame,
        getPossibleMoves: getPossibleMoves,
        createMove: createMove,
        checkGameEnd: checkGameEnd,
        isMoveOk: isMoveOk
    };

});