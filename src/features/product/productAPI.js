// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/products')
    //console.log("This is data from response",response.json())
    const data = await response.json()
    console.log(data)
    resolve({data})
    }  );
}

export function fetchProductsByFilters(filter) {

  let queryString = ""

  for(let key in filter){
    queryString += `${key}=${filter[key]}&`
  }

  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/products?'+queryString)
    //console.log("This is data from response",response.json())
    const data = await response.json()
    console.log(data)
    resolve({data})
    }  );
}

//https://fakestoreapi.com/products
//https://dummyjson.com/products

//http://localhost:8080/products/