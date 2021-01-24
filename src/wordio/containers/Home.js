import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as ui_actions from "src/shared/redux/actions/ui";
import api_actions from "src/shared/redux/actions/api";
import * as io_actions from "src/shared/redux/actions/io";
import WordHome from "src/wordio/containers/WordHome";

class Word extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    props.ui_actions.RX__search_title("Thesaurus Search:");
  }

  componentDidMount() {
    /*
     * Get word
     */
    this.props.io_actions.RX__search_thesaurus();
    this.props.io_actions.RX__set_inputs({ tld: "" });
  }

  async componentDidUpdate(prevProps) {
    /*
     * Get word
     */
    if (this.props.search_now && this.props.search_now !== prevProps.search_now) {
      this.props.io_actions.RX__search_thesaurus();
    }
  }

  render() {
    return <WordHome that={this} />;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    ui_actions: bindActionCreators(ui_actions, dispatch),
    api_actions: bindActionCreators(api_actions, dispatch),
    io_actions: bindActionCreators(io_actions, dispatch)
  };
};

const mapStateToProps = function (state) {
  return {
    word_input: state.input.str,
    word_chunks: state.output.chunks,
    search_now: state.input.search_now
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Word);
