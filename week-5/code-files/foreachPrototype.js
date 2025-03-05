if(!Array.prototype.myForeach){
    Array.prototype.myForeach = function(userFun){
        const originalArray = this

        for(let i =0; i<originalArray.length; i++){
                userFun(originalArray[i],i)
        }


    }
}

const arr = [1,2,3,4,5,3,6,7]

arr.myForeach((value,index)=>(
    console.log(value)
))