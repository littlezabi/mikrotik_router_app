import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { AccountPreview } from "@toolpad/core/Account";
import Dashboard from "./Dashboard";
import ProtectedRoute from "../../components/ProtectedRoute";

const NAVIGATION = [
    {
        kind: "header",
        title: "Main pages",
    },
    {
        segment: "dashboard",
        title: "Dashboard",
        icon: <DashboardIcon />,
    },
    {
        segment: "orders",
        title: "Orders",
        icon: <ShoppingCartIcon />,
    },
];

const demoTheme = createTheme({
    cssVariables: {
        colorSchemeSelector: "data-toolpad-color-scheme",
    },
    colorSchemes: { light: true, dark: true },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});

function DemoPageContent({ pathname }) {
    return (
        <Box
            sx={{
                py: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
            }}
        >
            <Typography>Dashboard content for {pathname}</Typography>
        </Box>
    );
}

DemoPageContent.propTypes = {
    pathname: PropTypes.string.isRequired,
};

function AccountSidebarPreview(props) {
    const { handleClick, open, mini } = props;
    return (
        <Stack direction="column" p={0}>
            <Divider />
            <AccountPreview
                variant={mini ? "condensed" : "expanded"}
                handleClick={handleClick}
                open={open}
            />
        </Stack>
    );
}

AccountSidebarPreview.propTypes = {
    /**
     * The handler used when the preview is expanded
     */
    handleClick: PropTypes.func,
    mini: PropTypes.bool.isRequired,
    /**
     * The state of the Account popover
     * @default false
     */
    open: PropTypes.bool,
};

// const accounts = [
//     {
//         id: 1,
//         name: "Bharat Kashyap",
//         email: "bharatkashyap@outlook.com",
//         image: "https://avatars.githubusercontent.com/u/19550456",
//         projects: [
//             {
//                 id: 3,
//                 title: "Project X",
//             },
//         ],
//     },
//     {
//         id: 2,
//         name: "Bharat MUI",
//         email: "bharat@mui.com",
//         color: "#8B4513", // Brown color
//         projects: [{ id: 4, title: "Project A" }],
//     },
// ];

// function SidebarFooterAccountPopover() {
//     return (
//         <Stack direction="column">
//             <Typography variant="body2" mx={2} mt={1}>
//                 Accounts
//             </Typography>
//             <MenuList>
//                 {accounts.map((account) => (
//                     <MenuItem
//                         key={account.id}
//                         component="button"
//                         sx={{
//                             justifyContent: "flex-start",
//                             width: "100%",
//                             columnGap: 2,
//                         }}
//                     >
//                         <ListItemIcon>
//                             <Avatar
//                                 sx={{
//                                     width: 32,
//                                     height: 32,
//                                     fontSize: "0.95rem",
//                                     bgcolor: account.color,
//                                 }}
//                                 src={account.image ?? ""}
//                                 alt={account.name ?? ""}
//                             >
//                                 {account.name[0]}
//                             </Avatar>
//                         </ListItemIcon>
//                         <ListItemText
//                             sx={{
//                                 display: "flex",
//                                 flexDirection: "column",
//                                 alignItems: "flex-start",
//                                 width: "100%",
//                             }}
//                             primary={account.name}
//                             secondary={account.email}
//                             primaryTypographyProps={{ variant: "body2" }}
//                             secondaryTypographyProps={{ variant: "caption" }}
//                         />
//                     </MenuItem>
//                 ))}
//             </MenuList>
//             <Divider />
//             <AccountPopoverFooter>
//                 <SignOutButton />
//             </AccountPopoverFooter>
//         </Stack>
//     );
// }

const demoSession = {
    user: {
        name: "Bharat Kashyap",
        email: "bharatkashyap@outlook.com",
        image: "https://avatars.githubusercontent.com/u/19550456",
    },
};

function Layout(props) {
    const { window } = props;
    const [pathname, setPathname] = React.useState("/dashboard");

    const router = React.useMemo(() => {
        return {
            pathname,
            searchParams: new URLSearchParams(),
            navigate: (path) => setPathname(String(path)),
        };
    }, [pathname]);

    const demoWindow = window !== undefined ? window() : undefined;

    const [session, setSession] = React.useState(demoSession);
    const authentication = React.useMemo(() => {
        return {
            signIn: () => {
                setSession(demoSession);
            },
            signOut: () => {
                setSession(null);
            },
        };
    }, []);

    return (
        <AppProvider
            navigation={NAVIGATION}
            router={router}
            theme={demoTheme}
            window={demoWindow}
            authentication={authentication}
            session={session}
        >
            <DashboardLayout>
                {pathname === "/dashboard" ? (
                    <Dashboard />
                ) : pathname === "/orders" ? (
                    <h1>{pathname}</h1>
                ) : (
                    ""
                )}
            </DashboardLayout>
        </AppProvider>
    );
}

Layout.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * Remove this when copying and pasting into your project.
     */
    window: PropTypes.func,
};

export default Layout;
