/*@ts-nocheck */
import {
  Box,
  Button,
  Container,
  Pagination,
  PaginationItem,
  Stack,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, createSelector } from "@reduxjs/toolkit";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import CallIcon from "@mui/icons-material/Call";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Favorite } from "@mui/icons-material";
import { CssVarsProvider } from "@mui/joy/styles";
import { AspectRatio, CardOverflow, IconButton, Link } from "@mui/joy";
import { setTargetRestaurants } from "./slice";
import { Restaurant } from "../../../types/user";
import { useEffect, useRef, useState } from "react";
import RestaurantApiService from "../../apiServices/restaurantApiService";
import { SearchObj } from "../../../types/others";
import { serverApi } from "../../../lib/config";
import { retrieveTargetRestaurants } from "./selector";
import assert from "assert";
import MemberApiService from "../../apiServices/memberApiService";
import { Definer } from "../../../lib/Definer";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";

//redux slice
const actionDispatch = (dispatch: Dispatch) => ({
  setTargetRestaurants: (data: Restaurant[]) =>
    dispatch(setTargetRestaurants(data)),
});

//redux selector
const targetRestaurantsRetriever = createSelector(
  retrieveTargetRestaurants,
  (targetRestaurants) => ({
    targetRestaurants,
  })
);
console.log();
const AllRestaurants = () => {
  const { setTargetRestaurants } = actionDispatch(useDispatch());
  const { targetRestaurants } = useSelector(targetRestaurantsRetriever);
  const refs: any = useRef([]);
  console.log("target", targetRestaurants);

  const [targetSearchObj, setTargetSearchObj] = useState<SearchObj>({
    page: 1,
    limit: 8,
    order: "mb_point",
  });

  useEffect(() => {
    const restaurantService = new RestaurantApiService();
    restaurantService
      .getRestaurants(targetSearchObj)
      .then((data) => setTargetRestaurants(data))
      .catch((err) => console.log(err));
  }, [targetSearchObj]);

  //Handler

  const searchHandler = (category: string) => {
    targetSearchObj.page = 1;
    targetSearchObj.order = category;
    setTargetSearchObj({ ...targetSearchObj });
  };

  const handlePaginationChange = (event: any, value: number) => {
    targetSearchObj.page = value;
    setTargetSearchObj({ ...targetSearchObj });
  };

  const targetLikeHandler = async (e: any, id: string) => {
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
      } else {
        e.target.style.fill = "white";
        refs.current[like_result.like_ref_id].innerHTML--;
        await sweetTopSmallSuccessAlert("success", 700, false);
      }
    } catch (err: any) {
      console.log("targetLikeTop, ERROR", err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <div className="all_restaurant">
      <Container>
        <Stack>
          <Box className="fil_search_box">
            <Box className="fil_box">
              <a onClick={() => searchHandler("mb_point")}>Zo'r</a>
              <a onClick={() => searchHandler("mb_views")}>Mashxur</a>
              <a onClick={() => searchHandler("mb_likes")}>Trenddagi</a>
              <a onClick={() => searchHandler("createdAt")}>Yangi</a>
            </Box>
            <Box className="search_big_box">
              <form action="" className="search_form">
                <input
                  type="serch"
                  className="searchInput"
                  name="resSearch"
                  placeholder="Qidiruv..."
                />
                <Button
                  className="button_search"
                  variant="contained"
                  endIcon={<SearchIcon />}
                >
                  Izlash
                </Button>
              </form>
            </Box>
          </Box>
          <Stack className="all_res_box">
            <CssVarsProvider>
              {targetRestaurants.map((vl: Restaurant) => {
                const image_path = `${serverApi}/${vl.mb_image}`;
                return (
                  <Card
                    key={vl._id}
                    variant="outlined"
                    sx={{
                      minHeight: 410,
                      minWidth: 290,
                      mx: "17px",
                      my: "20px",
                    }}
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
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
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
                        <Favorite
                          onClick={(e: any) => targetLikeHandler(e, vl._id)}
                          style={{
                            fill: vl?.me_liked[0]?.my_favorite
                              ? "red"
                              : "white",
                          }}
                        />
                      </IconButton>
                    </CardOverflow>

                    <Typography level="h2" sx={{ fontSize: "lg", mt: 1 }}>
                      {vl.mb_nick} restaurant
                    </Typography>
                    <Typography level="body-sm" sx={{ mt: 0.5, mb: 2 }}>
                      <Link
                        startDecorator={<LocationOnRoundedIcon />}
                        textColor="neutral.700"
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
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 1.5,
                        py: 1.5,
                        px: "var(--Card-padding)",
                        borderTop: "1px solid",
                        borderColor: "neutral.outlinedBorder",
                        bgcolor: "background.level1",
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
                );
              })}
            </CssVarsProvider>
          </Stack>
          <Stack className="bottom_box">
            <img src="/icons/line_left.svg" alt="" className="line_img" />
            <Pagination
              count={targetSearchObj.page >= 3 ? targetSearchObj.page + 1 : 3}
              page={targetSearchObj.page}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  color="primary"
                />
              )}
              onChange={handlePaginationChange}
            />
            <img src="/icons/line_left.svg" alt="" className="line_two_img" />
          </Stack>
        </Stack>
      </Container>
    </div>
  );
};

export default AllRestaurants;
