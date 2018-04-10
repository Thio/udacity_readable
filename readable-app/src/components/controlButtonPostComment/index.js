import React, { Component } from 'react'
import * as postsActions from "actions/postsActions"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import * as commentActions from "actions/commentActions"
import { Grid, Row, Button, Glyphicon } from "react-bootstrap/lib"

class ControlButtonsPostComment extends Component {
  static propTypes = {
    post: PropTypes.array,
    comment: PropTypes.array,
    toggleEditModeOnPost: PropTypes.func,
    toggleEditModeOnComment: PropTypes.func,
    voteOnPost: PropTypes.func,
    voteOnComment: PropTypes.func
  }

  constructor(props, context) {
    super(props, context)

    this.toggleEditMode = this.toggleEditMode.bind(this)
    this.votePositive = this.votePositive.bind(this)
    this.voteNegative = this.voteNegative.bind(this)
    this.vote = this.vote.bind(this)
  }

  toggleEditMode() {
    if (this.assignedToPost()) {
      this.props.toggleEditModeOnPost(this.props.post[0].id)
    }
    else {
      this.props.toggleEditModeOnComment(this.props.comment[0].id)
    }
  }

  votePositive() {
    const item = this.props.post[0] || this.props.comment[0]
    this.vote(item.id, 1)
  }

  voteNegative() {
    const item = this.props.post[0] || this.props.comment[0]
    this.vote(item.id, -1)
    console.log(item)
  }

  vote(itemId, vote) {
    if (this.assignedToPost()) {
      this.props.voteOnPost(itemId, vote)
    }
    else {
      this.props.voteOnComment(itemId, vote)
    }
  }

  assignedToPost() {
    if (this.props.post.length > 0) {
      return true
    }
    return false
  }

  render() {
    var item = this.props.post && this.props.post.length > 0 ? this.props.post[0] : this.props.comment[0]
    return (
      <Grid>
        <Row>
          <Button bsStyle="success" onClick={this.votePositive}>
            <Glyphicon glyph="glyphicon glyphicon-menu-up" />
          </Button>
          <Button disabled>{item.voteScore}</Button>
          <Button bsStyle="danger" onClick={this.voteNegative}>
            <Glyphicon glyph="glyphicon glyphicon-menu-down" />
          </Button>
          {
            item.editMode === true ?
              <Button bsStyle="info" onClick={this.savePost}>
                <Glyphicon glyph="glyphicon glyphicon-floppy-saved" />
              </Button>
              : <Button bsStyle="info" onClick={this.toggleEditMode}>
                <Glyphicon glyph="glyphicon glyphicon-pencil" />
              </Button>
          }
          <Button bsStyle="info"><Glyphicon glyph="glyphicon glyphicon-align-justify" /></Button>
        </Row>
      </Grid>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggleEditModeOnPost: postId => dispatch(postsActions.toggleEditModeOnPost(postId)),
    toggleEditModeOnComment: commentId => dispatch(commentActions.toggleEditModeOnComment(commentId)),
    voteOnComment: (commentId, score) => dispatch(commentActions.voteOnComment({ id: commentId, voteScore: score })),
    voteOnPost: (postId, score) => dispatch(postsActions.voteOnPost({ id: postId, voteScore: score }))
  }
}

function mapStateToProps(state, ownProps) {
  return {
    post: state.posts.filter(post => post.id === ownProps.id),
    comment: state.comment.filter(comment => comment.id === ownProps.id)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlButtonsPostComment)
