angular.module('myApp')
    .service('gameService',
    ["$window", "$log", "stateService", "messageService",
        function($window, $log, stateService, messageService) {

            'use strict';

            var isLocalTesting = $window.parent === $window ||
                $window.location.search === "?test";

            function makeMove(move) {
                $log.info(["Making move:", move]);
                if (isLocalTesting) {
                    stateService.makeMove(move);
                } else {
                    messageService.sendMessage({makeMove: move});
                }
            }

            function createPlayersInfo(game) {
                var playersInfo = [];
                for (var i = 0; i < game.maxNumberOfPlayers; i++) {
                    playersInfo.push({playerId : "" + (i + 42)});
                }
                return playersInfo;
            }

            function setGame(game) {
                $window.gameDeveloperEmail = game.gameDeveloperEmail;
                if (isLocalTesting) {
                    stateService.setGame(game);
                } else {
                    var isMoveOk = game.isMoveOk;
                    var updateUI = game.updateUI;

                    messageService.addMessageListener(function (message) {
                        $window.lastMessage = message;
                        if (message.isMoveOk !== undefined) {
                            var isMoveOkResult = isMoveOk(message.isMoveOk);
                            messageService.sendMessage({isMoveOkResult: isMoveOkResult});
                        } else if (message.updateUI !== undefined) {
                            updateUI(message.updateUI);
                        }
                    });

                    // You can't send functions using postMessage.
                    delete game.isMoveOk;
                    delete game.updateUI;
                    messageService.sendMessage({gameReady : game});

                    // Show an empty board to a viewer (so you can't perform moves).
                    updateUI({
                        move : [],
                        turnIndexBeforeMove : 0,
                        turnIndexAfterMove : 0,
                        stateBeforeMove : null,
                        stateAfterMove : {},
                        yourPlayerIndex : -2,
                        playersInfo : createPlayersInfo(game),
                        playMode: "passAndPlay",
                        endMatchScores: null
                    });
                }
            }

            this.makeMove = makeMove;
            this.setGame = setGame;
        }]);
