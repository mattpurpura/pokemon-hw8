var Player = function(name){
    this.name = name, 
    this.party = [],
    this.starter,
    this.items = [
        {
            type: "pokeBall", 
            count: 5, 
        },
        {
            type: "potion", 
            count: 5, 
        },
    ]
    this.viewParty = function(){
        for(let i = 0; i<this.party.length; i++){
            console.log("-------------")
            console.log(this.party[i].name);
            console.log("Level: "+this.party[i].stats.level)
            console.log("HP: "+this.party[i].stats.HPreal+"/"+this.party[i].stats.HPmax);
            console.log("Attack: "+this.party[i].stats.attack);
            console.log("Exp: "+ this.party[i].stats.exp +"/"+this.party[i].stats.nextLevel);
        }
        
    }
    this.pokemonAvailable = function(){
        let availableArray = []
        for(let i = 0; i < this.party.length; i++){
            if(this.party[i].stats.HPreal > 0){
                availableArray.push(this.party[i]);
            }
        }
        if (availableArray.length > 0){
            return true;
        }
        else{
            return false;
        }
    }
    this.viewItems = function(){
        console.log(this.items)
    }
    this.hasItem = function(item){
        for(let i =0; i<this.items.length; i++){
            if (this.items[i].type === item && this.items[i].count > 0){
                return true;
            }
            else{
                return false;
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
    this.usePotion = function(pokemon){
        for(let i =0; i<this.items.length; i++){
            if (this.items[i].type === "potion"){
                this.items[i].count--;
                break;
            }
        }
        pokemon.stats.HPreal += pokemon.stats.HPmax*0.5;
        if(pokemon.stats.HPreal > pokemon.stats.HPmax){
            pokemon.stats.HPreal = pokemon.stats.HPmax;
        }
        console.log(pokemon.name+"s HP is restored to " + pokemon.stats.HPreal);
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
    this.healParty = function(){
        for(let i=0; i<this.party.length; i++){
            this.party[i].stats.HPreal = this.party[i].stats.HPmax;
        }
        
    }
    this.generateWildLevel = function(max, min){
        return Math.floor(Math.random()*(max-min))+min;
    }
    this.setStarter = function(){
        this.starter = this.party[0];
    }
    this.swapStarter = function(selection){
        for(let i=0; i<this.party.length; i++){
            if(this.party[i].name === selection){
                let newStarter = this.party[i];
                this.party.splice(i, 1, this.party[0]);
                this.party.splice(0, 1, newStarter);
                console.log("Starter selected");
                this.setStarter();
                break;
            }
        }
    }
} // end Player constructor

module.exports = Player;