import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux"
import * as _ from "lodash"

import { Form, FormGroup, FormControl, FieldGroup, Checkbox, Radio, ControlLabel, Grid, Row, Col, Button, Glyphicon, Badge } from "react-bootstrap/lib"

import * as postsActions from "actions/postsActions"
import * as postsDs from "util/dataServices/postsDs"
import * as commentActions from "actions/commentActions"
import * as commentDs from "util/dataServices/commentDs"

import CommentOverview from "components/commentOverview"


class Post extends Component {
  static propTypes = {}

  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      editMode: false,
    }
  }

  handleClick() {
    console.log(this.props.post[0].id, this.state.editMode, this.state.editMode === true)
    this.state.editMode = !this.state.editMode;
  }

  componentWillMount() {
    if (this.props.post[0].commentCount > 0) {
      this.props.fetchCommentByPostId(this.props.post[0].id);
    }
  }

  render() {
    const post = this.props.post[0];
    return (
      <div>
        <Grid>
          <Row>
            {
              post ?
                <Col md={8}>
                  <Row>
                  </Row>
                  <Row>
                    <Col md={2}>
                      Title:
                    </Col>
                    <Col md={7}>
                      {post.title}
                    </Col>
                  </Row>
                  <Row>
                    <Col md={2}>
                      Author:
                    </Col>
                    <Col md={7}>
                      {post.author}
                    </Col>
                  </Row>
                  <Row>
                    <Col md={2}>
                      Timestamp:
                    </Col>
                    <Col md={7}>
                      {new Date(post.timestamp).toLocaleDateString()}
                    </Col>
                  </Row>
                  <Row>
                    <Col md={1}>
                      Text:
                    </Col>
                    <Col md={7}>
                      {post.body}
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      {
                        this.props.comments.length > 0 ?
                          <div>
                            <p>Comments</p>
                            {
                              <CommentOverview postId={post.id} />
                            }
                          </div> : <div />
                      }
                    </Col>
                  </Row>
                </Col>
                : <Col />
            }
            <Col mdOffset={1} md={3}>
              <Row>
                <Button bsStyle="success"><Glyphicon glyph="glyphicon glyphicon-menu-up" /></Button>
                <Button disabled>{post.voteScore}</Button>
                <Button bsStyle="danger"><Glyphicon glyph="glyphicon glyphicon-menu-down" /></Button>
                {this.state.editMode  === true ?
                <Button bsStyle="info" onClick={this.handleClick}><Glyphicon glyph="glyphicon glyphicon-floppy-saved" /></Button>
                : <Button bsStyle="info" onClick={this.handleClick}><Glyphicon glyph="glyphicon glyphicon-pencil" /></Button>}
                <Button bsStyle="info"><Glyphicon glyph="glyphicon glyphicon-align-justify" /></Button>
              </Row>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCommentByPostId: (postId) => commentDs.fetchCommentByPostId(postId).subscribe(function (data) {
      if (data) {
        dispatch(commentActions.fetchCommentByPostId(data));
      }
    }),
  }
}

function mapStateToProps(state, ownProps) {
  return {
    post: state.posts.filter(post => post.id === ownProps.postId),
    comments: state.comment.filter(comment => comment.parentId === ownProps.postId)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  Post
);
