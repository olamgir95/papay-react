import { Box, Container, Stack, Tab } from "@mui/material";
import React, { useEffect, useState } from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import FinishedOrders from "./FinishedOrders";
import PauseOrders from "./PauseOrders";
import ProcessOrders from "./processOrders";
import Marginer from "../../components/marginer";
import { setFinishedOrders, setPausedOrders, setProcessOrders } from "./slice";
import { Dispatch, createSelector } from "@reduxjs/toolkit";
import {
  retrieveProcessOrders,
  retrievePausedOrders,
  retrieveFinishedOrders,
} from "./selector";
import { Order } from "../../../types/order";
import { useDispatch, useSelector } from "react-redux";
import OrderApiService from "../../apiServices/orderApiService";
import { verifyMemberData } from "../../apiServices/verify";

//redux slice
const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
});

//redux selector
export const targetOrdersRetriever = createSelector(
  retrieveProcessOrders,
  retrievePausedOrders,
  retrieveFinishedOrders,
  (processOrders, pausedOrders, finishedOrders) => ({
    processOrders,
    pausedOrders,
    finishedOrders,
  })
);

export function OrdersPage(props: any) {
  const { setProcessOrders, setPausedOrders, setFinishedOrders } =
    actionDispatch(useDispatch());

  const [value, setValue] = useState("1");

  useEffect(() => {
    const orderService = new OrderApiService();
    orderService
      .getMyOrders("paused")
      .then((data) => setPausedOrders(data))
      .catch((err) => console.log(err));
    orderService
      .getMyOrders("process")
      .then((data) => setProcessOrders(data))
      .catch((err) => console.log(err));
    orderService
      .getMyOrders("finished")
      .then((data) => setFinishedOrders(data))
      .catch((err) => console.log(err));
  }, [props.orderRebuild]);

  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="order_page">
      <Container className="order_container" maxWidth="lg">
        <Stack className="order_left">
          <TabContext value={value}>
            <Box className="order_nav_frame">
              <Box className="order_table">
                <TabList
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  className={"order_nav"}
                >
                  <Tab label="Buyurtmalarim" value={"1"} />
                  <Tab label="Jarayon" value={"2"} />
                  <Tab label="Yakunlangan" value={"3"} />
                </TabList>
              </Box>
            </Box>
            <Stack className="order_main_content">
              <PauseOrders setOrderRebuild={props.setOrderRebuild} />
              <ProcessOrders setOrderRebuild={props.setOrderRebuild} />
              <FinishedOrders setOrderRebuild={props.setOrderRebuild} />
            </Stack>
          </TabContext>
        </Stack>
        <Stack className="order_right">
          <Box className="order_info_box">
            <Box className="info_box_item">
              <div className="order_user_img">
                <img
                  src={
                    props.verifyMemberData?.mb_image
                      ? props.verifyMemberData?.mb_image
                      : "/auth/default_user.svg"
                  }
                  alt=""
                />
                <img className="svg" src="/restaurant/user_per.png" alt="" />
              </div>
              <div className="order_user_info">
                <span className="name">{verifyMemberData?.mb_nick}</span>
                <span className="user_prof">
                  {verifyMemberData?.mb_type
                    ? verifyMemberData.mb_type
                    : "User"}
                </span>
              </div>
            </Box>
            <Marginer bg="#A1A1A1" width="333" height="2" />
            <Box className="location">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 3C8.13 3 5 6.13 5 10C5 15.25 12 21 12 21C12 21 19 15.25 19 10C19 6.13 15.87 3 12 3ZM12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                  fill="#2E3A59"
                />
              </svg>
              {verifyMemberData?.mb_address
                ? verifyMemberData?.mb_address
                : "Address not entered."}
            </Box>
          </Box>
          <Stack className="pay_container">
            <Box className="order_pay">
              <Box className="card_number">
                Card number : 5243 4090 2002 7495
              </Box>
              <Box className="card_date">07 / 24</Box>
              <Box className="card_date">CVV : 010</Box>
              <Box className="card_name">Ismoilov Akmaljon</Box>
            </Box>
            <Box className="pay_brands">
              <img src="restaurant/weste.png" alt="" />
              <img src="restaurant/master.png" alt="" />
              <img src="restaurant/Paypal.png" alt="" />
              <img src="restaurant/west.png" alt="" />
              <div>
                <svg
                  width="39"
                  height="26"
                  viewBox="0 0 39 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.66734 0H36.6673C36.8907 0.00429082 37.111 0.052605 37.3157 0.14209C37.5203 0.231575 37.7054 0.360445 37.8602 0.521484C38.015 0.682523 38.1365 0.87252 38.2179 1.08057C38.2992 1.28861 38.3388 1.51055 38.3343 1.73389V23.4082C38.3388 23.6315 38.2992 23.8535 38.2179 24.0615C38.1365 24.2696 38.015 24.4596 37.8602 24.6206C37.7054 24.7816 37.5203 24.9105 37.3157 25C37.111 25.0895 36.8907 25.1378 36.6673 25.1421H1.66734C1.44399 25.1378 1.2237 25.0895 1.01902 25C0.814343 24.9105 0.629285 24.7816 0.474468 24.6206C0.319651 24.4596 0.198034 24.2696 0.11668 24.0615C0.0353258 23.8535 -0.00416209 23.6315 0.000346857 23.4082V1.73389C-0.00416209 1.51055 0.0353258 1.28861 0.11668 1.08057C0.198034 0.87252 0.319651 0.682523 0.474468 0.521484C0.629285 0.360445 0.814343 0.231575 1.01902 0.14209C1.2237 0.052605 1.44399 0.00429082 1.66734 0Z"
                    fill="url(#paint0_linear_1293_1876)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_1293_1876"
                      x1="19.1673"
                      y1="25.1421"
                      x2="19.1673"
                      y2="0"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#E59703" />
                      <stop offset="0.231" stop-color="#E59703" />
                      <stop offset="0.234" stop-color="white" />
                      <stop offset="0.761" stop-color="white" />
                      <stop offset="0.766" stop-color="#5457BB" />
                      <stop offset="1" stop-color="#5457BB" />
                    </linearGradient>
                  </defs>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="10"
                  viewBox="0 0 25 10"
                  fill="none"
                >
                  <path
                    d="M22.9724 9.22607L22.7205 7.93115H19.9865L19.5375 9.22607H17.2954L20.5024 1.16113C20.577 0.961142 20.7137 0.790114 20.8923 0.67334C21.071 0.556566 21.2824 0.500246 21.4955 0.512207H23.2245L24.9464 9.22705L22.9724 9.22607ZM21.7365 2.88184L20.6064 6.14307H22.3724L21.7365 2.88184ZM14.4495 2.99609C14.4495 3.94809 17.4495 4.15182 17.4495 6.34082C17.4495 8.44882 15.2345 9.22412 13.7675 9.22412C12.9337 9.23791 12.1063 9.07564 11.3395 8.74805L11.6594 6.85791C12.5394 7.57791 15.2085 7.78314 15.2085 6.64014C15.2085 5.49714 12.2335 5.46995 12.2335 3.29395C12.2335 0.981945 14.7675 0.505859 15.8335 0.505859C16.4938 0.522787 17.1469 0.646918 17.7675 0.873047L17.4604 2.68213C16.5424 2.17013 14.4475 2.048 14.4475 3L14.4495 2.99609ZM7.86548 9.22607L9.20947 0.510742H11.3605L10.0165 9.22607H7.86548ZM2.7085 9.22607L0.842407 1.66406C1.17206 1.86996 1.48657 2.09925 1.78345 2.3501C2.68046 3.11768 3.36298 4.10458 3.7644 5.21484L4.00745 6.50586L6.05847 0.512207H8.37341L4.95142 9.22705L2.7085 9.22607ZM0.714478 1.58008C0.647811 1.53874 0.581071 1.49894 0.514404 1.46094C0.578404 1.50494 0.644402 1.54296 0.712402 1.58496L0.714478 1.58008ZM0.200439 1.29004C0.142439 1.26004 0.0825127 1.2282 0.0255127 1.2002C0.0805126 1.2332 0.139486 1.26492 0.198486 1.29492L0.200439 1.29004Z"
                    fill="#494CA3"
                  />
                </svg>
              </div>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
