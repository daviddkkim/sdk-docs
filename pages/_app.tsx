import {
  darkTheme,
  orangeTheme,
  indigoTheme,
  grassTheme,
  goldTheme,
  globalCss
} from "../stitches.config";
import { AppProps } from "next/app";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";
import { NextPage } from "next/types";

const globalStyles = globalCss({
  html: {
    overflow: "hidden",
  },

  body: {
    margin: 0,
    backgroundColor: "$mauve1",
  },

  "body, button": {
    fontFamily: "$untitled",
  },

  svg: { display: "block" },


  "pre, code": { margin: 0, fontFamily: "$mono" },

  "::selection": {
    backgroundColor: "$violet5",
  },

  /* Typography */
  "h1, h2, h3, h4, h5, h6": {
    marginBottom: '1rem',
    fontWeight: 'bold',
    lineHeight: '1'
  },
  h1: {
    fontSize: '$7'

  },

  h2: {
    fontSize: '$6'
  },

  h3: {
    fontSize: '$5'
  },

  p: {
    lineHeight: '1.5rem',
    fontSize: '$4'
  }

});


type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  globalStyles();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const getLayout = Component.getLayout ?? ((page) => page);

  if (!mounted) {
    return (
      <div style={{ visibility: "hidden" }}>
        {getLayout(<Component {...pageProps} />)}
      </div>
    );
  }

  return (
    <ThemeProvider
      disableTransitionOnChange
      attribute="class"
      value={{
        light: "light-theme",
        dark: darkTheme.className,
        orange: orangeTheme.className,
        gold: goldTheme.className,
        grass: grassTheme.className,
        indigo: indigoTheme.className,
      }}
      defaultTheme="light"
    >

      {getLayout(<Component {...pageProps} />)}

    </ThemeProvider>
  );
}
export default MyApp;