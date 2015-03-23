/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('Banqi', function () {

    'use strict';

    beforeEach(function () {
        browser.get('http://localhost:9000/game.min.html');
    });

    function getDiv(row, col) {
        return element(by.id('div_' + row + 'x' + col));
    }

    function getImg(row, col) {
        return element(by.id('img_' + row + 'x' + col));
    }

    function expectPiece(row, col, pieceKind) {
        // Careful when using animations and asserting isDisplayed:
        // Originally, my animation started from {opacity: 0;}
        // And then the image wasn't displayed.
        // I changed it to start from {opacity: 0.1;}
        expect(getImg(row, col).isDisplayed()).toEqual(pieceKind === "" ? false : true);
        expect(getImg(row, col).getAttribute("src")).toEqual(
            pieceKind === "" ? null : "http://localhost:9000/res/" + pieceKind + ".png");
    }

    function expectNotHide(row, col) {
        expect(getImg(row, col).getAttribute("src")).toNotEqual("http://localhost:9000/res/Hide.png");
    }

    function expectBoard(board) {
        for (var row = 0; row <= 3; row++) {
            for (var col = 0; col <= 7; col++) {
                expectPiece(row, col, board[row][col]);
            }
        }
    }

    function clickDivAndExpectPiece(row, col, pieceKind) {
        getDiv(row, col).click();
        expectPiece(row, col, pieceKind);
    }

    function clickDivAndExpectNotHide(row, col) {
        getDiv(row, col).click();
        expectNotHide(row, col);
    }

    // playMode is either: 'passAndPlay', 'playAgainstTheComputer', 'onlyAIs',
    // or a number representing the playerIndex (-2 for viewer, 0 for white player, 1 for black player, etc)
    function setMatchState(matchState, playMode) {
        console.log("matchState: ", matchState);
        console.log("playMode: ", playMode);
        browser.executeScript(function (matchStateInJson, playMode) {
            var stateService = window.e2e_test_stateService;
            stateService.setMatchState(angular.fromJson(matchStateInJson));
            stateService.setPlayMode(angular.fromJson(playMode));
            angular.element(document).scope().$apply(); // to tell angular that things changes.
        }, JSON.stringify(matchState), JSON.stringify(playMode));
    }

    it('should have a title', function () {
        expect(browser.getTitle()).toEqual('Banqi');
    });

    it('should have an Banqi board with all hide pieces at the beginning', function () {
        expectBoard(
            [['Hide', 'Hide', 'Hide', 'Hide', 'Hide', 'Hide', 'Hide', 'Hide'],
                ['Hide', 'Hide', 'Hide', 'Hide', 'Hide', 'Hide', 'Hide', 'Hide'],
                ['Hide', 'Hide', 'Hide', 'Hide', 'Hide', 'Hide', 'Hide', 'Hide'],
                ['Hide', 'Hide', 'Hide', 'Hide', 'Hide', 'Hide', 'Hide', 'Hide']]);
    });

    it('should not show Hide if clicked any position at the beginning', function () {
        clickDivAndExpectNotHide(0, 0);
    });

    it('should not show Hide if clicked a hided piece any time', function () {
        clickDivAndExpectNotHide(0, 0);
        clickDivAndExpectNotHide(1, 0);
        clickDivAndExpectNotHide(2, 0);
        clickDivAndExpectNotHide(3, 0);
        clickDivAndExpectNotHide(0, 5);
        clickDivAndExpectNotHide(0, 2);
        clickDivAndExpectNotHide(1, 3);
        clickDivAndExpectNotHide(1, 6);
        clickDivAndExpectNotHide(2, 3);
        clickDivAndExpectNotHide(2, 5);
    });

    it('should not turn back to hide if click a a piece not hide', function () {
        clickDivAndExpectNotHide(0, 0);
        clickDivAndExpectNotHide(0, 0);
        clickDivAndExpectNotHide(0, 0);

    });

    var lastStateRedMovedStage1 = {
        delta: {rowBeforeMove: 1, colBeforeMove: 0, rowAfterMove: 1, colAfterMove: 1},
        b0x0: '', b0x1: '', b0x2: '', b0x3: null, b0x4: '', b0x5: '', b0x6: '', b0x7: '',
        b1x0: '', b1x1: 'R2', b1x2: 'R4', b1x3: 'B7', b1x4: '', b1x5: '', b1x6: '', b1x7: '',
        b2x0: '', b2x1: 'B2', b2x2: 'B1', b2x3: 'R1', b2x4: '', b2x5: '', b2x6: '', b2x7: '',
        b3x0: '', b3x1: '', b3x2: '', b3x3: '', b3x4: '', b3x5: '', b3x6: '', b3x7: '',
        stage: 1
    };

    var lastStateRedMovedStage0 = {
        delta: {rowBeforeMove: 1, colBeforeMove: 0, rowAfterMove: 1, colAfterMove: 1},
        b0x0: '', b0x1: '', b0x2: '', b0x3: null, b0x4: '', b0x5: '', b0x6: '', b0x7: '',
        b1x0: '', b1x1: 'R2', b1x2: 'R4', b1x3: 'B7', b1x4: '', b1x5: '', b1x6: '', b1x7: '',
        b2x0: '', b2x1: 'B2', b2x2: 'B1', b2x3: 'R1', b2x4: '', b2x5: '', b2x6: '', b2x7: '',
        b3x0: '', b3x1: '', b3x2: '', b3x3: '', b3x4: '', b3x5: '', b3x6: '', b3x7: '',
        stage: 0
    };

    var lastStateBlueMovedStage1 = {
        delta: {rowBeforeMove: 1, colBeforeMove: 4, rowAfterMove: 1, colAfterMove: 3},
        b0x0: '', b0x1: '', b0x2: '', b0x3: null, b0x4: '', b0x5: '', b0x6: '', b0x7: '',
        b1x0: '', b1x1: 'R2', b1x2: 'R4', b1x3: 'B7', b1x4: '', b1x5: '', b1x6: '', b1x7: '',
        b2x0: '', b2x1: 'B2', b2x2: 'B1', b2x3: 'R1', b2x4: '', b2x5: '', b2x6: '', b2x7: '',
        b3x0: '', b3x1: '', b3x2: '', b3x3: '', b3x4: '', b3x5: '', b3x6: '', b3x7: '',
        stage: 1
    };

    var lastStateBlueMovedStage0 = {
        delta: {rowBeforeMove: 1, colBeforeMove: 4, rowAfterMove: 1, colAfterMove: 3},
        b0x0: '', b0x1: '', b0x2: '', b0x3: null, b0x4: '', b0x5: '', b0x6: '', b0x7: '',
        b1x0: '', b1x1: 'R2', b1x2: 'R4', b1x3: 'B7', b1x4: '', b1x5: '', b1x6: '', b1x7: '',
        b2x0: '', b2x1: 'B2', b2x2: 'B1', b2x3: 'R1', b2x4: '', b2x5: '', b2x6: '', b2x7: '',
        b3x0: '', b3x1: '', b3x2: '', b3x3: '', b3x4: '', b3x5: '', b3x6: '', b3x7: '',
        stage: 0
    };


    var boardBeforeMove = [['', '', '', '', 'Hide', '', '', ''],
        ['', 'R2', 'R4', 'B7', '', '', '', ''],
        ['', 'B2', 'B1', 'R1', '', '', '', ''],
        ['', '', '', '', '', '', '', '']];

    var matchStateRedMoved = {
        turnIndexBeforeMove: 0,
        turnIndex: 1,
        endMatchScores: null,
        lastMove: [{setTurn: {turnIndex: 1}},
            {set: {key: 'stage', value: 0}}],
        lastState: lastStateRedMovedStage1,
        currentState: lastStateRedMovedStage0,
        lastVisibleTo: {'b0x3':[]},
        currentVisibleTo: {'b0x3':[]}
    };

    var matchStateBlueMoved = {
        turnIndexBeforeMove: 1,
        turnIndex: 0,
        endMatchScores: null,
        lastMove: [{setTurn: {turnIndex: 0}},
            {set: {key: 'stage', value: 0}}],
        lastState: lastStateBlueMovedStage1,
        currentState: lastStateBlueMovedStage0,
        lastVisibleTo: {'b0x3':[]},
        currentVisibleTo: {'b0x3':[]}
    };

    iit('Black General would kill a RED Chariot nearby', function () {
        setMatchState(matchStateRedMoved, 'passAndPlay');
        expectBoard(boardBeforeMove);
        clickDivAndExpectPiece(0, 3, "B7"); // winning click!
        clickDivAndExpectPiece(0, 2, "B7"); // can't click after game ended
        expectBoard([['', '', '', '', 'Hide', '', '', ''],
            ['', 'R2', 'B7', '', '', '', '', ''],
            ['', 'B2', 'B1', 'R1', '', '', '', ''],
            ['', '', '', '', '', '', '', '']]);
    });

    var delta1 = {row: 1, col: 0};
    var board1 =
        [['X', 'O', ''],
            ['X', '', ''],
            ['', '', '']];
    var delta2 = {row: 1, col: 1};
    var board2 =
        [['X', 'O', ''],
            ['X', 'O', ''],
            ['', '', '']];
    var delta3 = {row: 2, col: 0};
    var board3 =
        [['X', 'O', ''],
            ['X', 'O', ''],
            ['X', '', '']];
    var delta4 = {row: 2, col: 1};
    var board4 =
        [['X', 'O', ''],
            ['X', 'O', ''],
            ['', 'X', '']];

    var matchState2 = {
        turnIndexBeforeMove: 1,
        turnIndex: 0,
        endMatchScores: null,
        lastMove: [{setTurn: {turnIndex: 0}},
            {set: {key: 'board', value: board2}},
            {set: {key: 'delta', value: delta2}}],
        lastState: {board: board1, delta: delta1},
        currentState: {board: board2, delta: delta2},
        lastVisibleTo: {},
        currentVisibleTo: {},
    };
    var matchState3 = {
        turnIndexBeforeMove: 0,
        turnIndex: -2,
        endMatchScores: [1, 0],
        lastMove: [{endMatch: {endMatchScores: [1, 0]}},
            {set: {key: 'board', value: board3}},
            {set: {key: 'delta', value: delta3}}],
        lastState: {board: board2, delta: delta2},
        currentState: {board: board3, delta: delta3},
        lastVisibleTo: {},
        currentVisibleTo: {},
    };
    var matchState4 = {
        turnIndexBeforeMove: 0,
        turnIndex: 1,
        endMatchScores: null,
        lastMove: [{setTurn: {turnIndex: 1}},
            {set: {key: 'board', value: board4}},
            {set: {key: 'delta', value: delta4}}],
        lastState: {board: board2, delta: delta2},
        currentState: {board: board4, delta: delta4},
        lastVisibleTo: {},
        currentVisibleTo: {},
    };

    it('can start from a match that is about to end, and win', function () {
        setMatchState(matchState2, 'passAndPlay');
        expectBoard(board2);
        clickDivAndExpectPiece(2, 0, "X"); // winning click!
        clickDivAndExpectPiece(2, 1, ""); // can't click after game ended
        expectBoard(board3);
    });

    it('cannot play if it is not your turn', function () {
        // Now make sure that if you're playing "O" (your player index is 1) then
        // you can't do the winning click!
        setMatchState(matchState2, 1); // playMode=1 means that yourPlayerIndex=1.
        expectBoard(board2);
        clickDivAndExpectPiece(2, 0, ""); // can't do the winning click!
        expectBoard(board2);
    });

    it('can start from a match that ended', function () {
        setMatchState(matchState3, 'passAndPlay');
        expectBoard(board3);
        clickDivAndExpectPiece(2, 1, ""); // can't click after game ended
    });

});
