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
    return (
      <div>
        {}
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchCategories: (data) => categoryActions.fetchCategoriesAjax().subscribe(function(data){
      console.log("fetchCategory", data)
      dispatch(categoryActions.fetchCategoriesFromService(data))
    })
  }
}

function mapStateToProps(state){
  return {
    ...state
  }
}

export default connect(mapStateToProps, mapDispatchToProps )(CategoryOverView)
