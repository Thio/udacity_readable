import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { Form, FormGroup, FormControl, InputGroup, Grid, Row, Col, Button, Glyphicon } from "react-bootstrap/lib"

import * as postsActions from "actions/postsActions"
import * as commentActions from "actions/commentActions"
import * as commentDs from "util/dataServices/commentDs"

import CommentOverview from "components/commentOverview"
import ControlButtonPostComment from "components/controlButtonPostComment"

class Post extends Component {
  static propTypes = {
    post: PropTypes.array,
    fetchCommentByPostId: PropTypes.func,
    comments: PropTypes.array
  }

  addComment() {
    // TODO Change view to add comment
  }

  componentWillMount() {
    if (this.props.post[0].commentCount > 0) {
      this.props.fetchCommentByPostId(this.props.post[0].id)
    }
  }

  render() {
    const post = this.props.post[0]
    return (
      <div>
        <Grid>
          <Row>
            <Col md={8}>
              {post ?
                <Row>
                  <Row>
                    <Form>
                      <FormGroup bsSize="small">
                        <InputGroup>
                          <InputGroup.Addon>Title</InputGroup.Addon>
                          <FormControl type="text" value={post.title} disabled />
                        </InputGroup>
                        <InputGroup>
                          <InputGroup.Addon>Author</InputGroup.Addon>
                          <FormControl type="text" value={post.author} disabled />
                        </InputGroup>
                        <InputGroup>
                          <InputGroup.Addon>Date</InputGroup.Addon>
                          <FormControl type="text" value={new Date(post.timestamp).toLocaleDateString()} disabled />
                        </InputGroup>
                        <InputGroup>
                          <InputGroup.Addon>Text</InputGroup.Addon>
                          <FormControl type="text" value={post.body} disabled />
                        </InputGroup>
                      </FormGroup>
                    </Form>
                  </Row>
                  <Row>
                    <Col md={8}>
                      {
                        <Row>
                          {
                            this.props.comments.length > 0 ?
                              <Row>
                                <Row>
                                  <Col md={8}>
                                    <h2>Comments</h2>
                                  </Col>
                                  <Col mdOffset={1} md={3}>
                                    <Button bsStyle="success" onClick={this.AddComment}>
                                      <Glyphicon glyph="glyphicon glyphicon-plus" />
                                    </Button>
                                  </Col>
                                </Row>
                                <Row>
                                  {
                                    <CommentOverview postId={post.id} />
                                  }
                                </Row>
                              </Row>
                              : <Row />
                          }
                        </Row>
                      }
                    </Col>
                  </Row>
                </Row>
                : <Row />
              }
            </Col>
            <Col mdOffset={1} md={3}>
              <Row>
                <ControlButtonPostComment id={post.id} />
              </Row>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCommentByPostId: postId => commentDs.fetchCommentByPostId(postId).subscribe(function (data) {
      if (data) {
        dispatch(commentActions.fetchCommentByPostId(data))
      }
    }),
    toggleEditModeOnPost: postId => dispatch(postsActions.toggleEditModeOnPost(postId))
  }
}

function mapStateToProps(state, ownProps) {
  return {
    post: state.posts.filter(post => post.id === ownProps.postId),
    comments: state.comment.filter(comment => comment.parentId === ownProps.postId)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  Post
)
