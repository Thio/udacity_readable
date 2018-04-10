import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { FormGroup, FormControl, InputGroup, Grid, Row, Col } from "react-bootstrap/lib"

import ControlButtonPostComment from "components/controlButtonPostComment"

class SingleComment extends Component {
  static propTypes = {
    comment: PropTypes.array
  }

  constructor(props, context) {
    super(props, context)
    this.allowedKeys = ["date", "author", "body", "timestamp"]
  }

  render() {
    const comment = this.props.comment[0]
    return (
      <Grid>
        <Row>
          <Col md={8}>
            <FormGroup bsSize="small">
              {
                Object.keys(comment).filter(key => this.allowedKeys.indexOf(key) > -1).map(key => (
                  key === 'timestamp' ?
                    <InputGroup key={`${comment.id}_${key}`} >
                      <InputGroup.Addon>Date</InputGroup.Addon>
                      <FormControl type="text" defaultValue={new Date(comment.timestamp).toLocaleDateString()} readOnly />
                    </InputGroup>
                    : <InputGroup key={`${comment.id}_${key}`}>
                      <InputGroup.Addon>{key}</InputGroup.Addon>
                      {
                        comment.editMode ?
                          <FormControl type="text" defaultValue={comment[key]} />
                          : <FormControl type="text" defaultValue={comment[key]} readOnly />
                      }
                    </InputGroup>
                ))
              }
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

function mapDispatchToProps() {
  return {

  }
}

function mapStateToProps(state, ownProps) {
  return {
    comment: state.comment.filter(comment => comment.id === ownProps.id)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleComment)
