import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Box, Checkbox, Link, Stack } from "@mui/material";
import React, { useRef } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { BoArticle } from "../../../types/boArticle";
import { serverApi } from "../../../lib/config";
import dayjs from "dayjs";
import assert from "assert";
import MemberApiService from "../../apiServices/memberApiService";
import { Definer } from "../../../lib/Definer";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import { verifyMemberData } from "../../apiServices/verify";

const TargetArticles = (props: any) => {
  const { setArticlesRebuild } = props;
  const refs: any = useRef([]);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const targetLikeHandler = async (e: any) => {
    try {
      assert.ok(verifyMemberData, Definer.auth_err1);
      const memberService = new MemberApiService();
      const id = e.target.id,
        like_result: any = await memberService.memberLikeTarget({
          like_ref_id: id,
          group_type: "community",
        });
      assert.ok(like_result, Definer.general_err1);
      await sweetTopSmallSuccessAlert("success", 700, false);
      setArticlesRebuild(new Date());
    } catch (err: any) {
      console.log("targetLikeTop, ERROR", err);
      sweetErrorHandling(err).then();
    }
  };
  return (
    <Stack>
      {props.targetBoArticles?.map((article: BoArticle) => {
        const image = article?.art_image
          ? `${serverApi}/${article?.art_image}`
          : "/community/default.svg";
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
                    onClick={targetLikeHandler}
                    checked={
                      article?.me_liked && article?.me_liked[0]?.my_favorite
                        ? true
                        : false
                    }
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
