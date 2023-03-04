import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLoginDetails } from "../../redux/reducers/userSlice";
const settings = ["Profile", "Account", "My Orders", "Logout"];

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoggedIn, username } = useSelector((state) => state.user);
    console.log(username)
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = (e) => {
        debugger;
        if (e.target.textContent == "Logout") {
            dispatch(setLoginDetails(''));
            navigate("/")
        }

        setAnchorElUser(null);
    };

    return (
        <div className="logout">
            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title={isLoggedIn ? "Open settings" : "Login"}>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        {isLoggedIn ? (
                            <>
                                <i><AccountCircleIcon /></i> {username}
                            </>

                        ) : (
                            <i><LoginIcon onClick={() => navigate("/login")} /></i>
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
    );
};
export default Logout;
