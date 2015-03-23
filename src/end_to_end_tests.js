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
        if (pieceKind !== "") {
            expect(getImg(row, col).getAttribute("src")).toEqual("http://localhost:9000/res/" + pieceKind + ".png");
        }
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
        b0x0: '', b0x1: '', b0x2: '', b0x3: 'R1', b0x4: '', b0x5: '', b0x6: '', b0x7: '',
        b1x0: '', b1x1: 'R2', b1x2: 'R4', b1x3: 'B7', b1x4: '', b1x5: '', b1x6: '', b1x7: '',
        b2x0: '', b2x1: 'B2', b2x2: 'B1', b2x3: 'R1', b2x4: '', b2x5: '', b2x6: '', b2x7: '',
        b3x0: '', b3x1: '', b3x2: '', b3x3: '', b3x4: '', b3x5: '', b3x6: '', b3x7: '',
        stage: 1
    };

    var lastStateRedMovedStage0 = {
        delta: {rowBeforeMove: 1, colBeforeMove: 0, rowAfterMove: 1, colAfterMove: 1},
        b0x0: '', b0x1: '', b0x2: '', b0x3: 'R1', b0x4: '', b0x5: '', b0x6: '', b0x7: '',
        b1x0: '', b1x1: 'R2', b1x2: 'R4', b1x3: 'B7', b1x4: '', b1x5: '', b1x6: '', b1x7: '',
        b2x0: '', b2x1: 'B2', b2x2: 'B1', b2x3: 'R1', b2x4: '', b2x5: '', b2x6: '', b2x7: '',
        b3x0: '', b3x1: '', b3x2: '', b3x3: '', b3x4: '', b3x5: '', b3x6: '', b3x7: '',
        stage: 0
    };

    var lastStateBlackMovedStage1 = {
        delta: {rowBeforeMove: 1, colBeforeMove: 4, rowAfterMove: 1, colAfterMove: 3},
        b0x0: '', b0x1: '', b0x2: '', b0x3: 'R1', b0x4: '', b0x5: '', b0x6: '', b0x7: '',
        b1x0: '', b1x1: 'R2', b1x2: 'R4', b1x3: 'B7', b1x4: '', b1x5: '', b1x6: '', b1x7: '',
        b2x0: '', b2x1: 'B2', b2x2: 'B1', b2x3: 'R1', b2x4: '', b2x5: '', b2x6: '', b2x7: '',
        b3x0: '', b3x1: '', b3x2: '', b3x3: '', b3x4: '', b3x5: '', b3x6: '', b3x7: '',
        stage: 1
    };

    var lastStateBlackMovedStage0 = {
        delta: {rowBeforeMove: 1, colBeforeMove: 4, rowAfterMove: 1, colAfterMove: 3},
        b0x0: '', b0x1: '', b0x2: '', b0x3: 'R1', b0x4: '', b0x5: '', b0x6: '', b0x7: '',
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

    var matchStateBlackMoved = {
        turnIndexBeforeMove: 1,
        turnIndex: 0,
        endMatchScores: null,
        lastMove: [{setTurn: {turnIndex: 0}},
            {set: {key: 'stage', value: 0}}],
        lastState: lastStateBlackMovedStage1,
        currentState: lastStateBlackMovedStage0,
        lastVisibleTo: {'b0x3':[]},
        currentVisibleTo: {'b0x3':[]}
    };

    it('Black General would kill a RED Chariot nearby', function () {
        setMatchState(matchStateRedMoved, 'passAndPlay');
        expectBoard(boardBeforeMove);
        clickDivAndExpectPiece(1, 3, "B7");
        clickDivAndExpectPiece(1, 2, "B7");
        expectBoard([['', '', '', '', 'Hide', '', '', ''],
            ['', 'R2', 'B7', '', '', '', '', ''],
            ['', 'B2', 'B1', 'R1', '', '', '', ''],
            ['', '', '', '', '', '', '', '']]);
    });

    it('Black General would not kill a RED Chariot nearby when its not Black Turn', function () {
        setMatchState(matchStateBlackMoved, 'passAndPlay');
        expectBoard(boardBeforeMove);
        clickDivAndExpectPiece(1, 3, "B7");
        clickDivAndExpectPiece(1, 2, "R4");
        expectBoard(boardBeforeMove);
    });

    it('RED Chariot would not kill a Black General nearby because lower rank', function () {
        setMatchState(matchStateBlackMoved, 'passAndPlay');
        expectBoard(boardBeforeMove);
        clickDivAndExpectPiece(1, 2, "R4");
        clickDivAndExpectPiece(1, 3, "B7");
        expectBoard(boardBeforeMove);
    });

    it('RED Chariot would not kill a RED Cannon nearby because its same color', function () {
        setMatchState(matchStateBlackMoved, 'passAndPlay');
        expectBoard(boardBeforeMove);
        clickDivAndExpectPiece(1, 2, "R4");
        clickDivAndExpectPiece(1, 1, "R2");
        expectBoard(boardBeforeMove);
    });

    it('Black Soldier would kill a RED Soldier nearby', function () {
        setMatchState(matchStateRedMoved, 'passAndPlay');
        expectBoard(boardBeforeMove);
        clickDivAndExpectPiece(2, 2, "B1");
        clickDivAndExpectPiece(2, 3, "B1");
        expectBoard([['', '', '', '', 'Hide', '', '', ''],
            ['', 'R2', 'R4', 'B7', '', '', '', ''],
            ['', 'B2', '', 'B1', '', '', '', ''],
            ['', '', '', '', '', '', '', '']]);
    });

    it('Red Soldier would kill a Black Soldier nearby', function () {
        setMatchState(matchStateBlackMoved, 'passAndPlay');
        expectBoard(boardBeforeMove);
        clickDivAndExpectPiece(2, 3, "R1");
        clickDivAndExpectPiece(2, 2, "R1");
        expectBoard([['', '', '', '', 'Hide', '', '', ''],
            ['', 'R2', 'R4', 'B7', '', '', '', ''],
            ['', 'B2', 'R1', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '']]);
    });

    it('Red Soldier would kill a Black General nearby', function () {
        setMatchState(matchStateBlackMoved, 'passAndPlay');
        expectBoard(boardBeforeMove);
        clickDivAndExpectPiece(2, 3, "R1");
        clickDivAndExpectPiece(1, 3, "R1");
        expectBoard([['', '', '', '', 'Hide', '', '', ''],
            ['', 'R2', 'R4', 'R1', '', '', '', ''],
            ['', 'B2', 'B1', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '']]);
    });

    it('Black General would not kill a RED Soldier nearby', function () {
        setMatchState(matchStateRedMoved, 'passAndPlay');
        expectBoard(boardBeforeMove);
        clickDivAndExpectPiece(1, 3, "B7");
        clickDivAndExpectPiece(2, 3, "R1");
        expectBoard(boardBeforeMove);
    });

    it('Red Cannon would kill a Black General that have exactly one piece between them', function () {
        setMatchState(matchStateBlackMoved, 'passAndPlay');
        expectBoard(boardBeforeMove);
        clickDivAndExpectPiece(1, 1, "R2");
        clickDivAndExpectPiece(1, 3, "R2");
        expectBoard([['', '', '', '', 'Hide', '', '', ''],
            ['', '', 'R4', 'R2', '', '', '', ''],
            ['', 'B2', 'B1', 'R1', '', '', '', ''],
            ['', '', '', '', '', '', '', '']]);
    });

    it('Red Cannon would kill a Black Cannon nearby because its not following Cannon Rule', function () {
        setMatchState(matchStateBlackMoved, 'passAndPlay');
        expectBoard(boardBeforeMove);
        clickDivAndExpectPiece(1, 1, "R2");
        clickDivAndExpectPiece(2, 1, "B2");
        expectBoard(boardBeforeMove);
    });

    it('Black General would not kill a Hide Piece nearby', function () {
        setMatchState(matchStateRedMoved, 'passAndPlay');
        expectBoard(boardBeforeMove);
        clickDivAndExpectPiece(1, 3, "B7");
        clickDivAndExpectPiece(0, 3, "Hide");
        expectBoard(boardBeforeMove);
    });

    it('Click a Hide Piece any time (except trying to kill it) would turn it over', function () {
        setMatchState(matchStateRedMoved, 'passAndPlay');
        expectBoard(boardBeforeMove);
        clickDivAndExpectNotHide(0, 3);
    });

    it('Run Until game end, cant move piece after game ended', function () {
        setMatchState(matchStateRedMoved, 'passAndPlay');
        expectBoard(boardBeforeMove);
        clickDivAndExpectNotHide(0, 3);
        clickDivAndExpectPiece(0, 3, "R1");
        clickDivAndExpectPiece(1, 3, "R1");
        clickDivAndExpectPiece(2, 2, "B1");
        clickDivAndExpectPiece(2, 3, "B1");
        clickDivAndExpectPiece(1, 3, "R1");
        clickDivAndExpectPiece(2, 3, "R1");
        clickDivAndExpectPiece(2, 1, "B2");
        clickDivAndExpectPiece(2, 2, "B2");
        clickDivAndExpectPiece(1, 2, "R4");
        clickDivAndExpectPiece(2, 2, "R4");
        //game ended
        expectBoard([
            ['', '', '', '', '', '', '', ''],
            ['', 'R2', '', '', '', '', '', ''],
            ['', '', 'R4', 'R1', '', '', '', ''],
            ['', '', '', '', '', '', '', '']]);

        //move try to move after game ended
        clickDivAndExpectPiece(2, 2, "R4");
        clickDivAndExpectNotHide(1, 2);

        //get exactly same board which when game ended
        expectBoard([
            ['', '', '', '', '', '', '', ''],
            ['', 'R2', '', '', '', '', '', ''],
            ['', '', 'R4', 'R1', '', '', '', ''],
            ['', '', '', '', '', '', '', '']]);

    });

});
