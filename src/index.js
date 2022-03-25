import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { save, load } from "redux-localstorage-simple";
import { Provider } from "react-redux";
import { fetchProducts } from "./redux/actions/productActions";
import rootReducer from "./redux/reducers/rootReducer";
import products from "./data/products.json";
import App from "./App";
import "./assets/scss/style.scss";
import "./assets/css/fpcolor.css";
import * as serviceWorker from "./serviceWorker";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { composeWithDevTools } from "redux-devtools-extension";
import PlatformActions from "./services/PlatformActions";
import { isDefined } from "./helpers/utils";

const store = createStore(rootReducer, load(), composeWithDevTools(applyMiddleware(thunk, save())));

store.dispatch(fetchProducts(products));

(async () => {
  const platform = await PlatformActions.find();
  const stripePromise = isDefined(platform) && isDefined(platform.stripePublicKey) ? loadStripe(platform.stripePublicKey) : null;
  
  ReactDOM.render(
    isDefined(stripePromise) ?
        <Elements stripe={ stripePromise }>
          <Provider store={ store }>
            <App platform={ platform }/>
          </Provider>
        </Elements>
      :
        <Provider store={ store }>
          <App platform={ platform }/>
        </Provider>
    , document.getElementById("root")
  );

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
})()
