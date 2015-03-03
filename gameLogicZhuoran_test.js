/**
 * Created by Zhuoran on 2/22/15.
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
        expect(_gameLogic.isMoveOk({turnIndexBeforeMove: turnIndexBeforeMove,
            stateBeforeMove: stateBeforeMove,
            move: move})).toBe(true);
    }

    function expectIllegalMove(turnIndexBeforeMove, stateBeforeMove, move) {
        expect(_gameLogic.isMoveOk({turnIndexBeforeMove: turnIndexBeforeMove,
            stateBeforeMove: stateBeforeMove,
            move: move})).toBe(false);
    }

    it("kill a chess has the same rank is legal", function() {
        var boardBefore = board;
        boardBefore[0][0] = {color:'B', hide:1, rank:3};//Blue Horse
        boardBefore[0][1] = {color:'B', hide:1, rank:7};//Blue General
        boardBefore[0][2] = {color:'', hide:1, rank:2};//Space
        boardBefore[1][0] = {color:'R', hide:1, rank:3};//Red Horse
        boardBefore[1][1] = {color:'R', hide:1, rank:1};//Red Soldier
        boardBefore[1][2] = {color:'B', hide:0, rank:2};//Blue Cannon(unturned)

        var boardAfter = angular.copy(boardBefore);
        boardAfter[0][0] = {color:'', hide:1, rank:3};
        boardAfter[1][0] = {color:'B', hide:1, rank:3};

        expectMoveOk(1,
            {board: boardBefore, delta: {rowBeforeMove: 0, colBeforeMove: 1, rowAfterMove: -1, colAfterMove: -1}},
            [{setTurn: {turnIndex : 0}},
                {set: {key: 'board', value: boardAfter}},
                {set: {key: 'delta', value: {rowBeforeMove: 0, colBeforeMove: 0, rowAfterMove: 1, colAfterMove: 0}}}]);
    });


    it("a Cannon kill any chess has one unturned chess between hori it is legal ", function() {
        var boardBefore = board;
        boardBefore[0][0] = {color:'B', hide:1, rank:3};//Blue Horse
        boardBefore[0][1] = {color:'B', hide:1, rank:7};//Blue General
        boardBefore[0][2] = {color:'', hide:1, rank:2};//Space
        boardBefore[1][0] = {color:'R', hide:1, rank:2};//Red Cannon
        boardBefore[1][1] = {color:'R', hide:0, rank:1};//Red Soldier(unturned)
        boardBefore[1][2] = {color:'B', hide:1, rank:4};//Blue Chariot
        boardBefore[2][1] = {color:'B', hide:1, rank:4};//Blue Chariot
        boardBefore[2][2] = {color:'R', hide:1, rank:4};//Red Chariot

        var boardAfter = angular.copy(boardBefore);
        boardAfter[1][0] = {color:'', hide:1, rank:2};
        boardAfter[1][2] = {color:'R', hide:1, rank:2};

        expectMoveOk(0,
            {board: boardBefore, delta: {rowBeforeMove: 0, colBeforeMove: 1, rowAfterMove: -1, colAfterMove: -1}},
            [{setTurn: {turnIndex : 1}},
                {set: {key: 'board', value: boardAfter}},
                {set: {key: 'delta', value: {rowBeforeMove: 1, colBeforeMove: 0, rowAfterMove: 1, colAfterMove: 2}}}]);
    });

    it("a Cannon kill any chess has one unturned chess between verti it is legal ", function() {
        var boardBefore = board;
        boardBefore[0][0] = {color:'B', hide:1, rank:3};//Blue Horse
        boardBefore[0][1] = {color:'B', hide:1, rank:7};//Blue General
        boardBefore[0][2] = {color:'', hide:1, rank:2};//Space
        boardBefore[1][0] = {color:'R', hide:1, rank:2};//Red Cannon
        boardBefore[1][1] = {color:'R', hide:1, rank:1};//Red Soldier
        boardBefore[1][2] = {color:'B', hide:1, rank:4};//Blue Chariot
        boardBefore[2][0] = {color:'B', hide:0, rank:1};//Blue Soldier
        boardBefore[3][0] = {color:'B', hide:1, rank:1};//Blue Soldier

        var boardAfter = angular.copy(boardBefore);
        boardAfter[1][0] = {color:'', hide:1, rank:2};
        boardAfter[3][0] = {color:'R', hide:1, rank:2};

        expectMoveOk(0,
            {board: boardBefore, delta: {rowBeforeMove: 0, colBeforeMove: 1, rowAfterMove: -1, colAfterMove: -1}},
            [{setTurn: {turnIndex : 1}},
                {set: {key: 'board', value: boardAfter}},
                {set: {key: 'delta', value: {rowBeforeMove: 1, colBeforeMove: 0, rowAfterMove: 3, colAfterMove: 0}}}]);
    });
    
    it("a Cannon kill any chess has more than one unturned chess between verti it is illegal ", function() {
        var boardBefore = board;
        boardBefore[0][0] = {color:'R', hide:1, rank:2};//Red Cannon
        boardBefore[0][1] = {color:'B', hide:1, rank:7};//Blue General
        boardBefore[0][2] = {color:'', hide:1, rank:2};//Space
        boardBefore[1][0] = {color:'B', hide:1, rank:3};//Blue Horse
        boardBefore[1][1] = {color:'R', hide:1, rank:1};//Red Soldier
        boardBefore[1][2] = {color:'B', hide:1, rank:4};//Blue Chariot
        boardBefore[2][0] = {color:'B', hide:0, rank:1};//Blue Soldier
        boardBefore[3][0] = {color:'B', hide:1, rank:1};//Blue Soldier

        var boardAfter = angular.copy(boardBefore);
        boardAfter[0][0] = {color:'', hide:1, rank:2};
        boardAfter[3][0] = {color:'R', hide:1, rank:1};

        expectIllegalMove(0,
            {board: boardBefore, delta: {rowBeforeMove: 0, colBeforeMove: 1, rowAfterMove: -1, colAfterMove: -1}},
            [{setTurn: {turnIndex : 1}},
                {set: {key: 'board', value: boardAfter}},
                {set: {key: 'delta', value: {rowBeforeMove: 1, colBeforeMove: 0, rowAfterMove: 3, colAfterMove: 0}}}]);
    });

    it("kill a chess of one's own is not legal", function() {
        var boardBefore = board;
        boardBefore[0][0] = {color:'B', hide:1, rank:3};//Blue Horse
        boardBefore[0][1] = {color:'B', hide:1, rank:7};//Blue General
        boardBefore[0][2] = {color:'', hide:1, rank:2};//Space
        boardBefore[1][0] = {color:'B', hide:1, rank:2};//Blue Cannon
        boardBefore[1][1] = {color:'R', hide:1, rank:1};//Red Soldier
        boardBefore[1][2] = {color:'B', hide:0, rank:2};//Blue Cannon(unturned)

        var boardAfter = angular.copy(boardBefore);
        boardAfter[0][0] = {color:'', hide:1, rank:3};
        boardAfter[1][0] = {color:'B', hide:1, rank:3};

        expectIllegalMove(1,
            {board: boardBefore, delta: {rowBeforeMove: 0, colBeforeMove: 1, rowAfterMove: -1, colAfterMove: -1}},
            [{setTurn: {turnIndex : 0}},
                {set: {key: 'board', value: boardAfter}},
                {set: {key: 'delta', value: {rowBeforeMove: 0, colBeforeMove: 0, rowAfterMove: 1, colAfterMove: 0}}}]);
    });
    

    it("kill a chess which is not nearly (not with a cannon) has lower rank is illegal", function() {
        var boardBefore = board;
        boardBefore[0][0] = {color:'B', hide:1, rank:3};//Blue Horse
        boardBefore[0][1] = {color:'B', hide:1, rank:7};//Blue General
        boardBefore[0][2] = {color:'', hide:1, rank:2};//Space
        boardBefore[1][0] = {color:'R', hide:1, rank:2};//Red Cannon
        boardBefore[1][1] = {color:'R', hide:1, rank:1};//Red Soldier
        boardBefore[1][2] = {color:'B', hide:0, rank:2};//Blue Cannon(unturned)
        boardBefore[2][0] = {color:'R', hide:1, rank:2};//Red Cannon


        var boardAfter = angular.copy(boardBefore);
        boardAfter[0][0] = {color:'', hide:1, rank:3};
        boardAfter[2][0] = {color:'B', hide:1, rank:3};

        expectIllegalMove(1,
            {board: boardBefore, delta: {rowBeforeMove: 0, colBeforeMove: 1, rowAfterMove: -1, colAfterMove: -1}},
            [{setTurn: {turnIndex : 0}},
                {set: {key: 'board', value: boardAfter}},
                {set: {key: 'delta', value: {rowBeforeMove: 0, colBeforeMove: 0, rowAfterMove: 2, colAfterMove: 0}}}]);
    });

});