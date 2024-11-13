import * as React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/theme";
import Header from "@/components/Header";
import { ProductContextProvider } from "@/context/product";
import Container from "@mui/material/Container";
import { BasketContextProvider } from "@/context/basket";
import styles from "./global.module.scss";

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={styles.main}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and  simple baseline to build upon. */}
            <CssBaseline />
            {/* TODO using getLayout in case of multiple layouts per page for example 
                when we have different layouts when user is logged in or not logged in
             */}
            <ProductContextProvider>
              <BasketContextProvider>
                <Header />
                <Container maxWidth="xl">{props.children}</Container>
              </BasketContextProvider>
            </ProductContextProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
