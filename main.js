import GameManager from './manager/manager.js'

let TWO_PLAYERS = true;

setTimeout(main, 500);

function main() {

    let PLAYER_1 = {
        name : "PLAYER_1",
    }
    let PLAYER_2 = {
        name : "PLAYER_2",
    }

    let players = [ PLAYER_1 ];
    if(TWO_PLAYERS){
        players.push(PLAYER_2);
    }

    let gameManager = new GameManager( players );
    window.gameManager = gameManager; // -> good for debugging 

    window.addEventListener('keydown', function(e) {
        
        switch(e.keyCode){
            
            // p1 controls
            case 37 : return gameManager.onPersonMove("p1","left"); 
            case 38 : return gameManager.onPersonMove("p1","top");
            case 39 : return gameManager.onPersonMove("p1","right");
            case 40 : return gameManager.onPersonMove("p1","bottom");
            case 16 : return gameManager.onPersonAction("p1"); 
            case 13 : return gameManager.onPersonDrop("p1"); 
            
            //p2 controls
            case 65 : return gameManager.onPersonMove("p2","left"); 
            case 87 : return gameManager.onPersonMove("p2","top");
            case 68 : return gameManager.onPersonMove("p2","right"); 
            case 83 : return gameManager.onPersonMove("p2","bottom");
            case 32 : return gameManager.onPersonAction("p2"); 
            case 81 : return gameManager.onPersonDrop("p2"); 

        }
    });

    window.addEventListener('keyup', function(e) {
        // stop p1
        if( [37, 38, 39, 40].indexOf(e.keyCode) != -1 ) {
            gameManager.onPersonStop("p1");    
        }
        // stop p2
        if( [65, 68, 83, 87].indexOf(e.keyCode) != -1 ) {
            gameManager.onPersonStop("p2");    
        }
    });

    


}

