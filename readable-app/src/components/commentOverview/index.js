import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as _ from "lodash";

import { Grid, Row } from "react-bootstrap/lib";

import * as commentActions from "actions/commentActions"
import * as commentDs from "util/dataServices/commentDs"

import Comment from "components/comment"


class commentOverview extends Component {
  static propTypes = {
    comment: PropTypes.array
  };

  componentWillMount() {
    if(this.props.comments.length <= 0){
      this.props.fetchCommentByPostId(this.props.post[0].id);
    }
  }

  render() {
    return (
        <Grid>
          <Row className="show-grid" >
            {
              this.props.comments.map((comment) => (
                <Comment key={comment.id} id={comment.id} />
              ))
            }
          </Row>
        </Grid>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCommentByPostId: (postId) => commentDs.fetchCommentByPostId(postId).subscribe(function (data) {
      dispatch(commentActions.fetchCommentByPostId(data));
    }),
  }
}

function mapStateToProps(state, ownProps) {
  return {
    comments: state.comment.filter(comment => comment.parentId === ownProps.postId)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  commentOverview
);
