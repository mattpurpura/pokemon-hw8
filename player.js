var Player = function(name){
    this.name = name, 
    this.party = [],
    this.items = [
        {
            type: "pokeBall", 
            count: 5, 
        },
    ]
    this.viewParty = function(){
        console.log(this.party)
    }
    this.viewItems = function(){
        console.log(this.items)
    }
    this.hasItem = function(item){
        for(let i =0; i<this.items.length; i++){
            if (this.items[i].type === item && this.items[i].count > 0){
                return true;
            }
        }
    }
    this.throwBall = function(pokemon){
        for(let i =0; i<this.items.length; i++){
            if (this.items[i].type === "pokeBall"){
                this.items[i].count--;
                break;
            }
        }
        let random = Math.random();
        if(random <= 0.5){
            this.party.push(pokemon);
            console.log("You caught "+pokemon.name+"!");
            return true;
        }
        else{
            console.log("You failed to catch "+pokemon.name+".");
            return false;
        }
       
    }
    this.selectPokemon = function(pokemon){
        for (let i=0; i < this.party.length; i++){
            if(this.party[i].name === pokemon){
                return i;
            }
        }
    }
    this.run = function(){
        let random = Math.random();
        if(random <= 0.8){
            console.log("You ran away!");
            return true;
        }
        else{
            console.log("Can't escape!");
            return false;
        }
    }
} // end Player constructor

module.exports = Player;