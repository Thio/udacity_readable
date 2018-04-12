import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import * as commentActions from "actions/commentActions"
import { FormGroup, FormControl, InputGroup, Grid, Row, Col } from "react-bootstrap/lib"
import ControlButtonPostComment from "components/controlButtonPostComment"

class SingleComment extends Component {
  static propTypes = {
    comment: PropTypes.array,
    updateComment: PropTypes.func
  }

  state = {
    comment: {}
  }

  constructor(props, context) {
    super(props, context)
    this.allowedKeys = ["date", "author", "body", "timestamp"]
    this.updateCommentState = this.updateCommentState.bind(this)
    this.updateBody = this.updateBody.bind(this)
    this.state = {
      comment: this.props.comment[0]
    }
  }

  updateBody(event) {
    this.updateCommentState({
      ...this.state.comment,
      body: event.target.value
    })
  }

  updateCommentState(comment) {
    this.setState({comment: comment})
    this.props.updateComment(comment)
  }

  render() {
    const comment = this.state.comment
    return (
      <Grid>
        <Row>
          <Col md={8}>
            <FormGroup bsSize="small">
              <InputGroup key={`${comment.timestamp}`} >
                <InputGroup.Addon>DATE</InputGroup.Addon>
                <FormControl type="text" defaultValue={`${new Date(comment.timestamp).toLocaleDateString()}` +
                  ` - ${new Date(comment.timestamp).toLocaleTimeString()}`} readOnly />
              </InputGroup>
              <InputGroup key={`${comment.author}`} >
                <InputGroup.Addon>AUTHOR</InputGroup.Addon>
                <FormControl type="text" defaultValue={comment.author} readOnly />
              </InputGroup>
              <InputGroup key={`${comment.body}`} >
                <InputGroup.Addon>TEXT</InputGroup.Addon>
                <FormControl type="text" defaultValue={comment.body} onBlur={this.updateBody} readOnly={!comment.editMode} />
              </InputGroup>
            </FormGroup>
          </Col>
          <Col mdOffset={1} md={3}>
            <Row>
              <ControlButtonPostComment id={comment.id} />
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
    comment: state.comment.filter(comment => comment.id === ownProps.id)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleComment)
