"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PetsIcon from "@mui/icons-material/Pets";
import EventIcon from "@mui/icons-material/Event";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ReceiptIcon from "@mui/icons-material/Receipt";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmailIcon from "@mui/icons-material/Email";
import GroupIcon from "@mui/icons-material/Group";
import HistoryIcon from "@mui/icons-material/History";
import InsightsIcon from "@mui/icons-material/Insights";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import PaymentsIcon from "@mui/icons-material/Payments";
import HandshakeIcon from "@mui/icons-material/Handshake";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import LogoutIcon from "@mui/icons-material/Logout";
import { NAV_MODULES, hasPermission } from "@/lib/permissions";
import { useColorMode } from "./ThemeRegistry";

const DRAWER_WIDTH = 240;
const COLLAPSED_WIDTH = 64;

const ICONS: Record<string, React.ReactNode> = {
  Insights: <InsightsIcon />,
  Pets: <PetsIcon />,
  Event: <EventIcon />,
  Inventory2: <Inventory2Icon />,
  Receipt: <ReceiptIcon />,
  Notifications: <NotificationsIcon />,
  MedicalServices: <MedicalServicesIcon />,
  Email: <EmailIcon />,
  Group: <GroupIcon />,
  History: <HistoryIcon />,
  Payments: <PaymentsIcon />,
  Handshake: <HandshakeIcon />,
  LocalShipping: <LocalShippingIcon />,
  ShoppingCart: <ShoppingCartIcon />,
};

interface DashboardShellProps {
  permissions: string[];
  firstName: string | null;
  lastName: string | null;
  roleName: string | null;
  children: React.ReactNode;
}

export default function DashboardShell({
  permissions,
  firstName,
  lastName,
  roleName,
  children,
}: DashboardShellProps) {
  const pathname = usePathname();
  const { mode, toggle } = useColorMode();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const user = { permissions };
  const items = NAV_MODULES.filter((m) => hasPermission(user, m.permission));
  const displayName =
    [firstName, lastName].filter(Boolean).join(" ") || "Signed in";

  // mini = icon-only rail (desktop collapsed). Mobile always renders full.
  function navContent(mini: boolean, showCollapse: boolean) {
    return (
      <>
        <Toolbar
          sx={{
            justifyContent: mini ? "center" : "space-between",
            px: mini ? 1 : 2,
          }}
        >
          {!mini && (
            <Box
              component="img"
              src={
                mode === "dark"
                  ? "/dr-zeina-semaan-logo-white.webp"
                  : "/dr-zeina-semaan-logo.webp"
              }
              alt="Dr. Zeina Semaan Vet Clinic"
              sx={{
                height: 32,
                width: "auto",
                maxWidth: 150,
                display: "block",
              }}
            />
          )}
          {showCollapse && (
            <IconButton
              onClick={() => setCollapsed((c) => !c)}
              size="small"
              aria-label={mini ? "expand navigation" : "collapse navigation"}
            >
              {mini ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          )}
        </Toolbar>
        <Box
          sx={{
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <List sx={{ flexGrow: 1 }}>
            {items.map((item) => {
              const selected = pathname.startsWith(item.href);
              return (
                <ListItem
                  key={item.href}
                  disablePadding
                  sx={{ display: "block" }}
                >
                  <Tooltip
                    title={mini ? item.label : ""}
                    placement="right"
                    disableHoverListener={!mini}
                  >
                    <ListItemButton
                      component={Link}
                      href={item.href}
                      selected={selected}
                      onClick={() => setMobileOpen(false)}
                      sx={{
                        justifyContent: mini ? "center" : "flex-start",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: mini ? 0 : 3,
                          justifyContent: "center",
                        }}
                      >
                        {ICONS[item.icon]}
                      </ListItemIcon>
                      {!mini && <ListItemText primary={item.label} />}
                    </ListItemButton>
                  </Tooltip>
                </ListItem>
              );
            })}
          </List>

          <Divider />
          <Box sx={{ p: mini ? 1 : 2 }}>
            {mini ? (
              <Stack spacing={1} sx={{ alignItems: "center" }}>
                <Tooltip
                  title={mode === "light" ? "Dark mode" : "Light mode"}
                  placement="right"
                >
                  <IconButton aria-label="toggle color mode" onClick={toggle}>
                    {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
                  </IconButton>
                </Tooltip>
                <Tooltip title="Sign out" placement="right">
                  <IconButton
                    aria-label="Sign out"
                    onClick={() => signOut({ callbackUrl: "/login" })}
                  >
                    <LogoutIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
            ) : (
              <>
                <Typography variant="body2" noWrap sx={{ fontWeight: 600 }}>
                  {displayName}
                </Typography>
                {roleName && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    noWrap
                    sx={{ display: "block" }}
                  >
                    {roleName}
                  </Typography>
                )}
                <Stack spacing={0.5} sx={{ mt: 1.5 }}>
                  <Button
                    fullWidth
                    variant="text"
                    startIcon={
                      mode === "light" ? <DarkModeIcon /> : <LightModeIcon />
                    }
                    onClick={toggle}
                    sx={{ justifyContent: "center" }}
                  >
                    {mode === "light" ? "Dark mode" : "Light mode"}
                  </Button>
                  <Button
                    fullWidth
                    variant="text"
                    color="inherit"
                    startIcon={<LogoutIcon />}
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    sx={{ justifyContent: "center" }}
                  >
                    Sign out
                  </Button>
                </Stack>
              </>
            )}
          </Box>
        </Box>
      </>
    );
  }

  const desktopWidth = collapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Mobile top bar with hamburger */}
      <AppBar
        position="fixed"
        color="default"
        elevation={1}
        sx={{ display: { md: "none" }, zIndex: (t) => t.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            aria-label="open navigation"
            onClick={() => setMobileOpen(true)}
            sx={{ mr: 1 }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            component="img"
            src={
              mode === "dark"
                ? "/dr-zeina-semaan-logo-white.webp"
                : "/dr-zeina-semaan-logo.webp"
            }
            alt="Dr. Zeina Semaan Veterinary Clinic"
            sx={{ height: 28, width: "auto", maxWidth: 150 }}
          />
        </Toolbar>
      </AppBar>

      {/* Mobile temporary drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
          },
        }}
      >
        {navContent(false, false)}
      </Drawer>

      {/* Desktop permanent (collapsible) drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          width: desktopWidth,
          flexShrink: 0,
          whiteSpace: "nowrap",
          "& .MuiDrawer-paper": {
            width: desktopWidth,
            boxSizing: "border-box",
            overflowX: "hidden",
            transition: (t) =>
              t.transitions.create("width", {
                easing: t.transitions.easing.sharp,
                duration: t.transitions.duration.enteringScreen,
              }),
          },
        }}
      >
        {navContent(collapsed, true)}
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, minWidth: 0 }}>
        {/* Spacer so content clears the fixed mobile AppBar */}
        <Toolbar sx={{ display: { md: "none" } }} />
        {children}
      </Box>
    </Box>
  );
}
