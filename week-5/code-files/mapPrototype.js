if(!Array.prototype.myMap){
    Array.prototype.myMap = function(userFun){

        const res = []
        for(let i =0; i<this.length; i++){
               const value =  userFun(this[i],i)
               res.push(value)
        }

        return res


    }
}

const arr = [1,2,3,4,5,3,6,7]

const arr2 = arr.myMap((e)=>e*3)

console.log(arr);
console.log(arr2);


