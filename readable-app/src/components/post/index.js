import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { Form, FormGroup, FormControl, InputGroup, Grid, Row, Col, Button, Glyphicon } from "react-bootstrap/lib"

import * as commentActions from "actions/commentActions"
import * as commentDs from "util/dataServices/commentDs"
import * as postActions from "actions/postsActions"

import CommentOverview from "components/commentOverview"
import ControlButtonPostComment from "components/controlButtonPostComment"

class Post extends Component {
  static propTypes = {
    post: PropTypes.array,
    fetchCommentByPostId: PropTypes.func,
    comments: PropTypes.array,
    updatePost: PropTypes.func
  }

  constructor(props, context) {
    super(props, context)
    this.updateBody = this.updateBody.bind(this)
    this.updateTitle = this.updateTitle.bind(this)
    this.updatePostState = this.updatePostState.bind(this)
  }

  componentWillMount() {
    if (this.props.post[0].commentCount > 0) {
      this.props.fetchCommentByPostId(this.props.post[0].id)
    }
  }

  updateBody(event) {
    this.updatePostState({
      ...this.props.post[0],
      body: event.target.value
    })
  }

  updateTitle(event) {
    this.updatePostState({
      ...this.props.post[0],
      title: event.target.value
    })
  }

  updatePostState(post) {
    this.props.updatePost(post)
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
                          <InputGroup.Addon>DATE</InputGroup.Addon>
                          <FormControl type="text" defaultValue={`${new Date(post.timestamp).toLocaleDateString()}` +
                          ` - ${new Date(post.timestamp).toLocaleTimeString()}`}readOnly />
                        </InputGroup>
                        <InputGroup>
                          <InputGroup.Addon>AUTHOR</InputGroup.Addon>
                          <FormControl type="text" defaultValue={post.author} readOnly />
                        </InputGroup>
                        <InputGroup>
                          <InputGroup.Addon>TITLE</InputGroup.Addon>
                           <FormControl type="text" defaultValue={post.title} onBlur={this.updateTitle} readOnly={!post.editMode} />
                        </InputGroup>
                        <InputGroup>
                          <InputGroup.Addon>TEXT</InputGroup.Addon>
                          <FormControl type="text" defaultValue={post.body} onBlur={this.updateBody} readOnly={!post.editMode} />
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
                                    <h4>Comments</h4>
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
    updatePost: post => dispatch(postActions.updatePost(post))
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
