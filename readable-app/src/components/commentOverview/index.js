import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { Grid, Row } from "react-bootstrap/lib"

import * as commentActions from "actions/commentActions"
import * as commentDs from "util/dataServices/commentDs"

import Comment from "components/comment"

class commentOverview extends Component {
  static propTypes = {
    comments: PropTypes.array,
    post: PropTypes.object,
    fetchCommentByPostId: PropTypes.func
  }

  componentWillMount() {
    if (this.props.comments.length <= 0 && this.props.post) {
      this.props.fetchCommentByPostId(this.props.post[0].id)
    }
  }

  render() {
    const comments = this.props.comments
    return (
      <Grid>
        <Row className="show-grid">
            {
              comments.map(comment =>
                <Comment key={comment.id} comment={comment}/>
              )
            }
        </Row>
      </Grid>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCommentByPostId: postId => commentDs.fetchCommentByPostId(postId).subscribe(function (data) {
      dispatch(commentActions.fetchCommentByPostId(data))
    })
  }
}

function mapStateToProps(state, ownProps) {
  return {
    comments: state.comment.filter(comment => comment.parentId === ownProps.postId)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(commentOverview)
