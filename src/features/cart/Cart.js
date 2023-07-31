import React, { useState,useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { removefromcart,lowerItemValue, increaseItemValue} from "../product/productSlice";



export default function Cart() {

  let cartproducts = useSelector((state) => state.product.cartproducts);

  const removeItem = (product) => {
  dispatch(removefromcart(product))
  }

  const lowerItemValues = (product) => {
    dispatch(lowerItemValue(product))
  }

  const increaseItemValues = (product) => {
    dispatch(increaseItemValue(product))
  }
 
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);

  const Subtotal = cartproducts.reduce((acc,item) => acc+ item.cartQuantity*item.price, 0)

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 mt-12 sm:px-6 lg:px-8 bg-white">
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <h1 className="text-4xl font-bold my-5 tracking-tight text-gray-900">
            Cart
          </h1>
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {cartproducts.map((product) => (
                <li key={product.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={product.thumbnail}
                      alt={product.thumbnail}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a /* href={product.href} */>{product.title}</a>
                        </h3>
                        <p className="ml-4">${product.cartQuantity * product.price}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.color}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="text-gray-500">
                        <label
                          htmlFor="quantity"
                          className="inline text-sm mr-5 font-medium leading-6 text-gray-600"
                        >
                          Qty
                        <button className="   h-11 w-11 text-2xl" onClick={()=>lowerItemValues(product)}>-</button>
                        <a className=" bg-slate-300 px-6 py-3 h-11 w-auto">{product.cartQuantity}</a>
                        <button className="  h-11 w-11 text-2xl" onClick={()=>increaseItemValues(product)}>+</button>
                        </label>
                        

                        </div>
                      

                      <div className="flex">
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        onClick={()=> removeItem(product)}>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>${Subtotal}</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
          <Link to ="/checkout"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </Link>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or
              <Link to ="/">
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
                onClick={() => setOpen(false)}
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
