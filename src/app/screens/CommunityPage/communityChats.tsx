import { Avatar, Box, Stack } from "@mui/material";
import React from "react";
import SendIcon from "@mui/icons-material/Send";

const CommunityChats = () => {
  const [messageList, setMessageList] = React.useState([]);
  return (
    <Stack className="chat_frame">
      <Box className="chat_top">Jonli Muloqot</Box>
      <Stack className="chat_content">
        <span className="chiziq"></span>
        <Box className="chat_main">
          <Box className="chat_main_left">
            <div className="msg_left">Bu yer jonli muloqot</div>
          </Box>
          <Box className="chat_main_right">
            <div className="msg_right">Bu sizning xabaringiz</div>
          </Box>
          <Box className="chat_main_left">
            <Avatar alt="Jonny" src="/comunity/user1.svg" />
            <div className="msg_left">Bu yerda boshqalarni xabari</div>
          </Box>
          <Box className="chat_main_right">
            <div className="msg_right">Bu sizning xabaringiz</div>
          </Box>
          <Box className="chat_main_left">
            <div className="msg_left">Bu yer jonli muloqot</div>
          </Box>
          <Box className="chat_main_right">
            <div className="msg_right">Bu sizning xabaringiz</div>
          </Box>
          <Box className="chat_main_left">
            <Avatar alt="Maksim" src="/comunity/user.png" />
            <div className="msg_left">Bu yerda boshqalarni xabari</div>
          </Box>
        </Box>
      </Stack>
      <Box className="chat_bott">
        <input
          type="text"
          name="message"
          className="msg_input"
          placeholder="Xabar jo'natish"
        />
        <button className="send_msg_btn">
          <SendIcon />
        </button>
      </Box>
    </Stack>
  );
};

export default CommunityChats;
