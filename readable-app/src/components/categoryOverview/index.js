import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as categoryActions from 'actions/categoryActions'
import { connect } from 'react-redux'

class CategoryOverView extends Component {
  static propTypes = {

  }

  componentDidMount = function(){
    this.props.fetchCategories();
  }

  render() {
    console.log("props", this.props)
    return (
      <div>
        {}
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchCategories: (data) => dispatch(categoryActions.fetchCategoriesFromService())
  }
}

function mapStateToProps(state){
  console.log("state", state);
  console.log("new state", {
    "category": [...state.category]
  });
  return {
    "category": [...state.category]
  }
}

export default connect(mapStateToProps, mapDispatchToProps )(CategoryOverView)
