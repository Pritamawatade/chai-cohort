const originalObject = {
    name: "Alice",
    address: {
      city: "New York",
      zip: "10001",
    },
  };
  
  const shallowCopy = Object.assign({}, originalObject);
  
  shallowCopy.name = "Bob";
  shallowCopy.address.city = "Los Angeles";
  
  console.log(originalObject.name); // Alice
  console.log(originalObject.address.city); // Los Angeles
  console.log(shallowCopy.name); // Bob
  console.log(shallowCopy.address.city); // Los Angeles

  // The spread operator behaves similarly to Object.assign() for shallow copies.

  const originalObject1 = {
    name: "Alice",
    address: {
      city: "New York",
      zip: "10001",
    },
  };
  
  const shallowCopy1 = { ...originalObject1 };
  
  shallowCopy1.address.city = "Los Angeles";
  
  console.log(originalObject1.address.city); // Los Angeles
