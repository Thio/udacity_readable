import React, { Component } from 'react'
import { connect } from "react-redux"
import PropTypes from "prop-types"
import * as commentActions from "actions/commentActions"
import * as postsActions from "actions/postsActions"
import { Grid, Row, Button, Glyphicon } from "react-bootstrap/lib"
import { voteTypes } from 'util/constValues'
import { LinkContainer } from 'react-router-bootstrap'
import * as postsDs from 'util/dataServices/postsDs'
import * as commentDs from 'util/dataServices/commentDs'

class ControlButtonsPostComment extends Component {
  static propTypes = {
    post: PropTypes.array,
    comment: PropTypes.array,
    toggleEditModeOnPost: PropTypes.func,
    toggleEditModeOnComment: PropTypes.func,
    voteOnPost: PropTypes.func,
    voteOnComment: PropTypes.func,
    editComment: PropTypes.func,
    editPost: PropTypes.func,
    createPost: PropTypes.func,
    createComment: PropTypes.func,
    deleteComment: PropTypes.func,
    deletePost: PropTypes.func,
    category: PropTypes.string,
    parentPost: PropTypes.array
  }

  constructor(props, context) {
    super(props, context)

    this.toggleEditMode = this.toggleEditMode.bind(this)
    this.votePositive = this.votePositive.bind(this)
    this.voteNegative = this.voteNegative.bind(this)
    this.vote = this.vote.bind(this)
    this.save = this.save.bind(this)
    this.delete = this.delete.bind(this)
  }

  toggleEditMode() {
    if (this.assignedToPost()) {
      this.props.toggleEditModeOnPost(this.props.post[0].id)
    } else {
      this.props.toggleEditModeOnComment(this.props.comment[0].id)
    }
  }

  votePositive() {
    if (this.assignedToPost()) {
      this.vote(this.props.post[0].id, voteTypes.upVote)
    } else {
      this.vote(this.props.comment[0].id, voteTypes.upVote)
    }

  }

  voteNegative() {
    if (this.assignedToPost()) {
      this.vote(this.props.post[0].id, voteTypes.downVote)
    } else {
      this.vote(this.props.comment[0].id, voteTypes.downVote)
    }

  }

  vote(itemId, vote) {
    if (this.assignedToPost()) {
      this.props.voteOnPost(itemId, vote)
    } else {
      this.props.voteOnComment(itemId, vote)
    }
  }

  assignedToPost() {
    if (this.props.post.length > 0) {
      return true
    }
    return false
  }

  save() {
    // savepost
    if (this.assignedToPost()) {
      const post = this.props.post[0]
      if (!post.new || false) {
        this.props.editPost(post)
      } else {
        this.props.createPost(post)
      }
    } else {
      const comment = this.props.comment[0]
      if (!comment.new || false) {
        this.props.editComment(comment)
      } else {
        this.props.createComment(comment)
      }
    }
  }

  delete() {
    if (this.assignedToPost()) {
      const post = this.props.post[0]
      this.props.deletePost(post)
    } else {
      const comment = this.props.comment[0]
      this.props.deleteComment(comment)
    }
  }

  render() {
    const post = this.props.post && this.props.post.length > 0 ? this.props.post[0] : this.props.comment[0]
    const parentPost = this.props.post[0] ? this.props.post[0] : this.props.parentPost[0]
    return (
      <Grid>
        {post ?
          <Row>
            <Button bsStyle="success" onClick={this.votePositive}>
              <Glyphicon glyph="glyphicon glyphicon-menu-up" />
            </Button>
            <Button disabled>{post.voteScore}</Button>
            <Button bsStyle="danger" onClick={this.voteNegative}>
              <Glyphicon glyph="glyphicon glyphicon-menu-down" />
            </Button>
            {
              post.editMode ?
                <Button bsStyle="info" onClick={this.save}>
                  <Glyphicon glyph="glyphicon glyphicon-floppy-saved" />
                </Button>
                : <Button bsStyle="info" onClick={this.toggleEditMode}>
                  <Glyphicon glyph="glyphicon glyphicon-pencil" />
                </Button>
            }
            <LinkContainer key={post.name} to={`/${parentPost.category}/${parentPost.id}`}>
              <Button bsStyle="info">
                <Glyphicon glyph="glyphicon glyphicon-align-justify" />
              </Button>
            </LinkContainer>
            <Button bsStyle="info" onClick={this.delete}>
              <Glyphicon glyph="glyphicon glyphicon-trash" />
            </Button>
          </Row>
          : <Row />
        }
      </Grid>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggleEditModeOnPost: postId => dispatch(postsActions.toggleEditModeOnPost(postId)),
    toggleEditModeOnComment: commentId => dispatch(commentActions.toggleEditModeOnComment(commentId)),
    voteOnComment: (commentId, voteType) => {
      commentDs.voteOnComment(commentId, voteType).subscribe(function () {
        dispatch(commentActions.voteOnComment({ id: commentId, voteScore: voteType === voteTypes.upVote ? 1 : -1 }))
      })
    },
    voteOnPost: (postId, voteType) => postsDs.voteOnPost(postId, voteType.toString()).subscribe(function () {
      dispatch(postsActions.voteOnPost({ id: postId, voteScore: voteType === voteTypes.upVote ? 1 : -1 }))
    }),
    editComment: comment => commentDs.editComment(comment.id, new Date(), comment.body).subscribe(data => {
      dispatch(commentActions.editComment(data))
      dispatch(commentActions.toggleEditModeOnComment(data.id))
    }),
    editPost: post => postsDs.editPost(post.id, post.title, post.body).subscribe(function (data) {
      dispatch(postsActions.editPost(data))
      dispatch(postsActions.toggleEditModeOnPost(data.id))
    }),
    createPost: post => postsDs.addPost(post).subscribe(function (data) {
      dispatch(postsActions.createPost(data))
      dispatch(postsActions.toggleEditModeOnPost(data.id))
    }),
    createComment: comment => commentDs.addComment(comment.parentId, comment).subscribe(function (data) {
      dispatch(commentActions.createComment(data))
    }),
    deletePost: post => postsDs.removePost(post.id).subscribe(function (data) {
      dispatch(postsActions.deletePost(data))
    }),
    deleteComment: comment => commentDs.deleteComment(comment.id).subscribe(function (data) {
      dispatch(commentActions.deleteComment(data))
    })
  }
}

function mapStateToProps(state, ownProps) {
  return {
    post: state.posts.filter(post => (ownProps.item && post.id === ownProps.item.id || false)),
    parentPost: state.posts.filter(post => (ownProps.item && post.id === ownProps.item.parentId || false)),
    comment: state.comment.filter(comment => (ownProps.item && comment.id === ownProps.item.id) || false)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlButtonsPostComment)
