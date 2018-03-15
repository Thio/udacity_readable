import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as _ from "lodash";

import { Jumbotron } from "react-bootstrap/lib";
import "components/SingleCategoryDisplay/singleCategoryDisplay.css";

import * as postsActions from "actions/postsActions";
import * as postsDs from "dataServices/postsDs";

import Post from 'components/post'

class singleCategoryDisplay extends Component {
  static propTypes = {};

  state = {};

  render() {
    return (
      <div>
        <Jumbotron>
          <div className="SingleCategoryDisplay" key={this.props.category}>
            <h2 key={this.props.category}>{this.props.category}</h2>
            {this.props.posts.map((post) => ( 
                <Post key={post.id} postId={post.id} />
            ))}
          </div>
        </Jumbotron>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {};
}

function mapStateToProps(state, ownProps) {
  return {
    posts: state.posts.filter(post => post.category === ownProps.category)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  singleCategoryDisplay
);
