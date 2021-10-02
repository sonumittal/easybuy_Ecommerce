import React from "react";
import { Grid, TextField } from "@material-ui/core";
import Product from "./Product/Product";
import SearchBar from '../../SearchBar/SearchBar'
function Products({ allProducts, onAddToCart }) {
  return (
    <>
      <div style={{ background: "#e5e5e5" }}>
        <br />
        <SearchBar onAddToCart={onAddToCart}/>
        <main>
          <Grid container justify="center" spacing={4}>
            {allProducts.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                <Product product={product} onAddToCart={onAddToCart} />
              </Grid>
            ))}
          </Grid>

          <br />
          <br />
          <br />
          <br />
        </main>
      </div>
    </>
  );
}

export default Products;
