import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as _ from "lodash";

import { Grid, Row } from "react-bootstrap/lib";

import * as commentActions from "actions/commentActions"
import * as commentDs from "util/dataServices/commentDs"


class SingleComment extends Component {
  static propTypes = {
    comment: PropTypes.array
  };

  componentWillMount() {

  }

  render() {
    const comment = this.props.comment[0];
    return (
        <Grid>
          <Row className="show-grid" >
            <p key={comment.body}>{comment.body}</p>
          </Row>
        </Grid>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

function mapStateToProps(state, ownProps) {

  return {
    comment: state.comment.filter(comment => comment.id === ownProps.id)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  SingleComment
);
