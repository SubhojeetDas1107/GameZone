
var r = Math.floor(Math.random() * 100) + 1;
var turn = 7;
let sc = document.getElementById('score');
let dialog = document.getElementById('dialogue');
ox = document.getElementById('guesst');
function guesser(){
    x = ox.value;
    if(x>0 && x<=100){
        turn--;
        score.innerHTML = "Number Of Guesses Left : 0"+turn;
        if(x==r){
            dialog.innerHTML = "<br><br> You WON :D";
            setTimeout(reset=>{
                alert("You Won! :D\nPlay Again?");
                location.reload();
            },1000);
            return;
            
        }
        else if(x>r){
            dialog.innerHTML = "";
            setTimeout(rite=>{
                dialog.innerHTML = "<br><br> Too High, Try to guess Lower! :)";
            },200);
        }
        else{
            dialog.innerHTML = "";
            setTimeout(rite=>{
                dialog.innerHTML = "<br><br> Too Low, Try to guess Higher! :)";
            },200);
            
        }
    }
    else{
        dialog.innerHTML = "";
        setTimeout(rite=>{
            dialog.innerHTML = "<br><br> Input is invalid -_- <br> Please try again!";
        },200);
        
    }
    if(turn==0){
        setTimeout(rite=>{
            dialog.innerHTML = "<br><br> You LOST ;-; <br> The number was "+r;
        },400);
        setTimeout(reset=>{
            alert("You Lost! :(  The Number was : "+r+"\nTry Again?");
            location.reload();
        },1000);
        return;
    }
}


document.addEventListener("keypress", (event)=> {
    if (event.keyCode === 13) { // key code of the keybord key
        event.preventDefault();
        guesser();
    }
});
