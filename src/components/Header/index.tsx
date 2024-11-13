"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import { useTheme } from "@mui/material";
import { useBasket } from "@/context/basket";
import styles from "./index.module.scss";
import Link from "next/link";
// TODO move all the css in a seperate file

const pages = [
  {
    name: "Products",
    link: "/products",
  },
  {
    name: "Blogs",
    link: "/",
  },
];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const theme = useTheme();
  const { basketCount } = useBasket();
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page, ind) => (
                <MenuItem
                  key={`${page.name}-${ind}`}
                  onClick={handleCloseNavMenu}
                  sx={{
                    color: `${theme.palette.text.primary}`,
                  }}
                >
                  <Link href={page.link}>
                    <Typography
                      sx={{
                        textAlign: "center",
                      }}
                    >
                      {page.name}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link href={page.link} key={page.name}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    display: "block",
                    color: `${theme.palette.text.primary}`,
                  }}
                >
                  {page.name}
                </Button>
              </Link>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Link href="/basket" className={styles.basketButton}>
              <IconButton size="large">
                <ShoppingBagRoundedIcon />
              </IconButton>
              <span>{basketCount}</span>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
