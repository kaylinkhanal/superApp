import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetLoginDetails } from "../../redux/reducers/userSlice";
const settings = ["Profile", "Account", "My Orders", "Logout"];

const LogoutMenu = () => {
    const { isLoggedIn, username } = useSelector((state) => state.user);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleCloseUserMenu = (e) => {
        // debugger;
        if (e.target.textContent == "Logout") {
            dispatch(resetLoginDetails());
            navigate("/user-role")
        }

        setAnchorElUser(null);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    return (
        <div className="menu">
            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title={isLoggedIn ? "Open settings" : "Login"}>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        {isLoggedIn ? (
                            <p>
                                <AccountCircleOutlinedIcon /> <span>{username}</span>
                            </p>
                        ) : (
                            <LoginIcon
                                onClick={() =>
                                    navigate("/login")
                                }
                            />
                        )}
                    </IconButton>
                </Tooltip>
                <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    open={isLoggedIn ? Boolean(anchorElUser) : false}
                    onClose={handleCloseUserMenu}
                >
                    {settings.map((setting) => (
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                            <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
        </div>
    )
}

export default LogoutMenu