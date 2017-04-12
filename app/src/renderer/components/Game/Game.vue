<template>
    <div class="row">
        <div class="column game">
            <div class="greeting align-center" v-if="!gameStarted">
                <h1>Welcome to Snake Game</h1>
                <p>Push the button on the left to start!</p>
            </div>

            <div id="stage"></div>

            <transition name="fade">
                <div class="finished-game-popup shadow align-center" v-if="gamePaused">
                    <h4>Game Paused</h4>
                </div>
                <div class="finished-game-popup shadow align-center" v-if="lastGame.finished">
                    <h4>Game Over</h4>
                    <p>Your score is<br><span>{{lastGame.lastScore}}</span></p>
                </div>
                <div class="finished-game-popup shadow align-center" v-if="gameWon">
                    <h4>You won!</h4>
                    <p>Congratulations!</p>
                    <p>Your score is<br><span>{{lastGame.lastScore}}</span></p>
                </div>
            </transition>
        </div>

        <div class="column column-25 sidebar-wrapper">
            <div class="sidebar align-center align-items-center">
                <h2>Score: <span id="score"></span></h2>

                <button v-on:click="startGame">Start</button><br>
                <transition name="scale">
                    <div v-if="gameStarted && !lastGame.finished">
                        <button v-on:click="pauseGame" v-if="isPlaying">Pause</button>
                        <button v-on:click="resumeGame" v-if="!isPlaying">Resume</button>
                    </div>
                </transition>

                <h2>Settings</h2>
                <label for="difficulty">Difficulty {{difficulty}}</label>
                <input id="difficulty" type="range" min="5" max="50" v-model="difficulty">

                <h2>Controls</h2>
                <p class="instruction">Use arrow buttons or your keyboard to control the snake</p>
                <div class="controls">
                    <div class="row">
                        <div class="column align-center">
                            <img src="./assets/Up.png" :class="{ pressed: isUpButtonPressed }" v-on:click="buttonPressed(38)">
                        </div>
                    </div>
                    <div class="row">
                        <div class="column align-center">
                            <img src="./assets/Left.png" :class="{ pressed: isLeftButtonPressed }" v-on:click="buttonPressed(37)">
                            <img src="./assets/Down.png" :class="{ pressed: isDownButtonPressed }" v-on:click="buttonPressed(40)">
                            <img src="./assets/Right.png" :class="{ pressed: isRightButtonPressed }" v-on:click="buttonPressed(39)">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Game from './Game.js';

    export default {
        name: 'game',

        data() {
            return {
                game: null,
                difficulty: 10,
                isPlaying: false,
                gameStarted: false,
                gamePaused: false,
                isLeftButtonPressed: false,
                isUpButtonPressed: false,
                isRightButtonPressed: false,
                isDownButtonPressed: false
            };
        },

        computed: {
            lastGame() {
                return {
                    finished: this.$store.getters.finishedGame.finished,
                    lastScore: this.$store.getters.finishedGame.score
                };
            },

            gameWon() {
                return this.$store.getters.gameWon;
            }
        },

        methods: {
            startGame() {
                this.removePreviousCells();

                this.game = new Game(24, 24, 24, this.difficulty);

                this.gameStarted = true;
                this.isPlaying = true;
                this.gamePaused = false;

                this.$store.dispatch('TOGGLE_GAME', { finished: false, score: 0 });
                this.$store.dispatch('WIN_GAME', false);
            },

            pauseGame() {
                this.isPlaying = this.game.finishLoop();
                this.gamePaused = true;
            },

            resumeGame() {
                this.isPlaying = this.game.startLoop();
                this.gamePaused = false;
            },

            buttonPressed(key) {
                // Control snake if game started
                if (this.gameStarted) {
                    this.game.snake.controller(key);
                }

                let button = '';

                if (key === 37) {
                    button = 'Left';
                }
                if (key === 38) {
                    button = 'Up';
                }
                if (key === 39) {
                    button = 'Right';
                }
                if (key === 40) {
                    button = 'Down';
                }

                // Button animation
                this[`is${button}ButtonPressed`] = true;
                setTimeout(() => {
                    this[`is${button}ButtonPressed`] = false;
                }, 200);
            },

            removePreviousCells() {
                if (this.game !== null) {
                    const stage = this.game.stage;

                    while (stage.hasChildNodes()) {
                        stage.removeChild(stage.lastChild);
                    }
                }
            }
        },

        created() {
            window.addEventListener('keydown', (e) => {
                this.buttonPressed(e.keyCode);
            });
        }
    };
</script>

<style lang="scss">
    .game {
        position: relative;

        .greeting {
            margin-top: 200px;
        }

        #stage {
            position: relative;
            margin: 0 auto;

            .cell {
                position: absolute;
                transition: all 0.1s;
                background-color: #fff;

                &.filled {
                    @include cell-image('./assets/Clone.png');
                    transform: scale($scale-coef);

                    &.food {
                        @include cell-image('./assets/Planet-2.png');
                        transform: scale(1);
                    }

                    &.head {
                        @include cell-image('./assets/Darth-Vader.png');
                        transform: scale(1);
                    }
                }

                &.empty {

                }
            }

            .back-cell {
                @extend .cell;
            }
        }
    }

    .column.sidebar-wrapper {
        padding-left: 20px;

        .sidebar {
            height: 100%;

            h2 {
                margin: 40px 0 10px;

                &:first-child {
                    margin-top: 0;
                }
            }

            input[type="range"] {
                margin-bottom: 0;
            }

            .instruction {
                margin-bottom: 10px;
            }

            .controls {
                img {
                    display: inline-block;
                    width: 38px;
                    padding: 7px;
                    background: $gradient-primary;
                    border-radius: $radius-primary;
                    transition: $transition-primary;
                    cursor: pointer;

                    &.pressed {
                        transform: scale($scale-coef);
                        background: $gradient-secondary;
                    }
                }
            }
        }
    }

    .finished-game-popup {
        position: absolute;
        margin: 0 auto;
        top: 230px;
        left: 298px;
        transform: translateX(-50%);
        z-index: 2;
        padding: 20px;
        background-color: #fff;

        h4, p {
            margin-bottom: 0;
        }

        span {
            @include gradient-text($gradient-secondary);
            font-weight: 700;
            font-size: 20px;
        }
    }

    button:active {
        transform: scale($scale-coef);
        background: $gradient-secondary;
    }
</style>
