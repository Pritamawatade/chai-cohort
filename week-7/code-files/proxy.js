
const user = {
    name:"pritam",
    age:20,
    password:"1223"
}

const proxyu = new Proxy(user,{
    get(target,prop){
        if(prop == "password"){
            throw new Error("access denied")
        }
        return target[prop]
    },
    
    set(target,prop,val){
        target[prop] = val
    }
})

// console.log(proxyu.password)

proxyu.name = "changes name"



// Nagitive index enable
const arr = [1,2,3,4,5,6,7,8,98]

function nagitiveIndex(arr){
    return new Proxy(arr,{
        get(target,prop){
            const index = Number(prop);
            if(index < 0){
                return target[target.length + index]
            }
        },

        set(target,prop,val){
             target[prop] = val + 2;
            return true;
        }
    })

}

const arr2  = nagitiveIndex(arr);


console.log(arr2[-1]);
arr2[1] = 2;
console.log(arr2);
console.log(arr);

