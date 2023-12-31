import React, { FC, useRef } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import CallIcon from "@mui/icons-material/Call";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Favorite } from "@mui/icons-material";
import { CssVarsProvider } from "@mui/joy/styles";
import { AspectRatio, CardOverflow, IconButton, Link } from "@mui/joy";
import { Restaurant } from "../../../types/user";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import MemberApiService from "../../apiServices/memberApiService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";

export const BestRestaurants: FC<{ bestRestaurants: Restaurant[] }> = ({
  bestRestaurants,
}) => {
  const refs: any = useRef([]);
  const history = useHistory();

  const chosenRestaurantHandler = (id: string) => {
    history.push(`/restaurants/${id}`);
  };
  const getRestaurantsHandler = () => history.push(`/restaurants`);

  const targetLikeBest = async (e: any, id: string) => {
    try {
      assert.ok(localStorage.getItem("member_data"), Definer.auth_err1);
      const memberService = new MemberApiService(),
        like_result: any = await memberService.memberLikeTarget({
          like_ref_id: id,
          group_type: "member",
        });
      assert.ok(like_result, Definer.general_err1);
      if (like_result.like_status > 0) {
        e.target.style.fill = "red";
        refs.current[like_result.like_ref_id].innerHTML++;
        await sweetTopSmallSuccessAlert("success", 700, false);
      } else {
        e.target.style.fill = "white";
        refs.current[like_result.like_ref_id].innerHTML--;
      }
    } catch (err: any) {
      console.log("targetLikeTop, ERROR", err);
      sweetErrorHandling(err).then();
    }
  };
  return (
    <div className="best_restaurant_frame">
      <img className="best_corner_res" src={"/icons/line_left.svg"} alt="" />
      <Container sx={{ paddingTop: "153px" }}>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Box className="category_title">Zo'r Restaurantlar</Box>

          <Stack sx={{ mt: "43px", flexDirection: "row", gap: "20px" }}>
            {bestRestaurants.map((vl: Restaurant) => {
              const image_path = `${serverApi}/${vl.mb_image}`;
              return (
                <CssVarsProvider key={vl._id}>
                  <Card
                    variant="outlined"
                    sx={{
                      maxHeight: 483,
                      minWidth: 300,
                      cursor: "pointer",
                    }}
                    onClick={() => chosenRestaurantHandler(vl._id)}
                  >
                    <CardOverflow>
                      <AspectRatio ratio="1">
                        <img src={image_path} alt="" />
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
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <Favorite
                          style={{
                            fill: vl?.me_liked[0]?.my_favorite
                              ? "red"
                              : "white",
                          }}
                          onClick={(e) => targetLikeBest(e, vl._id)}
                        />
                      </IconButton>
                    </CardOverflow>
                    <Typography level="h2" sx={{ fontSize: "md", mt: 0 }}>
                      {vl.mb_nick}
                    </Typography>
                    <Typography level="body-sm">
                      <Link
                        href="#"
                        textColor="neutral.700"
                        startDecorator={<LocationOnRoundedIcon />}
                      >
                        {vl.mb_address}
                      </Link>
                    </Typography>
                    <Typography level="body-sm">
                      <Link
                        href="#"
                        textColor="neutral.700"
                        startDecorator={<CallIcon />}
                      >
                        {vl.mb_phone}
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
                        {vl.mb_views}
                        <VisibilityIcon
                          sx={{ fontSize: 20, marginLeft: "5px" }}
                        />
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
                        <div
                          ref={(element) => (refs.current[vl._id] = element)}
                        >
                          {vl.mb_likes}
                        </div>
                        <Favorite sx={{ fontSize: 20, marginLeft: "5px" }} />
                      </Typography>
                    </CardOverflow>
                  </Card>
                </CssVarsProvider>
              );
            })}
          </Stack>
          <Stack
            sx={{ mt: "16px" }}
            flexDirection={"row"}
            justifyContent={"flex-end"}
            width={"90%"}
            className="btn_all"
          >
            <Button
              variant="contained"
              sx={{
                background: "#1976d2",
                color: "#FFFFF",
              }}
              onClick={getRestaurantsHandler}
            >
              Barchasini ko'rish
            </Button>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
};
