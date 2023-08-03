import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts, fetchProductsByFilters } from "./productAPI";
import { createReducer } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
  products: [],
  status: "idle",
  query: localStorage.getItem("query") ? localStorage.getItem("query") : "",
  cartproducts: localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [],
  address: localStorage.getItem("address") ? JSON.parse(localStorage.getItem("address")) : [],

};

export const fetchAllProductsAsync = createAsyncThunk(
  "product/fetchAllProducts",
  async () => {
    const response = await fetchAllProducts();
    // The value we return becomes the `fulfilled` action payload
    //console.log(response)
    return response.data;
  }
);

export const fetchProductsByFiltersAsync = createAsyncThunk(
  "product/fetchProductsByFilters",
  async (queryString) => {
    const response = await fetchProductsByFilters(queryString);
    // The value we return becomes the `fulfilled` action payload
    //console.log(response)
    return response.data;
  }
);

export const fetchcartProductsAsync = createAsyncThunk(
  "product/fetchcartProducts",
  async (items) => {
    
    return items;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    addtocart: (state, action) => {
      const itemIndex = state.cartproducts.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex >= 0) {
        state.cartproducts[itemIndex].cartQuantity += 1;
      } else {
        let tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartproducts.push(tempProduct);
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartproducts));
    },

    removefromcart: (state, action) => {
      const newCart = state.cartproducts.filter(
        (item) => item.id !== action.payload.id
      );
      state.cartproducts = newCart;
      localStorage.setItem("cartItems", JSON.stringify(state.cartproducts));
    },

    lowerItemValue: (state,action) => {
       const itemid = state.cartproducts.findIndex((item) => item.id === action.payload.id)
        if(state.cartproducts[itemid].cartQuantity == 1){
          const newCart = state.cartproducts.filter(
            (item) => item.id !== action.payload.id
          )
          state.cartproducts = newCart
          localStorage.setItem("cartItems", JSON.stringify(state.cartproducts))
        }if(state.cartproducts[itemid].cartQuantity > 1){
          state.cartproducts[itemid].cartQuantity -=1
          localStorage.setItem("cartItems", JSON.stringify(state.cartproducts));
        }
       },

       increaseItemValue : (state,action) => {
        const itemid =state.cartproducts.findIndex((item) => item.id === action.payload.id)
        state.cartproducts[itemid].cartQuantity +=1
        localStorage.setItem("cartItems",JSON.stringify(state.cartproducts))
       },

       addAddress : (state,action) => {
        console.log("Data from Product Slice",action.payload)
        state.address.push(action.payload)
        localStorage.setItem("address",JSON.stringify(state.address))
       },

       deleteAddress : (state,action) => {
        
        const addressIndex = state.address.findIndex((item) => item.phone === action.payload.phone)
        if(addressIndex >=0){
          state.address.splice(addressIndex,addressIndex+1)
        }
        localStorage.setItem("address",JSON.stringify(state.address))
       },

       addQuery: (state,action) => {
        if(state.query.includes(action.payload)){
          state.query = state.query.replace(action.payload,'')
          localStorage.setItem("query",state.query)
          //console.log("Deleted",state.query)
        }else{
          state.query = state.query+action.payload
          //console.log("Added",state.query)
          localStorage.setItem("query",state.query)
        }
       }


      
     
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(fetchcartProductsAsync.fulfilled, (state, action) => {
        //console.log("Quantity of" + action.payload + " " +count[action.payload])
        state.cartproducts = state.cartproducts.concat(action.payload);
      });
  },
});

export const { increment } = productSlice.actions;
export const { addtocart, removefromcart,lowerItemValue, increaseItemValue, addAddress ,deleteAddress, addQuery } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;

export default productSlice.reducer;
