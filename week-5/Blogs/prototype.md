# Prototype world

## Prototype is a way to add aditional methods on top of default JS methods and properties This is also called polyfills

 In javascript on all array we .map(), .filter() , .foreach() method but not all browser supports modern methods

## let's see how we can build our own methods 

## filter polifill
```
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

```
## foreach polifill
```
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

```
## map polifill
```
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



```
