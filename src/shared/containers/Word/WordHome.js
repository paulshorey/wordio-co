import React from "react";
import Search from "src/shared/components/Search";
import { StyledHome } from "./WordHome.styled";
import ApiExplorer from "src/wordio/components/ApiExplorer";

export default function (props) {
  /*
   * User "container" state/props/methods!
   * This "child" component is to simplify container's render() logic.
   */
  let that = props.that;
  return (
    <StyledHome>
      <Search
        {...that.props}
        className={"Search Word Home"}
        domains={false}
        title="Find another word for..."
        placeholder="..."
        home={true}
        cue={[
          <div key="1" className="color-subtle">
            Get <span className="color-white">synonyms</span>, <span className="color-white">root word</span>,{" "}
            <span className="color-white">parts of speech</span>, <span className="color-white">plurals</span>,{" "}
            <span className="color-white">abbreviations</span>, etc.
          </div>
          // <div key="2" style={{ marginTop: "0.25rem" }}>
          //   <Link href="/docs">API</Link> for AI and semantic search. <FA icon={faBolt} className="color-accent" />{" "}
          //   Powers our{" "}
          //   <a href="https://besta.domains" target="_blank">
          //     domain name generator
          //   </a>
          //   . {/*<span key="3" className="nowrap">*/}
          //   {/*  Built by{" "}*/}
          //   {/*  <a href="https://paulshorey.com" target="_blank" className="nowrap">*/}
          //   {/*    Paul Shorey*/}
          //   {/*  </a>*/}
          //   {/*  &nbsp;*/}
          //   {/*</span>*/}
          // </div>
        ]}
      />

      <div className="about_text">
        <p className="content full">
          Thesaurus ☝️ Sentiment analysis built in. Made for better search results and human-machine interaction.
        </p>
      </div>

      <ApiExplorer />
    </StyledHome>
  );
}
