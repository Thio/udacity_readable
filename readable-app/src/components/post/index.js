import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { Form, FormGroup, FormControl, InputGroup, Grid, Row, Col, Button, Glyphicon } from "react-bootstrap/lib"

import * as commentActions from "actions/commentActions"
import * as commentDs from "util/dataServices/commentDs"
import * as postsDs from 'util/dataServices/postsDs'
import * as postActions from "actions/postsActions"

import CommentOverview from "components/commentOverview"
import ControlButtonPostComment from "components/controlButtonPostComment"
import "components/categoryOverview/categoryOverview.css"

class Post extends Component {
  static propTypes = {
    post: PropTypes.array,
    fetchCommentByPostId: PropTypes.func,
    comments: PropTypes.array,
    updatePost: PropTypes.func,
    createEmptyComment: PropTypes.func,
    match: PropTypes.object,
    fetchAllPosts: PropTypes.func,
    history: PropTypes.object,
    props: PropTypes.object
  }

  constructor(props, context) {
    super(props, context)
    this.updateBody = this.updateBody.bind(this)
    this.updateTitle = this.updateTitle.bind(this)
    this.updatePostState = this.updatePostState.bind(this)
    this.updateAuthor = this.updateAuthor.bind(this)
    this.AddComment = this.AddComment.bind(this)
  }
  componentWillReceiveProps() {
    if (this.props.post.length < 1 && this.props.postCount === 0) {
      this.props.fetchAllPosts()
    } else if (this.props.post.length < 1 && this.props.postCount !== 0 || (this.props.match && (this.props.post[0].category !== this.props.match.params.category))) {
      this.props.history.push("/404")
    }
  }

  componentWillMount() {
    if ((this.props.match
      && this.props.match.params.postId)
      || this.props.post[0].commentCount !== this.props.comments.length) {
      this.props.fetchCommentByPostId((this.props.post[0] && this.props.post[0].id) || this.props.match.params.postId)
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

  updateAuthor(event) {
    this.updatePostState({
      ...this.props.post[0],
      author: event.target.value
    })
  }

  updatePostState(post) {
    this.props.updatePost(post)
  }

  AddComment() {
    this.props.createEmptyComment(this.props.post[0].id)
  }

  render() {
    const post = this.props.post[0]
    return (
      <div className="categoryDisplay">
        <Grid >
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
                            ` - ${new Date(post.timestamp).toLocaleTimeString()}`} readOnly />
                        </InputGroup>
                        <InputGroup>
                          <InputGroup.Addon>AUTHOR</InputGroup.Addon>
                          <FormControl type="text" defaultValue={post.author} onBlur={this.updateAuthor} readOnly={!post.new || false} />
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
                          <Row>
                            <Col md={8}>
                              <h4>{`${this.props.comments.length} Comments`}</h4>
                            </Col>
                            <Col mdOffset={1} md={3}>
                              <Button bsStyle="success" onClick={this.AddComment} disabled={!!post.new || false}>
                                <Glyphicon glyph="glyphicon glyphicon-plus" />
                              </Button>
                            </Col>
                          </Row>
                          <Row>
                            {
                              this.props.comments.length > 0 ?
                                <Row>
                                  <CommentOverview postId={post.id} />
                                </Row>
                                : <Row />
                            }
                          </Row>
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
                <ControlButtonPostComment item={post} />
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
    fetchCommentByPostId: postId => {
      commentDs.fetchCommentByPostId(postId).then(data => dispatch(commentActions.fetchCommentByPostId(data)))
    },
    fetchAllPosts: () => postsDs.fetchAllPosts().subscribe(function (data) {
      dispatch(postActions.fetchAllPostsFromService(data))
    }),
    updatePost: post => dispatch(postActions.updatePost(post)),
    createEmptyComment: postId => dispatch(commentActions.createEmptyComment(postId))
  }
}

function mapStateToProps(state, ownProps) {
  return {
    postCount: state.posts.length,
    post: state.posts.filter(post => post.id === (ownProps.postId || ownProps.match.params.postId)),
    comments: state.comment.filter(comment => {
      if(comment.parentId === (ownProps.postId || ownProps.match.params.postId)) {
        return comment
      }
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  Post
)
