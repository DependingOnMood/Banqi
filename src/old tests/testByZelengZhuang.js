/**
 * Created by zelengzhuang on 3/3/15.
 */

describe("In Banqi", function() {
    var _gameLogic;
    var board;

    beforeEach(module("myApp"));

    beforeEach(inject(function (gameLogic) {
        _gameLogic = gameLogic;
        board = _gameLogic.getInitialBoard();
    }));

    function expectMoveOk(turnIndexBeforeMove, stateBeforeMove, move) {
        expect(_gameLogic.isMoveOk({
            turnIndexBeforeMove: turnIndexBeforeMove,
            stateBeforeMove: stateBeforeMove,
            move: move
        })).toBe(true);
    }

    function expectIllegalMove(turnIndexBeforeMove, stateBeforeMove, move) {
        expect(_gameLogic.isMoveOk({
            turnIndexBeforeMove: turnIndexBeforeMove,
            stateBeforeMove: stateBeforeMove,
            move: move
        })).toBe(false);
    }

    /*
     I don't know if this is a bug, but I think I have some disagreement on the tie judgement.

     According to the author:
     If Red and Blue has both one chess and they are not next to each other, it's a Tie.

     But in my opinion, it should be judged as a tie that easily, because there is still a chance that
     the game ends in a win-lose condition. Here is an example:

     --------------------
                    | |马|
     --------------------
                    |车| |
     --------------------
     ...

     In this case, when it is 马's turn to make a move, it has to been eaten by 车, so the game ends.
     So the game should not be judged to a tie so early.

     No other bug found.
     */

    it("a Cannon kill any nearby chess is not legal ", function () {
        var boardBefore = board;
        boardBefore[0][0] = {color: 'B', hide: 1, rank: 3};//Blue Horse
        boardBefore[0][1] = {color: 'B', hide: 1, rank: 7};//Blue General
        boardBefore[0][2] = {color: '', hide: 1, rank: 2};//Space
        boardBefore[1][0] = {color: 'R', hide: 1, rank: 2};//Red Cannon
        boardBefore[1][1] = {color: 'R', hide: 1, rank: 1};//Red Soldier
        boardBefore[1][2] = {color: 'B', hide: 0, rank: 2};//Blue Cannon(unturned)
        boardBefore[2][0] = {color: 'R', hide: 1, rank: 1};//Red Soldier
        boardBefore[2][1] = {color: 'B', hide: 1, rank: 4};//Blue Chariot
        boardBefore[2][2] = {color: 'R', hide: 1, rank: 4};//Red Chariot

        var boardAfter = angular.copy(boardBefore);
        boardAfter[1][0] = {color: '', hide: 1, rank: 2};
        boardAfter[2][0] = {color: 'R', hide: 1, rank: 2};

        expectIllegalMove(0,
            {board: boardBefore, delta: {rowBeforeMove: 0, colBeforeMove: 1, rowAfterMove: -1, colAfterMove: -1}},
            [{setTurn: {turnIndex: 1}},
                {set: {key: 'board', value: boardAfter}},
                {set: {key: 'delta', value: {rowBeforeMove: 1, colBeforeMove: 0, rowAfterMove: 2, colAfterMove: 0}}}]);
    });

    it("move a turned chess to the same place is not legal", function () {
        var boardBefore = board;
        boardBefore[0][0] = {color: 'B', hide: 1, rank: 3};//Blue Horse
        boardBefore[0][1] = {color: 'B', hide: 1, rank: 7};//Blue General
        boardBefore[0][2] = {color: '', hide: 1, rank: 2};//Space
        boardBefore[1][0] = {color: 'R', hide: 1, rank: 2};//Red Cannon
        boardBefore[1][1] = {color: 'R', hide: 1, rank: 1};//Red Soldier
        boardBefore[1][2] = {color: 'B', hide: 0, rank: 2};//Blue Cannon(unturned)

        var boardAfter = angular.copy(boardBefore);
        boardAfter[0][1] = {color: 'B', hide: 1, rank: 7};
        boardAfter[0][1] = {color: 'B', hide: 1, rank: 7};

        expectIllegalMove(1,
            {board: boardBefore, delta: {rowBeforeMove: 0, colBeforeMove: 1, rowAfterMove: -1, colAfterMove: -1}},
            [{setTurn: {turnIndex: 0}},
                {set: {key: 'board', value: boardAfter}},
                {set: {key: 'delta', value: {rowBeforeMove: 0, colBeforeMove: 1, rowAfterMove: 0, colAfterMove: 1}}}]);
    });



    it("turn any chess in a new board is legal", function () {
        var boardBefore = board;

        var boardAfter = angular.copy(boardBefore);
        boardAfter[0][6].hide = 1;

        expectMoveOk(0,
            {board: boardBefore},
            [{setTurn: {turnIndex: 1}},
                {set: {key: 'board', value: boardAfter}},
                {
                    set: {
                        key: 'delta',
                        value: {rowBeforeMove: 0, colBeforeMove: 6, rowAfterMove: -1, colAfterMove: -1}
                    }
                }]);
    });

    it("turn a turned chess is not legal", function () {
        var boardBefore = board;
        boardBefore[0][0].hide = 1;

        var boardAfter = angular.copy(boardBefore);
        boardAfter[0][0].hide = 0;

        expectIllegalMove(1,
            {board: boardBefore, delta: {rowBeforeMove: 0, colBeforeMove: 2, rowAfterMove: -1, colAfterMove: -1}},
            [{setTurn: {turnIndex: 0}},
                {set: {key: 'board', value: boardAfter}},
                {
                    set: {
                        key: 'delta',
                        value: {rowBeforeMove: 0, colBeforeMove: 0, rowAfterMove: -1, colAfterMove: -1}
                    }
                }]);
    });

    it("turn a unturned chess is legal", function () {
        var boardBefore = board;
        boardBefore[0][0] = {color: 'B', hide: 1, rank: 3};//Blue Horse
        boardBefore[0][1] = {color: 'B', hide: 1, rank: 7};//Blue General
        boardBefore[0][2] = {color: '', hide: 1, rank: 2};//Space
        boardBefore[1][0] = {color: 'R', hide: 1, rank: 2};//Red Cannon
        boardBefore[1][1] = {color: 'R', hide: 1, rank: 1};//Red Soldier
        boardBefore[1][2] = {color: 'B', hide: 0, rank: 2};//Blue Cannon(unturned)

        var boardAfter = angular.copy(boardBefore);
        boardAfter[1][2].hide = 1;

        expectMoveOk(0,
            {board: boardBefore, delta: {rowBeforeMove: 0, colBeforeMove: 1, rowAfterMove: -1, colAfterMove: -1}},
            [{setTurn: {turnIndex: 1}},
                {set: {key: 'board', value: boardAfter}},
                {
                    set: {
                        key: 'delta',
                        value: {rowBeforeMove: 1, colBeforeMove: 2, rowAfterMove: -1, colAfterMove: -1}
                    }
                }]);
    });

    it("move a turned chess to a space nearby is legal", function () {
        var boardBefore = board;
        boardBefore[0][0] = {color: 'B', hide: 1, rank: 3};//Blue Horse
        boardBefore[0][1] = {color: 'B', hide: 1, rank: 7};//Blue General
        boardBefore[0][2] = {color: '', hide: 1, rank: 2};//Space
        boardBefore[1][0] = {color: 'R', hide: 1, rank: 2};//Red Cannon
        boardBefore[1][1] = {color: 'R', hide: 1, rank: 1};//Red Soldier
        boardBefore[1][2] = {color: 'B', hide: 0, rank: 2};//Blue Cannon(unturned)

        var boardAfter = angular.copy(boardBefore);
        boardAfter[0][1] = {color: '', hide: 1, rank: 7};
        boardAfter[0][2] = {color: 'B', hide: 1, rank: 7};

        expectMoveOk(1,
            {board: boardBefore, delta: {rowBeforeMove: 0, colBeforeMove: 1, rowAfterMove: -1, colAfterMove: -1}},
            [{setTurn: {turnIndex: 0}},
                {set: {key: 'board', value: boardAfter}},
                {set: {key: 'delta', value: {rowBeforeMove: 0, colBeforeMove: 1, rowAfterMove: 0, colAfterMove: 2}}}]);
    });

    it("move a turned chess to a space not nearby is not legal", function () {
        var boardBefore = board;
        boardBefore[0][0] = {color: 'B', hide: 1, rank: 3};//Blue Horse
        boardBefore[0][1] = {color: 'B', hide: 1, rank: 7};//Blue General
        boardBefore[0][2] = {color: '', hide: 1, rank: 2};//Space
        boardBefore[1][0] = {color: 'R', hide: 1, rank: 2};//Red Cannon
        boardBefore[1][1] = {color: 'R', hide: 1, rank: 1};//Red Soldier
        boardBefore[1][2] = {color: 'B', hide: 0, rank: 2};//Blue Cannon(unturned)

        var boardAfter = angular.copy(boardBefore);
        boardAfter[0][0] = {color: '', hide: 1, rank: 3};
        boardAfter[0][2] = {color: 'B', hide: 1, rank: 3};

        expectIllegalMove(1,
            {board: boardBefore, delta: {rowBeforeMove: 0, colBeforeMove: 1, rowAfterMove: -1, colAfterMove: -1}},
            [{setTurn: {turnIndex: 0}},
                {set: {key: 'board', value: boardAfter}},
                {set: {key: 'delta', value: {rowBeforeMove: 0, colBeforeMove: 0, rowAfterMove: 0, colAfterMove: 2}}}]);
    });

    it("move a unturned chess is not legal", function () {
        var boardBefore = board;
        boardBefore[0][0] = {color: 'B', hide: 1, rank: 3};//Blue Horse
        boardBefore[0][1] = {color: 'B', hide: 1, rank: 7};//Blue General
        boardBefore[0][2] = {color: '', hide: 1, rank: 2};//Space
        boardBefore[1][0] = {color: 'R', hide: 1, rank: 2};//Red Cannon
        boardBefore[1][1] = {color: 'R', hide: 1, rank: 1};//Red Soldier
        boardBefore[1][2] = {color: 'B', hide: 0, rank: 2};//Blue Cannon(unturned)

        var boardAfter = angular.copy(boardBefore);
        boardAfter[1][2] = {color: 'B', hide: 0, rank: 2};
        boardAfter[0][2] = {color: 'B', hide: 0, rank: 2};

        expectIllegalMove(1,
            {board: boardBefore, delta: {rowBeforeMove: 0, colBeforeMove: 1, rowAfterMove: -1, colAfterMove: -1}},
            [{setTurn: {turnIndex: 0}},
                {set: {key: 'board', value: boardAfter}},
                {set: {key: 'delta', value: {rowBeforeMove: 1, colBeforeMove: 2, rowAfterMove: 0, colAfterMove: 2}}}]);
    });



    it("move a space is not legal", function () {
        var boardBefore = board;
        boardBefore[0][0] = {color: 'B', hide: 1, rank: 3};//Blue Horse
        boardBefore[0][1] = {color: 'B', hide: 1, rank: 7};//Blue General
        boardBefore[0][2] = {color: '', hide: 1, rank: 2};//Space
        boardBefore[1][0] = {color: 'R', hide: 1, rank: 2};//Red Cannon
        boardBefore[1][1] = {color: 'R', hide: 1, rank: 1};//Red Soldier
        boardBefore[1][2] = {color: 'B', hide: 0, rank: 2};//Blue Cannon(unturned)

        var boardAfter = angular.copy(boardBefore);
        boardAfter[0][2] = {color: '', hide: 1, rank: 2};
        boardAfter[0][3] = {color: '', hide: 1, rank: 2};

        expectIllegalMove(1,
            {board: boardBefore, delta: {rowBeforeMove: 0, colBeforeMove: 1, rowAfterMove: -1, colAfterMove: -1}},
            [{setTurn: {turnIndex: 0}},
                {set: {key: 'board', value: boardAfter}},
                {set: {key: 'delta', value: {rowBeforeMove: 0, colBeforeMove: 2, rowAfterMove: 0, colAfterMove: 3}}}]);
    });

    it("kill a chess has lower rank is legal", function () {
        var boardBefore = board;
        boardBefore[0][0] = {color: 'B', hide: 1, rank: 3};//Blue Horse
        boardBefore[0][1] = {color: 'B', hide: 1, rank: 7};//Blue General
        boardBefore[0][2] = {color: '', hide: 1, rank: 2};//Space
        boardBefore[1][0] = {color: 'R', hide: 1, rank: 2};//Red Cannon
        boardBefore[1][1] = {color: 'R', hide: 1, rank: 1};//Red Soldier
        boardBefore[1][2] = {color: 'B', hide: 0, rank: 2};//Blue Cannon(unturned)

        var boardAfter = angular.copy(boardBefore);
        boardAfter[0][0] = {color: '', hide: 1, rank: 3};
        boardAfter[1][0] = {color: 'B', hide: 1, rank: 3};

        expectMoveOk(1,
            {board: boardBefore, delta: {rowBeforeMove: 0, colBeforeMove: 1, rowAfterMove: -1, colAfterMove: -1}},
            [{setTurn: {turnIndex: 0}},
                {set: {key: 'board', value: boardAfter}},
                {set: {key: 'delta', value: {rowBeforeMove: 0, colBeforeMove: 0, rowAfterMove: 1, colAfterMove: 0}}}]);
    });

    it("kill a chess has higher rank is not legal", function () {
        var boardBefore = board;
        boardBefore[0][0] = {color: 'B', hide: 1, rank: 3};//Blue Horse
        boardBefore[0][1] = {color: 'B', hide: 1, rank: 7};//Blue General
        boardBefore[0][2] = {color: '', hide: 1, rank: 2};//Space
        boardBefore[1][0] = {color: 'R', hide: 1, rank: 2};//Red Cannon
        boardBefore[1][1] = {color: 'R', hide: 1, rank: 1};//Red Soldier
        boardBefore[1][2] = {color: 'B', hide: 0, rank: 2};//Blue Cannon(unturned)
        boardBefore[2][1] = {color: 'B', hide: 1, rank: 4};//Blue Chariot

        var boardAfter = angular.copy(boardBefore);
        boardAfter[1][1] = {color: '', hide: 1, rank: 1};
        boardAfter[2][1] = {color: 'R', hide: 1, rank: 1};

        expectIllegalMove(0,
            {board: boardBefore, delta: {rowBeforeMove: 0, colBeforeMove: 1, rowAfterMove: -1, colAfterMove: -1}},
            [{setTurn: {turnIndex: 1}},
                {set: {key: 'board', value: boardAfter}},
                {set: {key: 'delta', value: {rowBeforeMove: 1, colBeforeMove: 1, rowAfterMove: 2, colAfterMove: 1}}}]);
    });

    it("a Soldier kills a nearby General is legal", function () {
        var boardBefore = board;
        boardBefore[0][0] = {color: 'B', hide: 1, rank: 3};//Blue Horse
        boardBefore[0][1] = {color: 'B', hide: 1, rank: 7};//Blue General
        boardBefore[0][2] = {color: '', hide: 1, rank: 2};//Space
        boardBefore[1][0] = {color: 'R', hide: 1, rank: 2};//Red Cannon
        boardBefore[1][1] = {color: 'R', hide: 1, rank: 1};//Red Soldier
        boardBefore[1][2] = {color: 'B', hide: 0, rank: 2};//Blue Cannon(unturned)
        boardBefore[2][1] = {color: 'B', hide: 1, rank: 4};//Blue Chariot

        var boardAfter = angular.copy(boardBefore);
        boardAfter[1][1] = {color: '', hide: 1, rank: 1};
        boardAfter[0][1] = {color: 'R', hide: 1, rank: 1};

        expectMoveOk(0,
            {board: boardBefore, delta: {rowBeforeMove: 0, colBeforeMove: 1, rowAfterMove: -1, colAfterMove: -1}},
            [{setTurn: {turnIndex: 1}},
                {set: {key: 'board', value: boardAfter}},
                {set: {key: 'delta', value: {rowBeforeMove: 1, colBeforeMove: 1, rowAfterMove: 0, colAfterMove: 1}}}]);
    });

    it("a General kills a nearby Soldier is not legal", function () {
        var boardBefore = board;
        boardBefore[0][0] = {color: 'B', hide: 1, rank: 3};//Blue Horse
        boardBefore[0][1] = {color: 'B', hide: 1, rank: 7};//Blue General
        boardBefore[0][2] = {color: '', hide: 1, rank: 2};//Space
        boardBefore[1][0] = {color: 'R', hide: 1, rank: 2};//Red Cannon
        boardBefore[1][1] = {color: 'R', hide: 1, rank: 1};//Red Soldier
        boardBefore[1][2] = {color: 'B', hide: 0, rank: 2};//Blue Cannon(unturned)
        boardBefore[2][1] = {color: 'B', hide: 1, rank: 4};//Blue Chariot

        var boardAfter = angular.copy(boardBefore);
        boardAfter[0][1] = {color: '', hide: 1, rank: 7};
        boardAfter[1][1] = {color: 'B', hide: 1, rank: 7};

        expectIllegalMove(1,
            {board: boardBefore, delta: {rowBeforeMove: 0, colBeforeMove: 1, rowAfterMove: -1, colAfterMove: -1}},
            [{setTurn: {turnIndex: 0}},
                {set: {key: 'board', value: boardAfter}},
                {set: {key: 'delta', value: {rowBeforeMove: 0, colBeforeMove: 1, rowAfterMove: 1, colAfterMove: 1}}}]);
    });

    it("a Cannon kill any chess has one turned chess between hori it is legal ", function () {
        var boardBefore = board;
        boardBefore[0][0] = {color: 'B', hide: 1, rank: 3};//Blue Horse
        boardBefore[0][1] = {color: 'B', hide: 1, rank: 7};//Blue General
        boardBefore[0][2] = {color: '', hide: 1, rank: 2};//Space
        boardBefore[1][0] = {color: 'R', hide: 1, rank: 2};//Red Cannon
        boardBefore[1][1] = {color: 'R', hide: 1, rank: 1};//Red Soldier
        boardBefore[1][2] = {color: 'B', hide: 1, rank: 4};//Blue Chariot
        boardBefore[2][1] = {color: 'B', hide: 1, rank: 4};//Blue Chariot
        boardBefore[2][2] = {color: 'R', hide: 1, rank: 4};//Red Chariot

        var boardAfter = angular.copy(boardBefore);
        boardAfter[1][0] = {color: '', hide: 1, rank: 2};
        boardAfter[1][2] = {color: 'R', hide: 1, rank: 2};

        expectMoveOk(0,
            {board: boardBefore, delta: {rowBeforeMove: 0, colBeforeMove: 1, rowAfterMove: -1, colAfterMove: -1}},
            [{setTurn: {turnIndex: 1}},
                {set: {key: 'board', value: boardAfter}},
                {set: {key: 'delta', value: {rowBeforeMove: 1, colBeforeMove: 0, rowAfterMove: 1, colAfterMove: 2}}}]);
    });

    it("a Cannon kill any chess has one turned chess between verti it is legal ", function () {
        var boardBefore = board;
        boardBefore[0][0] = {color: 'B', hide: 1, rank: 3};//Blue Horse
        boardBefore[0][1] = {color: 'B', hide: 1, rank: 7};//Blue General
        boardBefore[0][2] = {color: '', hide: 1, rank: 2};//Space
        boardBefore[1][0] = {color: 'R', hide: 1, rank: 2};//Red Cannon
        boardBefore[1][1] = {color: 'R', hide: 1, rank: 1};//Red Soldier
        boardBefore[1][2] = {color: 'B', hide: 1, rank: 4};//Blue Chariot
        boardBefore[2][0] = {color: 'B', hide: 1, rank: 1};//Blue Soldier
        boardBefore[3][0] = {color: 'B', hide: 1, rank: 1};//Blue Soldier

        var boardAfter = angular.copy(boardBefore);
        boardAfter[1][0] = {color: '', hide: 1, rank: 2};
        boardAfter[3][0] = {color: 'R', hide: 1, rank: 2};

        expectMoveOk(0,
            {board: boardBefore, delta: {rowBeforeMove: 0, colBeforeMove: 1, rowAfterMove: -1, colAfterMove: -1}},
            [{setTurn: {turnIndex: 1}},
                {set: {key: 'board', value: boardAfter}},
                {set: {key: 'delta', value: {rowBeforeMove: 1, colBeforeMove: 0, rowAfterMove: 3, colAfterMove: 0}}}]);
    });


    it("kill a unturned chess is not legal", function () {
        var boardBefore = board;
        boardBefore[0][0] = {color: 'B', hide: 1, rank: 3};//Blue Horse
        boardBefore[0][1] = {color: 'B', hide: 1, rank: 7};//Blue General
        boardBefore[0][2] = {color: '', hide: 1, rank: 2};//Space
        boardBefore[1][0] = {color: 'R', hide: 1, rank: 2};//Red Cannon
        boardBefore[1][1] = {color: 'R', hide: 1, rank: 1};//Red Soldier
        boardBefore[1][2] = {color: 'B', hide: 0, rank: 2};//Blue Cannon(unturned)
        boardBefore[2][1] = {color: 'B', hide: 1, rank: 4};//Blue Chariot
        boardBefore[2][2] = {color: 'R', hide: 1, rank: 4};//Red Chariot

        var boardAfter = angular.copy(boardBefore);
        boardAfter[2][2] = {color: '', hide: 1, rank: 4};
        boardAfter[1][2] = {color: 'R', hide: 1, rank: 4};

        expectIllegalMove(0,
            {board: boardBefore, delta: {rowBeforeMove: 0, colBeforeMove: 1, rowAfterMove: -1, colAfterMove: -1}},
            [{setTurn: {turnIndex: 1}},
                {set: {key: 'board', value: boardAfter}},
                {set: {key: 'delta', value: {rowBeforeMove: 2, colBeforeMove: 2, rowAfterMove: 1, colAfterMove: 2}}}]);
    });

    it("move Red chess at Blue's turn is not legal", function () {
        var boardBefore = board;
        boardBefore[0][0] = {color: 'B', hide: 1, rank: 3};//Blue Horse
        boardBefore[0][1] = {color: 'B', hide: 1, rank: 7};//Blue General
        boardBefore[0][2] = {color: '', hide: 1, rank: 2};//Space
        boardBefore[1][0] = {color: 'R', hide: 1, rank: 2};//Red Cannon
        boardBefore[1][1] = {color: 'R', hide: 1, rank: 1};//Red Soldier
        boardBefore[1][2] = {color: 'B', hide: 0, rank: 2};//Blue Cannon(unturned)
        boardBefore[2][1] = {color: 'B', hide: 1, rank: 4};//Blue Chariot

        var boardAfter = angular.copy(boardBefore);
        boardAfter[1][1] = {color: '', hide: 1, rank: 1};
        boardAfter[0][1] = {color: 'R', hide: 1, rank: 1};

        expectIllegalMove(1,
            {board: boardBefore, delta: {rowBeforeMove: 0, colBeforeMove: 1, rowAfterMove: -1, colAfterMove: -1}},
            [{setTurn: {turnIndex: 0}},
                {set: {key: 'board', value: boardAfter}},
                {set: {key: 'delta', value: {rowBeforeMove: 1, colBeforeMove: 1, rowAfterMove: 0, colAfterMove: 1}}}]);
    });

    it("move Blue chess at Red's turn is not legal", function () {
        var boardBefore = board;
        boardBefore[0][0] = {color: 'B', hide: 1, rank: 3};//Blue Horse
        boardBefore[0][1] = {color: 'B', hide: 1, rank: 7};//Blue General
        boardBefore[0][2] = {color: '', hide: 1, rank: 2};//Space
        boardBefore[1][0] = {color: 'R', hide: 1, rank: 2};//Red Cannon
        boardBefore[1][1] = {color: 'R', hide: 1, rank: 1};//Red Soldier
        boardBefore[1][2] = {color: 'B', hide: 0, rank: 2};//Blue Cannon(unturned)

        var boardAfter = angular.copy(boardBefore);
        boardAfter[0][0] = {color: '', hide: 1, rank: 3};
        boardAfter[1][0] = {color: 'B', hide: 1, rank: 3};

        expectIllegalMove(0,
            {board: boardBefore, delta: {rowBeforeMove: 0, colBeforeMove: 1, rowAfterMove: -1, colAfterMove: -1}},
            [{setTurn: {turnIndex: 1}},
                {set: {key: 'board', value: boardAfter}},
                {set: {key: 'delta', value: {rowBeforeMove: 0, colBeforeMove: 0, rowAfterMove: 1, colAfterMove: 0}}}]);
    });

    it("game end with Red win", function () {
        var boardBefore = board;
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 8; j++) {
                boardBefore[i][j].color = '';
                boardBefore[i][j].hide = 1;
            }
        }


        boardBefore[0][0] = {color: 'B', hide: 1, rank: 3};//Blue Horse
        boardBefore[0][1] = {color: 'R', hide: 1, rank: 7};//Red General
        boardBefore[0][2] = {color: 'R', hide: 1, rank: 2};//Red Cannon
        boardBefore[1][0] = {color: 'R', hide: 1, rank: 2};//Red Cannon
        boardBefore[1][1] = {color: 'R', hide: 1, rank: 1};//Red Soldier

        var boardAfter = angular.copy(boardBefore);
        boardAfter[0][1] = {color: '', hide: 1, rank: 7};
        boardAfter[0][0] = {color: 'R', hide: 1, rank: 7};

        expectMoveOk(0,
            {board: boardBefore, delta: {rowBeforeMove: 0, colBeforeMove: 1, rowAfterMove: -1, colAfterMove: -1}},
            [{endMatch: {endMatchScores: [1, 0]}},
                {set: {key: 'board', value: boardAfter}},
                {set: {key: 'delta', value: {rowBeforeMove: 0, colBeforeMove: 1, rowAfterMove: 0, colAfterMove: 0}}}]);
    });

    it("game end with Blue win", function () {
        var boardBefore = board;
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 8; j++) {
                boardBefore[i][j].color = '';
                boardBefore[i][j].hide = 1;
            }
        }

        boardBefore[0][0] = {color: 'B', hide: 1, rank: 3};//Blue Horse
        boardBefore[0][1] = {color: 'B', hide: 1, rank: 7};//Blue General
        boardBefore[0][2] = {color: '', hide: 1, rank: 2};//Space
        boardBefore[1][1] = {color: 'R', hide: 1, rank: 2};//Red Cannon
        boardBefore[1][2] = {color: 'B', hide: 0, rank: 2};//Blue Cannon(unturned)

        var boardAfter = angular.copy(boardBefore);
        boardAfter[0][1] = {color: '', hide: 1, rank: 7};
        boardAfter[1][1] = {color: 'B', hide: 1, rank: 7};

        expectMoveOk(1,
            {board: boardBefore, delta: {rowBeforeMove: 0, colBeforeMove: 1, rowAfterMove: -1, colAfterMove: -1}},
            [{endMatch: {endMatchScores: [0, 1]}},
                {set: {key: 'board', value: boardAfter}},
                {set: {key: 'delta', value: {rowBeforeMove: 0, colBeforeMove: 1, rowAfterMove: 1, colAfterMove: 1}}}]);
    });

    it("game end with Tie, Red has one chess left and higher rank than all Blue chesses", function () {
        var boardBefore = board;
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 8; j++) {
                boardBefore[i][j].color = '';
                boardBefore[i][j].hide = 1;
            }
        }

        boardBefore[0][0] = {color: 'B', hide: 1, rank: 3};//Blue Horse
        boardBefore[0][1] = {color: 'B', hide: 1, rank: 3};//Blue Horse
        boardBefore[0][2] = {color: '', hide: 1, rank: 2};//Space
        boardBefore[1][7] = {color: 'R', hide: 1, rank: 7};//Red General
        boardBefore[1][2] = {color: 'B', hide: 1, rank: 2};//Blue Cannon

        var boardAfter = angular.copy(boardBefore);
        boardAfter[0][1] = {color: '', hide: 1, rank: 3};
        boardAfter[1][1] = {color: 'B', hide: 1, rank: 3};

        expectMoveOk(1,
            {board: boardBefore, delta: {rowBeforeMove: 0, colBeforeMove: 1, rowAfterMove: -1, colAfterMove: -1}},
            [{endMatch: {endMatchScores: [0, 0]}},
                {set: {key: 'board', value: boardAfter}},
                {set: {key: 'delta', value: {rowBeforeMove: 0, colBeforeMove: 1, rowAfterMove: 1, colAfterMove: 1}}}]);

    });

    it("game not end with Tie, Red has one chess left but not higher rank than all Blue chesses", function () {
        var boardBefore = board;
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 8; j++) {
                boardBefore[i][j].color = '';
                boardBefore[i][j].hide = 1;
            }
        }

        boardBefore[0][0] = {color: 'B', hide: 1, rank: 3};//Blue Horse
        boardBefore[0][1] = {color: 'B', hide: 1, rank: 3};//Blue Horse
        boardBefore[0][2] = {color: '', hide: 1, rank: 2};//Space
        boardBefore[1][7] = {color: 'R', hide: 1, rank: 2};//Red Cannon
        boardBefore[1][2] = {color: 'B', hide: 1, rank: 2};//Blue Cannon

        var boardAfter = angular.copy(boardBefore);
        boardAfter[0][1] = {color: '', hide: 1, rank: 3};
        boardAfter[1][1] = {color: 'B', hide: 1, rank: 3};

        expectMoveOk(1,
            {board: boardBefore, delta: {rowBeforeMove: 0, colBeforeMove: 1, rowAfterMove: -1, colAfterMove: -1}},
            [{setTurn: {turnIndex: 0}},
                {set: {key: 'board', value: boardAfter}},
                {set: {key: 'delta', value: {rowBeforeMove: 0, colBeforeMove: 1, rowAfterMove: 1, colAfterMove: 1}}}]);

    });

    it("game end with Tie, Blue has one chess left and higher rank than all Red chesses", function () {
        var boardBefore = board;
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 8; j++) {
                boardBefore[i][j].color = '';
                boardBefore[i][j].hide = 1;
            }
        }

        boardBefore[0][0] = {color: 'R', hide: 1, rank: 3};//Blue Horse
        boardBefore[0][1] = {color: 'R', hide: 1, rank: 3};//Blue Horse
        boardBefore[0][2] = {color: '', hide: 1, rank: 2};//Space
        boardBefore[1][7] = {color: 'B', hide: 1, rank: 7};//Red General
        boardBefore[1][2] = {color: 'R', hide: 1, rank: 2};//Blue Cannon

        var boardAfter = angular.copy(boardBefore);
        boardAfter[0][1] = {color: '', hide: 1, rank: 3};
        boardAfter[1][1] = {color: 'R', hide: 1, rank: 3};

        expectMoveOk(0,
            {board: boardBefore, delta: {rowBeforeMove: 0, colBeforeMove: 1, rowAfterMove: -1, colAfterMove: -1}},
            [{endMatch: {endMatchScores: [0, 0]}},
                {set: {key: 'board', value: boardAfter}},
                {set: {key: 'delta', value: {rowBeforeMove: 0, colBeforeMove: 1, rowAfterMove: 1, colAfterMove: 1}}}]);

    });

    it("game not end with Tie, Blue has one chess left but not higher rank than all Red chesses", function () {
        var boardBefore = board;
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 8; j++) {
                boardBefore[i][j].color = '';
                boardBefore[i][j].hide = 1;
            }
        }

        boardBefore[0][0] = {color: 'R', hide: 1, rank: 3};//Blue Horse
        boardBefore[0][1] = {color: 'R', hide: 1, rank: 3};//Blue Horse
        boardBefore[0][2] = {color: '', hide: 1, rank: 2};//Space
        boardBefore[1][7] = {color: 'B', hide: 1, rank: 2};//Red General
        boardBefore[1][2] = {color: 'R', hide: 1, rank: 2};//Blue Cannon

        var boardAfter = angular.copy(boardBefore);
        boardAfter[0][1] = {color: '', hide: 1, rank: 3};
        boardAfter[1][1] = {color: 'R', hide: 1, rank: 3};

        expectMoveOk(0,
            {board: boardBefore, delta: {rowBeforeMove: 0, colBeforeMove: 1, rowAfterMove: -1, colAfterMove: -1}},
            [{setTurn: {turnIndex: 1}},
                {set: {key: 'board', value: boardAfter}},
                {set: {key: 'delta', value: {rowBeforeMove: 0, colBeforeMove: 1, rowAfterMove: 1, colAfterMove: 1}}}]);

    });

    it("game end with Tie, both has only one chess and not next by each other", function () {
        var boardBefore = board;
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 8; j++) {
                boardBefore[i][j].color = '';
                boardBefore[i][j].hide = 1;
            }
        }

        boardBefore[0][1] = {color: 'R', hide: 1, rank: 3};//Blue Horse
        boardBefore[1][7] = {color: 'B', hide: 1, rank: 7};//Red General

        var boardAfter = angular.copy(boardBefore);
        boardAfter[0][1] = {color: '', hide: 1, rank: 3};
        boardAfter[1][1] = {color: 'R', hide: 1, rank: 3};

        expectMoveOk(0,
            {board: boardBefore, delta: {rowBeforeMove: 0, colBeforeMove: 1, rowAfterMove: -1, colAfterMove: -1}},
            [{endMatch: {endMatchScores: [0, 0]}},
                {set: {key: 'board', value: boardAfter}},
                {set: {key: 'delta', value: {rowBeforeMove: 0, colBeforeMove: 1, rowAfterMove: 1, colAfterMove: 1}}}]);

    });

    it("null move is illegal", function () {
        expectIllegalMove(0, {}, null);
    });

    it("move without board is illegal", function () {
        expectIllegalMove(0, {}, [{setTurn: {turnIndex: 1}}]);
    });

    it("move without delta is illegal", function () {
        var boardBefore = board;
        expectIllegalMove(0, {}, [{setTurn: {turnIndex: 1}},
            {set: {key: 'board', value: boardBefore}}]);
    });

    it("pass no board is legal, but two random board wont be equal most of the time", function () {
        var boardBefore = board;

        var boardAfter = angular.copy(boardBefore);
        boardAfter[0][6].hide = 1;

        expectIllegalMove(0,
            {},
            [{setTurn: {turnIndex: 1}},
                {set: {key: 'board', value: boardAfter}},
                {
                    set: {
                        key: 'delta',
                        value: {rowBeforeMove: 0, colBeforeMove: 6, rowAfterMove: -1, colAfterMove: -1}
                    }
                }]);
    });

});
