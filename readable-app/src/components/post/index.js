import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as _ from "lodash";

import { Jumbotron } from "react-bootstrap/lib";
import "components/SingleCategoryDisplay/singleCategoryDisplay.css";

import * as postsActions from "actions/postsActions";
import * as postsDs from "dataServices/postsDs";
import * as commentActions from "actions/commentActions";
import * as commentDs from "dataServices/commentDs";

class Post extends Component {
  static propTypes = {};

  componentWillMount() {
    if(this.props.post[0].commentCount > 0){
      this.props.fetchCommentByPostId(this.props.post[0].id);
    }
  }

  render() {
    console.log(this.props.post)
    const post = this.props.post[0];
    return (
      <div>
        {
          post ?
          <div>
            <p key={post.id}>{post.title}</p>
            <p key={post.author}>{post.author}</p>
            <p key={`${post.id}-${post.timestamp}`}>{post.timestamp}</p>
            <p key={post.body}>{post.body}</p>
            <p key={post.voteScore}>{post.voteScore}</p>
            <p key={post.commentCount}>{post.commentCount}</p>
            {
              this.props.comments.length > 0 ?
            <div>
              <p>Comments</p>
              {
                this.props.comments.map((comment) => (
                  <p key={comment.body}>{comment.body}</p>
                ))
              }
              
            </div> : <div />
            }
          </div>
          : <div />
        }
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCommentByPostId: (postId) => commentDs.fetchCommentByPostId(postId).subscribe(function(data){
      dispatch(commentActions.fetchCommentByPostId(data));
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
