if(!Array.prototype.myFilter){
    Array.prototype.myFilter = function(userFun){
        const res = []

        for(let i = 0; i<this.length; i++){

            if(userFun(this[i])){
                res.push(this[i])
            }
        }

        return res
    }
}

const arr = [2,3,4,2,5,6,7,4,5,6]

const arr2 = arr.myFilter((e) => e%2 ===0)

console.log(arr2);
