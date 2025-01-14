import { useState, useCallback } from "react";
import {
    IconButton,
    InputBase,
    Typography,
    Select,
    MenuItem,
    FormControl,
    useTheme,
    useMediaQuery
} from "@mui/material";
import {
    Search,
    Message,
    DarkMode,
    LightMode,
    Notifications,
    Help,
    Menu,
    Close
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../../state";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import FlexBetween from "../../components/flexBetween";

export default function Navbar() {
    const [isMobileMenuToggle, setIsMobileMenuToggle] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();

    const toggleColorMode = useCallback(() => {
        dispatch(setMode(theme.palette.mode === "dark" ? "light" : "dark"));
    }, [dispatch, theme.palette.mode]);

    // Use a memoized selector to prevent unnecessary rerenders
    const user = useSelector(
        (state) => state.user,
        (prev, next) => prev?.firstName === next?.firstName && prev?.lastName === next?.lastName
    );

    const fullName = useMemo(() => `${user?.firstName || "Guest"} ${user?.lastName || ""}`, [user]);

    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    const neutralLight = theme.palette.neutral?.light;
    const dark = theme.palette.neutral?.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;

    return (
        <FlexBetween padding="1rem 6%" backgroundColor={alt} boxShadow={1}>
            {/* Logo and Search */}
            <FlexBetween gap="1.75rem">
                <Typography
                    fontWeight="bold"
                    fontSize="clamp(1rem, 2rem, 2.25rem)"
                    color="primary"
                    onClick={() => navigate("/home")}
                    sx={{ "&:hover": { color: primaryLight, cursor: "pointer" } }}
                >
                    Twitter Clone
                </Typography>
                {isNonMobileScreens && (
                    <FlexBetween backgroundColor={neutralLight} borderRadius="9px" gap="3rem" padding="0.1rem 1.5rem">
                        <InputBase placeholder="Search..." />
                        <IconButton>
                            <Search />
                        </IconButton>
                    </FlexBetween>
                )}
            </FlexBetween>

            {/* Desktop & Mobile Nav */}
            {isNonMobileScreens ? (
                <FlexBetween gap="2rem">
                    <IconButton onClick={toggleColorMode}>
                        {theme.palette.mode === "dark" ? (
                            <DarkMode sx={{ fontSize: "25px" }} />
                        ) : (
                            <LightMode sx={{ color: theme.palette.grey[800], fontSize: "25px" }} />
                        )}
                    </IconButton>
                    <Message sx={{ fontSize: "25px" }} />
                    <Notifications sx={{ fontSize: "25px" }} />
                    <Help sx={{ fontSize: "25px" }} />
                    <FormControl variant="standard">
                        <Select
                            value={fullName}
                            sx={{
                                backgroundColor: neutralLight,
                                width: "150px",
                                borderRadius: "0.25rem",
                                padding: "0.25rem 1rem",
                                "& .MuiSvgIcon-root": { pr: "0.25rem", width: "3rem" },
                                "& .MuiSelect-select:focus": { backgroundColor: neutralLight },
                            }}
                            input={<InputBase />}
                        >
                            <MenuItem value={fullName}>
                                <Typography>{fullName}</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => dispatch(setLogout())}>Logout</MenuItem>
                        </Select>
                    </FormControl>
                </FlexBetween>
            ) : (
                <IconButton onClick={() => setIsMobileMenuToggle(!isMobileMenuToggle)}>
                    <Menu />
                </IconButton>
            )}

            {/* Mobile Menu */}
            {isMobileMenuToggle && (
                <FlexBetween
                    flexDirection="column"
                    position="absolute"
                    top="0"
                    left="0"
                    width="100%"
                    height="100%"
                    backgroundColor={background}
                    zIndex="1000"
                    padding="1rem"
                >
                    <IconButton onClick={() => setIsMobileMenuToggle(false)} sx={{ alignSelf: "flex-end" }}>
                        <Close />
                    </IconButton>
                    <FlexBetween flexDirection="column" gap="2rem">
                        <IconButton onClick={toggleColorMode}>
                            {theme.palette.mode === "dark" ? (
                                <DarkMode sx={{ fontSize: "25px" }} />
                            ) : (
                                <LightMode sx={{ color: theme.palette.grey[800], fontSize: "25px" }} />
                            )}
                        </IconButton>
                        <Message sx={{ fontSize: "25px" }} />
                        <Notifications sx={{ fontSize: "25px" }} />
                        <Help sx={{ fontSize: "25px" }} />
                        <FormControl variant="standard">
                            <Select
                                value={fullName}
                                sx={{
                                    backgroundColor: neutralLight,
                                    width: "150px",
                                    borderRadius: "0.25rem",
                                    padding: "0.25rem 1rem",
                                    "& .MuiSvgIcon-root": { pr: "0.25rem", width: "3rem" },
                                    "& .MuiSelect-select:focus": { backgroundColor: neutralLight },
                                }}
                                input={<InputBase />}
                            >
                                <MenuItem value={fullName}>
                                    <Typography>{fullName}</Typography>
                                </MenuItem>
                                <MenuItem onClick={() => dispatch(setLogout())}>Logout</MenuItem>
                            </Select>
                        </FormControl>
                    </FlexBetween>
                </FlexBetween>
            )}
        </FlexBetween>
    );
}