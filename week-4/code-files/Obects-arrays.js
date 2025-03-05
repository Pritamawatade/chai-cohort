let obj = {
    roll: 32,
    name: "pritam",
    last:"awatade"
}

const obj2 = obj
obj.last = "ssldkfalf"

let arr = [1,2,3,4,5,6,7]
console.log(arr);

let arr2 = arr;
console.log(arr2);
arr[0] = 9;
console.log(arr);
console.log(arr2);
