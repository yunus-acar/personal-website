import React from "react";
import Document, { Head, Html, Main, NextScript } from "next/document";

export default class YunusDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <link
            rel="icon"
            type="image/png"
            href="https://avatars3.githubusercontent.com/u/61521272?s=460&v=4"
          />
          <meta name="theme-color" content="#ffffff" />
          <meta
            name="description"
            content="Yunus Emre Acar,JR. Developer from the TR"
          />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Krona+One&family=Roboto:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script async src="/theme.js" />
        </body>
      </Html>
    );
  }
}
