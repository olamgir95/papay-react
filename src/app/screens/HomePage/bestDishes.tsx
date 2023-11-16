import React from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import { MonetizationOn } from "@mui/icons-material";

export default function BestDishes() {
  return (
    <div className="best_dishes_frame">
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Box className="category_title">Trenddagi taomlar</Box>
          <Stack mt={"43px"} flexDirection={"row"}>
            <Box className="dishes_box">
              <Stack className="dishes_img">
                <div className="dish_sale">normal size</div>
                <Button className=" view_btn">
                  Batafsil ko'rish
                  <img
                    src="/icons/arrow_right.svg"
                    alt=""
                    style={{ marginLeft: "9px" }}
                  />
                </Button>
              </Stack>
              <Stack className="dish_desc">
                <span className="dish_title_text">Chicken Mayo</span>
                <span className="dish_desc_text">
                  <MonetizationOn />
                  11
                </span>
              </Stack>
            </Box>
            <Box className="dishes_box">
              <Stack className="dishes_img">
                <div className="dish_sale">normal size</div>
                <Button className=" view_btn">
                  Batafsil ko'rish
                  <img
                    src="/icons/arrow_right.svg"
                    alt=""
                    style={{ marginLeft: "9px" }}
                  />
                </Button>
              </Stack>
              <Stack className="dish_desc">
                <span className="dish_title_text">Chicken Mayo</span>
                <span className="dish_desc_text">
                  <MonetizationOn />
                  11
                </span>
              </Stack>
            </Box>
            <Box className="dishes_box">
              <Stack className="dishes_img">
                <div className="dish_sale">normal size</div>
                <Button className=" view_btn">
                  Batafsil ko'rish
                  <img
                    src="/icons/arrow_right.svg"
                    alt=""
                    style={{ marginLeft: "9px" }}
                  />
                </Button>
              </Stack>
              <Stack className="dish_desc">
                <span className="dish_title_text">Chicken Mayo</span>
                <span className="dish_desc_text">
                  <MonetizationOn />
                  11
                </span>
              </Stack>
            </Box>
            <Box className="dishes_box">
              <Stack className="dishes_img">
                <div className="dish_sale">normal size</div>
                <Button className=" view_btn">
                  Batafsil ko'rish
                  <img
                    src="/icons/arrow_right.svg"
                    alt=""
                    style={{ marginLeft: "9px" }}
                  />
                </Button>
              </Stack>
              <Stack className="dish_desc">
                <span className="dish_title_text">Chicken Mayo</span>
                <span className="dish_desc_text">
                  <MonetizationOn />
                  11
                </span>
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
