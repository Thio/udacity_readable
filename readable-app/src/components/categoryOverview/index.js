import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as categoryActions from 'actions/categoryActions'
import { connect } from 'react-redux'

class CategoryOverView extends Component {
  static propTypes = {

  }

  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <ol key="old">
        {this.props.category.map((cat) => (
          <li key={cat.name}>{cat.name}</li>
        ))}
        </ol>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    ...state
  }
}

export default connect(mapStateToProps)(CategoryOverView)
