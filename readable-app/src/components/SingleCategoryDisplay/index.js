import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { Grid, Row, Col, Button, Glyphicon } from "react-bootstrap/lib"

import Post from 'components/post'
import * as postActions from "actions/postsActions"
import * as postsActions from 'actions/postsActions'
import * as postsDs from 'util/dataServices/postsDs'

class singleCategoryDisplay extends Component {
  static propTypes = {
    category: PropTypes.string,
    posts: PropTypes.array,
    createEmptyPost: PropTypes.func,
    fetchAllPosts: PropTypes.func,
    match: PropTypes.object,
    history: PropTypes.object
  }

  constructor(props, context) {
    super(props, context)
    this.AddPost = this.AddPost.bind(this)
  }

  componentWillMount = () => {
    if((this.props.category || this.props.match.params.category) === "undefined") {
      this.props.history.push("/404")
    }
  };

  componentDidMount = function () {
    this.props.fetchAllPosts()
  }

  AddPost() {
    this.props.createEmptyPost(this.props.category || this.props.match.params.category)
  }

  render() {
    const cat = this.props.category || this.props.match.params.category
    return (
      <Grid>
        <Row>
          <Col md={2}>
            <h2 key={cat}>{cat}</h2>
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
    fetchAllPosts: () => postsDs.fetchAllPosts().subscribe(function (data) {
      dispatch(postsActions.fetchAllPostsFromService(data))
    }),
    createEmptyPost: category => dispatch(postActions.createEmptyPost(category))
  }
}

function mapStateToProps(state, ownProps) {
  return {
    posts: state.posts.filter(post => post.category === (ownProps.category || ownProps.match.params.category))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  singleCategoryDisplay
)
