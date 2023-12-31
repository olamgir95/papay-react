import React, { FC } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import { MonetizationOn } from "@mui/icons-material";
import { Product } from "../../../types/product";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";

export const BestDishes: FC<{ trendProducts: Product[] }> = ({
  trendProducts,
}) => {
  const history = useHistory();
  console.log("trendproducts", trendProducts);
  const chosenDish = (id: string) => {
    history.push(`/restaurants/dish/${id}`);
  };

  return (
    <div className="best_dishes_frame">
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Box className="category_title">Trenddagi taomlar</Box>
          <Stack mt={"43px"} flexDirection={"row"}>
            {trendProducts.map((product: Product) => {
              const image_path = `${serverApi}/${product?.product_images[0]}`;
              const size_volume =
                product.product_collection === "drink"
                  ? product.product_volume + " L"
                  : product.product_size + " size";
              return (
                <Box key={product._id} className="dishes_box">
                  <Stack
                    className="dishes_img"
                    sx={{
                      backgroundImage: `url(${image_path})`,
                    }}
                  >
                    <div className="dish_sale">{size_volume}</div>
                    <Button
                      className=" view_btn"
                      onClick={() => chosenDish(product._id)}
                    >
                      Batafsil ko'rish
                      <img
                        src="/icons/arrow_right.svg"
                        alt=""
                        style={{ marginLeft: "9px" }}
                      />
                    </Button>
                  </Stack>
                  <Stack className="dish_desc">
                    <span className="dish_title_text">
                      {product.product_name}
                    </span>
                    <span className="dish_desc_text">
                      <MonetizationOn />
                      {product.product_price}
                    </span>
                  </Stack>
                </Box>
              );
            })}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
};
