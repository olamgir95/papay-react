import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Box, Checkbox, Link, Stack } from "@mui/material";
import React from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const TargetArticles = (props: any) => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  return (
    <Stack>
      {props.targetBoArticles?.map((article: any, index: number) => {
        const image = "/community/user.png";
        return (
          <Link className="all_article_box" href={``}>
            <Box className="all_article_img">
              <img src={image} alt="" />
            </Box>
            <Box className="all_article_container">
              <Box className="user_prof">
                <img src="restaurant/user_per.png" alt="" />
                <span>Jonny</span>
              </Box>
              <Box className="evaluation">
                <span>evaluation</span>
                <p>Rayhon zo'r restaurant</p>
              </Box>
              <Box className="views">
                <p>20-10-16 01:42</p>
                <p className="evaluation_text">
                  <Checkbox
                    {...label}
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite style={{ fill: "red" }} />}
                  />
                  <span>1</span>
                </p>
                <Box className="eye">
                  <RemoveRedEyeIcon />
                  <span>2</span>
                </Box>
              </Box>
            </Box>
          </Link>
        );
      })}
    </Stack>
  );
};

export default TargetArticles;
