import React, { Component } from 'react'
import loadingSpinner from './loadingSpinner.gif'

export class Spinner extends Component {
  render() {
    return (
      <div className='img-size'>
        <img src={loadingSpinner} alt='laoding'/>
      </div>
    )
  }
}

export default Spinner;
