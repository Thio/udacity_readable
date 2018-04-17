import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import * as commentActions from "actions/commentActions"
import { FormGroup, FormControl, InputGroup, Grid, Row, Col } from "react-bootstrap/lib"
import ControlButtonPostComment from "components/controlButtonPostComment"

class SingleComment extends Component {
  static propTypes = {
    comment: PropTypes.array,
    post: PropTypes.array,
    updateComment: PropTypes.func,
    fetchAllPosts: PropTypes.func
  }

  constructor(props, context) {
    super(props, context)
    this.updateCommentState = this.updateCommentState.bind(this)
    this.updateBody = this.updateBody.bind(this)
    this.updateAuthor = this.updateAuthor.bind(this)
  }

  updateBody(event) {
    this.updateCommentState({
      ...this.props.comment[0],
      body: event.target.value
    })
  }

  updateAuthor(event) {
    this.updateCommentState({
      ...this.props.comment[0],
      author: event.target.value
    })
  }

  updateCommentState(comment) {
    this.props.updateComment(comment)
  }

  render() {
    const comment = this.props.comment[0]
    return (
      <Grid key={comment.id}>
        <Row>
          <Col md={8}>
            <FormGroup bsSize="small" key={comment.id}>
              <InputGroup key={`${comment.timestamp}_group`} >
                <InputGroup.Addon key={`${comment.timestamp}`}>DATE</InputGroup.Addon>
                <FormControl key={`${comment.timestamp}_input`} type="text" defaultValue={`${new Date(comment.timestamp).toLocaleDateString()}` +
                  ` - ${new Date(comment.timestamp).toLocaleTimeString()}`} readOnly />
              </InputGroup>
              <InputGroup key={`${comment.author}_author`} >
                <InputGroup.Addon key={`${comment.author}`} >AUTHOR</InputGroup.Addon>
                <FormControl key={`${comment.author}_input`} type="text" defaultValue={comment.author} onBlur={this.updateAuthor} readOnly={!comment.new || false} />
              </InputGroup>
              <InputGroup key={`${comment.body}_body`} >
                <InputGroup.Addon key={`${comment.body}`}>TEXT</InputGroup.Addon>
                <FormControl key={`${comment.body}_input`} type="text" defaultValue={comment.body} onBlur={this.updateBody} readOnly={!comment.editMode} />
              </InputGroup>
            </FormGroup>
          </Col>
          <Col mdOffset={1} md={3} key={comment.id}>
            <Row>
              <ControlButtonPostComment item={comment} key={comment.id} />
            </Row>
          </Col>
        </Row>
      </Grid>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateComment: comment => dispatch(commentActions.updateComment(comment))
  }
}

function mapStateToProps(state, ownProps) {
  return {
    comment: state.comment.filter(comment => comment.id === ownProps.comment.id),
    post: state.posts.filter(item => item.id === ownProps.comment.parentId)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleComment)
