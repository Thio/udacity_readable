import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { Grid, Row, Col, Button, Glyphicon } from "react-bootstrap/lib"

import Post from 'components/post'

class singleCategoryDisplay extends Component {
  static propTypes = {
    category: PropTypes.string,
    posts: PropTypes.array
  }

  state = {}

  render() {
    return (
      <Grid>
        <Row>
          <Col md={2}>
            <h2 key={this.props.category}>{this.props.category}</h2>
          </Col>
          <Col md={1}>
            <Button bsStyle="success" onClick={this.AddComment}><Glyphicon glyph="glyphicon glyphicon-plus" /></Button>
          </Col>
        </Row>
        <Row>
          {
            this.props.posts.map(post => (
              <Post key={post.id} postId={post.id} />
            ))
          }
        </Row>
      </Grid>
    )
  }
}

function mapDispatchToProps() {
  return {}
}

function mapStateToProps(state, ownProps) {
  return {
    posts: state.posts.filter(post => post.category === ownProps.category)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  singleCategoryDisplay
)
