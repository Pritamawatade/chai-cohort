
//  this will go into the call stack first
console.log("hi");

// This is will go into the micro task queue which have high proorirty
Promise.resolve().then(()=>{
    console.log("propmise result");
    
})


// This is will go intot the callback queue which low priority compare to micro task queue
setTimeout(()=>console.log("set time")
,0)

console.log("by");




// Note : callback queue executes only when the micro task queue is empty