angular.module('myApp').controller('Ctrl',
    ['$scope', '$log', '$timeout','$rootScope','$translate',
        'gameService', 'stateService', 'gameLogic',
        'aiService',
        'resizeGameAreaService', 'dragAndDropService',
        function ($scope, $log, $timeout, $rootScope, $translate,
                  gameService, stateService, gameLogic,
                  aiService,
                  resizeGameAreaService, dragAndDropService) {

            'use strict';

            var gameArea = document.getElementById("gameArea");
            var rowsNum = 4;
            var colsNum = 8;
            var draggingStartedRowCol = null; // The {row: YY, col: XX} where dragging started.
            var draggingPiece = null;

            //var isHelpIconClicked = false ;// check if the helper icon is clicked

            dragAndDropService.addDragListener("gameArea", handleDragEvent);

            console.log("Translation of 'RULES_OF_BANQI' is " + $translate('RULES_OF_BANQI'));
            
            window.e2e_test_stateService = stateService; // to allow us to load any state in our e2e tests.

            //make game size scalable
            resizeGameAreaService.setWidthToHeight(2);

            /**
             * handle the Drag Event using DragAndDropListener
             *
             * @param type
             * @param clientX
             * @param clientY
             */
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

                    //check if the help screen is Hide
                    //var helpModel = document.getElementById("helpModal");
                    //var helpModelHideCheck = helpModel.getAttribute("class");
                    //var isHelpModelHide;
                    //if (helpModelHideCheck === "overlayModal ng-hide") isHelpModelHide = true;
                    //else isHelpModelHide = false;
                    //
                    //console.log("isHelpModelHide", isHelpModelHide);


                    //console.log("isHelpIconClicked", isHelpIconClicked);

                    //if (isHelpIconClicked) {
                    //    isHelpIconClicked = false;
                    //    return;
                    //}

                    if (type === "touchstart" && !draggingStartedRowCol) {
                        // drag started
                        draggingStartedRowCol = {row: row, col: col};

                        if (($scope.stateAfterMove[key(row, col)] !== null)//not hide
                            && ($scope.stateAfterMove[key(row, col)] !== '')//has piece
                            && ((($scope.turnIndex === 0) && ($scope.stateAfterMove[key(row, col)][0] ==='R'))//red piece can move
                                || (($scope.turnIndex === 1) && ($scope.stateAfterMove[key(row, col)][0] ==='B'))//blue piece can move
                                )
                            ){
                            draggingPiece = document.getElementById("img_" + draggingStartedRowCol.row + "x" + draggingStartedRowCol.col);
                        }
                    }
                    if (type === "touchend") {
                        var from = draggingStartedRowCol;
                        var to = {row: row, col: col};
                        dragDone(from, to);
                    } else {
                        // Drag continue
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

            /**
             * set Dragging Piece Top Left
             *
             * @param topLeft
             */
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

            /**
             * get Square Width Height of board (square position)
             * @returns {{width: number, height: number}}
             */
            function getSquareWidthHeight() {
                return {
                    width: gameArea.clientWidth *.96 / colsNum,
                    height: gameArea.clientHeight *.98 / rowsNum
                };
            }

            /**
             * get Square Top Left position
             * @param row
             * @param col
             * @returns {{top: number, left: number}}
             */
            function getSquareTopLeft(row, col) {
                var size = getSquareWidthHeight();
                return {top: row * size.height, left: col * size.width}
            }

            /**
             * drag Done listener
             * @param from
             * @param to
             */
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
                    }
                });
            }

            /**
             * get integers for calculation
             *
             * @param number
             * @returns {Array}
             */
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

            /**
             * send the computer move (AI)
             */
            function sendComputerMove() {

                var move = aiService.createComputerMove($scope.stateAfterMove, $scope.turnIndex,
                    // at most 1 second for the AI to choose a move (but might be much quicker)
                    {millisecondsLimit: 1000});
                console.log("computer move: ", move);
                gameService.makeMove(move);

                //var possibleMoves = gameLogic.getPossibleMoves($scope.stateAfterMove, $scope.turnIndex);
                //console.log('possibleMoves: ', possibleMoves);
                //gameService.makeMove(possibleMoves[Math.floor(Math.random()*possibleMoves.length)]);
            }

            /**
             * updateUI function
             *
             * @param params
             */
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

                //initial the game
                if (!$scope.delta && $scope.isYourTurn) {
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
                      $scope.isYourTurn = false;
                      $timeout(sendComputerMove, 1000);
                  }
                else
                  {
                      computerMoved = 0;
                  }

                //check if the game is end
                //
                if ((!turnChanged) && ($scope.delta !== undefined)
                    && (($scope.delta.rowBeforeMove !== -1) || ($scope.delta.colBeforeMove !== -1))
                    && $scope.stateAfterMove.stage === 1){

                    console.log('delta: ', $scope.delta);
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

                //animation
                //
                if ((turnChanged) && ($scope.delta !== undefined)) {
                    //if it's tuning a piece
                    if ((($scope.delta.rowAfterMove === -1) || ($scope.delta.colAfterMove === -1))
                        && (($scope.delta.rowBeforeMove !== -1) || ($scope.delta.colBeforeMove !== -1))) {
                        var row = $scope.delta.rowBeforeMove;
                        var col = $scope.delta.colBeforeMove;
                        var img = document.getElementById('img_' + row + 'x' + col);

                        if (img.className === 'slowlyAppear1') {
                            img.className = "slowlyAppear2";
                        }
                        else {
                            img.className = "slowlyAppear1";
                        }
                    }
                    //if it's moving piece
                    else if (($scope.delta.rowBeforeMove !== -1) || ($scope.delta.colBeforeMove !== -1)){
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

            /**
             * initial game
             */
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
                //return true;
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
            //$scope.helpClicked = function (bool) {
            //    isHelpIconClicked = bool;
            //};

        }]);
