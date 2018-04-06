import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as _ from "lodash";

import { form, FormGroup, FormControl, InputGroup, Grid, Row, Col, Button, Glyphicon, Badge } from "react-bootstrap/lib"

import * as commentActions from "actions/commentActions"
import * as commentDs from "util/dataServices/commentDs"

import ControlButtonPostComment from "components/controlButtonPostComment"

class SingleComment extends Component {
  static propTypes = {
    comment: PropTypes.array
  };

  constructor(props, context) {
    super(props, context);

    this.allowedKeys = ["date", "author", "body", "timestamp"];
  }

  componentWillMount() {

  }

  render() {
    const comment = this.props.comment[0];

    return (
      <Grid>
        <Row>
          <Col md={8}>
            <FormGroup bsSize="small">
              {
                Object.keys(comment).filter(key => this.allowedKeys.indexOf(key) > -1).map((key) => (
                key === 'timestamp' ?
                  <InputGroup key={`${comment.id}_${key}`} >
                    <InputGroup.Addon>Date</InputGroup.Addon>
                    <FormControl  type="text" value={new Date(comment.timestamp).toLocaleDateString()} disabled />
                  </InputGroup>
                  : <InputGroup key={`${comment.id}_${key}`}>
                    <InputGroup.Addon>{key}</InputGroup.Addon>
                    <FormControl type="text" value={comment[key]} disabled />
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
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

function mapStateToProps(state, ownProps) {

  return {
    comment: state.comment.filter(comment => comment.id === ownProps.id)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  SingleComment
);
