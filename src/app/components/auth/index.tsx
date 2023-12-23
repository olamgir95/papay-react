import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Fab, Stack, TextField } from "@mui/material";
import styled from "styled-components";
import LoginIcon from "@mui/icons-material/Login";
import { AuthenticationModalProps } from "../../../types/user";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { Definer } from "../../../lib/Definer";
import assert from "assert";
import MemberApiService from "./../../apiServices/memberApiService";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 2),
  },
}));

const ModalImg = styled.img`
  width: 62%;
  height: 100%;
  border-radius: 10px;
  background: #000;
  margin-top: 9px;
  margin-left: 10px;
`;

export default function AuthenticationModal(props: AuthenticationModalProps) {
  const { signUpOpen, loginOpen, handleLoginOpen, handleSignUpOpen } = props;
  const classes = useStyles();
  let mb_nick: string = "",
    mb_phone: number = 0,
    mb_password: string = "";

  //handlers//

  const handleUserName = (e: any) => {
    mb_nick = e.target.value;
  };
  const handlePhone = (e: any) => {
    if (e.target) {
      mb_phone = e.target.value;
    }
  };
  const handlePassword = (e: any) => {
    mb_password = e.target.value;
  };

  const handleLoginRequest = async () => {
    try {
      const is_full_filled = mb_nick !== "" && mb_password !== "";

      assert.ok(is_full_filled, Definer.input_err1);

      const login_data = {
        mb_nick: mb_nick,
        mb_password: mb_password,
      };

      const memberApiService = new MemberApiService();
      await memberApiService.loginRequest(login_data);

      handleLoginOpen();
      // window.location.reload();
    } catch (err) {
      console.log(err);
      handleLoginOpen();
      sweetErrorHandling(err).then();
    }
  };

  const handleSignupRequest = async () => {
    try {
      const is_full_filled =
        mb_nick !== "" && mb_password !== "" && mb_phone !== 0;

      assert.ok(is_full_filled, Definer.input_err1);

      const signup_data = {
        mb_nick: mb_nick,
        mb_password: mb_password,
        mb_phone: mb_phone,
      };

      const memberApiService = new MemberApiService();
      await memberApiService.signupRequest(signup_data);

      handleSignUpOpen();
      // window.location.reload();
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <div>
      {/*@ts-ignore*/}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={signUpOpen}
        onClose={handleSignUpOpen}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={signUpOpen}>
          <Stack
            className={classes.paper}
            direction={"row"}
            sx={{ width: "800px" }}
          >
            <ModalImg src={"/auth/password.jpeg"} alt="camera" />
            <Stack sx={{ marginLeft: "69px", alignItems: "center" }}>
              <h2>SignUp Form</h2>
              <TextField
                onChange={(e) => handleUserName(e)}
                sx={{ marginTop: "7px" }}
                id="outlined-basic"
                label="username"
                variant="outlined"
              />
              <TextField
                onChange={(e) => handlePhone(e)}
                sx={{ my: "17px" }}
                id="outlined-basic"
                label="phone number"
                variant="outlined"
              />
              <TextField
                onChange={handlePassword}
                id="outlined-basic"
                label="password"
                variant="outlined"
              />
              <Fab
                onClick={handleSignupRequest}
                sx={{ marginTop: "30px", width: "120px" }}
                variant="extended"
                color="primary"
              >
                <LoginIcon sx={{ mr: 1 }} />
                Signup
              </Fab>
            </Stack>
          </Stack>
        </Fade>
      </Modal>

      {/*@ts-ignore*/}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={loginOpen}
        onClose={handleLoginOpen}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={loginOpen}>
          <Stack
            className={classes.paper}
            direction={"row"}
            sx={{ width: "700px" }}
          >
            <ModalImg src={"/auth/password.jpeg"} alt="camera" />
            <Stack
              sx={{
                marginLeft: "65px",
                marginTop: "25px",
                alignItems: "center",
              }}
            >
              <h2>Login Form</h2>
              <TextField
                onChange={handleUserName}
                id="outlined-basic"
                label="username"
                variant="outlined"
                sx={{ my: "10px" }}
              />
              <TextField
                onChange={handlePassword}
                id="outlined-basic"
                label="password"
                variant="outlined"
              />
              <Fab
                onClick={handleLoginRequest}
                sx={{ marginTop: "27px", width: "120px" }}
                variant="extended"
                color="primary"
              >
                <LoginIcon sx={{ mr: 1 }} />
                Login
              </Fab>
            </Stack>
          </Stack>
        </Fade>
      </Modal>
    </div>
  );
}
