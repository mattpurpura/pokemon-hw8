var Pokemon = function(name, level){
    this.name = name,
    this.stats = {
        HPmax: 20+(5*(level-1)), 
        HPreal: 20+(5*(level-1)),
        attack: 5+(1*(level-1)),
        level: level,
        nextLevel: Math.pow(2.5, level), 
        exp: Math.pow(2.5, level-1)
    },
    this.addToParty = function(array){
        array.push(this);
        captured = true;
        console.log(array);
    }
    this.attack = function(defender){
        defender.stats.HPreal -= this.stats.attack;
        console.log(this.name+' attacked '+defender.name+' for '+this.stats.attack+'!');
        console.log(defender.name+" has "+defender.stats.HPreal+" HP left.");
    }
    this.checkAlive = function(){
        if(this.stats.HPreal > 0){
            return true;
        }
        else{
            return false;
        }
    }
    this.addExperience = function(defender){
        let minExp = this.level;
        let expGained = minExp*(1+(defender.stats.level - this.stats.level));
        if(expGained > minExp){
            this.stats.exp += this.stats.exp;
        }
        else{
            this.stats.exp++;
        }
        if(this.stats.exp >= this.stats.nextLevel){
            this.levelUp();
        }
    }
    this.levelUp = function(){
        this.stats.level++;
        this.stats.HPmax += 5;
        this.stats.attack += 1;
        this.stats.nextLevel *= 2.5;
        console.log(this.name+" leveled up to level "+this.stats.level+"!");
    }
}
module.exports = Pokemon;