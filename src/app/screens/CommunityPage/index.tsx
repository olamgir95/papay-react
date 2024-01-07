import {
  Box,
  Container,
  Stack,
  Tab,
  Pagination,
  PaginationItem,
} from "@mui/material";
import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CommunityChats from "./communityChats";
import { TabPanel } from "@mui/lab";
import TargetArticles from "./targetArticles";
import CommunityApiService from "../../apiServices/communityApiService";
import { BoArticle, SearchArticlesObj } from "../../../types/boArticle";
import { retrieveTargetBoArticles } from "./selector";
import { Dispatch, createSelector } from "@reduxjs/toolkit";
import { setTargetBoArticles } from "./slice";
import { useDispatch, useSelector } from "react-redux";

//redux slice
const actionDispatch = (dispatch: Dispatch) => ({
  setTargetBoArticles: (data: BoArticle[]) =>
    dispatch(setTargetBoArticles(data)),
});

//redux selector
const CommunitysRetriever = createSelector(
  retrieveTargetBoArticles,
  (targetBoArticles) => ({
    targetBoArticles,
  })
);

export function CommunityPage(props: any) {
  const { setTargetBoArticles } = actionDispatch(useDispatch());

  const { targetBoArticles } = useSelector(CommunitysRetriever);
  // Initializations
  const [value, setValue] = useState("1");
  const [searchArticleObj, setSearchArticleObj] = useState<SearchArticlesObj>({
    bo_id: "all",
    page: 1,
    limit: 5,
  });

  const [articlesRebuild, setArticlesRebuild] = useState<Date>(new Date());

  useEffect(() => {
    const communityService = new CommunityApiService();
    communityService
      .getTargetArticles(searchArticleObj)
      .then((data) => setTargetBoArticles(data))
      .catch((err) => console.log(err));
  }, [searchArticleObj, articlesRebuild]);

  // Handler
  const handleChange = (event: SyntheticEvent, newValue: string) => {
    searchArticleObj.page = 1;
    switch (newValue) {
      case "1":
        searchArticleObj.bo_id = "all";
        break;
      case "2":
        searchArticleObj.bo_id = "celebrity";
        break;
      case "3":
        searchArticleObj.bo_id = "evaluation";
        break;
      case "4":
        searchArticleObj.bo_id = "story";
        break;
    }
    setSearchArticleObj({ ...searchArticleObj });

    setValue(newValue);
  };

  const handlePagination = (event: ChangeEvent<unknown>, page: number) => {
    searchArticleObj.page = page;
    setSearchArticleObj({ ...searchArticleObj });
  };

  return (
    <div className="community_page">
      <div className="community_frame">
        <Container className="community_container">
          <Stack className="community_stack">
            <CommunityChats />
            <Stack className="community_all_frame" inputMode={"text"}>
              <TabContext value={value}>
                <Box className="article_tabs">
                  <Box className="community_table">
                    <TabList
                      onChange={handleChange}
                      aria-label="basic tabs example"
                    >
                      <Tab label="Barcha Maqolalar" value={"1"} />
                      <Tab label="Mashxurlar" value={"2"} />
                      <Tab label="Oshxonaga baho" value={"3"} />
                      <Tab label="Hikoyalar" value={"4"} />
                    </TabList>
                  </Box>
                </Box>
                <Stack className="article_main">
                  <TabPanel value="1">
                    <TargetArticles
                      targetBoArticles={targetBoArticles}
                      setArticlesRebuild={setArticlesRebuild}
                    />
                  </TabPanel>
                  <TabPanel value="2">
                    <TargetArticles
                      targetBoArticles={targetBoArticles}
                      setArticlesRebuild={setArticlesRebuild}
                    />
                  </TabPanel>
                  <TabPanel value="3">
                    <TargetArticles
                      targetBoArticles={targetBoArticles}
                      setArticlesRebuild={setArticlesRebuild}
                    />
                  </TabPanel>
                  <TabPanel value="4">
                    <TargetArticles
                      targetBoArticles={targetBoArticles}
                      setArticlesRebuild={setArticlesRebuild}
                    />
                  </TabPanel>
                </Stack>
                <Box className="article_bott">
                  <Pagination
                    count={
                      searchArticleObj.page >= 3 ? searchArticleObj.page + 1 : 3
                    }
                    page={searchArticleObj.page}
                    renderItem={(item) => (
                      <PaginationItem
                        components={{
                          previous: ArrowBackIcon,
                          next: ArrowForwardIcon,
                        }}
                        {...item}
                        color="secondary"
                      />
                    )}
                    onChange={handlePagination}
                  />
                </Box>
              </TabContext>
            </Stack>
          </Stack>
        </Container>
      </div>
    </div>
  );
}
