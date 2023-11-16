import React from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import CallIcon from "@mui/icons-material/Call";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Favorite } from "@mui/icons-material";
import { CssVarsProvider } from "@mui/joy/styles";
import { AspectRatio, CardOverflow, IconButton, Link } from "@mui/joy";

export default function BestRestaurants() {
  return (
    <div className="best_restaurant_frame">
      <img className="best_corner_res" src={"/icons/best_res.svg"} alt="" />
      <Container sx={{ paddingTop: "153px" }}>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Box className="category_title">Zo'r Restaurantlar</Box>

          <Stack sx={{ mt: "43px", flexDirection: "row" }}>
            <CssVarsProvider>
              <Card
                variant="outlined"
                sx={{
                  maxHeight: 483,
                  minWidth: 320,
                  mr: "35px",
                  cursor: "pointer",
                }}
              >
                <CardOverflow>
                  <AspectRatio ratio="1">
                    <img src="/restaurant/zor_res.png" alt="" />
                  </AspectRatio>
                  <IconButton
                    aria-label="Like ninimal photography"
                    size="md"
                    variant="solid"
                    color="neutral"
                    sx={{
                      position: "absolute",
                      zIndex: 2,
                      borderRadius: "50%",
                      right: "1rem",
                      bottom: 0,
                      transform: "translateY(50%)",
                      color: "rgba(0,0,0,0.4)",
                    }}
                  >
                    <Favorite style={{ fill: "white" }} />
                  </IconButton>
                </CardOverflow>
                <Typography level="h2" sx={{ fontSize: "md", mt: 0 }}>
                  Texas De Brazil
                </Typography>
                <Typography level="body-sm">
                  <Link
                    href="#"
                    textColor="neutral.700"
                    startDecorator={<LocationOnRoundedIcon />}
                  >
                    Tashkent, Yunus Abad 4-1
                  </Link>
                </Typography>
                <Typography level="body-sm">
                  <Link
                    href="#"
                    textColor="neutral.700"
                    startDecorator={<CallIcon />}
                  >
                    +82-(1)04 042-5681
                  </Link>
                </Typography>
                <CardOverflow
                  variant="soft"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 1.5,
                    py: 1.5,
                    px: "var(--Card-padding)",
                    borderTop: "1px solid",
                    borderColor: "neutral.outlinedBorder",
                    bgcolor: "Background.level1",
                  }}
                >
                  <Typography
                    level="body-lg"
                    sx={{
                      fontWeight: "md",
                      color: "text.secondary",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    100
                    <VisibilityIcon sx={{ fontSize: 20, marginLeft: "5px" }} />
                  </Typography>
                  <Box sx={{ width: 2, bgcolor: "divider" }} />
                  <Typography
                    level="body-lg"
                    sx={{
                      fontWeight: "md",
                      color: "text.secondary",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <div>50</div>{" "}
                    <Favorite sx={{ fontSize: 20, marginLeft: "5px" }} />
                  </Typography>
                </CardOverflow>
              </Card>
              <Card
                variant="outlined"
                sx={{
                  maxHeight: 483,
                  minWidth: 320,
                  mr: "35px",
                  cursor: "pointer",
                }}
              >
                <CardOverflow>
                  <AspectRatio ratio="1">
                    <img src="/restaurant/zor_res.png" alt="" />
                  </AspectRatio>
                  <IconButton
                    aria-label="Like ninimal photography"
                    size="md"
                    variant="solid"
                    color="neutral"
                    sx={{
                      position: "absolute",
                      zIndex: 2,
                      borderRadius: "50%",
                      right: "1rem",
                      bottom: 0,
                      transform: "translateY(50%)",
                      color: "rgba(0,0,0,0.4)",
                    }}
                  >
                    <Favorite style={{ fill: "white" }} />
                  </IconButton>
                </CardOverflow>
                <Typography level="h2" sx={{ fontSize: "md", mt: 0 }}>
                  Texas De Brazil
                </Typography>
                <Typography level="body-sm">
                  <Link
                    href="#"
                    textColor="neutral.700"
                    startDecorator={<LocationOnRoundedIcon />}
                  >
                    Tashkent, Yunus Abad 4-1
                  </Link>
                </Typography>
                <Typography level="body-sm">
                  <Link
                    href="#"
                    textColor="neutral.700"
                    startDecorator={<CallIcon />}
                  >
                    +82-(1)04 042-5681
                  </Link>
                </Typography>
                <CardOverflow
                  variant="soft"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 1.5,
                    py: 1.5,
                    px: "var(--Card-padding)",
                    borderTop: "1px solid",
                    borderColor: "neutral.outlinedBorder",
                    bgcolor: "Background.level1",
                  }}
                >
                  <Typography
                    level="body-lg"
                    sx={{
                      fontWeight: "md",
                      color: "text.secondary",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    100
                    <VisibilityIcon sx={{ fontSize: 20, marginLeft: "5px" }} />
                  </Typography>
                  <Box sx={{ width: 2, bgcolor: "divider" }} />
                  <Typography
                    level="body-lg"
                    sx={{
                      fontWeight: "md",
                      color: "text.secondary",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <div>50</div>{" "}
                    <Favorite sx={{ fontSize: 20, marginLeft: "5px" }} />
                  </Typography>
                </CardOverflow>
              </Card>
              <Card
                variant="outlined"
                sx={{
                  maxHeight: 483,
                  minWidth: 320,
                  mr: "35px",
                  cursor: "pointer",
                }}
              >
                <CardOverflow>
                  <AspectRatio ratio="1">
                    <img src="/restaurant/zor_res.png" alt="" />
                  </AspectRatio>
                  <IconButton
                    aria-label="Like ninimal photography"
                    size="md"
                    variant="solid"
                    color="neutral"
                    sx={{
                      position: "absolute",
                      zIndex: 2,
                      borderRadius: "50%",
                      right: "1rem",
                      bottom: 0,
                      transform: "translateY(50%)",
                      color: "rgba(0,0,0,0.4)",
                    }}
                  >
                    <Favorite style={{ fill: "white" }} />
                  </IconButton>
                </CardOverflow>
                <Typography level="h2" sx={{ fontSize: "md", mt: 0 }}>
                  Texas De Brazil
                </Typography>
                <Typography level="body-sm">
                  <Link
                    href="#"
                    textColor="neutral.700"
                    startDecorator={<LocationOnRoundedIcon />}
                  >
                    Tashkent, Yunus Abad 4-1
                  </Link>
                </Typography>
                <Typography level="body-sm">
                  <Link
                    href="#"
                    textColor="neutral.700"
                    startDecorator={<CallIcon />}
                  >
                    +82-(1)04 042-5681
                  </Link>
                </Typography>
                <CardOverflow
                  variant="soft"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 1.5,
                    py: 1.5,
                    px: "var(--Card-padding)",
                    borderTop: "1px solid",
                    borderColor: "neutral.outlinedBorder",
                    bgcolor: "Background.level1",
                  }}
                >
                  <Typography
                    level="body-lg"
                    sx={{
                      fontWeight: "md",
                      color: "text.secondary",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    100
                    <VisibilityIcon sx={{ fontSize: 20, marginLeft: "5px" }} />
                  </Typography>
                  <Box sx={{ width: 2, bgcolor: "divider" }} />
                  <Typography
                    level="body-lg"
                    sx={{
                      fontWeight: "md",
                      color: "text.secondary",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <div>50</div>{" "}
                    <Favorite sx={{ fontSize: 20, marginLeft: "5px" }} />
                  </Typography>
                </CardOverflow>
              </Card>
              <Card
                variant="outlined"
                sx={{
                  maxHeight: 483,
                  minWidth: 320,
                  mr: "35px",
                  cursor: "pointer",
                }}
              >
                <CardOverflow>
                  <AspectRatio ratio="1">
                    <img src="/restaurant/zor_res.png" alt="" />
                  </AspectRatio>
                  <IconButton
                    aria-label="Like ninimal photography"
                    size="md"
                    variant="solid"
                    color="neutral"
                    sx={{
                      position: "absolute",
                      zIndex: 2,
                      borderRadius: "50%",
                      right: "1rem",
                      bottom: 0,
                      transform: "translateY(50%)",
                      color: "rgba(0,0,0,0.4)",
                    }}
                  >
                    <Favorite style={{ fill: "white" }} />
                  </IconButton>
                </CardOverflow>
                <Typography level="h2" sx={{ fontSize: "md", mt: 0 }}>
                  Texas De Brazil
                </Typography>
                <Typography level="body-sm">
                  <Link
                    href="#"
                    textColor="neutral.700"
                    startDecorator={<LocationOnRoundedIcon />}
                  >
                    Tashkent, Yunus Abad 4-1
                  </Link>
                </Typography>
                <Typography level="body-sm">
                  <Link
                    href="#"
                    textColor="neutral.700"
                    startDecorator={<CallIcon />}
                  >
                    +82-(1)04 042-5681
                  </Link>
                </Typography>
                <CardOverflow
                  variant="soft"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 1.5,
                    py: 1.5,
                    px: "var(--Card-padding)",
                    borderTop: "1px solid",
                    borderColor: "neutral.outlinedBorder",
                    bgcolor: "Background.level1",
                  }}
                >
                  <Typography
                    level="body-lg"
                    sx={{
                      fontWeight: "md",
                      color: "text.secondary",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    100
                    <VisibilityIcon sx={{ fontSize: 20, marginLeft: "5px" }} />
                  </Typography>
                  <Box sx={{ width: 2, bgcolor: "divider" }} />
                  <Typography
                    level="body-lg"
                    sx={{
                      fontWeight: "md",
                      color: "text.secondary",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <div>50</div>{" "}
                    <Favorite sx={{ fontSize: 20, marginLeft: "5px" }} />
                  </Typography>
                </CardOverflow>
              </Card>
            </CssVarsProvider>
          </Stack>
          <Stack
            sx={{ mt: "16px" }}
            flexDirection={"row"}
            justifyContent={"flex-end"}
            width={"100%"}
          >
            <Button
              variant="contained"
              sx={{
                background: "#1976d2",
                color: "#FFFFF",
              }}
            >
              Hammasini ko'rish
            </Button>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
