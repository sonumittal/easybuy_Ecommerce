import React, { useState, useEffect } from "react";
import {
  NavBar,
  Footer,
  HomePage,
  Products,
  AboutUs,
  Contact,
  Cart,
  SignUp,
  LogIn,
  Checkout,
} from "./components";
import { commerce } from "./lib/commerce";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  const [allProducts, setAllProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [name, setName] = useState("");
  
  const fetchAllProducts = async () => {
    const { data } = await commerce.products.list();

    setAllProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);
  };
  const handleUpdateCartQty = async (lineItemId, quantity) => {
    const response = await commerce.cart.update(lineItemId, { quantity });

    setCart(response.cart);
  };

  const handleRemoveFromCart = async (lineItemId) => {
    const response = await commerce.cart.remove(lineItemId);

    setCart(response.cart);
  };

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();

    setCart(response.cart);
  };

  useEffect(() => {
    fetchAllProducts();
    fetchCart();
  },[]);

  console.log(cart);
  console.log(allProducts);
  return (
    <>
      <Router>
        <NavBar totalItems={cart.total_items} name={name} setName={setName} />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/fashion">
            <Products allProducts={allProducts} onAddToCart={handleAddToCart} />
          </Route>
          <Route exact path="/aboutUs">
            <AboutUs />
          </Route>
          <Route exact path="/contact">
            <Contact />
          </Route>
          <Route exact path="/cart">
            <Cart
              cart={cart}
              onUpdateCartQty={handleUpdateCartQty}
              onRemoveFromCart={handleRemoveFromCart}
              onEmptyCart={handleEmptyCart}
            />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/login">
            <LogIn setName={setName} />
          </Route>
          <Route exact path="/checkout">
            <Checkout onEmptyCart={handleEmptyCart} />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
