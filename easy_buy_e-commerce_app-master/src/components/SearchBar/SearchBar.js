import React, { useState, useEffect } from "react";
import { Grid, TextField } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { commerce } from "../../lib/commerce";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import useStyles from "./Styles";

function SearchBar({ onAddToCart }) {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchProducts, setSearchProducts] = useState([]);

  const fetchSearchProducts = async () => {
    const { data } = await commerce.products.list();
    setSearchProducts(data);
  };

  useEffect(() => {
    fetchSearchProducts();
  }, []);

  //   console.log(`searchTerm is ${searchTerm}`);
  //   console.log(searchProducts);
  return (
    <>
      <br />
      <Grid container justify="center">
        <TextField
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          label="Search Fashion Items"
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <br />
      {searchProducts
        .filter((values) => {
          if (searchTerm == "") {
            return null;
          } else if (
            values.name.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            return values;
          }
        })
        .map((val, key) => {
          return (
            <main>
              <Grid container justify="center" spacing={4}>
                <Grid item key={val.id} xs={12} sm={6} md={4} lg={3}>
                  <Card>
                    <CardMedia
                      className={classes.media}
                      image={val.media.source}
                      title={val.name}
                    />
                    <CardContent>
                      <div>
                        <Typography variant="h5" gutterBottom>
                          {val.name}
                        </Typography>
                        <Typography variant="h5">
                          {val.price.formatted_with_symbol}
                        </Typography>
                      </div>
                      <Typography
                        dangerouslySetInnerHTML={{
                          __html: val.description,
                        }}
                        variant="body2"
                        color="textSecondary"
                      />
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton
                        aria-label="Add to Cart"
                        onClick={() => {
                          onAddToCart(val.id, 1);
                        }}
                      >
                        <AddShoppingCart />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              </Grid>

              <br />
              <br />
              <br />
              <br />
            </main>

            // <div key={key}>
            //     <p>{val.name}</p>
            //     <p>{val.price.formatted_with_symbol}</p>
            // </div>
          );
        })}
    </>
  );
}

export default SearchBar;
