angular.module('myApp').controller('Ctrl',
    ['$scope', '$log', '$timeout','$rootScope',
        'gameService', 'stateService', 'gameLogic',
        //'aiService',
        'resizeGameAreaService',
        function ($scope, $log, $timeout, $rootScope,
                  gameService, stateService, gameLogic,
                  //aiService,
                  resizeGameAreaService) {

            'use strict';

            var gameArea = document.getElementById("gameArea");
            var rowsNum = 4;
            var colsNum = 8;
            var draggingStartedRowCol = null; // The {row: YY, col: XX} where dragging started.
            var draggingPiece = null;

            window.handleDragEvent = handleDragEvent;
            function handleDragEvent(type, clientX, clientY) {
                // Center point in gameArea
                var x = clientX - gameArea.offsetLeft;
                var y = clientY - gameArea.offsetTop;
                var row, col;
                // Is outside gameArea?
                if (x < 0 || y < 0 || x >= gameArea.clientWidth || y >= gameArea.clientHeight) {
                    console.log("outside gameArea");
                    if (draggingPiece) {
                        // Drag the piece where the touch is (without snapping to a square).
                        var size = getSquareWidthHeight();
                        setDraggingPieceTopLeft({top: y - size.height / 2, left: x - size.width / 2});
                    } else {
                        return;
                    }
                } else {
                    // Inside gameArea. Let's find the containing square's row and col
                    var col = Math.floor(colsNum * x / gameArea.clientWidth);
                    var row = Math.floor(rowsNum * y / gameArea.clientHeight);
                    console.log("now at: ", row, col);

                    if (type === "touchstart" && !draggingStartedRowCol) {
                        // drag started
                        draggingStartedRowCol = {row: row, col: col};

                        if (($scope.stateAfterMove[key(row, col)] !== null)//not hide
                            && ($scope.stateAfterMove[key(row, col)] !== '')//has piece
                            && ((($scope.turnIndex === 0) && ($scope.stateAfterMove[key(row, col)][0] ==='R'))//red piece can move
                                || (($scope.turnIndex === 1) && ($scope.stateAfterMove[key(row, col)][0] ==='B'))//blue piece can move
                                )){
                            draggingPiece = document.getElementById("img_" + draggingStartedRowCol.row + "x" + draggingStartedRowCol.col);
                        }
                    }
                    //if (!draggingPiece) {
                    //    return;
                    //}

                    if (type === "touchend") {
                        var from = draggingStartedRowCol;
                        var to = {row: row, col: col};
                        dragDone(from, to);
                    } else {
                        // Drag continue
                        //setDraggingPieceTopLeft(getSquareTopLeft(row, col));
                        //var centerXY = getSquareCenterXY(row, col);
                        var size = getSquareWidthHeight();
                        setDraggingPieceTopLeft({top: y - size.height / 2, left: x - size.width / 2});
                    }
                }
                if (type === "touchend" || type === "touchcancel" || type === "touchleave") {
                    // drag ended
                    // return the piece to it's original style (then angular will take care to hide it).
                    setDraggingPieceTopLeft(getSquareTopLeft(draggingStartedRowCol.row, draggingStartedRowCol.col));
                    draggingStartedRowCol = null;
                    if (draggingPiece !== null) {
                        draggingPiece.removeAttribute("style");//fix broken UI
                        draggingPiece = null;
                    }
                }
            }

            function setDraggingPieceTopLeft(topLeft) {
                var size = getSquareWidthHeight();
                var top = size.height / 10;
                var left = size.width / 10;

                var originalSize = getSquareTopLeft(draggingStartedRowCol.row, draggingStartedRowCol.col);
                if (draggingPiece !== null) {
                    draggingPiece.style.left = (topLeft.left - originalSize.left + left) + "px";
                    draggingPiece.style.top = (topLeft.top - originalSize.top + top) + "px";
                }
            }

            function getSquareWidthHeight() {
                return {
                    width: gameArea.clientWidth *.96 / colsNum,
                    height: gameArea.clientHeight *.98 / rowsNum
                };
            }

            function getSquareTopLeft(row, col) {
                var size = getSquareWidthHeight();
                return {top: row * size.height, left: col * size.width}
            }

            //make game size scalable
            resizeGameAreaService.setWidthToHeight(2);


            function dragDone(from, to) {
                console.log("DragDone");
                $rootScope.$apply(function () {
                    var msg = "Dragged piece " + from.row + "x" + from.col + " to square " + to.row + "x" + to.col;
                    console.log(msg);

                    if (!$scope.isYourTurn) {
                        return;
                    }

                    //turn a piece
                    if ((from.row === to.row) && (from.col === to.col)
                        && $scope.stateAfterMove[key(from.row, from.col)] === null) {
                        //turn the piece
                        try {
                            var move = gameLogic.createMove($scope.stateAfterMove,
                                from.row, from.col, -1, -1, $scope.turnIndex);
                            $scope.isYourTurn = false; // to prevent making another move
                            gameService.makeMove(move);
                        } catch (e) {
                            $log.info(["Can't turn piece:", from.row, from.col, -1, -1]);
                            return;
                        }

                        //check if game end
                        try {
                            var move = gameLogic.checkGameEnd($scope.stateAfterMove, $scope.turnIndex);
                            $scope.isYourTurn = false; // to prevent making another move
                            gameService.makeMove(move);

                        } catch (e) {
                            $log.info(e);
                            $log.info("checkGameEnd failed!");
                            return;
                        }

                    }
                    //move piece
                    else {
                        try {
                            var move = gameLogic.createMove($scope.stateAfterMove,
                                from.row, from.col, to.row, to.col, $scope.turnIndex);
                            $scope.isYourTurn = false; // to prevent making another move
                            gameService.makeMove(move);


                        } catch (e) {
                            $log.info(["Can not move the piece:", from.row, from.col, to.row, to.col]);

                            return;
                        }

                        //check if game end
                        try {
                            var move = gameLogic.checkGameEnd($scope.stateAfterMove, $scope.turnIndex);
                            $scope.isYourTurn = false; // to prevent making another move
                            gameService.makeMove(move);
                        } catch (e) {
                            $log.info(e);
                            $log.info("checkGameEnd failed!");
                            return;
                        }
                    }
                });
            }

            function getIntegersTill(number) {
                var res = [];
                for (var i = 0; i < number; i++) {
                    res.push(i);
                }
                return res;
            }

            $scope.rows = getIntegersTill(rowsNum);
            $scope.cols = getIntegersTill(colsNum);
            $scope.rowsNum = rowsNum;
            $scope.colsNum = colsNum;


            var computerMoved = 0;// check if AI already made a move

            function sendComputerMove() {
                var possibleMoves = gameLogic.getPossibleMoves($scope.stateAfterMove, $scope.turnIndex);
                console.log('possibleMoves: ', possibleMoves);
                gameService.makeMove(possibleMoves[Math.floor(Math.random()*possibleMoves.length)]);

                //gameService.makeMove(aiService.createComputerMove($scope.stateAfterMove, $scope.turnIndex,
                //  // at most 1 second for the AI to choose a move (but might be much quicker)
                //  {millisecondsLimit: 1000}));

                //check if the game ends
                gameService.makeMove(gameLogic.checkGameEnd($scope.stateAfterMove, $scope.turnIndex));
            }

            function updateUI(params) {
                $scope.stateAfterMove = params.stateAfterMove;
                $scope.delta = params.stateAfterMove.delta;
                $scope.isYourTurn = params.turnIndexAfterMove >= 0 && // game is ongoing
                params.yourPlayerIndex === params.turnIndexAfterMove; // it's my turn

                var turnChanged;
                if ($scope.turnIndex !== params.turnIndexAfterMove) {
                    turnChanged = true;
                }
                else{
                    turnChanged = false;
                }

                $scope.turnIndex = params.turnIndexAfterMove;

                if (!$scope.delta && $scope.isYourTurn) {
                    //initial the game
                    initial();
                    return;
                }

                // Is it the computer's turn?
                  if (computerMoved !== 1
                      && $scope.isYourTurn
                      && params.playersInfo[params.yourPlayerIndex].playerId === '') {
                      computerMoved = 1;// to make sure the UI won't send another move.
                    // Waiting 0.5 seconds to let the move animation finish; if we call aiService
                    // then the animation is paused until the javascript finishes.
                    $timeout(sendComputerMove, 500);
                  }
                else
                  {
                      computerMoved = 0;
                  }

                //animation
                //
                if (turnChanged) {
                    //if it's tuning a piece
                    if ((($scope.delta.rowAfterMove === -1) || ($scope.delta.colAfterMove === -1))
                        && (($scope.delta.rowBeforeMove !== -1) && ($scope.delta.colBeforeMove !== -1))) {
                        var row = $scope.delta.rowBeforeMove;
                        var col = $scope.delta.colBeforeMove;
                        var img = document.getElementById('img_' + row + 'x' + col);

                        img.className = "slowlyAppear";
                    }
                    else {
                        var row = $scope.delta.rowAfterMove;
                        var col = $scope.delta.colAfterMove;
                        var img = document.getElementById('img_' + row + 'x' + col);
                        if (img.className === 'scale1') {
                            img.className = "scale2";
                        }
                        else {
                            img.className = "scale1";
                        }
                    }
                }
            }

            /**
             * Turn a position (a,b) to 'axb' key version
             * * ep. key(0,1) returns '0x1'
             *
             * @param x
             * @param y
             * @returns {string}
             */
            function key(x, y) {
                return 'b' + x.toString() + 'x' + y.toString();
            }

            window.e2e_test_stateService = stateService; // to allow us to load any state in our e2e tests.

            //try to initial game 1st
            function initial() {
                try {
                    var move = gameLogic.initialGame();
                    gameService.makeMove(move);
                } catch (e) {
                    $log.info(e);
                    $log.info("initialGame() failed");
                    return;
                }
            }

            gameService.setGame({
                gameDeveloperEmail: "xiaodongbo627@gmail.com",
                minNumberOfPlayers: 2,
                maxNumberOfPlayers: 2,
                isMoveOk: gameLogic.isMoveOk,
                updateUI: updateUI
            });

            $scope.shouldShowImage = function (row, col) {
                var cell = $scope.stateAfterMove[key(row, col)];
                return cell !== "";
            };
            $scope.getImageSrc = function (row, col) {
                var cell = $scope.stateAfterMove[key(row, col)];
                return cell === "R1" ? "res/R1.png"
                    : cell === "R2" ? "res/R2.png"
                    : cell === "R3" ? "res/R3.png"
                    : cell === "R4" ? "res/R4.png"
                    : cell === "R5" ? "res/R5.png"
                    : cell === "R6" ? "res/R6.png"
                    : cell === "R7" ? "res/R7.png"
                    : cell === "B1" ? "res/B1.png"
                    : cell === "B2" ? "res/B2.png"
                    : cell === "B3" ? "res/B3.png"
                    : cell === "B4" ? "res/B4.png"
                    : cell === "B5" ? "res/B5.png"
                    : cell === "B6" ? "res/B6.png"
                    : cell === "B7" ? "res/B7.png"
                    : cell === null ? "res/Hide.png"
                    : "";
            };

        }]);
