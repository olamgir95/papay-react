import {
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function NavbarHome(props: any) {
  const [count, setCount] = useState(0);
  return (
    <div className="format home_navbar">
      <Container>
        <Stack
          flexDirection={"row"}
          className="navbar_config"
          justifyContent={"space-between"}
        >
          <Box>
            <img src="/icons/papayText.svg" alt="" />
          </Box>
          <Stack
            flexDirection={"row"}
            justifyContent={"space-evenly"}
            alignItems={"center"}
            className="navbar_links"
          >
            <Box className="hover-line" onClick={props.setPath}>
              <NavLink to="/" activeClassName="underline">
                Home
              </NavLink>
            </Box>
            <Box className="hover-line" onClick={props.setPath}>
              <NavLink to="/restaurant" activeClassName="underline">
                Restaurant
              </NavLink>
            </Box>
            <Box className="hover-line" onClick={props.setPath}>
              <NavLink to="/orders" activeClassName="underline">
                Orders
              </NavLink>
            </Box>
            <Box className="hover-line" onClick={props.setPath}>
              <NavLink to="/community" activeClassName="underline">
                Community
              </NavLink>
            </Box>
            <Box className="hover-line" onClick={props.setPath}>
              <NavLink to="/help" activeClassName="underline">
                Help
              </NavLink>
            </Box>
            <Box>
              <IconButton
                aria-label="hover-line"
                id="basic-button"
                aria-controls={undefined}
                aria-haspopup="true"
                aria-expanded={undefined}
              >
                <Badge color="secondary" badgeContent={5}>
                  <img src="/icons/shopping_cart.svg" alt="" />
                </Badge>
              </IconButton>
            </Box>
            <Box>
              <Button
                variant="contained"
                sx={{ background: "#1976d2", color: "#FFFFF" }}
              >
                Login
              </Button>
            </Box>
          </Stack>
        </Stack>
        <Stack className="head_information">
          <Stack justifyContent={"column"} sx={{ mt: "86px", ml: "24px" }}>
            <Box>
              <img src="/icons/welcome.svg" alt="" />
            </Box>
            <Box className="define_restaurant">
              The Authentic Restaurant & Cafe
            </Box>
            <Box className="timeline_service">
              {count} soat xizmatingizdamiz.
            </Box>
            <Box sx={{ mt: "90px" }}>
              <Button
                variant="contained"
                sx={{
                  width: "210px,",
                  height: "60px",
                  background: "#1976d2",
                  color: "#FFFFF",
                }}
                onClick={() => setCount(count + 1)}
              >
                RO’YHATDAN O’TISH
              </Button>
            </Box>
          </Stack>
          <Stack flexDirection={"column"}>
            <Box className="halal_logo"></Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
