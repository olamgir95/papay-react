import {
  Box,
  Button,
  Container,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import { Member } from "../../../types/user";
import Basket from "./basket";
import { CartItem } from "../../../types/others";
import { verifyMemberData } from "../../apiServices/verify";

export default function NavbarOthers({
  handleLoginOpen,
  handleLogOutClick,
  handleCloseLogOut,
  handleLogoutRequest,
  anchorEl,
  open,
  cartItems,
  onAdd,
  onRemove,
  onDelete,
  onDeleteAll,
  setOrderRebuild,
}: {
  handleLoginOpen: () => void;
  handleLogOutClick: any;
  handleCloseLogOut: any;
  anchorEl: null | HTMLElement;
  handleLogoutRequest: any;
  open: boolean;
  cartItems: CartItem[];
  onAdd: any;
  onRemove: any;
  onDelete: any;
  onDeleteAll: any;
  setOrderRebuild: any;
}): JSX.Element {
  return (
    <div className="format_others home_navbar">
      <Container>
        <Stack
          flexDirection={"row"}
          className="navbar_config"
          justifyContent={"space-between"}
        >
          <Box>
            <img src="/icons/papayText.svg" alt="" />
          </Box>
          <Stack
            flexDirection={"row"}
            justifyContent={"space-evenly"}
            alignItems={"center"}
            className="navbar_links"
          >
            <Box className="hover-line">
              <NavLink to="/">Home</NavLink>
            </Box>
            <Box className="hover-line">
              <NavLink to="/restaurants" activeClassName="underline">
                Restaurant
              </NavLink>
            </Box>
            {verifyMemberData ? (
              <Box className="hover-line">
                <NavLink to="/orders" activeClassName="underline">
                  Order
                </NavLink>
              </Box>
            ) : null}
            <Box className="hover-line">
              <NavLink to="/community" activeClassName="underline">
                Community
              </NavLink>
            </Box>
            {verifyMemberData ? (
              <Box className="hover-line">
                <NavLink to="/member-page" activeClassName="underline">
                  My page
                </NavLink>
              </Box>
            ) : null}
            <Box className="hover-line">
              <NavLink to="/help" activeClassName="underline">
                Help
              </NavLink>
            </Box>
            <Basket
              cartItems={cartItems}
              onAdd={onAdd}
              onRemove={onRemove}
              onDelete={onDelete}
              onDeleteAll={onDeleteAll}
              setOrderRebuild={setOrderRebuild}
            />
            {verifyMemberData ? (
              <img
                src={verifyMemberData.mb_image}
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
                alt="#"
                onClick={handleLogOutClick}
              />
            ) : (
              <Box>
                <Button
                  variant="contained"
                  sx={{ background: "#1976d2", color: "#FFFFF" }}
                  onClick={handleLoginOpen}
                >
                  Login
                </Button>
              </Box>
            )}
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleCloseLogOut}
              onClick={handleCloseLogOut}
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem
                sx={{ cursor: "pointer" }}
                onClick={handleLogoutRequest}
              >
                <ListItemIcon>
                  <Logout fontSize="small" color="primary" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
