const person1 = {
    name:"Pritam",
    greet: function(){
        console.log(`hello ${this.name}`);
        
    }
}
const person2 = {
    name:"Venky",
    greet: function(){
        console.log(`hello ${this.name}`);
        
    }
}

person1.greet.call(person2)