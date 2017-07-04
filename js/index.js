$(function () {
    let isShowMovesDone = false;
    let isTurnOn = false;
    let isStart = false;
    let game = {
        count: 0,
        sections: ['1', '2', '3', '4'],
        currentGame: [],
        player: [],
        sound: {
            simonSound1: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
            simonSound2: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
            simonSound3: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
            simonSound4: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
        },
        strict: false
    };


    function newGame() {
        clearGame();
    }

    //reset,and start new game
    function clearGame() {
        game.currentGame = [];
        game.count = 0;
        addCount();
    }
    //addCount and generateMove
    function addCount() {
        game.count++;
        $('.num').html(game.count);
        generateMove();
    }

    function generateMove() {
        game.currentGame.push(game.sections[(Math.floor(Math.random() * 4))]);
        showMoves();
    }

    //show heightlight moves
    function showMoves() {

        let i = 0;
        let moves;
        isShowMovesDone = false; //makesure aeras is unclcikable  and addToPlayer() is not active;
        $('.aera').removeClass('aera-active');
        moves = setInterval(function () { //every 600ms,execute the playGame();
            playGame(game.currentGame[i]); //loop game.currentGame
            i++;
            if (i >= game.currentGame.length) {
                clearInterval(moves); //if loop is done, clearInterval
                isShowMovesDone = true; //makesuer aeras is clcikable  and addToPlayer() is active;
                $('.aera').addClass('aera-active');
            }
        }, 600);

        $('.num').html(game.count); //show current game count

        clearPlayer(); //reset game.player
    }

    //play game
    function playGame(field) {
        $('#' + field).addClass('active-' + field); //heigthlight current seciton background
        sound(field); //play current current sound
        setTimeout(function () {
            $('#' + field).removeClass('active-' + field); //after 300ms,remove heightlight current section background
        }, 300);
    }

    function clearPlayer() {
        game.player = [];
    }

    //play sound
    function sound(id) {
        switch (id) {
            case '1':
                game.sound.simonSound1.play();
                break;
            case '2':
                game.sound.simonSound2.play();
                break;
            case '3':
                game.sound.simonSound3.play();
                break;
            case '4':
                game.sound.simonSound4.play();
                break;
        }
    }

    //strick pattern
    function strict() {
        //use strick pattern
        if (game.strict == false) {
            game.strict = true;
            $('.dot').removeClass('no-active').addClass('active');
            $('.result').html('Use strict pattern!');
        }
        // does not use strick pattern
        else {
            game.strict = false;
            $('.dot').removeClass('active').addClass('no-active');
            $('.result').html('Cancel strict pattern!');
        }
        
        if (isTurnOn && isStart) {
            // start new game
            newGame();
        }
    }

    function addToPlayer(id) {
        //if showMoves() is done,user can click 
        if (isShowMovesDone) {
            let field = $(this).attr('id');
            game.player.push(field);
            playerTurn(field);
            playGame(field);
        }
    }

    function playerTurn(x) {
        //if current user cilcked section is not equal to computer turn
        if (game.player[game.player.length - 1] !== game.currentGame[game.player.length - 1]) {
            if (game.strict) { //if it is strict pattern
                $('.result').html('Try again! ...From scratch!');
                $('.num').html('!!'); //show the wrong message
                setTimeout(function () {
                    newGame(); //after 1s,reset all ,and start new game
                }, 1000);

            } else { //if it is not strict pattern
                $('.result').html('Wrong move! Try again!');
                $('.num').html('!!');
                setTimeout(function () {
                    showMoves(); //after 1s,reset current turn ,and start new current turn
                }, 1000);

            }
        }
        //if current user cilcked section is equal to computer turn
        else {
            $('.result').html('Good Move!');
            sound(x); //play current sound
            let check = game.player.length === game.currentGame.length; // check if user complete current turn
            if (check) {
                if (game.count == 20) { //if game count =20, win
                    $('.result').html('You won! Congrats.');
                } else { //else go to next level
                    $('.result').html('Next round!');
                    nextLevel();
                }
            }
        }
    }

    //delay 300ms,start nextLevel game
    function nextLevel() {
        setTimeout(function () {
            addCount();
        }, 300);
    }

    //turn on (turn off)power
    function power() {
        isTurnOn = !isTurnOn;
        //if power is turn on,
        if (isTurnOn) {
            $('.switch').removeClass('turnOff').addClass('turnOn');
            $('.num').html('--');
            $('.result').html('Power On!');
        }
        //if power is turn off
        else {
            $('.switch').removeClass('turnOn').addClass('turnOff');
            $('.num').html('');
            $('.result').html('Power Off!');
        }

    }

    //start game
    function startGame() {
        isStart = true;
        //if power is turn on and start button is clicked,then start game
        if (isTurnOn && isStart) {
            $('.result').html('Start Game!');
            newGame();
        }
    }

    //switch turnOn Or turnOff
    $('.switch').on('click', power);
    //click start button to startGame
    $('.btn-start').on('click', startGame);
    //user to play
    $('.aera').on('click', addToPlayer);
    //click strict button to use strict pattern
    $('.btn-strict').on('click', strict);


});