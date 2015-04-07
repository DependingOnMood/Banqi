/**
 * Created by Dongbo on 2/22/15.
 */
describe("In Banqi", function() {
    var _gameLogic;
    var _newState;
    var _noPieceState;

    var board = {delta: {rowBeforeMove: 0, colBeforeMove: 2, rowAfterMove: -1, colAfterMove: -1},
        b0x0: 'R1', b0x1: 'R1', b0x2: 'R1', b0x3: 'R1', b0x4: 'R1', b0x5: 'R2', b0x6: null, b0x7: 'R3',
        b1x0: 'R3', b1x1: 'R4', b1x2: 'R4', b1x3: 'R5', b1x4: 'R5', b1x5: 'R6', b1x6: 'R6', b1x7: 'R7',
        b2x0: 'B1', b2x1: 'B1', b2x2: 'B1', b2x3: 'B1', b2x4: 'B1', b2x5: 'B2', b2x6: 'B2', b2x7: 'B3',
        b3x0: 'B3', b3x1: 'B4', b3x2: 'B4', b3x3: 'B5', b3x4: 'B5', b3x5: 'B6', b3x6: 'B6', b3x7: 'B7',
        stage: 0};

    beforeEach(module("myApp"));

    beforeEach(inject(function (gameLogic) {
        _gameLogic = gameLogic;
        _newState = {delta: {rowBeforeMove: -1, colBeforeMove: -1, rowAfterMove: -1, colAfterMove: -1},
            b0x0: null, b0x1: null, b0x2: null, b0x3: null, b0x4: null, b0x5: null, b0x6: null, b0x7: null,
            b1x0: null, b1x1: null, b1x2: null, b1x3: null, b1x4: null, b1x5: null, b1x6: null, b1x7: null,
            b2x0: null, b2x1: null, b2x2: null, b2x3: null, b2x4: null, b2x5: null, b2x6: null, b2x7: null,
            b3x0: null, b3x1: null, b3x2: null, b3x3: null, b3x4: null, b3x5: null, b3x6: null, b3x7: null,
            stage: 0};
        _noPieceState = {delta: {rowBeforeMove: 1, colBeforeMove: 1, rowAfterMove: 1, colAfterMove: 3},
            b0x0: '', b0x1: '', b0x2: '', b0x3: '', b0x4: '', b0x5: '', b0x6: '', b0x7: '',
            b1x0: '', b1x1: '', b1x2: '', b1x3: '', b1x4: '', b1x5: '', b1x6: '', b1x7: '',
            b2x0: '', b2x1: '', b2x2: '', b2x3: '', b2x4: '', b2x5: '', b2x6: '', b2x7: '',
            b3x0: '', b3x1: '', b3x2: '', b3x3: '', b3x4: '', b3x5: '', b3x6: '', b3x7: '',
            stage: 1};
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

    it("initial board if no board", function() {

        expectMoveOk(0,
            null,
            [
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
            ]);
    });

    it("initial board without passing keys is not legal", function() {

        expectIllegalMove(0,
            null,
            [
                //set turn
                {setTurn: {turnIndex: 0}},
                //set delta, (-1, -1) (-1, -1) means initial game
                {set: {key: 'delta', value: {rowBeforeMove: -1, colBeforeMove: -1, rowAfterMove: -1, colAfterMove: -1}}},

                {set: {key: 'stage', value: 0}},

                //shuffle
                {shuffle: { keys: ['b0x0', 'b0x1', 'b0x2', 'b0x3', 'b0x4', 'b0x5', 'b0x6', 'b0x7',
                    'b1x0', 'b1x1', 'b1x2', 'b1x3', 'b1x4', 'b1x5', 'b1x6', 'b1x7',
                    'b2x0', 'b2x1', 'b2x2', 'b2x3', 'b2x4', 'b2x5', 'b2x6', 'b2x7',
                    'b3x0', 'b3x1', 'b3x2', 'b3x3', 'b3x4', 'b3x5', 'b3x6', 'b3x7']}}]);
    });

    it("turn any chess in a new board is legal", function() {
        var _stateBeforeMove = _newState;
        expectMoveOk(0,
            _stateBeforeMove,
                [{setTurn: {turnIndex : 0}},
                {set: {key: 'delta', value: {rowBeforeMove: 0, colBeforeMove: 6, rowAfterMove: -1, colAfterMove: -1}}},
                {set: {key: 'stage', value: 1}},
                {setVisibility: {key: 'b0x6', visibleToPlayerIndexes: null}}
            ]);
    });

    it("move any chess in a new board is not legal", function() {
        var _stateBeforeMove = _newState;
        expectIllegalMove(0,
            _stateBeforeMove,
            [{setTurn: {turnIndex : 0}},
                {set: {key: 'delta', value: {rowBeforeMove: 0, colBeforeMove: 0, rowAfterMove: 1, colAfterMove: 0}}},
                {set: {key: 'stage', value: 1}},
                {set: {key: 'b0x0', value: ''}},
                {set: {key: 'b0x1', value: null}}
            ]);
    });

    it("turn a turned chess is not legal", function() {
        var _stateBeforeMove = _newState;
        _stateBeforeMove['b0x2']= 'R2';
        expectIllegalMove(0,
            _stateBeforeMove,
            [{setTurn: {turnIndex : 0}},
                {set: {key: 'delta', value: {rowBeforeMove: 0, colBeforeMove: 2, rowAfterMove: -1, colAfterMove: -1}}},
                {set: {key: 'stage', value: 1}},
                {setVisibility: {key: 'b0x2', visibleToPlayerIndexes: null}}
            ]);
    });

    it("turn a unturned chess is legal", function() {
        var _stateBeforeMove = _newState;
        _stateBeforeMove['b0x0']= 'B3';//Black Horse
        _stateBeforeMove['b0x1']= 'B7';//Black General
        _stateBeforeMove['b0x2']= '';  //Space
        _stateBeforeMove['b1x0']= 'R2';//Red Cannon
        _stateBeforeMove['b1x1']= 'R1';//Red Soldier
        _stateBeforeMove['b1x2']= null;//Black Cannon(unturned)

        expectMoveOk(0,
            _stateBeforeMove,
            [{setTurn: {turnIndex : 0}},
                {set: {key: 'delta', value: {rowBeforeMove: 1, colBeforeMove: 2, rowAfterMove: -1, colAfterMove: -1}}},
                {set: {key: 'stage', value: 1}},
                {setVisibility: {key: 'b1x2', visibleToPlayerIndexes: null}}
            ]);
    });

    it("turn a unturned chess without passing it's turned is not legal", function() {
        var _stateBeforeMove = _newState;
        _stateBeforeMove['b0x0']= 'B3';//Black Horse
        _stateBeforeMove['b0x1']= 'B7';//Black General
        _stateBeforeMove['b0x2']= '';  //Space
        _stateBeforeMove['b1x0']= 'R2';//Red Cannon
        _stateBeforeMove['b1x1']= 'R1';//Red Soldier
        _stateBeforeMove['b1x2']= null;//Black Cannon(unturned)

        expectIllegalMove(0,
            _stateBeforeMove,
            [{setTurn: {turnIndex : 0}},
                {set: {key: 'delta', value: {rowBeforeMove: 1, colBeforeMove: 2, rowAfterMove: -1, colAfterMove: -1}}},
                {set: {key: 'stage', value: 1}}
            ]);
    });

    it("move a turned chess to a space nearby is legal", function() {
        var _stateBeforeMove = _newState;
        _stateBeforeMove['b0x0']= 'B3';//Black Horse
        _stateBeforeMove['b0x1']= 'B7';//Black General
        _stateBeforeMove['b0x2']= '';  //Space
        _stateBeforeMove['b1x0']= 'R2';//Red Cannon
        _stateBeforeMove['b1x1']= 'R1';//Red Soldier
        _stateBeforeMove['b1x2']= null;//Black Cannon(unturned)

        expectMoveOk(1,
            _stateBeforeMove,
            [{setTurn: {turnIndex : 1}},
                {set: {key: 'delta', value: {rowBeforeMove: 0, colBeforeMove: 1, rowAfterMove: 0, colAfterMove: 2}}},
                {set: {key: 'stage', value: 1}},
                {set: {key: 'b0x2', value: 'B7'}},
                {set: {key: 'b0x1', value: ''}}
            ]);
    });

    it("move a turned chess to a space not nearby is not legal", function() {
        var _stateBeforeMove = _newState;
        _stateBeforeMove['b0x0']= 'B3';//Black Horse
        _stateBeforeMove['b0x1']= 'B7';//Black General
        _stateBeforeMove['b0x2']= '';  //Space
        _stateBeforeMove['b1x0']= 'R2';//Red Cannon
        _stateBeforeMove['b1x1']= 'R1';//Red Soldier
        _stateBeforeMove['b1x2']= null;//Black Cannon(unturned)

        expectIllegalMove(1,
            _stateBeforeMove,
            [{setTurn: {turnIndex : 1}},
                {set: {key: 'delta', value: {rowBeforeMove: 0, colBeforeMove: 0, rowAfterMove: 0, colAfterMove: 2}}},
                {set: {key: 'stage', value: 1}},
                {set: {key: 'b0x2', value: 'B3'}},
                {set: {key: 'b0x0', value: ''}}
            ]);
    });

    it("move a unturned chess is not legal", function() {
        var boardBefore = board;
        var _stateBeforeMove = _newState;
        _stateBeforeMove['b0x0']= 'B3';//Black Horse
        _stateBeforeMove['b0x1']= 'B7';//Black General
        _stateBeforeMove['b0x2']= '';  //Space
        _stateBeforeMove['b1x0']= 'R2';//Red Cannon
        _stateBeforeMove['b1x1']= 'R1';//Red Soldier
        _stateBeforeMove['b1x2']= null;//Black Cannon(unturned)

        expectIllegalMove(1,
            _stateBeforeMove,
            [{setTurn: {turnIndex : 1}},
                {set: {key: 'delta', value: {rowBeforeMove: 1, colBeforeMove: 2, rowAfterMove: 0, colAfterMove: 2}}},
                {set: {key: 'stage', value: 1}},
                {set: {key: 'b0x2', value: null}},
                {set: {key: 'b1x2', value: ''}}
            ]);
    });

    it("move a turned chess to the same place is not legal", function() {
        var _stateBeforeMove = _newState;
        _stateBeforeMove['b0x0']= 'B3';//Black Horse
        _stateBeforeMove['b0x1']= 'B7';//Black General
        _stateBeforeMove['b0x2']= '';  //Space
        _stateBeforeMove['b1x0']= 'R2';//Red Cannon
        _stateBeforeMove['b1x1']= 'R1';//Red Soldier
        _stateBeforeMove['b1x2']= null;//Black Cannon(unturned)

        expectIllegalMove(1,
            _stateBeforeMove,
            [{setTurn: {turnIndex : 1}},
                {set: {key: 'delta', value: {rowBeforeMove: 0, colBeforeMove: 1, rowAfterMove: 0, colAfterMove: 1}}},
                {set: {key: 'stage', value: 1}},
                {set: {key: 'b0x1', value: 'B7'}},
                {set: {key: 'b0x1', value: 'B7'}}
            ]);
    });

    it("move a space is not legal", function() {
        var _stateBeforeMove = _newState;
        _stateBeforeMove['b0x0']= 'B3';//Black Horse
        _stateBeforeMove['b0x1']= 'B7';//Black General
        _stateBeforeMove['b0x2']= '';  //Space
        _stateBeforeMove['b1x0']= 'R2';//Red Cannon
        _stateBeforeMove['b1x1']= 'R1';//Red Soldier
        _stateBeforeMove['b1x2']= null;//Black Cannon(unturned)

        expectIllegalMove(1,
            _stateBeforeMove,
            [{setTurn: {turnIndex : 1}},
                {set: {key: 'delta', value: {rowBeforeMove: 0, colBeforeMove: 2, rowAfterMove: 0, colAfterMove: 3}}},
                {set: {key: 'stage', value: 1}},
                {set: {key: 'b0x3', value: ''}},
                {set: {key: 'b0x2', value: ''}}
            ]);
    });

    it("kill a chess has lower rank is legal", function() {
        var _stateBeforeMove = _newState;
        _stateBeforeMove['b0x0']= 'B3';//Black Horse
        _stateBeforeMove['b0x1']= 'B7';//Black General
        _stateBeforeMove['b0x2']= '';  //Space
        _stateBeforeMove['b1x0']= 'R2';//Red Cannon
        _stateBeforeMove['b1x1']= 'R1';//Red Soldier
        _stateBeforeMove['b1x2']= null;//Black Cannon(unturned)

        expectMoveOk(1,
            _stateBeforeMove,
            [{setTurn: {turnIndex : 1}},
                {set: {key: 'delta', value: {rowBeforeMove: 0, colBeforeMove: 0, rowAfterMove: 1, colAfterMove: 0}}},
                {set: {key: 'stage', value: 1}},
                {set: {key: 'b1x0', value: 'B3'}},
                {set: {key: 'b0x0', value: ''}}
            ]);
    });

    it("again, kill a chess has lower rank is legal", function() {
        var _stateBeforeMove = _newState;
        _stateBeforeMove['b0x0']= 'B6';//Black Advisor
        _stateBeforeMove['b0x1']= 'B7';//Black General
        _stateBeforeMove['b0x2']= '';  //Space
        _stateBeforeMove['b1x0']= 'R2';//Red Cannon
        _stateBeforeMove['b1x1']= 'R1';//Red Soldier
        _stateBeforeMove['b1x2']= null;//Black Cannon(unturned)

        expectMoveOk(1,
            _stateBeforeMove,
            [{setTurn: {turnIndex : 1}},
                {set: {key: 'delta', value: {rowBeforeMove: 0, colBeforeMove: 0, rowAfterMove: 1, colAfterMove: 0}}},
                {set: {key: 'stage', value: 1}},
                {set: {key: 'b1x0', value: 'B6'}},
                {set: {key: 'b0x0', value: ''}}
            ]);
    });

    it("kill a chess has higher rank is not legal", function() {
        var _stateBeforeMove = _newState;
        _stateBeforeMove['b0x0']= 'B3';//Black Horse
        _stateBeforeMove['b0x1']= 'B7';//Black General
        _stateBeforeMove['b0x2']= '';  //Space
        _stateBeforeMove['b1x0']= 'R2';//Red Cannon
        _stateBeforeMove['b1x1']= 'R1';//Red Soldier
        _stateBeforeMove['b1x2']= null;//Black Cannon(unturned)
        _stateBeforeMove['b2x1']= 'B4';//Black Chariot

        expectIllegalMove(0,
            _stateBeforeMove,
            [{setTurn: {turnIndex : 0}},
                {set: {key: 'delta', value: {rowBeforeMove: 1, colBeforeMove: 1, rowAfterMove: 2, colAfterMove: 1}}},
                {set: {key: 'stage', value: 1}},
                {set: {key: 'b2x1', value: 'R1'}},
                {set: {key: 'b1x1', value: ''}}
            ]);
    });

    it("a Soldier kills a nearby General is legal", function() {
        var _stateBeforeMove = _newState;
        _stateBeforeMove['b0x0']= 'B3';//Black Horse
        _stateBeforeMove['b0x1']= 'B7';//Black General
        _stateBeforeMove['b0x2']= '';  //Space
        _stateBeforeMove['b1x0']= 'R2';//Red Cannon
        _stateBeforeMove['b1x1']= 'R1';//Red Soldier
        _stateBeforeMove['b1x2']= null;//Black Cannon(unturned)
        _stateBeforeMove['b2x1']= 'B4';//Black Chariot

        expectMoveOk(0,
            _stateBeforeMove,
            [{setTurn: {turnIndex : 0}},
                {set: {key: 'delta', value: {rowBeforeMove: 1, colBeforeMove: 1, rowAfterMove: 0, colAfterMove: 1}}},
                {set: {key: 'stage', value: 1}},
                {set: {key: 'b0x1', value: 'R1'}},
                {set: {key: 'b1x1', value: ''}}
            ]);
    });

    it("a General kills a nearby Soldier is not legal", function() {
        var _stateBeforeMove = _newState;
        _stateBeforeMove['b0x0']= 'B3';//Black Horse
        _stateBeforeMove['b0x1']= 'B7';//Black General
        _stateBeforeMove['b0x2']= '';  //Space
        _stateBeforeMove['b1x0']= 'R2';//Red Cannon
        _stateBeforeMove['b1x1']= 'R1';//Red Soldier
        _stateBeforeMove['b1x2']= null;//Black Cannon(unturned)
        _stateBeforeMove['b2x1']= 'B4';//Black Chariot

        expectIllegalMove(1,
            _stateBeforeMove,
            [{setTurn: {turnIndex : 1}},
                {set: {key: 'delta', value: {rowBeforeMove: 0, colBeforeMove: 1, rowAfterMove: 1, colAfterMove: 1}}},
                {set: {key: 'stage', value: 1}},
                {set: {key: 'b1x1', value: 'B7'}},
                {set: {key: 'b0x1', value: ''}}
            ]);
    });

    it("a Cannon kill any chess has one turned chess between hori it is legal ", function() {
        var _stateBeforeMove = _newState;
        _stateBeforeMove['b0x0']= 'B3';//Black Horse
        _stateBeforeMove['b0x1']= 'B7';//Black General
        _stateBeforeMove['b0x2']= '';  //Space
        _stateBeforeMove['b1x0']= 'R2';//Red Cannon
        _stateBeforeMove['b1x1']= 'R1';//Red Soldier
        _stateBeforeMove['b1x2']= 'B4';//Black Chariot
        _stateBeforeMove['b2x1']= 'B4';//Black Chariot
        _stateBeforeMove['b2x2']= 'R4';//Red Chariot

        expectMoveOk(0,
            _stateBeforeMove,
            [{setTurn: {turnIndex : 0}},
                {set: {key: 'delta', value: {rowBeforeMove: 1, colBeforeMove: 0, rowAfterMove: 1, colAfterMove: 2}}},
                {set: {key: 'stage', value: 1}},
                {set: {key: 'b1x2', value: 'R2'}},
                {set: {key: 'b1x0', value: ''}}
            ]);
    });

    it("a Cannon kill any chess has one turned chess between hori it is legal, even it's a General ", function() {
        var _stateBeforeMove = _newState;
        _stateBeforeMove['b0x0']= 'B3';//Black Horse
        _stateBeforeMove['b0x1']= 'B7';//Black General
        _stateBeforeMove['b0x2']= '';  //Space
        _stateBeforeMove['b1x0']= 'R2';//Red Cannon
        _stateBeforeMove['b1x1']= 'R1';//Red Soldier
        _stateBeforeMove['b1x2']= 'B7';//Black General
        _stateBeforeMove['b2x1']= 'B4';//Black Chariot
        _stateBeforeMove['b2x2']= 'R4';//Red Chariot

        expectMoveOk(0,
            _stateBeforeMove,
            [{setTurn: {turnIndex : 0}},
                {set: {key: 'delta', value: {rowBeforeMove: 1, colBeforeMove: 0, rowAfterMove: 1, colAfterMove: 2}}},
                {set: {key: 'stage', value: 1}},
                {set: {key: 'b1x2', value: 'R2'}},
                {set: {key: 'b1x0', value: ''}}
            ]);
    });

    it("a Cannon kill any chess has one turned chess between verti it is legal ", function() {
        var _stateBeforeMove = _newState;
        _stateBeforeMove['b0x0']= 'B3';//Black Horse
        _stateBeforeMove['b0x1']= 'B7';//Black General
        _stateBeforeMove['b0x2']= '';  //Space
        _stateBeforeMove['b1x0']= 'R2';//Red Cannon
        _stateBeforeMove['b1x1']= 'R1';//Red Soldier
        _stateBeforeMove['b1x2']= 'B4';//Black Chariot
        _stateBeforeMove['b2x0']= 'B1';//Black Soldier
        _stateBeforeMove['b3x0']= 'B1';//Black Soldier

        expectMoveOk(0,
            _stateBeforeMove,
            [{setTurn: {turnIndex : 0}},
                {set: {key: 'delta', value: {rowBeforeMove: 1, colBeforeMove: 0, rowAfterMove: 3, colAfterMove: 0}}},
                {set: {key: 'stage', value: 1}},
                {set: {key: 'b3x0', value: 'R2'}},
                {set: {key: 'b1x0', value: ''}}
            ]);
    });

    it("a Cannon kill any nearby chess is not legal ", function() {
        var _stateBeforeMove = _newState;
        _stateBeforeMove['b0x0']= 'B3';//Black Horse
        _stateBeforeMove['b0x1']= 'B7';//Black General
        _stateBeforeMove['b0x2']= '';  //Space
        _stateBeforeMove['b1x0']= 'R2';//Red Cannon
        _stateBeforeMove['b1x1']= 'R1';//Red Soldier
        _stateBeforeMove['b1x2']= null;//Black Cannon(unturned)
        _stateBeforeMove['b2x0']= 'R1';//Red Soldier
        _stateBeforeMove['b2x1']= 'B4';//Black Chariot
        _stateBeforeMove['b2x2']= 'R4';//Red Chariot

        expectIllegalMove(0,
            _stateBeforeMove,
            [{setTurn: {turnIndex : 0}},
                {set: {key: 'delta', value: {rowBeforeMove: 1, colBeforeMove: 0, rowAfterMove: 2, colAfterMove: 0}}},
                {set: {key: 'stage', value: 1}},
                {set: {key: 'b2x0', value: 'R2'}},
                {set: {key: 'b1x0', value: ''}}
            ]);
    });

    it("kill a unturned chess is not legal", function() {
        var _stateBeforeMove = _newState;
        _stateBeforeMove['b0x0']= 'B3';//Black Horse
        _stateBeforeMove['b0x1']= 'B7';//Black General
        _stateBeforeMove['b0x2']= '';  //Space
        _stateBeforeMove['b1x0']= 'R2';//Red Cannon
        _stateBeforeMove['b1x1']= 'R1';//Red Soldier
        _stateBeforeMove['b1x2']= null;//Black Cannon(unturned)
        _stateBeforeMove['b2x1']= 'B4';//Black Chariot
        _stateBeforeMove['b2x2']= 'R4';//Red Chariot

        //var boardAfter = angular.copy(boardBefore);
        //boardAfter[2][2] = {color:'', hide:1, rank:4};
        //boardAfter[1][2] = {color:'R', hide:1, rank:4};

        expectIllegalMove(0,
            _stateBeforeMove,
            [{setTurn: {turnIndex : 0}},
                {set: {key: 'delta', value: {rowBeforeMove: 2, colBeforeMove: 2, rowAfterMove: 1, colAfterMove: 2}}},
                {set: {key: 'stage', value: 1}},
                {set: {key: 'b1x2', value: 'R4'}},
                {set: {key: 'b2x2', value: ''}}
            ]);
    });

    it("move Red chess at Black's turn is not legal", function() {
        var _stateBeforeMove = _newState;
        _stateBeforeMove['b0x0']= 'B3';//Black Horse
        _stateBeforeMove['b0x1']= 'B7';//Black General
        _stateBeforeMove['b0x2']= '';  //Space
        _stateBeforeMove['b1x0']= 'R2';//Red Cannon
        _stateBeforeMove['b1x1']= 'R1';//Red Soldier
        _stateBeforeMove['b1x2']= null;//Black Cannon(unturned)
        _stateBeforeMove['b2x1']= 'B4';//Black Chariot

        expectIllegalMove(1,
            _stateBeforeMove,
            [{setTurn: {turnIndex : 1}},
                {set: {key: 'delta', value: {rowBeforeMove: 1, colBeforeMove: 1, rowAfterMove: 1, colAfterMove: 0}}},
                {set: {key: 'stage', value: 1}},
                {set: {key: 'b1x0', value: 'R1'}},
                {set: {key: 'b1x1', value: ''}}
            ]);
    });

    it("move Black chess at Red's turn is not legal", function() {
        var _stateBeforeMove = _newState;
        _stateBeforeMove['b0x0']= 'B3';//Black Horse
        _stateBeforeMove['b0x1']= 'B7';//Black General
        _stateBeforeMove['b0x2']= '';  //Space
        _stateBeforeMove['b1x0']= 'R2';//Red Cannon
        _stateBeforeMove['b1x1']= 'R1';//Red Soldier
        _stateBeforeMove['b1x2']= null;//Black Cannon(unturned)

        //var boardAfter = angular.copy(boardBefore);
        //boardAfter[0][0] = {color:'', hide:1, rank:3};
        //boardAfter[1][0] = {color:'B', hide:1, rank:3};

        expectIllegalMove(0,
            _stateBeforeMove,
            [{setTurn: {turnIndex : 0}},
                {set: {key: 'delta', value: {rowBeforeMove: 0, colBeforeMove: 0, rowAfterMove: 1, colAfterMove: 0}}},
                {set: {key: 'stage', value: 1}},
                {set: {key: 'b1x0', value: 'B3'}},
                {set: {key: 'b0x0', value: ''}}
            ]);
    });

    it("game end with Red win", function() {
        var _stateBeforeMove = _noPieceState;
        _stateBeforeMove['b0x0']= 'R7';//Red General
        _stateBeforeMove['b0x1']= '';//Space
        _stateBeforeMove['b0x2']= 'R2';//Red Cannon
        _stateBeforeMove['b1x0']= 'R2';//Red Cannon
        _stateBeforeMove['b1x1']= 'R1';//Red Soldier

        expectMoveOk(0,
            _stateBeforeMove,
            [{endMatch: {endMatchScores:[1, 0]}},
                {set: {key: 'stage', value: 0}}]);
    });

    it("game end with Red win but pass Black Win is not legal", function() {
        var _stateBeforeMove = _noPieceState;
        _stateBeforeMove['b0x0']= 'R7';//Red General
        _stateBeforeMove['b0x1']= '';//Space
        _stateBeforeMove['b0x2']= 'R2';//Red Cannon
        _stateBeforeMove['b1x0']= 'R2';//Red Cannon
        _stateBeforeMove['b1x1']= 'R1';//Red Soldier

        expectIllegalMove(0,
            _stateBeforeMove,
            [{endMatch: {endMatchScores:[0, 1]}},
                {set: {key: 'stage', value: 0}}]);
    });

    it("game end with Black win", function() {
        var _stateBeforeMove = _noPieceState;
        _stateBeforeMove['b0x0']= 'B3';//Red Horse
        _stateBeforeMove['b0x1']= ''; //Space
        _stateBeforeMove['b0x2']= 'B7';//Black General
        _stateBeforeMove['b1x1']= 'B2';//Black Cannon
        _stateBeforeMove['b1x2']= 'B2';//Black Cannon

        expectMoveOk(1,
            _stateBeforeMove,
            [{endMatch: {endMatchScores:[0, 1]}},
                {set: {key: 'stage', value: 0}}]);
    });


    it("game not end with Tie, Red has one chess left but not higher rank than all Black chesses", function() {
        var _stateBeforeMove = _noPieceState;
        _stateBeforeMove['b0x0']= 'B3';//Black Horse
        _stateBeforeMove['b1x1']= 'B3';//Black Horse
        _stateBeforeMove['b0x2']= '';  //Space
        _stateBeforeMove['b1x7']= 'R2';//Red Cannon
        _stateBeforeMove['b1x2']= 'B2';//Black Cannon

        expectMoveOk(1,
            _stateBeforeMove,
            [{setTurn: {turnIndex : 0}},
                {set: {key: 'stage', value: 0}}]);

    });


    it("game not end with Tie, Black has one chess left but not higher rank than all Red chesses", function() {
        var _stateBeforeMove = _noPieceState;
        _stateBeforeMove['b0x0']= 'R3';//Red Horse
        _stateBeforeMove['b1x1']= 'R3';//Red Horse
        _stateBeforeMove['b0x2']= '';  //Space
        _stateBeforeMove['b1x7']= 'B2';//Black Cannon
        _stateBeforeMove['b1x2']= 'R2';//Red Cannon

        expectMoveOk(0,
            _stateBeforeMove,
            [{setTurn: {turnIndex : 1}},
                {set: {key: 'stage', value: 0}}]);

    });

    it("game not end with Tie, Black and Red have a lot of pieces", function() {
        var _stateBeforeMove = _noPieceState;
        _stateBeforeMove['b0x0']= 'R3';//Red Horse
        _stateBeforeMove['b1x1']= 'R3';//Red Horse
        _stateBeforeMove['b0x2']= 'B2';//Black Cannon
        _stateBeforeMove['b1x7']= 'B2';//Black Cannon
        _stateBeforeMove['b1x2']= 'R2';//Red Cannon
        _stateBeforeMove['b1x2']= 'B3';//Black Cannon
        _stateBeforeMove['b1x2']= 'B3';//Black Cannon

        expectMoveOk(0,
            _stateBeforeMove,
            [{setTurn: {turnIndex : 1}},
                {set: {key: 'stage', value: 0}}]);

    });


    it("null move is illegal", function() {
        expectIllegalMove(0, {}, null);
    });

    it("move without setting board is illegal", function() {
        expectIllegalMove(0, {}, [{setTurn: {turnIndex : 1}}]);
    });

    it("move without delta is illegal", function() {
        var _stateBeforeMove = _newState;
        expectIllegalMove(0, _stateBeforeMove, [{setTurn: {turnIndex : 1}}]);
    });

    it("getPossibleMoves test, new board", function() {
        var _stateBeforeMove = _newState;

        //var boardAfter = angular.copy(boardBefore);
        //boardAfter[0][3].hide = 1;

        var possibleMoves = _gameLogic.getPossibleMoves(_stateBeforeMove, 0);

        var expectedMove = [{setTurn: {turnIndex : 0}},
            {set: {key: 'delta', value: {rowBeforeMove: 0, colBeforeMove: 3, rowAfterMove: -1, colAfterMove: -1}}},
            {set: {key: 'stage', value: 1}},
            {setVisibility: {key: 'b0x3', visibleToPlayerIndexes: null}}];

        expect(angular.equals(possibleMoves[3], expectedMove)).toBe(true);
    });

});