import { client } from "@client/graphql/client";
import { AppContextWrapper } from "@client/state/global";
import { MantineProvider } from "@mantine/core";
import { SparkProvider } from "@spark/provider";
import { ThemeProvider } from "next-themes";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import { Provider as UrqlProvider } from "urql";

import PageWithLayoutType from "@client/layouts/pageWithLayout";
import "@client/styles/global.css";

type AppLayoutProps = {
  Component: PageWithLayoutType;
  pageProps: any;
};

function CustomApp({ Component, pageProps }: AppLayoutProps) {
  const Layout =
    Component.layout ||
    (({ children }: JSX.ElementChildrenAttribute) => <>{children}</>);

  return (
    <SparkProvider>
      <ThemeProvider forcedTheme="dark" attribute="class">
        <UrqlProvider value={client}>
          <Head>
            <title>Sparking up StarkNet</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
            />
          </Head>
          <AppContextWrapper>
            <MantineProvider
              withNormalizeCSS
              theme={{
                colorScheme: "dark",
              }}
            >
              <Layout>
                <Component {...pageProps} />
                <Toaster />
              </Layout>
            </MantineProvider>
          </AppContextWrapper>
        </UrqlProvider>
      </ThemeProvider>
    </SparkProvider>
  );
}

export default CustomApp;
