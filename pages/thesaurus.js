import React from "react";
import App from "src/shared/components/App";
import Word from "src/shared/containers/Word";
// import Footer from "src/shared/components/Footer"

class RootIndex extends React.Component {
  render() {
    return (
      <App meta_title={"Thesaurus"}>
        <Word />
      </App>
    );
  }
}

export default RootIndex;
