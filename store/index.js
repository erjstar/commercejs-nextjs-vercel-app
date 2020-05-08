import { createStore, applyMiddleware, compose } from 'redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import thunk from 'redux-thunk';

import {
  STORE_PRODUCTS,
  STORE_CATEGORIES,
  RETRIEVE_CART_SUCCESS,
  ADD_TO_CART_SUCCESS,
  UPDATE_CART_ITEM_SUCCESS,
  REMOVE_FROM_CART_SUCCESS,
  GENERATE_CHECKOUT_TOKEN_SUCCESS,
  CAPTURE_ORDER_SUCCESS,
  GENERATE_CHECKOUT_TOKEN,
  GET_SHIPPING_OPTIONS,
  REMOVE_SHIPPING_OPTIONS,
  UPDATE_CHECKOUT_LIVE_OBJECT,
  ABORT_CHECKOUT,
} from './actions/actionTypes';


// Declare initial state
const initialState = {
  categories: [],
  products: [],
  cart: {},
  checkout: {
    shippingOptions: [],
    checkoutTokenObject: {},
  },
  orderReceipt: {},
};

// Create reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload  };
    // Dispatch in App SSR
    // Check if action dispatched is STORE_CATEGORIES and act on that
    case STORE_CATEGORIES:
      return { ...state, categories: action.payload };
    // Dispatch in App SSR
    // Check if action dispatched is STORE_PRODUCTS and act on that
    case STORE_PRODUCTS:
      return { ...state, products: action.payload };
    // Dispatch in Product client-side
    // Check if action dispatched is STORE_CART and act on that
    case RETRIEVE_CART_SUCCESS:
      return { ...state, cart: action.payload };
    // Dispatch in ProductDetail client-side
    // Check if action dispatched is ADD_TO_CART and act on that
    case ADD_TO_CART_SUCCESS:
      return { ...state, cart: action.payload.cart };
    // Dispatch in Cart client-side
    // Check if action dispatched is UPDATE_CART_ITEM and act on that
    case UPDATE_CART_ITEM_SUCCESS:
      return { ...state, cart: action.payload.cart };
    // Dispatch in Cart client-side
    // Check if action dispatched is REMOVE_FROM_CART and act on that
    case REMOVE_FROM_CART_SUCCESS:
      return { ...state, cart: action.payload };
    case GENERATE_CHECKOUT_TOKEN:
      return { ...state, checkout: { ...state.checkout, checkoutTokenObject: action.payload }};
    case GET_SHIPPING_OPTIONS:
      return { ...state, checkout: { ...state.checkout, shippingOptions: action.payload }};
    case REMOVE_SHIPPING_OPTIONS:
      return { ...state, checkout: { ...state.checkout, shippingOptions: [] }};
    case UPDATE_CHECKOUT_LIVE_OBJECT:
      return { ...state, checkout: { ...state.checkout, checkoutTokenObject: { ...state.checkout.checkoutTokenObject, live: action.payload }}};
    case ABORT_CHECKOUT:
      return { ...state, checkout: initialState.checkout };
    case CAPTURE_ORDER_SUCCESS:
      return { ...state, checkout: initialState.checkout, orderReceipt: action.payload };
    default:
      return state;
  }
};

// Enable Redux dev tools
const devtools = (process.browser && window.__REDUX_DEVTOOLS_EXTENSION__)
  ? window.__REDUX_DEVTOOLS_EXTENSION__()
  /* Use the below commented out line if you want to enable tracing action calls, use only in dev mode as it will affect performance
  https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/Features/Trace.md */

  // ? window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true, traceLimit: 25 })
  : f => f;


// Create a makeStore function and pass in reducer to create the store
const makeStore = () => {
  return createStore(
    reducer,
    initialState,
    compose(applyMiddleware(thunk), devtools)
  );
};


const debug = !process.env.NETLIFY;

// Export an assembled wrapper with store's data
export const wrapper = createWrapper(makeStore, { debug });
