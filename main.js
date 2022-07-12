//                             /* My comments */
/* WHEN ALL LETTERS ARE IN UPPERCASE ----- it indicates what part of the code you are watching */
/* When written in normal case ----- it indicates a section in that part of code */
// When written with backslash (//) ----- it describes next line of code
/* ---------------------------------------------------------------------------------------------- */

//                       /* THE GAME : TIC-TAC-TOE */

/*---------- PART 1 : CREATING PLAYERS, OPTION TO CHOOSE SIGNS, DECLARING WHOSE TURN IS IT--------*/

/* Making a variable that let us know whoes turn is it, Player 1 should always play first */
let whoseTurn = '';

/* Creating Players as objects */

//Player 1
let player1 = {
    sign: '',
    score: document.querySelector('#scoreP1').textContent,
    
    //When Player 1 change sign
    changeSign() {
        // Player 1 can change sign only in new round (calling isStarted function at the bottom of the code)
        signThenStart();// Code line 47
        player1.sign = document.querySelector('#player_1').value;
        // The sign that decides which turn is it is equal to player1 sign
        whoseTurn = player1.sign;
    },
};

//Player 2
let player2 = {
    sign: '',
    score: document.querySelector('#scoreP2').textContent,
   
    //When Player 2 change sign
    changeSign() {
        // Player 2 can change sign only in new round (calling isStarted function at the bottom of the code)
        signThenStart();
        player2.sign = document.querySelector('#player_2').value;
          
    }
};

/* Making and calling the function that disables and enables the board and change sign buttons */
// The player must first chose the sign and then play, he cant change sign in game.
signThenStart();
function signThenStart() {
    // The board
    let c1 = document.querySelector('#c1');
    let c2 = document.querySelector('#c2');
    let c3 = document.querySelector('#c3');
    let b1 = document.querySelector('#b1');
    let b2 = document.querySelector('#b2');
    let b3 = document.querySelector('#b3');
    let a1 = document.querySelector('#a1');
    let a2 = document.querySelector('#a2');
    let a3 = document.querySelector('#a3');
    
    
    if(player1.sign.length==0 && player2.sign.length==0) {
        // Disable all buttons
        c1.disabled = true; b1.disabled = true; a1.disabled = true;
        c2.disabled = true; b2.disabled = true; a2.disabled = true;
        c3.disabled = true; b3.disabled = true; a3.disabled = true;
    }
    else  {
        // Enable board
        c1.disabled = false; b1.disabled = false; a1.disabled = false;
        c2.disabled = false; b2.disabled = false; a2.disabled = false;
        c3.disabled = false; b3.disabled = false; a3.disabled = false;
        // Disable the change sign buttons
        document.querySelector('#changePlayer1').disabled = true;
        document.querySelector('#changePlayer2').disabled = true;

    }
    
}
// Disable 'Change sign' buttons only in gameplay 
/* isStarted();
if (isStarted==false) {
    document.querySelector('#changePlayer1').disabled = true;
    document.querySelector('#changePlayer2').disabled = true;
} */

/*Changing the Players sign with the 'Change sign' button */
document.querySelector('#changePlayer1').addEventListener('click', player1.changeSign);
document.querySelector('#changePlayer2').addEventListener('click', player2.changeSign);

//And now a function that changes the turn of players
let changeTurn = _ =>
    whoseTurn == player1.sign ? whoseTurn = player2.sign : whoseTurn = player1.sign;


//*---------------------------- PART 2: CREATING A WINNING OR DRAFT FUNCTION --------------------------------*/

function checkWin(player) {
    // Storing the buttons in variables (I don't use .textContent now,,because I want to put a color when winning)
    let c1 = document.querySelector('#c1');
    let c2 = document.querySelector('#c2');
    let c3 = document.querySelector('#c3');
    let b1 = document.querySelector('#b1');
    let b2 = document.querySelector('#b2');
    let b3 = document.querySelector('#b3');
    let a1 = document.querySelector('#a1');
    let a2 = document.querySelector('#a2');
    let a3 = document.querySelector('#a3');

    // Function that checks win
    function win(x, y, c) {
        let p1 = player1.sign.repeat(3);
        let p2 = player2.sign.repeat(3);
        if (x.textContent + y.textContent + c.textContent == p1 ||
            x.textContent + y.textContent + c.textContent == p2) {
            document.getElementById('placeholder').textContent = (`${player} has won`);
            // Change color of winning buttons (green for player 1 and yellow for player 2)
            if (player == 'Player 1') {
                x.style.backgroundColor = "green";
                y.style.backgroundColor = "green";
                c.style.backgroundColor = "green";
                document.getElementById('placeholder').style.color = "green";
                document.querySelector('#scoreP1').textContent++;
            }
            else if (player == 'Player 2') {
                x.style.backgroundColor = "orange";
                y.style.backgroundColor = "orange";
                c.style.backgroundColor = "orange";
                document.getElementById('placeholder').style.color = "orange"; 
                document.querySelector('#scoreP2').textContent++;
            };
            // Disable all buttons
            c1.disabled = true; b1.disabled = true; a1.disabled = true;
            c2.disabled = true; b2.disabled = true; a2.disabled = true;
            c3.disabled = true; b3.disabled = true; a3.disabled = true;
        };
    };

    // Calling the function win
    win(c1, c2, c3);
    win(b1, b2, b3);
    win(a1, a2, a3);
    win(c1, b1, a1);
    win(c2, b2, a2);
    win(c3, b3, a3);
    win(c1, b2, a3);
    win(a1, b2, c3);

    // Cheking draf ( if there is nothing in the winner placeholder)
    if (!document.querySelector('#placeholder').textContent)
        // and if all buttons have content
        if (a1.textContent && a2.textContent && a3.textContent &&
            b1.textContent && b2.textContent && b3.textContent &&
            c1.textContent && c2.textContent && c3.textContent) {
            document.querySelector('#placeholder').textContent = "Draw";
            document.querySelector('#placeholder').style.color = "red";
        };
};


/*--------------------- PART 3: PUTING EVENT LISTENERS AND MAKING THEIR CALLBACK FUNCTIONS------------------- */

/* Puting event listeners on buttons */
document.querySelector('#c1').addEventListener('click', choiceC1);
document.querySelector('#c2').addEventListener('click', choiceC2);
document.querySelector('#c3').addEventListener('click', choiceC3);
document.querySelector('#b1').addEventListener('click', choiceB1);
document.querySelector('#b2').addEventListener('click', choiceB2);
document.querySelector('#b3').addEventListener('click', choiceB3);
document.querySelector('#a1').addEventListener('click', choiceA1);
document.querySelector('#a2').addEventListener('click', choiceA2);
document.querySelector('#a3').addEventListener('click', choiceA3);

/* Creating variables that checks if the button is already clicked */
let clickedC1 = false;
let clickedC2 = false;
let clickedC3 = false;
let clickedB1 = false;
let clickedB2 = false;
let clickedB3 = false;
let clickedA1 = false;
let clickedA2 = false;
let clickedA3 = false;

/* Function that turns button to red for a half second to indicate that the choice is not valid */
function notValid(button) {
    button.style.backgroundColor = "red";
    const changeColor = setTimeout(backToGrey, 500);
    // Making button grey again
    function backToGrey() { button.style.backgroundColor = "#efefef" };
}

/* Making callback functions of event listeners */
// For C1
function choiceC1() {
    let c1 = document.querySelector('#c1');
    // If the button already has a value - show with red color that it's not a valid move 
    if (clickedC1) {
        notValid(c1)
    }
    // if the button is empty put players sign in it
    else {
        c1.textContent = whoseTurn;
        // Check win
        whoseTurn == player1.sign ? checkWin('Player 1') : checkWin('Player 2');
        // Say that the button is already clicked
        clickedC1 = true;
        // Change the player turn
        changeTurn()

    }
}
// For C2
function choiceC2() {
    let c2 = document.querySelector('#c2');
    // If the button already has a value - show with red color that it's not a valid move 
    if (clickedC2) {
        notValid(c2)
    }
    // if the button is empty put players sign in it
    else {
        c2.textContent = whoseTurn;
        // Check win
        whoseTurn == player1.sign ? checkWin('Player 1') : checkWin('Player 2');
        // Say that the button is already clicked
        clickedC2 = true;
        // Change the player turn
        changeTurn()

    }
}
// For C3
function choiceC3() {
    let c3 = document.querySelector('#c3');
    // If the button already has a value - show with red color that it's not a valid move 
    if (clickedC3) {
        notValid(c3)
    }
    // if the button is empty put players sign in it
    else {
        c3.textContent = whoseTurn;
        // Check win
        whoseTurn == player1.sign ? checkWin('Player 1') : checkWin('Player 2');
        // Say that the button is already clicked
        clickedC3 = true;
        // Change the player turn
        changeTurn()

    }
}
// For B1
function choiceB1() {
    let b1 = document.querySelector('#b1');
    // If the button already has a value - show with red color that it's not a valid move 
    if (clickedB1) {
        notValid(b1)
    }
    // if the button is empty put players sign in it
    else {
        b1.textContent = whoseTurn;
        // Check win
        whoseTurn == player1.sign ? checkWin('Player 1') : checkWin('Player 2');
        // Say that the button is already clicked
        clickedB1 = true;
        // Change the player turn
        changeTurn()

    }
}
// For B2
function choiceB2() {
    let b2 = document.querySelector('#b2');
    // If the button already has a value - show with red color that it's not a valid move 
    if (clickedB2) {
        notValid(b2)
    }
    // if the button is empty put players sign in it
    else {
        b2.textContent = whoseTurn;
        // Check win
        whoseTurn == player1.sign ? checkWin('Player 1') : checkWin('Player 2');
        // Say that the button is already clicked
        clickedB2 = true;
        // Change the player turn
        changeTurn()

    }
}
// For B3
function choiceB3() {
    let b3 = document.querySelector('#b3');
    // If the button already has a value - show with red color that it's not a valid move 
    if (clickedB3) {
        notValid(b3)
    }
    // if the button is empty put players sign in it
    else {
        b3.textContent = whoseTurn;
        // Check win
        whoseTurn == player1.sign ? checkWin('Player 1') : checkWin('Player 2');
        // Say that the button is already clicked
        clickedB3 = true;
        // Change the player turn
        changeTurn()

    }
}
// For A1
function choiceA1() {
    let a1 = document.querySelector('#a1');
    // If the button already has a value - show with red color that it's not a valid move 
    if (clickedA1) {
        notValid(a1)
    }
    // if the button is empty put players sign in it
    else {
        a1.textContent = whoseTurn;
        // Check win
        whoseTurn == player1.sign ? checkWin('Player 1') : checkWin('Player 2');
        // Say that the button is already clicked
        clickedA1 = true;
        // Change the player turn
        changeTurn()

    }
}
// For A2
function choiceA2() {
    let a2 = document.querySelector('#a2');
    // If the button already has a value - show with red color that it's not a valid move 
    if (clickedA2) {
        notValid(a2)
    }
    // if the button is empty put players sign in it
    else {
        a2.textContent = whoseTurn;
        // Check win
        whoseTurn == player1.sign ? checkWin('Player 1') : checkWin('Player 2');
        // Say that the button is already clicked
        clickedA2 = true;
        // Change the player turn
        changeTurn()

    }
}
// For A3
function choiceA3() {
    let a3 = document.querySelector('#a3');
    // If the button already has a value - show with red color that it's not a valid move 
    if (clickedA3) {
        notValid(a3)
    }
    // if the button is empty put players sign in it
    else {
        a3.textContent = whoseTurn;
        // Check win
        whoseTurn == player1.sign ? checkWin('Player 1') : checkWin('Player 2');
        // Say that the button is already clicked
        clickedA3 = true;
        // Change the player turn
        changeTurn()

    }
}

/* -----------------------------PART 4: RESTARTING THE GAME ---------------------------------------*/

// Add listener and callback function on button (playAgain)
document.getElementById('playAgain').addEventListener('click', restart);

function restart() {
    // Storing buttons
    let c1 = document.querySelector('#c1');
    let c2 = document.querySelector('#c2');
    let c3 = document.querySelector('#c3');
    let b1 = document.querySelector('#b1');
    let b2 = document.querySelector('#b2');
    let b3 = document.querySelector('#b3');
    let a1 = document.querySelector('#a1');
    let a2 = document.querySelector('#a2');
    let a3 = document.querySelector('#a3');
    // Put them in array for looping
    let buttons = [c1, c2, c3, b1, b2, b3, a1, a2, a3];

    for (button of buttons) {
        // Reasigning content from buttons (X/O) to empty string
        button.textContent = '';
        // Buttons are disabled after win, here we making them enable
        button.disabled = false;
        // Some buttons change color, lets restart them to grey
        button.style.backgroundColor = "#efefef";
    };

    // Some buttons count as already clicked, lets restart that
    clickedC1 = false;
    clickedC2 = false;
    clickedC3 = false;
    clickedB1 = false;
    clickedB2 = false;
    clickedB3 = false;
    clickedA1 = false;
    clickedA2 = false;
    clickedA3 = false;

    // Clearing the placeholder of winner
    document.querySelector('#placeholder').textContent = '';


};

/*--------------------------PART 5: CHECK IS THE GAME STARTED --------------------------------------*/
function isStarted() {
    // Storing buttons
    let c1 = document.querySelector('#c1').textContent;
    let c2 = document.querySelector('#c2').textContent;
    let c3 = document.querySelector('#c3').textContent;
    let b1 = document.querySelector('#b1').textContent;
    let b2 = document.querySelector('#b2').textContent;
    let b3 = document.querySelector('#b3').textContent;
    let a1 = document.querySelector('#a1').textContent;
    let a2 = document.querySelector('#a2').textContent;
    let a3 = document.querySelector('#a3').textContent;
    // If one button has content game hass started 
    if (c1||c2||c3||b1||b2||b3||a1||a2||a3) {
        return true;
    }else {
        return false;
    }
};

