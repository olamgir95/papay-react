import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Box, Checkbox, Link, Stack } from "@mui/material";
import React from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { BoArticle } from "../../../types/boArticle";
import { serverApi } from "../../../lib/config";
import dayjs from "dayjs";

const TargetArticles = (props: any) => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  return (
    <Stack>
      {props.targetBoArticles?.map((article: BoArticle) => {
        const image = article?.art_image
          ? `${serverApi}/${article?.art_image}`
          : "/community/user.png";
        const formattedDate = dayjs(article?.createdAt).format(
          "YYYY-MM-DD HH:mm"
        );

        return (
          <Link className="all_article_box" href={``} key={article._id}>
            <Box className="all_article_img">
              <img src={image} alt="" />
            </Box>
            <Box className="all_article_container">
              <Box className="user_prof">
                <img src="restaurant/user_per.png" alt="" />
                <span>{article?.member_data?.mb_nick}</span>
              </Box>
              <Box className="evaluation">
                <span>{article?.bo_id}</span>
                <p>{article?.art_subject}</p>
              </Box>
              <Box className="views">
                <p>{formattedDate}</p>
                <p className="evaluation_text">
                  <Checkbox
                    {...label}
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite style={{ fill: "red" }} />}
                    id={article?._id}
                    checked={false}
                  />
                  <span>{article?.art_likes}</span>
                </p>
                <Box className="eye">
                  <RemoveRedEyeIcon />
                  <span>{article?.art_views}</span>
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
