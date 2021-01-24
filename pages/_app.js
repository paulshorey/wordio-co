import "typeface-quicksand";

import "antd/dist/antd.css";

import "src/shared/styles/variables.scss";
import "src/shared/styles/reset.scss";
import "src/shared/styles/responsive.scss";
import "src/shared/styles/classes.scss";
import "src/shared/styles/layout.scss";
import "src/shared/styles/antd_overrides.scss";
import "src/shared/styles/ui.scss";
import "src/shared/styles/loading.scss";
import "src/shared/styles/ui_components.scss";

import "horizontal_carousel/css/default.css";

import React from "react";
import { Provider } from "react-redux";

import store from "src/shared/redux/store";

// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import "@fortawesome/fontawesome-svg-core/styles.css";
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; /* eslint-disable import/first */

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

// ${(process.env.NODE_ENV==='development' ? 'src' : 'dist')}
