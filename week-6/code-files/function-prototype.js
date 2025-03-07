Function.prototype.describe = function (){
    console.log(this.name);
    
}

function greet(name){
    console.log(`hello ${name}`);
    
}

const masalaChai = ()=>{}
const normalChai = ()=>{}

greet.describe();
masalaChai.describe();
normalChai.describe();