const salesData = [
    {product: "laptop", price: 2222},
    {product: "phone", price: 121},
    {product: "speakers", price: 221}
];


const totalSales = salesData.reduce((acc,sale)=> acc + sale.price,0)

console.log(totalSales);


const inventory = [
    {product: "laptop", stock: 222},
    {product: "phone", stock: 121},
    {product: "speakers", stock: 221}
];


const lowStock = inventory.filter((Element, index)=> Element.stock < 200)

console.log(lowStock);


const userActicity = [
    {user: "user a ", userActicityCount: 222},
    {user: "user  b", userActicityCount: 121},
    {user: "user c", userActicityCount: 221}
];

const mostActive  = userActicity.reduce((maxuser,user)=>
 maxuser.userActicityCount> user.userActicityCount ? maxuser : user
)


console.log(mostActive);
