import React from "react";
import dynamic from "next/dynamic";
import App from "../src/shared/components/App";
import Footer from "../src/shared/components/Footer";
const HOST = process.env.NEXT_PUBLIC_HOST;
const Domains = dynamic(() => import("../src/domains/containers/Home"));
const Word = dynamic(() => import("../src/shared/containers/Word"));

class Home extends React.Component {
  /*
   * Render correct page
   */
  render() {
    if (HOST === "wordio.co") {
      return (
        <App meta_title={"Thesaurus"}>
          <Word />
        </App>
      );
    } else {
      return (
        <App meta_title={"Domain suggestions"}>
          <Domains />
          <Footer />
        </App>
      );
    }
  }
}

export default Home;

// export const getServerSideProps = async () => {
//   return { redirect: { destination: `/${HOST === "wordio.co" ? "word" : "domains"}`, permanent: false } };
// };
// export const getServerSideProps = async (context) => {
//   context.res.writeHead(302, { Location: `/${HOST === "wordio.co" ? "word" : "domains"}` });
//   context.res.end();
//   return {};
// };
