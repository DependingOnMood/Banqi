describe("aiService", function () {

    'use strict';

    var _aiService;
    var board = {
        delta: {rowBeforeMove: 0, colBeforeMove: 2, rowAfterMove: -1, colAfterMove: -1},
        b0x0: 'R1', b0x1: 'R1', b0x2: 'R1', b0x3: 'R1', b0x4: 'R1', b0x5: 'R2', b0x6: null, b0x7: 'R3',
        b1x0: 'R3', b1x1: 'R4', b1x2: 'R4', b1x3: 'R5', b1x4: 'R5', b1x5: 'R6', b1x6: 'R6', b1x7: 'R7',
        b2x0: 'B1', b2x1: 'B1', b2x2: 'B1', b2x3: 'B1', b2x4: 'B1', b2x5: 'B2', b2x6: 'B2', b2x7: 'B3',
        b3x0: 'B3', b3x1: 'B4', b3x2: 'B4', b3x3: 'B5', b3x4: 'B5', b3x5: 'B6', b3x6: 'B6', b3x7: 'B7',
        stage: 0
    };

    beforeEach(module("myApp"));

    beforeEach(inject(function (aiService) {
        _aiService = aiService;
    }));

    it("R would use R3 to kill B2 if it's R's turn", function () {
        var stateBeforeMove = {
            delta: {rowBeforeMove: 1, colBeforeMove: 1, rowAfterMove: 1, colAfterMove: 2},
            b0x0: '', b0x1: '', b0x2: '', b0x3: '', b0x4: '', b0x5: 'R7', b0x6: '', b0x7: '',
            b1x0: '', b1x1: '', b1x2: 'B2', b1x3: '', b1x4: '', b1x5: '', b1x6: '', b1x7: '',
            b2x0: '', b2x1: '', b2x2: 'R3', b2x3: 'R3', b2x4: '', b2x5: '', b2x6: '', b2x7: '',
            b3x0: '', b3x1: 'R5', b3x2: '', b3x3: '', b3x4: '', b3x5: '', b3x6: '', b3x7: '',
            stage: 0
        };

        var move = _aiService.createComputerMove(
            stateBeforeMove, 0, 1000);

        var needToSet = [{
            set: {
                key: 'b1x2',
                value: 'R3'
            }
        },
            {set: {key: 'b2x2', value: ''}}];

        var expectedMove =
            [{setTurn: {turnIndex: 0}},
                {
                    set: {
                        key: 'delta', value: {
                            rowBeforeMove: 2, colBeforeMove: 2,
                            rowAfterMove: 1, colAfterMove: 2
                        }
                    }
                },
                {set: {key: 'stage', value: 1}}].concat(needToSet);

        expect(angular.equals(move, expectedMove)).toBe(true);
    });

    it("R would use R1 to kill B7 if it's R's turn", function () {
        var stateBeforeMove = {
            delta: {rowBeforeMove: 1, colBeforeMove: 1, rowAfterMove: 1, colAfterMove: 2},
            b0x0: '', b0x1: '', b0x2: '', b0x3: '', b0x4: '', b0x5: 'R7', b0x6: '', b0x7: '',
            b1x0: '', b1x1: '', b1x2: 'B7', b1x3: '', b1x4: '', b1x5: '', b1x6: '', b1x7: '',
            b2x0: '', b2x1: '', b2x2: 'R1', b2x3: 'R3', b2x4: '', b2x5: '', b2x6: '', b2x7: '',
            b3x0: '', b3x1: 'R5', b3x2: '', b3x3: '', b3x4: '', b3x5: '', b3x6: '', b3x7: '',
            stage: 0
        };

        var move = _aiService.createComputerMove(
            stateBeforeMove, 0, 1000);

        var needToSet = [{
            set: {
                key: 'b1x2',
                value: 'R1'
            }
        },
            {set: {key: 'b2x2', value: ''}}];

        var expectedMove =
            [{setTurn: {turnIndex: 0}},
                {
                    set: {
                        key: 'delta', value: {
                            rowBeforeMove: 2, colBeforeMove: 2,
                            rowAfterMove: 1, colAfterMove: 2
                        }
                    }
                },
                {set: {key: 'stage', value: 1}}].concat(needToSet);

        expect(angular.equals(move, expectedMove)).toBe(true);
    });

    it("B would use B3 to kill R2 if it's B's turn", function () {
        var stateBeforeMove = {
            delta: {rowBeforeMove: 2, colBeforeMove: 1, rowAfterMove: 2, colAfterMove: 2},
            b0x0: '', b0x1: '', b0x2: '', b0x3: '', b0x4: '', b0x5: 'R7', b0x6: '', b0x7: '',
            b1x0: '', b1x1: '', b1x2: 'B3', b1x3: '', b1x4: '', b1x5: '', b1x6: '', b1x7: '',
            b2x0: '', b2x1: '', b2x2: 'R2', b2x3: 'R3', b2x4: '', b2x5: '', b2x6: '', b2x7: '',
            b3x0: '', b3x1: 'R5', b3x2: '', b3x3: '', b3x4: '', b3x5: '', b3x6: '', b3x7: '',
            stage: 0
        };

        var move = _aiService.createComputerMove(
            stateBeforeMove, 1, 1000);

        var needToSet = [{
            set: {
                key: 'b2x2',
                value: 'B3'
            }
        },
            {set: {key: 'b1x2', value: ''}}];

        var expectedMove =
            [{setTurn: {turnIndex: 1}},
                {
                    set: {
                        key: 'delta', value: {
                            rowBeforeMove: 1, colBeforeMove: 2,
                            rowAfterMove: 2, colAfterMove: 2
                        }
                    }
                },
                {set: {key: 'stage', value: 1}}].concat(needToSet);

        expect(angular.equals(move, expectedMove)).toBe(true);
    });

    it("B would use B1 to kill R7 if it's B's turn", function () {
        var stateBeforeMove = {
            delta: {rowBeforeMove: 2, colBeforeMove: 1, rowAfterMove: 2, colAfterMove: 2},
            b0x0: '', b0x1: '', b0x2: '', b0x3: '', b0x4: '', b0x5: 'R7', b0x6: '', b0x7: '',
            b1x0: '', b1x1: '', b1x2: 'B1', b1x3: '', b1x4: '', b1x5: '', b1x6: '', b1x7: '',
            b2x0: '', b2x1: '', b2x2: 'R7', b2x3: 'R3', b2x4: '', b2x5: '', b2x6: '', b2x7: '',
            b3x0: '', b3x1: 'R5', b3x2: '', b3x3: '', b3x4: '', b3x5: '', b3x6: '', b3x7: '',
            stage: 0
        };

        var move = _aiService.createComputerMove(
            stateBeforeMove, 1, 1000);

        var needToSet = [{
            set: {
                key: 'b2x2',
                value: 'B1'
            }
        },
            {set: {key: 'b1x2', value: ''}}];

        var expectedMove =
            [{setTurn: {turnIndex: 1}},
                {
                    set: {
                        key: 'delta', value: {
                            rowBeforeMove: 1, colBeforeMove: 2,
                            rowAfterMove: 2, colAfterMove: 2
                        }
                    }
                },
                {set: {key: 'stage', value: 1}}].concat(needToSet);

        expect(angular.equals(move, expectedMove)).toBe(true);
    });


    it("B would use B3 to kill R3 if it's B's turn", function () {
        var stateBeforeMove = {
            delta: {rowBeforeMove: 2, colBeforeMove: 1, rowAfterMove: 2, colAfterMove: 2},
            b0x0: '', b0x1: '', b0x2: '', b0x3: '', b0x4: '', b0x5: 'R7', b0x6: '', b0x7: '',
            b1x0: '', b1x1: '', b1x2: 'B3', b1x3: '', b1x4: '', b1x5: '', b1x6: '', b1x7: '',
            b2x0: '', b2x1: '', b2x2: 'R3', b2x3: 'R3', b2x4: '', b2x5: '', b2x6: '', b2x7: '',
            b3x0: '', b3x1: 'R5', b3x2: '', b3x3: '', b3x4: '', b3x5: '', b3x6: '', b3x7: '',
            stage: 0
        };

        var move = _aiService.createComputerMove(
            stateBeforeMove, 1, 1000);

        var needToSet = [{
            set: {
                key: 'b2x2',
                value: 'B3'
            }
        },
            {set: {key: 'b1x2', value: ''}}];

        var expectedMove =
            [{setTurn: {turnIndex: 1}},
                {
                    set: {
                        key: 'delta', value: {
                            rowBeforeMove: 1, colBeforeMove: 2,
                            rowAfterMove: 2, colAfterMove: 2
                        }
                    }
                },
                {set: {key: 'stage', value: 1}}].concat(needToSet);

        expect(angular.equals(move, expectedMove)).toBe(true);
    });

    it("R would use R3 to kill B3 if it's B's turn", function () {
        var stateBeforeMove = {
            delta: {rowBeforeMove: 2, colBeforeMove: 1, rowAfterMove: 2, colAfterMove: 2},
            b0x0: '', b0x1: '', b0x2: '', b0x3: '', b0x4: '', b0x5: 'R7', b0x6: '', b0x7: '',
            b1x0: '', b1x1: '', b1x2: 'B3', b1x3: '', b1x4: '', b1x5: '', b1x6: '', b1x7: '',
            b2x0: '', b2x1: '', b2x2: 'R3', b2x3: 'R3', b2x4: '', b2x5: '', b2x6: '', b2x7: '',
            b3x0: '', b3x1: 'R5', b3x2: '', b3x3: '', b3x4: '', b3x5: '', b3x6: '', b3x7: '',
            stage: 0
        };

        var move = _aiService.createComputerMove(
            stateBeforeMove, 0, 1000);

        var needToSet = [{
            set: {
                key: 'b1x2',
                value: 'R3'
            }
        },
            {set: {key: 'b2x2', value: ''}}];

        var expectedMove =
            [{setTurn: {turnIndex: 0}},
                {
                    set: {
                        key: 'delta', value: {
                            rowBeforeMove: 2, colBeforeMove: 2,
                            rowAfterMove: 1, colAfterMove: 2
                        }
                    }
                },
                {set: {key: 'stage', value: 1}}].concat(needToSet);

        expect(angular.equals(move, expectedMove)).toBe(true);
    });

    it("B would use B3 to chase R2 if it's B's turn", function () {
        var stateBeforeMove = {
            delta: {rowBeforeMove: 2, colBeforeMove: 1, rowAfterMove: 2, colAfterMove: 2},
            b0x0: '', b0x1: '', b0x2: '', b0x3: '', b0x4: '', b0x5: 'R7', b0x6: '', b0x7: '',
            b1x0: '', b1x1: 'B3', b1x2: '', b1x3: '', b1x4: '', b1x5: '', b1x6: '', b1x7: '',
            b2x0: '', b2x1: '', b2x2: 'R2', b2x3: 'R3', b2x4: '', b2x5: '', b2x6: '', b2x7: '',
            b3x0: '', b3x1: 'R5', b3x2: '', b3x3: '', b3x4: '', b3x5: '', b3x6: '', b3x7: '',
            stage: 0
        };

        var move = _aiService.createComputerMove(
            stateBeforeMove, 1, 1000);

        var needToSet = [{
            set: {
                key: 'b1x2',
                value: 'B3'
            }
        },
            {set: {key: 'b1x1', value: ''}}];

        var expectedMove =
            [{setTurn: {turnIndex: 1}},
                {
                    set: {
                        key: 'delta', value: {
                            rowBeforeMove: 1, colBeforeMove: 1,
                            rowAfterMove: 1, colAfterMove: 2
                        }
                    }
                },
                {set: {key: 'stage', value: 1}}].concat(needToSet);

        expect(angular.equals(move, expectedMove)).toBe(true);
    });

    it("B would use B1 to chase R7 if it's B's turn", function () {
        var stateBeforeMove = {
            delta: {rowBeforeMove: 2, colBeforeMove: 1, rowAfterMove: 2, colAfterMove: 2},
            b0x0: '', b0x1: '', b0x2: '', b0x3: '', b0x4: '', b0x5: 'R1', b0x6: '', b0x7: '',
            b1x0: '', b1x1: 'B1', b1x2: '', b1x3: '', b1x4: '', b1x5: '', b1x6: '', b1x7: '',
            b2x0: '', b2x1: '', b2x2: 'R7', b2x3: '', b2x4: 'R3', b2x5: '', b2x6: '', b2x7: '',
            b3x0: '', b3x1: 'R5', b3x2: '', b3x3: '', b3x4: '', b3x5: '', b3x6: '', b3x7: '',
            stage: 0
        };

        var move = _aiService.createComputerMove(
            stateBeforeMove, 1, 1000);

        console.log(move[1].set);

        var needToSet = [{
            set: {
                key: 'b1x2',
                value: 'B1'
            }
        },
            {set: {key: 'b1x1', value: ''}}];

        var expectedMove =
            [{setTurn: {turnIndex: 1}},
                {
                    set: {
                        key: 'delta', value: {
                            rowBeforeMove: 1, colBeforeMove: 1,
                            rowAfterMove: 1, colAfterMove: 2
                        }
                    }
                },
                {set: {key: 'stage', value: 1}}].concat(needToSet);

        expect(angular.equals(move, expectedMove)).toBe(true);
    });

    it("R3 would run away if it's R's turn", function () {
        var stateBeforeMove = {
            delta: {rowBeforeMove: 2, colBeforeMove: 1, rowAfterMove: 2, colAfterMove: 2},
            b0x0: '', b0x1: '', b0x2: '', b0x3: '', b0x4: '', b0x5: 'R1', b0x6: '', b0x7: '',
            b1x0: '', b1x1: 'B4', b1x2: '', b1x3: '', b1x4: '', b1x5: '', b1x6: '', b1x7: '',
            b2x0: '', b2x1: 'R3', b2x2: 'R1', b2x3: '', b2x4: 'R3', b2x5: '', b2x6: '', b2x7: '',
            b3x0: '', b3x1: 'R5', b3x2: '', b3x3: '', b3x4: '', b3x5: '', b3x6: '', b3x7: '',
            stage: 0
        };

        var move = _aiService.createComputerMove(
            stateBeforeMove, 0, 1000);

        console.log(move[1].set);

        var needToSet = [{
            set: {
                key: 'b2x0',
                value: 'R3'
            }
        },
            {set: {key: 'b2x1', value: ''}}];

        var expectedMove =
            [{setTurn: {turnIndex: 0}},
                {
                    set: {
                        key: 'delta', value: {
                            rowBeforeMove: 2, colBeforeMove: 1,
                            rowAfterMove: 2, colAfterMove: 0
                        }
                    }
                },
                {set: {key: 'stage', value: 1}}].concat(needToSet);

        expect(angular.equals(move, expectedMove)).toBe(true);
    });

    it("R7 would run away if it's R's turn", function () {
        var stateBeforeMove = {
            delta: {rowBeforeMove: 2, colBeforeMove: 1, rowAfterMove: 2, colAfterMove: 2},
            b0x0: '', b0x1: '', b0x2: '', b0x3: '', b0x4: '', b0x5: 'R1', b0x6: '', b0x7: '',
            b1x0: '', b1x1: 'B1', b1x2: '', b1x3: '', b1x4: '', b1x5: '', b1x6: '', b1x7: '',
            b2x0: '', b2x1: 'R7', b2x2: 'R1', b2x3: '', b2x4: 'R3', b2x5: '', b2x6: '', b2x7: '',
            b3x0: '', b3x1: 'R5', b3x2: '', b3x3: '', b3x4: '', b3x5: '', b3x6: '', b3x7: '',
            stage: 0
        };

        var move = _aiService.createComputerMove(
            stateBeforeMove, 0, 1000);

        console.log(move[1].set);

        var needToSet = [{
            set: {
                key: 'b2x0',
                value: 'R7'
            }
        },
            {set: {key: 'b2x1', value: ''}}];

        var expectedMove =
            [{setTurn: {turnIndex: 0}},
                {
                    set: {
                        key: 'delta', value: {
                            rowBeforeMove: 2, colBeforeMove: 1,
                            rowAfterMove: 2, colAfterMove: 0
                        }
                    }
                },
                {set: {key: 'stage', value: 1}}].concat(needToSet);

        expect(angular.equals(move, expectedMove)).toBe(true);
    });

    it("R5 would chase B1 if it's R's turn", function () {
        var stateBeforeMove = {
            delta: {rowBeforeMove: 2, colBeforeMove: 1, rowAfterMove: 2, colAfterMove: 2},
            b0x0: '', b0x1: '', b0x2: '', b0x3: '', b0x4: '', b0x5: 'R1', b0x6: '', b0x7: '',
            b1x0: '', b1x1: 'B1', b1x2: '', b1x3: '', b1x4: '', b1x5: '', b1x6: '', b1x7: '',
            b2x0: 'R7', b2x1: '', b2x2: 'R1', b2x3: '', b2x4: 'R3', b2x5: '', b2x6: '', b2x7: '',
            b3x0: '', b3x1: 'R5', b3x2: '', b3x3: '', b3x4: '', b3x5: '', b3x6: '', b3x7: '',
            stage: 0
        };

        var move = _aiService.createComputerMove(
            stateBeforeMove, 0, 1000);

        console.log(move[1].set);

        var needToSet = [{
            set: {
                key: 'b2x1',
                value: 'R5'
            }
        },
            {set: {key: 'b3x1', value: ''}}];

        var expectedMove =
            [{setTurn: {turnIndex: 0}},
                {
                    set: {
                        key: 'delta', value: {
                            rowBeforeMove: 3, colBeforeMove: 1,
                            rowAfterMove: 2, colAfterMove: 1
                        }
                    }
                },
                {set: {key: 'stage', value: 1}}].concat(needToSet);

        expect(angular.equals(move, expectedMove)).toBe(true);
    });

    it("B1 would only go to b0x1 if it's B's turn because other spot are protected", function () {
        var stateBeforeMove = {
            delta: {rowBeforeMove: 2, colBeforeMove: 1, rowAfterMove: 2, colAfterMove: 2},
            b0x0: '', b0x1: '', b0x2: '', b0x3: '', b0x4: '', b0x5: 'R1', b0x6: '', b0x7: '',
            b1x0: '', b1x1: 'B1', b1x2: '', b1x3: '', b1x4: '', b1x5: '', b1x6: '', b1x7: '',
            b2x0: 'R5', b2x1: '', b2x2: 'R1', b2x3: '', b2x4: 'R3', b2x5: '', b2x6: '', b2x7: '',
            b3x0: '', b3x1: 'R5', b3x2: '', b3x3: '', b3x4: '', b3x5: '', b3x6: '', b3x7: '',
            stage: 0
        };

        var move = _aiService.createComputerMove(
            stateBeforeMove, 1, 1000);

        console.log(move[1].set);

        var needToSet = [{
            set: {
                key: 'b0x1',
                value: 'B1'
            }
        },
            {set: {key: 'b1x1', value: ''}}];

        var expectedMove =
            [{setTurn: {turnIndex: 1}},
                {
                    set: {
                        key: 'delta', value: {
                            rowBeforeMove: 1, colBeforeMove: 1,
                            rowAfterMove: 0, colAfterMove: 1
                        }
                    }
                },
                {set: {key: 'stage', value: 1}}].concat(needToSet);

        expect(angular.equals(move, expectedMove)).toBe(true);
    });
});
