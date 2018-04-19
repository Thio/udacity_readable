import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { Grid, Row, Col, Button, Glyphicon } from "react-bootstrap/lib"

import Post from 'components/post'
import * as postActions from "actions/postsActions"
import * as postsActions from 'actions/postsActions'
import * as postsDs from 'util/dataServices/postsDs'
import 'components/SingleCategoryDisplay/singleCategoryDisplay.css'

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
    this.sortByDate = this.sortByDate.bind(this)
    this.sortByVote = this.sortByVote.bind(this)
    this.state = {sortOrder: 1}
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

  sortFunction = [
    function (a,b) { // sort timestamp asc
      return a.timestamp - b.timestamp
    },
    function (a,b) { // sort timestamp desc
      return b.timestamp - a.timestamp
    },
    function (a,b) { // sort voteScore asc
      return a.voteScore - b.voteScore
    },
    function (a,b) { // sort voteScore desc
      return b.voteScore - a.voteScore
    }
  ]

  sortByDate() {
    this.setState(state => {
      return {sortOrder: state.sortOrder === 1 ? 2 : 1}
    })
  }

  sortByVote() {
    this.setState(state => {
      return {sortOrder: state.sortOrder === 3 ? 4 : 3}
    })
  }

  render() {
    const cat = this.props.category || this.props.match.params.category
    const sortPosts = this.props.posts.sort(this.sortFunction[this.state.sortOrder - 1])
    return (
      <Grid>
        <Row>
          <Col md={2}>
            <h2 key={cat}>{cat}</h2>
          </Col>
          <Col md={3}>
            <Button className="categoryButtons" bsStyle="success" onClick={this.AddPost}><Glyphicon glyph="glyphicon glyphicon-plus" /></Button>
            <Button className="categoryButtons" bsStyle="success" onClick={this.sortByDate}><Glyphicon glyph="glyphicon glyphicon-sort-by-order" /></Button>
            <Button className="categoryButtons" bsStyle="success" onClick={this.sortByVote}><Glyphicon glyph="glyphicon glyphicon-sort-by-attributes" /></Button>
          </Col>
        </Row>
        <Row>
          {
            sortPosts.map(post => (
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
