# Christmas Buzz
## Little Dicegame for Christmas
A little dice game, created for Christmas Eve.
Written to work woth the PS2 Buzz Buzzers.

## GamePlay
### Select Players
Each player kan toggle if they are joing with the big red button on the Buzzer.
When everyone is set, the gameleader can confirm and start the maingame with Enter
### The Game
Everyone gets 3 throws. Throwing is done with the big red button.
Locking dice happens with the colored buttons.
After 3 throws als dice are locked, so the score can be confirmed.
### Scoring
Scoring is as follows:
No equal dice or sequence: 1 point (eg. 1-2-4-6)
2 equal dice: 20 points (eg. 1-1-4-5)
2 pairs : 25 points (eg. 2-2-4-4)
3 equal dice : 30 points (eg. 6-6-6-5)
3 sequential dice: 35 points (eg. 2-3-4-6)
4 equal dice: 40 points (eg. 3-3-3-3)
4 sequential dice : 50 points (eg. 3-4-5-6)

When 2 players have the same amount of points, the player with the highest total throw wins.
Beware! When a player keeps hitting the throw-button after their 3 throws, one point is subtracted from the total score!

The gameleader can reset the dice, and start a new round by pressing the Enter button. Warning: nor warning or check happens to reset the dice.
### Full Restart
Just refresh the webpage, and the Player Selection will appear.

## Buzzers
I configured the Buzzers with https://joytokey.net/en/.
The configuration file is in the Joy2KeySettings folder, and also listed here (KeyMapping also works on a normal KeyBoard, for testing and developing purposes)
The "Admin" buttons is Enter, so the gameleader can use a regular keyboard to confirm the players, and reset the game.

Buzzer 1:
Red Button : Digit1
Blue Button : KeyQ
Orange Button : KeyW
Green Button : KeyE
Green Button : KeyR

Buzzer 2:
Red Button : Digit2
Blue Button : KeyA
Orange Button : KeyS
Green Button : KeyD
Green Button : KeyF

Buzzer 3:
Red Button : Digit9
Blue Button : KeyU
Orange Button : KeyI
Green Button : KeyO
Green Button : KeyP

Buzzer 4:
Red Button : Digit0
Blue Button : KeyH
Orange Button : KeyJ
Green Button : KeyK
Green Button : KeyL


## Aditional info:
 - styling done with Semantic UI React
 - Christmas Icons from [https://www.favicon.cc/?action=icon&file_id=694289 ](https://iconarchive.com/show/christmas-flat-color-icons-by-icons8/christmas-tree-icon.html)

## Disclaimer
Not the cleanest code, but it works... This game was intended for personal use, and was developed quick and dirty