import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { Grid, Row, Col, Button, Glyphicon } from "react-bootstrap/lib"

import Post from 'components/post'
import * as postActions from "actions/postsActions"

class singleCategoryDisplay extends Component {
  static propTypes = {
    category: PropTypes.string,
    posts: PropTypes.array,
    createEmptyPost: PropTypes.func
  }

  constructor(props, context) {
    super(props, context)
    this.AddPost = this.AddPost.bind(this)
  }

  AddPost() {
    this.props.createEmptyPost(this.props.category)
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col md={2}>
            <h2 key={this.props.category}>{this.props.category}</h2>
          </Col>
          <Col md={1}>
            <Button bsStyle="success" onClick={this.AddPost}><Glyphicon glyph="glyphicon glyphicon-plus" /></Button>
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

function mapDispatchToProps(dispatch) {
  return {
    createEmptyPost: category => dispatch(postActions.createEmptyPost(category))
  }
}

function mapStateToProps(state, ownProps) {
  return {
    posts: state.posts.filter(post => post.category === ownProps.category)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  singleCategoryDisplay
)
