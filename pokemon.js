var Pokemon = function(name){
    this.name = name,
    this.stats = {
        HP: 20,
        attack: 5,
        level: 1,
        sleeping: false, 
        paralyzed: false,
        poisoned: false, 
        captured: false
    },
    this.addToParty = function(array){
        array.push(this);
        captured = true;
        console.log(array);
    }
    this.attack = function(defender){
        defender.stats.HP -= this.stats.attack;
        console.log(this.name+' attacked '+defender.name+' for '+this.stats.attack+'!');
        console.log(defender.name+" has "+defender.stats.HP+" HP left.");
    }
    this.checkAlive = function(){
        if(this.stats.HP > 0){
            return true;
        }
        else{
            return false;
        }
    }
}
module.exports = Pokemon;