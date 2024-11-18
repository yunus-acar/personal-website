import React from "react";
import Document, { Head, Html, Main, NextScript } from "next/document";
import { data } from "@/utils/constant";

export default class AppDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <link rel="icon" type="image/png" href={data.favicon} />
          <meta name="theme-color" content="#ffffff" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Krona+One&family=Roboto:wght@400;700&display=swap"
            rel="stylesheet"
          />
          <meta name="description" content={data.about} />
          <meta name="author" content={data.fullName} />
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
