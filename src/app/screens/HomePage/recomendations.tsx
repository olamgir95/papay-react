// import { Container, Stack } from "@mui/material";
import React from "react";
import { Container, Stack, Box, Avatar } from "@mui/material";

export default function Recommendations() {
  return (
    <div className="top_article_frame">
      <Container
        maxWidth="lg"
        sx={{ mb: "50px", mt: "60px", position: "relative" }}
      >
        <Stack
          flexDirection={"column"}
          alignItems={"center"}
          mt={"45px"}
          pl={"30px"}
        >
          <Box className="category_title">Tavsiya qilingan maqolalar</Box>
          <Stack className="article_main">
            <Stack className="article_container">
              <Box className="article_category">Ko'p ko'rilgan</Box>
              <Stack className="article_box">
                <Box className="article_img" />
                <Box className="article_info">
                  <Box className="article_main_info">
                    <Box className="article_author">
                      <Avatar alt="Author_photo" src="/auth/user.svg" />
                      <span className="author_name">Jonny</span>
                    </Box>
                    <span className="article_title">
                      Eng qiziqarli va shirin taomlar
                    </span>
                    <p className="article desc"></p>
                  </Box>
                </Box>
              </Stack>
              <Stack className="article_box">
                <Box className="article_img" />

                <Box className="article_info">
                  <Box className="article_main_info">
                    <Box className="article_author">
                      <Avatar alt="Author_photo" src="/auth/user.svg" />
                      <span className="author_name">Jonny</span>
                    </Box>
                    <span className="article_title">
                      Eng qiziqarli va shirin taomlar
                    </span>
                    <p className="article desc"></p>
                  </Box>
                </Box>
              </Stack>
              <Box className="article_category">Ko'p yoqtirilgan</Box>

              <Stack className="article_box">
                <Box className="article_img" />

                <Box className="article_info">
                  <Box className="article_main_info">
                    <Box className="article_author">
                      <Avatar alt="Author_photo" src="/auth/user.svg" />
                      <span className="author_name">Jonny</span>
                    </Box>
                    <span className="article_title">
                      Eng qiziqarli va shirin taomlar
                    </span>
                    <p className="article desc"></p>
                  </Box>
                </Box>
              </Stack>
              <Stack className="article_box">
                <Box className="article_img" />

                <Box className="article_info">
                  <Box className="article_main_info">
                    <Box className="article_author">
                      <Avatar alt="Author_photo" src="/auth/user.svg" />
                      <span className="author_name">Jonny</span>
                    </Box>
                    <span className="article_title">
                      Eng qiziqarli va shirin taomlar
                    </span>
                    <p className="article desc"></p>
                  </Box>
                </Box>
              </Stack>
            </Stack>
            <Stack className="article_container">
              <Box className="article_category">Mashxurlar</Box>
              <Box className="article_news">
                <h1>TWiewer</h1>
                <Box>
                  <img src="/restaurant/mashxur1.png" alt="" />
                </Box>
              </Box>
              <Box className="article_news">
                <h1>TWiewer</h1>
                <Box>
                  <img src="/restaurant/mashxur2.png" alt="" />
                </Box>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
