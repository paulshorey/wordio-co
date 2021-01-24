import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";
const HOST = process.env.NEXT_PUBLIC_HOST;

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />)
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta httpEquiv="x-dns-prefetch-control" content="on" />
          <meta property="og:title" content="Best domain name suggestions" />
          <meta
            property="og:description"
            content="Find the best available domain name. Our AI analyzes 2000 TLDs, and 10000000 synonyms, then generates 100s of available domain names."
          />
          <meta property="og:image" content="/gfx/square/avatar-og.png" />
          {HOST === "wordio.co" ? (
            <>
              <link rel="apple-touch-icon" sizes="180x180" href="/logo/favicon_w/apple-touch-icon.png" />
              <link rel="icon" type="image/png" sizes="32x32" href="/logo/favicon_w/favicon-32x32.png" />
              <link rel="icon" type="image/png" sizes="16x16" href="/logo/favicon_w/favicon-16x16.png" />
            </>
          ) : (
            <>
              <link rel="apple-touch-icon" sizes="180x180" href="/logo/favicon_d/apple-touch-icon.png" />
              <link rel="icon" type="image/png" sizes="32x32" href="/logo/favicon_d/favicon-32x32.png" />
              <link rel="icon" type="image/png" sizes="16x16" href="/logo/favicon_d/favicon-16x16.png" />
            </>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />

          <div className="sk-cube-grid">
            <div className="sk-cube sk-cube1" />
            <div className="sk-cube sk-cube2" />
            <div className="sk-cube sk-cube3" />
            <div className="sk-cube sk-cube4" />
            <div className="sk-cube sk-cube5" />
            <div className="sk-cube sk-cube6" />
            <div className="sk-cube sk-cube7" />
            <div className="sk-cube sk-cube8" />
            <div className="sk-cube sk-cube9" />
          </div>

          <form
            id="Domain101Form"
            style={{ display: "none" }}
            method="post"
            action="https://www.101domain.com/affiliate/bestadomains.htm"
            target="_blank"
          >
            <b className="color-light">Search 101Domain.com: </b>
            <input type="text" name="root" required id="Domain101Input" />
            <input type="hidden" name="action" value="search" />
            <input type="hidden" name="tld" value=".app" />
            <button type="submit">Search</button>
          </form>
          {/*<script src="/scripts/domainsMatter/TextToSVG.js" />*/}
          {/*<script src="/scripts/domainsMatter/index.js" />*/}
          <script src="/scripts/onLoad.js" data-host={HOST} />
          <script src="https://www.google.com/recaptcha/api.js?render=6LfSN-MUAAAAAOxMUojSlBxkicjSeX1YLW8ds8C1" />
          <div className="elfsight-app-bcf06b3b-b3f9-47c0-a7f0-11e2e4a2418f" />
          <script src="https://apps.elfsight.com/p/platform.js" />
        </body>
      </Html>
    );
  }
}
