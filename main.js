var inquirer = require("inquirer");
var Player = require("./player.js");
var Pokemon = require("./pokemon.js");
var wildPokemon = require("./wildpokemon.js")

// var player = new Player("matt");
// console.log(player);

// var pokemon = new Pokemon("pikachu");
// console.log(pokemon);

// player.party.push(pokemon);
// console.log(player);
var player;
function timeout(next){
    setTimeout(next, 1500);
}

startGame()
function startGame(){
    inquirer.prompt([
        {
            type: "confirm",
            message: "Start?",
            name: "start"
        }
    ])
    .then(function(response){
        if (response.start === true){
            player = new Player("PlayerOne");
            chooseStarter();
        }
        else{
            console.log("Goodbye");
        }
    })
}// end startGame

function chooseStarter(){
   inquirer.prompt([
    {
        type: "confirm",
        message: "Welcome to the world of Pokemon! Here you'll be able to capture, train and battle pokemon to become the ultimate trainer.  Would you like to select your first pokemon?",
        name: "choose", 
    },
    {
        when: function(response){
            return response.choose === true;
        },
        type: "list", 
        message: "Which pokemon would you like?",
        choices: ["Bulbasaur", "Squirtle", "Charmander"],
        name: "starterChoice",
    }
]).then(function(response){
    if(response.choose === true){
        let pokemon = new Pokemon(response.starterChoice, 1);
        pokemon.captured = true;
        pokemon.addToParty(player.party);
        player.setStarter();
        displayMenu();
    }
}) 
} // chooseStarter

function displayMenu(){
    inquirer.prompt([
        {
            type: "list",
            message: "Choose an action",
            choices: ["Wander", "View Pokemon", "Swap Starter", "View Items", "Visit Pokemon Center"], 
            name: "menu"
        }
    ]).then(function(response){
        switch(response.menu){
            case "Wander":
                trainerBattle();
                // let random = Math.random();
                // if(random > 0.8){
                //     trainerBattle();
                // }
                // else{
                //     findPokemon();  
                // }
            break;
            case 'View Pokemon':
                player.viewParty();
                setTimeout(displayMenu, 1500)
            break;
            case "Swap Starter":
                inquirer.prompt([
                    {
                        type: "list", 
                        message: "Select a Pokemon as your starter.",
                        choices: function(){
                            let party = [];
                            for(let i=0; i<player.party.length; i++){
                                party.push(player.party[i].name);
                            }
                            return party;
                        },
                        name: "starter"
                    }
                ]).then(function(response){
                    player.swapStarter(response.starter);
                    timeout(displayMenu);
                })
            break;
            case "View Items":
                player.viewItems();
                setTimeout(displayMenu, 1500)
            break;
            case "Visit Pokemon Center":
                console.log("Please wait while we tend to your Pokemon.")
                player.healParty();
                setTimeout(function(){
                    console.log("Your Pokemon have been healed");
                }, 2000)
                setTimeout(displayMenu, 2500);
            break;
        }
    })
} // end displayMenu

var wild;
function randomPokemon(){
    let randomWild = Math.floor(Math.random()*(wildPokemon.length-1));
    let max = player.starter.stats.level+6;
    let min = player.starter.stats.level-6;
    if(min>0){}
    else{
        min=1;
    }
    let wildLevel = player.generateWildLevel(max, min);
    let pokemon = new Pokemon(wildPokemon[randomWild], wildLevel);
    return pokemon;
    // console.log(pokemon);
    
}

function findPokemon(){
    wild = randomPokemon();
    console.log("You found a wild "+wild.name+", level "+wild.stats.level+".");
    decideToBattle();
    function decideToBattle(){
    inquirer.prompt([
        {
            type: "list",
            message: "Choose action:",
            choices: ["Battle", "Run"],
            name: "battle"
        }
    ])
    .then(function(response){
        switch(response.battle){
            case 'Battle':
                battle();
            break;
            case "Run":
                let gotAway = player.run();
                if(gotAway === true){
                    timeout(displayMenu);
                }
                else{
                    timeout(decideToBattle);
                }
            break;
        }
    })
    }// end decideToBattle
} // end findPokemon
var attacker;
var defender;
function battle(){
    attacker = player.party[0];
    defender = wild;
    console.log(attacker.name +" vs. "+defender.name);
    battleTurn();
} //end battle

function battleTurn(){
    inquirer.prompt([
        {
            type: "list",
            message: "Choose action", 
            choices: ["Attack", "Switch Pokemon", "Use Item"],
            name: "attackChoice"
        }
    ]).then(function(response){
        switch(response.attackChoice){
            case "Attack":
                let attackChance = Math.random();
                
                if(attackChance <= 0.75){
                  attacker.attack(defender);  
                }
                else{
                    console.log(attacker.name+" missed!");
                }
                let defenderAlive = defender.checkAlive()
                switch(defenderAlive){
                    case true:
                        let counterChance = Math.random();
                        if(counterChance <= 0.6){
                            console.log(defender.name+" missed!");
                            timeout(battleTurn);
                        }
                        else{
                            defender.attack(attacker);  
                            let attackerAlive = attacker.checkAlive();
                            switch (attackerAlive){
                                case true:
                                timeout(battleTurn);
                                break;
                                case false:
                                    console.log(attacker.name+" fainted. You lost the battle.");
                                    timeout(displayMenu)
                                break;
                            }// end attackeralive Switch
                        }
                    break;
                    case false:
                        console.log(defender.name+" fainted. You won the battle!");
                        attacker.addExperience(defender);
                        timeout(displayMenu);
                    break;
                } // end defenderAlive switch
            break;
            case "Switch Pokemon":
                if(player.party.length === 1){
                    console.log("You have no other pokemon!")
                    timeout(battleTurn);
                }
                else{
                    inquirer.prompt([
                        {
                            type: "list",
                            message: "Select a Pokemon to battle with:",
                            choices: function(){
                                let availablePokemon = [];
                                for(let i=0; i < player.party.length; i++){
                                    availablePokemon.push(player.party[i].name);
                                }
                                return availablePokemon;
                            },
                            name: "choosePokemon"
                        }
                    ]).then(function(response){
                       let index = player.selectPokemon(response.choosePokemon);
                       attacker = player.party[index];
                       console.log(attacker.name+" is now battling!");
                       timeout(battleTurn);
                    })
                }
            break;
            case "Use Item":
                inquirer.prompt([
                    {
                        type: "list", 
                        message: "Select an item to use:",
                        choices: function(){
                            let availableItems = [];
                                for(let i=0; i < player.items.length; i++){
                                    if(player.items[i].count >0){
                                        availableItems.push(player.items[i].type);
                                    }
                                }
                                return availableItems;
                        },
                        name: "item"
                    }
                ]).then(function(response){
                    switch(response.item){
                        case "pokeBall":
                            console.log("You threw a poke ball!");
                            let catchPokemon = player.throwBall(defender);
                            if (catchPokemon === true){
                                timeout(displayMenu);
                            }
                            else{
                                timeout(battleTurn);
                            }
                        break;
                        case "potion":
                            player.usePotion(attacker);
                            timeout(battleTurn);
                        break;
                    }
                })
            break;
        }//end switch
    })//end then
}//end battleTurn

var trainer;
function createTrainer(){
    trainer = new Player("trainer");
    let random = Math.round(Math.random()*5+1);
    for(let i=0; i<random; i++){
        let pokemon = randomPokemon();
        trainer.party.push(pokemon);
    }
}
function trainerBattle(){
    console.log("A trainer has challenged you to a battle!");
    createTrainer();
    trainer.setStarter();
    attacker = player.starter;
    defender = trainer.starter;
    
    for(let i=0; i<trainer.party.length; i++){
        console.log(trainer.party[i].name +": level "+trainer.party[i].stats.level);
    }
    battleTurn();
}